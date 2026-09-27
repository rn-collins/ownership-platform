import { ProfessionalAssessment } from "@/components/ProfessionalAssessment";
import { PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";

export const metadata = {
  title: "Portfolio Professional — Institutions of One",
  description: "A pilot assessment of how expertise becomes visible, reusable, portable, and influential.",
  alternates: { canonical: "/assess/professional" },
  openGraph: { title: "Portfolio Professional — Institutions of One", description: "A pilot assessment of how expertise becomes visible, reusable, portable, and influential.", url: "/assess/professional", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Portfolio Professional — Institutions of One", description: "A pilot assessment of how expertise becomes visible, reusable, portable, and influential.", images: ["/og.png"] },
};

export default function ProfessionalAssessPage() {
  return (
    <main className="instrument-page professional-page">
      <p className="eyebrow">Institutions of One · Portfolio Professional</p>
      <h1>How far does your expertise travel beyond your current role?</h1>
      <p className="lede">
        This twenty-question pilot examines five areas: capability ownership, institutional value, mandate and autonomy,
        visibility and authority, and a coherent thesis across your work.
      </p>
      <p className="meta">
        Methodology v{PROFESSIONAL_METHODOLOGY_VERSION} · anonymous · approximately five minutes · exploratory, not diagnostic or normed
      </p>
      <ProfessionalAssessment />

      <section className="instrument-notes" style={{ marginTop: 40 }}>
        <h2>The five areas, and why these five</h2>
        <p>
          <b>Capability ownership</b> asks how much of what you can do was built by you rather
          than assigned to you. <b>Institutional value</b> asks what would be harder for your
          organisation if you stopped. <b>Mandate and autonomy</b> ask how much you decide
          without seeking permission. <b>Visibility and authority</b> ask whether people outside
          your employer know the work is yours. <b>Thesis</b> asks whether your work adds up to a
          position rather than a sequence of jobs. They are separated because seniority moves
          them at different speeds: a senior title can carry a wide mandate and almost no
          portable authority.
        </p>

        <h2 style={{ marginTop: 26 }}>What portability actually means here</h2>
        <p>
          Portability is not a plan to leave. It is a measure of how much of your working life
          is legible outside the place it happens &mdash; which is the same property that
          determines your position in a reorganisation, your standing in a negotiation, and how
          much of your last five years you can describe to someone who was not there. Work that
          is highly valuable internally and invisible externally scores low here, and that gap is
          usually the most useful thing the instrument surfaces.
        </p>

        <h2 style={{ marginTop: 26 }}>How to read it, and how to answer it</h2>
        <p>
          The result is five area scores and a reading of the pattern between them, not a rank
          and not a recommendation. Scores are not normed against a representative sample, so
          compare your own areas with each other rather than with anyone else. Answer for the
          role you hold today rather than the one you are being considered for, and where a
          question is ambiguous, choose the reading that assumes less. Responses are anonymous
          and no account is required.
        </p>
      </section>
    </main>
  );
}
