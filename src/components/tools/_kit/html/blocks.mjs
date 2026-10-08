// The shared blocks, written once against `h` so the same source renders to a string (static stack) and to
// React elements (Next sites). Interactive pieces come in through `ui`, because they differ per stack:
//   ui.ClaimRef({source, n})            the small superscript number that opens a source
//   ui.CiteButton({text})               "Copy citation"
//   ui.ResultActions({id, share, payload})  copy, link, image, files, print
// Everything here takes a spec that has already passed through filterApproved(), so needs-rn content cannot render.
export const BASIS_LABEL = { story: 'From the story', source: 'From a source', dataset: 'From the data', arithmetic: 'Arithmetic', simulation: 'Simulation', editorial: 'Editorial', input: 'Your input', rule: 'From the rule' };
export const NOT_ADVICE = 'General educational information, not legal advice.';

export const sourceNumber = (spec, id) => spec.sources.findIndex(s => s.id === id) + 1;
export const claimsFor = (spec, sourceId) => spec.claims.filter(c => c.sourceIds.includes(sourceId));
export const claimText = (spec, id) => { const c = spec.claims.find(x => x.id === id); if (!c) throw new Error('claimText: unknown or unapproved claim ' + id); return c.text; };

export function makeBlocks(h, Fragment, ui) {
  const BasisTag = ({ basis }) => h('span', { className: 'tk-basis' }, BASIS_LABEL[basis] || basis);

  /** Superscript number for a source id. */
  const SourceRef = ({ spec, sourceId }) => {
    const n = sourceNumber(spec, sourceId);
    if (!n) throw new Error('SourceRef: unknown or unapproved source ' + sourceId);
    return h(ui.ClaimRef, { source: spec.sources[n - 1], n, claims: claimsFor(spec, sourceId) });
  };
  /** Superscript number for a claim (its first source). */
  const ClaimRef = ({ spec, claimId }) => {
    const c = spec.claims.find(x => x.id === claimId);
    if (!c) throw new Error('ClaimRef: unknown or unapproved claim ' + claimId);
    return h(SourceRef, { spec, sourceId: c.sourceIds[0] });
  };

  const SourceFacts = ({ source: s, claims = [] }) => {
    const rows = [
      ['Publisher', s.publisher],
      s.date && ['Published', s.date],
      s.accessed && ['Checked', s.accessed],
      ['Supports', s.supports],
      claims.length && ['Used for', h('ul', { className: 'tk-used' }, ...claims.map(c => h('li', null, c.text)))],
      s.doesNotSupport && ['Does not show', s.doesNotSupport],
      s.quote && ['The page says', `“${s.quote}”`],
      s.locator && ['Where', s.locator],
      s.recordId && ['Source Desk record', s.recordId],
      s.license && ['License', s.license.label],
      s.check === 'blocked' && ['Note', 'This site blocks automated link checks. Open it to confirm.'],
    ].filter(Boolean);
    return h('dl', null, ...rows.map(([k, v]) => h(Fragment, null, h('dt', null, k), h('dd', null, v))),
      s.archiveUrl ? h(Fragment, null, h('dt', null, 'Archived copy'), h('dd', null, h('a', { href: s.archiveUrl, rel: 'noopener' }, 'Open the archived copy'))) : null);
  };
  const SourceTitle = ({ source: s }) => (s.url ? h('a', { href: s.url, rel: 'noopener' }, s.title) : s.title);

  const ToolHeader = ({ spec }) => {
    const p = spec.promise;
    return h('header', { className: 'tk-head' }, h('div', { className: 'tk-wrap' },
      h('p', null, h('span', { className: 'tk-plate' }, 'TOOL'), h('span', { className: 'tk-plate chip' }, spec.origin.id)),
      h('h1', null, spec.title),
      h('p', { className: 'tk-lede' }, spec.question),
      h('dl', { className: 'tk-facts' },
        h('div', null, h('dt', null, 'You will learn'), h('dd', null, h('ul', null, ...p.learn.map(x => h('li', null, x))))),
        h('div', null, h('dt', null, 'Time'), h('dd', null, `${p.minutes} ${p.minutes === 1 ? 'minute' : 'minutes'}`)),
        h('div', null, h('dt', null, 'You leave with'), h('dd', null, p.leaveWith)),
        h('div', null, h('dt', null, 'Your answers'), h('dd', null, p.privacy))),
      h('p', { className: 'tk-by' }, 'By RN Collins · Based on ', h('a', { href: spec.origin.path }, spec.origin.title))));
  };

  const LimitsBand = ({ spec }) => h('section', { className: 'tk-limits', 'aria-labelledby': 'tk-limits-h' }, h('div', { className: 'tk-wrap' },
    h('h2', { id: 'tk-limits-h' }, 'What this tool shows and what it does not'),
    h('div', { className: 'bar' }, h('h3', null, 'Shows'), h('ul', null, ...spec.limits.shows.map(x => h('li', null, x)))),
    h('div', { className: 'dash' }, h('h3', null, 'Does not show'), h('ul', null, ...spec.limits.doesNotShow.map(x => h('li', null, x)))),
    spec.limits.notAdvice ? h('p', { className: 'tk-advice' }, NOT_ADVICE) : null));

  const SourceDrawer = ({ spec }) => h('section', { className: 'tk-sources', 'aria-labelledby': 'tk-src-h' }, h('div', { className: 'tk-wrap' },
    h('h2', { id: 'tk-src-h' }, 'Where this comes from'),
    h('p', null, 'Every statement carries a small number. The number points to the source that supports it. This tool is based on ', h('a', { href: spec.origin.path }, spec.origin.title), '.'),
    h('ol', { className: 'tk-srclist' }, ...spec.sources.map((s, i) => h('li', { className: 'tk-src', id: `src-${s.id}` },
      h('h3', null, `${i + 1}. `, h(SourceTitle, { source: s })),
      h(SourceFacts, { source: s, claims: claimsFor(spec, s.id) }),
      h(ui.CiteButton, { source: s }))))));

  /** The inline card that opens under a sentence. Same facts as the drawer. */
  const SourcePop = ({ source: s, n, id, claims = [] }) => h('div', { className: 'tk-pop', id, role: 'group', 'aria-label': `Source ${n}: ${s.title}` },
    h('p', { className: 'tk-pop-title' }, `${n}. `, h(SourceTitle, { source: s })), h(SourceFacts, { source: s, claims }), h(ui.CiteButton, { source: s }));

  const OriginBar = ({ spec }) => {
    const o = spec.origin, pk = o.package || {}, live = o.live || {};
    const rows = [
      ['Story', o.path, 'Read the story'],
      pk.carouselZip && ['Slides', pk.carouselZip, 'Download the slides (ZIP)'],
      pk.linkedinPdf && ['LinkedIn', pk.linkedinPdf, 'LinkedIn PDF'],
      pk.pin && ['Pinterest', pk.pin, 'Pinterest pin'],
      live.beehiiv && ['Newsletter', live.beehiiv, 'Read it in the newsletter'],
      live.linkedin && ['LinkedIn post', live.linkedin, 'See the LinkedIn post'],
      live.pinterest && ['Pinterest post', live.pinterest, 'See the Pinterest pin'],
    ].filter(Boolean);
    return h('nav', { className: 'tk-origin tk-wrap', 'aria-labelledby': 'tk-origin-h' }, h('h2', { id: 'tk-origin-h' }, 'Back to the story'),
      h('ul', { className: 'tk-links cols' }, ...rows.map(([kind, url, text]) => h('li', null, h('span', { className: 'kind' }, kind), h('a', { href: url }, text)))));
  };

  /** items come from selectRelated(): approved relations whose other end exists. Renders nothing when there are none. */
  const RelatedRail = ({ items }) => (!items || !items.length ? null : h('aside', { className: 'tk-rail tk-wrap', 'aria-labelledby': 'tk-rail-h' }, h('h2', { id: 'tk-rail-h' }, 'Related tools'),
    h('ul', { className: 'tk-links cols' }, ...items.map(i => h('li', null, h('span', { className: 'kind' }, i.site ? `${i.kind} · ${i.site}` : i.kind), h('a', { href: i.url }, i.title), h('span', { className: 'tk-reason' }, i.reason))))));

  const StatusLine = () => h('p', { className: 'tk-sr', role: 'status', 'aria-live': 'polite', id: 'tk-status' });

  /** The result you can keep. `lines` is the changing part: strings, or {text, basis} so every output line carries its basis tag. */
  const lineText = l => (typeof l === 'string' ? l : l.text);
  const ResultCard = ({ spec, id = 'tk-result', headline, basis, lines, note = '', payload }) => h('section', {
    className: 'tk-result', id, 'aria-labelledby': `${id}-h`, 'data-card-name': spec.card.name, 'data-card-source': spec.card.sourceShort,
    'data-origin-id': spec.origin.id, 'data-program': spec.program, 'data-slug': spec.slug,
  }, h('div', { className: 'tk-result-body' },
    h('h3', { id: `${id}-h` }, headline, basis ? h(BasisTag, { basis }) : null),
    h('div', { className: 'tk-result-lines', 'data-tk-lines': '' }, ...lines.map(l => h('p', null, lineText(l), typeof l === 'string' || !l.basis ? null : h(BasisTag, { basis: l.basis })))),
    note ? h('p', { className: 'tk-result-note' }, note) : null,
    h(ui.ResultActions, { id, share: spec.share, spec, payload: { headline, lines: lines.map(lineText), ...(payload || {}) } })));

  const Crumbs = ({ crumbs, current }) => h('nav', { className: 'tk-wrap', 'aria-label': 'Breadcrumb' }, h('p', { className: 'tk-crumbs' },
    ...crumbs.flatMap(c => [h('a', { href: c.href }, c.label), ' › ']), current));

  /** Everything around a tool. `children` is the mechanic. */
  const ToolShell = ({ spec, related = [], crumbs = [], siteLinks = {}, children }) => h('div', { className: 'tk', 'data-program': spec.program, 'data-tool': spec.id },
    h('a', { className: 'tk-skip', href: '#tk-main' }, 'Skip to the tool'),
    h('div', { className: 'tk-keyline' }),
    h(Crumbs, { crumbs, current: spec.slug }),
    h(ToolHeader, { spec }),
    h('main', { id: 'tk-main', className: 'tk-main', tabIndex: -1 }, h('div', { className: 'tk-wrap' }, h(StatusLine), children)),
    h(LimitsBand, { spec }),
    h(SourceDrawer, { spec }),
    h(OriginBar, { spec }),
    h(RelatedRail, { items: related }),
    h('footer', { className: 'tk-foot' }, h('div', { className: 'tk-wrap' }, h('p', null, 'By RN Collins',
      siteLinks.about ? h(Fragment, null, '. ', h('a', { href: siteLinks.about }, 'About this site')) : null,
      siteLinks.mistake ? h(Fragment, null, ' · ', h('a', { href: siteLinks.mistake }, 'Report a mistake')) : null))));

  return { BasisTag, SourceRef, ClaimRef, SourceFacts, SourceTitle, ToolHeader, LimitsBand, SourceDrawer, SourcePop, OriginBar, RelatedRail, StatusLine, ResultCard, Crumbs, ToolShell };
}
