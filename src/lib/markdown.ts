// Minimal, dependency-free, XSS-safe markdown renderer for the OWNED content home.
//
// Content is written by the authenticated creator but READ by the public, so the
// renderer escapes all HTML FIRST, then applies a safe subset of markdown. No raw
// HTML passthrough, ever. Supported: headings, bold, italic, inline code, links
// (http/https/mailto only), unordered/ordered lists, blockquotes, code fences,
// horizontal rules, paragraphs. Deliberately small; widen later if needed.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Safe inline: escaped text in, limited markdown out. Order matters (code first).
function inline(escaped: string): string {
  let s = escaped;
  // inline code — protect its contents from further formatting
  s = s.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`);
  // links [text](url) — only allow safe schemes
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, url) => {
    const ok = /^(https?:\/\/|mailto:|\/)/i.test(url);
    return ok ? `<a href="${url}" rel="noopener noreferrer nofollow">${text}</a>` : text;
  });
  // bold then italic
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  return s;
}

export function renderMarkdown(src: string): string {
  const lines = escapeHtml(src.replace(/\r\n/g, "\n")).split("\n");
  const out: string[] = [];
  let i = 0;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; }
  };

  while (i < lines.length) {
    const line = lines[i];

    // code fence ``` ... ```
    if (/^```/.test(line.trim())) {
      flushPara();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) { buf.push(lines[i]); i++; }
      i++; // consume closing fence
      out.push(`<pre><code>${buf.join("\n")}</code></pre>`);
      continue;
    }

    // horizontal rule
    if (/^(\*\*\*|---|___)\s*$/.test(line.trim())) { flushPara(); out.push("<hr/>"); i++; continue; }

    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { flushPara(); const lvl = h[1].length; out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); i++; continue; }

    // blockquote (collapse consecutive)
    if (/^>\s?/.test(line)) {
      flushPara();
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`); i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`); i++;
      }
      out.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    // blank line ends a paragraph
    if (line.trim() === "") { flushPara(); i++; continue; }

    para.push(line.trim());
    i++;
  }
  flushPara();
  return out.join("\n");
}

// First ~30 words of plain text, for excerpts and RSS descriptions.
export function plainExcerpt(src: string, words = 30): string {
  const text = src
    .replace(/`{1,3}[^`]*`{1,3}/g, " ")
    .replace(/[#>*_\-\[\]()]/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const parts = text.split(" ").filter(Boolean);
  return parts.slice(0, words).join(" ") + (parts.length > words ? "…" : "");
}
