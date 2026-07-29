import type { Metadata } from "next";
import { DependencyExplorer } from "./DependencyExplorer";

export const metadata: Metadata = {
  title: "Dependency Explorer — The Observatory",
  description: "Examine which employers, platforms, titles, capital, audiences, mandates, founders, intellectual property, and distribution partners appear structurally relevant across 41 career cases.",
  alternates: { canonical: "/observatory/dependencies" },
};

export default function DependencyExplorerPage() {
  return <main className="observatory-page">
    <p className="eyebrow">The Observatory · Dependency Explorer</p>
    <h1>See what each career relies on.</h1>
    <p className="lede">Filter the 41 cases by the employers, platforms, titles, capital, audiences, founders, rights, and distribution systems that appear relevant. Then open each case to verify what the sources establish.</p>
    <p><a href="/observatory">← The Observatory</a></p>
    <DependencyExplorer />
  </main>;
}
