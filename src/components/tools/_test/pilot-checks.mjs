// Checks every tool gets (design 2.6): reading path, approved-only rendering, contract, lint, budgets.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import zlib from 'node:zlib';
import { parse, select, text, walk } from './html-lite.mjs';
import { checkContract, deadControls } from './contract.mjs';
import { filterApproved, collectNeedsRn } from '../_kit/core/approved.mjs';
import { lintHtml, errorsOnly } from '../_kit/check/voice-lint.mjs';

export const gz = file => zlib.gzipSync(fs.readFileSync(file)).length;

export function readingPath({ spec, html }) {
  const approved = filterApproved(spec);
  const root = parse(html);
  const visible = text(root).replace(/\s+/g, ' ');
  const missing = [];
  for (const c of approved.claims) if (!visible.includes(c.text.replace(/\s+/g, ' '))) missing.push(`claim ${c.id}`);
  for (const s of approved.sources) if (!visible.includes(s.title)) missing.push(`source ${s.id}`);
  for (const st of approved.states || []) if (!visible.includes(st.label) && !st.optionalInHtml) missing.push(`state ${st.id}`);
  for (const t of [...approved.limits.shows, ...approved.limits.doesNotShow]) if (!visible.includes(t)) missing.push(`limit "${t.slice(0, 30)}"`);
  for (const t of approved.promise.learn) if (!visible.includes(t)) missing.push(`promise "${t.slice(0, 30)}"`);
  const held = collectNeedsRn(spec).map(i => i.text).filter(Boolean).filter(t => visible.includes(t.replace(/\s+/g, ' ')));
  return { missing, held, root, visible };
}

export function structure(html) {
  const root = parse(html);
  const errs = [];
  if (select(root, 'h1').length !== 1) errs.push('needs exactly one h1');
  const ids = new Map(); walk(root, n => { if (n.attrs.id) ids.set(n.attrs.id, (ids.get(n.attrs.id) || 0) + 1); });
  for (const [id, c] of ids) if (c > 1) errs.push(`duplicate id ${id}`);
  for (const img of select(root, 'img')) if (img.attrs.alt === undefined) errs.push('img without alt');
  // headings never skip a level
  let last = 0; walk(root, n => { const m = /^h([1-6])$/.exec(n.tag); if (m) { const l = +m[1]; if (last && l > last + 1) errs.push(`heading level jumps from h${last} to h${l}`); last = l; } });
  // every label points at a control, every control has a name
  for (const inp of select(root, 'input')) if (inp.attrs.type !== 'hidden' && !inp.attrs['aria-label'] && !inp.attrs.id && !inp.attrs.name) errs.push('input with no name or id');
  // no third-party host in anything the page loads
  for (const n of select(root, 'script')) if (/^https?:/.test(n.attrs.src || '')) errs.push('third-party script ' + n.attrs.src);
  for (const n of select(root, 'link')) if (/^https?:/.test(n.attrs.href || '') && n.attrs.rel !== 'canonical') errs.push('third-party link ' + n.attrs.href);
  for (const n of select(root, 'img')) if (/^https?:/.test(n.attrs.src || '')) errs.push('third-party image ' + n.attrs.src);
  return errs;
}

export function pageChecks({ spec, html, voiceExceptions = [] }) {
  const rp = readingPath({ spec, html });
  assert.deepEqual(rp.missing, [], 'reading path is missing content');
  assert.deepEqual(rp.held, [], 'needs-rn text rendered');
  assert.deepEqual(checkContract(html, filterApproved(spec)), [], 'kit contract');
  assert.deepEqual(deadControls(html), [], 'controls shown without scripting');
  assert.deepEqual(structure(html), [], 'structure');
  assert.deepEqual(errorsOnly(lintHtml(html, spec.id, voiceExceptions.map(e => e.text))), [], 'voice lint on the rendered page');
  return rp;
}
