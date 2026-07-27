"use client";

import { useMemo, useState } from "react";
import { SEED, nodeSlug } from "@/lib/observatory_seed";
import styles from "./apply.module.css";

type RouteKey = "leave" | "attention" | "range" | "role" | "platform" | "succession";
type Pathway = {
  title: string;
  tension: string;
  why: string;
  cases: string[];
  countercase: string;
  questions: string[];
};

const PATHWAYS: Record<RouteKey, Pathway> = {
  leave: {
    title: "Leaving an institution without starting over",
    tension: "Portable vs embedded",
    why: "Your description puts the boundary between what travels with a person and what remains inside an employer, client, or other institutional container at the center.",
    cases: ["Suzie Reider", "Jony Ive", "Mo Gawdat"],
    countercase: "Marc Pritchard",
    questions: [
      "Which methods, relationships, proof, and reputation could move lawfully and practically?",
      "Which teams, budgets, data, rights, and distribution would remain behind?",
      "What evidence of your capability exists outside the institution’s name?",
      "What would you need to build before a transition so leaving would not mean becoming illegible?"
    ]
  },
  attention: {
    title: "Turning attention into owned infrastructure",
    tension: "Owned vs rented",
    why: "Your description raises the question of whether visibility has become an asset you can govern—or still depends on access another organization can change.",
    cases: ["Emma Chamberlain", "Huda Kattan", "Shonda Rhimes"],
    countercase: "Marques Brownlee",
    questions: [
      "Which audience relationships can you reach directly, with permission?",
      "What rights, products, data, identity, or operating systems do you control?",
      "Which channel currently creates the largest single point of failure?",
      "What would still operate if your most important platform disappeared for six months?"
    ]
  },
  range: {
    title: "Building across several disciplines",
    tension: "One field vs many",
    why: "Your description makes coherence—not specialization—the structural problem: whether several kinds of work compound through a shared question, method, or infrastructure.",
    cases: ["Neri Oxman", "Brad Keywell", "Fei-Fei Li"],
    countercase: "Brian May",
    questions: [
      "What repeated question or method connects work that looks unrelated from the outside?",
      "Which parts share an audience, operating system, archive, or body of knowledge?",
      "Where does range create compounding advantage—and where does it divide attention?",
      "What is the clearest public artifact that makes the whole legible without flattening it?"
    ]
  },
  role: {
    title: "Creating a role that can outlast its first holder",
    tension: "Role vs person",
    why: "Your description points to the difference between a title that recognizes one person and an office with durable mandate, resources, and succession.",
    cases: ["Kenny Gold", "Darren Murph", "Linda Fisher"],
    countercase: "Astro Teller",
    questions: [
      "What decisions, budget, staff, standards, and reporting lines belong to the role?",
      "Which authority depends on personal trust rather than formal mandate?",
      "What routines or records would let another person perform the function?",
      "What evidence would show that the institution changed—not merely its language?"
    ]
  },
  platform: {
    title: "Scaling without becoming trapped by one platform",
    tension: "Scale vs dependence",
    why: "Your description centers the trade between reach and dependence: what scale makes possible, what it demands, and whether the dependency is substitutable.",
    cases: ["Jack Conte", "Codie Sanchez", "MrBeast (Jimmy Donaldson)"],
    countercase: "Pieter Levels",
    questions: [
      "Which dependency supplies reach, capital, labor, credibility, or distribution?",
      "Can that dependency be replaced, renegotiated, or survived?",
      "What direct relationship or owned system grows each time the platform grows?",
      "At what point would additional scale reduce rather than increase your optionality?"
    ]
  },
  succession: {
    title: "Building something that can continue without its founder",
    tension: "Institution vs individual",
    why: "Your description makes continuation the central test: whether the work has become a governed system or remains inseparable from one person’s attention and authority.",
    cases: ["Peter Diamandis", "Noubar Afeyan", "Gary Vaynerchuk"],
    countercase: "Jane Gilbert",
    questions: [
      "Which functions still require the founder’s judgment, relationships, or public visibility?",
      "Where are method, standards, decision rights, and institutional memory held?",
      "Who can disagree with the founder, and through what governance?",
      "What would continue unchanged—and what should change—after succession?"
    ]
  }
};

const ARRANGEMENTS = [
  ["institution", "Most of my work happens inside an employer or institution"],
  ["independent", "I work independently, through clients, products, or projects"],
  ["mixed", "My work spans employment and independent activity"],
  ["founder", "I lead something I founded or built around my work"]
] as const;

const PRESSURES = [
  ["leave", "I may leave a role or institution and do not want to start over"],
  ["attention", "I have visibility or an audience but do not control enough underneath it"],
  ["range", "My work spans several disciplines and is hard to explain as one thing"],
  ["role", "I am building a new function, mandate, or role inside an organization"],
  ["platform", "Growth depends heavily on a platform, partner, client, funder, or distributor"],
  ["succession", "Too much of the work still depends on me personally"]
] as const;

const ROUTE_BY_ARRANGEMENT: Record<string, RouteKey> = {
  institution: "leave", independent: "platform", mixed: "range", founder: "succession"
};

export default function ApplyToWork() {
  const [arrangement, setArrangement] = useState("");
  const [pressure, setPressure] = useState<RouteKey | "">("");
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const route = (pressure || ROUTE_BY_ARRANGEMENT[arrangement] || "range") as RouteKey;
  const pathway = PATHWAYS[route];

  const people = useMemo(() => {
    const names = [...pathway.cases, pathway.countercase];
    return names.map((name) => SEED.find((node) => node.name === name)).filter(Boolean);
  }, [pathway]);

  function build(event: React.FormEvent) {
    event.preventDefault();
    if (!arrangement || !pressure) return;
    setSubmitted(true);
    requestAnimationFrame(() => document.getElementById("your-pathway")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  if (submitted) return <section className={styles.result} id="your-pathway" aria-live="polite">
    <div className={styles.resultHead}>
      <div><p className={styles.kicker}>Your reading pathway</p><h2>{pathway.title}</h2></div>
      <button type="button" onClick={() => setSubmitted(false)}>Change my answers</button>
    </div>
    <div className={styles.tension}><span>Structural tension to examine</span><strong>{pathway.tension}</strong><p>{pathway.why}</p></div>
    {context.trim() && <p className={styles.context}><strong>The situation you are bringing:</strong> {context}</p>}
    <ol className={styles.sequence}>
      {people.slice(0, 3).map((person, index) => person && <li key={person.name}>
        <span>0{index + 1}</span>
        <div><p>{index === 0 ? "Establish the pattern" : index === 1 ? "Change the setting" : "Test what can continue"}</p><h3>{person.name}</h3><p>{person.question}</p><a href={"/observatory/" + nodeSlug(person.name)}>Read this case →</a></div>
      </li>)}
    </ol>
    {people[3] && <aside className={styles.counter}>
      <p className={styles.kicker}>The countercase</p><h3>Before accepting the lesson, examine {people[3]!.name}.</h3>
      <p>This case complicates a simple conclusion from the first three. It may show a different route to authority, portability, scale, or continuation—or reveal that the apparent solution creates another dependency.</p>
      <blockquote>{people[3]!.question}</blockquote>
      <a href={"/observatory/" + nodeSlug(people[3]!.name)}>Open the countercase →</a>
    </aside>}
    <section className={styles.takeback}>
      <p className={styles.kicker}>Take these back to your work</p><h3>Do not answer quickly.</h3>
      <ol>{pathway.questions.map((question) => <li key={question}>{question}</li>)}</ol>
    </section>
    <p className={styles.limit}><strong>What this pathway does not establish:</strong> It does not determine what you own, what is legally portable, or what you should do next. It gives you cases and questions that can make the structure easier to see.</p>
  </section>;

  return <form className={styles.form} onSubmit={build}>
    <section>
      <div className={styles.step}><span>01</span><div><h2>Where does most of your work happen now?</h2><p>Choose the closest arrangement. It does not have to describe everything.</p></div></div>
      <div className={styles.options}>{ARRANGEMENTS.map(([value, label]) => <label key={value} className={arrangement === value ? styles.selected : ""}><input type="radio" name="arrangement" value={value} checked={arrangement === value} onChange={() => setArrangement(value)} /><span>{label}</span></label>)}</div>
    </section>
    <section>
      <div className={styles.step}><span>02</span><div><h2>Which structural pressure feels most alive?</h2><p>Choose the question you most need the cases to help you examine.</p></div></div>
      <div className={styles.options}>{PRESSURES.map(([value, label]) => <label key={value} className={pressure === value ? styles.selected : ""}><input type="radio" name="pressure" value={value} checked={pressure === value} onChange={() => setPressure(value)} /><span>{label}</span></label>)}</div>
    </section>
    <section>
      <div className={styles.step}><span>03</span><div><h2>What is happening that these choices do not capture?</h2><p>Optional. One or two sentences are enough. This stays in your browser and is shown back to you only as context.</p></div></div>
      <textarea value={context} onChange={(event) => setContext(event.target.value)} maxLength={600} placeholder="For example: I built a program inside my employer, but the method and relationships are associated with me…" />
    </section>
    <button className={styles.submit} disabled={!arrangement || !pressure} type="submit">Build my reading pathway →</button>
    <p className={styles.formLimit}>This tool chooses among six curator-designed pathways. It does not analyze your personality, assess readiness, or predict an outcome.</p>
  </form>;
}
