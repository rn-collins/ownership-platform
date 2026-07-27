import type { Metadata } from "next";
import { StructuralTimeline } from "./StructuralTimeline";

export const metadata: Metadata = {
  title: "Cross-case Timeline — The Observatory",
  description: "Examine when six kinds of structural career change appear across the 41 Institutions of One cases.",
  alternates: { canonical: "/observatory/timeline" },
};

export default function TimelinePage() {
  return <main className="observatory-page">
    <p className="eyebrow">The Observatory · Cross-case Timeline</p>
    <h1>See when the structure of the work changed—not only where a career ended up.</h1>
    <p className="lede">Follow six recurring transitions across the collection. Every event retains the time precision of its source record, so a dated appointment, a multi-year shift, and an inferred sequence do not masquerade as the same kind of evidence.</p>
    <p><a href="/observatory">← Return to all Observatory tools</a></p>
    <StructuralTimeline />
  </main>;
}
