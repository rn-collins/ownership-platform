import { ProfessionalAssessment } from "@/components/ProfessionalAssessment";
import { PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";

export const metadata = {
  title: "Portfolio Professional — Institutions of One",
  description: "A pilot assessment of how expertise becomes visible, reusable, portable, and influential.",
};

export default function ProfessionalAssessPage() {
  return (
    <main className="instrument-page professional-page">
      <p className="eyebrow">Institutions of One · Portfolio Professional</p>
      <h1>How far does your expertise travel beyond your current role?</h1>
      <p className="lede">
        This twenty-question pilot examines how capability becomes visible evidence, reusable systems, organizational
        adoption, mandate, authority, and a coherent direction across work.
      </p>
      <p className="meta">
        Methodology v{PROFESSIONAL_METHODOLOGY_VERSION} · anonymous · approximately five minutes · exploratory, not diagnostic or normed
      </p>
      <ProfessionalAssessment />
    </main>
  );
}
