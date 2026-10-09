// node --test src/components/tools/framework-strip/core.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { stripText, derivations } from './core.mjs';
const spec = JSON.parse(fs.readFileSync(new URL('spec.json', import.meta.url), 'utf8'));
test('the strip text is four cells of name, question and link, then the map link, then the Edition 008 line and its link', () => {
  const t = stripText(spec);
  assert.equal(t.length, 4 * 3 + 1 + 2);
  assert.equal(t[0], 'Build'); assert.equal(t[1], 'What exists because this person made it exist?'); assert.equal(t[2], 'Read about Build in Edition 001');
  assert.equal(t[12], 'Make your own map');
});
test('link labels name their cell, so four links with the same address still have four different names', () => {
  const labels = spec.data.cells.map(c => c.linkLabel);
  assert.equal(new Set(labels).size, 4);
});
test('no arithmetic claims, so no derivations are needed', () => { assert.deepEqual(derivations, {}); assert.ok(spec.claims.every(c => c.basis !== 'arithmetic')); });
test('house voice in the strip text: no dash, no exclamation mark, American spelling', () => {
  const all = stripText(spec).join(' ');
  assert.ok(!/[—!]/.test(all)); assert.ok(!/\b(colour|centre|programme|organisation)\b/i.test(all));
});
