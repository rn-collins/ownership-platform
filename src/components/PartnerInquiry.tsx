"use client";

import { useState } from "react";

const KINDS = [
  ["research", "Research or evidence review"],
  ["data_sponsor", "Organizational strategy or structural analysis"],
  ["title_sponsor", "Workshop, assessment pilot, or facilitated session"],
  ["advertiser", "Talk, publication, event, or public learning experience"],
  ["other", "Another question or collaboration"],
] as const;

export function PartnerInquiry() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", kind: "research", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  function set<K extends keyof typeof form>(key: K, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  const valid = form.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) && form.message.trim() && state !== "sending";

  async function submit() {
    setState("sending");
    const response = await fetch("/api/partner/inquire", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    }).catch(() => null);
    setState(response && response.ok ? "done" : "error");
  }

  if (state === "done") return <div className="partner-confirmation"><h3>Your inquiry was received.</h3><p>RN will review your note and reply by email. Your contact information is used only for this conversation.</p></div>;

  return (
    <form className="partner-form" onSubmit={(event) => { event.preventDefault(); void submit(); }}>
      <div className="partner-form-grid">
        <label className="fld"><span>Your name</span><input className="opentext" name="name" autoComplete="name" required value={form.name} onChange={(event) => set("name", event.target.value)} /></label>
        <label className="fld"><span>Your email</span><input className="opentext" name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => set("email", event.target.value)} placeholder="you@example.com" /></label>
      </div>
      <label className="fld"><span>Your group or organization <em className="fh">(optional)</em></span><input className="opentext" name="organization" autoComplete="organization" value={form.organization} onChange={(event) => set("organization", event.target.value)} placeholder="Company, firm, school, nonprofit, team, community, or another group" /></label>
      <label className="fld"><span>What would you like to work on?</span><select className="opentext" name="kind" value={form.kind} onChange={(event) => set("kind", event.target.value)}>{KINDS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className="fld"><span>Tell RN what is happening and what would be useful.</span><textarea className="opentext" name="message" required rows={6} value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="A few sentences about the situation, the people involved, and what you hope to understand, decide, or create." /></label>
      <div className="actions">
        <button className="primary" type="submit" disabled={!valid}>{state === "sending" ? "Sending…" : "Send inquiry to RN"}</button>
        {state === "error" && <span className="disc partner-form-error">The form could not send your note. Email <a href="mailto:collins.ra@northeastern.edu">collins.ra@northeastern.edu</a> and RN will receive it directly.</span>}
      </div>
      <p className="meta partner-form-note">Your note is saved privately so RN can review and respond. A copy is sent to RN’s inquiry inbox when email delivery is available. Your contact information is used only for this inquiry.</p>
    </form>
  );
}
