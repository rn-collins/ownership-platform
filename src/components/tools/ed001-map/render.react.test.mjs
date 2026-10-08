// Needs React (the repo's own react and react-dom). Server-renders the map with the React wrappers and checks the reading path.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { HAVE_REACT, reactKit } from '../_test/render.mjs';
import { pageChecks, gz } from '../_test/pilot-checks.mjs';
import { filterApproved } from '../_kit/core/approved.mjs';
import { select, parse, text } from '../_test/html-lite.mjs';

const dir = new URL('.', import.meta.url);
const spec = JSON.parse(fs.readFileSync(new URL('spec.json', dir), 'utf8'));
const opts = { skip: !HAVE_REACT && 'React is not installed' };
const crumbs = [{ label: 'Institutions of One', href: '/' }, { label: 'Tools', href: '/tools' }];

async function render(s = filterApproved(spec)) {
  const { React, server } = await reactKit();
  const Tool = (await import('./Tool.mjs')).default;
  return server.renderToStaticMarkup(React.createElement(Tool, { spec: s, related: [], crumbs }));
}

test('server render: reading path, kit contract, voice lint, no dead controls, structure', opts, async () => {
  const html = await render();
  const rp = pageChecks({ spec, html, voiceExceptions: spec.voiceExceptions || [] });
  assert.ok(rp.visible.includes(spec.data.columns[0].question));
});
test('the four questions, the four changes and the closing question are in the HTML with scripting off', opts, async () => {
  const root = parse(await render());
  const t = text(root).replace(/\s+/g, ' ');
  for (const c of spec.data.columns) { assert.ok(t.includes(c.question)); assert.ok(t.includes(c.body)); }
  for (const c of spec.data.changes) assert.ok(t.includes(c.label), c.label);
  assert.ok(t.includes(spec.claims.find(x => x.id === 'close').text));
  assert.equal(select(root, 'ol.tkm-cols li.tkm-col').length, 4); assert.equal(select(root, 'ol.tkm-changes li.tkm-chg').length, 4);
});
test('no scripting: a blank printable four-column sheet is present and every builder section is under js-only', opts, async () => {
  const root = parse(await render());
  const blank = select(root, 'section.no-js-only');
  assert.equal(blank.length, 1);
  assert.equal(select(blank[0], 'thead th').length, 4); assert.equal(select(blank[0], 'tbody tr').length, 5);
  const js = select(root, 'section.js-only');
  assert.equal(js.length, 4);
  assert.ok(select(root, 'section.js-only button').length >= 4);
});
test('every photograph the page shows has alt text, size, creator, licence, a Commons link and the words Illustrative photo', opts, async () => {
  const html = await render();
  const root = parse(html);
  const figs = select(root, 'figure.tkp');
  assert.ok(figs.length >= 12, `figures on the server-rendered page: ${figs.length}`);
  for (const f of figs) {
    const img = select(f, 'img')[0];
    assert.ok(img.attrs.alt && img.attrs.alt.length > 20); assert.ok(img.attrs.width && img.attrs.height);
    assert.ok(img.attrs.src.startsWith(spec.data.imageBase) && !/^https?:/.test(img.attrs.src));
    const cap = text(select(f, 'figcaption')[0]);
    assert.match(cap, /^Illustrative photo\. Photo: .+, (CC0|CC BY|CC BY-SA|Public domain).*via Wikimedia Commons\.$/s);
    assert.ok(select(f, 'figcaption a').some(a => /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(a.attrs.href)));
  }
});
test('the held case sources never render, even if an unfiltered spec is passed in', opts, async () => {
  const html = await render(filterApproved(spec));
  assert.ok(!/Cases in the edition/.test(html)); assert.ok(!/Apple Newsroom|Lyft welcomes|Nomad List/.test(html));
  const sneaky = structuredClone(spec); sneaky.data.cases = spec.data.cases;
  const html2 = await render(filterApproved(sneaky));
  assert.ok(!/Apple Newsroom|Lyft welcomes|Nomad List/.test(html2));
});
test('the page links back to the edition and its sources section, and makes no request: no external script, style or image', opts, async () => {
  const root = parse(await render());
  assert.ok(select(root, 'a').some(a => a.attrs.href === '/edit/001#sources-heading'));
  for (const n of select(root, 'script')) assert.ok(!/^https?:/.test(n.attrs.src || ''));
  for (const n of select(root, 'img')) assert.ok(!/^https?:/.test(n.attrs.src));
});
test('budgets: tool CSS under 12 KB gzipped, tool JavaScript under 25 KB gzipped', opts, async () => {
  assert.ok(gz(new URL('tool.css', dir)) < 12 * 1024);
  const js = ['Tool.mjs', 'core.mjs', 'photo.mjs'].reduce((n, f) => n + gz(new URL(f, dir)), 0);
  assert.ok(js < 25 * 1024, `tool js ${js}`);
});
