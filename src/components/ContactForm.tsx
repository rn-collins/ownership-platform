"use client";

import { useEffect, useId, useRef, useState } from "react";
import { errorSummary, firstInvalid, hasErrors, isEmail, type FieldErrors } from "./formKit";
import { CONTACT_TOPICS, describeContactResult, type ContactResult } from "@/lib/contact";
import s from "./forms.module.css";

type Form = { name: string; email: string; topic: string; message: string; website: string };
type Field = "name" | "email" | "message";
const ORDER: readonly Field[] = ["name", "email", "message"];

function validate(form: Form): FieldErrors<Field> {
  const errors: FieldErrors<Field> = {};
  if (!form.name.trim()) errors.name = "Enter your name.";
  if (!form.email.trim()) errors.email = "Enter your email address so RN can reply.";
  else if (!isEmail(form.email)) errors.email = "Enter an email address in the format you@example.com.";
  if (form.message.trim().length < 10) errors.message = "Write at least a sentence so RN knows what you need.";
  return errors;
}

export function ContactForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const errId = (f: Field) => `${uid}-${f}-error`;
  const [form, setForm] = useState<Form>({ name: "", email: "", topic: "general", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [alert, setAlert] = useState("");
  const [doneText, setDoneText] = useState("");
  const [from, setFrom] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  // ?from=hawaii or ?from=reader names the site the visitor came from. Letters, digits and hyphens only.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("from") ?? "";
    setFrom(/^[a-z0-9-]{1,40}$/.test(value) ? value : "");
  }, []);
  useEffect(() => { if (state === "done") doneRef.current?.focus(); }, [state]);

  function set<K extends keyof Form>(key: K, value: string) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (key in errors) setErrors((e) => ({ ...e, [key]: validate(next)[key as Field] }));
  }

  async function submit() {
    if (state === "sending") return;
    const next = validate(form);
    setErrors(next);
    if (hasErrors(next)) {
      setAlert(errorSummary(next));
      const first = firstInvalid(ORDER, next);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setAlert("");
    setState("sending");
    let result: ContactResult;
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, from }) });
      const body = (await res.json().catch(() => null)) as ContactResult | null;
      result = body && typeof body === "object" && "ok" in body ? body : { ok: false, error: "not_available" };
    } catch {
      setState("error");
      setAlert("We could not reach the server. Check your connection and try again.");
      return;
    }
    if (result.ok) { setDoneText(describeContactResult(result)); setState("done"); }
    else { setState("error"); setAlert(describeContactResult(result)); }
  }

  const fieldProps = (f: Field) => ({
    id: id(f),
    className: `opentext ${s.input}${errors[f] ? ` ${s.invalid}` : ""}`,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? errId(f) : undefined,
  });
  const errorFor = (f: Field) => errors[f] ? <p className={s.error} id={errId(f)}>{errors[f]}</p> : null;

  if (state === "done") {
    return <div className="partner-confirmation" role="status">
      <h2 ref={doneRef} tabIndex={-1} className={s.focusTarget}>Thank you.</h2>
      <p>{doneText}</p>
    </div>;
  }

  return <form className="partner-form" noValidate onSubmit={(event) => { event.preventDefault(); void submit(); }}>
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
      <label className={s.label} htmlFor={id("topic")}>What is this about?</label>
      <select id={id("topic")} className={`opentext ${s.input}`} name="topic" value={form.topic} onChange={(event) => set("topic", event.target.value)}>
        {CONTACT_TOPICS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </div>
    <div className="fld">
      <label className={s.label} htmlFor={id("message")}>Your message</label>
      <textarea {...fieldProps("message")} name="message" required rows={6} value={form.message} onChange={(event) => set("message", event.target.value)} />
      {errorFor("message")}
    </div>
    {/* Honeypot. Hidden from sight and from assistive technology; people never fill it in. */}
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label htmlFor={id("website")}>Leave this field empty</label>
      <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => set("website", event.target.value)} />
    </div>
    <div className="actions">
      <button className={`primary cta-next ${s.button}`} type="submit" aria-busy={state === "sending" || undefined}>
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </div>
    <div role="alert">{alert && <p className={s.alert}>{alert}</p>}</div>
    <p className="meta partner-form-note">Your message is used only to answer you. The privacy page says what is stored and for how long.</p>
  </form>;
}
