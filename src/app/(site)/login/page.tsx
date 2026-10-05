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
      <h1>Sign in to see results saved to your account.</h1>
      <p className="lede">Signing in is optional. Enter the email associated with your account and we will send a secure sign-in link. A finished Ownership Index result is saved to your account only if you are signed in when you submit it. Results completed without signing in are stored without an account and cannot be retrieved here.</p>
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
