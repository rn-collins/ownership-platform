import {
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
} from "@/lib/candidate-instruments";
import { COGNITIVE_PROBE_GUIDES, RESPONSE_PROCESS_DOMAINS, ROUND_GATES } from "@/lib/research-validation";
import { IntakeForm } from "./IntakeForm";

export const metadata = {
  title: "Cognitive interview study — Institutions of One",
  description: "Consent-aware participation, item-level protocol, sampling goals, and decision rules for candidate instrument interviews.",
};

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
      <p className="lede">This study examines how people understand and answer each candidate question. It tests the instrument, not the participant.</p>
      <div className="card">
        <h2>Current study versions</h2>
        <p>Ownership Index <b>{OWNERSHIP_INDEX_0_3_0_CANDIDATE.version}</b> and Portfolio Professional <b>{PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version}</b>.</p>
        <p>Neither candidate is scored. Interview responses do not generate a result, ranking, diagnosis, eligibility decision, or professional judgment.</p>
        <p><a className="fwlink" href="/research/recruitment">Review Round 1 recruitment and sampling goals →</a></p>
        <p><a className="fwlink" href="/methodology/candidates">Review every candidate item and response option →</a></p>
      </div>
      <h2 className="dimhead">What participation involves</h2>
      <div className="card">
        <ol>
          <li>Review one candidate instrument in a moderated remote interview.</li>
          <li>Answer selected questions while explaining how you interpret and answer them.</li>
          <li>Discuss unclear terms, missing options, evidence used, and relevant context.</li>
          <li>Comment on burden, sensitivity, accessibility, and structural fairness.</li>
        </ol>
        <p>Participation is voluntary. You may skip a question, pause, or stop. Recording and quotation permissions are optional and separately recorded. Consent is reconfirmed at the interview.</p>
      </div>
      <h2 className="dimhead">Response-process coding</h2>
      {RESPONSE_PROCESS_DOMAINS.map((domain) => <div className="card" key={domain.id}><h3>{domain.label}</h3><p>{domain.definition}</p></div>)}
      <h2 className="dimhead">Item-level interview guides</h2>
      <div className="card">
        <p>The registered guide contains <b>{COGNITIVE_PROBE_GUIDES.length}</b> item records: one for every question in both candidate instruments. Each record includes the exact item, construct, response options, context checks, six response-process probe groups, and a disposition decision.</p>
      </div>
      <h2 className="dimhead">Sampling requirements</h2>
      <div className="card">
        <p>Recruitment is purposive rather than representative. The objective is to expose interpretation and fairness failures across materially different situations before a quantitative pilot.</p>
        <ul>{sampleDimensions.map((dimension) => <li key={dimension}>{dimension}</li>)}</ul>
        <p>The achieved sample and its gaps will be reported. Optional demographic and structural-context questions may be skipped.</p>
      </div>
      <h2 className="dimhead">Completion gates</h2>
      <div className="card"><h3>Round 1 · Detect</h3><p>Minimum completed interviews per instrument: {ROUND_GATES.round1.minimumCompletedPerInstrument}.</p><ul>{ROUND_GATES.round1.requirements.map((r) => <li key={r}>{r}</li>)}</ul></div>
      <div className="card"><h3>Round 2 · Retest</h3><p>Minimum completed interviews per instrument: {ROUND_GATES.round2.minimumCompletedPerInstrument}, using new participants.</p><ul>{ROUND_GATES.round2.requirements.map((r) => <li key={r}>{r}</li>)}</ul></div>
      <h2 className="dimhead">Data and decision boundaries</h2>
      <div className="card">
        <ul>
          <li>Contact details support screening, scheduling, participation, withdrawal, and required study communication.</li>
          <li>Public reporting uses a study code and de-identified aggregate evidence.</li>
          <li>Item changes require linked coded evidence, an identified reviewer, a review date, and an approved ledger decision.</li>
          <li>Researcher notes and session records are restricted to authorized researchers.</li>
          <li>Candidate scoring remains disabled throughout interviews and the separate pilot.</li>
        </ul>
      </div>
      <IntakeForm />
    </main>
  );
}
