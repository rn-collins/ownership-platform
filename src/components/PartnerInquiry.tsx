"use client";

import { useState } from "react";

const KINDS = [
  ["research", "Research partner (value-exchange)"],
  ["data_sponsor", "Chapter / data sponsor"],
  ["title_sponsor", "Title sponsor (the report)"],
  ["advertiser", "Advertiser / activation"],
  ["other", "Something else"],
] as const;

export function PartnerInquiry() {
  const [f, setF] = useState({ name: "", email: "", organization: "", kind: "research", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  function set<K extends keyof typeof f>(k: K, v: string) { setF((s) => ({ ...s, [k]: v })); }

  const valid = f.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) && f.message.trim() && state !== "sending";

  async function submit() {
    setState("sending");
    const res = await fetch("/api/partner/inquire", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f),
    }).catch(() => null);
    setState(res && res.ok ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div className="card">
        <h3>Thank you — this is on my desk.</h3>
        <p>I read every partnership note myself and reply personally. If it&rsquo;s time-sensitive, mention a date and I&rsquo;ll prioritise it.</p>
      </div>
    );
  }

  return (
    <div className="ownededit">
      <label className="fld"><span>Your name</span>
        <input className="opentext" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Who are you?" />
      </label>
      <label className="fld"><span>Work email</span>
        <input className="opentext" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
      </label>
      <label className="fld"><span>Organization <em className="fh">(optional)</em></span>
        <input className="opentext" value={f.organization} onChange={(e) => set("organization", e.target.value)} placeholder="Where?" />
      </label>
      <label className="fld"><span>What kind of partnership?</span>
        <select className="opentext" value={f.kind} onChange={(e) => set("kind", e.target.value)}>
          {KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <label className="fld"><span>What do you have in mind?</span>
        <textarea className="opentext" rows={4} value={f.message} onChange={(e) => set("message", e.target.value)} placeholder="A sentence or two on the fit you see." />
      </label>
      <div className="actions">
        <button className="primary" disabled={!valid} onClick={submit}>{state === "sending" ? "Sending…" : "Start the conversation"}</button>
        {state === "error" && <span className="disc" style={{ margin: 0 }}>Something went wrong — try again.</span>}
      </div>
    </div>
  );
}
