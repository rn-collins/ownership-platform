"use client";

import { useState } from "react";

export function NewsletterSignup({
  source = "site",
  variant = "band",
}: {
  source?: "site" | "observatory" | "index_creator" | "index_pro";
  variant?: "band" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && consent && state !== "sending";

  async function submit() {
    setState("sending");
    const response = await fetch("/api/research/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, interest: "newsletter", consent: true }),
    }).catch(() => null);
    setState(response && response.ok ? "done" : "error");
  }

  return (
    <section className={`nl nl-${variant}`}>
      <div className="nl-copy">
        <p className="nl-kicker">The I/1 Field Note</p>
        <h3 className="nl-title">One email. Once a month. Something worth carrying.</h3>
        <p className="nl-sub">
          A monthly Beehiiv newsletter with one sharp idea, a case or visual finding, what the research is changing,
          and an invitation when there is a meaningful way to take part. LinkedIn and X may carry excerpts;
          subscribers receive the complete edition by email.
        </p>
      </div>
      {state === "done" ? (
        <div className="nl-done">
          <span className="nl-check">✓</span>
          <div><b>You’re on the list.</b><p>The next I/1 Field Note will arrive by email.</p></div>
        </div>
      ) : (
        <div className="nl-form">
          <div className="nl-row">
            <input className="nl-input" type="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" aria-label="Email address" />
            <button className="nl-btn" disabled={!valid} onClick={submit}>{state === "sending" ? "Joining…" : "Join the Field Note"}</button>
          </div>
          <label className="nl-consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span>Yes, send me the monthly I/1 Field Note by email through Beehiiv. I can unsubscribe at any time.</span>
          </label>
          {state === "error" && <p className="nl-err">Your address was not saved. Please try again.</p>}
        </div>
      )}
    </section>
  );
}
