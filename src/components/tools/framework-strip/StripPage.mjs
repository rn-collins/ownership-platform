// The framework strip on its own review page: the kit's shell (header, limits, sources, back to the edition) around the strip.
// A server component. It renders the kit's ToolShell (a client component) and the strip (a server component) as its child.
// The home page keeps its own section until RN flips this to public.
import React from 'react';
import { ToolShell } from '../_kit/react/index.mjs';
import FrameworkStrip from './FrameworkStrip.mjs';

export default function StripPage({ spec, related = [], crumbs = [], siteLinks = {} }) {
  const e = React.createElement;
  return e(ToolShell, { spec, related, crumbs, siteLinks },
    e('section', { className: 'tk-sec', 'aria-labelledby': 'fs-page-h' },
      e('h2', { id: 'fs-page-h' }, 'The strip as it would sit on the home page'),
      e(FrameworkStrip, { spec })));
}
