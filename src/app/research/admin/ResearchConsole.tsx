"use client";

import { FormEvent, useEffect, useState } from "react";

type Session = { id: string; instrument: string; candidateVersion: string; round: number; status: string; scheduledStart?: string | null; codes: { id: string; itemId: string; domain: string; severity: string }[] };
type Participant = { id: string; studyCode: string; name?: string | null; email: string; instrumentInterest: string; status: string; accessNeeds?: string | null; availability: unknown; sessions: Session[] };
type Snapshot = { participants: Participant[]; activation: { instrument: string; scoringMayActivate: boolean; missing: string[] }[]; revisions: unknown[]; gates: unknown[] };

async function mutate(body: Record<string, unknown>) {
  const response = await fetch("/api/research/admin/operations", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Operation failed");
  return result;
}

export function ResearchConsole() {
  const [data, setData] = useState<Snapshot | null>(null);
  const [error, setError] = useState("");
  async function refresh() {
    const response = await fetch("/api/research/admin/operations", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load research records");
    setData(await response.json());
  }
  useEffect(() => { refresh().catch((e) => setError(e.message)); }, []);

  async function schedule(event: FormEvent<HTMLFormElement>, sessionId: string) {
    event.preventDefault(); setError("");
    const f = new FormData(event.currentTarget);
    try { await mutate({ action: "schedule", sessionId, start: new Date(String(f.get("start"))).toISOString(), end: new Date(String(f.get("end"))).toISOString(), timezone: f.get("timezone"), meetingLocation: f.get("meetingLocation") }); await refresh(); }
    catch (e) { setError(e instanceof Error ? e.message : "Operation failed"); }
  }

  async function code(event: FormEvent<HTMLFormElement>, sessionId: string) {
    event.preventDefault(); setError("");
    const f = new FormData(event.currentTarget);
    try { await mutate({ action: "code", sessionId, itemId: f.get("itemId"), domain: f.get("domain"), severity: f.get("severity"), evidence: f.get("evidence"), proposedAction: f.get("proposedAction") || undefined }); event.currentTarget.reset(); await refresh(); }
    catch (e) { setError(e instanceof Error ? e.message : "Operation failed"); }
  }

  if (!data) return <p>{error || "Loading restricted research records…"}</p>;
  return <>
    {error && <p role="alert">{error}</p>}
    <div className="card"><h2>Activation lock</h2>{data.activation.map((a) => <div key={a.instrument}><h3>{a.instrument}</h3><p><b>Scoring:</b> {a.scoringMayActivate ? "All machine-readable gates met; dated human activation decision still required." : "Disabled"}</p><p>{a.missing.length} required gates are not met.</p></div>)}</div>
    <div className="card"><h2>Operations snapshot</h2><p>{data.participants.length} active participant records · {data.revisions.length} revision ledger entries · {data.gates.length} gate decisions</p></div>
    {data.participants.map((p) => <section className="card" key={p.id}>
      <h2>{p.studyCode} · {p.status}</h2>
      <p>{p.name || "Name not supplied"} · {p.email} · interest: {p.instrumentInterest}</p>
      <p><b>Availability:</b> {JSON.stringify(p.availability)}</p>
      <p><b>Access needs:</b> {p.accessNeeds || "None supplied"}</p>
      {p.sessions.map((s) => <div key={s.id}>
        <h3>{s.instrument} · Round {s.round} · {s.status}</h3>
        <form onSubmit={(e) => schedule(e, s.id)}>
          <label>Start <input type="datetime-local" name="start" required /></label>{" "}
          <label>End <input type="datetime-local" name="end" required /></label>{" "}
          <label>Time zone <input name="timezone" required defaultValue="Pacific/Honolulu" /></label>{" "}
          <label>Meeting URL <input type="url" name="meetingLocation" required /></label>{" "}
          <button type="submit">Schedule</button>
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
      </div>)}
    </section>)}
  </>;
}
