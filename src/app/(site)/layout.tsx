import { AccountNav } from "@/components/AccountNav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="site-shell">
    <header className="site-header"><a className="brand" href="/" aria-label="Institutions of One home"><span className="brand-mark">I/1</span><span className="brand-name">Institutions<br/>of One</span></a><nav className="nav" aria-label="Primary">
      <a href="/methodology">How it works</a><a href="/observatory">Explore 41 cases</a><a href="/assess">Assess your work</a><a href="/edit">Read the research</a><a href="/partner">Ways to work together</a><AccountNav />
    </nav></header>
    <div className="wrap">{children}</div>
    <footer className="foot"><a className="foot-brand" href="/" aria-label="Institutions of One home"><span className="brand-mark" aria-hidden="true">I/1</span><span>Institutions of One</span></a><div className="foot-statement">Institutions of One studies what people build, what they can carry, what they control, and what work, systems, relationships, or authority could persist when an essential dependency changes.</div><div className="foot-cols">
      <div className="foot-col"><span className="foot-h">Explore</span><a href="/methodology">The idea and method</a><a href="/observatory">The 41 public cases</a><a href="/observatory/dependencies">Explore dependencies</a><a href="/observatory/countercases">Find a countercase</a><a href="/observatory/apply">Apply the cases to your work</a><a href="/observatory/evidence">Inspect the evidence</a><a href="/observatory/documentation">Research documentation</a></div>
      <div className="foot-col"><span className="foot-h">Participate</span><a href="/assess">Pilot assessments</a><a href="/partner">Ways to work together</a><a href="/research/cognitive-interviews">Join an interview</a><a href="/edit">The I/1 Edit</a><a href="/about">About RN Collins</a></div>
      <div className="foot-col"><span className="foot-h">Connect</span><a href="mailto:collins.ra@northeastern.edu">Email</a><a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="/privacy">Privacy</a></div>
    </div><p className="foot-copy">© {new Date().getFullYear()} Rayven-Nikkita Collins · Independent research and editorial work</p></footer>
  </div>;
}
