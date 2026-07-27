import type { Metadata } from "next";
import { LivingFindings } from "./LivingFindings";

export const metadata: Metadata = {
  title: "Living Findings — The Observatory",
  description: "Examine evidence-derived patterns, exceptions, research gaps, and framework pressure across 41 Institutions of One cases.",
  alternates: { canonical: "/observatory/findings" },
};

export default function LivingFindingsPage(){
  return <main className="observatory-page">
    <p className="eyebrow">The Observatory · Living Findings</p>
    <h1>Watch the framework change when the evidence changes.</h1>
    <p className="lede">This is a collection-level research instrument. It generates provisional patterns, exceptions, gaps, and pressure on the framework from the current standardized case records—and states plainly when the collection cannot yet support a claim about change over time.</p>
    <p><a href="/observatory">← Return to all Observatory tools</a></p>
    <LivingFindings/>
  </main>;
}
