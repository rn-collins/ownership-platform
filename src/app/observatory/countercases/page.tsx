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
    <h1>Every persuasive lesson needs a case that makes it harder.</h1>
    <p className="lede">Choose any person in the collection. The Finder will name the lesson their case may appear to support, then surface a structurally different case to examine before you generalize.</p>
    <p><a href="/observatory">← The Observatory</a></p>
    <CountercaseFinder />
  </main>;
}
