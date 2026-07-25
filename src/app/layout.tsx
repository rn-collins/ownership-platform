import type { Metadata } from "next";
import "./globals.css";
import { getUser } from "@/lib/supabase/server";

const SITE_URL = "https://ownership-platform.vercel.app";
const TITLE = "Institutions of One — measuring how individuals become institutions";
const DESC =
  "An independent research program measuring the shift from 'get hired for a role' to 'the role gets built around you.' Two instruments — the Ownership Index (creators) and the Portfolio Professional (professionals) — and The Observatory, a living map that links them, toward a flagship report at Cannes Lions 2027. By RN Collins.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  applicationName: "Institutions of One",
  authors: [{ name: "RN Collins" }],
  keywords: [
    "Institutions of One", "Ownership Index", "Portfolio Professional", "The Observatory",
    "creator economy", "individual as institution", "RN Collins", "Cannes Lions 2027",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Institutions of One",
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Institutions of One — measuring how individuals become institutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <nav className="nav">
            <a href="/">Institutions of One</a>
            <a href="/assess/creator">Ownership Index</a>
            <a href="/assess/professional">Portfolio Professional</a>
            <a href="/observatory">The Observatory</a>
            <a href="/findings">Findings</a>
            <a href="/methodology">Methodology</a>
            <a href="/about">About</a>
            <span style={{ marginLeft: "auto" }} />
            {user ? (
              <>
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/owned">My page</a>
                <form action="/auth/signout" method="post"><button type="submit" className="navlink">Sign out</button></form>
              </>
            ) : (
              <a href="/login">Sign in</a>
            )}
          </nav>
          {children}
          <footer className="foot">
            <div className="foot-cols">
              <div className="foot-col">
                <span className="foot-h">The research</span>
                <a href="/assess/creator">Ownership Index</a>
                <a href="/assess/professional">Portfolio Professional</a>
                <a href="/observatory">The Observatory</a>
                <a href="/findings">Findings</a>
                <a href="/methodology">Methodology</a>
              </div>
              <div className="foot-col">
                <span className="foot-h">Institutions of One</span>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/partner">Partner</a>
                <a href="mailto:collins.ra@northeastern.edu">Contact</a>
                <a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <p className="foot-note">
              Institutions of One is an independent research program by RN Collins, building toward a flagship report at
              Cannes Lions 2027. A project about ownership models it: subscribers are added only with explicit consent, and
              people appear on The Observatory only from public evidence or consented nominations.
            </p>
            <p className="foot-copy">© {new Date().getFullYear()} RN Collins · Institutions of One</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
