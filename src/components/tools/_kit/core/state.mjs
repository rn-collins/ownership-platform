// StateCodec (block S11): tool state in the URL fragment. The fragment never reaches a server.
// Never use it for personal worksheet content.
/**
 * @param {Record<string,string|number>} obj
 * @returns {string} "k=v&k2=v2" (no leading #)
 */
export function encodeFragment(obj) {
  return Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '').map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&');
}
/**
 * @param {string} fragment "#k=v&..." or "k=v&..."
 * @param {Record<string,(v:string)=>any>} parsers each returns the parsed value, or undefined to reject
 * @returns {Record<string,any>|null} null when anything present is invalid; unknown keys are rejected too
 */
export function decodeFragment(fragment, parsers) {
  const q = new URLSearchParams(String(fragment || '').replace(/^#/, ''));
  const out = {};
  let any = false;
  for (const [k, v] of q) {
    if (!Object.prototype.hasOwnProperty.call(parsers, k)) return null;
    const parsed = parsers[k](v);
    if (parsed === undefined) return null;
    out[k] = parsed; any = true;
  }
  return any ? out : null;
}
