// Run with a checked-out Reader's data/releases.json. Read-only: never moves a date or removes a hold.
// Example: node scripts/check-reader-package-releases.mjs ../institutions-of-one-reader/data/releases.json
import fs from 'node:fs';
import { isReleasedRecord } from '../src/lib/release-rule.mjs';

const readerPath = process.argv[2];
if (!readerPath) throw new Error('Pass the current Reader data/releases.json; no stale or implicit fallback is allowed.');
const reader = JSON.parse(fs.readFileSync(readerPath, 'utf8'));
const own = JSON.parse(fs.readFileSync(new URL('../data/releases.json', import.meta.url), 'utf8'));
const rows = reader.pieces.filter(p => /^ioo\/c01-p\d{2}$/.test(p.id));
const expected = new Map(rows.map(p => [p.id, p]));
const actual = new Map(own.related.map(p => [p.id, p]));
const errors = [];
if (expected.size !== rows.length || actual.size !== own.related.length) errors.push('Duplicate package IDs');
if (expected.size !== actual.size) errors.push('Package inventory differs');
for (const row of rows) {
  const local = actual.get(row.id);
  if (!local || local.releasedAt !== row.releasedAt || local.hold !== row.hold) errors.push(`${row.id}: date/hold differs from Reader`);
  else if (local.url !== `https://institutions-of-one-reader.vercel.app/production/cycle-01/${row.id.slice(-3)}`) errors.push(`${row.id}: wrong destination`);
  // Exercise the actual Ownership release predicate at each boundary.
  else for (const day of ['2026-10-24', '2026-10-26', '2026-11-02', row.releasedAt, '2099-01-01']) {
    const destinationAvailable = row.hold === false && Boolean(row.releasedAt) && row.releasedAt <= day;
    if (isReleasedRecord(local, day) !== destinationAvailable) errors.push(`${row.id}: release predicate differs on ${day}`);
  }
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Reader agreement verified: ${rows.length} package dates, holds, destinations and release boundaries.`);
