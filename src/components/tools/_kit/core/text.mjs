// Small text helpers shared by every tool. Pure functions, no DOM, no Date.
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_RE = MONTHS.join('|');

/** "Month D, YYYY" from numbers. */
export const dateWords = (y, m, d) => `${MONTHS[m - 1]} ${d}, ${y}`;

/** True when the string is exactly "Month D, YYYY" with a real month name and a possible day. */
export function isMonthDYYYY(s) {
  const m = new RegExp(`^(${MONTH_RE}) (\\d{1,2}), (\\d{4})$`).exec(String(s));
  if (!m) return false;
  const d = +m[2];
  return d >= 1 && d <= 31;
}

/** Parses "Month D, YYYY" to {y, m, d} or null. */
export function parseMonthDYYYY(s) {
  const m = new RegExp(`^(${MONTH_RE}) (\\d{1,2}), (\\d{4})$`).exec(String(s));
  if (!m) return null;
  return { y: +m[3], m: MONTHS.indexOf(m[1]) + 1, d: +m[2] };
}

/** Sortable integer from "Month D, YYYY" (YYYYMMDD), or null. */
export function dateKey(s) {
  const p = parseMonthDYYYY(s);
  return p ? p.y * 10000 + p.m * 100 + p.d : null;
}

/** "a", "a and b", "a, b and c" (no Oxford comma, as the site writes it). */
export function joinList(items) {
  const a = items.map(String).filter(Boolean);
  if (a.length <= 1) return a.join('');
  return `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`;
}

export const plural = (n, one, many = one + 's') => `${n} ${n === 1 ? one : many}`;
export const normalizeWs = s => String(s).replace(/\s+/g, ' ').trim();
export const wordCount = s => (normalizeWs(s).match(/\S+/g) || []).length;

/** Escapes text for HTML. */
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** CSV cell per RFC 4180. */
export const csvCell = s => { const t = String(s ?? ''); return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
export const csvRow = cells => cells.map(csvCell).join(',');
