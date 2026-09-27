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

    <section className="explorer-intro">
      <h2>What a dependency means here</h2>
      <p>
        A dependency is something a body of work currently runs through. It is a structural
        observation about an arrangement, and it carries no judgement about the person in the
        case. Depending on an employer, a platform, a distributor or a pool of capital is
        ordinary, and in most of these cases it is what made the work possible in the first
        place. What the explorer is for is seeing which of those channels a given career runs
        through at once, and how much of it would still function if one of them changed.
      </p>

      <h2>How to read a filter result</h2>
      <p>
        Selecting a dependency returns the cases where public sources establish that it is
        structurally relevant. The count beside each label is the number of cases it appears in,
        so a large number means the pattern is common across this set rather than that it is
        risky. Reading two or three filters together is usually more informative than reading
        one: a career that depends on a platform and on personal visibility sits in a different
        position from one that depends on a platform and on an employer.
      </p>

      <h2>What a tag establishes</h2>
      <p>
        Each tag records what the cited sources support about how an arrangement is organised,
        and that is the whole of its scope. Questions of ownership, credit, conduct and intent
        belong to the case page, where the sources sit alongside an explicit statement of where
        the public record stops. The case pages hold four distinctions apart throughout:
        visibility is treated separately from authorship, a title separately from a mandate,
        founder involvement separately from sole credit, and association with an institution
        separately from portability of what it produced. Those separations are the reason the
        set is readable as evidence at all. Open an individual case to see the sources and the
        recorded limits behind any tag before drawing a conclusion from it.
      </p>
    </section>

    <DependencyExplorer />
  </main>;
}
