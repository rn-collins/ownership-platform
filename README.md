# The Ownership Platform

The creator ownership scoring platform for **The Portfolio Creator** research programme.
Build the graph, not the quiz: the Ownership Index score is a reproducible projection of an
evidenced ownership graph through a versioned methodology.

## What is here (v1)

- `src/lib/engine.ts` — the pure, typed, unit-tested scoring engine. Single source of truth for the math.
- `src/lib/instrument.ts` — the 20-item instrument (methodology data).
- `src/components/Assessment.tsx` + `Radar.tsx` — the interactive self-assessment.
- `src/app/` — landing, `/assess`, `/methodology`, and `POST /api/assess` (stateless scoring).
- `prisma/schema.prisma` — the Ownership Graph: facts (evidence-tiered, sourced), consent ledger,
  immutable score events, orgs/rosters. Not wired into v1 UI; it is the foundation for v1.5+.
- `CLAUDE.md` — deploy rule and architecture invariants.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # engine unit tests (the merge gate)
npm run build      # production build
```

## Deploy (only this way)

```bash
git add .
git commit -m "..."
git push origin main
```

Vercel’s GitHub integration auto-deploys to production in 60–90s. **Never** use the Vercel CLI
(`vercel`, `vercel --prod`) — the free tier has a 100-deploy/day limit. First deploy: create the
GitHub repo, push, then in the Vercel dashboard import the repo (framework auto-detected as Next.js)
and deploy. Set env vars in the dashboard.

## Backend (Supabase + Upstash + Resend)

All optional for local dev — with no keys, the app still runs and builds; benchmark writes are
skipped and rate-limiting is a no-op. Copy `.env.example` → `.env.local` and fill in.

- **Supabase** — Postgres via Prisma (`DATABASE_URL`, pooled/transaction URL for serverless), plus
  Auth/Storage keys for later. Once `DATABASE_URL` is set:
  ```bash
  npm run db:generate
  npm run db:migrate -- --name init   # baseline migration → creates the Ownership Graph tables (see MIGRATIONS.md)
  ```
- **Upstash Redis** — rate-limits the public API (`/api/assess`, `/api/benchmark`).
- **Resend** — transactional email + the owned newsletter (OWNED). Verify `rncollins.com` in Resend.

`POST /api/benchmark` writes an **anonymous** assessment record (banded answers + research modules,
no identity; the IP is used only as an ephemeral rate-limit key and is never stored).

## Security

`next@14.2.5` has an advisory. Bump to the latest patched 14.x before shipping:

```bash
npm i next@14 && npm run build
```

## Roadmap

See the programme docs: `BLUEPRINT.md`, `TECHNICAL_SPEC.md`, `EXPANSION_SPEC.md`, `ARCHITECTURE.md`.
Next: accounts + event log (v1.5), verification subsystem + agency portfolio (v2), connectors +
standing Index + API (v3), durability model (v4).
