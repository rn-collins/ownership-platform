"use client";
// M2 Dependency ranker for the main site (React 18.3 API only). Rename to Tool.tsx if you want; it is valid as it is.
// A server page passes in an already-approved spec:  <Tool spec={filterApproved(spec)} related={related} crumbs={crumbs} />
import React, { useState, useRef, useEffect } from 'react';
import { ToolShell, ResultCard, ClaimRef, SourceRef, BasisTag, h, announce, claimText } from '../_kit/react/index.mjs';
import { MAX_ITEMS, newItem, rank, result, asText, displayName } from './core.mjs';

export default function Tool({ spec, related = [], crumbs = [], siteLinks = {} }) {
  const D = spec.data;
  const [items, setItems] = useState([]);
  const nextId = useRef(1);
  const prevTop = useRef(null);
  const [focusId, setFocusId] = useState(null);
  const res = result(items, D);
  const ranked = rank(items, D.tests);
  const closing = D.templates.closing;
  // The second closing question (claim "extra") shows only when it is approved and its claim survived filterApproved.
  const extra = D.templates.closingExtra && D.templates.closingExtra.status === 'approved' && spec.claims.some(c => c.id === D.templates.closingExtra.claimId) ? D.templates.closingExtra : null;
  const closingText = [closing.text, extra && extra.text].filter(Boolean).join(' ');

  useEffect(() => {
    if (focusId) { const el = document.getElementById(`dep-${focusId}-name`); if (el) el.focus(); setFocusId(null); }
  }, [focusId]);

  // One short sentence when the order changes. Typing a name stays silent.
  useEffect(() => {
    const top = ranked[0];
    const key = top ? `${top.item.id}:${top.count}` : null;
    if (key !== prevTop.current && prevTop.current !== null && top) {
      announce(top.count === 0 ? `${top.name}: all four tests are met.` : `${top.name} is first, with ${top.count} of 4 tests not met.`);
    }
    prevTop.current = key;
  });

  const add = () => {
    if (items.length >= MAX_ITEMS) return;
    const id = nextId.current++;
    setItems(list => [...list, newItem(id, D.tests)]);
    setFocusId(id);
    announce(`Added dependency ${items.length + 1} of ${MAX_ITEMS}.`);
  };
  const update = (id, patch) => setItems(list => list.map(it => (it.id === id ? { ...it, ...patch } : it)));
  const toggle = (id, testId) => setItems(list => list.map(it => (it.id === id ? { ...it, met: { ...it.met, [testId]: !it.met[testId] } } : it)));
  const remove = id => { const pos = items.findIndex(i => i.id === id); setItems(list => list.filter(i => i.id !== id)); announce(`Removed ${displayName(items[pos], pos + 1)}.`); };
  const reset = () => { setItems([]); nextId.current = 1; announce('Started over. The list is empty.'); };

  const full = items.length >= MAX_ITEMS;

  return h(ToolShell, { spec, related, crumbs, siteLinks },
    h('section', { className: 'tk-sec', 'aria-labelledby': 'lay-h' }, h('h2', { id: 'lay-h' }, 'The four layers'),
      h('p', null, claimText(spec, 'tests-vs-layers'), h(SourceRef, { spec, sourceId: 's-edition' })),
      h('ol', { className: 'tk-used' }, ...D.layers.map(l => h('li', { key: l.id }, h('strong', null, `${l.name}: `), l.question, h(ClaimRef, { spec, claimId: l.claimId }))))),

    h('section', { className: 'tk-sec', 'aria-labelledby': 'tst-h' }, h('h2', { id: 'tst-h' }, 'The four tests'),
      h('ol', { className: 'tk-used' }, ...D.tests.map(t => h('li', { key: t.id }, h('strong', null, `${t.name}: `), t.question, h(ClaimRef, { spec, claimId: t.claimId })))),
      h('p', null, claimText(spec, 'arg'), h(ClaimRef, { spec, claimId: 'arg' }))),

    // No scripting: a blank sheet to print and fill in by hand. Hidden when scripting runs.
    h('section', { className: 'tk-sec tk-print no-js-only', 'aria-labelledby': 'blank-h' }, h('h2', { id: 'blank-h' }, 'A blank sheet to print'),
      h('p', null, 'Scripting is off, so the list builder is hidden. Print this sheet. For each dependency, write its name, pick a layer, and tick a box when the answer to that test is yes. The dependency with the fewest ticks comes first.'),
      h('div', { className: 'tk-scroll' }, h('table', { className: 'tk-t stack' }, h('caption', null, 'Up to five dependencies'),
        h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Dependency'), h('th', { scope: 'col' }, 'Layer'), ...D.tests.map(t => h('th', { scope: 'col', key: t.id }, t.name)))),
        h('tbody', null, ...Array.from({ length: D.maxItems }, (_, i) => h('tr', { key: i }, h('th', { scope: 'row' }, `Dependency ${i + 1}`), h('td', { 'data-label': 'Layer' }, ' '), ...D.tests.map(t => h('td', { key: t.id, 'data-label': t.name }, '☐')))))))),

    h('section', { className: 'tk-sec js-only', 'aria-labelledby': 'list-h' }, h('h2', { id: 'list-h' }, 'List your dependencies'),
      h('div', { className: 'tk-card' },
        h('p', { id: 'rank-help', className: 'tk-help' }, `Add up to ${MAX_ITEMS}. Tick a box when your answer to that test is yes. Nothing you type leaves this page.`),
        !items.length ? h('p', { className: 'tk-note' }, D.templates.empty) : null,
        ...items.map((it, i) => h('fieldset', { className: 'tk-fieldset', key: it.id },
          h('legend', null, displayName(it, i + 1)),
          h('div', { className: 'tk-row' },
            h('label', { className: 'tk-field' }, 'What is it called?', h('input', { type: 'text', id: `dep-${it.id}-name`, value: it.name, maxLength: 60, autoComplete: 'off', onChange: e => update(it.id, { name: e.target.value }) })),
            h('label', { className: 'tk-field' }, 'Which layer is it in?', h('select', { value: it.layerId, onChange: e => update(it.id, { layerId: e.target.value }) },
              h('option', { value: '' }, 'Not sure'), ...D.layers.map(l => h('option', { value: l.id, key: l.id }, `${l.name}: ${l.question}`))))),
          ...D.tests.map(t => h('label', { className: 'tk-check', key: t.id }, h('input', { type: 'checkbox', checked: !!it.met[t.id], onChange: () => toggle(it.id, t.id) }), h('span', null, h('strong', null, t.name), `: ${t.question}`))),
          h('button', { type: 'button', className: 'tk-btn', onClick: () => remove(it.id), 'aria-label': `Remove ${displayName(it, i + 1)}` }, 'Remove'))),
        h('div', { className: 'tk-row' },
          h('button', { type: 'button', className: 'tk-btn primary', onClick: add, disabled: full, 'aria-describedby': full ? 'rank-full' : 'rank-help' }, 'Add a dependency'),
          h('button', { type: 'button', className: 'tk-btn', onClick: reset, disabled: !items.length }, 'Start over')),
        full ? h('p', { id: 'rank-full', className: 'tk-help' }, `That is the limit of ${MAX_ITEMS}. Remove one to add another.`) : null)),

    h('section', { className: 'tk-sec tk-print js-only', 'aria-labelledby': 'rank-h' }, h('h2', { id: 'rank-h' }, 'Weakest first'),
      h(ResultCard, { spec, headline: res.headline, basis: res.basis, lines: [], note: '', payload: { lines: res.lines.map(l => l.text), text: () => asText(items, D, closingText), txt: () => asText(items, D, closingText) } }),
      items.length ? h('ol', { className: 'tk-list-ranked', 'aria-label': 'Your dependencies, weakest first' }, ...ranked.map(r => h('li', { key: r.item.id },
        h('p', null, h('span', { className: 'tk-tag' }, `#${r.rank}`), h('strong', null, r.name), r.tied ? h('span', { className: 'tk-tag' }, D.templates.tiedWord) : null),
        h('p', null, h(BasisTag, { basis: 'input' }), r.count === 0 ? ' ' + D.templates.allMet.replace(/^./, c => c.toUpperCase()) : ' ' + `${r.count === 1 ? 'One test is' : `${r.count} tests are`} not met: ${r.unmet.map(t => t.name).join(', ')}.`),
        r.item.layerId ? h('p', { className: 'tk-help' }, `Layer: ${D.layers.find(l => l.id === r.item.layerId).name}`) : null))) : null,
      items.length ? h('p', null, closing.text, h(ClaimRef, { spec, claimId: closing.claimId }), ...(extra ? [' ', extra.text, h(ClaimRef, { spec, claimId: extra.claimId })] : [])) : null),

    h('section', { className: 'tk-sec', 'aria-labelledby': 'cases-h' }, h('h2', { id: 'cases-h' }, 'Cases in the edition'),
      h('p', null, claimText(spec, 'cases'), h(ClaimRef, { spec, claimId: 'cases' })),
      h('ul', { className: 'tk-used' }, ...D.cases.map(c => h('li', { key: c.sourceId }, c.label, h(SourceRef, { spec, sourceId: c.sourceId })))),
      h('p', null, claimText(spec, 'sort'), h(ClaimRef, { spec, claimId: 'sort' }))));
}
