// node --test pilots/main/src/components/tools/ed002-ranker/core.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { rank, result, rowText, asText, newItem, displayName, unmetTests, derivations, MAX_ITEMS } from './core.mjs';
import { joinList } from '../_kit/core/text.mjs';

const spec = JSON.parse(fs.readFileSync(new URL('spec.json', import.meta.url), 'utf8'));
const D = spec.data, T = D.tests;
const dep = (id, name, layerId, met) => ({ id, name, layerId, met: Object.fromEntries(T.map(t => [t.id, met.includes(t.id)])) });

test('sort: most unticked tests first, ties keep the order entered', () => {
  const items = [dep(1, 'Newsletter host', 'relationship', ['visible', 'substitutable', 'negotiable', 'survivable']), dep(2, 'Video platform', 'discovery', ['visible']), dep(3, 'Payment processor', 'revenue', ['visible']), dep(4, 'Client', 'revenue', ['visible', 'negotiable', 'survivable'])];
  const r = rank(items, T);
  assert.deepEqual(r.map(x => x.item.id), [2, 3, 4, 1]);
  assert.deepEqual(r.map(x => x.count), [3, 3, 1, 0]);
  assert.deepEqual(r.map(x => x.tied), [false, true, false, false]);
  assert.deepEqual(r.map(x => x.rank), [1, 2, 3, 4]);
});
test('the unmet tests are named in the edition’s order', () => {
  const i = dep(1, 'X', '', ['substitutable']);
  assert.deepEqual(unmetTests(i, T).map(t => t.name), ['Visible', 'Negotiable', 'Survivable']);
  assert.equal(rowText(rank([i], T)[0], D), 'X: 3 tests are not met. Visible, Negotiable and Survivable.');
});
test('sentence join reads "a, b and c"', () => { assert.equal(joinList(['Visible', 'Negotiable', 'Survivable']), 'Visible, Negotiable and Survivable'); assert.equal(joinList(['Visible', 'Survivable']), 'Visible and Survivable'); });
test('empty list: a plain explanation, no verdict', () => {
  const r = result([], D);
  assert.equal(r.headline, D.templates.empty); assert.deepEqual(r.lines, []);
});
test('one item and all tests met: the plain template, no invented follow-up', () => {
  const all = dep(1, 'Email list', 'relationship', T.map(t => t.id));
  assert.equal(result([all], D).headline, 'All four tests are met for Email list.');
  assert.equal(rowText(rank([all], T)[0], D), 'Email list: all four tests are met.');
  assert.ok(!/false at once/.test(JSON.stringify(result([all], D))), 'the closing question belongs to the closing, not to the result lines');
});
test('unnamed dependencies are called Dependency N by their entry position; duplicates are allowed', () => {
  const items = [dep(1, '', '', []), dep(2, '  ', '', ['visible']), dep(3, 'Same', '', []), dep(4, 'Same', '', [])];
  assert.deepEqual(items.map((it, i) => displayName(it, i + 1)), ['Dependency 1', 'Dependency 2', 'Same', 'Same']);
  assert.equal(rank(items, T).length, 4);
});
test('result lines are numbered, carry the layer, say "Tied" and carry the input tag', () => {
  const items = [dep(1, 'A', 'discovery', []), dep(2, 'B', '', [])];
  const r = result(items, D);
  assert.equal(r.headline, 'Start with A.');
  assert.match(r.lines[0].text, /^1\. A: 4 tests are not met\. Visible, Substitutable, Negotiable and Survivable\. Layer: Discovery\.$/);
  assert.match(r.lines[1].text, /Tied with the one above\.$/);
  assert.ok(r.lines.every(l => l.basis === 'input'));
});
test('no verdict words anywhere in the result or the exports', () => {
  const items = [dep(1, 'A', 'revenue', []), dep(2, 'B', 'revenue', T.map(t => t.id))];
  const all = JSON.stringify(result(items, D)) + asText(items, D, 'closing');
  for (const w of ['risky', 'safe', 'dangerous', 'good', 'bad', 'score', 'grade', 'resilient', 'fragile', 'exposed']) assert.ok(!new RegExp(`\\b${w}\\b`, 'i').test(all), w);
  assert.ok(!/[—!]/.test(all));
});
test('text export holds the list, the closing question and the credit, and never a URL', () => {
  const t = asText([dep(1, 'A', 'revenue', ['visible'])], D, D.templates.closing.text);
  assert.match(t, /Start with A\./); assert.match(t, /If your most important supplier disappeared tomorrow/); assert.match(t, /by RN Collins/); assert.ok(!/https?:/.test(t));
});
test('the sort rule in the spec is the arithmetic the code does', () => {
  assert.equal(derivations.failCount({ met: { a: true, b: false, c: false, d: true } }), 2);
  assert.equal(MAX_ITEMS, spec.data.maxItems);
  assert.equal(newItem(9, T).name, ''); assert.ok(Object.values(newItem(9, T).met).every(v => v === false));
});
test('the closing text for the exports is the edition’s question, then the approved question, and nothing else is added', () => {
  const closing = [D.templates.closing.text, D.templates.closingExtra.text].join(' ');
  const out = asText([dep(1, 'A', 'revenue', ['visible'])], D, closing);
  assert.ok(out.includes('If your most important supplier disappeared tomorrow, which part of your work would stop first? What event would make all four answers false at once?'));
  assert.ok(!/edition suggests/i.test(out));
});
