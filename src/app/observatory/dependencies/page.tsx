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
    <h1>Every independent-looking career still depends on something.</h1>
    <p className="lede">The useful question is not whether dependency exists. It is what the work depends upon, who controls that dependency, whether it can travel, and what happens if access changes.</p>
    <p><a href="/observatory">← Return to all Observatory tools</a></p>
    <DependencyExplorer />
  </main>;
}
