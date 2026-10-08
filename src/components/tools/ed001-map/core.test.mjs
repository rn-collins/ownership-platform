// node --test src/components/tools/ed001-map/core.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { newState, cleanText, addItem, removeItem, setChange, setMark, markOf, allItems, summarize, staysEverywhere, result, acrossChanges, asText, derivations } from './core.mjs';

const spec = JSON.parse(fs.readFileSync(new URL('spec.json', import.meta.url), 'utf8'));
const D = spec.data;
const build = (entries) => entries.reduce((s, [col, text]) => { const o = addItem(s, col, text, D); assert.ok(o.ok, `${col}: ${text} ${o.reason}`); return o.state; }, newState(D));
const idOf = (s, col, i = 0) => s.cols[col][i].id;

test('fixed sample: three items, one change, marks, and the exact result sentences', () => {
  let s = build([['build', 'Pottery line'], ['carry', 'Teaching method'], ['control', 'Customer list'], ['continue', 'Wholesale contract']]);
  s = setChange(s, 'platform');
  s = setMark(s, idOf(s, 'build'), 'stays'); s = setMark(s, idOf(s, 'carry'), 'stays'); s = setMark(s, idOf(s, 'control'), 'goes');
  const r = result(s, D);
  assert.equal(r.headline, 'Your map if the platform changes its rules.');
  assert.deepEqual(r.lines.map(l => l.text), [
    'These items stay: Pottery line (Build) and Teaching method (Carry).',
    'These go with the container: Customer list (Control).',
    'Look first at: none yet.',
    'Not marked yet: Wholesale contract (Continue).',
    'Stays with me: 2. Goes with the container: 1. Not sure: 0.',
  ]);
  assert.ok(r.lines.every(l => l.basis === 'input'));
});
test('counts equal the marks: stays + goes + not sure + not marked is always the number of items', () => {
  let s = build([['build', 'A'], ['build', 'B'], ['carry', 'C'], ['control', 'D'], ['continue', 'E']]);
  s = setChange(s, 'role');
  const ids = allItems(s, D).map(i => i.id);
  s = setMark(s, ids[0], 'stays'); s = setMark(s, ids[1], 'goes'); s = setMark(s, ids[2], 'unsure'); s = setMark(s, ids[3], 'unsure');
  const { counts, total } = summarize(s, D);
  assert.deepEqual(counts, { stays: 1, goes: 1, unsure: 2, unmarked: 1 });
  assert.equal(counts.stays + counts.goes + counts.unsure + counts.unmarked, total);
  assert.equal(derivations.markCount({ marks: s.marks.role, items: ids, mark: 'unsure' }), 2);
});
test('an empty column is allowed and reported by name, one line per empty column', () => {
  const s = setChange(build([['build', 'A'], ['carry', 'B']]), 'role');
  const lines = result(s, D).lines.map(l => l.text);
  assert.ok(lines.includes('Nothing listed under Control.')); assert.ok(lines.includes('Nothing listed under Continue.'));
  assert.ok(!lines.some(l => /Nothing listed under (Build|Carry)/.test(l)));
});
test('nothing listed at all: the plain empty sentence, no lines, no verdict', () => {
  const r = result(newState(D), D);
  assert.equal(r.headline, D.templates.empty); assert.deepEqual(r.lines, []); assert.equal(r.basis, null);
});
test('items listed but no change picked: a headline and the empty-column lines only, and marking does nothing yet', () => {
  let s = build([['build', 'A']]);
  s = setMark(s, idOf(s, 'build'), 'stays');
  assert.deepEqual(s.marks.role, {});
  const r = result(s, D);
  assert.equal(r.headline, 'Your map so far.'); assert.ok(r.lines.every(l => /^Nothing listed under/.test(l.text)));
});
test('marks belong to one change each: switching change keeps the marks made under the others', () => {
  let s = build([['build', 'A']]); const id = idOf(s, 'build');
  s = setMark(setChange(s, 'role'), id, 'stays');
  s = setMark(setChange(s, 'employer'), id, 'goes');
  assert.equal(markOf(s, id, 'role'), 'stays'); assert.equal(markOf(s, id, 'employer'), 'goes'); assert.equal(markOf(setChange(s, 'platform'), id), '');
  assert.deepEqual(acrossChanges(s, D)[0].cells.map(c => c.text), ['Stays with me', 'Not marked', 'Not marked', 'Goes with the container']);
});
test('an item that stays under all four changes is named; one that does not, is not', () => {
  let s = build([['build', 'A'], ['carry', 'B']]); const [a, b] = allItems(s, D).map(i => i.id);
  for (const ch of D.changes) { s = setMark(setChange(s, ch.id), a, 'stays'); s = setMark(s, b, ch.id === 'employer' ? 'goes' : 'stays'); }
  assert.deepEqual(staysEverywhere(s, D).map(i => i.text), ['A']);
  assert.ok(result(setChange(s, 'role'), D).lines.some(l => l.text === 'These stay under all four changes: A (Build).'));
});
test('limits: five items per column, a blank is refused, text is trimmed, flattened to one line and capped at 60 characters', () => {
  let s = newState(D);
  for (let i = 0; i < 5; i++) s = addItem(s, 'build', `Item ${i}`, D).state;
  const full = addItem(s, 'build', 'Sixth', D);
  assert.equal(full.ok, false); assert.equal(full.reason, 'full'); assert.equal(full.state, s);
  assert.equal(addItem(s, 'carry', '   \n\t ', D).reason, 'empty');
  assert.equal(addItem(s, 'nope', 'x', D).reason, 'unknown-column');
  const long = addItem(newState(D), 'carry', `  a\n\nb   ${'x'.repeat(100)}`, D);
  assert.equal(long.state.cols.carry[0].text.length, 60); assert.ok(long.state.cols.carry[0].text.startsWith('a b xxx'));
  assert.equal(cleanText('Hawaiʻi ʻōlelo'), 'Hawaiʻi ʻōlelo');
});
test('removing an item removes its marks under every change, and the order of the rest is kept', () => {
  let s = build([['build', 'A'], ['build', 'B'], ['build', 'C']]); const [a, b] = allItems(s, D).map(i => i.id);
  for (const ch of D.changes) { s = setMark(setChange(s, ch.id), a, 'stays'); s = setMark(s, b, 'goes'); }
  s = removeItem(s, 'build', a);
  assert.deepEqual(s.cols.build.map(i => i.text), ['B', 'C']);
  for (const ch of D.changes) assert.deepEqual(Object.keys(s.marks[ch.id]), [String(b)]);
});
test('duplicates are allowed and stay separate items', () => {
  const s = build([['build', 'Same'], ['carry', 'Same'], ['carry', 'Same']]);
  assert.equal(allItems(s, D).length, 3); assert.equal(new Set(allItems(s, D).map(i => i.id)).size, 3);
});
test('no verdict words, no exclamation marks and no dashes in any result or export', () => {
  let s = build([['build', 'A'], ['carry', 'B'], ['control', 'C'], ['continue', 'D']]);
  s = setMark(setChange(s, 'distributor'), allItems(s, D)[0].id, 'stays');
  const all = JSON.stringify(result(s, D)) + asText(s, D, 'closing');
  for (const w of ['risky', 'safe', 'dangerous', 'good', 'bad', 'score', 'grade', 'strong', 'weak', 'resilient', 'fragile', 'exposed', 'independent']) assert.ok(!new RegExp(`\\b${w}\\b`, 'i').test(all), w);
  assert.ok(!/[—!]/.test(all));
});
test('text export holds the headline, the lines, the four columns, the closing question and the credit, and never a URL', () => {
  let s = build([['build', 'Pottery line'], ['control', 'Customer list']]);
  s = setMark(setChange(s, 'role'), idOf(s, 'build'), 'stays');
  const t = asText(s, D, 'The closing question.');
  assert.match(t, /^Your map if the role disappears\./); assert.match(t, /Build: Pottery line/); assert.match(t, /Carry: nothing listed/); assert.match(t, /The closing question\./);
  assert.match(t, /by RN Collins/); assert.ok(!/https?:/.test(t));
});
test('HTML in an item stays plain text: nothing is interpreted by the core', () => {
  const s = build([['build', '<img src=x onerror=alert(1)>']]);
  assert.equal(allItems(s, D)[0].text, '<img src=x onerror=alert(1)>');
  assert.match(asText(setChange(s, 'role'), D), /<img src=x onerror=alert\(1\)> \(Build\)/);
});
test('state is never mutated', () => {
  const s0 = newState(D); const frozen = JSON.stringify(s0);
  const s1 = addItem(s0, 'build', 'A', D).state; setChange(s1, 'role');
  assert.equal(JSON.stringify(s0), frozen);
});
