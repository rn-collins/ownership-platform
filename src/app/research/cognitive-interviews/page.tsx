import { OWNERSHIP_INDEX_0_3_0_CANDIDATE, PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE } from "@/lib/candidate-instruments";
import { IntakeForm } from "./IntakeForm";

export const metadata = {
  title: "Help us hear what a question misses — Institutions of One",
  description: "Talk through draft assessment questions and help make them clearer, fairer, and more useful.",
  alternates: { canonical: "/research/cognitive-interviews" },
  openGraph: { title: "Help us hear what a question misses — Institutions of One", description: "Talk through draft assessment questions and help make them clearer, fairer, and more useful.", url: "/research/cognitive-interviews", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Help us hear what a question misses — Institutions of One", description: "Talk through draft assessment questions and help make them clearer, fairer, and more useful.", images: ["/og.png"] },
};

export default function CognitiveInterviewStudyPage() {
  return (
    <main className="study-page study-2">
      <p className="eyebrow">Join a question-testing conversation</p>
      <h1>A question can sound clear to its author and fail everyone else.</h1>
      <p className="lede study-hook">We are asking creators and professionals to think out loud while reading draft assessment questions. You are not being evaluated. Your confusion, hesitation, objection, and “none of these answers fits” are the useful data.</p>

      <section className="study-scene"><p className="eyebrow">What the conversation feels like</p><h2>“When this question says control, what does that mean in your actual work?”</h2><p>You might explain that you own your files but not your audience, that caregiving changes which opportunities are portable, or that a formal title gives less authority than the question assumes. We listen for the distance between the words on the screen and the life they are supposed to describe.</p></section>

      <section className="study-facts" aria-label="Study at a glance">
        <article><strong>Remote</strong><span>Join from a private place where you feel comfortable speaking.</span></article>
        <article><strong>Conversation</strong><span>Read selected questions, choose responses, and explain what you thought they meant.</span></article>
        <article><strong>Your choice</strong><span>Skip any question, decline recording or quotation, pause, or stop.</span></article>
        <article><strong>Not a test</strong><span>There is no right answer and no score. The questions—not the participant—are under review.</span></article>
      </section>

      <section className="study-why"><div><p className="eyebrow">Why your perspective matters</p><h2>The same question can behave differently across lives.</h2></div><div><p>A founder, employee, freelancer, caregiver, disabled professional, student, executive, and artist may encounter the same words through different constraints and kinds of power.</p><p>We are looking for varied career stages, work arrangements, locations, income models, creator businesses, employment and independent work, disability and caregiving experiences, and levels of organizational support. Optional background questions may be skipped.</p></div></section>

      <section className="study-use"><p className="eyebrow">What your contribution can change</p><h2>Words, answer choices, missing situations, burden, accessibility, and the idea being measured.</h2><p>The current conversation covers unscored development drafts: Ownership Index {OWNERSHIP_INDEX_0_3_0_CANDIDATE.version} and Portfolio Professional {PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version}. Feedback may change or remove questions in a future version. It does not alter anyone’s current pilot result.</p><a href="/methodology/candidates" className="fwlink">Visit the Question Lab →</a></section>

      <section className="study-privacy"><h2>Before anything is used, you choose the terms.</h2><p>Contact details are used for screening, scheduling, and study communication. Public reporting uses de-identified themes and combined observations unless you separately agree to attribution. Recording and quotation require separate permission. Consent is reviewed again before the interview begins.</p></section>

      <section className="study-volunteer"><p className="eyebrow">Volunteer</p><h2>Tell us enough to see whether this conversation fits.</h2><p>Submitting this form is an expression of interest, not consent to an interview or permission to use your words.</p><IntakeForm /></section>
    </main>
  );
}
