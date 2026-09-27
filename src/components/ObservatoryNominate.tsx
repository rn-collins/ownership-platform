"use client";

import { useEffect, useId, useRef, useState } from "react";
import { errorSummary, firstInvalid, hasErrors, isEmail, postJson, type FieldErrors } from "./formKit";
import s from "./forms.module.css";

type Form = { nomineeName: string; nomineeOrg: string; nomineeRole: string; why: string; nominatorEmail: string };
type Field = keyof Form;
const ORDER: readonly Field[] = ["nomineeName", "nomineeOrg", "nomineeRole", "why", "nominatorEmail"];

function validate(f: Form): FieldErrors<Field> {
  const errors: FieldErrors<Field> = {};
  if (!f.nomineeName.trim()) errors.nomineeName = "Enter the person’s name.";
  if (!f.why.trim()) errors.why = "Tell us what their career would help the Observatory understand.";
  if (f.nominatorEmail.trim() && !isEmail(f.nominatorEmail)) errors.nominatorEmail = "Enter an email address in the format you@example.com, or leave this blank.";
  return errors;
}

export function ObservatoryNominate() {
  const uid = useId();
  const id = (k: Field) => `${uid}-${k}`;
  const errId = (k: Field) => `${uid}-${k}-error`;

  const [f, setF] = useState<Form>({ nomineeName: "", nomineeOrg: "", nomineeRole: "", why: "", nominatorEmail: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [alert, setAlert] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  function set<K extends Field>(key: K, value: string) {
    const next = { ...f, [key]: value };
    setF(next);
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validate(next)[key] }));
  }

  async function submit() {
    if (state === "sending") return;
    const next = validate(f);
    setErrors(next);
    if (hasErrors(next)) {
      setAlert(errorSummary(next));
      const first = firstInvalid(ORDER, next);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setAlert("");
    setState("sending");
    const outcome = await postJson("/api/observatory/nominate", f);
    if (outcome.ok) {
      setState("done");
    } else {
      setState("error");
      setAlert(`We could not save this yet. ${outcome.message}`);
    }
  }

  const fieldProps = (k: Field) => ({
    id: id(k),
    name: k,
    className: `opentext ${s.input}${errors[k] ? ` ${s.invalid}` : ""}`,
    value: f[k],
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? errId(k) : undefined,
  });
  const errorFor = (k: Field) => errors[k] ? <p className={s.error} id={errId(k)}>{errors[k]}</p> : null;
  const optional = <em className={`fh ${s.optional}`}>(optional)</em>;

  if (state === "done") {
    return (
      <div className="card" role="status">
        <p className="eyebrow">Suggestion received</p>
        <h3 ref={doneRef} tabIndex={-1} className={s.focusTarget}>Thank you for making the Observatory wider.</h3>
        <p>We will look at what this person’s career could help the project see. A nomination starts a review; it does not automatically create a public profile.</p>
      </div>
    );
  }

  return (
    <form className="ownededit" noValidate onSubmit={(event) => { event.preventDefault(); void submit(); }}>
      <div className="fld">
        <label className={s.label} htmlFor={id("nomineeName")}>Who should we look at?</label>
        <input {...fieldProps("nomineeName")} required onChange={(event) => set("nomineeName", event.target.value)} placeholder="Their name" />
        {errorFor("nomineeName")}
      </div>
      <div className="fld">
        <label className={s.label} htmlFor={id("nomineeOrg")}>Where do they do this work? {optional}</label>
        <input {...fieldProps("nomineeOrg")} onChange={(event) => set("nomineeOrg", event.target.value)} placeholder="Company, community, institution, or independently" />
      </div>
      <div className="fld">
        <label className={s.label} htmlFor={id("nomineeRole")}>How would you describe what they do? {optional}</label>
        <input {...fieldProps("nomineeRole")} onChange={(event) => set("nomineeRole", event.target.value)} placeholder="Use your own words—no perfect title needed" />
      </div>
      <div className="fld">
        <label className={s.label} htmlFor={id("why")}>What would their career help us understand?</label>
        <textarea {...fieldProps("why")} required rows={4} onChange={(event) => set("why", event.target.value)} placeholder="For example: a form of ownership, dependence, authority, or work across fields that the current cases miss." />
        {errorFor("why")}
      </div>
      <div className="fld">
        <label className={s.label} htmlFor={id("nominatorEmail")}>May we follow up with you? {optional}</label>
        <input {...fieldProps("nominatorEmail")} type="email" inputMode="email" autoComplete="email" onChange={(event) => set("nominatorEmail", event.target.value)} placeholder="Your email" />
        {errorFor("nominatorEmail")}
      </div>
      <div className="actions">
        <button className={`primary cta-next ${s.button}`} type="submit" aria-busy={state === "sending" || undefined}>
          {state === "sending" ? "Sending…" : "Suggest this person"}
        </button>
      </div>
      <div role="alert">{alert && <p className={s.alert}>{alert}</p>}</div>
    </form>
  );
}
