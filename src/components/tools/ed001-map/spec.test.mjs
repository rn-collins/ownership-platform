// node --test src/components/tools/ed001-map/spec.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as core from './core.mjs';
import { validateTool, imageErrors, referencedImageIds } from './check-local.mjs';
import { collectNeedsRn, filterApproved } from '../_kit/core/approved.mjs';

const dir = new URL('.', import.meta.url);
const spec = JSON.parse(fs.readFileSync(new URL('spec.json', dir), 'utf8'));
const edition = fs.readFileSync(new URL('edition-001.fixture.txt', dir), 'utf8');
const norm = s => s.replace(/\s+/g, ' ');

test('spec validates, with the quote lock run against the Edition 001 page source and the derivation run on the core', () => {
  const r = validateTool(spec, dir, { storyText: edition, derivations: core.derivations });
  assert.deepEqual(r.errors, []); assert.deepEqual(r.warnings, []);
});
test('the four questions in the data are the edition’s words, word for word, and the data matches the claims', () => {
  assert.equal(spec.data.columns.length, 4);
  assert.deepEqual(spec.data.columns.map(c => c.name), ['Build', 'Carry', 'Control', 'Continue']);
  for (const c of spec.data.columns) {
    assert.equal(spec.claims.find(x => x.id === c.claimId).text, c.question);
    assert.equal(spec.claims.find(x => x.id === c.bodyClaimId).text, c.body);
    assert.ok(norm(edition).includes(`name: "${c.name}"`), c.name);
    assert.ok(norm(edition).includes(`question: "${c.question}"`), c.question);
  }
});
test('the four changes are the four in the edition’s closing question, in its order', () => {
  const close = spec.claims.find(x => x.id === spec.data.changesClaimId).text;
  assert.equal(close, 'If the role disappeared, the platform changed its rules, the distributor walked away, or the employer kept the system, what work, systems, relationships, or authority could continue?');
  const past = { 'the role disappears': 'the role disappeared', 'the platform changes its rules': 'the platform changed its rules', 'the distributor walks away': 'the distributor walked away', 'the employer keeps the system': 'the employer kept the system' };
  let last = -1;
  for (const ch of spec.data.changes) {
    const at = close.indexOf(past[ch.ifPhrase]);
    assert.ok(at > last, `${ch.label} is out of order or missing`); last = at;
    assert.equal(ch.label, ch.ifPhrase[0].toUpperCase() + ch.ifPhrase.slice(1));
  }
});
test('every photograph exists at the size the spec says and carries creator, licence and a Commons source page; all 14 slots are used', () => {
  assert.deepEqual(imageErrors(spec, dir, new URL('../../../../public/tools/four-questions-map/images/', dir)), []);
  assert.equal(spec.data.images.length, 14);
  const ids = new Set(spec.data.images.map(i => i.id));
  const used = referencedImageIds(spec.data);
  for (const id of used) assert.ok(ids.has(id), `data refers to missing image ${id}`);
  for (const id of ids) assert.ok(used.has(id), `image ${id} is not shown anywhere`);
  assert.ok(spec.data.images.every(i => ['CC0', 'CC BY 2.0', 'CC BY 4.0', 'CC BY-SA 4.0', 'Public domain'].includes(i.licence)), 'only free licences');
  assert.ok(spec.data.images.every(i => i.precision === 'illustrative'), 'the edition’s verbs and changes are ideas, so every photograph is a stand-in and says so');
});
test('the eleven case sources are held: needs-lookup, needs-rn, listed by collectNeedsRn, and gone after filterApproved', () => {
  const held = spec.sources.filter(s => s.check === 'needs-lookup');
  assert.equal(held.length, 11);
  assert.ok(held.every(s => s.status === 'needs-rn' && s.why));
  const items = collectNeedsRn(spec);
  assert.ok(items.length >= 22);
  const ok = filterApproved(spec);
  assert.equal(ok.sources.length, 1); assert.deepEqual(ok.data.cases, []);
});
test('the edition source says what it does not show, and no credential, cultural-review, rights-cleared or client-line text is present', () => {
  const ed = spec.sources.find(s => s.id === 's-edition');
  assert.match(ed.doesNotSupport, /private contract/);
  const all = JSON.stringify(spec);
  for (const w of ['Northeastern', 'J.D.', 'anatomist', 'lawyer', 'cultural review', 'rights cleared']) assert.ok(!all.includes(w), w);
  assert.ok(!/(work with RN|hire (me|RN)|available for (client|hire)|book RN)/i.test(all), 'no client line');
});
test('worksheet rules: nothing typed is shared, saved or sent', () => {
  assert.equal(spec.share.link, 'never'); assert.equal(spec.share.image, false);
  assert.equal(spec.promise.privacy, 'Nothing you enter leaves your browser.');
  assert.deepEqual(spec.share.files, ['txt']);
});
