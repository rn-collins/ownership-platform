// M2 Dependency ranker: pure logic. No DOM, no framework. Works on the test and layer lists in spec.data.
// A dependency is {id, name, layerId, met: {<testId>: boolean}}. "met" is the visitor's yes.
import { joinList } from '../_kit/core/text.mjs';

export const MAX_ITEMS = 5;
export const newItem = (id, tests) => ({ id, name: '', layerId: '', met: Object.fromEntries(tests.map(t => [t.id, false])) });
export const displayName = (item, position) => (item.name.trim() ? item.name.trim() : `Dependency ${position}`);

/** Unticked tests for one dependency, in the edition's order. */
export const unmetTests = (item, tests) => tests.filter(t => !item.met[t.id]);

/**
 * Rank weakest first: most unticked tests first; ties keep the order the visitor entered them.
 * @returns {{item:object, entry:number, name:string, unmet:object[], count:number, rank:number, tied:boolean}[]}
 */
export function rank(items, tests) {
  const scored = items.map((item, i) => ({ item, entry: i + 1, name: displayName(item, i + 1), unmet: unmetTests(item, tests), count: unmetTests(item, tests).length }));
  scored.sort((a, b) => b.count - a.count || a.entry - b.entry);
  return scored.map((s, i) => ({ ...s, rank: i + 1, tied: i > 0 && scored[i - 1].count === s.count }));
}

/** Plain sentence for one ranked row. No verdict words. */
export function rowText(row, data) {
  if (row.count === 0) return `${row.name}: ${data.templates.allMet}`;
  const names = row.unmet.map(t => t.name);
  return `${row.name}: ${row.count === 1 ? 'one test is' : `${row.count} tests are`} not met. ${joinList(names)}.`;
}

/** The result card's content. Every line is the visitor's own input, so each carries that tag. */
export function result(items, data) {
  const { tests, layers, templates } = data;
  if (!items.length) return { headline: templates.empty, basis: null, lines: [] };
  const ranked = rank(items, tests);
  const top = ranked[0];
  const headline = top.count === 0 ? `All four tests are met for ${top.name}.` : `Start with ${top.name}.`;
  const lines = ranked.map(r => {
    const layer = layers.find(l => l.id === r.item.layerId);
    return { text: `${r.rank}. ${rowText(r, data)}${layer ? ` Layer: ${layer.name}.` : ''}${r.tied ? ' Tied with the one above.' : ''}`, basis: 'input' };
  });
  return { headline, basis: 'input', lines };
}

/** Plain text for Copy as text and Download .txt. Never put this in a URL. */
export function asText(items, data, closing) {
  const r = result(items, data);
  return [r.headline, ...r.lines.map(l => l.text), '', closing, '', 'Dependency ranker by RN Collins, from Edition 002 of The I/1 Edit.'].filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n');
}

/** Spec derivation target: the number the sort counts. */
export const derivations = {
  failCount({ met }) { return Object.values(met).filter(v => !v).length; },
};
