"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SEED, OBSERVATORY_DOMAINS as DOMAINS, nodeSlug, type Node } from "@/lib/observatory_seed";
import styles from "./ObservatoryExplorer.module.css";

type View = "people" | "patterns";
type Pattern = { tension: string; domain: string } | null;
const ACCENTS = ["#e76f51", "#2a9d8f", "#e9c46a", "#7f6bb2", "#3b82a0", "#d06b8b", "#b98f4d"];

export function ObservatoryMap({ nodes = SEED, embed = false, initialView = "directory" }: { nodes?: Node[]; embed?: boolean; initialView?: "directory" | "map" }) {
  const [view, setView] = useState<View>(initialView === "map" ? "patterns" : "people");
  const [tension, setTension] = useState("all");
  const [domain, setDomain] = useState("all");
  const [query, setQuery] = useState("");
  const [pattern, setPattern] = useState<Pattern>(null);
  const tensions = useMemo(() => Array.from(new Set(nodes.map((n) => n.tension).filter(Boolean))) as string[], [nodes]);
  const domains = useMemo(() => DOMAINS.filter((item) => nodes.some((n) => n.domain === item)), [nodes]);
  const shown = useMemo(() => { const q = query.trim().toLowerCase(); return nodes.filter((n) => (tension === "all" || n.tension === tension) && (domain === "all" || n.domain === domain) && (!q || `${n.name} ${n.role} ${n.domain} ${n.tension ?? ""} ${n.question ?? ""}`.toLowerCase().includes(q))); }, [nodes, tension, domain, query]);
  const selectedCases = pattern ? nodes.filter((n) => n.tension === pattern.tension && n.domain === pattern.domain) : [];

  if (embed) return <div className={styles.grid}>{nodes.slice(0, 4).map((n, index) => <CaseCard key={n.name} node={n} index={index} />)}</div>;

  return <div className={styles.shell}>
    <div className={styles.switcher} role="group" aria-label="Choose how to explore the Observatory">
      <button type="button" className={view === "people" ? styles.active : ""} onClick={() => setView("people")}>Meet the people</button>
      <button type="button" className={view === "patterns" ? styles.active : ""} onClick={() => setView("patterns")}>See the patterns</button>
    </div>
    {view === "people" ? <section aria-labelledby="people-view-title">
      <div className={styles.intro}><h2 id="people-view-title">Start with a question you cannot stop thinking about.</h2><p>Every case begins with a live tension—not a score or a success story. Choose one, search someone you know, or wander.</p></div>
      <div className={styles.tensions} aria-label="Career tensions">
        <button type="button" className={tension === "all" ? styles.active : ""} onClick={() => setTension("all")}>Show me everything</button>
        {tensions.map((item) => <button type="button" key={item} className={tension === item ? styles.active : ""} onClick={() => setTension(item)}>{item}</button>)}
      </div>
      <div className={styles.controls}><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search people and questions" placeholder="Search a person, role, field, or question…" /><select value={domain} onChange={(event) => setDomain(event.target.value)} aria-label="Choose a field"><option value="all">Every field</option>{domains.map((item) => <option value={item} key={item}>{item}</option>)}</select></div>
      <div className={styles.result}><strong>{shown.length} {shown.length === 1 ? "case" : "cases"}</strong><span>Open one to see what the career makes visible—and what public evidence still cannot tell us.</span></div>
      {shown.length ? <div className={styles.grid}>{shown.map((n, index) => <CaseCard key={n.name} node={n} index={index} />)}</div> : <div className={styles.empty}><strong>No match yet.</strong><p>Try a broader word, another field, or show every tension.</p></div>}
    </section> : <section aria-labelledby="pattern-view-title">
      <div className={styles.intro}><h2 id="pattern-view-title">Where do the same career questions appear in different worlds?</h2><p>This map has a literal meaning: rows are tensions, columns are fields, and each number is the count of cases at that intersection.</p></div>
      <div className={styles.mapWrap}><p className={styles.mapHelp}>Choose a numbered cell to reveal the people behind it. Empty cells are useful too: they show where this 41-case pilot has not yet looked.</p>
        <div className={styles.matrix} style={{ "--columns": domains.length } as React.CSSProperties}>
          <div className={styles.corner}>Tension × field</div>{domains.map((item) => <div className={styles.colHead} key={item}>{item}</div>)}
          {tensions.flatMap((row) => [<div className={styles.rowHead} key={`${row}-label`}>{row}</div>, ...domains.map((col) => { const count = nodes.filter((n) => n.tension === row && n.domain === col).length; return <button type="button" key={`${row}-${col}`} className={styles.cell} disabled={!count} aria-label={`${count} ${count === 1 ? "case" : "cases"} about ${row} in ${col}`} onClick={() => setPattern({ tension: row, domain: col })}>{count || "·"}</button>; })])}
        </div>
        {pattern && <div className={styles.mapSelection}><h3>{pattern.tension} in {pattern.domain}</h3><p>{selectedCases.length} {selectedCases.length === 1 ? "career asks" : "careers ask"} this question in a different way.</p><div className={styles.mapList}>{selectedCases.map((n) => <Link className={styles.mapPerson} href={`/observatory/${nodeSlug(n.name)}`} key={n.name}><strong>{n.name}</strong><span>{n.question}</span></Link>)}</div></div>}
      </div>
    </section>}
  </div>;
}

function CaseCard({ node, index }: { node: Node; index: number }) {
  return <Link href={`/observatory/${nodeSlug(node.name)}`} className={styles.card} style={{ "--accent": ACCENTS[index % ACCENTS.length] } as React.CSSProperties}><div className={styles.top}><span className={styles.tension}>{node.tension ?? "Open question"}</span><span className={styles.domain}>{node.domain}</span></div><p className={styles.question}>{node.question ?? "What does this career make possible—and what makes it fragile?"}</p><div className={styles.identity}><h3>{node.name}</h3><p>{node.role}</p><span className={styles.open}>Follow this question →</span></div></Link>;
}