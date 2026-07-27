"use client";

import { useState } from "react";

export function ObservatoryNominate() {
  const [f, setF] = useState({ nomineeName: "", nomineeOrg: "", nomineeRole: "", why: "", nominatorEmail: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  function set<K extends keyof typeof f>(key: K, value: string) { setF((current) => ({ ...current, [key]: value })); }
  async function submit() {
    setState("sending");
    const response = await fetch("/api/observatory/nominate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }).catch(() => null);
    setState(response?.ok ? "done" : "error");
  }
  const canSend = Boolean(f.nomineeName.trim() && f.why.trim() && state !== "sending");

  if (state === "done") return <div className="card" role="status"><p className="eyebrow">Suggestion received</p><h3>Thank you for making the Observatory wider.</h3><p>We will look at what this person’s career could help the project see. A nomination starts a review; it does not automatically create a public profile.</p></div>;

  return <form className="ownededit" onSubmit={(event) => { event.preventDefault(); void submit(); }}>
    <label className="fld"><span>Who should we look at?</span><input className="opentext" name="nomineeName" required value={f.nomineeName} onChange={(event) => set("nomineeName", event.target.value)} placeholder="Their name" /></label>
    <label className="fld"><span>Where do they do this work? <em className="fh">(optional)</em></span><input className="opentext" name="nomineeOrg" value={f.nomineeOrg} onChange={(event) => set("nomineeOrg", event.target.value)} placeholder="Company, community, institution, or independently" /></label>
    <label className="fld"><span>How would you describe what they do? <em className="fh">(optional)</em></span><input className="opentext" name="nomineeRole" value={f.nomineeRole} onChange={(event) => set("nomineeRole", event.target.value)} placeholder="Use your own words—no perfect title needed" /></label>
    <label className="fld"><span>What would their career help us understand?</span><textarea className="opentext" name="why" required rows={4} value={f.why} onChange={(event) => set("why", event.target.value)} placeholder="For example: a form of ownership, dependence, authority, or work across fields that the current cases miss." /></label>
    <label className="fld"><span>May we follow up with you? <em className="fh">(optional)</em></span><input className="opentext" name="nominatorEmail" type="email" autoComplete="email" value={f.nominatorEmail} onChange={(event) => set("nominatorEmail", event.target.value)} placeholder="Your email" /></label>
    <div className="actions"><button className="primary" type="submit" disabled={!canSend}>{state === "sending" ? "Sending…" : "Suggest this person"}</button>{state === "error" && <span className="disc" role="alert" style={{ margin: 0 }}>We could not save this yet. Please try again.</span>}</div>
  </form>;
}