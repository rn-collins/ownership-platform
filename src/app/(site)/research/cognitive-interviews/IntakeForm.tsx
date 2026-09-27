"use client";

import { FormEvent, useState } from "react";

type Result = { ok: boolean; eligible?: boolean; studyCode?: string; withdrawalToken?: string; next?: string; error?: string };

export function IntakeForm() {
  const [result, setResult] = useState<Result | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setResult(null);
    const form = new FormData(event.currentTarget);
    const body = {
      name: form.get("name") || "",
      email: form.get("email"),
      age18OrOlder: form.get("age18OrOlder") === "on",
      canJoinRemoteInterview: form.get("canJoinRemoteInterview") === "yes",
      relevantExperience: form.get("relevantExperience") === "on",
      instrumentInterest: form.get("instrumentInterest"),
      workArrangement: form.getAll("workArrangement"),
      careerStage: form.get("careerStage") || "",
      jurisdiction: form.get("jurisdiction") || "",
      businessModel: form.get("businessModel") || "",
      structuralContexts: form.getAll("structuralContexts"),
      availability: form.get("availability"),
      timezone: form.get("timezone"),
      accessNeeds: form.get("accessNeeds") || "",
      voluntaryConsent: form.get("voluntaryConsent") === "on",
      privacyAcknowledged: form.get("privacyAcknowledged") === "on",
      noScoreAcknowledged: form.get("noScoreAcknowledged") === "on",
      contactConsent: form.get("contactConsent") === "on",
      recordingConsent: form.get("recordingConsent") === "on",
      quotationConsent: form.get("quotationConsent") === "on",
    };
    try {
      const response = await fetch("/api/research/interviews/intake", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      setResult(await response.json());
    } catch {
      setResult({ ok: false, error: "The form could not be submitted. Please try again." });
    } finally {
      setPending(false);
    }
  }

  if (result?.ok) return (
    <div className="card" role="status">
      <h3>Screening submitted</h3>
      <p><b>Study code:</b> {result.studyCode}</p>
      <p>{result.next}</p>
      <p><b>Withdrawal token:</b> <code>{result.withdrawalToken}</code></p>
      <p>Save the study code and withdrawal token. They allow the research team to locate or withdraw your record without publishing your identity.</p>
    </div>
  );

  return (
    <form className="card" onSubmit={submit}>
      <h2>Eligibility and participation request</h2>
      <p>Required fields are marked “required.” Optional context helps purposive sampling and never affects a score because this study does not score participants.</p>
      <label>Name (optional)<br /><input name="name" autoComplete="name" maxLength={120} /></label>
      <p><label>Email (required)<br /><input name="email" type="email" autoComplete="email" required maxLength={200} /></label></p>
      <fieldset><legend>Basic eligibility</legend>
        <label><input name="age18OrOlder" type="checkbox" required /> I am at least 18 years old.</label><br />
        <label><input name="relevantExperience" type="checkbox" required /> I have experience creating, licensing, earning from, organizing, documenting, or communicating work, or managing a portfolio career.</label><br />
        <label>Can you join a remote interview? <select name="canJoinRemoteInterview" required defaultValue=""><option value="" disabled>Select</option><option value="yes">Yes</option><option value="no">No</option></select></label>
      </fieldset>
      <p><label>Instrument interest <select name="instrumentInterest" required defaultValue="either"><option value="ownership">Ownership Index</option><option value="portfolio_professional">Portfolio Professional</option><option value="either">Either</option></select></label></p>
      <fieldset><legend>Work arrangement (optional; select all that apply)</legend>
        {['Employee','Independent professional','Creator','Founder','Student or trainee','Caregiver','Between roles'].map((v) => <label key={v}><input type="checkbox" name="workArrangement" value={v} /> {v}<br /></label>)}
      </fieldset>
      <p><label>Career stage (optional)<br /><input name="careerStage" maxLength={80} /></label></p>
      <p><label>Jurisdiction or region (optional)<br /><input name="jurisdiction" maxLength={120} /></label></p>
      <p><label>Business or income model (optional)<br /><input name="businessModel" maxLength={120} /></label></p>
      <fieldset><legend>Context the study should represent (optional)</legend>
        {['Disability or chronic illness','Care responsibilities','Limited professional support','Platform-dependent work','Multiple jurisdictions','Variable or seasonal income'].map((v) => <label key={v}><input type="checkbox" name="structuralContexts" value={v} /> {v}<br /></label>)}
      </fieldset>
      <p><label>Availability and preferred times (required)<br /><textarea name="availability" required rows={3} maxLength={1000} /></label></p>
      <p><label>Time zone (required)<br /><input name="timezone" required maxLength={80} placeholder="Pacific/Honolulu" /></label></p>
      <p><label>Access needs or preferred interview format (optional)<br /><textarea name="accessNeeds" rows={3} maxLength={2000} /></label></p>
      <fieldset><legend>Consent</legend>
        <label><input name="voluntaryConsent" type="checkbox" required /> I understand participation is voluntary and I may skip questions or stop.</label><br />
        <label><input name="privacyAcknowledged" type="checkbox" required /> I understand contact information is used for study operations and public findings will be de-identified.</label><br />
        <label><input name="noScoreAcknowledged" type="checkbox" required /> I understand this is instrument development and produces no score, result, diagnosis, ranking, or eligibility decision.</label><br />
        <label><input name="contactConsent" type="checkbox" required /> I agree to be contacted about this study.</label><br />
        <label><input name="recordingConsent" type="checkbox" /> I permit recording if separately reconfirmed at the interview. Optional.</label><br />
        <label><input name="quotationConsent" type="checkbox" /> I permit de-identified quotation. Optional and separately reviewable.</label>
      </fieldset>
      {result?.error && <p role="alert">{result.error}</p>}
      <p><button type="submit" disabled={pending}>{pending ? "Submitting…" : "Submit participation request"}</button></p>
    </form>
  );
}
