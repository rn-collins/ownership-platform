"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SEED, nodeSlug, type Node } from "@/lib/observatory_seed";
import { CASE_NARRATIVES } from "@/lib/case_narratives";
import { getCaseResearch } from "@/lib/case_research";
import styles from "./countercases.module.css";

type Lesson = {
  suggests: string;
  test: string;
  counterTensions: string[];
};

const LESSONS: Record<string, Lesson> = {
  "Owned vs rented": {
    suggests: "turning attention into a company can convert rented visibility into owned infrastructure",
    test: "Ownership of a company does not establish ownership of attention, distribution, data, or every asset the company needs.",
    counterTensions: ["Scale vs dependence", "Portable vs embedded", "Institution vs individual"],
  },
  "Portable vs embedded": {
    suggests: "reputation and operating judgment can travel even when the institution’s machinery cannot",
    test: "Portable authority may still depend on the employer, platform, team, contracts, or capital that made the earlier work possible.",
    counterTensions: ["Owned vs rented", "Public mandate vs personal authority", "Role vs person"],
  },
  "Role vs person": {
    suggests: "a role built around one leader can create new organizational authority",
    test: "A visible title may name existing work without changing budgets, decision rights, routines, or succession capacity.",
    counterTensions: ["Public mandate vs personal authority", "Institution vs individual", "Portable vs embedded"],
  },
  "One field vs many": {
    suggests: "work across several disciplines can compound into one coherent institution",
    test: "A recognizable public identity can make unrelated activity look integrated even when the work has different standards, teams, and dependencies.",
    counterTensions: ["Scale vs dependence", "Portable vs embedded", "Owned vs rented"],
  },
  "Scale vs dependence": {
    suggests: "a repeatable system can scale beyond the person who first built it",
    test: "Scale can increase dependence on capital, platforms, partners, or founder visibility faster than it increases continuity.",
    counterTensions: ["Owned vs rented", "Institution vs individual", "Role vs person"],
  },
  "Public mandate vs personal authority": {
    suggests: "one person’s expertise can become durable public capacity through a formal mandate",
    test: "Public access and a named office do not establish budget, binding authority, statutory durability, or survival across administrations.",
    counterTensions: ["Role vs person", "Portable vs embedded", "Institution vs individual"],
  },
  "Institution vs individual": {
    suggests: "leading a recognized institution can let one person reshape a field larger than themselves",
    test: "Institutional authority may be borrowed rather than portable, while the institution’s continuity can depend on systems the leader did not create.",
    counterTensions: ["One field vs many", "Role vs person", "Owned vs rented"],
  },
};

function recordFor(node: Node) {
  const slug = nodeSlug(node.name);
  return { slug, narrative: CASE_NARRATIVES[slug], research: getCaseResearch(slug) };
}

function apparentEvidence(node: Node) {
  const { narrative, research } = recordFor(node);
  return research?.interpretation || narrative?.whyItMatters || node.question || "The public record raises a structural lesson, but it is not complete enough to treat that lesson as a conclusion.";
}

function complication(node: Node) {
  const { narrative, research } = recordFor(node);
  return research?.complication?.[0] || research?.unknowns?.[0] || narrative?.unresolved?.[0] || node.question || "The public record does not establish the private terms, control, or continuity behind the visible career structure.";
}

function counterScore(anchor: Node, candidate: Node, lesson: Lesson) {
  let score = 0;
  if (lesson.counterTensions.includes(candidate.tension || "")) score += 6 - lesson.counterTensions.indexOf(candidate.tension || "");
  if (candidate.domain !== anchor.domain) score += 2;
  if (candidate.kind !== anchor.kind) score += 2;
  if (candidate.created !== anchor.created) score += 1;
  const research = getCaseResearch(nodeSlug(candidate.name));
  score += Math.min(research?.sources.length || 0, 4) * .25;
  return score;
}

export function CountercaseFinder({ nodes = SEED }: { nodes?: Node[] }) {
  const [anchorSlug, setAnchorSlug] = useState(nodeSlug(nodes[0].name));
  const [counterIndex, setCounterIndex] = useState(0);
  const anchor = nodes.find((node) => nodeSlug(node.name) === anchorSlug) || nodes[0];
  const lesson = LESSONS[anchor.tension || ""] || {
    suggests: "a visible career structure may reveal a repeatable path",
    test: "Similarity in public descriptions does not establish similarity in ownership, control, causation, or durability.",
    counterTensions: ["Portable vs embedded", "Scale vs dependence", "Owned vs rented"],
  };
  const counters = useMemo(() => nodes.filter((node) => node.name !== anchor.name).sort((a, b) => counterScore(anchor, b, lesson) - counterScore(anchor, a, lesson)).slice(0, 4), [nodes, anchor, lesson]);
  const counter = counters[counterIndex % counters.length];

  function selectAnchor(slug: string) {
    setAnchorSlug(slug);
    setCounterIndex(0);
  }

  return <div className={styles.finder}>
    <section className={styles.selector} aria-labelledby="case-selector-title">
      <div><p className={styles.kicker}>Begin with a case</p><h2 id="case-selector-title">Whose apparent lesson do you want to test?</h2></div>
      <label><span>Select one of 41 cases</span><select value={anchorSlug} onChange={(event) => selectAnchor(event.target.value)}>{nodes.map((node) => <option key={node.name} value={nodeSlug(node.name)}>{node.name} — {node.domain}</option>)}</select></label>
    </section>

    <section className={styles.argument} aria-live="polite">
      <div className={styles.casePanel}>
        <p className={styles.label}>The case that suggests a lesson</p>
        <p className={styles.meta}>{anchor.domain} · {anchor.tension}</p>
        <h2>{anchor.name}</h2>
        <p className={styles.lesson}>This case suggests <strong>{lesson.suggests}.</strong></p>
        <blockquote>{apparentEvidence(anchor)}</blockquote>
        <Link href={`/observatory/${nodeSlug(anchor.name)}`}>Examine {anchor.name.split(" ")[0]}’s complete record →</Link>
      </div>

      <div className={styles.pivot} aria-hidden="true"><span>But examine</span><b>↘</b></div>

      <div className={`${styles.casePanel} ${styles.counterPanel}`}>
        <p className={styles.label}>The countercase</p>
        <p className={styles.meta}>{counter.domain} · {counter.tension}</p>
        <h2>{counter.name}</h2>
        <p className={styles.lesson}>Examine this case before concluding that the apparent lesson generally follows.</p>
        <blockquote>{complication(counter)}</blockquote>
        <Link href={`/observatory/${nodeSlug(counter.name)}`}>Examine {counter.name.split(" ")[0]}’s complete record →</Link>
      </div>
    </section>

    <section className={styles.test}>
      <div><p className={styles.kicker}>What the comparison tests</p><h2>{lesson.test}</h2></div>
      <div><p>The countercase is selected because it changes the field, case type, or governing structural tension. It is a challenge to the inference—not proof that the first case is wrong.</p><button type="button" onClick={() => setCounterIndex((current) => (current + 1) % counters.length)}>Show another countercase →</button></div>
    </section>

    <aside className={styles.guardrail}><strong>No universal lesson is being scored.</strong><span>The Finder compares public evidence. It cannot establish private contracts, equity, intellectual-property ownership, decision rights, causation, or what would happen if the same choices were made elsewhere.</span></aside>
  </div>;
}
