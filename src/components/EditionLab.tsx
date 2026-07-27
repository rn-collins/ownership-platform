"use client";

import { useMemo, useState } from "react";
import styles from "./EditionLab.module.css";

type Edition = "001" | "002";
type Choice = 0 | 1 | 2 | null;
const OPTIONS = ["Not yet / unknown","Partly","Yes, clearly"] as const;

const MODELS = {
  "001": {
    eyebrow:"Interactive model · Build–Carry–Control",
    title:"Where does your work become structurally yours?",
    intro:"Answer from the work you have now—not the career you hope to have. Your answers stay in this browser and produce a reflection, not a score or diagnosis.",
    groups:[
      {name:"Build",prompt:"A recognizable body of work or method exists beyond any single assignment.",why:"Build asks whether there is something coherent enough to recognize, repeat, and develop."},
      {name:"Carry",prompt:"Your reputation, relationships, methods, and useful records can survive a change of employer or platform.",why:"Carry asks what travels when the surrounding institution changes."},
      {name:"Control",prompt:"You can meaningfully decide how key identity, rights, access, revenue, and continuation conditions are used.",why:"Control asks where authority actually sits—not where visibility makes it appear to sit."},
    ],
    result:(values:number[])=>{
      const labels=["Build","Carry","Control"]; const low=Math.min(...values); const high=Math.max(...values);
      if(values.every((v)=>v===2)) return "Your answers suggest strength across all three dimensions. The next question is whether that strength survives a real disruption, not whether the framework awards you a perfect result.";
      if(low===high) return "The three dimensions appear similarly developed. Look for the dependency hidden beneath all three rather than assuming balance means durability.";
      return `${labels[values.indexOf(high)]} appears most visible; ${labels[values.indexOf(low)]} deserves the next question. Strength in one dimension does not automatically create the others.`;
    }
  },
  "002": {
    eyebrow:"Interactive model · Dependency stress test",
    title:"Which supplier could stop the work first?",
    intro:"Test the most important dependency in your current work. This does not measure resilience; it helps you identify where a deeper investigation should begin.",
    groups:[
      {name:"Visible",prompt:"You can name the dependency and explain exactly what it supplies.",why:"Invisible dependencies cannot be planned for or negotiated."},
      {name:"Substitutable",prompt:"Another supplier could perform the same job without destroying the work.",why:"A backup exists only if the work can actually move to it."},
      {name:"Negotiable",prompt:"You can influence price, access, rights, timing, data, or exit terms.",why:"A relationship can be valuable while still leaving you with little bargaining power."},
      {name:"Survivable",prompt:"If it disappeared tomorrow, you could keep operating long enough to adapt.",why:"Survival time matters more than the mere number of suppliers."},
    ],
    result:(values:number[])=>{
      const labels=["visibility","substitutability","negotiability","survivability"]; const low=Math.min(...values); const lows=labels.filter((_,i)=>values[i]===low);
      if(low===2) return "This dependency looks legible and manageable from your answers. Stress-test the assumption: what event would make all four answers false at once?";
      return `Begin with ${lows.join(" and ")}. The point is not to eliminate the dependency; it is to understand whether you can redesign, distribute, or survive it.`;
    }
  }
} as const;

export function EditionLab({edition}:{edition:Edition}) {
  const model=MODELS[edition];
  const [answers,setAnswers]=useState<Choice[]>(model.groups.map(()=>null));
  const [open,setOpen]=useState<number|null>(null);
  const complete=answers.every((value)=>value!==null);
  const values=answers.filter((value):value is 0|1|2=>value!==null);
  const result=useMemo(()=>complete?model.result(values):null,[complete,model,values]);
  const setAnswer=(index:number,value:0|1|2)=>setAnswers((current)=>current.map((item,i)=>i===index?value:item));

  return <section className={styles.lab} aria-labelledby={`edition-${edition}-lab`}>
    <header><p>{model.eyebrow}</p><h2 id={`edition-${edition}-lab`}>{model.title}</h2><span>{model.intro}</span></header>
    <div className={styles.steps}>{model.groups.map((group,index)=><article key={group.name} className={answers[index]!==null?styles.answered:""}>
      <div className={styles.stepTop}><span>0{index+1}</span><h3>{group.name}</h3><button type="button" aria-expanded={open===index} onClick={()=>setOpen(open===index?null:index)}>{open===index?"Hide why":"Why this matters"}</button></div>
      <p>{group.prompt}</p>
      {open===index&&<div className={styles.why}>{group.why}</div>}
      <fieldset><legend>Which is closest right now?</legend><div>{OPTIONS.map((option,value)=><button type="button" key={option} aria-pressed={answers[index]===value} onClick={()=>setAnswer(index,value as 0|1|2)}>{option}</button>)}</div></fieldset>
    </article>)}</div>
    <div className={styles.result} aria-live="polite">{result?<><p>Your reflection</p><h3>{result}</h3><button type="button" onClick={()=>setAnswers(model.groups.map(()=>null))}>Start again</button></>:<><p>{values.length} of {model.groups.length} considered</p><h3>Complete each dimension to reveal the tension in your answers.</h3></>}</div>
    <p className={styles.privacy}>No answer is sent, saved, scored, or compared with another person.</p>
  </section>;
}
