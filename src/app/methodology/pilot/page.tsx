import { ACTIVATION_REQUIREMENTS, PILOT_PROTOCOL } from "@/lib/research-validation";
import { ACTIVATION_DECISION_TEMPLATE, LIMITATIONS_TEMPLATE } from "@/lib/research-launch";

export const metadata = { title: "Candidate pilot protocol — Institutions of One", description: "Sampling, preregistration, analysis, fairness, and activation rules for candidate-instrument pilots." };

export default function PilotProtocolPage() {
  return <main>
    <p className="eyebrow">Institutions of One · Validation protocol</p>
    <h1>Candidate-instrument pilot protocol</h1>
    <p className="lede">The pilot begins only after both cognitive-interview rounds produce a frozen candidate version. Its purpose is instrument development, not individual classification or population claims.</p>
    <div className="card"><h2>Status</h2><p><b>{PILOT_PROTOCOL.status}</b></p><p>{PILOT_PROTOCOL.objective}</p></div>
    <h2 className="dimhead">Sampling plan</h2>
    <div className="card"><p>{PILOT_PROTOCOL.sampling.target}</p><p>{PILOT_PROTOCOL.sampling.recruitment}</p><p>{PILOT_PROTOCOL.sampling.separation}</p><ul>{PILOT_PROTOCOL.sampling.strata.map((s) => <li key={s}>{s}</li>)}</ul></div>
    <h2 className="dimhead">Preregistration</h2>
    <div className="card"><p>Before collection, the public record must freeze:</p><ul>{PILOT_PROTOCOL.preregistration.requiredBeforeCollection.map((r) => <li key={r}>{r}</li>)}</ul><p>{PILOT_PROTOCOL.preregistration.immutableRecord}</p></div>
    <h2 className="dimhead">Analysis plan</h2>
    <div className="card"><ul>{PILOT_PROTOCOL.analysis.map((a) => <li key={a}>{a}</li>)}</ul><p>A versioned R analysis script accompanies the protocol and preserves missing, do-not-know, and structurally not-applicable states.</p></div>
    <h2 className="dimhead">Required limitations report</h2>
    <div className="card"><p>Every pilot report must address each limitation even when the result is “none observed.”</p><ul>{LIMITATIONS_TEMPLATE.map((item) => <li key={item}>{item}</li>)}</ul></div>
    <h2 className="dimhead">Dated activation decision</h2>
    <div className="card"><p>The default decision is <b>{ACTIVATION_DECISION_TEMPLATE.decision}</b>. The record must contain:</p><ul>{ACTIVATION_DECISION_TEMPLATE.requiredFields.map((field) => <li key={field}>{field}</li>)}</ul><p>Automated activation is prohibited.</p></div>
    <h2 className="dimhead">Activation requirements</h2>
    <div className="card"><p>Every requirement must be recorded as met. Waivers do not unlock scoring.</p><ol>{ACTIVATION_REQUIREMENTS.map((g) => <li key={g}><code>{g}</code></li>)}</ol><p>{PILOT_PROTOCOL.activation}</p></div>
  </main>;
}
