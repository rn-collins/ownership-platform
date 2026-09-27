"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SEED, nodeSlug } from "@/lib/observatory_seed";
import { getCaseResearch, type CaseResearchRecord } from "@/lib/case_research";
import styles from "./findings.module.css";

type Lens = "support" | "exceptions" | "gaps" | "changed" | "pressure" | "ledger";
type Row = {slug:string;name:string;domain:string;tension:string;research:CaseResearchRecord;independent:number;linked:number};
type Pattern = {tension:string;cases:Row[];sources:number;independentCases:number;unknowns:number;complications:number};

const BASELINE_DATE="2026-07-27";
const LENSES:{id:Lens;label:string;question:string}[]=[
  {id:"support",label:"Supported patterns",question:"Which recurring interpretations have the broadest current support?"},
  {id:"exceptions",label:"Emerging exceptions",question:"Which cases resist an inviting collection-wide lesson?"},
  {id:"gaps",label:"Research gaps",question:"Where would more evidence most change what the collection can say?"},
  {id:"changed",label:"Changed interpretations",question:"Can the collection establish that an interpretation changed?"},
  {id:"pressure",label:"Framework pressure",question:"Which cases put the most pressure on the framework itself?"},
  {id:"ledger",label:"Review ledger",question:"What changed in the standardized record most recently?"},
];

const ROWS:Row[]=SEED.flatMap((person)=>{
  const slug=nodeSlug(person.name);
  const research=getCaseResearch(slug);
  if(!research) return [];
  return [{slug,name:person.name,domain:person.domain,tension:person.tension||"Unclassified tension",research,independent:research.sources.filter((s)=>s.kind==="independent").length,linked:research.chronology.filter((e)=>e.sourceIds.length>0).length}];
});

function patterns():Pattern[]{
  const map=new Map<string,Row[]>();
  ROWS.forEach((row)=>map.set(row.tension,[...(map.get(row.tension)||[]),row]));
  return [...map.entries()].map(([tension,cases])=>({tension,cases,sources:cases.reduce((n,r)=>n+r.research.sources.length,0),independentCases:cases.filter((r)=>r.independent>0).length,unknowns:cases.reduce((n,r)=>n+r.research.unknowns.length,0),complications:cases.reduce((n,r)=>n+r.research.complication.length,0)})).sort((a,b)=>b.cases.length-a.cases.length||b.independentCases-a.independentCases);
}

const PATTERNS=patterns();

function strength(pattern:Pattern){
  if(pattern.cases.length>=4&&pattern.independentCases>=2) return "Broadest current support";
  if(pattern.cases.length>=3&&pattern.independentCases>=1) return "Recurring, provisionally supported";
  return "Visible, but still thin";
}

export function LivingFindings(){
  const [lens,setLens]=useState<Lens>("support");
  const [query,setQuery]=useState("");
  const active=LENSES.find((item)=>item.id===lens)!;
  const q=query.trim().toLowerCase();

  const exceptionRows=useMemo(()=>ROWS.filter((row)=>row.research.complication.length>=3||row.research.unknowns.length>=3).sort((a,b)=>b.research.complication.length+b.research.unknowns.length-(a.research.complication.length+a.research.unknowns.length)),[]);
  const gapRows=useMemo(()=>ROWS.map((row)=>({...row,gaps:[row.independent===0?"No independent source currently classified":"",row.research.sources.length<3?"Fewer than three standardized sources":"",row.linked<row.research.chronology.length?"Chronology not fully linked to sources":"",row.research.unknowns.length>=3?"Three or more explicit unknowns":"","ownership equity contracts decision rights intellectual property data".split(" ").some((term)=>row.research.unknowns.join(" ").toLowerCase().includes(term))?"Ownership or control remains publicly unresolved":""].filter(Boolean)})).filter((row)=>row.gaps.length).sort((a,b)=>b.gaps.length-a.gaps.length),[]);
  const pressureRows=useMemo(()=>ROWS.filter((row)=>row.research.unknowns.length+row.research.complication.length>=5).sort((a,b)=>b.research.unknowns.length+b.research.complication.length-(a.research.unknowns.length+a.research.complication.length)),[]);
  const ledger=useMemo(()=>[...ROWS].sort((a,b)=>b.research.reviewed.localeCompare(a.research.reviewed)||a.name.localeCompare(b.name)),[]);

  const matches=(row:Row)=>!q||`${row.name} ${row.domain} ${row.tension} ${row.research.interpretation} ${row.research.complication.join(" ")} ${row.research.unknowns.join(" ")}`.toLowerCase().includes(q);

  return <div className={styles.generator}>
    <section className={styles.intro}>
      <div><p className={styles.kicker}>Generated from the current case records</p><h2>{active.question}</h2><p>Every result is a routing signal for further research, not a law of career development. Open the cases before adopting the pattern.</p></div>
      <div className={styles.lenses}>{LENSES.map((item)=><button type="button" key={item.id} aria-pressed={lens===item.id} onClick={()=>setLens(item.id)}>{item.label}</button>)}</div>
    </section>

    {lens!=="support"&&lens!=="changed"&&<div className={styles.tools}><input aria-label="Search living findings" placeholder="Search a person, field, tension, or evidence phrase…" value={query} onChange={(event)=>setQuery(event.target.value)}/></div>}

    {lens==="support"&&<section className={styles.patterns}>{PATTERNS.map((pattern)=><article key={pattern.tension}>
      <p className={styles.status}>{strength(pattern)}</p><h3>{pattern.tension}</h3>
      <p className={styles.finding}>{pattern.cases.length} cases currently raise this tension. Together they contain {pattern.sources} standardized sources, {pattern.independentCases} case records with at least one independent source, {pattern.complications} explicit complications, and {pattern.unknowns} unresolved questions.</p>
      <div className={styles.caseLinks}>{pattern.cases.slice(0,6).map((row)=><Link key={row.slug} href={`/observatory/${row.slug}`}>{row.name}</Link>)}</div>
      <p className={styles.caution}><strong>Do not conclude:</strong> frequency proves causation, success, ownership, or a universal sequence.</p>
    </article>)}</section>}

    {lens==="exceptions"&&<section className={styles.grid}>{exceptionRows.filter(matches).map((row)=><article key={row.slug}>
      <p className={styles.meta}>{row.domain} · {row.tension}</p><h3>{row.name}</h3>
      <p className={styles.label}>The interpretation this case complicates</p><blockquote>{row.research.interpretation}</blockquote>
      <p className={styles.label}>Strongest complication</p><p>{row.research.complication[0]}</p>
      <Link href={`/observatory/${row.slug}`}>Examine the case and its sources →</Link>
    </article>)}</section>}

    {lens==="gaps"&&<section className={styles.grid}>{gapRows.filter(matches).map((row)=><article key={row.slug}>
      <p className={styles.meta}>{row.domain} · reviewed {row.research.reviewed}</p><h3>{row.name}</h3>
      <p className={styles.label}>Research attention raised by the record</p><ul>{row.gaps.map((gap)=><li key={gap}>{gap}</li>)}</ul>
      <p className={styles.caution}>A gap is not evidence that the underlying asset, right, authority, or relationship does not exist.</p>
      <Link href={`/observatory/${row.slug}`}>Open the evidence record →</Link>
    </article>)}</section>}

    {lens==="changed"&&<section className={styles.changeState}>
      <p className={styles.status}>Baseline established {BASELINE_DATE}</p><h3>No defensible before-and-after claim yet.</h3>
      <p>The collection has a current standardized baseline, but it does not yet contain two comparable snapshots of each interpretation. Calling a finding “newly supported,” “weakened,” or “changed” now would manufacture history.</p>
      <p>When a later reviewed snapshot is retained, this view can compare the prior and current interpretation, source mix, complications, unknowns, and case membership. Until then, it reports the absence of longitudinal evidence as a result.</p>
      <div className={styles.diffPlan}><span>Future comparison</span><strong>Prior record</strong><strong>Current record</strong><strong>Reason for change</strong><strong>Evidence added or removed</strong></div>
    </section>}

    {lens==="pressure"&&<section className={styles.grid}>{pressureRows.filter(matches).map((row)=><article key={row.slug}>
      <p className={styles.meta}>{row.domain} · {row.tension}</p><h3>{row.name}</h3>
      <p className={styles.label}>Why this case pressures the framework</p><p>{row.research.complication[0]}</p>
      <div className={styles.metrics}><span>{row.research.complication.length} complications</span><span>{row.research.unknowns.length} unknowns</span></div>
      <p className={styles.caution}>High pressure does not mean a weak case. It means the case exposes distinctions the framework must preserve.</p>
      <Link href={`/observatory/${row.slug}`}>See what the framework must account for →</Link>
    </article>)}</section>}

    {lens==="ledger"&&<section className={styles.ledger}>{ledger.filter(matches).map((row)=><article key={row.slug}><time dateTime={row.research.reviewed}>{row.research.reviewed}</time><div><h3>{row.name}</h3><p>{row.research.sources.length} sources · {row.independent} independent · {row.research.unknowns.length} unknowns</p></div><Link href={`/observatory/${row.slug}`}>Open record →</Link></article>)}</section>}

    <aside className={styles.guardrail}><strong>What “living” means here</strong><span>The findings are recomputed from the current standardized records whenever the collection changes. Historical change is reported only after comparable snapshots exist. The generator never converts repetition into causation, an unknown into an absence, or a research flag into a score.</span></aside>
  </div>;
}
