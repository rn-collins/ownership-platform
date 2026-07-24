"use client";

import { useState } from "react";

// The Institutions of One newsletter signup. Same consent-first contract as the
// research opt-in and the same dual-write route (/api/research/subscribe →
// ResearchSubscriber + beehiiv). A project about owning your audience captures
// its own the honest way: explicit consent, no dark patterns, unsubscribe-anytime.
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
    const res = await fetch("/api/research/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, interest: "newsletter", consent: true }),
    }).catch(() => null);
    setState(res && res.ok ? "done" : "error");
  }

  return (
    <section className={`nl nl-${variant}`}>
      <div className="nl-copy">
        <p className="nl-kicker">The newsletter</p>
        <h3 className="nl-title">Institutions of One</h3>
        <p className="nl-sub">
          Essays, findings, and where the map is headed — the research in public, on the way to a
          flagship report at Cannes Lions 2027. No spam; unsubscribe anytime.
        </p>
      </div>

      {state === "done" ? (
        <div className="nl-done">
          <span className="nl-check">✓</span>
          <div>
            <b>You&rsquo;re in.</b>
            <p>Check your inbox — your first note from Institutions of One is on its way.</p>
          </div>
        </div>
      ) : (
        <div className="nl-form">
          <div className="nl-row">
            <input
              className="nl-input"
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <button className="nl-btn" disabled={!valid} onClick={submit}>
              {state === "sending" ? "Joining…" : "Join the research"}
            </button>
          </div>
          <label className="nl-consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>Yes — email me occasional updates from Institutions of One. I can unsubscribe anytime.</span>
          </label>
          {state === "error" && <p className="nl-err">Something went wrong — please try again.</p>}
        </div>
      )}
    </section>
  );
}
