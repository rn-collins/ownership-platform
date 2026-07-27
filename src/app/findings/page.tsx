import { FindingsView } from "@/components/FindingsView";
import { MeasuredCounter } from "@/components/MeasuredCounter";

export const metadata = {
  title: "Research & findings — Institutions of One",
  description: "What the 41-case methodology pilot and anonymous Institutions of One assessments are beginning to reveal.",
};

export default function FindingsPage() {
  return (
    <main className="findings-page">
      <p className="eyebrow">Institutions of One · Research & findings</p>
      <h1>What we can say now. What still has to be earned.</h1>
      <p className="lede">
        Institutions of One produces two different kinds of evidence. The 41 public cases test whether the methodology
        can survive real-world variation. Anonymous assessment responses will later show how ownership and portability
        appear across participants. Neither is a shortcut to a universal claim.
      </p>

      <section className="card" style={{ marginBottom: 34 }}>
        <p className="eyebrow">Finding 00 · The methodology test</p>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34 }}>The exceptions are already doing useful work.</h2>
        <p>
          Applying one framework across 41 creators and professionals exposes where the categories hold, where public
          evidence disappears, and where a career refuses a neat label. That friction is the first finding: the method
          must account for ownership, portability, authority, and institutional support without treating visibility as power.
        </p>
        <a className="fwlink" href="/observatory">Explore all 41 cases and the field map →</a>
      </section>

      <h2 className="dimhead">Anonymous assessment data</h2>
      <p className="lede">
        Aggregate score patterns appear only after the reporting threshold is reached. Ownership Index and Portfolio
        Professional results remain separate because they answer different questions.
      </p>
      <p className="lede"><MeasuredCounter suffix="anonymous assessments completed so far." /></p>
      <FindingsView />
    </main>
  );
}
