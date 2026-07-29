"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SEED, nodeSlug, type Node } from "@/lib/observatory_seed";
import { CASE_NARRATIVES } from "@/lib/case_narratives";
import { getCaseResearch } from "@/lib/case_research";
import styles from "./dependencies.module.css";

const DEPENDENCIES = [
  ["employer","Employer"],
  ["platform","Platform"],
  ["title","Title"],
  ["capital","Capital"],
  ["audience","Audience access"],
  ["visibility","Personal visibility"],
  ["mandate","Public mandate"],
  ["founder","Founder involvement"],
  ["ip","Intellectual property"],
  ["distribution","Distribution partner"],
] as const;

type DependencyId = typeof DEPENDENCIES[number][0];

const patterns: Record<DependencyId, RegExp> = {
  employer: /employer|employment|company role|inside (?:a|one|the) (?:company|corporation)|corporate parent|executive role|appointed|office|institutional leverage/i,
  platform: /platform|youtube|google|meta|microsoft|apple|spotify|patreon|software|search/i,
  title: /title|role|appointed|chief |head of|office|mandate/i,
  capital: /capital|invest|venture|fund|acquisition|acquired|revenue|commercial|company creation/i,
  audience: /audience|attention|reach|creator|media|community|subscriber|distribution/i,
  visibility: /personal visibility|public identity|persona|host|speaker|author|fame|reputation|personal media/i,
  mandate: /public mandate|government|county|agency|regulator|public infrastructure|administration/i,
  founder: /founder|founded|co-found|succession|without (?:its|the) founder|founder-led/i,
  ip: /intellectual property|rights|patent|brand|authorship|methods|models|dataset|archives/i,
  distribution: /distribut|publisher|network|studio|retail|partner|netflix|spotify|sirius|abc|youtube/i,
};

function caseText(node: Node) {
  const slug = nodeSlug(node.name);
  const narrative = CASE_NARRATIVES[slug];
  const research = getCaseResearch(slug);
  return [node.role,node.question,narrative?.careerArc,narrative?.structuralTurn,narrative?.whyItMatters,...(narrative?.unresolved??[]),...(research?.complication??[]),...(research?.unknowns??[])].filter(Boolean).join(" ");
}

function signals(node: Node) {
  const text = caseText(node);
  return DEPENDENCIES.filter(([id])=>patterns[id].test(text)).map(([id])=>id);
}

function evidenceLine(node: Node, active: DependencyId[]) {
  const slug = nodeSlug(node.name);
  const narrative = CASE_NARRATIVES[slug];
  const research = getCaseResearch(slug);
  const candidates = [...(research?.complication??[]),...(research?.unknowns??[]),...(narrative?.unresolved??[]),narrative?.whyItMatters,narrative?.structuralTurn].filter(Boolean) as string[];
  const match = candidates.find((line)=>active.some((id)=>patterns[id].test(line)));
  return match ?? candidates[0] ?? "The case record flags a structural dependency, but the public evidence has not yet isolated its terms.";
}

export function DependencyExplorer({ nodes = SEED }: { nodes?: Node[] }) {
  const [active,setActive] = useState<DependencyId[]>([]);
  const [query,setQuery] = useState("");
  const [mode,setMode] = useState<"any"|"all">("any");
  const rows = useMemo(()=>nodes.map((node)=>({node,signals:signals(node)})),[nodes]);
  const shown = useMemo(()=>{
    const q=query.trim().toLowerCase();
    return rows.filter(({node,signals})=>{
      const dependencyMatch = active.length===0 || (mode==="all" ? active.every((id)=>signals.includes(id)) : active.some((id)=>signals.includes(id)));
      const textMatch = !q || `${node.name} ${node.role} ${node.question??""}`.toLowerCase().includes(q);
      return dependencyMatch && textMatch;
    });
  },[rows,active,query,mode]);

  function toggle(id: DependencyId) {
    setActive((current)=>current.includes(id)?current.filter((item)=>item!==id):[...current,id]);
  }

  return <div className={styles.explorer}>
    <section className={styles.controls} aria-labelledby="filter-title">
      <div className={styles.controlIntro}>
        <div><p className={styles.kicker}>Dependency filters</p><h2 id="filter-title">What must remain available for the work to continue?</h2></div>
        <p>Choose one or several forms of dependency. The explorer matches a defined set of dependency terms against the public case summaries, complications, and unknowns. Treat the results as discovery leads, then verify the complete record—not as findings about private contracts, ownership, or financial exposure.</p>
      </div>
      <div className={styles.filters}>
        {DEPENDENCIES.map(([id,label])=><button type="button" key={id} aria-pressed={active.includes(id)} className={active.includes(id)?styles.active:""} onClick={()=>toggle(id)}>{label}<span>{rows.filter((row)=>row.signals.includes(id)).length}</span></button>)}
      </div>
      <div className={styles.searchRow}>
        <input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search a person, role, field, or question…" aria-label="Search dependency cases"/>
        <label>Match <select value={mode} onChange={(event)=>setMode(event.target.value as "any"|"all")} disabled={active.length<2}><option value="any">any selected dependency</option><option value="all">every selected dependency</option></select></label>
        {(active.length>0||query)&&<button type="button" className={styles.clear} onClick={()=>{setActive([]);setQuery("");}}>Clear</button>}
      </div>
    </section>

    <div className={styles.resultLine}><strong>{shown.length} {shown.length===1?"case":"cases"}</strong><span>{active.length ? `showing ${mode==="all"?"every":"any"} selected dependency signal` : "showing the complete collection"}</span></div>

    {shown.length?<div className={styles.grid}>{shown.map(({node,signals})=>{
      const relevant = active.length ? signals.filter((id)=>active.includes(id)) : signals;
      return <article className={styles.card} key={node.name}>
        <p className={styles.meta}>{node.domain} · {node.kind==="creator"?"creator case":"professional case"}</p>
        <h3>{node.name}</h3>
        <p className={styles.role}>{node.role}</p>
        <div className={styles.tags}>{relevant.map((id)=><span key={id}>{DEPENDENCIES.find(([key])=>key===id)?.[1]}</span>)}</div>
        <p className={styles.evidenceLabel}>Why the record raises this</p>
        <blockquote>{evidenceLine(node,active.length?active:signals)}</blockquote>
        <Link href={`/observatory/${nodeSlug(node.name)}`}>Examine the complete case →</Link>
      </article>;
    })}</div>:<div className={styles.empty}><h2>No case currently carries that combination.</h2><p>This is a collection gap, not evidence that the structure does not exist. Remove a filter or nominate a case that would fill it.</p><Link href="/observatory#nominate">Nominate a missing case →</Link></div>}

    <aside className={styles.note}><h2>How to read a dependency signal</h2><div><p><strong>It can mean leverage.</strong> A distributor, employer, investor, or public office may make work possible at a scale the person could not reach alone.</p><p><strong>It can mean exposure.</strong> The same relationship may constrain portability, continuity, control, or succession.</p><p><strong>It does not establish ownership.</strong> Public descriptions rarely reveal complete contracts, equity, data rights, intellectual property, or decision authority.</p></div></aside>
  </div>;
}
