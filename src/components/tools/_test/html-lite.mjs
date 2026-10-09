// A very small HTML parser for tests (well-formed markup only: ours). No installs.
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'col', 'wbr', 'source']);
const RAW = new Set(['script', 'style']);
const decode = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');

export function parse(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z0-9-]+)\s*>|<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)/gi;
  let m;
  while ((m = re.exec(html))) {
    const top = stack[stack.length - 1];
    if (m[0].startsWith('<!')) continue;
    if (m[1]) { // closing
      const i = stack.map(n => n.tag).lastIndexOf(m[1].toLowerCase());
      if (i > 0) stack.length = i;
    } else if (m[2]) {
      const tag = m[2].toLowerCase();
      const attrs = {};
      m[3].replace(/([^\s=>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g, (_, k, a, b, c) => { attrs[k.toLowerCase()] = decode(a ?? b ?? c ?? ''); return ''; });
      const node = { tag, attrs, children: [] };
      top.children.push(node);
      if (RAW.has(tag)) {
        const end = html.toLowerCase().indexOf(`</${tag}>`, re.lastIndex);
        node.children.push({ text: html.slice(re.lastIndex, end) });
        re.lastIndex = end + tag.length + 3;
      } else if (!VOID.has(tag) && !m[4]) stack.push(node);
    } else if (m[5] !== undefined) {
      top.children.push({ text: decode(m[5]) });
    }
  }
  return root;
}

export const isEl = n => n && n.tag;
export function text(n) { return n.text !== undefined ? n.text : (n.children || []).map(text).join(''); }
export function walk(n, f) { if (isEl(n)) { f(n); n.children.forEach(c => walk(c, f)); } }

const cmpMatch = (node, comp) => {
  if (comp.tag && node.tag !== comp.tag) return false;
  for (const c of comp.classes) if (!(node.attrs.class || '').split(/\s+/).includes(c)) return false;
  if (comp.id && node.attrs.id !== comp.id) return false;
  for (const a of comp.attrs) {
    const v = node.attrs[a.name];
    if (v === undefined) return false;
    if (a.op === '=' && v !== a.val) return false;
    if (a.op === '^=' && !v.startsWith(a.val)) return false;
  }
  return true;
};
const compound = s => {
  const comp = { tag: '', classes: [], id: '', attrs: [] };
  const re = /^([a-z0-9-]+)|\.([\w-]+)|#([\w-]+)|\[([\w-]+)(?:(\^?=)([^\]]*))?\]/g;
  let m;
  while ((m = re.exec(s))) { if (m[1]) comp.tag = m[1]; else if (m[2]) comp.classes.push(m[2]); else if (m[3]) comp.id = m[3]; else comp.attrs.push({ name: m[4], op: m[5] || '', val: (m[6] || '').replace(/^"|"$/g, '') }); }
  return comp;
};
/** select(root, "section.tk-sources li.tk-src[id^=src-]") -> nodes (descendant combinators only) */
export function select(root, selector) {
  const comps = selector.trim().split(/\s+/).map(compound);
  const out = [];
  const visit = (n, ancestors) => {
    if (!isEl(n)) return;
    const chain = [...ancestors, n];
    const last = comps[comps.length - 1];
    if (cmpMatch(n, last)) {
      let ci = comps.length - 2, ai = chain.length - 2;
      while (ci >= 0 && ai >= 0) { if (cmpMatch(chain[ai], comps[ci])) ci--; ai--; }
      if (ci < 0) out.push(n);
    }
    n.children.forEach(c => visit(c, chain));
  };
  root.children.forEach(c => visit(c, []));
  return out;
}

/** Canonical serialization: sorted attributes, collapsed whitespace, no comments. Equal markup gives equal strings. */
export function canon(n) {
  if (n.text !== undefined) return n.text.replace(/\s+/g, ' ');
  const attrs = Object.keys(n.attrs).sort().map(k => (n.attrs[k] === '' ? k : `${k}="${n.attrs[k]}"`)).join(' ');
  const inner = n.children.map(canon).join('');
  if (n.tag === '#root') return inner;
  return VOID.has(n.tag) ? `<${n.tag}${attrs ? ' ' + attrs : ''}>` : `<${n.tag}${attrs ? ' ' + attrs : ''}>${inner}</${n.tag}>`;
}
export const canonHtml = html => canon(parse(html)).replace(/> </g, '><').trim();
