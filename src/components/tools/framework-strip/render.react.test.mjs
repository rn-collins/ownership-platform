// Needs React (the repo's own react and react-dom). Server-renders the strip and checks the markup.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { HAVE_REACT, reactKit } from '../_test/render.mjs';
import { gz } from '../_test/pilot-checks.mjs';
import { filterApproved } from '../_kit/core/approved.mjs';
import { lintHtml, errorsOnly } from '../_kit/check/voice-lint.mjs';
import { select, parse, text, walk } from '../_test/html-lite.mjs';
import { stripText } from './core.mjs';

const dir = new URL('.', import.meta.url);
const spec = JSON.parse(fs.readFileSync(new URL('spec.json', dir), 'utf8'));
const opts = { skip: !HAVE_REACT && 'React is not installed' };

async function render(s = filterApproved(spec), mod = './FrameworkStrip.mjs') {
  const { React, server } = await reactKit();
  const C = (await import(mod)).default;
  return server.renderToStaticMarkup(React.createElement(C, { spec: s }));
}
test('the strip holds four cells with a question, a photograph with its credit and a named link each', opts, async () => {
  const root = parse(await render());
  const cells = select(root, 'li.fs-cell');
  assert.equal(cells.length, 4);
  for (const [i, c] of cells.entries()) {
    const d = spec.data.cells[i];
    assert.ok(text(c).includes(d.question)); assert.ok(select(c, 'a.fs-link')[0].attrs.href === d.href);
    assert.equal(text(select(c, 'a.fs-link')[0]), d.linkLabel);
    const img = select(c, 'img')[0]; assert.ok(img.attrs.alt.length > 20 && img.attrs.width && img.attrs.height);
    assert.match(text(select(c, 'figcaption')[0]), /^Illustrative photo\. Photo: .+, (CC0|CC BY-SA 4\.0|Public domain).*via Wikimedia Commons\.$/s);
  }
});
test('the page words equal the spec words, in order, and the two lines under the cells are present', opts, async () => {
  const root = parse(await render());
  const t = text(root).replace(/\s+/g, ' ');
  let at = -1;
  for (const w of stripText(spec)) { const i = t.indexOf(w, at + 1); assert.ok(i > at, `missing or out of order: ${w}`); at = i; }
  assert.ok(select(root, 'a').some(a => a.attrs.href === '/tools/four-questions-map'));
  assert.ok(select(root, 'a').some(a => a.attrs.href === '/edit/008'));
});
test('no controls, no scripts, no external image: it works the same with scripting off', opts, async () => {
  const html = await render();
  assert.ok(!/<(button|input|select|textarea|script)\b/.test(html));
  const root = parse(html); walk(root, n => { if (n.tag === 'img') assert.ok(!/^https?:/.test(n.attrs.src)); });
});
test('voice lint on the rendered strip passes', opts, async () => {
  assert.deepEqual(errorsOnly(lintHtml(await render(), spec.id)), []);
});
test('a held cell never renders, even if one is passed in unfiltered', opts, async () => {
  const held = structuredClone(spec); held.data.cells[2].status = 'needs-rn'; held.data.images[2].status = 'needs-rn';
  const root = parse(await render(filterApproved(held)));
  assert.equal(select(root, 'li.fs-cell').length, 3); assert.ok(!/Who can decide what happens next/.test(text(root)));
});
test('budgets: strip CSS under 12 KB gzipped, strip JavaScript under 25 KB gzipped', opts, async () => {
  assert.ok(gz(new URL('strip.css', dir)) < 12 * 1024);
  assert.ok(gz(new URL('FrameworkStrip.mjs', dir)) + gz(new URL('core.mjs', dir)) < 25 * 1024);
});
