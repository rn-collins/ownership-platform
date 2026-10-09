// M1 Four questions map for the main site: pure logic. No DOM, no framework. Works on spec.data.
// State is plain data: {cols: {<columnId>: [{id, text}]}, change: '<changeId>' or '', marks: {<changeId>: {<itemId>: 'stays'|'goes'|'unsure'}}, nextId}.
// Every function returns a new state; nothing is mutated and nothing leaves the browser.
import { joinList } from '../_kit/core/text.mjs';

export const MARK_IDS = ['stays', 'goes', 'unsure'];

export const newState = data => ({ cols: Object.fromEntries(data.columns.map(c => [c.id, []])), change: '', marks: Object.fromEntries(data.changes.map(c => [c.id, {}])), nextId: 1 });

/** One line of text: tags and line breaks collapse to single spaces, trimmed, capped. */
export const cleanText = (s, max = 60) => [...String(s ?? '').replace(/\s+/g, ' ').trim()].slice(0, max).join('');

/** @returns {{state:object, ok:boolean, reason?:'empty'|'full'|'unknown-column', id?:number}} */
export function addItem(state, colId, text, data) {
  const list = state.cols[colId];
  if (!list) return { state, ok: false, reason: 'unknown-column' };
  const t = cleanText(text, data.maxItemLength);
  if (!t) return { state, ok: false, reason: 'empty' };
  if (list.length >= data.maxPerColumn) return { state, ok: false, reason: 'full' };
  const id = state.nextId;
  return { state: { ...state, cols: { ...state.cols, [colId]: [...list, { id, text: t }] }, nextId: id + 1 }, ok: true, id };
}

/** Removing an item removes its marks under every change. */
export function removeItem(state, colId, itemId) {
  const marks = Object.fromEntries(Object.entries(state.marks).map(([ch, m]) => [ch, Object.fromEntries(Object.entries(m).filter(([k]) => Number(k) !== itemId))]));
  return { ...state, cols: { ...state.cols, [colId]: state.cols[colId].filter(i => i.id !== itemId) }, marks };
}

export const setChange = (state, changeId) => ({ ...state, change: changeId });

/** Marks apply to the chosen change. An empty mark clears the item's mark for that change. */
export function setMark(state, itemId, mark, changeId = state.change) {
  if (!changeId || !(mark === '' || MARK_IDS.includes(mark))) return state;
  const next = { ...(state.marks[changeId] || {}) };
  if (mark === '') delete next[itemId]; else next[itemId] = mark;
  return { ...state, marks: { ...state.marks, [changeId]: next } };
}

export const markOf = (state, itemId, changeId = state.change) => (state.marks[changeId] || {})[itemId] || '';

/** Items in column order, then entry order. */
export const allItems = (state, data) => data.columns.flatMap(c => state.cols[c.id].map(i => ({ ...i, colId: c.id, colName: c.name })));

const label = (it) => `${it.text} (${it.colName})`;
const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k]);

/** Counts and groups for the chosen change. Counts always equal the marks: stays + goes + unsure + unmarked = total. */
export function summarize(state, data) {
  const items = allItems(state, data);
  const groups = { stays: [], goes: [], unsure: [], unmarked: [] };
  for (const it of items) groups[markOf(state, it.id) || 'unmarked'].push(it);
  return { total: items.length, items, groups, counts: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length])), emptyColumns: data.columns.filter(c => !state.cols[c.id].length) };
}

/** One short sentence for the status line after a mark changes, so a screen reader hears the new counts. Only the visitor's own words and counts. */
export function markAnnouncement(state, item, value, data) {
  const next = setMark(state, item.id, value);
  const counts = summarize(next, data).counts;
  const picked = data.marks.find(m => m.id === value);
  return `${item.text} marked ${picked ? picked.label : 'not marked yet'}. ${data.marks.map(m => `${m.label}: ${counts[m.id]}`).join('. ')}.`;
}

/** Items marked "stays" under every one of the four changes. Needs all four changes marked for that item. */
export function staysEverywhere(state, data) {
  return allItems(state, data).filter(it => data.changes.every(ch => (state.marks[ch.id] || {})[it.id] === 'stays'));
}

/** The result card's content. Every line is the visitor's own input. No score, no verdict. */
export function result(state, data) {
  const T = data.templates;
  const s = summarize(state, data);
  if (!s.total) return { headline: T.empty, basis: null, lines: [], summary: s };
  const change = data.changes.find(c => c.id === state.change);
  const headline = change ? fill(T.headlineChange, { change: change.ifPhrase }) : T.headlineNone;
  const lines = s.emptyColumns.map(c => ({ text: fill(T.emptyColumn, { column: c.name }), basis: 'input' }));
  if (change) {
    const list = g => (g.length ? joinList(g.map(label)) : T.none);
    const markLabel = id => data.marks.find(m => m.id === id).label;
    lines.push({ text: `${T.stays} ${list(s.groups.stays)}.`, basis: 'input' });
    lines.push({ text: `${T.goes} ${list(s.groups.goes)}.`, basis: 'input' });
    lines.push({ text: `${T.unsure} ${list(s.groups.unsure)}.`, basis: 'input' });
    if (s.groups.unmarked.length) lines.push({ text: `${T.unmarked} ${joinList(s.groups.unmarked.map(label))}.`, basis: 'input' });
    lines.push({ text: `${markLabel('stays')}: ${s.counts.stays}. ${markLabel('goes')}: ${s.counts.goes}. ${markLabel('unsure')}: ${s.counts.unsure}.`, basis: 'input' });
  }
  const every = staysEverywhere(state, data);
  if (every.length) lines.push({ text: `${T.everywhere} ${joinList(every.map(label))}.`, basis: 'input' });
  return { headline, basis: 'input', lines, summary: s };
}

/** A row per item and a column per change, in the visitor's words. Cells are the mark label or "Not marked". */
export function acrossChanges(state, data) {
  const word = id => (id ? data.marks.find(m => m.id === id).label : 'Not marked');
  return allItems(state, data).map(it => ({ item: it, cells: data.changes.map(ch => ({ changeId: ch.id, mark: (state.marks[ch.id] || {})[it.id] || '', text: word((state.marks[ch.id] || {})[it.id]) })) }));
}

/** Plain text for Copy as text and Download .txt. Never put this in a URL. */
export function asText(state, data, closing = '') {
  const r = result(state, data);
  const out = [r.headline, ...r.lines.map(l => l.text)];
  if (r.summary.total) {
    out.push('');
    for (const c of data.columns) {
      const list = state.cols[c.id];
      out.push(`${c.name}: ${list.length ? list.map(i => i.text).join('; ') : 'nothing listed'}`);
    }
  }
  if (closing) out.push('', closing);
  out.push('', 'Four questions map by RN Collins, from Edition 001 of The I/1 Edit.');
  return out.filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n');
}

/** Spec derivation target: the number of items in a group equals the number of marks of that kind. */
export const derivations = {
  markCount({ marks, items, mark }) { return items.filter(id => marks[id] === mark).length; },
};
