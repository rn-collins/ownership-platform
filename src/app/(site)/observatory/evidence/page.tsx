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
    <h1>See how the 41 cases are documented.</h1>
    <p className="lede">Search the sources used for each case. See which claims rely on a person or organization describing itself, what remains private or unknown, which evidence complicates an interpretation, which publishers recur, and which records would benefit most from another review.</p>
    <p><a href="/observatory">← The Observatory</a></p>
    <EvidenceExplorer/>
  </main>;
}
