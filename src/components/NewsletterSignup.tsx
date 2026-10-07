"use client";

import { useEffect, useId, useRef, useState } from "react";
import { errorSummary, firstInvalid, hasErrors, isEmail, postJson, type FieldErrors } from "./formKit";
import { POLYMATH_SUBSCRIBE_URL } from "@/lib/site";
import s from "./forms.module.css";

type Field = "email" | "consent";
const ORDER: readonly Field[] = ["email", "consent"];

function validate(email: string, consent: boolean): FieldErrors<Field> {
  const errors: FieldErrors<Field> = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(email)) errors.email = "Enter an email address in the format you@example.com.";
  if (!consent) errors.consent = "Tick the box to confirm you want The I/1 Edit by email.";
  return errors;
}

export function NewsletterSignup({
  source = "site",
  variant = "band",
}: {
  source?: "site" | "observatory" | "index_creator" | "index_pro";
  variant?: "band" | "inline";
}) {
  const uid = useId();
  const ids = { email: `${uid}-email`, consent: `${uid}-consent` };
  const errId = (f: Field) => `${ids[f]}-error`;

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  // False when the address is on file but the mailing list connection is not live yet (MAIN-001).
  const [synced, setSynced] = useState(true);
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [alert, setAlert] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

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
    const outcome = await postJson("/api/research/subscribe", { email: email.trim(), source, interest: "newsletter", consent: true });
    if (outcome.ok) {
      setSynced(outcome.synced !== false);
      setState("done");
    } else {
      setState("error");
      setAlert(`Your subscription was not completed. ${outcome.message}`);
    }
  }

  return (
    <section className={`nl nl-${variant} ${s.onDark}`}>
      <div className="nl-copy">
        <p className="nl-kicker">The I/1 Edit</p>
        <h3 className="nl-title">One sharp idea. New editions arrive by email.</h3>
        <p className="nl-sub">
          One argument about work, power, and ownership, made concrete through a real case. Sources and tools live on the web edition.
        </p>
      </div>
      {state === "done" ? (
        <div className={`nl-done ${s.focusTarget}`} role="status" tabIndex={-1} ref={doneRef}>
          <span className="nl-check" aria-hidden="true">✓</span>
          {synced
            ? <div><b>You’re subscribed.</b><p>The next I/1 Edit will arrive by email from The Polymath.</p></div>
            : <div><b>We have your address.</b><p>We will add you to The Polymath, the newsletter that carries The I/1 Edit. You are not on the mailing list yet, so no email has been sent. To get The Polymath now, <a href={POLYMATH_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">subscribe on Beehiiv<span className="sr-only"> (opens in a new tab)</span></a>.</p></div>}
        </div>
      ) : (
        <form className="nl-form" noValidate onSubmit={(event) => { event.preventDefault(); void submit(); }}>
          <label className={s.label} htmlFor={ids.email}>Email address</label>
          <div className="nl-row">
            <input
              id={ids.email}
              className={`nl-input ${s.input}${errors.email ? ` ${s.invalid}` : ""}`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((e) => ({ ...e, email: validate(event.target.value, consent).email }));
              }}
              placeholder="you@example.com"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? errId("email") : undefined}
            />
            <button className={`nl-btn cta-next ${s.button}`} type="submit" aria-busy={state === "sending" || undefined}>
              {state === "sending" ? "Subscribing…" : "Get The I/1 Edit"}
            </button>
          </div>
          {errors.email && <p className={s.error} id={errId("email")}>{errors.email}</p>}
          <label className={`nl-consent ${s.check}${errors.consent ? ` ${s.checkInvalid}` : ""}`}>
            <input
              id={ids.consent}
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                if (errors.consent) setErrors((e) => ({ ...e, consent: validate(email, event.target.checked).consent }));
              }}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? errId("consent") : undefined}
            />
            <span>Yes, email me new editions of The I/1 Edit. It is one section of the newsletter The Polymath on Beehiiv, so I will get The Polymath’s emails. I can unsubscribe at any time.</span>
          </label>
          {errors.consent && <p className={s.error} id={errId("consent")}>{errors.consent}</p>}
          <div role="alert">{alert && <p className={s.alert}>{alert}{state === "error" && <> You can also <a href={POLYMATH_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">subscribe to The Polymath directly on Beehiiv<span className="sr-only"> (opens in a new tab)</span></a>.</>}</p>}</div>
        </form>
      )}
    </section>
  );
}
