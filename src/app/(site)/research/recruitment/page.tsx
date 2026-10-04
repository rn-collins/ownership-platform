import {
  PUBLIC_PARTICIPANT_INVITATION,
  RECRUITMENT_CHANNELS,
  RESEARCH_RETENTION_RULES,
  SAMPLING_MATRIX,
} from "@/lib/research-launch";

// Operational rules for the research team; true, but they read as internal
// notes on a participant-facing page.
const INTERNAL_ONLY_RULES = ["Synthetic QA records", "A retention schedule must be dated"];

export const metadata = {
  title: "Participate in the research — Institutions of One",
  description: "Round 1 recruitment for cognitive interviews testing the Ownership Index and Portfolio Professional candidate instruments.",
  robots: { index: false, follow: false },
};

export default function ResearchRecruitmentPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Round 1 recruitment</p>
      <h1>{PUBLIC_PARTICIPANT_INVITATION.title}</h1>
      <p className="lede">{PUBLIC_PARTICIPANT_INVITATION.short}</p>

      <h2 className="dimhead">What you would do</h2>
      <div className="card">
        <p>{PUBLIC_PARTICIPANT_INVITATION.participation} It is one 45–60 minute video call, and participation is voluntary and unpaid.</p>
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
        <p>This study has not been reviewed by an institutional review board.</p>
        <ul>{RESEARCH_RETENTION_RULES.filter((rule) => !INTERNAL_ONLY_RULES.some((prefix) => rule.startsWith(prefix))).map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </div>
    </main>
  );
}
