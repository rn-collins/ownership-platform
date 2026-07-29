import {
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
} from "@/lib/candidate-instruments";

export const metadata = {
  title: "Questions in development — Institutions of One",
  description: "See how proposed assessment questions are understood, tested, revised, and either adopted or rejected.",
  alternates: { canonical: "/methodology/candidates" },
  openGraph: { title: "Questions in development — Institutions of One", description: "See how proposed assessment questions are understood, tested, revised, and either adopted or rejected.", url: "/methodology/candidates", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Questions in development — Institutions of One", description: "See how proposed assessment questions are understood, tested, revised, and either adopted or rejected.", images: ["/og.png"] },
};

const steps = [
  ["Listen", "A participant says what they think the question means and how they chose an answer."],
  ["Find friction", "We look for confusing words, missing choices, inaccessible formats, and situations the question fails to fit."],
  ["Rewrite", "A revised question goes to new participants. The same person is not asked to approve our fix."],
  ["Test", "Only then do we examine response quality, reliability, structure, and fairness across relevant groups."],
  ["Publish the decision", "An adopted set receives a new version number and an explanation. A failed question is revised or rejected."],
];

export default function CandidateInstrumentsPage() {
  return (
    <main className="candidate-page">
      <a href="/methodology" className="postback">← How the project works</a>
      <p className="eyebrow">Questions being tested</p>
      <h1>Before an assessment question is used, people need to understand it as intended.</h1>
      <p className="candidate-hook">
        This page shows the draft questions being tested, the standards they have not yet met, and the review required before they can change a scored pilot.
      </p>

      <section className="candidate-status">
        <div><span>Now testing</span><h2>Two unscored drafts.</h2></div>
        <div>
          <p><b>Ownership Index</b><br />{OWNERSHIP_INDEX_0_3_0_CANDIDATE.version}</p>
          <p><b>Portfolio Professional</b><br />{PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version}</p>
        </div>
      </section>

      <section className="candidate-rule">
        <p className="eyebrow">The rule</p>
        <blockquote>The interview tests the question. It does not test, score, diagnose, or rank the person answering it.</blockquote>
      </section>

      <section className="candidate-steps">
        <p className="eyebrow">From draft to decision</p>
        {steps.map(([name, body], index) => (
          <article key={name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{name}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="candidate-invite">
        <p className="eyebrow">Help us find unclear or unfair questions</p>
        <h2>Tell us where a question is hard to answer.</h2>
        <p>Tell us when a word is vague, none of the choices fits your situation, or a question assumes resources you do not have.</p>
        <a href="/research/cognitive-interviews" className="primary-link">See the interview study</a>
      </section>

      <div className="actions">
        <a href="/methodology" className="text-link">Return to how it works</a>
        <a href="/assess" className="text-link">Try the current pilots →</a>
      </div>
    </main>
  );
}
