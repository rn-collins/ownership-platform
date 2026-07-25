# Storage recovery, baseline, and recoverable-row migration proposal

Status: proposal only; no SQL in this document is authorization to write.

## Confirmed Vercel state

The production project currently has no project environment variables, no attached integrations, and no connected Vercel storage resource. The application therefore cannot open its intended PostgreSQL connection. This state does not establish whether the former Supabase project or its records still exist.

## Recovery gates

1. Identify the Supabase organization and exact existing project by dashboard metadata.
2. Record project reference, region, status, and database host name without recording passwords, tokens, or connection-string values.
3. Compare the live `public` schema with `prisma/schema.prisma` using read-only catalog queries.
4. Determine whether tables are absent, exactly compatible, compatible with drift, or conflicting.
5. Only after a compatible schema is established, connect Vercel using Supabase’s supported pooled production URL and least-privilege application role. Set variable names/scopes without logging values.
6. Redeploy, confirm `/api/research-integrity` can connect, and run only the aggregate diagnostic.
7. Create a baseline migration from the observed schema; do not run `migrate dev`, `db push`, `CREATE TABLE`, or destructive reconciliation against production.

## Read-only schema verification

Expected public tables are: `MethodologyVersion`, `Creator`, `OwnedLink`, `Subscriber`, `Post`, `Nomination`, `ResearchSubscriber`, `PartnerInquiry`, `Guest`, `Episode`, `Org`, `RosterEntry`, `Consent`, `Fact`, `Assessment`, and `ScoreEvent`.

Catalog inspection must use `information_schema.tables`, `information_schema.columns`, `pg_catalog.pg_constraint`, and `pg_catalog.pg_indexes` only. Compare table, column, type, nullability, default, primary/foreign/unique constraints, and indexes. Report hashes or structured differences; do not expose row values.

## Aggregate-only diagnostic

For `Assessment`, group by normalized instrument and methodology version; report:

- total row count;
- minimum and maximum `createdAt`;
- count with valid object-shaped `responses`;
- canonical: explicit recognized instrument, expected item keys only, all required scores integer 0–5, recognized version, reproducible total/band;
- recoverable: instrument/version can be deterministically inferred and the normalized response set is complete, but stored classification or derived fields need repair;
- ambiguous: more than one valid interpretation, incomplete responses, shared IDs without enough evidence, or conflicting derived values;
- unusable: malformed/non-object responses, values outside 0–5 that cannot be normalized, or irreconcilable schema corruption.

Also report temporal coverage by calendar month and instrument, but suppress any cell below 5 and do not return row-level data.

## Baseline procedure

If the database already matches the Prisma schema, generate a baseline migration SQL from the repository schema in an isolated environment, compare its normalized schema signature to production, commit it as `prisma/migrations/<timestamp>_baseline/migration.sql`, and only then propose marking that migration applied. `prisma migrate resolve --applied` is a production metadata write and requires separate review immediately before execution.

If production differs, first commit an introspected schema snapshot and a drift report. Do not alter production to force a match. Design forward-only migrations from the actual production state.

## Separate recoverable-row migration

No recoverable row may be changed by the connection or baseline steps. Prepare a migration package containing:

- immutable diagnostic snapshot ID, query version, timestamp, and aggregate counts;
- deterministic eligibility predicate;
- proposed before/after classification fields without personal or response values;
- dry-run counts and invariants;
- transaction-scoped update script with a reviewed rollback table or audit ledger;
- exclusions for ambiguous and unusable rows;
- post-migration reproducibility and count checks.

The migration must update only rows whose intended instrument/version and score can be reproduced without discretionary judgment. Ambiguous rows remain quarantined for methodology review. Historical raw `responses` are preserved; corrections are additive or auditable, never silent rewrites.
