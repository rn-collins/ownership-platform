"use client";

import { FormEvent, useEffect, useState } from "react";

type Code = { id: string; itemId: string; domain: string; severity: string };
type Session = { id: string; instrument: string; candidateVersion: string; round: number; status: string; scheduledStart?: string | null; consentReconfirmedAt?: string | null; recordingUsed?: boolean; codes: Code[] };
type Participant = { id: string; studyCode: string; name?: string | null; email: string; instrumentInterest: string; status: string; accessNeeds?: string | null; availability: unknown; sessions: Session[] };
type Revision = { id: string; instrument: string; itemId: string; targetVersion: string; decisionStatus: string };
type Gate = { id: string; instrument: string; candidateVersion: string; gate: string; status: string };
type Snapshot = { participants: Participant[]; activation: { instrument: string; scoringMayActivate: boolean; missing: string[] }[]; revisions: Revision[]; gates: Gate[] };

const gateOptions = [
  "round_1_complete", "round_2_complete", "pilot_preregistered", "pilot_complete",
  "item_performance_reviewed", "dimensionality_reviewed", "reliability_reviewed",
  "fairness_reviewed", "claim_language_approved", "crosswalk_approved",
  "methodology_record_published", "dated_activation_decision_approved",
];

async function mutate(body: Record<string, unknown>) {
  const response = await fetch("/api/research/admin/operations", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Operation failed");
  return result;
}

function parseObject(value: FormDataEntryValue | null, label: string) {
  try {
    const parsed = JSON.parse(String(value || "{}"));
    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") throw new Error();
    return parsed as Record<string, unknown>;
  } catch {
    throw new Error(`${label} must be a valid JSON object`);
  }
}

export function ResearchConsole() {
  const [data, setData] = useState<Snapshot | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function refresh() {
    const response = await fetch("/api/research/admin/operations", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load research records");
    setData(await response.json());
  }
  useEffect(() => { refresh().catch((e) => setError(e.message)); }, []);

  async function run(body: Record<string, unknown>, success: string, form?: HTMLFormElement) {
    setError(""); setNotice("");
    try { await mutate(body); if (form) form.reset(); await refresh(); setNotice(success); }
    catch (e) { setError(e instanceof Error ? e.message : "Operation failed"); }
  }

  async function schedule(event: FormEvent<HTMLFormElement>, sessionId: string) {
    event.preventDefault(); const f = new FormData(event.currentTarget);
    await run({ action: "schedule", sessionId, start: new Date(String(f.get("start"))).toISOString(), end: new Date(String(f.get("end"))).toISOString(), timezone: f.get("timezone"), meetingLocation: f.get("meetingLocation") }, "Schedule saved.");
  }

  async function updateSession(event: FormEvent<HTMLFormElement>, sessionId: string) {
    event.preventDefault(); const f = new FormData(event.currentTarget);
    await run({ action: "session_status", sessionId, status: f.get("status"), notes: f.get("notes") || undefined, consentReconfirmed: f.get("consentReconfirmed") === "on", recordingUsed: f.get("recordingUsed") === "on" }, "Session status saved.");
  }

  async function code(event: FormEvent<HTMLFormElement>, sessionId: string) {
    event.preventDefault(); const form = event.currentTarget; const f = new FormData(form);
    await run({ action: "code", sessionId, itemId: f.get("itemId"), domain: f.get("domain"), severity: f.get("severity"), evidence: f.get("evidence"), proposedAction: f.get("proposedAction") || undefined }, "Coded evidence saved.", form);
  }

  async function revision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const f = new FormData(form);
    try {
      await run({ action: "revision", instrument: f.get("instrument"), sourceVersion: f.get("sourceVersion"), targetVersion: f.get("targetVersion"), itemId: f.get("itemId"), changeType: f.get("changeType"), beforeValue: parseObject(f.get("beforeValue"), "Before value"), afterValue: parseObject(f.get("afterValue"), "After value"), rationale: f.get("rationale"), evidenceCodeIds: String(f.get("evidenceCodeIds") || "").split(",").map((v) => v.trim()).filter(Boolean), decisionStatus: f.get("decisionStatus") }, "Revision-ledger entry saved.", form);
    } catch (e) { setError(e instanceof Error ? e.message : "Operation failed"); }
  }

  async function gate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const f = new FormData(form);
    try {
      await run({ action: "gate", instrument: f.get("instrument"), candidateVersion: f.get("candidateVersion"), gate: f.get("gate"), status: f.get("status"), evidence: parseObject(f.get("evidence"), "Gate evidence") }, "Gate decision saved. Scoring remains separately locked.", form);
    } catch (e) { setError(e instanceof Error ? e.message : "Operation failed"); }
  }

  if (!data) return <p>{error || "Loading restricted research records…"}</p>;
  return <>
    {error && <p role="alert" className="card"><b>Operation failed:</b> {error}</p>}
    {notice && <p role="status" className="card">{notice}</p>}
    <div className="card"><h2>Activation lock</h2>{data.activation.map((a) => <div key={a.instrument}><h3>{a.instrument}</h3><p><b>Scoring:</b> {a.scoringMayActivate ? "All machine-readable gates met; dated human activation decision still required." : "Disabled"}</p><p>{a.missing.length} required gates are not met.</p></div>)}</div>
    <div className="card"><h2>Operations snapshot</h2><p>{data.participants.length} active participant records · {data.revisions.length} revision ledger entries · {data.gates.length} gate decisions</p></div>
    {data.participants.map((p) => <section className="card" key={p.id}>
      <h2>{p.studyCode} · {p.status}</h2>
      <p>{p.name || "Name not supplied"} · {p.email} · interest: {p.instrumentInterest}</p>
      <p><b>Availability:</b> {JSON.stringify(p.availability)}</p>
      <p><b>Access needs:</b> {p.accessNeeds || "None supplied"}</p>
      {p.sessions.map((s) => <div key={s.id}>
        <h3>{s.instrument} · Round {s.round} · {s.status}</h3>
        <p><b>Candidate:</b> {s.candidateVersion} · <b>Consent reconfirmed:</b> {s.consentReconfirmedAt ? "Yes" : "No"} · <b>Recording used:</b> {s.recordingUsed ? "Yes" : "No"}</p>
        <form onSubmit={(e) => schedule(e, s.id)}>
          <label>Start <input type="datetime-local" name="start" required /></label>{" "}
          <label>End <input type="datetime-local" name="end" required /></label>{" "}
          <label>Time zone <input name="timezone" required defaultValue="Pacific/Honolulu" /></label>{" "}
          <label>Meeting URL <input type="url" name="meetingLocation" required /></label>{" "}
          <button type="submit">Schedule</button>
        </form>
        <form onSubmit={(e) => updateSession(e, s.id)}>
          <h4>Session status and consent</h4>
          <label>Status <select name="status" defaultValue={s.status}><option value="requested">Requested</option><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option><option value="withdrawn">Withdrawn</option></select></label>{" "}
          <label><input type="checkbox" name="consentReconfirmed" /> Consent reconfirmed</label>{" "}
          <label><input type="checkbox" name="recordingUsed" /> Recording used</label>
          <p><label>Researcher-only notes<br /><textarea name="notes" maxLength={10000} rows={3} /></label></p>
          <button type="submit">Save session status</button>
        </form>
        <form onSubmit={(e) => code(e, s.id)}>
          <h4>Add item-level response-process code</h4>
          <label>Item <input name="itemId" required maxLength={10} /></label>{" "}
          <label>Domain <select name="domain"><option value="comprehension">Comprehension</option><option value="retrieval">Retrieval</option><option value="judgment">Judgment</option><option value="response_mapping">Response mapping</option><option value="sensitivity">Sensitivity</option><option value="accessibility">Accessibility</option></select></label>{" "}
          <label>Severity <select name="severity"><option value="none">None</option><option value="minor">Minor</option><option value="major">Major</option><option value="critical">Critical</option></select></label>
          <p><label>Evidence<br /><textarea name="evidence" minLength={10} maxLength={10000} required rows={3} /></label></p>
          <p><label>Proposed action<br /><textarea name="proposedAction" maxLength={2000} rows={2} /></label></p>
          <button type="submit">Save coded evidence</button>
        </form>
        <p>{s.codes.length} code(s) recorded.</p>
        {s.codes.length > 0 && <ul>{s.codes.map((c) => <li key={c.id}><code>{c.id}</code> · {c.itemId} · {c.domain} · {c.severity}</li>)}</ul>}
      </div>)}
    </section>)}
    <section className="card">
      <h2>Revision ledger</h2>
      <p>Every entry requires an existing evidence-code ID for the same item. Synthetic QA entries must remain proposed or rejected and cannot support candidate generation.</p>
      <form onSubmit={revision}>
        <p><label>Instrument <select name="instrument"><option value="ownership">Ownership</option><option value="portfolio_professional">Portfolio Professional</option></select></label>{" "}<label>Item <input name="itemId" required maxLength={10} /></label>{" "}<label>Change <select name="changeType"><option value="retain">Retain</option><option value="clarify">Clarify</option><option value="split">Split</option><option value="reanchor">Re-anchor</option><option value="route">Route</option><option value="defer">Defer</option><option value="remove">Remove</option></select></label></p>
        <p><label>Source version <input name="sourceVersion" required defaultValue="0.3.0-candidate.1" /></label>{" "}<label>Target version <input name="targetVersion" required defaultValue="0.3.0-candidate.2" /></label></p>
        <p><label>Evidence-code IDs, comma separated<br /><input name="evidenceCodeIds" required style={{width:"100%"}} /></label></p>
        <p><label>Before value as JSON object<br /><textarea name="beforeValue" required defaultValue={'{"qa":"synthetic-before"}'} rows={3} /></label></p>
        <p><label>After value as JSON object<br /><textarea name="afterValue" required defaultValue={'{"qa":"synthetic-after"}'} rows={3} /></label></p>
        <p><label>Rationale<br /><textarea name="rationale" required minLength={20} maxLength={10000} rows={3} /></label></p>
        <p><label>Decision <select name="decisionStatus" defaultValue="proposed"><option value="proposed">Proposed</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></label></p>
        <button type="submit">Save revision-ledger entry</button>
      </form>
      {data.revisions.length > 0 && <ul>{data.revisions.map((r) => <li key={r.id}>{r.instrument} · {r.itemId} · {r.targetVersion} · {r.decisionStatus}</li>)}</ul>}
    </section>
    <section className="card">
      <h2>Validation gate decisions</h2>
      <p>A gate record documents the decision; it does not itself activate scoring. Use <b>not met</b> for synthetic QA.</p>
      <form onSubmit={gate}>
        <p><label>Instrument <select name="instrument"><option value="ownership">Ownership</option><option value="portfolio_professional">Portfolio Professional</option></select></label>{" "}<label>Candidate version <input name="candidateVersion" required defaultValue="0.3.0-candidate.1" /></label></p>
        <p><label>Gate <select name="gate">{gateOptions.map((g) => <option key={g} value={g}>{g}</option>)}</select></label>{" "}<label>Status <select name="status" defaultValue="not_met"><option value="not_met">Not met</option><option value="met">Met</option><option value="waived">Waived</option></select></label></p>
        <p><label>Evidence as JSON object<br /><textarea name="evidence" required defaultValue={'{"syntheticQA":true,"admissibleEvidence":false}'} rows={3} /></label></p>
        <button type="submit">Save gate decision</button>
      </form>
      {data.gates.length > 0 && <ul>{data.gates.map((g) => <li key={g.id}>{g.instrument} · {g.candidateVersion} · {g.gate} · {g.status}</li>)}</ul>}
    </section>
  </>;
}
