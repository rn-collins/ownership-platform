import type { Metadata } from "next";
import { ResourceStudio } from "./ResourceStudio";

export const metadata: Metadata = {
  title: "Case Artifact Studio — The Observatory",
  description: "Build distinct, evidence-bounded editorial, teaching, research, and workshop artifacts from Institutions of One case records.",
  alternates: { canonical: "/observatory/resources" },
};

export default function Page() {
  return <main className="observatory-page">
    <p className="eyebrow">The Observatory · Case Artifact Studio</p>
    <h1>Make the research usable without flattening it.</h1>
    <p className="lede">Choose a case and the thing you actually need. The Studio now builds a different working artifact for each format—complete with evidence, complications, unknowns, and rules against overclaiming.</p>
    <p><a href="/observatory">← Return to all Observatory tools</a></p>
    <ResourceStudio />
  </main>;
}
