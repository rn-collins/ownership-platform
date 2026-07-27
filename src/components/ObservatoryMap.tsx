"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { SEED, OBSERVATORY_DOMAINS as DOMAINS, nodeSlug, type Node } from "@/lib/observatory_seed";
import styles from "./ObservatoryExplorer.module.css";

type View = "discover" | "patterns" | "compare" | "composition" | "gaps";
type Pattern = { tension: string; domain: string } | null;
const ACCENTS = ["#ff6b55", "#20b8a6", "#f2bd3f", "#8b78d1", "#3d9fc1", "#e36e9a", "#ca9840"];
const VIEW_COPY: Record<View, [string,string]> = {
  discover:["Find a case","Start with a question you recognize."],
  patterns:["Trace a pattern","Follow one tension across different fields."],
  compare:["Compare cases","See what changes when the structure changes."],
  composition:["About the collection","Understand what these 41 can—and cannot—show."],
  gaps:["Shape the next 41","See the missing perspectives and add one."],
};
const PRIMARY_VIEWS: View[] = ["discover", "patterns", "compare"];
const CONTEXT_VIEWS: View[] = ["composition", "gaps"];

function tally<T extends string>(items:T[]):Array<[T,number]> {
  const counts = new Map<T,number>();
  items.forEach((item)=>counts.set(item,(counts.get(item)??0)+1));
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]);
}

export function ObservatoryMap({ nodes = SEED, embed = false, initialView = "directory" }: { nodes?: Node[]; embed?: boolean; initialView?: "directory" | "map" }) {
  const [view,setView] = useState<View>(initialView === "map" ? "patterns" : "discover");
  const [tension,setTension] = useState("all");
  const [domain,setDomain] = useState("all");
  const [query,setQuery] = useState("");
  const [pattern,setPattern] = useState<Pattern>(null);
  const [compare,setCompare] = useState<string[]>([nodes[0]?.name,nodes.find((n)=>n.kind==="creator")?.name].filter(Boolean) as string[]);
  const tensions = useMemo(()=>Array.from(new Set(nodes.map((n)=>n.tension).filter(Boolean))) as string[],[nodes]);
  const domains = useMemo(()=>DOMAINS.filter((item)=>nodes.some((n)=>n.domain===item)),[nodes]);
  const shown = useMemo(()=>{const q=query.trim().toLowerCase();return nodes.filter((n)=>(tension==="all"||n.tension===tension)&&(domain==="all"||n.domain===domain)&&(!q||`${n.name} ${n.role} ${n.domain} ${n.tension??""} ${n.question??""}`.toLowerCase().includes(q)));},[nodes,tension,domain,query]);
  const selectedCases = pattern ? nodes.filter((n)=>n.tension===pattern.tension&&n.domain===pattern.domain) : [];
  const selectedCompare = compare.map((name)=>nodes.find((n)=>n.name===name)).filter(Boolean) as Node[];
  const tensionCounts = useMemo(()=>tally(nodes.map((n)=>n.tension??"Uncoded")),[nodes]);
  const domainCounts = useMemo(()=>tally(nodes.map((n)=>n.domain)),[nodes]);
  const creatorCount = nodes.filter((n)=>n.kind==="creator").length;
  const roleBuiltCount = nodes.filter((n)=>n.created).length;
  const maxTension = tensionCounts[0]?.[1]??1;
  const maxDomain = domainCounts[0]?.[1]??1;

  if (embed) return <div className={styles.grid}>{nodes.slice(0,4).map((n,index)=><CaseCard key={n.name} node={n} index={index}/>)}</div>;

  const toggleCompare=(name:string)=>{
    setCompare((current)=>current.includes(name)?current.filter((item)=>item!==name):current.length<2?[...current,name]:[current[1],name]);
  };

  return <div className={styles.shell}>
    <div className={styles.viewChooser}>
      <div>
        <p className={styles.switcherLabel}>Use the cases</p>
        <nav className={styles.switcher} aria-label="Ways to use the 41 cases">
          {PRIMARY_VIEWS.map((key)=><button type="button" key={key} className={view===key?styles.active:""} aria-pressed={view===key} onClick={()=>setView(key)}><strong>{VIEW_COPY[key][0]}</strong><span>{VIEW_COPY[key][1]}</span></button>)}
        </nav>
      </div>
      <div>
        <p className={styles.switcherLabel}>Understand and extend the research</p>
        <nav className={`${styles.switcher} ${styles.contextSwitcher}`} aria-label="About and contribute to the collection">
          {CONTEXT_VIEWS.map((key)=><button type="button" key={key} className={view===key?styles.active:""} aria-pressed={view===key} onClick={()=>setView(key)}><strong>{VIEW_COPY[key][0]}</strong><span>{VIEW_COPY[key][1]}</span></button>)}
        </nav>
      </div>
    </div>

    {view==="discover"&&<section aria-labelledby="discover-title">
      <div className={styles.intro}><div><p className={styles.kicker}>41 careers · no leaderboard</p><h2 id="discover-title">Begin with the question, not the résumé.</h2></div><p>Start with a question that sounds like something you have wondered about your own work. Then meet the person whose career makes that question real.</p></div>
      <div className={styles.tensions} aria-label="Career tensions"><button type="button" className={tension==="all"?styles.active:""} onClick={()=>setTension("all")}>Surprise me</button>{tensions.map((item)=><button type="button" key={item} className={tension===item?styles.active:""} onClick={()=>setTension(item)}>{item}</button>)}</div>
      <div className={styles.controls}><input value={query} onChange={(event)=>setQuery(event.target.value)} aria-label="Search people and questions" placeholder="Try a person, role, field, or idea…"/><select value={domain} onChange={(event)=>setDomain(event.target.value)} aria-label="Choose a field"><option value="all">Every field</option>{domains.map((item)=><option value={item} key={item}>{item}</option>)}</select></div>
      <div className={styles.result}><strong>{shown.length} {shown.length===1?"case":"cases"}</strong><span>Choose two people to see what their careers depend on—and what differs.</span></div>
      {shown.length?<div className={styles.grid}>{shown.map((n,index)=><CaseCard key={n.name} node={n} index={index} compareActive={compare.includes(n.name)} onCompare={()=>toggleCompare(n.name)}/>)}</div>:<div className={styles.empty}><strong>Nothing here—yet.</strong><p>Broaden the search or treat the absence as a nomination prompt.</p></div>}
    </section>}

    {view==="patterns"&&<section aria-labelledby="patterns-title">
      <div className={styles.intro}><div><p className={styles.kicker}>Pattern map</p><h2 id="patterns-title">Where does the same tension appear in a different world?</h2></div><p>Rows are research tensions. Columns are fields. Color and number show how many of these 41 cases sit at the intersection—nothing more.</p></div>
      <div className={styles.mapWrap}><div className={styles.mapLegend}><span><i className={styles.low}/>one case</span><span><i className={styles.high}/>two or more</span><span>Empty = not yet represented</span></div>
        <div className={styles.matrix} style={{"--columns":domains.length} as CSSProperties}><div className={styles.corner}>Tension × field</div>{domains.map((item)=><div className={styles.colHead} key={item}>{item}</div>)}{tensions.flatMap((row)=>[<div className={styles.rowHead} key={`${row}-label`}>{row}</div>,...domains.map((col)=>{const count=nodes.filter((n)=>n.tension===row&&n.domain===col).length;return <button type="button" key={`${row}-${col}`} className={`${styles.cell} ${count>1?styles.cellStrong:""}`} disabled={!count} aria-label={`${count} ${count===1?"case":"cases"} about ${row} in ${col}`} onClick={()=>setPattern({tension:row,domain:col})}>{count||"·"}</button>;})])}</div>
        {pattern?<div className={styles.mapSelection}><button type="button" onClick={()=>setPattern(null)} aria-label="Close pattern">×</button><p className={styles.kicker}>Selected intersection</p><h3>{pattern.tension} × {pattern.domain}</h3><p>{selectedCases.length===1?"One case begins here. Compare it with another field before treating it as a pattern.":`${selectedCases.length} cases let us compare how the same tension behaves in one field.`}</p><div className={styles.mapList}>{selectedCases.map((n)=><Link className={styles.mapPerson} href={`/observatory/${nodeSlug(n.name)}`} key={n.name}><strong>{n.name}</strong><span>{n.question}</span></Link>)}</div></div>:<p className={styles.prompt}>Choose a numbered cell. The people and questions behind that intersection will open here.</p>}
      </div>
    </section>}

    {view==="compare"&&<section aria-labelledby="compare-title">
      <div className={styles.intro}><div><p className={styles.kicker}>Case comparator</p><h2 id="compare-title">Difference is where the argument gets interesting.</h2></div><p>Choose two people. This does not score either career; it makes their visible structures and unanswered questions easier to contrast.</p></div>
      <div className={styles.comparePicker}>{[0,1].map((slot)=><label key={slot}>Case {slot+1}<select value={compare[slot]??""} onChange={(event)=>setCompare((current)=>{const next=[...current];next[slot]=event.target.value;return next.filter(Boolean).slice(0,2);})}><option value="">Choose a person</option>{nodes.map((n)=><option value={n.name} key={n.name}>{n.name}</option>)}</select></label>)}</div>
      {selectedCompare.length===2?<div className={styles.comparison}>{selectedCompare.map((n,index)=><article key={n.name} style={{"--accent":ACCENTS[index]} as CSSProperties}><p className={styles.kicker}>{n.tension}</p><h3>{n.name}</h3><p className={styles.role}>{n.role}</p><p className={styles.caseQuestionLabel}>Question this case helps us investigate</p><blockquote>{n.question}</blockquote><dl><div><dt>Field</dt><dd>{n.domain}</dd></div><div><dt>Central tension</dt><dd>{n.tension}</dd></div><div><dt>Do not assume</dt><dd>Visibility proves ownership, control, portability, or durability.</dd></div></dl><Link href={`/observatory/${nodeSlug(n.name)}`}>Examine the evidence for {n.name} →</Link></article>)}</div>:<div className={styles.empty}>Choose two different cases to begin.</div>}
      {selectedCompare.length===2&&<div className={styles.compareQuestions}><h3>Questions the contrast creates</h3><ul><li>What can each person carry if the current institution or platform disappears?</li><li>Which relationships, rights, audiences, or systems appear personally controlled—and which remain unknown?</li><li>Does the difference come from field, career stage, organizational form, or the evidence currently available?</li></ul></div>}
    </section>}

    {view==="composition"&&<section aria-labelledby="composition-title">
      <div className={styles.intro}><div><p className={styles.kicker}>Descriptive analysis</p><h2 id="composition-title">What the pilot can show—and what it currently overweights.</h2></div><p>These are counts inside a deliberately selected 41-case pilot. They describe this roster, not the workforce, creator economy, or prevalence of institutionhood.</p></div>
      <div className={styles.statGrid}><article><strong>41</strong><span>purposefully selected cases</span></article><article><strong>{nodes.length-creatorCount}</strong><span>professional cases</span></article><article><strong>{creatorCount}</strong><span>creator cases</span></article><article><strong>{roleBuiltCount}</strong><span>roles that may have been shaped around one person</span></article></div>
      <div className={styles.chartGrid}><BarList title="Tensions represented" items={tensionCounts} max={maxTension}/><BarList title="Fields represented" items={domainCounts} max={maxDomain}/></div>
      <div className={styles.analysisNote}><h3>Responsible quantitative uses</h3><p>Counts, shares, cross-tabs, concentration, representation gaps, and change across future roster versions. Not causal inference, ranking, prediction, psychological diagnosis, or population estimates.</p></div>
    </section>}

    {view==="gaps"&&<section aria-labelledby="gaps-title">
      <div className={styles.intro}><div><p className={styles.kicker}>Research agenda</p><h2 id="gaps-title">The blank cells are not nothing. They are instructions.</h2></div><p>A blank means this roster has not yet paired a field with a tension. It does not mean no such person exists.</p></div>
      <div className={styles.gapGrid}>{tensions.map((row)=>{const missing=domains.filter((col)=>!nodes.some((n)=>n.tension===row&&n.domain===col));return <article key={row}><span>{nodes.filter((n)=>n.tension===row).length} current cases</span><h3>{row}</h3><p>Not yet represented in {missing.slice(0,4).join(", ")}{missing.length>4?` + ${missing.length-4} more`:""}.</p><Link href="/observatory#nominate">Nominate a case that changes this →</Link></article>})}</div>
      <div className={styles.analysisNote}><h3>Qualitative work this roster supports</h3><p>Within-case narrative analysis, cross-case comparison, thematic coding, typology building, negative-case analysis, process tracing, dependency mapping, and evidence-gap analysis. Every interpretation should remain traceable to dated claims and revisable as cases deepen.</p></div>
    </section>}
  </div>;
}

function CaseCard({node,index,compareActive=false,onCompare}:{node:Node;index:number;compareActive?:boolean;onCompare?:()=>void}) {
  return <article className={styles.card} style={{"--accent":ACCENTS[index%ACCENTS.length]} as CSSProperties}><div className={styles.top}><span className={styles.tension}>{node.tension??"Open question"}</span><span className={styles.domain}>{node.domain}</span></div><p className={styles.question}>{node.question??"What does this career make possible—and what makes it fragile?"}</p><div className={styles.identity}><h3>{node.name}</h3><p>{node.role}</p><div className={styles.cardActions}><Link href={`/observatory/${nodeSlug(node.name)}`}>See why this career matters →</Link>{onCompare&&<button type="button" className={compareActive?styles.saved:""} onClick={onCompare}>{compareActive?"Saved to compare":"Compare"}</button>}</div></div></article>;
}

function BarList({title,items,max}:{title:string;items:Array<[string,number]>;max:number}) {
  return <article className={styles.barCard}><h3>{title}</h3><div>{items.map(([label,value])=><div className={styles.barRow} key={label}><span>{label}</span><div><i style={{width:`${Math.max(6,(value/max)*100)}%`}}/></div><strong>{value}</strong></div>)}</div></article>;
}
