import type { Metadata } from "next";
import { EvidenceExplorer } from "./EvidenceExplorer";

export const metadata: Metadata = {
  title: "Evidence Explorer — The Observatory",
  description: "Examine documentation strength, provenance, unknowns, complications, recurring sources, and review needs across 41 Institutions of One cases.",
  alternates: { canonical: "/observatory/evidence" },
};

export default function EvidencePage(){
  return <main className="observatory-page">
    <p className="eyebrow">The Observatory · Evidence Explorer</p>
    <h1>Investigate the integrity of the collection—not only its conclusions.</h1>
    <p className="lede">Search how each case is documented, where the record depends on self-description, what remains private or unknown, which interpretations face complications, which publishers recur, and where another review would most improve the research.</p>
    <p><a href="/observatory">← Return to all Observatory tools</a></p>
    <EvidenceExplorer/>
  </main>;
}
