"use client";
// M1 Four questions map for the main site (React 18.3 API only). Rename to Tool.tsx if you want; it is valid as it is.
// A server page passes in an already-approved spec:  <Tool spec={filterApproved(spec)} related={related} crumbs={crumbs} />
// The page or layout imports ./tool.css once. Image files in ./images are served at spec.data.imageBase.
import React, { useState, useRef, useEffect } from 'react';
import { ToolShell, ResultCard, ClaimRef, SourceRef, BasisTag, h, announce, claimText } from '../_kit/react/index.mjs';
import { newState, addItem, removeItem, setChange, setMark, markOf, allItems, result, acrossChanges, asText } from './core.mjs';
import { Photo } from './photo.mjs';

const REASONS = { empty: 'Type a few words first.', full: 'That column is full. Remove one to add another.' };

export default function Tool({ spec, related = [], crumbs = [], siteLinks = {} }) {
  const D = spec.data;
  const [state, setState] = useState(() => newState(D));
  const [drafts, setDrafts] = useState({});
  const [focus, setFocus] = useState(null);
  const inputs = useRef({});

  useEffect(() => {
    if (focus && inputs.current[focus]) { inputs.current[focus].focus(); setFocus(null); }
  }, [focus]);

  const res = result(state, D);
  const items = allItems(state, D);
  const change = D.changes.find(c => c.id === state.change);
  const closingText = claimText(spec, D.changesClaimId);
  const caseSources = D.cases || [];

  const add = (e, col) => {
    e.preventDefault();
    const out = addItem(state, col.id, drafts[col.id] || '', D);
    if (!out.ok) { announce(`${col.name}: ${REASONS[out.reason] || 'Not added.'}`); return; }
    setState(out.state);
    setDrafts(d => ({ ...d, [col.id]: '' }));
    setFocus(col.id);
    announce(`Added to ${col.name}. ${out.state.cols[col.id].length} of ${D.maxPerColumn}.`);
  };
  const remove = (col, item) => { setState(s => removeItem(s, col.id, item.id)); setFocus(col.id); announce(`Removed ${item.text} from ${col.name}.`); };
  const pick = id => { setState(s => setChange(s, id)); announce(`${D.changes.find(c => c.id === id).label}. Mark each item below.`); };
  const mark = (item, value) => setState(s => setMark(s, item.id, value));
  const reset = () => { setState(newState(D)); setDrafts({}); announce('Started over. The map is empty.'); };

  const spot = (item, col) => `${item.text} (${col.name})`;

  return h(ToolShell, { spec, related, crumbs, siteLinks },
    h('section', { className: 'tk-sec tkm-lead', 'aria-labelledby': 'm1-lead-h' },
      h(Photo, { spec, id: D.lead.imageId, className: 'tkm-hero' }),
      h('div', null,
        h('h2', { id: 'm1-lead-h' }, 'The edition’s four questions'),
        h('p', null, 'The edition says: ', claimText(spec, D.edition.claimId), h(ClaimRef, { spec, claimId: D.edition.claimId })))),

    h('section', { className: 'tk-sec', 'aria-labelledby': 'm1-q-h' },
      h('h2', { id: 'm1-q-h' }, 'Build, Carry, Control, Continue'),
      h('ol', { className: 'tkm-cols' }, ...D.columns.map(c => h('li', { key: c.id, className: 'tkm-col' },
        h(Photo, { spec, id: c.imageId }),
        h('p', { className: 'tkm-num' }, h('span', { className: 'tk-tag' }, c.number), h('strong', null, c.name)),
        h('p', { className: 'tkm-q' }, c.question, h(ClaimRef, { spec, claimId: c.claimId })),
        h('p', { className: 'tkm-b' }, c.body, h(ClaimRef, { spec, claimId: c.bodyClaimId })))))),

    h('section', { className: 'tk-sec', 'aria-labelledby': 'm1-c-h' },
      h('h2', { id: 'm1-c-h' }, 'Four changes to the container'),
      h('p', null, claimText(spec, D.changesClaimId), h(ClaimRef, { spec, claimId: D.changesClaimId })),
      h('ol', { className: 'tkm-changes' }, ...D.changes.map(c => h('li', { key: c.id, className: 'tkm-chg' }, h(Photo, { spec, id: c.imageId }), h('p', null, h('strong', null, c.label)))))),

    // No scripting: a blank sheet to print and fill in by hand. Hidden when scripting runs.
    h('section', { className: 'tk-sec tk-print no-js-only', 'aria-labelledby': 'm1-blank-h' }, h('h2', { id: 'm1-blank-h' }, 'A blank sheet to print'),
      h('p', null, `Scripting is off, so the map builder is hidden. Print this sheet. Write up to ${D.maxPerColumn} short items in each column. Then pick one of the four changes above and mark each item: ${D.marks.map(m => m.label).join(', ')}.`),
      h('div', { className: 'tk-scroll' }, h('table', { className: 'tk-t stack' }, h('caption', null, 'Four columns, up to five items each'),
        h('thead', null, h('tr', null, ...D.columns.map(c => h('th', { scope: 'col', key: c.id }, c.name)))),
        h('tbody', null, ...Array.from({ length: D.maxPerColumn }, (_, i) => h('tr', { key: i }, ...D.columns.map(c => h('td', { key: c.id, 'data-label': c.name }, ' ')))))))),

    h('section', { className: 'tk-sec js-only', 'aria-labelledby': 'm1-s1-h' },
      h('h2', { id: 'm1-s1-h' }, 'Step 1. List what you have'),
      h('p', { id: 'm1-help', className: 'tk-help' }, `Add up to ${D.maxPerColumn} short items under each question. Nothing you type leaves this page. An empty column is fine.`),
      ...D.columns.map(c => {
        const list = state.cols[c.id];
        const full = list.length >= D.maxPerColumn;
        return h('fieldset', { className: 'tk-fieldset', key: c.id },
          h('legend', null, `${c.name}: ${c.question}`),
          list.length ? h('ul', { className: 'tkm-items', 'aria-label': `${c.name} items` }, ...list.map(it => h('li', { key: it.id }, h('span', null, it.text),
            h('button', { type: 'button', className: 'tk-btn small', onClick: () => remove(c, it), 'aria-label': `Remove ${it.text} from ${c.name}` }, 'Remove')))) : h('p', { className: 'tk-note' }, D.templates.emptyColumn.replace('{column}', c.name)),
          h('form', { className: 'tk-row', onSubmit: e => add(e, c) },
            h('label', { className: 'tk-field' }, `Add an item under ${c.name}`,
              h('input', { type: 'text', id: `m1-in-${c.id}`, name: `m1-in-${c.id}`, value: drafts[c.id] || '', maxLength: D.maxItemLength, autoComplete: 'off', disabled: full, ref: el => { inputs.current[c.id] = el; }, onChange: e => setDrafts(d => ({ ...d, [c.id]: e.target.value })), 'aria-describedby': 'm1-help' })),
            h('button', { type: 'submit', className: 'tk-btn', disabled: full }, 'Add')),
          full ? h('p', { className: 'tk-help' }, REASONS.full) : null);
      })),

    h('section', { className: 'tk-sec js-only', 'aria-labelledby': 'm1-s2-h' },
      h('h2', { id: 'm1-s2-h' }, 'Step 2. Pick one change'),
      h('fieldset', { className: 'tk-fieldset' },
        h('legend', null, 'Which change do you want to test?'),
        h('div', { className: 'tkm-opts' }, ...D.changes.map(c => h('div', { className: 'tkm-opt', key: c.id },
          h(Photo, { spec, id: c.imageId }),
          h('label', { className: 'tk-check' }, h('input', { type: 'radio', name: 'm1-change', value: c.id, checked: state.change === c.id, onChange: () => pick(c.id) }), h('span', null, c.label))))))),

    h('section', { className: 'tk-sec js-only', 'aria-labelledby': 'm1-s3-h' },
      h('h2', { id: 'm1-s3-h' }, 'Step 3. Mark each item'),
      !change ? h('p', { className: 'tk-note' }, D.templates.pickChange) : h('p', null, `Under this change: ${change.label}.`),
      !items.length ? h('p', { className: 'tk-note' }, D.templates.empty) : null,
      change && items.length ? h('div', null,
        h('ul', { className: 'tkm-marks' }, ...D.marks.map(m => h('li', { key: m.id }, h(Photo, { spec, id: m.imageId }), h('p', null, h('strong', null, m.label))))),
        ...D.columns.flatMap(c => state.cols[c.id].map(it => h('fieldset', { className: 'tk-fieldset tkm-markset', key: it.id },
          h('legend', null, spot(it, c)),
          h('div', { className: 'tkm-radios' },
            h('label', { className: 'tk-check' }, h('input', { type: 'radio', name: `m1-mark-${it.id}`, checked: !markOf(state, it.id), onChange: () => mark(it, '') }), h('span', null, 'Not marked yet')),
            ...D.marks.map(m => h('label', { className: 'tk-check', key: m.id }, h('input', { type: 'radio', name: `m1-mark-${it.id}`, checked: markOf(state, it.id) === m.id, onChange: () => mark(it, m.id) }), h('span', null, m.label)))))))) : null),

    h('section', { className: 'tk-sec tk-print js-only', 'aria-labelledby': 'm1-r-h' },
      h('h2', { id: 'm1-r-h' }, 'Your map'),
      h(ResultCard, { spec, headline: res.headline, basis: res.basis, lines: res.lines, note: '', payload: { text: () => asText(state, D, closingText), txt: () => asText(state, D, closingText) } }),
      h(Photo, { spec, id: items.length ? D.templates.resultImageId : D.templates.emptyImageId, className: 'tkm-res' }),
      items.length ? h('div', { className: 'tk-scroll' }, h('table', { className: 'tk-t stack' }, h('caption', null, 'Each item under each of the four changes', h(BasisTag, { basis: 'input' })),
        h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Item'), ...D.changes.map(c => h('th', { scope: 'col', key: c.id }, c.label)))),
        h('tbody', null, ...acrossChanges(state, D).map(r => h('tr', { key: r.item.id }, h('th', { scope: 'row' }, `${r.item.text} (${r.item.colName})`), ...r.cells.map(cell => h('td', { key: cell.changeId, 'data-label': D.changes.find(c => c.id === cell.changeId).label }, cell.text))))))) : null,
      items.length ? h('p', null, claimText(spec, 'counts'), h(ClaimRef, { spec, claimId: 'counts' })) : null,
      h('div', { className: 'tk-row' }, h('button', { type: 'button', className: 'tk-btn', onClick: reset, disabled: !items.length }, 'Start over'))),

    h('section', { className: 'tk-sec', 'aria-labelledby': 'm1-edition-h' },
      h('h2', { id: 'm1-edition-h' }, 'What the edition says it does not do'),
      h('p', null, claimText(spec, 'nocert'), h(ClaimRef, { spec, claimId: 'nocert' })),
      h('p', null, claimText(spec, 'nocontract'), h(ClaimRef, { spec, claimId: 'nocontract' })),
      h('p', null, h('a', { href: `${spec.origin.path}#sources-heading` }, 'See the six cases and their sources in the edition'))),

    // The edition lists eleven sources for its six cases. They stay held until someone opens them, and then this list appears.
    caseSources.length ? h('section', { className: 'tk-sec', 'aria-labelledby': 'm1-cases-h' }, h('h2', { id: 'm1-cases-h' }, 'Cases in the edition'),
      h('ul', { className: 'tk-used' }, ...caseSources.map(c => h('li', { key: c.sourceId }, c.label, h(SourceRef, { spec, sourceId: c.sourceId }))))) : null);
}
