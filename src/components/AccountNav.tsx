"use client";

import { useEffect, useState } from "react";

// Signed-in nav links, resolved in the browser so the site layout stays static.
// A Supabase session cookie (sb-<ref>-auth-token, possibly chunked .0/.1) is the
// signal; /dashboard re-verifies the user server-side, so a stale cookie only
// shows a link that then redirects to sign-in.
export function AccountNav() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    setSignedIn(/(?:^|;\s*)sb-[^=]+-auth-token(?:\.\d+)?=/.test(document.cookie));
  }, []);
  if (!signedIn) return null;
  return (
    <>
      <a href="/dashboard">Your dashboard</a>
      <form action="/auth/signout" method="post">
        <button type="submit" className="navlink">Sign out</button>
      </form>
    </>
  );
}
