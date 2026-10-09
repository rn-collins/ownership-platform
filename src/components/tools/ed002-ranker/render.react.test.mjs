// Needs React (the repo's own react and react-dom). Server-renders the ranker with the React wrappers and checks the reading path.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { HAVE_REACT, reactKit } from '../_test/render.mjs';
import { pageChecks } from '../_test/pilot-checks.mjs';
import { filterApproved } from '../_kit/core/approved.mjs';
import { selectRelated } from '../_kit/core/related.mjs';
import { select, parse, text } from '../_test/html-lite.mjs';

const dir = new URL('.', import.meta.url);
const spec = JSON.parse(fs.readFileSync(new URL('spec.json', dir), 'utf8'));
const lib = new URL('../../../lib/tools/', import.meta.url);
const fam = JSON.parse(fs.readFileSync(new URL('family-index.json', lib), 'utf8'));
const rels = JSON.parse(fs.readFileSync(new URL('relations.json', lib), 'utf8')).relations;
const opts = { skip: !HAVE_REACT && 'React is not installed' };

async function render() {
  const { React, server } = await reactKit();
  const Tool = (await import('./Tool.mjs')).default;
  const s = filterApproved(spec);
  const related = selectRelated({ relations: rels, familyIndex: fam, toolId: spec.id }).items;
  return { html: server.renderToStaticMarkup(React.createElement(Tool, { spec: s, related, crumbs: [{ label: 'Institutions of One', href: '/' }, { label: 'Tools', href: '/tools' }] })), related };
}
test('server render: reading path, contract, voice, no dead controls', opts, async () => {
  const { html } = await render();
  // The server-rendered page is a fragment of the page body, so test the markup inside the shell.
  const rp = pageChecks({ spec, html, voiceExceptions: spec.voiceExceptions || [] });
  assert.ok(rp.visible.includes(spec.data.templates.empty));
});
test('no scripting: a blank sheet to print is present and the list builder is under js-only', opts, async () => {
  const { html } = await render();
  const root = parse(html);
  const blank = select(root, 'section.no-js-only');
  assert.equal(blank.length, 1);
  assert.equal(select(blank[0], 'tbody tr').length, 5);
  assert.ok(select(root, 'section.js-only button').length >= 2);
});
test('related rail holds the two approved relations: the Four questions map (LK-18) and the Observatory dependency explorer (LK-20)', opts, async () => {
  const { html, related } = await render();
  assert.deepEqual(related.map(r => r.id), ['m1-four-questions-map', 'obs-dependency-explorer']);
  assert.match(html, /The Observatory dependency explorer/); assert.match(html, /Where does your work become structurally yours\?/);
});
test('the edition source lists the approved question and says the edition text does not contain it; the old "edition suggests" sentence is not on the page', opts, async () => {
  const { html } = await render();
  const root = parse(html);
  const used = select(root, 'ul.tk-used li').map(li => text(li));
  assert.ok(used.includes('What event would make all four answers false at once?'), 'listed under "Used for"');
  assert.match(text(root), /The edition text does not contain it/);
  assert.ok(!/edition suggests/i.test(html));
});
test('a worked example never renders, even if one is passed in as approved', opts, async () => {
  const { React, server } = await reactKit();
  const Tool = (await import('./Tool.mjs')).default;
  const sneaky = structuredClone(spec);
  sneaky.data.workedExample = { text: 'A worked example filled in for one of the edition’s cases.', status: 'approved' };
  const html = server.renderToStaticMarkup(React.createElement(Tool, { spec: filterApproved(sneaky), related: [], crumbs: [] }));
  assert.ok(!/worked example/i.test(html));
  assert.ok(!/filled in for one of the edition/i.test(html));
  const plain = (await render()).html;
  assert.ok(!/worked example/i.test(plain));
});
test('a held closing question is dropped from the sources list when the claim is held', opts, async () => {
  const { React, server } = await reactKit();
  const Tool = (await import('./Tool.mjs')).default;
  const held = structuredClone(spec);
  held.claims.find(c => c.id === 'extra').status = 'needs-rn'; held.data.templates.closingExtra.status = 'needs-rn';
  const root = parse(server.renderToStaticMarkup(React.createElement(Tool, { spec: filterApproved(held), related: [], crumbs: [] })));
  assert.ok(!select(root, 'ul.tk-used li').some(li => /false at once/.test(text(li))));
});
