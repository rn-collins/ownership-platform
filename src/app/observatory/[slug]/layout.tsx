import type { ReactNode } from "react";
import { getCaseResearch } from "@/lib/case_research";
import styles from "./research.module.css";

export default function ProfileLayout({ children, params }: { children: ReactNode; params: { slug: string } }) {
  const research = getCaseResearch(params.slug);
  return <>
    {children}
    {research && <section className={styles.deep} aria-labelledby="deep-record-heading">
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Source-deepened case record</p>
          <h2 id="deep-record-heading">What happened, what it may mean, and where the evidence stops.</h2>
        </div>
        <span className={styles.reviewed}>Reviewed {research.reviewed}</span>
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
        <h3 id="deep-sources-heading">Claim-level sources</h3>
        <ol>{research.sources.map((source) => <li id={source.id} key={source.id}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a><span className={styles.kind}>{source.kind} · {source.publisher} · {source.published}</span></li>)}</ol>
      </section>
    </section>}
  </>;
}
