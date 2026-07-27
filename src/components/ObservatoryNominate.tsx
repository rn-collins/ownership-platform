"use client";

import { useState } from "react";

export function ObservatoryNominate() {
  const [f, setF] = useState({ nomineeName: "", nomineeOrg: "", nomineeRole: "", why: "", nominatorEmail: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  function set<K extends keyof typeof f>(k: K, v: string) { setF((s) => ({ ...s, [k]: v })); }

  async function submit() {
    setState("sending");
    const res = await fetch("/api/observatory/nominate", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f),
    }).catch(() => null);
    if (res && res.ok) { setState("done"); } else { setState("error"); }
  }

  const canSend = f.nomineeName.trim() && f.why.trim() && state !== "sending";

  if (state === "done") {
    return (
      <div className="card">
        <h3>Nomination received.</h3>
        <p>Thank you—your suggestion will be reviewed for what it adds to the methodology pilot. Know your own score? <a href="/assess/professional" className="fwlink">Take the Portfolio Professional →</a></p>
      </div>
    );
  }

  return (
    <form className="ownededit" onSubmit={(event) => { event.preventDefault(); void submit(); }}>
      <label className="fld"><span>Their name</span>
        <input className="opentext" name="nomineeName" required value={f.nomineeName} onChange={(e) => set("nomineeName", e.target.value)} placeholder="Who is it?" />
      </label>
      <label className="fld"><span>Company <em className="fh">(optional)</em></span>
        <input className="opentext" name="nomineeOrg" value={f.nomineeOrg} onChange={(e) => set("nomineeOrg", e.target.value)} placeholder="Where?" />
      </label>
      <label className="fld"><span>Their role <em className="fh">(optional)</em></span>
        <input className="opentext" name="nomineeRole" value={f.nomineeRole} onChange={(e) => set("nomineeRole", e.target.value)} placeholder="The role built around them" />
      </label>
      <label className="fld"><span>Why them?</span>
        <textarea className="opentext" name="why" required rows={3} value={f.why} onChange={(e) => set("why", e.target.value)} placeholder="What did they build that the company then built a role around?" />
      </label>
      <label className="fld"><span>Your email <em className="fh">(optional — if you'd like a reply)</em></span>
        <input className="opentext" name="nominatorEmail" type="email" autoComplete="email" value={f.nominatorEmail} onChange={(e) => set("nominatorEmail", e.target.value)} placeholder="you@example.com" />
      </label>
      <div className="actions">
        <button className="primary" type="submit" disabled={!canSend}>{state === "sending" ? "Sending…" : "Put them on the map"}</button>
        {state === "error" && <span className="disc" style={{ margin: 0 }}>Something went wrong — try again.</span>}
      </div>
    </form>
  );
}
