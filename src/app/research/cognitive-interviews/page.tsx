import {
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
} from "@/lib/candidate-instruments";
import { IntakeForm } from "./IntakeForm";

export const metadata = {
  title: "Assessment interview study — Institutions of One",
  description: "Volunteer to help improve future questions in the Institutions of One pilot assessments.",
  alternates: { canonical: "/research/cognitive-interviews" },
};

export default function CognitiveInterviewStudyPage() {
  return (
    <main className="study-page">
      <p className="eyebrow">Institutions of One · Participate in the research</p>
      <h1>Help make the assessment questions clearer, fairer, and more useful.</h1>
      <p className="lede">
        Institutions of One is interviewing creators and professionals about proposed questions for future versions of
        the Ownership Index and Portfolio Professional assessment. The interview examines the questions—not you.
      </p>

      <div className="card">
        <h2>What participation involves</h2>
        <ol>
          <li>Join a moderated remote conversation about one proposed question set.</li>
          <li>Explain how you understand selected questions and choose an answer.</li>
          <li>Identify unclear language, missing options, sensitive topics, or situations the question does not fit.</li>
          <li>Comment on accessibility, burden, and whether the question captures the intended idea.</li>
        </ol>
        <p>You may skip any question, pause, or stop. Recording and quotation require separate permission.</p>
      </div>

      <div className="card">
        <h2>What is being tested</h2>
        <p>
          The study covers Ownership Index {OWNERSHIP_INDEX_0_3_0_CANDIDATE.version} and Portfolio Professional{" "}
          {PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version}. These are unscored development drafts and do not change the
          results of the current public pilots.
        </p>
        <p><a href="/methodology/candidates" className="fwlink">Read about the proposed questions →</a></p>
      </div>

      <div className="card">
        <h2>Who can contribute</h2>
        <p>
          The study seeks varied career stages, work arrangements, creator business models, employment and independent
          work, locations, disability and caregiving experiences, income models, and levels of organizational support.
          Optional background questions may be skipped.
        </p>
      </div>

      <div className="card">
        <h2>How information is used</h2>
        <p>
          Contact details are used for screening, scheduling, and study communication. Public reporting uses
          de-identified themes and aggregate observations unless you separately agree to attribution. Participation is
          voluntary, and consent is reviewed again before the interview begins.
        </p>
      </div>

      <h2 className="dimhead">Volunteer for an interview</h2>
      <IntakeForm />
    </main>
  );
}
