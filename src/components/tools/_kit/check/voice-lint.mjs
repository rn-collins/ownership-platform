// Voice linter. Library plus helpers: lintStrings, lintSpec, lintHtml, lintFile.
import fs from 'node:fs';
import { RULES, maskOfficial } from './rules.mjs';

/** @returns {{rule:string, severity:string, where:string, match:string, why:string}[]} */
export function lintText(text, where, exceptions = []) {
  const masked = maskOfficial(String(text), exceptions);
  const out = [];
  for (const r of RULES) for (const m of r.test(masked)) out.push({ rule: r.id, severity: r.severity, where, match: String(m).slice(0, 80), why: r.why });
  return out;
}

// Keys whose string values are not visible prose (ids, addresses, enums, machine fields).
const SKIP_KEYS = new Set(['schema', 'id', 'ids', 'slug', 'url', 'href', 'path', 'image', 'archiveUrl', 'deedUrl', 'sourceIds', 'claimIds', 'sourceId', 'recordId', 'site', 'program', 'release', 'mechanic', 'kind', 'basis', 'status', 'check', 'strength', 'fn', 'args', 'expect', 'beehiiv', 'linkedin', 'pinterest', 'carouselZip', 'linkedinPdf', 'pin', 'iso', 'urlShort', 'fixture', 'relatedEditions', 'layer', 'layerId', 'state', 'statusId', 'type', 'key', 'field', 'sort', 'order', 'dir', 'siteName', 'locale', 'lang', 'accessed', 'lastChecked', 'dateShown', 'privacy']);

/** Lints every visible string in a spec object. Dates in `accessed`, `lastChecked`, `dateShown` are format-checked separately by the validator. */
export function lintSpec(spec) {
  const exceptions = (spec.voiceExceptions || []).map(e => e.text);
  const out = [];
  const visit = (node, path, key) => {
    if (typeof node === 'string') { if (!SKIP_KEYS.has(key)) out.push(...lintText(node, `${spec.id}:${path}`, exceptions)); return; }
    if (Array.isArray(node)) { node.forEach((x, i) => visit(x, `${path}[${i}]`, key)); return; }
    if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) visit(v, path ? `${path}.${k}` : k, k);
  };
  visit(spec, '', '');
  return out;
}

/** Reduces HTML to the text a visitor reads or hears: text nodes plus alt, aria-label, title and meta description. No scripts, no styles. */
export function visibleTextOfHtml(html) {
  let h = String(html).replace(/<!--[\s\S]*?-->/g, ' ').replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  const attrs = [];
  h.replace(/\b(?:alt|aria-label|title)="([^"]*)"/gi, (_, v) => { attrs.push(v); return ''; });
  h.replace(/<meta\b[^>]*\bname="description"[^>]*\bcontent="([^"]*)"/gi, (_, v) => { attrs.push(v); return ''; });
  const text = h.replace(/<[^>]+>/g, '\n');
  const decode = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&');
  return decode([text, ...attrs].join('\n'));
}

export function lintHtml(html, where, exceptions = []) {
  return lintText(visibleTextOfHtml(html), where, exceptions);
}

export function lintFile(file, exceptions = []) {
  const raw = fs.readFileSync(file, 'utf8');
  const text = /\.html?$/.test(file) ? visibleTextOfHtml(raw) : raw;
  return lintText(text, file, exceptions);
}

export const errorsOnly = findings => findings.filter(f => f.severity === 'error');
export const format = findings => findings.map(f => `${f.severity.toUpperCase()} [${f.rule}] ${f.where}: "${f.match}" (${f.why})`).join('\n');
