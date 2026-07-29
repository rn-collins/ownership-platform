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

  if (state === "done") return <div className="card"><h3>Your inquiry was received.</h3><p>It has been saved in the private Institutions of One project database and sent to RN’s inquiry inbox when email delivery is available. RN reviews inquiries personally; submitting this form does not add you to a marketing list.</p></div>;

  return (
    <form className="ownededit" onSubmit={(event) => { event.preventDefault(); void submit(); }}>
      <label className="fld"><span>Your name</span><input className="opentext" name="name" autoComplete="name" required value={form.name} onChange={(event) => set("name", event.target.value)} /></label>
      <label className="fld"><span>Your email</span><input className="opentext" name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => set("email", event.target.value)} placeholder="you@example.com" /></label>
      <label className="fld"><span>Group or organization <em className="fh">(optional)</em></span><input className="opentext" name="organization" autoComplete="organization" value={form.organization} onChange={(event) => set("organization", event.target.value)} placeholder="Company, firm, school, nonprofit, team, community, or other group" /></label>
      <label className="fld"><span>What kind of help are you considering?</span><select className="opentext" name="kind" value={form.kind} onChange={(event) => set("kind", event.target.value)}>{KINDS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className="fld"><span>What is happening, and what would you like RN to help you understand or produce?</span><textarea className="opentext" name="message" required rows={6} value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="Briefly describe the group, the question or situation, who it affects, and any outcome or deadline you already have in mind." /></label>
      <div className="actions">
        <button className="primary" type="submit" disabled={!valid}>{state === "sending" ? "Sending…" : "Send inquiry to RN"}</button>
        {state === "error" && <span className="disc" style={{ margin: 0 }}>Your inquiry was not received. Please email <a href="mailto:collins.ra@northeastern.edu">collins.ra@northeastern.edu</a> instead.</span>}
      </div>
      <p className="meta">When you submit this form, your note is saved in the private Institutions of One project database. If email delivery is available, a copy is also sent to RN’s inquiry inbox; the system uses collins.ra@northeastern.edu as the fallback destination. Your email address is used only to review and respond to this inquiry. It is not added to a newsletter or automated sales sequence.</p>
    </form>
  );
}
