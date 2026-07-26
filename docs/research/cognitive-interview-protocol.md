# Cognitive-interview protocol for candidate instruments

Status: required pre-activation protocol  
Candidates: Ownership Index `0.3.0-candidate.1`; Portfolio Professional `0.2.0-candidate.1`

## Purpose and non-use rule

The interviews evaluate how people understand, retrieve information for, judge, and map answers to each candidate item. They are not validation of a score, are not used to rank participants, and cannot activate either candidate. Candidate responses must not be merged with production scores.

## Sampling matrix

Use purposive, maximum-variation recruitment. Each instrument should complete at least two rounds, with approximately 5–8 participants per round, continuing if a major subgroup or high-risk item has not reached comprehension saturation. Record—voluntarily and separately—career stage, business or employment form, creator/professional domain, jurisdiction, income/platform dependence, accessibility needs, and care constraints. Do not treat demographic quotas as psychometric representativeness.

## Session sequence

1. Obtain versioned consent; explain recording, confidentiality, withdrawal, and non-diagnostic/non-evaluative use.
2. Establish the participant’s real reference context without coaching item answers.
3. Administer items in the intended interface, rotating item order across sessions where dependencies permit.
4. Use concurrent think-aloud sparingly; follow each item with scripted retrospective probes.
5. Test response selection, “not applicable,” “don’t know,” period recall, calculations, and evidence availability.
6. Debrief for missing constructs, burden, sensitivity, accessibility, and perceived stakes.
7. Stop or skip without penalty if distress or disclosure risk arises.

## Core probes for every item

- Comprehension: “In your own words, what is this question asking?”
- Construct boundary: “What did you include, and what did you leave out?”
- Retrieval: “What information or examples did you recall?”
- Reference period: “What dates or events did you use?”
- Judgment: “How did you estimate or decide?”
- Response mapping: “Why did this option fit better than the options next to it?”
- Terms: “Which word or phrase was unclear, loaded, or did not fit your situation?”
- Applicability: “Could someone reasonably need a not-applicable or don’t-know response here?”
- Evidence: “What record, if any, could support this answer?”
- Consequence: “Did any answer feel like the ‘good’ answer or carry a risk if disclosed?”

## Targeted probes

- Percentage items: denominator, data source, boundary interpretation, ability to calculate.
- Rights/legal items: jurisdiction, contractual role, applicability, distinction between experience and legal knowledge.
- Income items: gross/net interpretation, currency, business/personal separation, irregularity, discomfort.
- Psychology/context fields: autonomy, safety, self-efficacy, scarcity, identity, care, disability, and structural opportunity without treating these as deficits or causes.
- Hypothetical items: scenario realism, assumptions, confidence, and whether respondents substitute a different event.
- Multi-select items: access inequality, overlapping categories, and whether absence means no opportunity or no achievement.

## Coding

Create one row per participant × item. Use:

| Field | Allowed values |
|---|---|
| comprehension | intended / partial / unintended |
| retrieval | direct record / bounded recall / estimate / guess / unavailable |
| judgment | construct-aligned / mixed / other construct |
| response mapping | clear / adjacent ambiguity / no fitting option |
| applicability | applicable / needs N/A / unclear |
| sensitivity | none / manageable / high |
| accessibility | no barrier / friction / barrier |
| severity | 0 none / 1 minor / 2 material / 3 critical |
| action | retain / wording / anchor / split / context field / defer / remove |

Preserve short de-identified evidence excerpts. Do not store names, employers, contact details, or unnecessary sensitive disclosures in the coding dataset.

## Decision rules

- Critical: wrong construct, unsafe disclosure, no valid option for a material subgroup, or legal/financial interpretation presented as fact. Do not pilot until resolved.
- Material: at least two participants in a round show the same comprehension, retrieval, or mapping failure, or one high-risk subgroup shows systematic mismatch. Revise and retest.
- Minor: localized wording friction without changed response meaning. Revise when clarity improves without construct drift.
- Saturated for interview purposes: no new material failure in the final three interviews for an item and all intended subgroups have been observed. Saturation does not establish validity.

## Round deliverables and activation boundary

After each round, publish a dated issue log, item-level evidence summary, rationale for every change, and a new candidate suffix. After the final round, freeze the pilot form and pre-register analyses. Activation requires pilot evidence, fairness review, methodology approval, an old-to-new score crosswalk (or a declaration that scores are not comparable), and a versioned release. Never silently rewrite historical responses.
