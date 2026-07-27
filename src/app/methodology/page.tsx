import { METHODOLOGY_VERSION } from "@/lib/engine";
import { PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";

export const metadata = {
  title: "How it works — Institutions of One",
  description: "The questions, evidence, scoring, limits, and next tests behind Institutions of One.",
  alternates: { canonical: "/methodology" },
  openGraph: { title: "How it works — Institutions of One", description: "The questions, evidence, scoring, limits, and next tests behind Institutions of One.", url: "/methodology", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "How it works — Institutions of One", description: "The questions, evidence, scoring, limits, and next tests behind Institutions of One.", images: ["/og.png"] },
};

const ownershipDimensions = [
  ["Audience", "Can you reach people without asking a platform for permission?"],
  ["Rights", "Who can license, reuse, change, or sell the work?"],
  ["Revenue", "Could the money move with you if one channel disappeared?"],
  ["Identity", "Can you govern the name and reputation people recognize?"],
  ["Infrastructure", "Are there systems and relationships beyond one account or project?"],
];

const professionalDimensions = [
  ["Capability", "Can people see proof of what you know beyond a title or résumé?"],
  ["Systems", "Have you made your methods reusable, teachable, or transferable?"],
  ["Adoption", "Do other people or organizations use what you built?"],
  ["Mandate", "Have you been given real authority to decide and act?"],
  ["Direction", "Can you connect your work across roles without losing the thread?"],
];

const limits = [
  "A score is not a diagnosis, percentile, ranking, or measure of human worth.",
  "People choose whether to participate, so current responses cannot represent everyone.",
  "The question weights and score bands are hypotheses that still need testing.",
  "A one-time self-report cannot prove that ownership or portability caused an outcome.",
  "Career structure is shaped by occupation, geography, disability, caregiving, discrimination, capital, and organizational power.",
];

export default function MethodologyPage() {
  return (
    <main className="method-page method-2">
      <p className="eyebrow">The idea · without the fog</p>
      <h1>Two assessments. Forty-one public cases. One question underneath.</h1>
      <p className="method-hook">What has a person built around their work—and what can they still carry, control, and continue when the container changes?</p>

      <section className="method-split">
        <div><span>01</span><h2>You answer questions about your own work.</h2></div>
        <p>The pilot assessments create a structured snapshot. They do not declare whether you are an “institution of one.”</p>
        <div><span>02</span><h2>We examine public careers that complicate the idea.</h2></div>
        <p>The Observatory uses sourced public facts to open questions, compare structures, and expose what public evidence cannot tell us.</p>
        <div><span>03</span><h2>The two forms of evidence challenge each other.</h2></div>
        <p>Self-report shows lived conditions. Public cases show visible structures. Neither is enough by itself.</p>
      </section>

      <section className="method-instruments">
        <article className="method-instrument creator">
          <p className="eyebrow">For creators and independent operators</p>
          <h2>What can you control?</h2>
          <p>The Ownership Index looks at the assets and channels through which your work creates value.</p>
          <ol>{ownershipDimensions.map(([name, question], index) => <li key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><p>{question}</p></div></li>)}</ol>
          <a href="/assess/creator">Take the Ownership Index →</a>
        </article>
        <article className="method-instrument professional">
          <p className="eyebrow">For people working across roles or institutions</p>
          <h2>What can you carry?</h2>
          <p>Portfolio Professional looks at whether expertise has become visible, reusable, portable, and influential.</p>
          <ol>{professionalDimensions.map(([name, question], index) => <li key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><p>{question}</p></div></li>)}</ol>
          <a href="/assess/professional">Take Portfolio Professional →</a>
        </article>
      </section>

      <section className="method-score">
        <div>
          <p className="eyebrow">The score</p>
          <h2>Twenty questions. Five dimensions. One provisional snapshot.</h2>
        </div>
        <div>
          <p>Each pilot has four questions in each dimension. Answers currently run from 0 to 5 and combine into a score out of 100.</p>
          <p>Every result records its version so a future change never silently rewrites an earlier result.</p>
          <p className="meta">Current versions: Ownership Index v{METHODOLOGY_VERSION} · Portfolio Professional v{PROFESSIONAL_METHODOLOGY_VERSION}</p>
        </div>
      </section>

      <section className="method-psych">
        <p className="eyebrow">Why psychology belongs here</p>
        <h2>A career structure is also a human experience.</h2>
        <p>Control, autonomy, self-belief, adaptability, identity, motivation, and the ability to imagine a future can shape what someone builds or carries. Those ideas inform the research. The current pilots do not diagnose them and are not validated psychological scales.</p>
      </section>

      <section className="method-limits">
        <div><p className="eyebrow">Read before interpreting a result</p><h2>What this project cannot claim—yet.</h2></div>
        <ol>{limits.map((limit, index) => <li key={limit}><span>{String(index + 1).padStart(2, "0")}</span><p>{limit}</p></li>)}</ol>
      </section>

      <section className="method-next">
        <p className="eyebrow">How it becomes stronger</p>
        <h2>Ask. Listen. Test. Revise. Repeat.</h2>
        <p>Next come expert review, interviews about how people understand each question, missing-data and item analysis, reliability and factor testing, comparisons with established measures, fairness checks, and longitudinal research. Material changes receive new version numbers.</p>
        <a href="/methodology/candidates">See the proposed next questions →</a>
      </section>

      <div className="actions">
        <a href="/assess" className="primary-link">Choose your assessment</a>
        <a href="/observatory" className="text-link">Meet the 41 people →</a>
      </div>
    </main>
  );
}
