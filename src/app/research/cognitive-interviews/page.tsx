import {
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
} from "@/lib/candidate-instruments";
import { COGNITIVE_PROBE_GUIDES, RESPONSE_PROCESS_DOMAINS, ROUND_GATES } from "@/lib/research-validation";
import { IntakeForm } from "./IntakeForm";

export const metadata = {
  title: "Cognitive interview study — Institutions of One",
  description: "An optional instrument-development study improving future versions of the Ownership Index and Portfolio Professional.",
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
      <p className="eyebrow">Institutions of One · Ongoing instrument development</p>
      <h1>Help improve future versions of the Ownership Index and Portfolio Professional.</h1>
      <p className="lede">This optional study examines how people understand proposed new questions. Institutions of One and both public pilot indices remain active while this research proceeds.</p>
      <div className="card">
        <h2>What this study is—and is not</h2>
        <ul>
          <li>It is a research-and-development project for possible future versions of the two indices.</li>
          <li>It is not a prerequisite for Institutions of One to operate.</li>
          <li>It does not suspend, invalidate, or replace the active public pilot indices.</li>
          <li>Participants do not need to take either public index before volunteering.</li>
          <li>The interview tests the proposed questions, not the person answering them.</li>
        </ul>
      </div>
      <div className="card">
        <h2>Versions being explored</h2>
        <p>Ownership Index <b>{OWNERSHIP_INDEX_0_3_0_CANDIDATE.version}</b> and Portfolio Professional <b>{PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version}</b>.</p>
        <p>These are proposed future item banks. They are unscored inside this study so that feedback about the questions is not confused with a judgment about the participant.</p>
        <p><b>The active public pilots remain:</b> Ownership Index v0.2.0 and Portfolio Professional v0.1.0.</p>
        <p><a className="fwlink" href="/research/recruitment">Review Round 1 recruitment and sampling goals →</a></p>
        <p><a className="fwlink" href="/methodology/candidates">Review every proposed candidate item and response option →</a></p>
      </div>
      <h2 className="dimhead">Why run this study?</h2>
      <div className="card">
        <p>The public pilots already generate useful exploratory results. This study helps RN learn where a proposed question is misunderstood, impossible to answer, missing a credible response option, inaccessible, too psychologically loaded, or measuring structural advantage instead of the intended ownership or professionalization construct.</p>
        <p>The findings can improve later versions and support more precise claims. They are not permission for the broader research program to exist.</p>
      </div>
      <h2 className="dimhead">What participation involves</h2>
      <div className="card">
        <ol>
          <li>Review one proposed item bank in a moderated remote interview.</li>
          <li>Answer selected questions while explaining how you interpret and answer them.</li>
          <li>Discuss unclear terms, missing options, evidence used, and relevant context.</li>
          <li>Comment on burden, sensitivity, accessibility, and structural fairness.</li>
        </ol>
        <p>Participation is voluntary. You may skip a question, pause, or stop. Recording and quotation permissions are optional and separately recorded. Consent is reconfirmed at the interview.</p>
      </div>
      <h2 className="dimhead">How proposed questions are reviewed</h2>
      {RESPONSE_PROCESS_DOMAINS.map((domain) => <div className="card" key={domain.id}><h3>{domain.label}</h3><p>{domain.definition}</p></div>)}
      <h2 className="dimhead">Item-level interview guides</h2>
      <div className="card">
        <p>The registered guide contains <b>{COGNITIVE_PROBE_GUIDES.length}</b> item records: one for every proposed question in both candidate item banks. Each record includes the item, construct, response options, context checks, six response-process probe groups, and a disposition decision.</p>
      </div>
      <h2 className="dimhead">Sampling goals</h2>
      <div className="card">
        <p>Recruitment is purposive rather than representative. The objective is to expose interpretation and fairness failures across materially different situations.</p>
        <ul>{sampleDimensions.map((dimension) => <li key={dimension}>{dimension}</li>)}</ul>
        <p>The achieved sample and its gaps will be reported. Optional demographic and structural-context questions may be skipped.</p>
      </div>
      <h2 className="dimhead">Rules for changing a future version</h2>
      <p>These gates govern whether the proposed item banks are revised or later replace an active pilot. They do not govern whether Institutions of One or the active public pilots may continue operating.</p>
      <div className="card"><h3>Round 1 · Detect</h3><p>Minimum completed interviews per proposed item bank: {ROUND_GATES.round1.minimumCompletedPerInstrument}.</p><ul>{ROUND_GATES.round1.requirements.map((r) => <li key={r}>{r}</li>)}</ul></div>
      <div className="card"><h3>Round 2 · Retest</h3><p>Minimum completed interviews per proposed item bank: {ROUND_GATES.round2.minimumCompletedPerInstrument}, using new participants.</p><ul>{ROUND_GATES.round2.requirements.map((r) => <li key={r}>{r}</li>)}</ul></div>
      <h2 className="dimhead">Data and decision boundaries</h2>
      <div className="card">
        <ul>
          <li>Contact details support screening, scheduling, participation, withdrawal, and required study communication.</li>
          <li>Public reporting uses a study code and de-identified aggregate evidence.</li>
          <li>Item changes require linked coded evidence, an identified reviewer, a review date, and an approved ledger decision.</li>
          <li>Researcher notes and session records are restricted to authorized researchers.</li>
          <li>Only the proposed candidate item banks are unscored in this study; the active public pilots remain available.</li>
        </ul>
      </div>
      <IntakeForm />
    </main>
  );
}
