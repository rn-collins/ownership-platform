# Research data retention and audit policy — approval candidate

Version: 0.1-candidate  
Prepared: 2026-07-26 UTC  
Status: not effective until dated approval by the accountable researcher

## Scope

This policy covers cognitive-interview recruitment, screening, scheduling, consent, session records, recordings, notes, response-process codes, revision decisions, gate decisions, pilot records, and synthetic quality-assurance records.

## Data classes and proposed retention

| Data class | Purpose | Access | Proposed deletion or review point |
|---|---|---|---|
| Intake contact details | Screening, scheduling, withdrawal, required communication | Authorized researchers | Delete 90 days after ineligibility, declined invitation, or unsuccessful scheduling; otherwise review 12 months after last study contact |
| Consent records | Demonstrate permissions and withdrawal status | Authorized researchers | Retain with the governed study record; review at study closure and before any archive transfer |
| Scheduling details and meeting URLs | Operate interviews | Authorized researchers | Remove meeting URLs 30 days after session completion or cancellation |
| Audio or video recordings | Accurate transcription and coding | Researchers explicitly authorized for recordings | Delete within 90 days after transcript/coding verification unless a separately approved reason is recorded |
| Identifiable notes or transcripts | Response-process analysis and audit | Authorized researchers | De-identify as soon as verification permits; review at study closure |
| De-identified item codes | Instrument revision evidence | Authorized researchers; aggregate reporting where valid | Retain with the versioned methodology record subject to periodic review |
| Revision and gate decisions | Reproducibility and governance | Authorized researchers; publish appropriate methodology records | Preserve as versioned audit records |
| Withdrawal token hash | Authenticate withdrawal requests | Application service and authorized administrators | Retain only while withdrawal rights require token-based verification |
| Synthetic QA records | Verify production workflows | Authorized researchers | Withdraw immediately after verification; exclude by reserved labels/domain; delete only after the audit event is preserved |
| Pilot dataset | Preregistered psychometric analysis | Authorized pilot researchers | Define before collection in the approved pilot data-management plan |

These periods are governance proposals, not statements of legal sufficiency. The accountable researcher must reconcile them with the consent language, applicable institutional requirements, contracts, privacy law, publication needs, and any ethics review before approval.

## Required controls

1. Real participants and synthetic QA records must be distinguishable by machine-readable status, not naming convention alone.
2. Public reporting uses study codes and aggregates; contact information is not exported into analytical datasets.
3. Optional recording and quotation permissions remain separate from general participation consent.
4. Completing a session requires recorded consent reconfirmation.
5. Withdrawal stops contact and changes requested or scheduled sessions to withdrawn.
6. Item codes require item, domain, severity, evidence, coder, and timestamp.
7. Revisions require linked valid evidence codes and a dated reviewer decision.
8. Gate decisions require a named decision maker, timestamp, and evidence snapshot.
9. Candidate generation and scoring activation use separate gates.
10. No automated test, database migration, deployment, or passing gate count activates scoring.

## Access review

Before the first real interview:

- confirm the authorized researcher email list;
- test anonymous and ordinary signed-in users receive 403 from research operations;
- confirm an authorized researcher can access only the intended records;
- rotate any exposed credential;
- verify database backups and provider access;
- document who can access Vercel, Supabase, GitHub, recordings, transcripts, and scheduling systems.

Review access when a collaborator joins or leaves and at least quarterly while recruitment or analysis is active.

## Audit events

Preserve dated records for:

- consent version publication;
- intake and withdrawal workflow tests;
- permission tests;
- synthetic-record creation, verification, withdrawal, and disposal;
- interview completion and consent reconfirmation;
- code creation and review;
- revision proposal, approval, rejection, and supersession;
- gate decisions;
- candidate generation;
- preregistration freeze and deviations;
- pilot analysis execution;
- activation or continued-block decision.

## Approval

Effective date: pending  
Approved by: pending  
Approval record: pending  
Next review: pending
