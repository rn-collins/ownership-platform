import { METHODOLOGY_VERSION } from "@/lib/engine";
import { PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";

export const metadata = {
  title: "How Institutions of One works",
  description: "See the concrete questions, two evidence streams, scoring choices, and limits behind Institutions of One.",
  alternates: { canonical: "/methodology" },
  openGraph: { title: "How Institutions of One works", description: "See the concrete questions, two evidence streams, scoring choices, and limits behind Institutions of One.", url: "/methodology", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "How Institutions of One works", description: "See the concrete questions, two evidence streams, scoring choices, and limits behind Institutions of One.", images: ["/og.png"] },
};

const ownershipDimensions = [["Audience","Can you reach people without asking a platform for permission?"],["Rights","Who can license, reuse, change, or sell the work?"],["Revenue","Could the money move with you if one channel disappeared?"],["Identity","Can you govern the name and reputation people recognize?"],["Infrastructure","Are there systems and relationships beyond one account or project?"]];
const professionalDimensions = [["Capability","Can people see proof of what you know beyond a title or résumé?"],["Systems","Have you made your methods reusable, teachable, or transferable?"],["Adoption","Do other people or organizations use what you built?"],["Mandate","Have you been given real authority to decide and act?"],["Direction","Can you connect your work across roles without losing the thread?"]];
const limits = ["A score is not a diagnosis, percentile, ranking, or measure of human worth.","People choose whether to participate, so current responses cannot represent everyone.","The current question weights and result ranges are provisional and still need testing.","A one-time self-report cannot prove that ownership or portability caused an outcome.","Career structure is shaped by occupation, geography, disability, caregiving, discrimination, capital, and organizational power."];

export default function MethodologyPage() {
  return <main className="method-page method-2">
    <p className="eyebrow">How the inquiry works</p>
    <h1>Begin with a career that looks powerful.</h1>
    <p className="method-hook">Then ask what the person actually built, what can move with them, what they control, and what still depends on someone else.</p>

    <section className="method-example"><div><p className="eyebrow">A concrete example</p><h2>A global executive leaves a famous company.</h2></div><div><p>Their reputation may travel immediately. Their team, budget, customer data, patents, distribution, decision rights, and employer-owned work may not.</p><p>Calling the person “successful,” “independent,” or “a personal brand” does not resolve that difference. Institutions of One separates the structure into questions that can be investigated.</p></div></section>

    <section className="method-four" aria-labelledby="four-questions"><p className="eyebrow">The four questions underneath the project</p><h2 id="four-questions" className="display-h2">Build. Carry. Control. Continue.</h2><div>
      <article><span>01</span><h3>Build: What did the person create?</h3><p>A body of work, method, audience, business, role, relationship network, team, or way of thinking.</p></article>
      <article><span>02</span><h3>Carry: What can move with them?</h3><p>Reputation, proof, relationships, skills, methods, demand, and opportunities that remain available when a role, employer, platform, client, or work arrangement changes.</p></article>
      <article><span>03</span><h3>Control: What can they govern?</h3><p>Identity, rights, audience access, revenue channels, data, decisions, and the conditions under which the work is used.</p></article>
      <article><span>04</span><h3>Continue: What work, systems, relationships, or authority could persist when an essential dependency changes?</h3><p>An essential dependency may be a role, platform, employer, client, collaborator, source of capital, distributor, or other condition the work relies on.</p></article>
    </div></section>

    <section className="method-two-evidence"><p className="eyebrow">Why there are assessments and public cases</p><h2>One reveals lived conditions. The other reveals visible structure.</h2><div className="method-split">
      <div><span>01</span><h2>People answer questions about their own work.</h2></div><p>The pilot assessments can ask about control, portability, and constraints that no public biography reveals. They create provisional self-reported snapshots—not declarations of who is an “institution.”</p>
      <div><span>02</span><h2>Public careers complicate the questions.</h2></div><p>The Observatory checks sourced facts, compares arrangements, and records what remains unknowable. It does not score or diagnose the people.</p>
      <div><span>03</span><h2>Each source answers different questions.</h2></div><p>People can describe conditions that public sources do not show, including private agreements and informal power. Public evidence can verify visible facts across many careers. Reading the two separately helps the project state what is known, what comes from a participant, and what remains unanswered.</p>
    </div></section>

    <section className="method-instruments">
      <article className="method-instrument creator"><p className="eyebrow">For creators and independent operators</p><h2>What can you control?</h2><p>The Ownership Index examines the assets and channels through which your work creates value.</p><ol>{ownershipDimensions.map(([name,question],i)=><li key={name}><span>{String(i+1).padStart(2,"0")}</span><div><b>{name}</b><p>{question}</p></div></li>)}</ol><a href="/assess/creator">Take the Ownership Index →</a></article>
      <article className="method-instrument professional"><p className="eyebrow">For people working across roles or institutions</p><h2>What can you carry?</h2><p>Portfolio Professional examines whether expertise has become visible, reusable, portable, and influential.</p><ol>{professionalDimensions.map(([name,question],i)=><li key={name}><span>{String(i+1).padStart(2,"0")}</span><div><b>{name}</b><p>{question}</p></div></li>)}</ol><a href="/assess/professional">Take Portfolio Professional →</a></article>
    </section>

    <section className="method-score"><div><p className="eyebrow">What the pilot score means</p><h2>A structured snapshot, not a verdict.</h2></div><div><p>Each pilot currently contains twenty questions: four in each of five dimensions. Responses run from 0 to 5 and combine into a score out of 100.</p><p>The number summarizes answers to this version of these questions. It does not measure talent, potential, intelligence, worth, or how a person compares with the population.</p><p>Every result records its version so later revisions never silently rewrite an earlier result.</p><p className="meta">Current versions: Ownership Index v{METHODOLOGY_VERSION} · Portfolio Professional v{PROFESSIONAL_METHODOLOGY_VERSION}</p></div></section>

    <section className="method-psych"><p className="eyebrow">Why psychology belongs here</p><h2>Career structure is lived, not merely owned.</h2><p>Autonomy, confidence, identity, motivation, adaptability, and the ability to imagine a future can influence what someone builds and whether they believe it can move. Disability, caregiving, discrimination, capital, geography, and organizational power can change the options available. These ideas inform the inquiry; the current pilots do not diagnose them and are not validated psychological scales.</p></section>

    <section className="method-limits"><div><p className="eyebrow">Interpret with care</p><h2>What these pilots cannot establish.</h2></div><ol>{limits.map((limit,i)=><li key={limit}><span>{String(i+1).padStart(2,"0")}</span><p>{limit}</p></li>)}</ol></section>

    <section className="method-next"><p className="eyebrow">How the assessments will be tested</p><h2>Ask. Listen. Test. Revise. Repeat.</h2><p>Next come expert review, interviews about how people understand each question, missing-data and item analysis, reliability and factor testing, comparison with established measures, fairness checks, and longitudinal research. Material changes receive new version numbers.</p><a href="/methodology/candidates">See the questions being tested →</a></section>
    <div className="actions"><a href="/assess" className="primary-link">Choose the question about your work</a><a href="/observatory" className="text-link">See how the framework applies to 41 public careers →</a></div>
  </main>;
}