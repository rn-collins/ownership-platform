"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SEED, nodeSlug } from "@/lib/observatory_seed";
import { getCaseResearch, type CaseResearchRecord } from "@/lib/case_research";
import styles from "./evidence.module.css";

type Lens = "documented" | "self-description" | "ownership-unknown" | "competing" | "review" | "sources";
type CaseRow = { slug:string; name:string; domain:string; tension:string; research:CaseResearchRecord; independent:number; firstParty:number; linkedEvents:number; ownershipUnknown:string[]; competing:string[]; needsReview:string[] };

const LENSES: {id:Lens;label:string;question:string;rule:string}[] = [
  { id:"documented", label:"Strongly documented", question:"Which interpretations have several public sources, including independent reporting?", rule:"Shows records with at least three linked sources, at least one independent source, and chronology tied to source IDs." },
  { id:"self-description", label:"Mainly self-described", question:"Which records rely mainly on first-party or institutional descriptions?", rule:"Shows records with no independent source in the standardized record. This is a provenance limitation, not a finding that the account is false." },
  { id:"ownership-unknown", label:"Ownership private or unknown", question:"Where can the public record not establish ownership or control?", rule:"Finds explicit unknowns and complications involving equity, contracts, rights, control, data, assets, or ownership." },
  { id:"competing", label:"Competing evidence", question:"Which cases contain evidence that complicates the most inviting interpretation?", rule:"Shows explicit complications, conflicts, reversals, or counter-explanations. A complication is not automatically a contradiction." },
  { id:"review", label:"Needs another review", question:"Which records most need another research pass?", rule:"Flags thin sourcing, no independent source, unlinked chronology, or three or more explicit unknowns. It does not declare the case unreliable." },
  { id:"sources", label:"Recurring sources", question:"Which publishers support findings across more than one case?", rule:"Counts a publisher once per case and shows only publishers appearing in at least two standardized records." },
];

const ownershipPattern=/ownership|owned|equity|contract|rights|control|decision|intellectual property|\bIP\b|data|asset|compensation|stake|private terms/i;
const competingPattern=/complicat|conflict|contradict|disput|however|but |does not|cannot|rather than|vulnerab|depend|attribution|revers|not a simple/i;

function buildRows(): CaseRow[] {
  return SEED.flatMap((person)=>{
    const slug=nodeSlug(person.name);
    const research=getCaseResearch(slug);
    if(!research) return [];
    const independent=research.sources.filter((source)=>source.kind==="independent").length;
    const firstParty=research.sources.length-independent;
    const linkedEvents=research.chronology.filter((event)=>event.sourceIds.length>0).length;
    const allCautions=[...research.complication,...research.unknowns];
    const ownershipUnknown=allCautions.filter((line)=>ownershipPattern.test(line));
    const competing=research.complication.filter((line)=>competingPattern.test(line));
    const needsReview:string[]=[];
    if(research.sources.length<3) needsReview.push("Fewer than three sources in the standardized record");
    if(independent===0) needsReview.push("No independent source currently classified");
    if(linkedEvents<research.chronology.length) needsReview.push("At least one chronology entry lacks a linked source");
    if(research.unknowns.length>=3) needsReview.push("Three or more explicit research unknowns remain");
    return [{slug,name:person.name,domain:person.domain,tension:person.tension||"Unclassified tension",research,independent,firstParty,linkedEvents,ownershipUnknown,competing,needsReview}];
  });
}

const ROWS=buildRows();

export function EvidenceExplorer(){
  const [lens,setLens]=useState<Lens>("documented");
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState<"name"|"sources"|"review">("review");
  const active=LENSES.find((item)=>item.id===lens)!;
  const sourceRows=useMemo(()=>{
    const map=new Map<string,{publisher:string;cases:Set<string>;independent:number;firstParty:number}>();
    ROWS.forEach((row)=>row.research.sources.forEach((source)=>{
      const key=source.publisher.trim();
      const current=map.get(key)||{publisher:key,cases:new Set<string>(),independent:0,firstParty:0};
      current.cases.add(row.slug);
      if(source.kind==="independent") current.independent++; else current.firstParty++;
      map.set(key,current);
    }));
    return [...map.values()].filter((row)=>row.cases.size>=2).sort((a,b)=>b.cases.size-a.cases.size||a.publisher.localeCompare(b.publisher));
  },[]);
  const shown=useMemo(()=>{
    const q=query.trim().toLowerCase();
    const matches=ROWS.filter((row)=>{
      const text=`${row.name} ${row.domain} ${row.tension} ${row.research.interpretation} ${row.research.complication.join(" ")} ${row.research.unknowns.join(" ")}`.toLowerCase();
      if(q&&!text.includes(q)) return false;
      if(lens==="documented") return row.research.sources.length>=3&&row.independent>=1&&row.linkedEvents===row.research.chronology.length;
      if(lens==="self-description") return row.independent===0;
      if(lens==="ownership-unknown") return row.ownershipUnknown.length>0;
      if(lens==="competing") return row.competing.length>0;
      if(lens==="review") return row.needsReview.length>0;
      return true;
    });
    return matches.sort((a,b)=>sort==="name"?a.name.localeCompare(b.name):sort==="sources"?b.research.sources.length-a.research.sources.length||a.name.localeCompare(b.name):b.needsReview.length-a.needsReview.length||a.name.localeCompare(b.name));
  },[lens,query,sort]);

  function evidenceFor(row:CaseRow){
    if(lens==="documented") return row.research.interpretation;
    if(lens==="self-description") return `The standardized record currently contains ${row.firstParty} first-party or institutional source${row.firstParty===1?"":"s"} and no source classified as independent.`;
    if(lens==="ownership-unknown") return row.ownershipUnknown[0];
    if(lens==="competing") return row.competing[0]||row.research.complication[0];
    if(lens==="review") return row.needsReview.join(" · ");
    return row.research.interpretation;
  }

  return <div className={styles.explorer}>
    <section className={styles.controls}>
      <div><p className={styles.kicker}>Research integrity lens</p><h2>{active.question}</h2><p>{active.rule}</p></div>
      <div className={styles.lenses}>{LENSES.map((item)=><button key={item.id} type="button" aria-pressed={lens===item.id} onClick={()=>setLens(item.id)}>{item.label}<span>{item.id==="sources"?sourceRows.length:item.id==="documented"?ROWS.filter((r)=>r.research.sources.length>=3&&r.independent>=1&&r.linkedEvents===r.research.chronology.length).length:item.id==="self-description"?ROWS.filter((r)=>r.independent===0).length:item.id==="ownership-unknown"?ROWS.filter((r)=>r.ownershipUnknown.length).length:item.id==="competing"?ROWS.filter((r)=>r.competing.length).length:ROWS.filter((r)=>r.needsReview.length).length}</span></button>)}</div>
    </section>

    {lens!=="sources"&&<div className={styles.tools}><input aria-label="Search evidence records" placeholder="Search a case, field, tension, or evidence phrase…" value={query} onChange={(event)=>setQuery(event.target.value)}/><label>Order <select value={sort} onChange={(event)=>setSort(event.target.value as typeof sort)}><option value="review">Research attention</option><option value="sources">Source count</option><option value="name">Case name</option></select></label><strong>{shown.length} cases</strong></div>}

    {lens==="sources"?<section className={styles.sourceList} aria-live="polite">{sourceRows.map((source)=><article key={source.publisher}><div><p className={styles.label}>Recurring publisher</p><h3>{source.publisher}</h3></div><p><strong>{source.cases.size} cases</strong><br/>{source.independent} independent source record{source.independent===1?"":"s"} · {source.firstParty} first-party/institutional</p></article>)}</section>:<section className={styles.grid} aria-live="polite">{shown.map((row)=><article className={styles.card} key={row.slug}><p className={styles.meta}>{row.domain} · {row.tension}</p><h3>{row.name}</h3><div className={styles.metrics}><span><b>{row.research.sources.length}</b> sources</span><span><b>{row.independent}</b> independent</span><span><b>{row.research.unknowns.length}</b> unknowns</span></div><p className={styles.label}>Why this record appears here</p><blockquote>{evidenceFor(row)}</blockquote><p className={styles.reviewed}>Last standardized review: {row.research.reviewed}</p><Link href={`/observatory/${row.slug}`}>Examine the complete evidence record →</Link></article>)}{shown.length===0&&<div className={styles.empty}><strong>No record meets this rule and search.</strong><p>Absence from this view is not proof that the condition does not exist; it may reflect how the public record has been standardized.</p></div>}</section>}

    <aside className={styles.guardrail}><strong>Classification is visible, reversible, and not a score.</strong><span>Source quantity does not guarantee accuracy. Self-description can be accurate. Independent reporting can repeat the same underlying claim. “Unknown” means the available public record does not establish the point. Every label here is a research routing decision that should change when the evidence changes.</span></aside>
  </div>;
}
