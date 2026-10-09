// Browser helpers shared by the static kit.js and the React components. Nothing here touches the network.
export function announce(text) {
  const el = typeof document !== 'undefined' && document.getElementById('tk-status');
  if (!el) return;
  // A repeated sentence is still announced: alternate a trailing no-break space.
  el.textContent = el.textContent === text ? text + ' ' : text;
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch { return false; }
  }
}

export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
export const downloadText = (filename, text, type = 'text/plain') => downloadBlob(filename, new Blob([text], { type: `${type};charset=utf-8` }));

/** The plain-text version of a result: headline, lines, tool, source, credit, address. */
export function resultAsText({ headline, lines, name, sourceShort, url }) {
  return [headline, ...lines, '', `Tool: ${name}`, `Source: ${sourceShort}`, 'By RN Collins', url].join('\n');
}
