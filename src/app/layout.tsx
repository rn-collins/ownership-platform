import type { Metadata } from "next";
import "./globals.css";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Institutions of One — measuring how individuals become institutions",
  description:
    "An independent research program measuring the shift from 'get hired for a role' to 'the role gets built around you.' Two instruments — the Ownership Index (creators) and the Portfolio Professional (professionals) — and The Observatory, a living map that links them, toward a flagship report at Cannes Lions 2027. By RN Collins.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <nav className="nav">
            <a href="/">Institutions of One</a>
            <a href="/assess">Ownership Index</a>
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
