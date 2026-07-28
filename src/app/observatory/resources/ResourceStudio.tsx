"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SEED, nodeSlug } from "@/lib/observatory_seed";
import { getCaseResearch, type CaseResearchRecord } from "@/lib/case_research";
import styles from "./resources.module.css";

type ArtifactSection = { heading: string; body?: string; items?: string[] };
type Artifact = {
  label: string;
  promise: string;
  eyebrow: string;
  title: string;
  sections: ArtifactSection[];
  closing: string;
};

const FORMATS = [
  "Visual explainer",
  "Worksheet",
  "Discussion guide",
  "Short audio story",
  "Social carousel",
  "Newsletter argument",
  "Teaching exercise",
  "Case constellation",
  "Research question",
  "Organization workshop",
] as const;

function chronologyLines(r: CaseResearchRecord, limit = 4) {
  return r.chronology.slice(0, limit).map((event) =>
    `${event.date} — ${event.event} [${event.sourceIds.join(", ")}]`
  );
}

function sourceLines(r: CaseResearchRecord, limit = 5) {
  return r.sources.slice(0, limit).map((source) =>
    `${source.label} — ${source.publisher} (${source.kind})`
  );
}

function buildArtifact(
  format: number,
  person: (typeof SEED)[number],
  r: CaseResearchRecord
): Artifact {
  const name = person.name;
  const question = person.question || `What does ${name}'s case make visible?`;
  const complication = r.complication[0];
  const unknown = r.unknowns[0];
  const timeline = chronologyLines(r);
  const sources = sourceLines(r);

  const artifacts: Artifact[] = [
    {
      label: "A panel-by-panel visual plan",
      promise: "A designer can build this without inventing the argument.",
      eyebrow: "Visual explainer · 6 panels",
      title: `${name}: what travels, what stays, and what remains unknown`,
      sections: [
        { heading: "Panel 1 · The question", body: question },
        { heading: "Panel 2 · The documented turn", body: timeline.at(-1) },
        { heading: "Panel 3 · The structure", body: r.interpretation },
        { heading: "Panel 4 · The dependency", body: complication },
        { heading: "Panel 5 · The unresolved point", body: unknown },
        { heading: "Panel 6 · The responsible conclusion", body: r.payoff },
        { heading: "Source footer", items: sources },
      ],
      closing: "Visual rule: show the person inside the system. Do not use a lone-hero image that erases collaborators, employers, platforms, capital, or distribution.",
    },
    {
      label: "A participant-facing worksheet",
      promise: "Prompts, evidence fields, and a completed facilitator key are separated.",
      eyebrow: "Worksheet · Build–Carry–Control–Continue",
      title: `Map the structure around ${name}'s work`,
      sections: [
        { heading: "1 · Build", body: "What was built, created, organized, or changed? Cite one chronology event before answering." },
        { heading: "2 · Carry", body: "What knowledge, reputation, relationships, methods, or rights appear able to travel with the person?" },
        { heading: "3 · Control", body: "Which decisions, assets, channels, data, budgets, or rights are demonstrably controlled—and which are only associated with the person?" },
        { heading: "4 · Continue", body: "What appears capable of operating without the person? What evidence would prove or disprove that?" },
        { heading: "Evidence to use", items: timeline },
        { heading: "Facilitator key · current interpretation", body: r.interpretation },
        { heading: "Required uncertainty", body: unknown },
      ],
      closing: "Completion rule: every answer must be marked Documented, Inferred, or Unknown.",
    },
    {
      label: "A moderated conversation plan",
      promise: "Opening, evidence challenge, counterargument, and close have distinct jobs.",
      eyebrow: "Discussion guide · 35 minutes",
      title: `Does ${name}'s case support the lesson we want to take from it?`,
      sections: [
        { heading: "Opening question · 5 min", body: question },
        { heading: "Evidence round · 10 min", items: timeline.slice(0, 3) },
        { heading: "Provisional claim · 5 min", body: r.interpretation },
        { heading: "Challenge round · 10 min", items: r.complication.slice(0, 3) },
        { heading: "Closing question · 5 min", body: `What evidence would let us answer: ${unknown}` },
      ],
      closing: "Moderator rule: do not let visible success substitute for evidence of ownership, control, causation, or durability.",
    },
    {
      label: "A timed narration script",
      promise: "The selected output now reads like audio, with timing and spoken transitions.",
      eyebrow: "Short audio story · approximately 4 minutes",
      title: `${name} and the structure behind the résumé`,
      sections: [
        { heading: "0:00–0:25 · Cold open", body: question },
        { heading: "0:25–1:20 · What happened", body: timeline.join(" ") },
        { heading: "1:20–2:15 · What the chronology may mean", body: r.interpretation },
        { heading: "2:15–3:05 · The turn", body: `But the clean version of that story leaves something out: ${complication}` },
        { heading: "3:05–3:40 · What the record cannot tell us", body: unknown },
        { heading: "3:40–4:00 · Close", body: r.payoff },
        { heading: "Show-note sources", items: sources },
      ],
      closing: "Audio rule: attribution belongs in the narration or show notes. Do not voice inference as biography.",
    },
    {
      label: "An eight-slide carousel",
      promise: "Each slide has a single editorial job and the sequence reaches a bounded conclusion.",
      eyebrow: "Social carousel · 8 slides",
      title: `${name}: the career lesson that gets too simple too quickly`,
      sections: [
        { heading: "Slide 1 · Hook", body: question },
        { heading: "Slide 2 · Before", body: timeline[0] },
        { heading: "Slide 3 · Structural turn", body: timeline.at(-1) },
        { heading: "Slide 4 · What appears portable", body: r.interpretation },
        { heading: "Slide 5 · What the work still depends on", body: complication },
        { heading: "Slide 6 · What we do not know", body: unknown },
        { heading: "Slide 7 · The bounded takeaway", body: r.payoff },
        { heading: "Slide 8 · Read the evidence", items: sources.slice(0, 3) },
      ],
      closing: "Carousel rule: the hook may sharpen the question; it may not sharpen the evidence into certainty.",
    },
    {
      label: "An argued newsletter outline",
      promise: "This is an actual thesis, evidence sequence, objection, and bounded ending.",
      eyebrow: "Newsletter argument · 900–1,200 words",
      title: `${name} shows why career portability is not the same as independence`,
      sections: [
        { heading: "Thesis", body: r.interpretation },
        { heading: "Opening scene", body: timeline.at(-1) },
        { heading: "Evidence sequence", items: timeline },
        { heading: "Strongest objection", body: complication },
        { heading: "What cannot be resolved from the public record", body: unknown },
        { heading: "Conclusion", body: r.payoff },
        { heading: "Citations to preserve", items: sources },
      ],
      closing: "Editorial rule: if the objection changes the thesis, rewrite the thesis. Do not bury the complication in a disclaimer.",
    },
    {
      label: "A ready-to-run evidence exercise",
      promise: "Participants receive a task, record, challenge, and debrief—not a generic lesson plan.",
      eyebrow: "Teaching exercise · 30 minutes",
      title: `Separate association from control in the case of ${name}`,
      sections: [
        { heading: "Learning objective", body: "Distinguish what a public record documents from what a reader infers about ownership, authority, portability, and continuation." },
        { heading: "Case packet", items: timeline },
        { heading: "Individual task · 8 min", body: "Mark each claimed asset or form of authority as Documented, Inferred, Contested, or Unknown." },
        { heading: "Small-group challenge · 10 min", body: complication },
        { heading: "Evidence request · 5 min", body: `Name the source, record, contract, interview, or observation needed to answer: ${unknown}` },
        { heading: "Debrief · 7 min", body: r.payoff },
      ],
      closing: "Assessment rule: reward evidence discipline, not agreement with the Observatory's interpretation.",
    },
    {
      label: "A comparison map",
      promise: "The case is positioned by structural relationship, not fame or surface similarity.",
      eyebrow: "Case constellation · comparison plan",
      title: `Place ${name} inside a structural neighborhood`,
      sections: [
        { heading: "Center case", body: `${name} — ${r.interpretation}` },
        { heading: "Neighbor 1 · Same tension", body: `Choose a case tagged “${person.tension}” and compare what each person can carry.` },
        { heading: "Neighbor 2 · Same dependency", body: "Choose a case reliant on the same employer, platform, capital, audience, mandate, IP, or distribution structure." },
        { heading: "Neighbor 3 · Different field", body: `Choose a case outside ${person.domain} that presents the same structural problem.` },
        { heading: "Countercase", body: `Choose the case that most directly complicates this interpretation: ${complication}` },
        { heading: "Connection labels", items: ["Reinforces", "Complicates", "Reverses", "Leaves unresolved"] },
      ],
      closing: "Comparison rule: every connecting line needs a sentence explaining the shared or opposing structure.",
    },
    {
      label: "An evidence-acquisition protocol",
      promise: "The unknown becomes a researchable question with evidence and stopping conditions.",
      eyebrow: "Research question · acquisition plan",
      title: unknown,
      sections: [
        { heading: "Why this matters", body: `The answer could strengthen, narrow, or reverse the current interpretation: ${r.interpretation}` },
        { heading: "What is already established", items: timeline },
        { heading: "Best evidence to seek", items: ["Governing documents, contracts, or filings", "Named decision-rights and reporting relationships", "Multiple knowledgeable interviews", "Observable post-transition outcomes"] },
        { heading: "Disconfirming evidence", body: complication },
        { heading: "Stopping condition", body: "Stop when two independent evidence types converge, or report the question as unresolved when access remains private." },
      ],
      closing: "Research rule: inability to obtain private evidence is a limit, not permission to infer the answer.",
    },
    {
      label: "A decision-focused team workshop",
      promise: "The case becomes a mirror for one organization's structure without treating the person as a template.",
      eyebrow: "Organization workshop · 75 minutes",
      title: `If ${name} left the picture, what would the system retain?`,
      sections: [
        { heading: "Frame · 10 min", body: question },
        { heading: "Case evidence · 10 min", items: timeline.slice(0, 4) },
        { heading: "Dependency map · 15 min", body: complication },
        { heading: "Apply to our organization · 15 min", items: ["Which authority is formal?", "Which knowledge is documented?", "Which relationships are institution-held?", "Which systems can survive turnover?"] },
        { heading: "Redesign · 15 min", body: "Choose one dependency and reduce its concentration without erasing the people who created value." },
        { heading: "Commitment · 10 min", body: `Name one action and one evidence gap. Use this case question as the check: ${unknown}` },
      ],
      closing: "Workshop rule: discuss the organization's own structure. Do not diagnose a participant or copy the public figure's career.",
    },
  ];

  return artifacts[format];
}

export function ResourceStudio() {
  const [slug, setSlug] = useState(nodeSlug(SEED[0].name));
  const [format, setFormat] = useState(0);
  const person = SEED.find((p) => nodeSlug(p.name) === slug)!;
  const research = getCaseResearch(slug)!;
  const artifact = useMemo(() => buildArtifact(format, person, research), [format, person, research]);

  return <div className={styles.studio}>
    <section className={styles.controls} aria-label="Artifact choices">
      <label>Case
        <select value={slug} onChange={(event) => setSlug(event.target.value)}>
          {SEED.map((p) => <option key={p.name} value={nodeSlug(p.name)}>{p.name}</option>)}
        </select>
      </label>
      <label>Artifact
        <select value={format} onChange={(event) => setFormat(Number(event.target.value))}>
          {FORMATS.map((label, index) => <option value={index} key={label}>{label}</option>)}
        </select>
      </label>
    </section>

    <p className={styles.outputNote}><strong>{artifact.label}.</strong> {artifact.promise}</p>

    <article className={styles.brief} aria-live="polite">
      <header className={styles.artifactHead}>
        <p className={styles.kicker}>{artifact.eyebrow}</p>
        <h2>{artifact.title}</h2>
      </header>
      <div className={styles.artifactSections}>
        {artifact.sections.map((section, index) => <section key={`${section.heading}-${index}`}>
          <h3>{section.heading}</h3>
          {section.body && <p>{section.body}</p>}
          {section.items && <ol>{section.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ol>}
        </section>)}
      </div>
      <aside className={styles.artifactRule}><strong>Use boundary</strong><span>{artifact.closing}</span></aside>
      <div className={styles.actions}>
        <Link href={`/observatory/${slug}`}>Open case and linked sources →</Link>
        <Link href={`/observatory/countercases?case=${slug}`}>Test it against a countercase →</Link>
      </div>
    </article>

    <aside className={styles.guardrail}>
      <strong>What this tool is for</strong>
      <span>It converts one documented case into a format-specific working artifact for editorial, teaching, research, or organizational use. It does not publish automatically, fabricate quotations, or turn an unknown into a fact.</span>
    </aside>
  </div>;
}
