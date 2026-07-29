import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./launch-fixes.css";
import "./design-system.css";
import { getUser } from "@/lib/supabase/server";

const SITE_URL = "https://ownership-platform.vercel.app";
const TITLE = "Institutions of One — when a person becomes an infrastructure";
const DESC = "An independent research and editorial project about creators and professionals building portable authority, owned value, and durable systems around their work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), title: TITLE, description: DESC, applicationName: "Institutions of One", authors: [{ name: "RN Collins" }], keywords: ["Institutions of One", "Ownership Index", "Portfolio Professional", "independent creators", "portfolio careers", "RN Collins"],
  openGraph: { type: "website", siteName: "Institutions of One", title: TITLE, description: DESC, url: SITE_URL, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Institutions of One" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og.png"] },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isEmbed = (headers().get("x-pathname") || "").startsWith("/embed");
  if (isEmbed) return <html lang="en"><body><div className="embed-wrap">{children}</div></body></html>;
  const user = await getUser();
  return <html lang="en"><body><div className="site-shell">
    <header className="site-header"><a className="brand" href="/" aria-label="Institutions of One home"><span className="brand-mark">I/1</span><span className="brand-name">Institutions<br/>of One</span></a><nav className="nav" aria-label="Primary">
      <a href="/methodology">The idea</a><a href="/observatory">Observatory</a><a href="/assess">Measure</a><a href="/edit">Read</a><a href="/partner">Work with us</a>{user ? <><a href="/dashboard">Dashboard</a><form action="/auth/signout" method="post"><button type="submit" className="navlink">Sign out</button></form></> : <a className="nav-signin" href="/login">Sign in</a>}
    </nav></header>
    <div className="wrap">{children}</div>
    <footer className="foot"><div className="foot-statement">What happens when the person is no longer just the talent—but the infrastructure?</div><div className="foot-cols">
      <div className="foot-col"><span className="foot-h">Explore</span><a href="/methodology">The idea and method</a><a href="/observatory">The 41 public cases</a><a href="/observatory/dependencies">Explore dependencies</a><a href="/observatory/countercases">Find a countercase</a><a href="/observatory/apply">Apply the cases to your work</a><a href="/observatory/evidence">Inspect the evidence</a><a href="/observatory/documentation">Research documentation</a></div>
      <div className="foot-col"><span className="foot-h">Participate</span><a href="/assess">Pilot assessments</a><a href="/partner">Participate or partner</a><a href="/research/cognitive-interviews">Join an interview</a><a href="/edit">The I/1 Edit</a><a href="/about">About RN Collins</a></div>
      <div className="foot-col"><span className="foot-h">Connect</span><a href="mailto:collins.ra@northeastern.edu">Email</a><a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="/privacy">Privacy</a></div>
    </div><p className="foot-copy">© {new Date().getFullYear()} RN Collins · Independent research in public</p></footer>
  </div></body></html>;
}
