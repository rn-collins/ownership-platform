"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import {SEED,nodeSlug} from "@/lib/observatory_seed";
import {getCaseResearch} from "@/lib/case_research";
import styles from "./teaching.module.css";
const MODES=[
{label:"Classify an asset",task:"Identify one visible asset in the record. Argue whether it is owned, controlled, portable, dependent, or unknown. Cite the evidence that permits—and limits—your classification."},
{label:"Reconstruct dependency",task:"Map the case’s dependency chain: people, employers, platforms, capital, titles, distribution, intellectual property, and public mandate. Distinguish documented links from inference."},
{label:"Test an explanation",task:"State the most inviting explanation for the career’s structural turn. Then identify the strongest competing explanation and the evidence that would distinguish them."},
{label:"Evidence that changes your mind",task:"Write the current interpretation, then specify the private or public evidence that would materially strengthen, weaken, or reverse it."},
{label:"Redesign under constraint",task:"Redesign the work so it could survive one constraint: loss of employer, platform, founder, title, capital, or distribution. State every assumption introduced."}
];
export function TeachingStudio(){
const [slug,setSlug]=useState(nodeSlug(SEED[0].name));const [mode,setMode]=useState(0);const [minutes,setMinutes]=useState("30");
const person=SEED.find(p=>nodeSlug(p.name)===slug)!;const research=getCaseResearch(slug)!;const exercise=MODES[mode];
const agenda=useMemo(()=>{const n=Number(minutes);return n<=20?["3 min: read the record","7 min: individual classification","7 min: compare evidence","3 min: name what remains unknown"]:n<=45?["7 min: read and annotate","10 min: individual analysis","15 min: small-group challenge","8 min: whole-room synthesis","5 min: evidence needed next"]:["10 min: case briefing","15 min: dependency mapping","20 min: competing explanations","20 min: constrained redesign","10 min: countercase challenge","15 min: synthesis and research questions"];},[minutes]);
return <div className={styles.studio}><section className={styles.controls}><label>Case<select value={slug} onChange={e=>setSlug(e.target.value)}>{SEED.map(p=><option key={p.name} value={nodeSlug(p.name)}>{p.name} — {p.domain}</option>)}</select></label><label>Exercise<select value={mode} onChange={e=>setMode(Number(e.target.value))}>{MODES.map((m,i)=><option key={m.label} value={i}>{m.label}</option>)}</select></label><label>Session length<select value={minutes} onChange={e=>setMinutes(e.target.value)}><option value="20">20 minutes</option><option value="45">45 minutes</option><option value="90">90 minutes</option></select></label></section>
<section className={styles.sheet}><p className={styles.kicker}>Facilitator-ready exercise</p><h2>{exercise.label}: {person.name}</h2><p className={styles.prompt}>{exercise.task}</p><div className={styles.columns}><article><h3>Case claim to test</h3><p>{research.interpretation}</p><h3>Strongest complication</h3><p>{research.complication[0]}</p></article><article><h3>Agenda</h3><ol>{agenda.map(x=><li key={x}>{x}</li>)}</ol><h3>Debrief</h3><ul><li>What did the evidence establish?</li><li>What did you infer?</li><li>What remains private or unknown?</li><li>Which countercase should be examined next?</li></ul></article></div><div className={styles.actions}><Link href={"/observatory/"+slug}>Open full case record →</Link><Link href={"/observatory/countercases?case="+slug}>Find a countercase →</Link></div></section>
<aside className={styles.guardrail}><strong>Teaching rule</strong><span>Participants may disagree with the interpretation. They may not turn an unknown into a fact, source quantity into certainty, or visible success into proof of ownership.</span></aside></div>;
}
