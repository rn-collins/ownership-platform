# Ownership Platform — agent rules

## Deploy (hard rule)
- Deploy ONLY by: `git add . && git commit -m "..." && git push origin main`
- Vercel auto-deploys from GitHub in 60–90s. Production URL is stable.
- NEVER run `vercel`, `vercel --prod`, or `vercel deploy`. The Vercel CLI is banned
  (100 deploy/day free-tier limit). New env vars go in the Vercel dashboard.
- First deploy of a new project: connect the GitHub repo in the Vercel dashboard
  first, then push to `main`.

## Architecture invariants (do not violate)
- The score is a pure function of (facts, methodology version). Keep `src/lib/engine.ts`
  pure — no I/O, no framework. It is the single source of truth for the math.
- Methodology is DATA (weights, aggregation, item bank), versioned. Changing scoring is
  a data release, not a logic hack.
- Scores are immutable, reproducible, version-stamped events.
- Every fact carries provenance and an evidence tier (0.4 self / 0.8 auto / 1.0 audited).
- Sponsor firewall: no sponsor or billing principal may read or influence responses,
  facts, audits, or weights. Enforce in authorization; add a contract test before any
  auth change.

## Content is locked
- Dimensions, items, options, bands and copy come from `src/lib/instrument.ts` and
  `src/lib/engine.ts`. Do not invent numbers or claims. Published scoring is v0.2.0 and
  subject to review.

## Quality gate before any push
- `npm run build` passes, no type errors.
- `npm test` green (engine suite is the merge gate; extend it when scoring changes).
- Every displayed number is rounded. Inputs keyboard-accessible.
