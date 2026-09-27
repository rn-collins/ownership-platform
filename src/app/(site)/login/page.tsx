"use client";

import { FormEvent, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sent" | "error">("idle");

  async function sendLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabaseBrowser();
    if (!supabase) { setState("error"); return; }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setState(error ? "error" : "sent");
  }

  return (
    <main className="login-page">
      <p className="eyebrow">Institutions of One · Sign in</p>
      <h1>Return to your saved results.</h1>
      <p className="lede">Enter the email associated with your account. We will send a secure sign-in link.</p>
      {state === "sent" ? (
        <div className="card" role="status"><h3>Check your email</h3><p>A sign-in link was sent to {email}.</p></div>
      ) : (
        <form className="actions" style={{ gap: 10 }} onSubmit={sendLink}>
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" name="email" className="opentext" style={{ maxWidth: 320 }} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button className="primary" type="submit" disabled={!email}>Send sign-in link</button>
        </form>
      )}
      {state === "error" && <p className="disc" role="alert">We could not send the link. Please try again or contact RN Collins for help.</p>}
    </main>
  );
}
