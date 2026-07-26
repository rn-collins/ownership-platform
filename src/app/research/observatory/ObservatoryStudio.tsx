"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Evidence = { id:string; supportType:string; source:{ title:string; url:string; sourceType:string; primarySource:boolean } };
type Claim = { id:string; claimType:string; statement:string; epistemicStatus:string; verificationStatus:string; confidence?:number|null; publicStatus:string; evidence:Evidence[] };
type Relation = { id:string; targetType:string; targetName:string; relationshipType:string; verificationStatus:string };
type EventRow = { id:string; title:string; occurredAt?:string|null; verificationStatus:string };
type Observation = { id:string; constructId:string; valueNumeric?:number|null; valueCategory?:string|null; measurementMethod:string; verificationStatus:string };
type Audit = { id:string; action:string; entityType:string; entityId:string; actorEmail:string; note?:string|null; createdAt:string };
type CaseRow = {
  id:string; slug:string; displayName:string; caseType:string; primaryField?:string|null; jurisdiction?:string|null;
  headline?:string|null; summary?:string|null; inclusionRationale?:string|null; roleBuiltFlag:boolean;
  verificationStatus:string; evidenceCoverage?:number|null; publicStatus:string; claims:Claim[];
  relationshipsFrom:Relation[]; events:EventRow[]; observations:Observation[]; auditEvents:Audit[];
};
type Snapshot = { cases:CaseRow[]; researcher:{ email:string } };

async function api(body?:Record<string,unknown>) {
  const response = await fetch("/api/research/observatory", body ? {
    method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(body),
  } : { cache:"no-store" });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Operation failed");
  return result;
}
const iso = (value:FormDataEntryValue|null) => value ? new Date(String(value)).toISOString() : undefined;
const number = (value:FormDataEntryValue|null) => value !== null && String(value) !== "" ? Number(value) : undefined;

export function ObservatoryStudio() {
  const [data,setData] = useState<Snapshot|null>(null);
  const [selectedId,setSelectedId] = useState("");
  const [error,setError] = useState("");
  const [notice,setNotice] = useState("");
  async function refresh() {
    const next = await api() as Snapshot;
    setData(next);
    setSelectedId(current => current && next.cases.some(c => c.id === current) ? current : next.cases[0]?.id || "");
  }
  useEffect(() => { refresh().catch(e => setError(e.message)); }, []);
  const selected = useMemo(() => data?.cases.find(c => c.id === selectedId) || null,[data,selectedId]);
  async function run(body:Record<string,unknown>, message:string, form?:HTMLFormElement) {
    setError(""); setNotice("");
    try { await api(body); if (form) form.reset(); await refresh(); setNotice(message); }
    catch (e) { setError(e instanceof Error ? e.message : "Operation failed"); }
  }
  if (!data) return <p>{error || "Loading Observatory records…"}</p>;
  const claimCount = data.cases.reduce((n,c) => n+c.claims.length,0);
  const evidenceCount = data.cases.reduce((n,c) => n+c.claims.reduce((m,k) => m+k.evidence.length,0),0);

  return <>
    {error && <div role="alert" className="card"><b>Operation failed:</b> {error}</div>}
    {notice && <div role="status" className="card">{notice}</div>}
    <div className="find-stats">
      <div><span className="find-big">{data.cases.length}</span><span className="find-lbl">case records</span></div>
      <div><span className="find-big">{data.cases.filter(c=>c.verificationStatus==="verified").length}</span><span className="find-lbl">verified cases</span></div>
      <div><span className="find-big">{claimCount}</span><span className="find-lbl">claims</span></div>
      <div><span className="find-big">{evidenceCount}</span><span className="find-lbl">evidence links</span></div>
    </div>
    <div className="card">
      <h3>Working record</h3>
      <select value={selectedId} onChange={e=>setSelectedId(e.target.value)} style={{width:"100%"}}>
        {data.cases.map(c=><option key={c.id} value={c.id}>{c.displayName} · {c.verificationStatus} · {c.primaryField||"unclassified"}</option>)}
      </select>
    </div>
    {selected && <>
      <section className="card">
        <p className="eyebrow">{selected.slug} · {selected.verificationStatus} · {selected.publicStatus}</p>
        <h2>{selected.displayName}</h2>
        <p>{selected.headline || "No headline recorded."}</p>
        <p className="meta">
          Evidence coverage: {selected.evidenceCoverage == null ? "not calculated" : Math.round(selected.evidenceCoverage*100)+"%"}
          {" · "}{selected.claims.length} claims · {selected.relationshipsFrom.length} relationships · {selected.events.length} events
        </p>
      </section>

      <section className="card">
        <h2>1. Case record</h2>
        <form onSubmit={e=>{ e.preventDefault(); const f=new FormData(e.currentTarget); run({
          action:"update_case",caseId:selected.id,displayName:f.get("displayName"),caseType:f.get("caseType"),
          primaryField:f.get("primaryField")||undefined,jurisdiction:f.get("jurisdiction")||undefined,
          headline:f.get("headline")||undefined,summary:f.get("summary")||undefined,
          inclusionRationale:f.get("inclusionRationale")||undefined,roleBuiltFlag:f.get("roleBuiltFlag")==="on",
        },"Case record saved."); }}>
          <p><label>Name<br/><input name="displayName" required defaultValue={selected.displayName} style={{width:"100%"}}/></label></p>
          <p>
            <label>Category <select name="caseType" defaultValue={selected.caseType}><option value="creator">Creator</option><option value="professional">Professional</option></select></label>{" "}
            <label>Field <input name="primaryField" defaultValue={selected.primaryField||""}/></label>{" "}
            <label>Jurisdiction <input name="jurisdiction" defaultValue={selected.jurisdiction||""}/></label>
          </p>
          <p><label>Headline<br/><input name="headline" defaultValue={selected.headline||""} style={{width:"100%"}}/></label></p>
          <p><label>Summary<br/><textarea name="summary" defaultValue={selected.summary||""} rows={3} style={{width:"100%"}}/></label></p>
          <p><label>Inclusion rationale<br/><textarea name="inclusionRationale" defaultValue={selected.inclusionRationale||""} rows={3} style={{width:"100%"}}/></label></p>
          <p><label><input type="checkbox" name="roleBuiltFlag" defaultChecked={selected.roleBuiltFlag}/> Provisional role-built flag</label></p>
          <button type="submit">Save case</button>
        </form>
      </section>

      <section className="card">
        <h2>2. Claims and evidence</h2>
        <p className="meta">Record one falsifiable statement at a time. Keep observation, classification, interpretation, and hypothesis distinct.</p>
        <form onSubmit={e=>{ e.preventDefault(); const form=e.currentTarget; const f=new FormData(form); run({
          action:"create_claim",caseId:selected.id,claimType:f.get("claimType"),statement:f.get("statement"),
          constructId:f.get("constructId")||undefined,epistemicStatus:f.get("epistemicStatus"),
          permissibleLanguage:f.get("permissibleLanguage")||undefined,
        },"Claim created.",form); }}>
          <p>
            <label>Type <input name="claimType" required placeholder="role_creation"/></label>{" "}
            <label>Status <select name="epistemicStatus"><option value="observed">Observed fact</option><option value="classified">Classification</option><option value="interpreted">Interpretation</option><option value="hypothesized">Hypothesis</option></select></label>{" "}
            <label>Construct <input name="constructId"/></label>
          </p>
          <p><label>Statement<br/><textarea name="statement" required minLength={10} rows={3} style={{width:"100%"}}/></label></p>
          <p><label>Permissible public wording<br/><textarea name="permissibleLanguage" rows={2} style={{width:"100%"}}/></label></p>
          <button type="submit">Create claim</button>
        </form>
        {selected.claims.length===0 ? <p>No claims recorded.</p> : selected.claims.map(claim=>
          <article key={claim.id} style={{borderTop:"1px solid #e5e0d6",marginTop:16,paddingTop:14}}>
            <p><code>{claim.id}</code> · {claim.claimType} · {claim.epistemicStatus} · <b>{claim.verificationStatus}</b> · {claim.publicStatus}</p>
            <p>{claim.statement}</p>
            {claim.evidence.map(ev=><p key={ev.id} className="meta"><b>{ev.supportType}:</b> <a href={ev.source.url} target="_blank" rel="noreferrer">{ev.source.title}</a> · {ev.source.sourceType}{ev.source.primarySource?" · primary source":""}</p>)}
            <details><summary>Add source evidence</summary>
              <form onSubmit={e=>{ e.preventDefault(); const form=e.currentTarget; const f=new FormData(form); run({
                action:"attach_evidence",claimId:claim.id,url:f.get("url"),title:f.get("title"),publisher:f.get("publisher")||undefined,
                sourceType:f.get("sourceType"),primarySource:f.get("primarySource")==="on",publishedAt:iso(f.get("publishedAt")),
                accessedAt:new Date().toISOString(),supportType:f.get("supportType"),exactPassage:f.get("exactPassage")||undefined,
                locator:f.get("locator")||undefined,analystNote:f.get("analystNote")||undefined,
              },"Evidence attached.",form); }}>
                <p><label>URL<br/><input type="url" name="url" required style={{width:"100%"}}/></label></p>
                <p><label>Title <input name="title" required/></label>{" "}<label>Publisher <input name="publisher"/></label></p>
                <p>
                  <label>Source <select name="sourceType"><option value="official_record">Official record</option><option value="company_record">Company record</option><option value="first_person">First person</option><option value="government">Government</option><option value="academic">Academic</option><option value="journalism">Journalism</option><option value="other">Other</option></select></label>{" "}
                  <label>Use <select name="supportType"><option value="supports">Supports</option><option value="qualifies">Qualifies</option><option value="contradicts">Contradicts</option></select></label>{" "}
                  <label><input type="checkbox" name="primarySource"/> Primary source</label>
                </p>
                <p><label>Published <input type="datetime-local" name="publishedAt"/></label>{" "}<label>Locator <input name="locator" placeholder="page, section, timestamp"/></label></p>
                <p><label>Exact passage<br/><textarea name="exactPassage" rows={3} style={{width:"100%"}}/></label></p>
                <p><label>Analyst note<br/><textarea name="analystNote" rows={2} style={{width:"100%"}}/></label></p>
                <button type="submit">Attach evidence</button>
              </form>
            </details>
            <details><summary>Review claim</summary>
              <form onSubmit={e=>{ e.preventDefault(); const f=new FormData(e.currentTarget); run({
                action:"review_claim",claimId:claim.id,verificationStatus:f.get("verificationStatus"),
                confidence:number(f.get("confidence")),contradictionNote:f.get("contradictionNote")||undefined,
                publicStatus:f.get("publicStatus"),
              },"Claim review saved."); }}>
                <p>
                  <label>Verification <select name="verificationStatus" defaultValue={claim.verificationStatus}><option value="unreviewed">Unreviewed</option><option value="partially_supported">Partially supported</option><option value="verified">Verified</option><option value="disputed">Disputed</option><option value="rejected">Rejected</option></select></label>{" "}
                  <label>Confidence <input type="number" min="0" max="1" step=".01" name="confidence" defaultValue={claim.confidence??""}/></label>{" "}
                  <label>Visibility <select name="publicStatus" defaultValue={claim.publicStatus}><option value="draft">Draft</option><option value="public">Public</option><option value="withheld">Withheld</option></select></label>
                </p>
                <p><label>Contradiction or limitation<br/><textarea name="contradictionNote" rows={2} style={{width:"100%"}}/></label></p>
                <button type="submit">Save review</button>
              </form>
            </details>
          </article>
        )}
      </section>

      <section className="card">
        <h2>3. Relationships</h2>
        <form onSubmit={e=>{ e.preventDefault(); const form=e.currentTarget; const f=new FormData(form); run({
          action:"create_relationship",caseId:selected.id,targetType:f.get("targetType"),targetName:f.get("targetName"),
          relationshipType:f.get("relationshipType"),startedAt:iso(f.get("startedAt")),endedAt:iso(f.get("endedAt")),
        },"Relationship created.",form); }}>
          <p>
            <select name="targetType"><option value="organization">Organization</option><option value="person">Person</option><option value="platform">Platform</option><option value="asset">Asset</option><option value="venture">Venture</option><option value="institution">Institution</option></select>{" "}
            <input name="targetName" required placeholder="Target name"/>{" "}
            <input name="relationshipType" required placeholder="founded, employed_by, owns"/>
          </p>
          <p><label>Started <input type="datetime-local" name="startedAt"/></label>{" "}<label>Ended <input type="datetime-local" name="endedAt"/></label></p>
          <button type="submit">Create relationship</button>
        </form>
        <ul>{selected.relationshipsFrom.map(r=><li key={r.id}>{r.relationshipType} → {r.targetName} ({r.targetType}) · {r.verificationStatus}</li>)}</ul>
      </section>

      <section className="card">
        <h2>4. Timeline</h2>
        <form onSubmit={e=>{ e.preventDefault(); const form=e.currentTarget; const f=new FormData(form); run({
          action:"create_event",caseId:selected.id,eventType:f.get("eventType"),title:f.get("title"),
          description:f.get("description")||undefined,occurredAt:iso(f.get("occurredAt")),precision:f.get("precision"),
        },"Event created.",form); }}>
          <p><input name="eventType" required placeholder="event type"/>{" "}<input name="title" required placeholder="Title"/></p>
          <p><label>Date <input type="datetime-local" name="occurredAt"/></label>{" "}
            <select name="precision"><option value="day">Day</option><option value="month">Month</option><option value="year">Year</option><option value="approximate">Approximate</option><option value="unknown">Unknown</option></select>
          </p>
          <p><textarea name="description" rows={2} placeholder="Description" style={{width:"100%"}}/></p>
          <button type="submit">Create event</button>
        </form>
        <ul>{selected.events.map(r=><li key={r.id}>{r.title} · {r.occurredAt?new Date(r.occurredAt).toLocaleDateString():"date unknown"} · {r.verificationStatus}</li>)}</ul>
      </section>

      <section className="card">
        <h2>5. Construct observations</h2>
        <p className="meta">Method-bound observations do not automatically create a score or causal claim.</p>
        <form onSubmit={e=>{ e.preventDefault(); const form=e.currentTarget; const f=new FormData(form); run({
          action:"create_observation",caseId:selected.id,constructId:f.get("constructId"),
          valueNumeric:number(f.get("valueNumeric")),valueCategory:f.get("valueCategory")||undefined,
          measurementMethod:f.get("measurementMethod"),instrumentVersion:f.get("instrumentVersion")||undefined,
          evidenceCoverage:number(f.get("evidenceCoverage")),
        },"Construct observation created.",form); }}>
          <p><input name="constructId" required placeholder="Construct ID"/>{" "}<input type="number" step="any" name="valueNumeric" placeholder="Numeric value"/>{" "}<input name="valueCategory" placeholder="Category"/></p>
          <p>
            <select name="measurementMethod"><option value="coded_public_evidence">Coded public evidence</option><option value="direct_assessment">Direct assessment</option><option value="consented_interview">Consented interview</option><option value="administrative_record">Administrative record</option></select>{" "}
            <input name="instrumentVersion" placeholder="Instrument version"/>{" "}<input type="number" min="0" max="1" step=".01" name="evidenceCoverage" placeholder="Coverage 0–1"/>
          </p>
          <button type="submit">Create observation</button>
        </form>
        <ul>{selected.observations.map(o=><li key={o.id}>{o.constructId}: {o.valueNumeric??o.valueCategory??"missing"} · {o.measurementMethod} · {o.verificationStatus}</li>)}</ul>
      </section>

      <section className="card">
        <h2>6. Verification and publication</h2>
        <p>Verification requires a verified claim with linked evidence. A newly published case must be verified. Existing provisional roster records remain visible but labeled.</p>
        <form onSubmit={e=>{ e.preventDefault(); const f=new FormData(e.currentTarget); run({
          action:"case_decision",caseId:selected.id,verificationStatus:f.get("verificationStatus"),
          publicStatus:f.get("publicStatus"),note:f.get("note"),
        },"Case decision saved."); }}>
          <p>
            <select name="verificationStatus" defaultValue={selected.verificationStatus}><option value="provisional">Provisional</option><option value="in_review">In review</option><option value="verified">Verified</option><option value="disputed">Disputed</option><option value="rejected">Rejected</option></select>{" "}
            <select name="publicStatus" defaultValue={selected.publicStatus}><option value="draft">Draft</option><option value="public">Public</option><option value="withheld">Withheld</option></select>
          </p>
          <p><textarea name="note" required minLength={10} rows={3} placeholder="Decision rationale" style={{width:"100%"}}/></p>
          <button type="submit">Record decision</button>
        </form>
      </section>

      <section className="card">
        <h2>Audit trail</h2>
        {selected.auditEvents.length===0 ? <p>No mutations recorded since audit activation.</p> :
          <ul>{selected.auditEvents.map(a=><li key={a.id}>{new Date(a.createdAt).toLocaleString()} · {a.actorEmail} · {a.action} {a.entityType} <code>{a.entityId}</code>{a.note?" · "+a.note:""}</li>)}</ul>}
      </section>
    </>}
  </>;
}
