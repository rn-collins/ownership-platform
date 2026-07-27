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
        <p className="nl-kicker">The I/1 Edit</p>
        <h3 className="nl-title">The full edition. Every other week. In your inbox.</h3>
        <p className="nl-sub">
          One original idea about how individual work becomes institutional power, grounded in a case, conversation,
          or visual finding—plus what the research is changing and a meaningful way to take part. Beehiiv delivers
          the complete edition. Each edition is also archived on I of 1; LinkedIn and X carry selected excerpts.
        </p>
      </div>
      {state === "done" ? (
        <div className="nl-done">
          <span className="nl-check">✓</span>
          <div><b>You’re subscribed.</b><p>The next I/1 Edit will arrive by email.</p></div>
        </div>
      ) : (
        <form className="nl-form" onSubmit={(event) => { event.preventDefault(); void submit(); }}>
          <div className="nl-row">
            <input className="nl-input" type="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" aria-label="Email address" />
            <button className="nl-btn" type="submit" disabled={!valid}>{state === "sending" ? "Subscribing…" : "Get The I/1 Edit"}</button>
          </div>
          <label className="nl-consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span>Yes, email me The I/1 Edit every other week through Beehiiv. I can unsubscribe at any time.</span>
          </label>
          {state === "error" && <p className="nl-err">Your subscription was not completed. Please try again.</p>}
        </form>
      )}
    </section>
  );
}
