// X3 Framework strip: the strip is static data, so the only logic is a check that the markup and the spec agree.
/** The words a visitor reads in the strip, in order. Used by the render test to compare the page with the spec. */
export const stripText = spec => [
  ...spec.data.cells.flatMap(c => [c.name, c.question, c.linkLabel]),
  spec.data.map.label,
  spec.claims.find(c => c.id === spec.data.edition008.claimId).text,
  spec.data.edition008.linkLabel,
];
/** Spec derivation target (no arithmetic claims here; kept so the CLI finds a registry). */
export const derivations = {};
