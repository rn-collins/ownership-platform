// Quote lock (design 2.6 item 2): every storyQuote must appear verbatim, whitespace normalized, in the story text.
import { normalizeWs } from './text.mjs';
/** @returns {string[]} error strings; empty when every quote is found. */
export function quoteLock(spec, storyText) {
  const hay = normalizeWs(storyText);
  const errs = [];
  for (const c of spec.claims) {
    if (c.basis === 'story' && !c.storyQuote) errs.push(`${c.id}: basis story needs a storyQuote`);
    if (c.storyQuote && !hay.includes(normalizeWs(c.storyQuote))) errs.push(`${c.id}: storyQuote not found verbatim in the story text: "${c.storyQuote}"`);
  }
  return errs;
}
