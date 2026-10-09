// node --test src/components/tools/framework-strip/spec.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateTool, imageErrors, referencedImageIds } from './check-local.mjs';
import { filterApproved } from '../_kit/core/approved.mjs';

const dir = new URL('.', import.meta.url);
const spec = JSON.parse(fs.readFileSync(new URL('spec.json', dir), 'utf8'));
const edition = fs.readFileSync(new URL('edition-001.fixture.txt', dir), 'utf8');
const ed8 = fs.readFileSync(new URL('edition-008.reference.txt', dir), 'utf8');
const wording = JSON.parse(fs.readFileSync(new URL('../../../lib/tools/wording-decisions.json', dir), 'utf8')).items;
const norm = s => s.replace(/\s+/g, ' ');

test('spec validates, with the quote lock run against the Edition 001 page source', () => {
  const r = validateTool(spec, dir, { storyText: edition });
  assert.deepEqual(r.errors, []); assert.deepEqual(r.warnings, []);
});
test('the four cells carry the edition’s four questions word for word, in the edition’s order', () => {
  assert.deepEqual(spec.data.cells.map(c => c.name), ['Build', 'Carry', 'Control', 'Continue']);
  let last = -1;
  for (const c of spec.data.cells) {
    assert.equal(spec.claims.find(x => x.id === c.claimId).text, c.question);
    const at = norm(edition).indexOf(`question: "${c.question}"`);
    assert.ok(at > last, c.name); last = at;
  }
});
test('every cell link points at an anchor that exists on Edition 001 (the working model heading)', () => {
  for (const c of spec.data.cells) { assert.equal(c.href, '/edit/001#thresholds-heading'); }
  assert.ok(edition.includes('id="thresholds-heading"'));
  assert.ok(edition.includes('id="sources-heading"'));
});
test('the Edition 008 line is RN’s approved sentence LK-19, word for word, and Edition 008 does say it uses four verbs', () => {
  const lk = wording.find(w => w.id === 'LK-19');
  assert.equal(lk.status, 'approved');
  assert.equal(spec.claims.find(c => c.id === 'e008').text, lk.text);
  assert.equal(spec.data.edition008.wordingId, 'LK-19');
  assert.ok(norm(ed8).includes(spec.sources.find(s => s.id === 's-edition-008').quote));
  assert.ok(norm(ed8).includes('Build, Carry, Control, Continue'));
});
test('the Four questions map link is the tool’s own address, and the Edition 008 link goes to the edition until the Institution Map exists', () => {
  assert.equal(spec.data.map.href, '/tools/four-questions-map');
  assert.equal(spec.data.edition008.href, '/edit/008');
  assert.ok(!/institution-map/.test(JSON.stringify(spec.data.edition008.href)));
});
test('four photographs, one per cell, each with creator, licence and a Commons page, and the files are the size the spec says', () => {
  assert.deepEqual(imageErrors(spec, dir, new URL('../../../../public/images/framework-strip/', dir)), []);
  const ids = new Set(spec.data.images.map(i => i.id)); const used = referencedImageIds(spec.data);
  assert.equal(ids.size, 4); for (const id of ids) assert.ok(used.has(id));
  assert.ok(spec.data.images.every(i => i.precision === 'illustrative'));
  assert.ok(spec.data.images.every(i => ['CC0', 'CC BY-SA 4.0', 'Public domain'].includes(i.licence)));
});
test('it is a page section: nothing to enter, nothing to share, no client line, no cultural-review text', () => {
  assert.equal(spec.promise.privacy, 'Nothing to enter.'); assert.equal(spec.share.link, 'never');
  assert.ok(!/(work with RN|hire (me|RN)|available for (client|hire)|book RN|cultural review|rights cleared)/i.test(JSON.stringify(spec)));
  assert.equal(filterApproved(spec).data.cells.length, 4);
});
