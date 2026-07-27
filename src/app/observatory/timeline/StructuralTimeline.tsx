"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SEED, nodeSlug } from "@/lib/observatory_seed";
import { getCaseResearch } from "@/lib/case_research";
import styles from "./timeline.module.css";

type TransitionId = "employment-independence" | "audience-company" | "title-mandate" | "practice-institution" | "founder-successor" | "platform-direct";
type Precision = "dated" | "bounded" | "sequence";

type Transition = {
  id: TransitionId;
  label: string;
  question: string;
  patterns: RegExp[];
};

const TRANSITIONS: Transition[] = [
  { id: "employment-independence", label: "Employment → independence", question: "When did authority begin to travel outside an employer?", patterns: [/independent/i, /left |leav|stepped down|former |moved from .* into (books|podcast|speaking|ventures)/i, /formed? .*studio/i, /returned to independent/i] },
  { id: "audience-company", label: "Audience → company", question: "When did attention become an organization, product, or operating system?", patterns: [/audience.*(company|product|business|platform)/i, /expanded from (youtube|video|blog|podcast)/i, /turned .* (media|thesis|attention).* into/i, /founded .* after .*audience/i, /creator.*founder/i] },
  { id: "title-mandate", label: "Title → mandate", question: "When did a named role acquire—or seek—organizational consequence?", patterns: [/appointed|created a .*position|first chief|chief .* officer|head of remote|captain of moonshots|placed .* under .*leadership|newly organized .*division/i, /cabinet-level/i] },
  { id: "practice-institution", label: "Personal practice → institution", question: "When did authored work become a studio, company, office, program, or repeatable system?", patterns: [/became .*institution|became .*studio|private company|built .* around|developed .* model|formed companies|organized prizes|institutionaliz|created a .*publication|built .*operation|founded|co-founded/i] },
  { id: "founder-successor", label: "Founder-led → successor-capable", question: "When did the record show work moving beyond the founder’s direct operation?", patterns: [/stepped down|successor|transition|sold |acquired|executive leadership|survive the person|outlast|graduation/i] },
  { id: "platform-direct", label: "Platform dependence → direct distribution", question: "When did access move toward an owned or directly governed channel?", patterns: [/retail|physical caf|packaged|merchandise|direct distribution|publication|course business|products|company|network|moved .* from .* to /i] },
];

function precisionFor(date: string): Precision {
  if (/structural turn|unknown|not established/i.test(date)) return "sequence";
  if (/^\w+ \d{1,2}, \d{4}$/.test(date) || /^\d{4}$/.test(date)) return "dated";
  return "bounded";
}

function yearFor(date: string) {
  const years = date.match(/(?:19|20)\d{2}/g);
  return years ? Number(years[0]) : 9999;
}

function transitionMatches(text: string) {
  return TRANSITIONS.filter((transition) => transition.patterns.some((pattern) => pattern.test(text)));
}

const EVENTS = SEED.flatMap((person) => {
  const slug = nodeSlug(person.name);
  const research = getCaseResearch(slug);
  if (!research) return [];
  return research.chronology.flatMap((entry, index) => {
    const text = `${entry.event} ${research.interpretation} ${person.question || ""}`;
    return transitionMatches(text).map((transition) => ({
      key: `${slug}-${index}-${transition.id}`,
      person,
      slug,
      transition,
      date: entry.date,
      year: yearFor(entry.date),
      precision: precisionFor(entry.date),
      evidence: entry.event,
      sourceCount: entry.sourceIds.length,
    }));
  });
});

export function StructuralTimeline() {
  const [active, setActive] = useState<TransitionId>("employment-independence");
  const [precision, setPrecision] = useState<"all" | Precision>("all");
  const [order, setOrder] = useState<"chronological" | "case">("chronological");
  const transition = TRANSITIONS.find((item) => item.id === active)!;
  const events = useMemo(() => EVENTS.filter((event) => event.transition.id === active && (precision === "all" || event.precision === precision)).sort((a, b) => order === "case" ? a.person.name.localeCompare(b.person.name) : a.year - b.year || a.person.name.localeCompare(b.person.name)), [active, precision, order]);
  const cases = new Set(events.map((event) => event.slug)).size;

  return <div className={styles.timeline}>
    <section className={styles.controls} aria-labelledby="transition-title">
      <div><p className={styles.kicker}>Choose a structural transition</p><h2 id="transition-title">{transition.question}</h2></div>
      <div className={styles.filters}>{TRANSITIONS.map((item) => <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => setActive(item.id)}>{item.label}</button>)}</div>
    </section>

    <div className={styles.tools}>
      <label>Time precision <select value={precision} onChange={(event) => setPrecision(event.target.value as "all" | Precision)}><option value="all">All evidence</option><option value="dated">Dated events</option><option value="bounded">Bounded periods</option><option value="sequence">Sequence only</option></select></label>
      <label>Order <select value={order} onChange={(event) => setOrder(event.target.value as "chronological" | "case")}><option value="chronological">Earliest supported year</option><option value="case">Case name</option></select></label>
      <span className={styles.count}>{events.length} records · {cases} cases</span>
    </div>

    <div className={styles.legend} aria-label="Time precision legend"><span><i className={styles.dot}/>Dated</span><span><i className={`${styles.dot} ${styles.bounded}`}/>Bounded period</span><span><i className={`${styles.dot} ${styles.sequenceDot}`}/>Sequence only</span></div>

    <section className={styles.list} aria-live="polite">
      {events.length ? events.map((event) => <article className={styles.event} key={event.key}>
        <div className={styles.date}>{event.date}<span className={styles.precision}>{event.precision === "sequence" ? "Sequence only" : event.precision === "bounded" ? "Bounded period" : "Dated event"}</span></div>
        <div><p className={styles.label}>{event.transition.label}</p><h3>{event.person.name}</h3><p className={styles.meta}>{event.person.domain} · {event.person.tension} · {event.sourceCount} linked source{event.sourceCount === 1 ? "" : "s"}</p><p className={styles.evidence}>{event.evidence}</p><Link href={`/observatory/${event.slug}`}>Examine the complete case record →</Link></div>
      </article>) : <div className={styles.empty}><strong>No records meet this combination.</strong><p>That is a gap in the standardized public record—not evidence that the transition never occurs.</p></div>}
    </section>

    <section className={styles.sequence}><p className={styles.kicker}>Read sequences, not a single ladder</p><h2>A transition can reverse, repeat, overlap, or remain incomplete.</h2><p>The categories organize observation; they do not claim that every career moves from left to right. A founder can re-enter employment. Direct distribution can remain platform-dependent. A named mandate can disappear before it becomes institutional capacity.</p></section>
    <aside className={styles.guardrail}><strong>What this timeline can establish</strong><span>It shows where the collection’s public chronology contains evidence consistent with a structural transition. It does not establish causation, private ownership, decision rights, complete career histories, or that an omitted transition did not happen.</span></aside>
  </div>;
}
