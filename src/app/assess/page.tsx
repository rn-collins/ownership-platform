import { Assessment } from "@/components/Assessment";
import { METHODOLOGY_VERSION } from "@/lib/engine";

export const metadata = { title: "Take the Ownership Index assessment" };

export default function AssessPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Ownership Index</p>
      <h1>How much of yourself do you own?</h1>
      <p className="lede">
        Twenty questions across five dimensions. No sign-up. Your answers are collected anonymously. You get a score
        out of 100, a confidence rating, your risk exposure, and a prioritised roadmap.
      </p>
      <p className="meta">Methodology v{METHODOLOGY_VERSION} · five dimensions, four questions each, scored to 100.</p>
      <Assessment />
    </main>
  );
}
