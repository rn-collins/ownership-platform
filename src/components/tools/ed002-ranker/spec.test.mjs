import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateSpec } from '../_kit/check/validate.mjs';
import * as core from './core.mjs';

const dir = new URL('.', import.meta.url);
const spec = JSON.parse(fs.readFileSync(new URL('spec.json', dir), 'utf8'));
const edition = fs.readFileSync(new URL('edition-002.fixture.txt', dir), 'utf8');

test('spec validates, with the quote lock run against the Edition 002 page text', () => {
  const r = validateSpec(spec, { storyText: edition, derivations: core.derivations });
  assert.deepEqual(r.errors, []); assert.deepEqual(r.warnings, []);
});
test('the four layers and four tests in the data are the claims, word for word', () => {
  for (const x of [...spec.data.layers, ...spec.data.tests]) assert.equal(spec.claims.find(c => c.id === x.claimId).text, x.question);
  assert.equal(spec.data.layers.length, 4); assert.equal(spec.data.tests.length, 4);
});
test('nothing is held for RN: the old-lab question was approved on October 8, 2026 and the worked example was dropped', () => {
  const r = validateSpec(spec, { storyText: edition, derivations: core.derivations });
  assert.deepEqual(r.needsRn, []);
  assert.ok(spec.sources.every(s => s.check === 'verified'));
  const extra = spec.claims.find(c => c.id === 'extra');
  assert.equal(extra.text, 'What event would make all four answers false at once?');
  assert.equal(extra.status, 'approved'); assert.equal(extra.why, undefined);
});
test('the closing templates: the edition’s question first, then the approved question, and no sentence saying the edition suggests it', () => {
  const T = spec.data.templates;
  assert.equal(T.closingExtra.text, 'What event would make all four answers false at once?');
  assert.equal(T.closingExtra.claimId, 'extra'); assert.equal(T.closingExtra.status, 'approved');
  assert.equal(spec.claims.find(c => c.id === T.closingExtra.claimId).text, T.closingExtra.text);
  assert.ok(!/suggests/i.test(JSON.stringify(spec)), 'the sentence that says the edition suggests the question is deleted');
  assert.ok(!/The edition suggests asking/.test(JSON.stringify(spec)));
  assert.ok(!/old lab/i.test(JSON.stringify(spec)), 'no held-item notes left behind');
});
test('the edition source says plainly that the extra question is not in the edition text', () => {
  const ed = spec.sources.find(s => s.id === 's-edition');
  assert.match(ed.doesNotSupport, /all four answers false at once/); assert.match(ed.doesNotSupport, /does not contain it/);
  assert.ok(!/all four answers false at once/i.test(edition), 'the Edition 002 text does not carry the question');
});
test('the worked example is dropped: the field is gone from the spec and the schema, and a spec that carries one fails validation', () => {
  assert.equal('workedExample' in spec.data, false);
  assert.ok(!/worked example/i.test(JSON.stringify(spec)));
  const schema = JSON.parse(fs.readFileSync(new URL('../_kit/schema/mechanics/sheet-1.json', import.meta.url), 'utf8'));
  const ranker = schema.anyOf ? schema.anyOf.find(b => b.title === 'ed002-ranker') : schema; // sheet-1.json holds one anyOf branch per tool since kit 0.2.0
  assert.equal('workedExample' in ranker.properties, false);
  const withIt = structuredClone(spec); withIt.data.workedExample = { text: 'A worked example filled in for one of the edition’s cases.', status: 'approved' };
  const r = validateSpec(withIt, { storyText: edition, derivations: core.derivations });
  assert.ok(r.errors.some(e => /workedExample/.test(e)), r.errors.join('\n'));
});
test('the seven case sources were opened on October 7, 2026 and none supports an answer', () => {
  const cases = spec.sources.filter(s => s.id !== 's-edition');
  assert.equal(cases.length, 7);
  for (const s of cases) { assert.equal(s.accessed, 'October 7, 2026'); assert.match(s.doesNotSupport, /Any answer/); }
});
