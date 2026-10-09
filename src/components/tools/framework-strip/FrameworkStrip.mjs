// X3 Framework strip for the main home page. A server component: no state, no hooks, no kit client code.
// It replaces the four-cell "question-grid" row on the home page. Each cell holds the Edition 001 question, a photograph with its credit,
// and a link to the edition. Under the cells: a link to the Four questions map and one line about Edition 008.
// Usage:  <FrameworkStrip spec={filterApproved(spec)} />   and import ./strip.css once. Images in ./images are served at spec.data.imageBase.
import React from 'react';

const e = React.createElement;

function Photo({ spec, id }) {
  const img = spec.data.images.find(i => i.id === id);
  if (!img) return null;
  return e('figure', { className: 'fs-photo' },
    e('img', { src: spec.data.imageBase + img.file, alt: img.alt, width: img.width, height: img.height, loading: 'lazy', decoding: 'async' }),
    e('figcaption', null, img.precision === 'illustrative' ? 'Illustrative photo. ' : '', `Photo: ${img.creator}, `,
      img.licenceUrl ? e('a', { href: img.licenceUrl, rel: 'noopener' }, img.licence) : img.licence, ', via ',
      e('a', { href: img.sourcePage, rel: 'noopener', 'aria-label': `Wikimedia Commons, photo page for the picture by ${img.creator}` }, 'Wikimedia Commons'), '.'));
}

const claim = (spec, id) => { const c = spec.claims.find(x => x.id === id); if (!c) throw new Error('unknown or unapproved claim ' + id); return c.text; };

export default function FrameworkStrip({ spec }) {
  const D = spec.data;
  return e('div', { className: 'fs', 'data-tool': spec.id },
    e('ol', { className: 'fs-cells', 'aria-label': 'The four questions of Edition 001' },
      ...D.cells.map(c => e('li', { key: c.id, className: 'fs-cell' },
        e(Photo, { spec, id: c.imageId }),
        e('p', { className: 'fs-num' }, e('span', { 'aria-hidden': 'true' }, c.number), e('strong', null, c.name)),
        e('p', { className: 'fs-q' }, claim(spec, c.claimId)),
        e('a', { className: 'fs-link', href: c.href }, c.linkLabel)))),
    e('p', { className: 'fs-map' }, e('a', { className: 'fs-maplink', href: D.map.href }, D.map.label)),
    e('p', { className: 'fs-e008' }, claim(spec, D.edition008.claimId), ' ', e('a', { href: D.edition008.href }, D.edition008.linkLabel), '.'));
}
