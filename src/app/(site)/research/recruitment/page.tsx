import {
  PUBLIC_PARTICIPANT_INVITATION,
  RECRUITMENT_CHANNELS,
  RESEARCH_RETENTION_RULES,
  ROUND_ONE_LAUNCH_STATUS,
  SAMPLING_MATRIX,
} from "@/lib/research-launch";

export const metadata = {
  title: "Participate in the research — Institutions of One",
  description: "Round 1 recruitment for cognitive interviews testing the Ownership Index and Portfolio Professional candidate instruments.",
};

export default function ResearchRecruitmentPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Round 1 recruitment</p>
      <h1>{PUBLIC_PARTICIPANT_INVITATION.title}</h1>
      <p className="lede">{PUBLIC_PARTICIPANT_INVITATION.short}</p>

      <div className="card">
        <h2>Recruitment status</h2>
        <p><b>Round 1 is recruiting.</b> No interview evidence has yet been collected or interpreted.</p>
        <ul>
          <li>Ownership Index completed interviews: {ROUND_ONE_LAUNCH_STATUS.ownership.completed} of at least {ROUND_ONE_LAUNCH_STATUS.ownership.minimumCompleted}</li>
          <li>Portfolio Professional completed interviews: {ROUND_ONE_LAUNCH_STATUS.portfolioProfessional.completed} of at least {ROUND_ONE_LAUNCH_STATUS.portfolioProfessional.minimumCompleted}</li>
          <li>Candidate scoring: disabled</li>
          <li>Candidate.2 generation: disabled until the Round 1 evidence gate passes</li>
        </ul>
      </div>

      <h2 className="dimhead">What you would do</h2>
      <div className="card">
        <p>{PUBLIC_PARTICIPANT_INVITATION.participation}</p>
        <p>{PUBLIC_PARTICIPANT_INVITATION.boundaries}</p>
        <p><a className="btn" href="/research/cognitive-interviews">Read the study information and request participation</a></p>
      </div>

      <h2 className="dimhead">Who the study needs to hear from</h2>
      <p>The study uses purposive recruitment to find different interpretations and structural failures. These are coverage goals, not quotas for judging people.</p>
      {SAMPLING_MATRIX.map((dimension) => (
        <div className="card" key={dimension.id}>
          <h3>{dimension.label}</h3>
          <p>{dimension.rationale}</p>
          <p><b>Coverage sought:</b> {dimension.coverage.join(", ")}.</p>
        </div>
      ))}

      <h2 className="dimhead">Recruitment channels and controls</h2>
      {RECRUITMENT_CHANNELS.map((entry) => (
        <div className="card" key={entry.channel}>
          <h3>{entry.channel}</h3>
          <p>{entry.use}</p>
          <p><b>Consent control:</b> {entry.control}</p>
        </div>
      ))}

      <h2 className="dimhead">Data boundaries</h2>
      <div className="card">
        <ul>{RESEARCH_RETENTION_RULES.map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </div>
    </main>
  );
}
