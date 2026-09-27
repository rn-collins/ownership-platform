import type { ReactNode } from "react";
import { getCaseResearch } from "@/lib/case_research";
import styles from "./research.module.css";

// Whether a citation points at a specific item or at a site/section landing page.
// This is a check on the SHAPE of the URL only. It says nothing about whether the
// link resolves, or whether the page behind it supports the claim — do not present
// it to readers as verification. A URL is treated as a landing page when it has no
// path, or when its whole path is a single generic section segment.
const SECTION_SEGMENT = /^(news|press|about|blog|technology|business|climate-environment|articles|stories|team|people|rulings|topic)$/i;

function isLandingPage(href: string): boolean {
  let path: string;
  try {
    const url = new URL(href);
    if (url.search || url.hash) return false;
    path = url.pathname;
  } catch {
    return false;
  }
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return true;
  return segments.length === 1 && SECTION_SEGMENT.test(segments[0]);
}

export default function ProfileLayout({ children, params }: { children: ReactNode; params: { slug: string } }) {
  const research = getCaseResearch(params.slug);
  const sources = research?.sources ?? [];
  const landingPageCount = sources.filter((source) => isLandingPage(source.href)).length;
  return <>
    {children}
    {research && <section className={styles.deep} aria-labelledby="deep-record-heading">
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Sourced case record</p>
          <h2 id="deep-record-heading">What happened, what it may mean, and where the evidence stops.</h2>
        </div>
        <span className={styles.reviewed}>Reviewed {research.reviewed} · {sources.length} source{sources.length === 1 ? "" : "s"}</span>
      </header>

      <div className={styles.timeline} aria-label="Sourced career chronology">
        {research.chronology.map((item) => <article className={styles.event} key={item.date + item.event}>
          <time>{item.date}</time>
          <div><p>{item.event}</p><span className={styles.cites}>Sources: {item.sourceIds.join(", ")}</span></div>
        </article>)}
      </div>

      <div className={styles.read}>
        <section><h3>Structural interpretation</h3><p>{research.interpretation}</p><h3>What remains unknown</h3><ul>{research.unknowns.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h3>Evidence that complicates the first reading</h3><ul>{research.complication.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>

      <section className={styles.payoff}><h3>What this case teaches</h3><p>{research.payoff}</p></section>

      <section className={styles.sources} aria-labelledby="deep-sources-heading">
        <h3 id="deep-sources-heading">Sources used in this record</h3>
        <p><strong>How to read these links:</strong> this site does not continuously check that its citations still resolve. Each link was checked by hand when the record was last reviewed. If a link is broken or does not support the statement it is attached to, that is a defect in the record — please report it.</p>
        {landingPageCount > 0 && <p><strong>Source-precision warning:</strong> {landingPageCount} inherited link{landingPageCount === 1 ? "" : "s"} lead{landingPageCount === 1 ? "s" : ""} to a publisher or organization landing page rather than the exact supporting item. Those links identify a research lead, not claim-level verification.</p>}
        <ol>{sources.map((source) => <li id={source.id} key={source.id}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a><span className={styles.kind}>{source.kind} · {source.publisher} · {source.published}</span></li>)}</ol>
      </section>
    </section>}
  </>;
}
