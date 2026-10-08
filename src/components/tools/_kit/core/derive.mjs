// Derivation check (design 2.6 item 3): arithmetic claims carry {fn, args, expect}; the tool's core exports the named function.
/**
 * @param {object} spec
 * @param {Record<string,(args:any)=>any>} registry functions exported by the tool's core.mjs under `derivations`
 * @returns {string[]} errors
 */
export function runDerivations(spec, registry) {
  const errs = [];
  for (const c of spec.claims) {
    if (c.basis !== 'arithmetic') continue;
    if (!c.derivation) errs.push(`${c.id}: arithmetic claim needs a derivation sentence`);
    if (!c.check || !c.check.fn) { errs.push(`${c.id}: arithmetic claim needs check {fn, args, expect}`); continue; }
    const fn = registry && registry[c.check.fn];
    if (typeof fn !== 'function') { errs.push(`${c.id}: derivation function ${c.check.fn} is not exported by the tool core`); continue; }
    const got = fn(c.check.args);
    if (JSON.stringify(got) !== JSON.stringify(c.check.expect)) errs.push(`${c.id}: derivation ${c.check.fn} gave ${JSON.stringify(got)}, expected ${JSON.stringify(c.check.expect)}`);
  }
  return errs;
}
