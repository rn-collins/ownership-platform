// Tool card model (design 4.2): 1080 x 1350, 64 px margin, 8 px program keyline, graph-paper headline strip,
// bottom panel with three mono lines of 42 characters or fewer. Pure layout: the canvas drawing lives in html/card-canvas.mjs.
export const CARD = Object.freeze({ width: 1080, height: 1350, margin: 64, keyline: 8, panelMaxChars: 42, headlineMin: 56, grid: 54 });
export const HASHTAG_LINE = 'RN Collins · #renaissancex2m3';

/** Greedy word wrap using a measure(text) -> width function. */
export function wrapLines(text, maxWidth, measure) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && measure(next) > maxWidth) { lines.push(cur); cur = w; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Panel lines. Returns {lines, errors}; errors name any line over 42 characters. */
export function panelLines({ name, sourceShort }) {
  const lines = [`Tool: ${name}`, `Source: ${sourceShort}`, HASHTAG_LINE];
  const errors = lines.filter(l => [...l].length > CARD.panelMaxChars).map(l => `panel line over ${CARD.panelMaxChars} characters (${[...l].length}): ${l}`);
  return { lines, errors };
}

/**
 * @param {{name:string, sourceShort:string, originId:string, headline:string, lines:string[], program:'TFH'|'IOO'}} m
 * @param {(text:string, px:number, weight:number)=>number} measure
 */
export function layoutToolCard(m, measure) {
  const inner = CARD.width - 2 * CARD.margin - 2 * CARD.keyline - 2 * 44; // headline text width inside the strip padding
  // headline: start at 76 px, step down to the 56 px floor until it fits in five lines
  let size = 76, hl = [];
  for (const px of [76, 66, 60, 56]) { size = px; hl = wrapLines(m.headline, inner, t => measure(t, px, 800)); if (hl.length <= 5) break; }
  const body = m.lines.flatMap(l => wrapLines(l, inner, t => measure(t, 42, 600))).slice(0, 8);
  const panel = panelLines(m);
  const errors = [...panel.errors];
  if (hl.length > 5) errors.push('headline needs more than five lines at the 56 px floor; shorten it');
  return {
    width: CARD.width, height: CARD.height, program: m.program,
    plate: `TOOL  ${m.originId}`, headline: { lines: hl, size }, body: { lines: body, size: 42 },
    panel: panel.lines, errors,
  };
}

/** Alt text offered next to the download button. */
export const cardAltText = m => `Graph-paper card. Headline: ${m.headline} ${m.lines.join(' ')} Footer: Tool ${m.name}. RN Collins.`;
