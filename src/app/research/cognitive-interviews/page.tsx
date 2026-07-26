import {
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
} from "@/lib/candidate-instruments";

export const metadata = {
  title: "Cognitive interview study — Institutions of One",
  description: "Protocol, participation information, sampling goals, and decision rules for candidate instrument interviews.",
};

const failureModes = [
  ["Comprehension", "What does the participant think the question and key terms mean?"],
  ["Retrieval", "What information, records, examples, or time period did the participant use?"],
  ["Judgment", "How did the participant combine uncertain, mixed, or context-dependent evidence?"],
  ["Response mapping", "Could the participant place their answer into one response option without forcing it?"],
  ["Sensitivity", "Did the item create avoidable discomfort, disclosure pressure, or impression-management pressure?"],
  ["Accessibility", "Did language, format, memory demand, disability, care context, or technology obstruct a valid response?"],
];

const sampleDimensions = [
  "Career stage and work arrangement",
  "Creator business model and platform dependence",
  "Employment, independent, and mixed portfolio work",
  "Jurisdiction and contract environment",
  "Disability, chronic illness, and care responsibilities",
  "Income model, organizational resources, and access to professional support",
];

export default function CognitiveInterviewStudyPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Instrument development study</p>
      <h1>Cognitive interviews for the next Ownership and Portfolio Professional instruments.</h1>
      <p className="lede">
        The study examines whether people understand each candidate question as intended, can retrieve the requested
        information, can choose an answer that represents their situation, and encounter structural or accessibility
        problems. It is an instrument-development study, not an assessment.
      </p>
      <div className="card">
        <h2>Current study versions</h2>
        <p>
          Ownership Index <b>{OWNERSHIP_INDEX_0_3_0_CANDIDATE.version}</b> and Portfolio Professional{" "}
          <b>{PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version}</b>.
        </p>
        <p>Neither candidate is scored. Interview responses do not generate a result, ranking, diagnosis, eligibility decision, or professional judgment.</p>
        <p><a className="fwlink" href="/methodology/candidates">Review every candidate item and response option →</a></p>
      </div>
      <h2 className="dimhead">What participation involves</h2>
      <div className="card">
        <ol>
          <li style={{ marginBottom: 10 }}>Review one candidate instrument in a moderated remote interview.</li>
          <li style={{ marginBottom: 10 }}>Answer selected questions while explaining how you interpret and answer them.</li>
          <li style={{ marginBottom: 10 }}>Discuss unclear terms, missing answer options, evidence used, and relevant context.</li>
          <li style={{ marginBottom: 10 }}>Comment on burden, sensitivity, accessibility, and whether an item treats different work structures fairly.</li>
        </ol>
        <p>
          Participation is voluntary. A participant may skip a question, pause, or stop. Identifying details are not
          required in public reporting. Quotations require separate permission and are de-identified unless the
          participant explicitly agrees otherwise.
        </p>
      </div>
      <h2 className="dimhead">Response-process review</h2>
      {failureModes.map(([name, question]) => <div className="card" key={name}><h3>{name}</h3><p>{question}</p></div>)}
      <h2 className="dimhead">Sampling requirements</h2>
      <div className="card">
        <p>Recruitment is purposive rather than representative. The objective is to expose interpretation and fairness failures across materially different situations before a quantitative pilot.</p>
        <ul>{sampleDimensions.map((dimension) => <li key={dimension}>{dimension}</li>)}</ul>
        <p>The study records the achieved sample and its gaps. It does not describe the interview sample as statistically representative.</p>
      </div>
      <h2 className="dimhead">Two-round decision process</h2>
      <div className="card">
        <h3>Round 1 · Detect</h3>
        <p>Code item-level failures, compare interpretations with the construct definition, and log proposed revisions. Revisions must identify the item, candidate version, evidence, decision, and expected effect.</p>
        <h3>Round 2 · Retest</h3>
        <p>Interview a new set of participants using the versioned revision. An item advances only when major failures are resolved without creating new construct, response, fairness, or accessibility problems.</p>
      </div>
      <h2 className="dimhead">Revision rules</h2>
      <div className="card">
        <ul>
          <li>Revise wording when intended and participant interpretations materially differ.</li>
          <li>Split an item when one answer requires judgments about more than one independently variable condition.</li>
          <li>Add or revise anchors when participants cannot map credible situations without guessing.</li>
          <li>Add a not-applicable route when the practice genuinely does not arise and absence is not the construct.</li>
          <li>Move context out of scoring when structural opportunity or constraint could be mistaken for individual capacity.</li>
          <li>Defer or remove an item when valid self-report cannot support the proposed claim.</li>
        </ul>
      </div>
      <div className="card">
        <h2>Participate or review the study</h2>
        <p>Prospective participants, subject-matter reviewers, accessibility reviewers, and research partners may contact RN Collins. State which instrument you are interested in and whether you are volunteering as a participant or reviewer.</p>
        <p><a className="fwlink" href="mailto:collins.ra@northeastern.edu?subject=Institutions%20of%20One%20cognitive%20interview">Contact the research program →</a></p>
      </div>
    </main>
  );
}
