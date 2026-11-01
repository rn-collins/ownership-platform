# Institutions of One

Institutions of One is a research programme studying how people turn individual
capability into durable, portable, ownable institutional power.

**Live:** https://ownership-platform.vercel.app

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

## Release gate

`data/releases.json` is the one record of what is public. Each edition, case record and tool (including the interactive tools) has one entry:
`id` (the same id across RN's repos, such as `ioo/edit-005` or `ioo/case-mrbeast`), `releasedAt` (a date in
Pacific/Honolulu, or empty), `hold`, `postUrls`, `longFormUrl`, `sourcePageUrl`, and `dateSource` (where the date
came from). A piece is public only when `releasedAt` is today or earlier and `hold` is false. Anything else returns
404: its page, its place in every list, the sitemap, its share image and its files, including through the image
optimizer. The `related` list holds the Public Reader visual stories this site links to, with the dates from
rn-selected-work `data/sources-ioo.json`; a link to one appears only from its date.

- The rule lives in `src/lib/release-rule.mjs`. `next.config.mjs` fixes "today" to the build day in Hawaii and inlines
  the list of public ids, so pages, browser code and `src/middleware.ts` agree and nothing about a held piece reaches
  the browser. The `/tools` routes (`page.tools.tsx`) join the build only once a tool is public.
- `npm run build` ends with `scripts/check-releases-built.mjs`, which fails the build if a held piece has a page, a
  sitemap entry, or its title or address in any served page or script, or if a released piece is missing its page,
  sitemap entry or links (posts, source page, long-form, gallery index, previous and next).
- `.github/workflows/daily-release.yml` runs at 00:05 in Hawaii. On a release day it pushes an empty commit to `main`,
  and Vercel rebuilds as for any push. `npm run releases:today` shows what goes live today.
- Review renders (`RELEASE_REVIEW=1` or `CYCLE01_RENDER_FREEZE=1`) show held pieces for checking by eye. They never
  apply to the production deployment.
- To release a piece, set its `releasedAt` and `hold: false`. Never guess a date: a piece without a verifiable date
  stays held with an empty `releasedAt`.
- Pieces include the two interactive tools already on the site (`kind: "interactive"`): the Dependency Explorer
  (`/observatory/dependencies`) and the Ownership Index (`/assess/creator`). Each carries the link set and previous and
  next between the two.
- Every released piece has a sources page on RN Collins, selected work, at
  `https://rn-selected-work.vercel.app/sources/ioo/<id after ioo/>`, and links it (`sourcePageUrl`). The pages come
  from this repo: `scripts/export-selected-work-sources.ts` writes rn-selected-work `data/sources-ioo-site.json` from
  the edition source lists, the case records' sources and the release dates here (how to run it is in the script).
  When you release a piece, run it, commit that file in rn-selected-work, run its `npm run releases:sync`, set the new entry's `galleryUrl` and `postUrls` there, and set
  `sourcePageUrl` here. The build check fails while a released piece has no sources page address.
- Long-form: an edition is its own long-form piece; a case discussed in an edition points at that edition; any other
  case record is its own long-form piece and says so on the page.

## Optional services

- **Postgres / Prisma** — research records, evidence, consent, reviews, and immutable events.
- **Upstash Redis** — public API rate limiting.
- **Resend** — transactional and research communications.

See `.env.example`, `MIGRATIONS.md`, and the source-level architecture rules for configuration
and operational constraints.

## RN Collins release pause (RN, Oct 30, 2026)

No edition, case, tool or visual-story link opens on its own until every RN Collins content package is complete.
`RELEASE_PAUSE` in `src/lib/release-rule.mjs` is on: while it is, only the 52 records live on Nov 1, 2026 (51 pieces
and 1 visual story) can be public, whatever `data/releases.json` says. A push, a manual run of the daily release
workflow or a later build date opens nothing new, and `scripts/release-day.mjs` reports nothing due, so the workflow
pushes no rebuild. `data/releases.json` and its dates are unchanged (4 pieces held, 33 visual stories held).
To undo, set `on: false` in `RELEASE_PAUSE` and push; the normal date-and-hold rule then applies again.
