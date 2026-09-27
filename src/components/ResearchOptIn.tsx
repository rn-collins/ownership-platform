"use client";

import { useEffect, useId, useRef, useState } from "react";
import { errorSummary, firstInvalid, hasErrors, isEmail, postJson, type FieldErrors } from "./formKit";
import s from "./forms.module.css";

type Source = "index_creator" | "index_pro" | "observatory" | "site";

type Report = { total: number; band: string; instrument: "ownership" | "portfolio_professional" };

type Props = {
  source?: Source;
  interest?: string; // creator | professional | both
  heading?: string;
  blurb?: string;
  // When provided, joining unlocks a downloadable share card + a printable report.
  // The score, percentile, and plan remain free on the page; this is the value the
  // email earns — give-before-ask, not a paywall.
  report?: Report;
};

type Field = "name" | "email" | "consent";
const ORDER: readonly Field[] = ["name", "email", "consent"];

function validate(email: string, consent: boolean): FieldErrors<Field> {
  const errors: FieldErrors<Field> = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(email)) errors.email = "Enter an email address in the format you@example.com.";
  if (!consent) errors.consent = "Tick the box to confirm you want to join the research list.";
  return errors;
}

// Consent-forward opt-in to The Observatory research list. A project about
// ownership models ownership: nothing is stored without an explicit checkbox.
export function ResearchOptIn({
  source = "site",
  interest,
  heading = "Get your results — and join the research",
  blurb = "New findings, essays, and where the map is headed. No spam; unsubscribe anytime.",
  report,
}: Props) {
  const uid = useId();
  const ids = { name: `${uid}-name`, email: `${uid}-email`, consent: `${uid}-consent` };
  const errId = (f: Field) => `${ids[f]}-error`;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [alert, setAlert] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  async function submit() {
    if (state === "sending") return;
    const next = validate(email, consent);
    setErrors(next);
    if (hasErrors(next)) {
      setAlert(errorSummary(next));
      const first = firstInvalid(ORDER, next);
      if (first) document.getElementById(ids[first])?.focus();
      return;
    }
    setAlert("");
    setState("sending");
    const outcome = await postJson("/api/research/subscribe", { email: email.trim(), name, source, interest, consent: true });
    if (outcome.ok) {
      setState("done");
    } else {
      setState("error");
      setAlert(`You haven’t been added yet. ${outcome.message}`);
    }
  }

  if (state === "done") {
    const cardHref = report
      ? `/api/og/score?total=${report.total}&band=${encodeURIComponent(report.band)}&instrument=${report.instrument}`
      : null;
    return (
      <div className="optin optin-done" role="status">
        <h3 className={`optinh ${s.focusTarget}`} ref={doneRef} tabIndex={-1}>You&rsquo;re in.</h3>
        <p className="optinsub">Thank you for joining the research — you&rsquo;ll hear from me at Institutions of One.</p>
        {report && (
          <div className="actions" style={{ marginTop: 4 }}>
            <a href={cardHref!} target="_blank" rel="noopener noreferrer"><button className={`primary ${s.button}`}>Download your score card</button></a>
            <button className={`ghost ${s.button}`} onClick={() => window.print()}>Save your full report (PDF)</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form className="optin" noValidate onSubmit={(event) => { event.preventDefault(); void submit(); }}>
      <h3 className="optinh">{heading}</h3>
      <p className="optinsub">{blurb}</p>
      <div className="optinrow">
        <div style={{ flex: 1, minWidth: 180 }}>
          <label className={s.label} htmlFor={ids.name}>Your name <em className={s.optional}>(optional)</em></label>
          <input id={ids.name} className={`opentext ${s.input}`} type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label className={s.label} htmlFor={ids.email}>Email address</label>
          <input
            id={ids.email}
            className={`opentext ${s.input}${errors.email ? ` ${s.invalid}` : ""}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((x) => ({ ...x, email: validate(e.target.value, consent).email }));
            }}
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errId("email") : undefined}
          />
          {errors.email && <p className={s.error} id={errId("email")}>{errors.email}</p>}
        </div>
      </div>
      <label className={`optinconsent ${s.check}${errors.consent ? ` ${s.checkInvalid}` : ""}`}>
        <input
          id={ids.consent}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (errors.consent) setErrors((x) => ({ ...x, consent: validate(email, e.target.checked).consent }));
          }}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? errId("consent") : undefined}
        />
        <span>Yes — add me to The Observatory research list and email me occasional updates. I can unsubscribe anytime.</span>
      </label>
      {errors.consent && <p className={s.error} id={errId("consent")}>{errors.consent}</p>}
      <div className="actions">
        <button className={`primary cta-next ${s.button}`} type="submit" aria-busy={state === "sending" || undefined}>
          {state === "sending" ? "Joining…" : "Join the research"}
        </button>
      </div>
      <div role="alert">{alert && <p className={s.alert}>{alert}</p>}</div>
    </form>
  );
}
