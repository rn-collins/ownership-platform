import {
  CANDIDATE_ACTIVATION_GATES,
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
  type InstrumentCandidate,
} from "@/lib/candidate-instruments";

export const metadata = {
  title: "Candidate instruments — Institutions of One",
  description: "Versioned, inactive candidate instruments for cognitive interviewing and validation.",
};

const instruments: { name: string; candidate: InstrumentCandidate; replaces: string }[] = [
  { name: "Ownership Index", candidate: OWNERSHIP_INDEX_0_3_0_CANDIDATE, replaces: "Active pilot v0.2.0 remains unchanged while this candidate is tested." },
  { name: "Portfolio Professional", candidate: PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE, replaces: "Active pilot v0.1.0 remains unchanged while this candidate is tested." },
];

export default function CandidateInstrumentsPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Versioned candidate release</p>
      <h1>Questions under study, published before they are activated.</h1>
      <p className="lede">
        These item banks are research candidates. They are available for scrutiny and cognitive interviews, but they do
        not produce a score, change an existing result, or replace either active pilot instrument.
      </p>
      <div className="card">
        <h2>Release status</h2>
        <p>
          Ownership Index <b>v0.3.0-candidate.1</b> and Portfolio Professional <b>v0.2.0-candidate.1</b> are inactive.
          Scoring is prohibited pending validation. Candidate wording may change after each documented interview round.
        </p>
        <p><a className="fwlink" href="/research/cognitive-interviews">Read the interview study and participation information →</a></p>
      </div>
      <h2 className="dimhead">Activation gates</h2>
      <div className="card"><ol>{CANDIDATE_ACTIVATION_GATES.map((gate) => <li key={gate} style={{ marginBottom: 10 }}>{gate}</li>)}</ol></div>
      {instruments.map(({ name, candidate, replaces }) => (
        <section key={candidate.id}>
          <h2 className="dimhead" style={{ marginTop: 36 }}>{name} · {candidate.version}</h2>
          <div className="card">
            <p><b>Status:</b> candidate; inactive; scoring prohibited.</p>
            <p><b>Reference period:</b> {candidate.referencePeriod}.</p>
            <p><b>Version boundary:</b> {replaces}</p>
            <p><b>Item count:</b> {candidate.items.length}.</p>
          </div>
          {candidate.items.map((item) => (
            <div className="card" key={candidate.id + ":" + item.id}>
              <p className="eyebrow">{item.id} · {item.construct}</p>
              <h3>{item.prompt}</h3>
              <p><b>Response format:</b> {item.responseFormat}.</p>
              <p><b>Candidate response anchors:</b> {item.anchors.join(" · ")}</p>
              {item.contextFields?.length ? <p><b>Context recorded separately:</b> {item.contextFields.join("; ")}.</p> : null}
            </div>
          ))}
        </section>
      ))}
      <div className="card" style={{ marginTop: 36 }}>
        <h2>Version and claim boundary</h2>
        <p>
          Publication is not activation. No candidate total, dimension score, band, benchmark, ranking, predictive
          statement, or causal claim is authorized. Any later activation requires a dated methodology record, scoring
          specification, evidence review, and cross-version statement.
        </p>
        <p><a className="fwlink" href="/methodology">Return to the complete methodology →</a></p>
      </div>
    </main>
  );
}
