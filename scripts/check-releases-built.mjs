// After `next build`: node scripts/check-releases-built.mjs
// Checks the built site against data/releases.json, the one release record.
// Held pieces: no page (or a prerendered 404), not in the sitemap, their title and address in no served page or script,
// and their files under a folder the middleware guards. Released pieces: a page, a sitemap entry (editions and cases),
// a link from the gallery index, and the link set (posts, source page, long-form, index, previous and next).
// Visual stories on the Public Reader: no link to one before its date.
import fs from "node:fs";
import path from "node:path";
import { root, releases, buildDate, reviewRender, isPublic, isReleased, builtPublicIds } from "./release-state.mjs";

const appDir = path.join(root, ".next/server/app");
const staticDir = path.join(root, ".next");
let failed = 0;
const fail = (where, msg) => { failed++; console.error(`FAIL ${where}: ${msg}`); };
const expect = (where, cond, msg) => { if (!cond) fail(where, msg); };
const read = (f) => fs.readFileSync(f, "utf8");

if (!fs.existsSync(appDir)) { console.error("no build output in .next/server/app; run next build first"); process.exit(1); }
if (reviewRender) { console.log("review render build: held pieces are shown on purpose, release checks skipped"); process.exit(0); }
console.log(`release gate: build date ${buildDate}`);
// The id list the build inlined must be exactly what the record gives for the build date.
const expectedIds = [...releases.pieces, ...releases.related].filter((r) => isReleased(r)).map((r) => r.id).sort();
expect("RELEASED_IDS", JSON.stringify([...builtPublicIds].sort()) === JSON.stringify(expectedIds), "the build's public id list differs from data/releases.json");

// Everything a visitor can be served: prerendered HTML, RSC payloads and route bodies, plus every script and style those pages load.
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
const served = walk(appDir).filter((f) => /\.(html|rsc|body)$/.test(f));
const servedText = new Map(served.map((f) => [f, read(f)]));
const assets = new Set();
for (const text of servedText.values()) for (const m of text.matchAll(/\/_next\/(static\/[^"'\s\\)]+?\.(?:js|css))/g)) assets.add(m[1]);
for (const a of assets) { const f = path.join(staticDir, decodeURIComponent(a)); if (fs.existsSync(f)) servedText.set(f, read(f)); }
console.log(`scanned ${served.length} built pages and ${assets.size} scripts and styles they load`);

const pageFile = (p) => path.join(appDir, `${p.replace(/^\//, "")}.html`);
const metaStatus = (p) => { const m = pageFile(p).replace(/\.html$/, ".meta"); return fs.existsSync(m) ? JSON.parse(read(m)).status ?? 200 : 200; };
const built = (p) => fs.existsSync(pageFile(p)) && metaStatus(p) !== 404;
const sitemapFile = path.join(appDir, "sitemap.xml.body");
const sitemap = fs.existsSync(sitemapFile) ? read(sitemapFile) : "";
expect("sitemap", sitemap.length > 0, "sitemap body not found");
const inSitemap = (p) => sitemap.includes(`${releases.siteOrigin}${p}</loc>`);
const middleware = read(path.join(root, "src/middleware.ts"));
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const foundIn = (needle) => [...servedText].filter(([, t]) => t.includes(needle) || t.includes(escapeHtml(needle))).map(([f]) => path.relative(root, f));

const held = releases.pieces.filter((p) => !isPublic(p));
const released = releases.pieces.filter((p) => isPublic(p));

for (const p of held) {
  const where = `held ${p.id}`;
  expect(where, !built(p.path), `a page was built at ${p.path}`);
  expect(where, !inSitemap(p.path), `${p.path} is in the sitemap`);
  // Tool titles reuse questions from the editions, so a tool is looked for by its address and id instead of its title.
  const needles = [p.kind === "tool" ? p.toolId : p.title, `href="${p.path}"`, `${releases.siteOrigin}${p.path}`, `"${p.path}"`].filter(Boolean);
  const hits = [...new Set(needles.flatMap((n) => foundIn(n)))];
  expect(where, hits.length === 0, `title or address appears in ${hits.slice(0, 5).join(", ")}`);
  for (const asset of p.assets ?? []) {
    const folder = `/${asset.split("/").filter(Boolean)[0]}`;
    expect(where, middleware.includes(`"${folder}/:path*"`) || middleware.includes(`"${folder}"`), `${asset} is not under a folder the middleware guards`);
  }
}

const indexFor = { edition: "/edit", case: "/observatory", tool: "/tools" };
const byKind = (kind) => released.filter((p) => p.kind === kind);
for (const p of released) {
  const where = `released ${p.id}`;
  expect(where, built(p.path) || (p.kind === "case" && fs.existsSync(pageFile(p.path))), `no page built at ${p.path}`);
  if (p.kind !== "tool") expect(where, inSitemap(p.path), `${p.path} is not in the sitemap`);
  const html = fs.existsSync(pageFile(p.path)) ? read(pageFile(p.path)) : "";
  if (!html) continue;
  const has = (href) => html.includes(`href="${href}"`) || html.includes(`href="${escapeHtml(href)}"`);
  for (const post of p.postUrls) expect(where, has(post.url), `no link to its post ${post.url}`);
  if (p.sourcePageUrl) expect(where, has(p.sourcePageUrl), `no link to its source page ${p.sourcePageUrl}`);
  if (p.longFormUrl && p.longFormUrl !== `${releases.siteOrigin}${p.path}`) {
    const local = p.longFormUrl.replace(releases.siteOrigin, "");
    expect(where, has(local) || has(p.longFormUrl), `no link to its long-form ${p.longFormUrl}`);
  }
  expect(where, has(indexFor[p.kind]), `no link to the gallery index ${indexFor[p.kind]}`);
  const list = byKind(p.kind);
  const i = list.indexOf(p);
  if (p.kind === "edition" || p.kind === "case") {
    if (i > 0) expect(where, has(list[i - 1].path), `no link to the previous piece ${list[i - 1].path}`);
    if (i < list.length - 1) expect(where, has(list[i + 1].path), `no link to the next piece ${list[i + 1].path}`);
  }
  const indexFile = pageFile(indexFor[p.kind]);
  if (p.kind === "edition") expect(where, fs.existsSync(indexFile) && read(indexFile).includes(`href="${p.path}"`), `the gallery index ${indexFor[p.kind]} does not link it`);
}

for (const story of releases.related) {
  const where = `visual story ${story.id}`;
  if (story.hold || !(story.releasedAt && story.releasedAt <= buildDate)) {
    const hits = foundIn(story.url);
    expect(where, hits.length === 0, `linked before its date (${story.releasedAt || "no date"}) in ${hits.slice(0, 5).join(", ")}`);
  }
}

console.log(`${released.length} released pieces, ${held.length} held: ${held.map((p) => p.id).join(", ") || "none"}`);
console.log(failed ? `\n${failed} release problem(s) in the build` : "\nthe build matches data/releases.json");
process.exit(failed ? 1 : 0);
