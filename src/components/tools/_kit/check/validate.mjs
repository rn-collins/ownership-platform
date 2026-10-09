// tool-spec/1 validator: JSON Schema subset + the semantic rules from the design (sections 1.3, 2.3, 2.6, 6.4, 7.4).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSchema } from './schema-lite.mjs';
import { lintSpec, errorsOnly } from './voice-lint.mjs';
import { quoteLock } from '../core/quote-lock.mjs';
import { runDerivations } from '../core/derive.mjs';
import { panelLines } from '../core/card.mjs';
import { isMonthDYYYY, wordCount, MONTHS } from '../core/text.mjs';
import { collectNeedsRn } from '../core/approved.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
export const SPEC_SCHEMA = readJson(path.join(here, '../schema/tool-spec-1.json'));
export const ALLOWED_LIVE_HOSTS = ['polymath-rn-collins.beehiiv.com', 'www.linkedin.com', 'www.pinterest.com', 'pin.it', 'www.threads.net', 'bsky.app', 'x.com', 'www.youtube.com', 'www.instagram.com'];
const PLAIN_LABEL_BAN = /\b(explorer|laboratory|lab|specimen|instrument|purpose-built)\b/i;
const MONTH_YEAR = new RegExp(`^(${MONTHS.join('|')}) \\d{4}$`);

export function mechanicSchema(mechanic) {
  const p = path.join(here, `../schema/mechanics/${mechanic}-1.json`);
  return fs.existsSync(p) ? readJson(p) : null;
}

/**
 * @param {object} spec
 * @param {{storyText?:string, derivations?:Record<string,Function>, voice?:boolean}} opts
 * @returns {{errors:string[], warnings:string[], needsRn:object[]}}
 */
export function validateSpec(spec, opts = {}) {
  const errors = [], warnings = [];
  errors.push(...validateSchema(spec, SPEC_SCHEMA));
  if (errors.length) return { errors, warnings, needsRn: [] }; // shape first; the rest assumes it

  const ms = mechanicSchema(spec.mechanic);
  if (!ms) errors.push(`no data schema for mechanic "${spec.mechanic}" (kit/schema/mechanics/${spec.mechanic}-1.json)`);
  else errors.push(...validateSchema(spec.data, ms, ms, 'data'));

  const dup = (arr, what) => { const seen = new Set(); for (const x of arr) { if (seen.has(x.id)) errors.push(`duplicate ${what} id ${x.id}`); seen.add(x.id); } };
  dup(spec.sources, 'source'); dup(spec.claims, 'claim');
  const src = new Map(spec.sources.map(s => [s.id, s]));

  for (const s of spec.sources) {
    if (s.accessed && !isMonthDYYYY(s.accessed)) errors.push(`source ${s.id}: accessed must read Month D, YYYY`);
    if (s.date && !isMonthDYYYY(s.date) && !MONTH_YEAR.test(s.date) && !/^\d{4}$/.test(s.date)) errors.push(`source ${s.id}: date must read Month D, YYYY, Month YYYY or YYYY`);
    if (s.quote && wordCount(s.quote) > 14) errors.push(`source ${s.id}: quote is ${wordCount(s.quote)} words; keep it under 15`);
    if (s.quote && !s.locator) errors.push(`source ${s.id}: a quote needs a locator`);
    if (s.check === 'verified' && !s.accessed) errors.push(`source ${s.id}: verified needs an accessed date`);
    if (s.check === 'needs-lookup' && s.status === 'approved') errors.push(`source ${s.id}: nobody has opened it (needs-lookup), so it must stay needs-rn`);
    if (s.check === 'needs-lookup' && spec.release === 'public') errors.push(`source ${s.id}: needs-lookup in a public tool`);
  }
  for (const c of spec.claims) {
    for (const i of c.sourceIds) {
      if (!src.has(i)) errors.push(`claim ${c.id}: unknown source ${i}`);
      else if (c.status === 'approved' && src.get(i).status !== 'approved') errors.push(`claim ${c.id}: approved claim cites needs-rn source ${i}`);
    }
    if (c.basis === 'story' && !c.storyQuote) errors.push(`claim ${c.id}: basis story needs a storyQuote`);
    if (c.basis === 'arithmetic' && (!c.derivation || !c.check)) errors.push(`claim ${c.id}: arithmetic needs derivation and check`);
    if (c.basis === 'simulation' && !(c.assumptions && c.assumptions.length)) errors.push(`claim ${c.id}: simulation needs assumptions`);
  }
  const claimIds = new Set(spec.claims.map(c => c.id));
  for (const st of spec.states || []) for (const i of st.claimIds) if (!claimIds.has(i)) errors.push(`state ${st.id}: unknown claim ${i}`);

  if (opts.storyText !== undefined) errors.push(...quoteLock(spec, opts.storyText));
  else if (spec.claims.some(c => c.basis === 'story')) warnings.push('quote lock not run: no story text supplied');
  if (opts.derivations) errors.push(...runDerivations(spec, opts.derivations));
  else if (spec.claims.some(c => c.basis === 'arithmetic')) warnings.push('derivations not run: no registry supplied');

  const { errors: pe } = panelLines({ name: spec.card.name, sourceShort: spec.card.sourceShort });
  errors.push(...pe);

  const shared = /A shared link carries only/.test(spec.promise.privacy);
  if (spec.share.link === 'fragment' && !shared) errors.push('share.link is fragment, so the privacy line must say what a shared link carries');
  if (spec.share.link === 'never' && shared) errors.push('share.link is never, so the privacy line must not promise a shared link');
  if (spec.promise.privacy === 'Nothing to enter.' && spec.mechanic === 'sheet') errors.push('a worksheet takes input, so "Nothing to enter." is untrue');

  if (PLAIN_LABEL_BAN.test(spec.title) || PLAIN_LABEL_BAN.test(spec.question)) errors.push('title or question uses a banned label (explorer, lab, specimen, instrument, purpose-built)');

  const live = spec.origin.live || {};
  for (const [k, v] of Object.entries(live)) {
    if (!v) continue;
    let host = ''; try { host = new URL(v).host; } catch { errors.push(`origin.live.${k}: not a URL`); continue; }
    if (!ALLOWED_LIVE_HOSTS.includes(host)) errors.push(`origin.live.${k}: host ${host} is not allowed`);
    if (!spec.origin.liveChecked) errors.push(`origin.live.${k}: a live link needs liveChecked (the day someone opened it)`);
  }
  if (spec.release === 'public' && spec.review.culturalReview === 'required-pending') errors.push('culturalReview is pending, so the tool cannot be public');

  if (opts.voice !== false) for (const f of errorsOnly(lintSpec(spec))) errors.push(`voice [${f.rule}] ${f.where}: "${f.match}"`);
  return { errors, warnings, needsRn: collectNeedsRn(spec) };
}
