import {
  PUBLIC_PARTICIPANT_INVITATION,
  RESEARCH_RETENTION_RULES,
  SAMPLING_MATRIX,
} from "@/lib/research-launch";
import { withSocial } from "@/lib/page-meta";

// Operational rules for the research team; true, but they read as internal
// notes on a participant-facing page.
const INTERNAL_ONLY_RULES = ["Synthetic QA records", "A retention schedule must be dated"];

export const metadata = {
  ...withSocial({
    title: "Participate in the research — Institutions of One",
    description: "Recruiting adults for remote cognitive interviews testing the Ownership Index and Portfolio Professional candidate instruments.",
  }, "/research/recruitment"),
  robots: { index: false, follow: false },
};

export default function ResearchRecruitmentPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Research participation</p>
      <h1>{PUBLIC_PARTICIPANT_INVITATION.title}</h1>
      <p className="lede">{PUBLIC_PARTICIPANT_INVITATION.short}</p>

      <h2 className="dimhead">What you would do</h2>
      <div className="card">
        <p>{PUBLIC_PARTICIPANT_INVITATION.participation} It is one 45–60 minute video call, and participation is voluntary and unpaid.</p>
        <p>{PUBLIC_PARTICIPANT_INVITATION.boundaries}</p>
        <p><a className="btn" href="/research/cognitive-interviews">Read the study information and request participation</a></p>
      </div>

      <h2 className="dimhead">Who the study needs to hear from</h2>
      <p>To hear different interpretations of the questions, the study invites people from a range of situations. The coverage goals below guide whom we ask. They are never used to judge anyone.</p>
      {SAMPLING_MATRIX.map((dimension) => (
        <div className="card" key={dimension.id}>
          <h3>{dimension.label}</h3>
          <p>{dimension.rationale}</p>
          <p><b>Coverage sought:</b> {dimension.coverage.join(", ")}.</p>
        </div>
      ))}

      <h2 className="dimhead">How you might hear about the study</h2>
      <div className="card">
        <p>Invitations may appear in these places:</p>
        <ul>
          <li>Posts by RN Collins on LinkedIn and X.</li>
          <li>The Institutions of One newsletter on Beehiiv.</li>
          <li>A direct invitation from someone who knows about the study.</li>
          <li>Professional and creator communities, with the moderator’s permission where a community requires it.</li>
        </ul>
        <p>Replying to a post or reacting to it does not count as consent. Subscribing to the newsletter does not enroll you in the study. Nobody can sign you up on your behalf, so anyone who passes the invitation along leaves the decision to you. You consent through the study information and request form.</p>
      </div>

      <h2 className="dimhead">Data boundaries</h2>
      <div className="card">
        <p>This study has not been reviewed by an institutional review board.</p>
        <ul>{RESEARCH_RETENTION_RULES.filter((rule) => !INTERNAL_ONLY_RULES.some((prefix) => rule.startsWith(prefix))).map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </div>
    </main>
  );
}
