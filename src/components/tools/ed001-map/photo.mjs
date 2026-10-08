// Photograph with its credit. One figure: the picture shown whole, then creator, licence and source on the page.
// Every photograph is a real, openly licensed file from Wikimedia Commons. Nothing here is generated.
import { h } from '../_kit/react/index.mjs';

export const imageById = (spec, id) => spec.data.images.find(i => i.id === id);

export function Photo({ spec, id, className = '' }) {
  const img = imageById(spec, id);
  if (!img) return null;
  return h('figure', { className: `tkp ${className}`.trim() },
    h('img', { src: spec.data.imageBase + img.file, alt: img.alt, width: img.width, height: img.height, loading: 'lazy', decoding: 'async' }),
    h('figcaption', { className: 'tkp-cap' },
      img.precision === 'illustrative' ? 'Illustrative photo. ' : '',
      `Photo: ${img.creator}, `,
      img.licenceUrl ? h('a', { href: img.licenceUrl, rel: 'noopener' }, img.licence) : img.licence,
      ', via ',
      h('a', { href: img.sourcePage, rel: 'noopener', 'aria-label': `Wikimedia Commons, photo page for the picture by ${img.creator}` }, 'Wikimedia Commons'), '.'));
}
