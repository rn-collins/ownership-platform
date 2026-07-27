import {
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
} from "@/lib/candidate-instruments";

export const metadata = {
  title: "Proposed questions — Institutions of One",
  description: "Questions being tested for possible future versions of the Institutions of One pilot assessments.",
};

export default function CandidateInstrumentsPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Assessment development</p>
      <h1>Proposed questions are tested before they change a public assessment.</h1>
      <p className="lede">
        The questions on this page belong to possible future versions of the Ownership Index and Portfolio Professional
        assessment. They are published so participants and reviewers can see what is being explored. They do not affect
        current scores.
      </p>

      <div className="card">
        <h2>Current status</h2>
        <p>
          Ownership Index {OWNERSHIP_INDEX_0_3_0_CANDIDATE.version} and Portfolio Professional{" "}
          {PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version} are development drafts. In interviews, participants comment on
          clarity, relevance, accessibility, missing response options, and whether a question measures the intended idea.
        </p>
      </div>

      <div className="card">
        <h2>What happens before adoption</h2>
        <ol>
          <li>Participants explain how they understand and answer each proposed question.</li>
          <li>Revised questions are tested with new participants.</li>
          <li>Researchers examine response quality, reliability, structure, and fairness across relevant groups.</li>
          <li>Any adopted set receives a new version number and a public explanation of what changed.</li>
        </ol>
      </div>

      <div className="card">
        <h2>Why this distinction matters</h2>
        <p>
          A development interview evaluates the question, not the participant. Proposed questions remain unscored during
          that research and cannot be mistaken for an assessment result.
        </p>
        <p><a className="fwlink" href="/research/cognitive-interviews">Learn about the interview study →</a></p>
      </div>

      <div className="actions">
        <a href="/methodology"><button className="primary">Return to methodology</button></a>
        <a href="/assess" className="hero-link">View the current pilots →</a>
      </div>
    </main>
  );
}
