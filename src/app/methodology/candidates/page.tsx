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

      <section style={{ marginTop: 34 }}>
        <h2>Why a question is tested before it is scored</h2>
        <p>
          A question can be answered consistently by everyone and still measure the wrong thing.
          If half of the people answering read &ldquo;audience&rdquo; as everyone who follows an
          account and the other half read it as everyone who reads the work, both groups will
          answer confidently and the resulting number will mean two different things. That
          failure is invisible in the response data, because nothing about it looks like an
          error. It is only visible when someone is asked to say, in their own words, what they
          thought the question was asking and how they arrived at their answer.
        </p>

        <h2 style={{ marginTop: 26 }}>What counts as friction</h2>
        <p>
          A draft is held back when a word turns out to carry more than one common reading, when
          the answer choices leave a real situation with nowhere to go, when a question assumes
          circumstances not everyone has &mdash; a team, a budget, a stable address, a single
          employer &mdash; or when the format itself is the obstacle rather than the content.
          Each of those produces an answer, which is why response rates alone never surface
          them.
        </p>

        <h2 style={{ marginTop: 26 }}>What a version number means here</h2>
        <p>
          A candidate version is a draft under test and is never scored, shown as a result, or
          compared against a published version. A question only moves into a numbered pilot once
          it has survived rewriting and a fresh round of participants, and the change is
          published with the reasoning attached. This is also why a pilot version can go up
          without any new questions appearing: removing a question that did not survive is as
          much a version change as adding one.
        </p>
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
