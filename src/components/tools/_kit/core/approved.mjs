// Approval gate. Only content whose status is "approved" is ever handed to a renderer.
// "needs-rn" content stays in the spec (so nothing is lost) and is listed by collectNeedsRn().
export const isApproved = x => !x || typeof x !== 'object' || x.status === undefined || x.status === 'approved';

const filterArr = a => (Array.isArray(a) ? a.filter(isApproved) : a);

/** Returns a copy of the spec with every needs-rn item removed from the lists renderers use. Pure. */
export function filterApproved(spec) {
  const out = { ...spec };
  out.sources = filterArr(spec.sources);
  out.claims = filterArr(spec.claims);
  if (spec.states) out.states = filterArr(spec.states);
  out.limits = {
    ...spec.limits,
    shows: filterArr(spec.limits.shows.map(x => (typeof x === 'string' ? { text: x, status: 'approved' } : x))).map(x => x.text),
    doesNotShow: filterArr(spec.limits.doesNotShow.map(x => (typeof x === 'string' ? { text: x, status: 'approved' } : x))).map(x => x.text),
  };
  if (spec.data && typeof spec.data === 'object') {
    out.data = {};
    for (const [k, v] of Object.entries(spec.data)) out.data[k] = Array.isArray(v) ? filterArr(v) : v;
  }
  // a rendered claim may only name rendered sources
  const ids = new Set(out.sources.map(s => s.id));
  out.claims = out.claims.filter(c => c.sourceIds.every(i => ids.has(i)));
  return out;
}

/** Every needs-rn item in a spec: [{path, id, text, why}] for the status list. */
export function collectNeedsRn(spec, label = spec.id) {
  const found = [];
  const visit = (node, path) => {
    if (Array.isArray(node)) { node.forEach((x, i) => visit(x, `${path}[${i}]`)); return; }
    if (!node || typeof node !== 'object') return;
    if (node.status === 'needs-rn') found.push({ tool: label, path, id: node.id ?? '', text: node.text ?? node.title ?? node.label ?? node.summary ?? '', why: node.why ?? '' });
    else for (const [k, v] of Object.entries(node)) visit(v, path ? `${path}.${k}` : k);
  };
  visit(spec, '');
  return found;
}
