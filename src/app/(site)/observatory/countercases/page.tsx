import type { Metadata } from "next";
import { CountercaseFinder } from "./CountercaseFinder";

export const metadata: Metadata = {
  title: "Countercase Finder — The Observatory",
  description: "Test apparent career lessons against cases that complicate them before drawing a general conclusion.",
  alternates: { canonical: "/observatory/countercases" },
};

export default function CountercaseFinderPage() {
  return <main className="observatory-page">
    <p className="eyebrow">The Observatory · Countercase Finder</p>
    <h1>Compare a case with one that challenges its apparent lesson.</h1>
    <p className="lede">Choose any person in the collection. The Finder identifies a conclusion that the first case may suggest, then presents a structurally different case to examine before applying that conclusion elsewhere.</p>
    <p><a href="/observatory">← The Observatory</a></p>
    <CountercaseFinder />
  </main>;
}
