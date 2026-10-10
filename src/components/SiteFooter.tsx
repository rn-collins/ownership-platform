import { ProfileLinks } from "@/components/ProfileLinks";
import { PORTFOLIO_LABEL, PORTFOLIO_URL, readerUrl } from "@/lib/site";

// Site footer. Labels match the primary nav (SiteNav.tsx) and the Public Reader's footer (DEC-02, interim step B).
export function SiteFooter() {
  return <footer className="foot">
    <a className="foot-brand" href="/" aria-label="Institutions of One, home"><span className="brand-mark" aria-hidden="true">I/1</span><span>Institutions of One</span></a>
    <p className="foot-statement">Research on what people own in their working lives.</p>
    <p className="foot-reader">This site is the official home of each edition. Visual stories, interactive tools, and the source library for each edition live on the <a href={readerUrl()} target="_blank" rel="noopener noreferrer">Public Reader<span className="sr-only"> (opens in a new tab)</span></a>, the companion site.</p>
    <div className="foot-cols">
      <div className="foot-col"><span className="foot-h">Explore</span><a href="/methodology">Method</a><a href="/methodology/pilot">Pilot protocol</a><a href="/observatory">Cases</a><a href="/observatory/dependencies">Explore dependencies</a><a href="/findings">What the 41 careers reveal</a><a href="/observatory/findings">Living findings</a><a href="/observatory/timeline">Cross-case timeline</a><a href="/observatory/countercases">Find a countercase</a><a href="/observatory/apply">Apply the cases to your work</a><a href="/observatory/evidence">Inspect the evidence</a><a href="/observatory/documentation">Research documentation</a></div>
      <div className="foot-col"><span className="foot-h">Participate</span><a href="/assess">Assessment</a><a href="/partner">Work with RN</a><a href="/research/cognitive-interviews">Join an interview</a><a href="/edit">Editions</a><a href="/about">About RN Collins</a></div>
      <div className="foot-col"><span className="foot-h">On the Public Reader</span><a href={readerUrl("/production/cycle-01")} target="_blank" rel="noopener noreferrer">Visual stories<span className="sr-only"> (opens in a new tab)</span></a><a href={readerUrl("/experiences")} target="_blank" rel="noopener noreferrer">Interactive tools<span className="sr-only"> (opens in a new tab)</span></a><a href={readerUrl("/resources")} target="_blank" rel="noopener noreferrer">Source Desk<span className="sr-only"> (opens in a new tab)</span></a></div>
      <div className="foot-col"><span className="foot-h">Connect</span><a href="/contact">Connect with RN</a><a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">{PORTFOLIO_LABEL}<span className="sr-only"> (opens in a new tab)</span></a><a href="/privacy">Privacy</a></div>
    </div>
    <div className="foot-connect"><span className="foot-h">Connect with RN Collins</span><ProfileLinks variant="row" /></div>
    <p className="foot-copy">© {new Date().getFullYear()} RN Collins · Research and editorial work</p>
  </footer>;
}
