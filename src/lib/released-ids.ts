// Which pieces are public in this build: the id list next.config.mjs works out from data/releases.json and inlines as
// RELEASED_IDS (the unit tests set it in vitest.config.ts). Safe for browser code: it holds released ids only, and never
// imports the release record, so nothing about a held piece reaches the browser.
const ids = new Set((process.env.RELEASED_IDS ?? "").split(",").filter(Boolean));

export const idIsPublic = (id: string) => ids.has(id);
export const caseIsPublic = (slug: string) => ids.has(`ioo/case-${slug}`);
