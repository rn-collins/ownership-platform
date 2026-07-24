# Database migrations — the workflow

This project uses **Prisma Migrate**, not `prisma db push`. Every schema change is a
versioned, reviewable, reversible SQL file committed to `prisma/migrations/`. This is
what protects the research dataset the Cannes report is built on: `db push` diffs the
schema against the live DB and **can silently drop columns and data with no history**.
Migrations never do that.

## One-time baseline (do this before the first real respondent)

Set a **direct** connection (port 5432, not the pooler) in a local `.env`:

```
DATABASE_URL="<Supabase DIRECT connection string, port 5432>"
```

Then:

```bash
npm install
npm run db:migrate -- --name init         # creates prisma/migrations/ and applies it
git add prisma/migrations && git commit -m "chore: baseline migration"
git push origin main
```

Commit the `prisma/migrations/` folder. Vercel's build runs `prisma migrate deploy`,
which replays committed migrations **forward-only** — it never drops unexpectedly.

## Every change after that

1. Edit `prisma/schema.prisma`.
2. `npm run db:migrate -- --name <what_changed>` (e.g. `add_unsubscribe`). Prisma writes the SQL, applies it locally, and regenerates the client.
3. Review the generated SQL in `prisma/migrations/<timestamp>_<name>/migration.sql`.
4. Commit the migration folder + schema, then `git push origin main`. Vercel applies it on deploy.

## Rules
- **Never** run `db push` against production. (The `db:push` script has been removed.)
- **Expand-then-contract** for breaking changes: add a nullable column → backfill → switch reads/writes → drop the old column in a *later* migration. Never rename-in-place.
- Treat `MethodologyVersion` as append-only (a new versioned row, never an edit) so historical `ScoreEvent`s stay reproducible.
- Check state anytime with `npm run db:migrate:status`.

## Scripts (package.json)
- `db:migrate` → `prisma migrate dev` (local: create + apply + regenerate)
- `db:migrate:deploy` → `prisma migrate deploy` (CI/Vercel: apply committed migrations)
- `db:migrate:status` → `prisma migrate status`
- `db:generate` → `prisma generate`
