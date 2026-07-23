"use client";

import { useState } from "react";

type Source = "index_creator" | "index_pro" | "observatory" | "site";

type Props = {
  source?: Source;
  interest?: string; // creator | professional | both
  heading?: string;
  blurb?: string;
};

// Consent-forward opt-in to The Observatory research list. A project about
// ownership models ownership: nothing is stored without an explicit checkbox.
// Degrades gracefully — if the backend isn't wired, the route returns ok and the
// visitor still sees a friendly confirmation.
export function ResearchOptIn({
  source = "site",
  interest,
  heading = "Get your results — and join the research",
  blurb = "New findings, essays, and where the map is headed. No spam; unsubscribe anytime.",
}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && consent && state !== "sending";

  async function submit() {
    setState("sending");
    const res = await fetch("/api/research/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, source, interest, consent: true }),
    }).catch(() => null);
    if (res && res.ok) setState("done");
    else setState("error");
  }

  if (state === "done") {
    return (
      <div className="optin optin-done">
        <h3 className="optinh">You&rsquo;re in.</h3>
        <p className="optinsub">Thank you for joining the research — you&rsquo;ll hear from me at Institutions of One.</p>
      </div>
    );
  }

  return (
    <div className="optin">
      <h3 className="optinh">{heading}</h3>
      <p className="optinsub">{blurb}</p>
      <div className="optinrow">
        <input className="opentext" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
        <input className="opentext" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <label className="optinconsent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Yes — add me to The Observatory research list and email me occasional updates. I can unsubscribe anytime.</span>
      </label>
      <div className="actions">
        <button className="primary" disabled={!valid} onClick={submit}>{state === "sending" ? "Joining…" : "Join the research"}</button>
        {state === "error" && <span className="disc" style={{ margin: 0 }}>Something went wrong — try again.</span>}
      </div>
    </div>
  );
}
