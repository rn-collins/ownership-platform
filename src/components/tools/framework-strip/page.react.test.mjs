// node --test src/components/tools/framework-strip/page.react.test.mjs
// The strip inside the kit's shell, as the review page /tools/framework-strip renders it.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { HAVE_REACT, reactKit } from '../_test/render.mjs';
import { readingPath, structure } from '../_test/pilot-checks.mjs';
import { checkContract, deadControls } from '../_test/contract.mjs';
import { lintHtml, errorsOnly } from '../_kit/check/voice-lint.mjs';
import { filterApproved } from '../_kit/core/approved.mjs';
import { select, parse } from '../_test/html-lite.mjs';

const spec = JSON.parse(fs.readFileSync(new URL('spec.json', import.meta.url), 'utf8'));
const crumbs = [{ label: 'Institutions of One', href: '/' }, { label: 'Tools', href: '/tools' }];
const opts = { skip: !HAVE_REACT && 'React is not installed' };

async function render() {
  const { React, server } = await reactKit();
  const Page = (await import('./StripPage.mjs')).default;
  return server.renderToStaticMarkup(React.createElement(Page, { spec: filterApproved(spec), related: [], crumbs, siteLinks: { about: '/about' } }));
}
test('the review page: shell, strip, limits, sources and the way back to Edition 001 all render, with the kit contract met', opts, async () => {
  const html = await render();
  // The strip is a server component with no claim numbers or result card, so the contract is checked for the shell blocks only.
  const rp = readingPath({ spec, html });
  assert.deepEqual(rp.missing, []); assert.deepEqual(rp.held, []);
  assert.deepEqual(checkContract(html, filterApproved(spec), ['ToolShell', 'ToolHeader', 'LimitsBand', 'SourceDrawer', 'OriginBar']), []);
  assert.deepEqual(deadControls(html), []); assert.deepEqual(structure(html), []);
  assert.deepEqual(errorsOnly(lintHtml(html, spec.id)), []);
  const root = parse(html);
  assert.equal(select(root, 'li.fs-cell').length, 4);
  assert.equal(select(root, 'main').length, 1);
  assert.ok(select(root, 'nav.tk-origin a').some(a => a.attrs.href === '/edit/001'));
});
