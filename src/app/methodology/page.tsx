import { INSTRUMENT } from "@/lib/instrument";
import { METHODOLOGY_VERSION } from "@/lib/engine";
import { PROFESSIONAL_INSTRUMENT, PROFESSIONAL_OVERALL, PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";
import { MeasuredCounter } from "@/components/MeasuredCounter";

export const metadata = { title: "Methodology — Institutions of One" };

const OWNERSHIP_BANDS: [string, string, string][] = [
  ["80–100", "Owned institution", "Owns the audience, the rights, and the business."],
  ["55–79", "Building ownership", "Moving from rented to owned."],
  ["30–54", "Mostly rented", "Value sits with the platforms and brands, not the creator."],
  ["0–29", "At the platform’s mercy", "Reach without ownership."],
];

export default function MethodologyPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Methodology</p>
      <h1>Methodology</h1>
      <p className="lede">
        Institutions of One measures one shift — the individual becoming an institution — through two composite
        instruments, each built following the OECD/JRC framework for composite indicators (empirical validation is
        underway). Five dimensions, four items each,
        every item scored 0 to 5 on behaviourally-anchored options, to a total of 100. Same rigor, two lenses: the
        <b> Ownership Index</b> for creators and the <b>Portfolio Professional</b> for professionals.
      </p>
      <p className="meta">
        Ownership Index v{METHODOLOGY_VERSION} · Portfolio Professional v{PROFESSIONAL_METHODOLOGY_VERSION}. Weighting is
        equal in these versions and openly under review. Every result is stamped with the version under which it was
        computed, so scores are reproducible.
      </p>

      {/* Ownership Index */}
      <h2 className="dimhead" style={{ marginTop: 30 }}>The Ownership Index — bands</h2>
      {OWNERSHIP_BANDS.map(([r, l, d]) => (
        <div key={r} className="card"><h3>{r} · {l}</h3><p>{d}</p></div>
      ))}
      <h2 className="dimhead" style={{ marginTop: 24 }}>The Ownership Index — item bank</h2>
      {INSTRUMENT.map((dim, i) => (
        <div key={dim.key} className="card">
          <h3>{`0${i + 1}`} · {dim.name}</h3>
          <p>{dim.items.map((it) => it.q).join("  ·  ")}</p>
        </div>
      ))}

      {/* Portfolio Professional */}
      <h2 className="dimhead" style={{ marginTop: 34 }}>The Portfolio Professional — bands</h2>
      {PROFESSIONAL_OVERALL.map((b, i) => {
        const hi = i === 0 ? 100 : PROFESSIONAL_OVERALL[i - 1].min - 1;
        return <div key={b.key} className="card"><h3>{b.min}–{hi} · {b.label}</h3><p>{b.copy}</p></div>;
      })}
      <h2 className="dimhead" style={{ marginTop: 24 }}>The Portfolio Professional — item bank</h2>
      {PROFESSIONAL_INSTRUMENT.map((dim, i) => (
        <div key={dim.name} className="card">
          <h3>{`0${i + 1}`} · {dim.name}</h3>
          <p>{dim.items.map((it) => it.q).join("  ·  ")}</p>
        </div>
      ))}

      {/* The graph */}
      <h2 className="dimhead" style={{ marginTop: 34 }}>The Observatory — how the two connect</h2>
      <div className="card">
        <p>Both instruments write to one graph. The Observatory is the map that links their scores — creators measured by
        the Ownership Index, professionals by the Portfolio Professional — into a single, living picture of the movement.
        A person can carry a score on either lens, or both.</p>
      </div>

      {/* Limitations — stated plainly, not buried */}
      <h2 className="dimhead" style={{ marginTop: 34 }}>What this does not claim</h2>
      <div className="card">
        <p>These are self-report instruments. A result is <b>indicative, not validated</b>: it has no clinical, legal, or
        predictive standing, and it should not be read as one. Weighting is equal by default and the band cutoffs are
        provisional until the score distribution is normed. The five dimensions are treated as distinct pending empirical
        factor analysis, which may show that some combine. Self-report caps confidence at &ldquo;Indicative,&rdquo; and
        the sample self-selects toward the ownership-minded — a bias the eventual report will name and, where possible,
        correct. Reliability, factor structure, and norms will be published here as the sample grows.</p>
      </div>

      {/* Live sample size */}
      <div className="card">
        <h3>Sample to date</h3>
        <p><MeasuredCounter suffix="anonymous assessments recorded across both instruments." /> Reliability statistics
        (Cronbach&rsquo;s α / McDonald&rsquo;s ω) and percentile norms publish here once the sample is large enough to
        report them honestly. No readings appear until then.</p>
      </div>

      {/* How to cite */}
      <h2 className="dimhead" style={{ marginTop: 24 }}>How to cite</h2>
      <div className="card">
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          Collins, RN. Institutions of One: The Ownership Index (v{METHODOLOGY_VERSION}) and The Portfolio Professional
          (v{PROFESSIONAL_METHODOLOGY_VERSION}). Independent research program, {new Date().getFullYear()}.
          ownership-platform.vercel.app
        </p>
        <p style={{ marginTop: 8 }}>Please cite the version number — results are reproducible under the version that
        computed them. For the full methodology paper, data-use terms, or a research-partner conversation, get in touch.</p>
      </div>

      <p className="disc" style={{ marginTop: 24 }}>
        Scores are evidence-tiered — self-report, auto-verified, then audited — and confidence rises with evidence. No
        one can buy a score. Sponsors fund research and never touch scores. The framework is built; live measurement is
        underway. Full methodology paper available on request.
      </p>
    </main>
  );
}
