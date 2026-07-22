import type { Metadata } from "next";
import "./globals.css";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "The Ownership Index — how much of yourself do you own?",
  description:
    "A research instrument measuring how much of their audience, rights, revenue, identity and business a creator actually owns. Part of The Portfolio Creator research programme.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <nav className="nav">
            <a href="/">Ownership Index</a>
            <a href="/assess">Assess</a>
            <a href="/assess/professional">Portfolio Professional</a>
            <a href="/observatory">The Observatory</a>
            <a href="/methodology">Methodology</a>
            <span style={{ marginLeft: "auto" }} />
            {user ? (
              <>
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/owned">OWNED</a>
                <form action="/auth/signout" method="post"><button type="submit" className="navlink">Sign out</button></form>
              </>
            ) : (
              <a href="/login">Sign in</a>
            )}
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
