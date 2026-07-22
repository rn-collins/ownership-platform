import { ProfessionalAssessment } from "@/components/ProfessionalAssessment";
import { PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";

export const metadata = { title: "Take the Portfolio Professional Index" };

export default function ProfessionalAssessPage() {
  return (
    <main>
      <p className="eyebrow">The Observatory · Portfolio Professional Index</p>
      <h1>Are you an institution of one?</h1>
      <p className="lede">
        Twenty questions across five dimensions. No sign-up. You get a score out of 100 and the exact moves that
        turn a role you fill into a role built around you.
      </p>
      <p className="meta">Methodology v{PROFESSIONAL_METHODOLOGY_VERSION} · five dimensions, four questions each, scored to 100.</p>
      <ProfessionalAssessment />
    </main>
  );
}
