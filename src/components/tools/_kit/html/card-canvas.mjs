// Draws the downloadable tool card (design 4.2) on a canvas: 1080 x 1350, no network, no generated imagery,
// no type on a photograph (there is no photograph). Fonts are the self-hosted Inter and IBM Plex Mono.
import { CARD, layoutToolCard, cardAltText } from '../core/card.mjs';

const INK = '#222428', PAPER = '#F7F6F2', PROGRAM = { TFH: '#4F8A2E', IOO: '#F05A22' }, PLATE = { TFH: '#3A6A22', IOO: '#A33A0E' };

export async function loadCardFonts() {
  if (!document.fonts || !document.fonts.load) return;
  await Promise.all(['800 56px Inter', '600 42px Inter', '400 32px "IBM Plex Mono"'].map(f => document.fonts.load(f, 'Aaʻā')));
}

/** @returns {Promise<{layout:object, alt:string}>} */
export async function drawToolCard(canvas, model) {
  await loadCardFonts();
  canvas.width = CARD.width; canvas.height = CARD.height;
  const ctx = canvas.getContext('2d');
  const font = (px, weight) => `${weight} ${px}px Inter, system-ui, sans-serif`;
  const measure = (t, px, weight) => { ctx.font = font(px, weight); return ctx.measureText(t).width; };
  const layout = layoutToolCard(model, measure);
  if (layout.errors.length) throw new Error(layout.errors.join('; '));
  const M = CARD.margin, K = CARD.keyline;
  ctx.fillStyle = '#E9E8E3'; ctx.fillRect(0, 0, CARD.width, CARD.height);
  ctx.fillStyle = PAPER; ctx.fillRect(M, M, CARD.width - 2 * M, CARD.height - 2 * M);
  ctx.strokeStyle = PROGRAM[model.program]; ctx.lineWidth = K;
  ctx.strokeRect(M + K / 2, M + K / 2, CARD.width - 2 * M - K, CARD.height - 2 * M - K);
  const x0 = M + K + 44, w = CARD.width - 2 * (M + K + 44) + 0;

  // mono plate
  ctx.font = '400 30px "IBM Plex Mono", ui-monospace, monospace';
  const pw = ctx.measureText(layout.plate).width + 36;
  ctx.fillStyle = PLATE[model.program]; ctx.fillRect(x0, M + K + 40, pw, 56);
  ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(x0, M + K + 40, pw, 56);
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.fillText(layout.plate, x0 + 18, M + K + 40 + 29);

  // headline strip on graph paper (hard edges, grid at 9 percent graphite)
  const lh = Math.round(layout.headline.size * 1.14), pad = 28;
  const sh = layout.headline.lines.length * lh + pad * 2, sy = M + K + 150;
  ctx.fillStyle = PAPER; ctx.fillRect(x0 - pad, sy, w + 2 * pad, sh);
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - pad, sy, w + 2 * pad, sh); ctx.clip();
  ctx.strokeStyle = 'rgba(34,36,40,.09)'; ctx.lineWidth = 2;
  for (let gx = x0 - pad; gx <= x0 - pad + w + 2 * pad; gx += CARD.grid) { ctx.beginPath(); ctx.moveTo(gx, sy); ctx.lineTo(gx, sy + sh); ctx.stroke(); }
  for (let gy = sy; gy <= sy + sh; gy += CARD.grid) { ctx.beginPath(); ctx.moveTo(x0 - pad, gy); ctx.lineTo(x0 - pad + w + 2 * pad, gy); ctx.stroke(); }
  ctx.restore();
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(x0 - pad, sy, w + 2 * pad, sh);
  ctx.fillStyle = INK; ctx.textBaseline = 'alphabetic'; ctx.font = font(layout.headline.size, 800);
  layout.headline.lines.forEach((l, i) => ctx.fillText(l, x0, sy + pad + (i + 1) * lh - Math.round(layout.headline.size * 0.22)));

  // body
  let by = sy + sh + 56; ctx.font = font(layout.body.size, 600);
  for (const l of layout.body.lines) { ctx.fillText(l, x0, by); by += 58; }

  // bottom panel: program outline, three mono lines, none over 42 characters
  const ph = 230, py = CARD.height - M - K - 44 - ph;
  ctx.fillStyle = '#fff'; ctx.fillRect(x0 - pad, py, w + 2 * pad, ph);
  ctx.strokeStyle = PROGRAM[model.program]; ctx.lineWidth = 6; ctx.strokeRect(x0 - pad, py, w + 2 * pad, ph);
  ctx.fillStyle = INK; ctx.font = '400 32px "IBM Plex Mono", ui-monospace, monospace';
  layout.panel.forEach((l, i) => ctx.fillText(l, x0, py + 66 + i * 62));
  return { layout, alt: cardAltText(model) };
}

export const canvasToBlob = canvas => new Promise((res, rej) => canvas.toBlob(b => (b ? res(b) : rej(new Error('toBlob failed'))), 'image/png'));
