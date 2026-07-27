# Institutions of One

Institutions of One is an independent research programme studying how people turn individual
capability into durable, portable, ownable institutional power.

This repository is the programme's working research platform. It contains measurement
instruments, validation operations, an evidence-governed Observatory, longitudinal research
infrastructure, public research surfaces, and participation and partnership workflows.

The project is broader than a creator quiz. The Ownership Index is one instrument within the
programme, and the Portfolio Professional instrument is a related but distinct line of inquiry.
Neither candidate instrument should be described as validated, normed, or activated until its
recorded research gates are met.

## Public functions

The platform is being organized around five public jobs:

1. **Understand the phenomenon** — explain the Institutions of One theory, constructs, limits,
   and research questions.
2. **Measure yourself** — provide clearly labeled candidate instruments and useful results
   without overstating validation.
3. **Explore the evidence** — publish reviewed Observatory cases, sources, relationships, and
   longitudinal events.
4. **Follow the research** — release methods, findings, corrections, briefs, and articles.
5. **Participate or partner** — support research participation, nominations, institutional
   partnerships, and responsible commercial inquiries without compromising research independence.

## Core research constructs

The programme must keep these related concepts analytically distinct:

- **Capability** — what a person can reliably do.
- **Portability** — whether that capability and its evidence travel across employers, platforms,
  clients, and jurisdictions.
- **Ownership** — which audiences, rights, assets, data, relationships, and revenue channels the
  person or their entity controls.
- **Institutionalization** — the extent to which capability has been converted into repeatable
  systems, roles, records, governance, and continuity beyond a single act of labor.
- **Authority** — recognized permission or legitimacy to decide, convene, publish, transact, or
  set standards.
- **Durability** — whether the system survives shocks, absence, platform change, or personnel
  turnover.
- **Optionality** — the number and quality of viable paths available without dependence on a
  single gatekeeper.
- **Distribution** — the ability to reach people and move work, ideas, products, or opportunities.
- **Capture** — who retains the economic, reputational, informational, and strategic value created.
- **Leverage and economic power** — the capacity to produce effects disproportionate to direct
  labor and to negotiate from control rather than dependence.

These definitions are the current theoretical baseline. Instrument mappings and empirical
relationships remain research questions until supported by the validation programme.

## What is implemented

- A pure, typed Ownership Index scoring engine and versioned item bank.
- Interactive assessment and stateless assessment API.
- Evidence tiers, immutable score-event architecture, and versioned methodology records.
- Candidate-instrument validation operations, including participant records, cognitive interview
  sessions, response-process coding, revision records, gate decisions, pilot protocols, and
  activation decisions.
- An Observatory evidence model separating cases, claims, sources, relationships, events,
  construct observations, audit history, and reviewer packages.
- Consent, privacy, nomination, research-subscription, and partner-inquiry infrastructure.
- Longitudinal and publication-oriented data foundations.
- Automated tests and production migrations in the deployment build.

## Current status

The infrastructure is substantial, but the research programme is not yet complete.

- Published scoring remains provisional and must not be represented as validated or normed.
- Candidate-instrument validation and activation gates remain controlling.
- Observatory dossiers remain draft unless their review and publication states say otherwise.
- Cross-case findings require a deliberately sampled, sufficiently reviewed cohort.
- The public theory, methodology, findings, and participation journey still require final
  integration and end-to-end launch verification.
- The MrBeast evidence thread is frozen. No additional subject-level research should displace
  whole-program completion work.

## Current completion sequence

Future work should follow this dependency order:

1. Lock and publish the theoretical architecture and construct boundaries.
2. Reconcile the Ownership Index and Portfolio Professional instrument purposes, mappings,
   overlap, evidence requirements, version states, and validation gates.
3. Align the public information architecture to the five public functions above.
4. Establish and complete a bounded, representative first Observatory cohort.
5. Produce the first defensible cross-case findings and research publications.
6. Verify the complete production journey, including consent, privacy, accessibility, mobile
   behavior, database operations, corrections, analytics, and deployment state.

This sequence—not the nearest unfinished case dossier—governs future “proceed” instructions.

## Local development

```bash
npm install
npm run dev
npm test
npm run build
```

The production build runs database migrations, tests, and the Next.js build.

## Deployment

Production deploys only through commits pushed to `main` and the repository's Vercel
integration. Do not deploy with the Vercel CLI.

## Optional services

- **Postgres / Prisma** — research records, evidence, consent, reviews, and immutable events.
- **Upstash Redis** — public API rate limiting.
- **Resend** — transactional and research communications.

See `.env.example`, `MIGRATIONS.md`, and the source-level architecture rules for configuration
and operational constraints.
