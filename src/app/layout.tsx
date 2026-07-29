import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./launch-fixes.css";
import "./design-system.css";
import { getUser } from "@/lib/supabase/server";

const SITE_URL = "https://ownership-platform.vercel.app";
const TITLE = "Institutions of One — what people build, carry, control, and continue";
const DESC = "A research and editorial project examining what people build through work, what they can carry between roles, what they control, and what can continue through change.";

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
      <a href="/methodology">How it works</a><a href="/observatory">Explore 41 cases</a><a href="/assess">Assess your work</a><a href="/edit">Read the research</a><a href="/partner">Ways to work together</a>{user ? <><a href="/dashboard">Your dashboard</a><form action="/auth/signout" method="post"><button type="submit" className="navlink">Sign out</button></form></> : null}
    </nav></header>
    <div className="wrap">{children}</div>
    <footer className="foot"><div className="foot-statement">Institutions of One studies what people build, what they can carry, what they control, and what can continue without them.</div><div className="foot-cols">
      <div className="foot-col"><span className="foot-h">Explore</span><a href="/methodology">The idea and method</a><a href="/observatory">The 41 public cases</a><a href="/observatory/dependencies">Explore dependencies</a><a href="/observatory/countercases">Find a countercase</a><a href="/observatory/apply">Apply the cases to your work</a><a href="/observatory/evidence">Inspect the evidence</a><a href="/observatory/documentation">Research documentation</a></div>
      <div className="foot-col"><span className="foot-h">Participate</span><a href="/assess">Pilot assessments</a><a href="/partner">Ways to work together</a><a href="/research/cognitive-interviews">Join an interview</a><a href="/edit">The I/1 Edit</a><a href="/about">About RN Collins</a></div>
      <div className="foot-col"><span className="foot-h">Connect</span><a href="mailto:collins.ra@northeastern.edu">Email</a><a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="/privacy">Privacy</a></div>
    </div><p className="foot-copy">© {new Date().getFullYear()} Rayven-Nikkita Collins · Independent research and editorial work</p></footer>
  </div></body></html>;
}
