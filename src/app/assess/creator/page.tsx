import { Assessment } from "@/components/Assessment";
import { METHODOLOGY_VERSION } from "@/lib/engine";

export const metadata = {
  title: "Ownership Index — Institutions of One",
  description: "A pilot assessment of control over audience, rights, revenue, identity, and business infrastructure.",
  alternates: { canonical: "/assess/creator" },
};

export default function CreatorAssessPage() {
  return (
    <main className="instrument-page ownership-page">
      <p className="eyebrow">Institutions of One · Ownership Index</p>
      <h1>How much of the system behind your work do you control?</h1>
      <p className="lede">
        This twenty-question pilot examines five areas: audience, rights, revenue, identity, and infrastructure. Your
        result offers a structured picture of where control is concentrated and where dependence may remain.
      </p>
      <p className="meta">
        Methodology v{METHODOLOGY_VERSION} · anonymous · approximately five minutes · exploratory, not diagnostic or normed
      </p>
      <Assessment />
    </main>
  );
}
