// Site footer. Labels match the primary nav (SiteNav.tsx).
export function SiteFooter() {
  return <footer className="foot">
    <a className="foot-brand" href="/" aria-label="Institutions of One home"><span className="brand-mark" aria-hidden="true">I/1</span><span>Institutions of One</span></a>
    <p className="foot-statement">Research on what people own in their working lives.</p>
    <div className="foot-cols">
      <div className="foot-col"><span className="foot-h">Explore</span><a href="/methodology">Method</a><a href="/methodology/pilot">Pilot protocol</a><a href="/observatory">Cases</a><a href="/observatory/dependencies">Explore dependencies</a><a href="/findings">What the 41 careers reveal</a><a href="/observatory/findings">Living findings</a><a href="/observatory/timeline">Cross-case timeline</a><a href="/observatory/countercases">Find a countercase</a><a href="/observatory/apply">Apply the cases to your work</a><a href="/observatory/evidence">Inspect the evidence</a><a href="/observatory/documentation">Research documentation</a></div>
      <div className="foot-col"><span className="foot-h">Participate</span><a href="/assess">Assessment</a><a href="/partner">Work with RN</a><a href="/research/cognitive-interviews">Join an interview</a><a href="/edit">Editions</a><a href="/about">About RN Collins</a></div>
      <div className="foot-col"><span className="foot-h">Connect</span><a href="mailto:collins.ra@northeastern.edu">Email</a><a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="/privacy">Privacy</a></div>
    </div>
    <p className="foot-copy">© {new Date().getFullYear()} Rayven-Nikkita Collins · Independent research and editorial work</p>
  </footer>;
}
