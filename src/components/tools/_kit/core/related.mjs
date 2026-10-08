// RelatedRail data (block S8). Fed only by approved relations. See the design, section 6.2.
// Relation: {a, b, kind, strength, reasonA, reasonB, status, checked?}
// FamilyIndex: {tools: [{id, title, url, site, siteName}]}
import { isMonthDYYYY } from './text.mjs';

const KIND_LABEL = { 'same-source': 'Same source', 'same-story': 'Same story', 'same-edition': 'Same story', 'same-question': 'Same question' };
export const MAX_SAME_SITE = 3;
export const MAX_CROSS_SITE = 1;

/**
 * @returns {{items: object[], waiting: object[], skipped: object[]}}
 *  items: rendered rail entries. waiting: approved relations whose other end is not in the family index yet.
 *  skipped: relations left out because they are not approved.
 */
export function selectRelated({ relations, familyIndex, toolId }) {
  const byId = new Map(familyIndex.tools.map(t => [t.id, t]));
  const self = byId.get(toolId);
  const items = [], waiting = [], skipped = [];
  for (const r of relations) {
    if (r.a !== toolId && r.b !== toolId) continue;
    if (r.status !== 'approved') { skipped.push(r); continue; }
    const otherId = r.a === toolId ? r.b : r.a;
    const reason = r.a === toolId ? r.reasonA : r.reasonB;
    const other = byId.get(otherId);
    if (!other) { waiting.push(r); continue; }
    const cross = !!self && other.site !== self.site;
    items.push({
      id: otherId, kind: cross ? 'Other site' : KIND_LABEL[r.kind] || r.kind, title: other.title, url: other.url,
      reason, site: cross ? other.siteName : '', strength: r.strength, cross,
    });
  }
  const rank = i => (i.strength === 'hard' ? 0 : 1);
  const same = items.filter(i => !i.cross).sort((x, y) => rank(x) - rank(y)).slice(0, MAX_SAME_SITE);
  const cross = items.filter(i => i.cross).sort((x, y) => rank(x) - rank(y)).slice(0, MAX_CROSS_SITE);
  return { items: [...same, ...cross], waiting, skipped };
}

const HYPE = /\b(revolutionary|powerful|unlock|discover|seamless|cutting-edge|game-changing|amazing)\b/i;
/** Rules from design 6.2 item 5, plus the checked-date rule for approved hard links. Returns error strings. */
export function validateRelations(relations, familyIndex) {
  const errs = [];
  const ids = new Set(familyIndex.tools.map(t => t.id));
  relations.forEach((r, n) => {
    const where = `relations[${n}] ${r.a} <-> ${r.b}`;
    if (!['approved', 'needs-rn'].includes(r.status)) errs.push(`${where}: status must be approved or needs-rn`);
    if (!['hard', 'soft'].includes(r.strength)) errs.push(`${where}: strength must be hard or soft`);
    if (!KIND_LABEL[r.kind]) errs.push(`${where}: unknown kind ${r.kind}`);
    for (const k of ['reasonA', 'reasonB']) {
      const t = r[k] || '';
      if (!t) errs.push(`${where}: ${k} is empty`);
      if ((t.match(/\S+/g) || []).length > 25) errs.push(`${where}: ${k} is longer than 25 words`);
      if (HYPE.test(t)) errs.push(`${where}: ${k} uses a hype word`);
      if (/[—!]/.test(t)) errs.push(`${where}: ${k} has an em dash or an exclamation mark`);
    }
    if (r.status === 'approved' && r.strength === 'soft' && !isMonthDYYYY(r.approvedOn || '')) errs.push(`${where}: a soft relation is editorial, so approved needs "approvedOn" (the Month D, YYYY RN said yes); keep it needs-rn until then`);
    if (r.status === 'approved' && r.strength === 'hard' && !isMonthDYYYY(r.checked || '')) errs.push(`${where}: an approved hard relation needs "checked" as Month D, YYYY`);
    if (r.a === r.b) errs.push(`${where}: a tool cannot relate to itself`);
    void ids;
  });
  return errs;
}
