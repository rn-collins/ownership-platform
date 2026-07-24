import { ProfessionalAssessment } from "@/components/ProfessionalAssessment";
import { PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";

export const metadata = { title: "Take the Portfolio Professional" };

export default function ProfessionalAssessPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Portfolio Professional</p>
      <h1>Are you an institution of one?</h1>
      <p className="lede">
        Most reviews measure activity. This measures whether you&rsquo;ve become load-bearing. Twenty questions across
        five dimensions — capability, value, mandate, authority, and thesis. No sign-up. You leave with a score to 100
        and the exact moves that turn a role you fill into a role built around you.
      </p>
      <p className="meta">Methodology v{PROFESSIONAL_METHODOLOGY_VERSION} · five dimensions, four questions each, scored to 100.</p>
      <ProfessionalAssessment />
    </main>
  );
}
