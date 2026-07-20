# Build verification checklist

Because this repo was authored in an environment without `npm install` (no network) and without a browser, this documents what was verified statically and the exact commands to confirm a green build locally. The pure logic layer is proven; the framework build needs one local run.

## What is already proven

- **Scoring engine:** `app/`-parity engine ported to `src/lib/engine.ts`. 13/13 unit tests pass (`node app/engine.test.mjs` in the sibling prototype). The TS version was executed via Node type-stripping and returns correct values (perfect = 100 "Owned institution", geometric penalty, confidence, flags).
- **Instrument + research battery:** `src/lib/instrument.ts` (20 scored items) and `src/lib/research.ts` (9 modules, 53 items) both import and run cleanly together with the engine (verified via Node type-stripping: mid-profile total = 60, research items = 53).
- **Cross-module import graph** (engine ↔ instrument ↔ research) resolves with no runtime errors.

## What needs a local run to confirm

The React/Next layer (`.tsx`) can only be type-checked and built by `next build`, which needs dependencies installed. Do this once:

```bash
cd ownership-platform
npm install
npm run test      # engine unit tests (vitest) — should be green
npm run build     # Next production build — the real gate
npm run dev       # http://localhost:3000 to click through the assessment
```

## Static review notes (why it should build clean)

- **No ESLint gate.** ESLint is not configured, so `next build` will not fail on lint (it prints a note and skips). The one `exhaustive-deps` case is annotated regardless.
- **Path alias `@/*`** is set in `tsconfig.json` and used consistently.
- **`"use client"`** is on the only interactive component (`Assessment.tsx`); pages that export `metadata` are server components; `Radar.tsx` is a pure presentational component safe to bundle client-side.
- **No SSR-unsafe access:** `localStorage` is only touched inside event/effect code (never during render/SSR); `crypto.randomUUID` is guarded with a `typeof` check and its value is not rendered, so no hydration mismatch.
- **Types:** `strict` is on; `noUncheckedIndexedAccess` is intentionally off, so option-array indexing (`it.options[cur]`) types as `string`. Response maps use `Record<string, number>`; the API casts through `zod`-validated input.
- **Prisma:** `@prisma/client` is a dependency but is not imported anywhere in `src`, so it does not affect `next build`. The schema is for v1.5+ persistence; run `npm run db:generate` only when wiring the DB.
- **No Tailwind/PostCSS:** styling is plain CSS in `globals.css`, removing a class of build config failures.

## If `npm run build` surfaces anything

It will be minor (a stray type, an import path). Paste the error and it is a quick fix. The logic and data layers are the risky part, and those are already proven.
