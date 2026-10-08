import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, select, text, isEl, walk } from './html-lite.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
export const CONTRACT = JSON.parse(fs.readFileSync(path.join(here, '../_kit/contract/kit-contract.json'), 'utf8'));

/** @returns {string[]} errors */
export function checkContract(html, spec, only) {
  const root = parse(html);
  const vars = { sources: spec.sources.length, limitsShows: spec.limits.shows.length, limitsNot: spec.limits.doesNotShow.length };
  const num = v => (typeof v === 'string' ? vars[v.replace(/[{}]/g, '')] : v);
  const errs = [];
  for (const [block, reqs] of Object.entries(CONTRACT.blocks)) {
    if (only && !only.includes(block)) continue;
    for (const r of reqs) {
      const found = select(root, r.selector);
      if (r.min !== undefined && found.length < num(r.min)) errs.push(`${block}: "${r.selector}" found ${found.length}, needs at least ${num(r.min)}`);
      if (r.max !== undefined && found.length > num(r.max)) errs.push(`${block}: "${r.selector}" found ${found.length}, allows at most ${num(r.max)}`);
      for (const t of r.texts || []) if (!found.some(n => text(n).trim() === t)) errs.push(`${block}: "${r.selector}" has no element reading "${t}"`);
    }
  }
  // every claim ref points at a card that exists
  const ids = new Set(); walk(root, n => { if (n.attrs.id) ids.add(n.attrs.id); });
  for (const a of select(root, 'sup.tk-ref a')) if (!ids.has(a.attrs.href.slice(1))) errs.push(`ClaimRef: ${a.attrs.href} has no matching card`);
  // unique ids
  const seen = new Map(); walk(root, n => { if (n.attrs.id) seen.set(n.attrs.id, (seen.get(n.attrs.id) || 0) + 1); });
  for (const [id, c] of seen) if (c > 1) errs.push(`duplicate id ${id}`);
  return errs;
}

/** Controls that cannot work without scripting must sit under .js-only. */
export function deadControls(html) {
  const root = parse(html);
  const bad = [];
  const visit = (n, js) => {
    if (!isEl(n)) return;
    const j = js || (n.attrs.class || '').split(/\s+/).includes('js-only');
    if ((n.tag === 'button' || n.tag === 'select' || n.tag === 'textarea' || (n.tag === 'input' && n.attrs.type !== 'hidden')) && !j) bad.push(`<${n.tag}${n.attrs.id ? ' id=' + n.attrs.id : ''}> ${text(n).trim().slice(0, 40)}`);
    n.children.forEach(c => visit(c, j));
  };
  root.children.forEach(c => visit(c, false));
  return bad;
}
