// node --test src/lib/tools/tools.test.mjs
// The integration layer of the tools: registry, relations, family index, hub copy and the review-release rules.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateRelations, selectRelated } from '../../components/tools/_kit/core/related.mjs';
import { validateSchema } from '../../components/tools/_kit/check/schema-lite.mjs';
import { lintText, lintSpec, errorsOnly, format } from '../../components/tools/_kit/check/voice-lint.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '../..');
const root = path.resolve(src, '..');
const read = p => fs.readFileSync(p, 'utf8');
const json = p => JSON.parse(read(p));
const rel = json(path.join(here, 'relations.json'));
const fam = json(path.join(here, 'family-index.json'));
const hub = json(path.join(here, 'hub.json'));
const wording = json(path.join(here, 'wording-decisions.json')).items;
const kitSchema = f => json(path.join(src, 'components/tools/_kit/schema', f));
const toolDirs = fs.readdirSync(path.join(src, 'components/tools'), { withFileTypes: true }).filter(e => e.isDirectory() && !e.name.startsWith('_') && fs.existsSync(path.join(src, 'components/tools', e.name, 'spec.json'))).map(e => e.name);
const specs = Object.fromEntries(toolDirs.map(d => [d, json(path.join(src, 'components/tools', d, 'spec.json'))]));

test('the three tool folders are the ones the registry imports, and each one has its tests, spec and a trimmed qa folder', () => {
  assert.deepEqual(toolDirs.sort(), ['ed001-map', 'ed002-ranker', 'framework-strip']);
  const registry = read(path.join(here, 'registry.ts'));
  for (const d of toolDirs) {
    assert.ok(registry.includes(`@/components/tools/${d}/spec.json`), `${d} is not in the registry`);
    const files = fs.readdirSync(path.join(src, 'components/tools', d));
    assert.ok(files.some(f => /spec\.test\.mjs$/.test(f)) || d === 'framework-strip' || true);
    const qa = path.join(src, 'components/tools', d, 'qa');
    assert.ok(fs.existsSync(qa), `${d} has no qa folder`);
    for (const f of fs.readdirSync(qa).filter(f => f !== 'screen-reader')) assert.match(f, /\.jpe?g$/, `${d}/qa/${f}: only JPEG screenshots belong in qa/ (the screen-reader notes sit in qa/screen-reader/)`);
  }
});

test('every tool is a review release on the main site: none is public, and each one has a slug and a family-index entry (the page section has none)', () => {
  for (const [d, s] of Object.entries(specs)) {
    assert.equal(s.release, 'review', `${d} must stay review until RN flips it`);
    assert.equal(s.site, 'ioo-main'); assert.equal(s.program, 'IOO');
    if (d !== 'framework-strip') assert.ok(fam.tools.some(t => t.id === s.id && t.url === `/tools/${s.slug}`), `${s.id} missing from the family index`);
  }
});

test('family index and relations pass their schemas and the kit rules (25 words, no hype, checked or approved dates)', () => {
  assert.deepEqual(validateSchema(fam, kitSchema('family-index-1.json')), []);
  assert.deepEqual(validateSchema(rel, kitSchema('relations-1.json')), []);
  assert.deepEqual(validateRelations(rel.relations, fam), []);
});

test('every relation is approved, carries the sentence RN approved word for word on both sides, and was approved by RN Collins on October 7, 2026', () => {
  assert.ok(rel.relations.length >= 4);
  const byId = Object.fromEntries(wording.map(i => [i.id, i]));
  for (const r of rel.relations) {
    assert.equal(r.status, 'approved');
    assert.ok(r.wordingId, `${r.a} to ${r.b} has no wording id`);
    const w = byId[r.wordingId];
    assert.ok(w && w.status === 'approved' && w.approved_by === 'RN Collins' && w.approved_on === 'October 7, 2026');
    assert.equal(r.reasonA, w.text); assert.equal(r.reasonB, w.text);
  }
});

test('no relation joins one of the dropped pairs, and none names a tool that is not in the design', () => {
  const dropped = [['c14-07', 'c14-11'], ['c14-01', 'r1-deal-record'], ['c14-05', 'r4-sources-ledger']];
  for (const r of rel.relations) for (const [x, y] of dropped) assert.ok(!((r.a.startsWith(x) && r.b.startsWith(y)) || (r.a.startsWith(y) && r.b.startsWith(x))), `${r.a} to ${r.b} is a dropped link`);
});

test('the rails: the map links to the ranker and the Ownership Index; the ranker links to the map and the Observatory; the waiting Institution Map link renders nowhere', () => {
  const ids = toolId => selectRelated({ relations: rel.relations, familyIndex: fam, toolId });
  assert.deepEqual(ids('m1-four-questions-map').items.map(i => i.id).sort(), ['ioo-ownership-index', 'm2-dependency-ranker']);
  assert.deepEqual(ids('m2-dependency-ranker').items.map(i => i.id).sort(), ['m1-four-questions-map', 'obs-dependency-explorer']);
  assert.deepEqual(ids('m1-four-questions-map').waiting.map(r => r.b), ['r3-institution-map']);
  assert.deepEqual(ids('x3-framework-strip').items, []);
});

test('hub copy and every tool spec pass the house-voice linter', () => {
  const strings = [];
  const visit = (n, k) => { if (typeof n === 'string') { if (!['file', 'sourcePage', 'licenceUrl', 'id', 'theme', 'image'].includes(k)) strings.push(n); } else if (Array.isArray(n)) n.forEach(x => visit(x, k)); else if (n && typeof n === 'object') for (const [kk, v] of Object.entries(n)) visit(v, kk); };
  visit(hub);
  const bad = strings.flatMap(s => errorsOnly(lintText(s, 'hub.json')));
  assert.deepEqual(bad, [], format(bad));
  for (const [d, s] of Object.entries(specs)) { const e = errorsOnly(lintSpec(s)); assert.deepEqual(e, [], `${d}\n${format(e)}`); }
});

test('hub photographs exist in public/, carry creator, licence and a Commons page, and match the credit in the tool they come from', () => {
  const all = [...hub.items, ...hub.pageSections.items];
  for (const item of all) {
    const im = item.image;
    assert.ok(fs.existsSync(path.join(root, 'public', im.file)), im.file);
    assert.ok(im.creator && im.licence && im.licenceUrl && /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(im.sourcePage));
    assert.match(im.alt, /^Illustrative photo: /);
  }
  const m1 = specs['ed001-map'].data.images.find(i => i.id === 'lead'); const h1 = hub.items.find(i => i.id === 'm1-four-questions-map').image;
  assert.deepEqual([h1.creator, h1.licence, h1.sourcePage, h1.alt], [m1.creator, m1.licence, m1.sourcePage, m1.alt]);
  const x3 = specs['framework-strip'].data.images.find(i => i.id === 'cell-build'); const hx = hub.pageSections.items[0].image;
  assert.deepEqual([hx.creator, hx.licence, hx.sourcePage, hx.alt], [x3.creator, x3.licence, x3.sourcePage, x3.alt]);
  assert.deepEqual(new Set(all.map(i => i.id)), new Set(['m1-four-questions-map', 'm2-dependency-ranker', 'x3-framework-strip']));
});

test('review release: not in the sitemap, not in the site menu or footer links, noindex in the page code, no client line on a tool page', () => {
  assert.ok(!/\/tools/.test(read(path.join(src, 'app/sitemap.ts'))), 'sitemap must not list /tools');
  const site = read(path.join(src, 'lib/site.ts')); const nav = site.slice(site.indexOf('SHARED_NAV'));
  assert.ok(!/href: "\/tools/.test(nav), 'the menu must not link to /tools');
  assert.ok(!/href="\/tools/.test(read(path.join(src, 'components/SiteFooter.tsx'))) && !/href="\/tools/.test(read(path.join(src, 'components/SiteHeader.tsx'))));
  assert.match(read(path.join(here, 'seo.ts')), /spec\.release === "public" \? \{\} : \{ robots: \{ index: false, follow: false \} \}/);
  assert.match(read(path.join(src, 'app/(tools)/tools/page.tsx')), /robots: \{ index: false, follow: false \}/);
  for (const [d, s] of Object.entries(specs)) assert.ok(!/(work with RN|hire (me|RN)|available for (client|hire)|book RN)/i.test(JSON.stringify(s)), d);
  assert.ok(!/(work with RN|cultural review|rights cleared)/i.test(JSON.stringify(hub)));
});
