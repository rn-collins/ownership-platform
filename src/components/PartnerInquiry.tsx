"use client";

import { useEffect, useId, useRef, useState } from "react";
import { errorSummary, firstInvalid, hasErrors, isEmail, postJson, type FieldErrors } from "./formKit";
import s from "./forms.module.css";

const KINDS = [
  ["research", "Research or evidence review"],
  ["data_sponsor", "Organizational strategy or structural analysis"],
  ["title_sponsor", "Workshop, assessment pilot, or facilitated session"],
  ["advertiser", "Talk, publication, event, or public learning experience"],
  ["other", "Another question or collaboration"],
] as const;

type Form = { name: string; email: string; organization: string; kind: string; message: string };
type Field = keyof Form;
const ORDER: readonly Field[] = ["name", "email", "organization", "kind", "message"];

function validatePartner(form: Form): FieldErrors<Field> {
  const errors: FieldErrors<Field> = {};
  if (!form.name.trim()) errors.name = "Enter your name.";
  if (!form.email.trim()) errors.email = "Enter your email address so RN can reply.";
  else if (!isEmail(form.email)) errors.email = "Enter an email address in the format you@example.com.";
  if (!form.message.trim()) errors.message = "Add a few sentences about what is happening.";
  return errors;
}

export function PartnerInquiry() {
  const uid = useId();
  const id = (f: Field) => `${uid}-${f}`;
  const errId = (f: Field) => `${uid}-${f}-error`;

  const [form, setForm] = useState<Form>({ name: "", email: "", organization: "", kind: "research", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [alert, setAlert] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  function set<K extends Field>(key: K, value: string) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validatePartner(next)[key] }));
  }

  async function submit() {
    if (state === "sending") return;
    const next = validatePartner(form);
    setErrors(next);
    if (hasErrors(next)) {
      setAlert(errorSummary(next));
      const first = firstInvalid(ORDER, next);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setAlert("");
    setState("sending");
    const outcome = await postJson("/api/partner/inquire", form);
    if (outcome.ok) {
      setState("done");
    } else {
      setState("error");
      setAlert(outcome.message);
    }
  }

  const fieldProps = (f: Field) => ({
    id: id(f),
    className: `opentext ${s.input}${errors[f] ? ` ${s.invalid}` : ""}`,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? errId(f) : undefined,
  });
  const errorFor = (f: Field) => errors[f] ? <p className={s.error} id={errId(f)}>{errors[f]}</p> : null;

  if (state === "done") {
    return (
      <div className="partner-confirmation" role="status">
        <h3 ref={doneRef} tabIndex={-1} className={s.focusTarget}>Your inquiry is saved.</h3>
        <p>RN can now review it and respond. For a faster answer, <a href="/contact">connect with RN on her platforms</a>. Your contact information is used only for this conversation.</p>
      </div>
    );
  }

  return (
    <form className="partner-form" noValidate onSubmit={(event) => { event.preventDefault(); void submit(); }}>
      <div className="partner-form-grid">
        <div className="fld">
          <label className={s.label} htmlFor={id("name")}>Your name</label>
          <input {...fieldProps("name")} name="name" autoComplete="name" required value={form.name} onChange={(event) => set("name", event.target.value)} />
          {errorFor("name")}
        </div>
        <div className="fld">
          <label className={s.label} htmlFor={id("email")}>Your email</label>
          <input {...fieldProps("email")} name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => set("email", event.target.value)} placeholder="you@example.com" />
          {errorFor("email")}
        </div>
      </div>
      <div className="fld">
        <label className={s.label} htmlFor={id("organization")}>Your group or organization <em className={`fh ${s.optional}`}>(optional)</em></label>
        <input {...fieldProps("organization")} name="organization" autoComplete="organization" value={form.organization} onChange={(event) => set("organization", event.target.value)} placeholder="Company, firm, school, nonprofit, team, community, or another group" />
      </div>
      <div className="fld">
        <label className={s.label} htmlFor={id("kind")}>What would you like to work on?</label>
        <select {...fieldProps("kind")} name="kind" value={form.kind} onChange={(event) => set("kind", event.target.value)}>
          {KINDS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      <div className="fld">
        <label className={s.label} htmlFor={id("message")}>Tell RN what is happening and what would be useful.</label>
        <textarea {...fieldProps("message")} name="message" required rows={6} value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="A few sentences about the situation, the people involved, and what you hope to understand, decide, or create." />
        {errorFor("message")}
      </div>
      <div className="actions">
        <button className={`primary cta-next ${s.button}`} type="submit" aria-busy={state === "sending" || undefined}>
          {state === "sending" ? "Sending…" : "Send inquiry to RN"}
        </button>
      </div>
      <div role="alert">
        {alert && (
          <p className={s.alert}>
            {alert}
            {state === "error" && <> You can also <a href="/contact">connect with RN on her platforms</a>.</>}
          </p>
        )}
      </div>
      <p className="meta partner-form-note">Your note is saved privately so RN can review and respond. Your contact information is used only for this inquiry.</p>
    </form>
  );
}
