import {
  CANDIDATE_ACTIVATION_GATES,
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
  type InstrumentCandidate,
} from "@/lib/candidate-instruments";

export const metadata = {
  title: "Proposed future questions — Institutions of One",
  description: "Versioned candidate item banks being explored for possible future updates to the active public pilot indices.",
};

const instruments: { name: string; candidate: InstrumentCandidate; activePilot: string }[] = [
  { name: "Ownership Index", candidate: OWNERSHIP_INDEX_0_3_0_CANDIDATE, activePilot: "v0.2.0" },
  { name: "Portfolio Professional", candidate: PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE, activePilot: "v0.1.0" },
];

export default function CandidateInstrumentsPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Proposed future item banks</p>
      <h1>Questions being explored for later versions.</h1>
      <p className="lede">These candidate questions are published for scrutiny and cognitive interviews. They do not replace, suspend, or invalidate either active public pilot index.</p>
      <div className="card">
        <h2>The plain-language distinction</h2>
        <ul>
          <li><b>Active public pilots:</b> people may currently take them and receive exploratory results.</li>
          <li><b>Candidate item banks:</b> proposed questions being studied for possible future updates.</li>
          <li><b>Institutions of One:</b> the broader research program continues operating regardless of whether these particular candidate questions are later adopted.</li>
        </ul>
        <p>People may volunteer for the interview study without taking either active public pilot first.</p>
        <p><a className="fwlink" href="/research/cognitive-interviews">Read why the interview study exists and what participation involves →</a></p>
      </div>
      <div className="card">
        <h2>Current candidate status</h2>
        <p>Ownership Index <b>v0.3.0-candidate.1</b> and Portfolio Professional <b>v0.2.0-candidate.1</b> are proposed future item banks.</p>
        <p>They are deliberately unscored inside the interview study. That boundary prevents feedback about wording from being mistaken for an assessment of the participant.</p>
      </div>
      <h2 className="dimhead">Requirements before a candidate can replace an active pilot</h2>
      <p>These requirements apply only to adopting and scoring the proposed candidate item banks. They are not requirements for Institutions of One or the active public pilots to exist.</p>
      <div className="card"><ol>{CANDIDATE_ACTIVATION_GATES.map((gate) => <li key={gate} style={{ marginBottom: 10 }}>{gate}</li>)}</ol></div>
      {instruments.map(({ name, candidate, activePilot }) => (
        <section key={candidate.id}>
          <h2 className="dimhead" style={{ marginTop: 36 }}>{name} · {candidate.version}</h2>
          <div className="card">
            <p><b>Status:</b> proposed future item bank; unscored during instrument-development research.</p>
            <p><b>Active public pilot:</b> {activePilot} remains available and unchanged.</p>
            <p><b>Reference period:</b> {candidate.referencePeriod}.</p>
            <p><b>Item count:</b> {candidate.items.length}.</p>
          </div>
          {candidate.items.map((item) => (
            <div className="card" key={candidate.id + ":" + item.id}>
              <p className="eyebrow">{item.id} · {item.construct}</p>
              <h3>{item.prompt}</h3>
              <p><b>Response format:</b> {item.responseFormat}.</p>
              <p><b>Proposed response anchors:</b> {item.anchors.join(" · ")}</p>
              {item.contextFields?.length ? <p><b>Context recorded separately:</b> {item.contextFields.join("; ")}.</p> : null}
            </div>
          ))}
        </section>
      ))}
      <div className="card" style={{ marginTop: 36 }}>
        <h2>What an adoption decision means</h2>
        <p>An adoption decision answers one narrow question: should this tested candidate item bank become the next scored public-pilot version? The answer may be yes, revise again, or do not adopt. None of those decisions determines whether Institutions of One continues.</p>
        <p><a className="fwlink" href="/methodology">Return to the complete methodology →</a></p>
      </div>
    </main>
  );
}
