"use client";

import { useState } from "react";

const KINDS = [
  ["research", "Research or distribution partnership"],
  ["data_sponsor", "Data or report support"],
  ["title_sponsor", "Interview or case participation"],
  ["advertiser", "Editorial or event collaboration"],
  ["other", "Another idea"],
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

  if (state === "done") return <div className="card"><h3>Thank you.</h3><p>Your note has been received. RN Collins will reply directly.</p></div>;

  return (
    <div className="ownededit">
      <label className="fld"><span>Name</span><input className="opentext" value={form.name} onChange={(event) => set("name", event.target.value)} /></label>
      <label className="fld"><span>Email</span><input className="opentext" value={form.email} onChange={(event) => set("email", event.target.value)} placeholder="you@organization.com" /></label>
      <label className="fld"><span>Organization <em className="fh">(optional)</em></span><input className="opentext" value={form.organization} onChange={(event) => set("organization", event.target.value)} /></label>
      <label className="fld"><span>Area of interest</span><select className="opentext" value={form.kind} onChange={(event) => set("kind", event.target.value)}>{KINDS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className="fld"><span>What would you like to explore?</span><textarea className="opentext" rows={4} value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="A short description of the question, audience, case, or collaboration." /></label>
      <div className="actions">
        <button className="primary" disabled={!valid} onClick={submit}>{state === "sending" ? "Sending…" : "Send inquiry"}</button>
        {state === "error" && <span className="disc" style={{ margin: 0 }}>We could not send the note. Please try again.</span>}
      </div>
    </div>
  );
}
