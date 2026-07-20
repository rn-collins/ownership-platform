"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sent" | "error" | "unconfigured">("idle");

  async function sendLink() {
    const supabase = getSupabaseBrowser();
    if (!supabase) { setState("unconfigured"); return; }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setState(error ? "error" : "sent");
  }

  return (
    <main>
      <p className="eyebrow">The Ownership Index</p>
      <h1>Save your results</h1>
      <p className="lede">Enter your email and we will send you a one-tap sign-in link. Your assessment saves to your account so you can track your ownership over time.</p>

      {state === "sent" ? (
        <div className="card"><h3>Check your email</h3><p>We sent a sign-in link to {email}.</p></div>
      ) : (
        <div className="actions" style={{ gap: 10 }}>
          <input className="opentext" style={{ maxWidth: 320 }} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="primary" onClick={sendLink} disabled={!email}>Send my link</button>
        </div>
      )}
      {state === "error" && <p className="disc">Something went wrong. Try again.</p>}
      {state === "unconfigured" && <p className="disc">Auth is not configured yet (set the Supabase env vars).</p>}
    </main>
  );
}
