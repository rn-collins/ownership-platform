import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { getUser } from "@/lib/supabase/server";

const SITE_URL = "https://ownership-platform.vercel.app";
const TITLE = "Institutions of One — research on work, ownership, and individual institutional power";
const DESC = "Independent research on how creators and professionals build portable expertise, authority, ownership, and durable systems around their work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  applicationName: "Institutions of One",
  authors: [{ name: "RN Collins" }],
  keywords: ["Institutions of One", "Ownership Index", "Portfolio Professional", "creator economy", "future of work", "RN Collins"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: "Institutions of One", title: TITLE, description: DESC, url: SITE_URL,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Institutions of One" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og.png"] },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isEmbed = (headers().get("x-pathname") || "").startsWith("/embed");
  if (isEmbed) return <html lang="en"><body><div className="embed-wrap">{children}</div></body></html>;

  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <nav className="nav" aria-label="Primary">
            <a href="/">Institutions of One</a>
            <a href="/methodology">Research</a>
            <a href="/assess">Assessments</a>
            <a href="/observatory">Observatory</a>
            <a href="/findings">Findings</a>
            <a href="/partner">Participate</a>
            <span style={{ marginLeft: "auto" }} />
            {user ? <>
              <a href="/dashboard">Dashboard</a>
              <a href="/dashboard/owned">My page</a>
              <form action="/auth/signout" method="post"><button type="submit" className="navlink">Sign out</button></form>
            </> : <a href="/login">Sign in</a>}
          </nav>

          {children}

          <footer className="foot">
            <div className="foot-cols">
              <div className="foot-col">
                <span className="foot-h">Explore</span>
                <a href="/methodology">Research and methodology</a>
                <a href="/assess">Pilot assessments</a>
                <a href="/observatory">The Observatory</a>
                <a href="/findings">Early findings</a>
              </div>
              <div className="foot-col">
                <span className="foot-h">About</span>
                <a href="/about">About RN Collins and the project</a>
                <a href="/partner">Participate or partner</a>
                <a href="/privacy">Privacy and data use</a>
              </div>
              <div className="foot-col">
                <span className="foot-h">Contact</span>
                <a href="mailto:collins.ra@northeastern.edu">collins.ra@northeastern.edu</a>
                <a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <p className="foot-note">
              Institutions of One is an independent research project by RN Collins. Pilot results and case research are
              published with their methods, limitations, and evidence status.
            </p>
            <p className="foot-copy">© {new Date().getFullYear()} RN Collins · Institutions of One · <a href="/privacy" style={{ color: "inherit" }}>Privacy</a></p>
          </footer>
        </div>
      </body>
    </html>
  );
}
