import { INSTRUMENT } from "@/lib/instrument";
import { METHODOLOGY_VERSION } from "@/lib/engine";

export const metadata = { title: "Ownership Index — methodology" };

const BANDS = [
  ["80–100", "Owned institution", "Owns the audience, the rights and the business."],
  ["55–79", "Building ownership", "Moving from rented to owned."],
  ["30–54", "Mostly rented", "Value sits with the platforms and brands, not the creator."],
  ["0–29", "At the platform’s mercy", "Reach without ownership."],
];

export default function MethodologyPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Ownership Index</p>
      <h1>Methodology</h1>
      <p className="lede">
        The Ownership Index is a composite instrument built to the OECD/JRC standard for composite indicators. Five
        dimensions, four items each, every item scored 0 to 5 on behaviourally-anchored options, to a total of 100.
        Scores are reproducible: every result is stamped with the methodology version under which it was computed.
      </p>
      <p className="meta">Current version: v{METHODOLOGY_VERSION}. Weighting is equal in this version and openly under review.</p>

      <h2 className="dimhead">Overall bands</h2>
      {BANDS.map(([r, l, d]) => (
        <div key={r} className="card"><h3>{r} · {l}</h3><p>{d}</p></div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 30 }}>The item bank</h2>
      {INSTRUMENT.map((dim, i) => (
        <div key={dim.key} className="card">
          <h3>{`0${i + 1}`} · {dim.name}</h3>
          <p>{dim.items.map((it) => it.q).join("  ·  ")}</p>
        </div>
      ))}

      <p className="disc" style={{ marginTop: 24 }}>
        Scores are evidence-tiered (self-report, auto-verified, audited); confidence rises with evidence. No creator can
        buy a score. Sponsors fund research and never touch scores. Full methodology paper available on request.
      </p>
    </main>
  );
}
