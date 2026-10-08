"use client";
// React wrappers for the two Next.js sites (React 18.3 API only: works on main's React 18 and the reader's React 19).
// The markup comes from the same blocks.mjs the static stack uses, so the landmarks match by construction.
// Client behavior (inline source cards, copy, image, files, print) is implemented here with hooks.
import React, { useState, useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { makeBlocks, sourceNumber, claimText } from '../html/blocks.mjs';
import { citation } from '../core/cite.mjs';
import { cardAltText } from '../core/card.mjs';
import { announce, copyText, downloadBlob, downloadText, resultAsText } from '../core/browser.mjs';
import { drawToolCard, canvasToBlob } from '../html/card-canvas.mjs';
import { filterApproved } from '../core/approved.mjs';

const { Fragment, createElement } = React;
const flat = c => (Array.isArray(c) ? c.flatMap(flat) : c === null || c === undefined || c === false || c === true ? [] : [c]);
// Children are spread, so static siblings need no keys.
export const h = (tag, props, ...children) => createElement(tag, props, ...flat(children));

/** Same flag the static stack sets in <head>. Prefer TK_JS_SCRIPT in the layout head to avoid a flash; this is the fallback. */
export function JsFlag() {
  useEffect(() => { document.documentElement.classList.add('tk-js'); }, []);
  return null;
}
export const TK_JS_SCRIPT = "document.documentElement.className+=' tk-js'";

function anchorFor(el) {
  const inside = el.closest('td,th,li,dd,caption,figcaption');
  return inside ? { inside } : { after: el.closest('p,div,section') || el.parentElement };
}

function ClaimRefImpl({ source, n, claims }) {
  const [live, setLive] = useState(false);
  const [host, setHost] = useState(null);
  const btn = useRef(null);
  const popId = useId();
  useEffect(() => setLive(true), []);
  useEffect(() => {
    if (!host) return undefined;
    const onKey = e => { if (e.key === 'Escape') { close(true); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });
  function close(focus) {
    if (host) host.remove();
    setHost(null);
    if (focus && btn.current) btn.current.focus();
  }
  function toggle() {
    if (host) { close(true); return; }
    const el = document.createElement('div');
    el.className = 'tk-pop-host';
    const where = anchorFor(btn.current);
    if (where.inside) where.inside.append(el); else where.after.after(el);
    setHost(el);
  }
  useEffect(() => () => { if (host) host.remove(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const label = `Source ${n}: ${source.title}`;
  if (!live) return h('sup', { className: 'tk-ref' }, h('a', { href: `#src-${source.id}`, 'data-source': source.id, 'aria-label': label }, String(n)));
  return h('sup', { className: 'tk-ref' },
    h('button', { type: 'button', className: 'tk-refbtn', ref: btn, 'aria-expanded': !!host, 'aria-controls': popId, 'aria-label': label, onClick: toggle }, String(n)),
    host ? createPortal(h(Blocks.SourcePop, { source, n, id: popId, claims }), host) : null);
}

function CiteButtonImpl({ source }) {
  return h('button', {
    type: 'button', className: 'tk-btn small js-only', 'data-tk': 'cite', 'data-cite': citation(source),
    onClick: async () => announce((await copyText(citation(source))) ? 'Citation copied.' : 'Copy is not available here. Select the text and copy it.'),
  }, 'Copy citation');
}

function ResultActionsImpl({ id, share, spec, payload }) {
  const p = payload || { headline: '', lines: [] };
  const address = withHash => location.origin + location.pathname + (withHash ? location.hash : '');
  const model = () => ({ name: spec.card.name, sourceShort: spec.card.sourceShort, originId: spec.origin.id, program: spec.program, headline: p.headline, lines: p.lines });
  const btn = (kind, label, onClick) => h('button', { type: 'button', className: 'tk-btn', 'data-tk': kind, onClick }, label);
  const fail = 'Copy is not available here. Select the text and copy it.';
  return h('div', { className: 'tk-row tk-actions js-only', 'data-tk-actions': id },
    share.text ? btn('copy-text', 'Copy as text', async () => announce((await copyText(p.text ? p.text() : resultAsText({ ...model(), url: address(true) }))) ? 'Copied the result as text.' : fail)) : null,
    share.link === 'fragment' ? btn('copy-link', 'Copy link', async () => announce((await copyText(address(true))) ? 'Copied the link.' : fail)) : null,
    share.image ? btn('download-image', 'Download image', async () => {
      try { const c = document.createElement('canvas'); await drawToolCard(c, model()); downloadBlob(`${spec.slug}-card.png`, await canvasToBlob(c)); announce('Image downloaded.'); } catch (e) { announce('The image could not be drawn. ' + (e && e.message ? e.message : '')); }
    }) : null,
    share.image ? btn('copy-alt', 'Copy a description for this image', async () => announce((await copyText(cardAltText(model()))) ? 'Copied a description of the image.' : fail)) : null,
    share.files.includes('txt') ? btn('download-txt', 'Download .txt', () => { downloadText(`${spec.slug}.txt`, p.txt ? p.txt() : resultAsText({ ...model(), url: address(false) })); announce('Text file downloaded.'); }) : null,
    share.files.includes('csv') ? btn('download-csv', 'Download CSV', () => { if (p.csv) { downloadText(`${spec.slug}.csv`, p.csv(), 'text/csv'); announce('CSV file downloaded.'); } }) : null,
    share.print ? btn('print', 'Print or save as PDF', () => window.print()) : null);
}

const Blocks = makeBlocks(h, Fragment, { ClaimRef: ClaimRefImpl, CiteButton: CiteButtonImpl, ResultActions: ResultActionsImpl });

/** Wrapper that filters to approved content (idempotent) and sets the scripting flag. */
export function ToolShell({ spec, ...rest }) {
  return h(Fragment, null, h(JsFlag), h(Blocks.ToolShell, { spec: filterApproved(spec), ...rest }));
}

export const { BasisTag, SourceRef, ClaimRef, ToolHeader, LimitsBand, SourceDrawer, SourcePop, OriginBar, RelatedRail, StatusLine, ResultCard, Crumbs } = Blocks;
export { announce, copyText, downloadText, downloadBlob, filterApproved, sourceNumber, claimText };
