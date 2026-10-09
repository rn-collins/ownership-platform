// After `next build`: node scripts/check-tools-built.mjs
// Reads the prerendered HTML of /tools and each tool page (.next/server/app/tools*) and checks what a visitor, a search engine and a
// screen reader meet: noindex while the release is "review", one h1, one main, one banner and one footer landmark, no heading level skipped,
// the whole reading path present with scripting off, no control shown that needs scripting, held text absent, the kit contract met,
// the house voice, no tool in the sitemap, and the open graph image pointing at a file that exists.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const T = path.join(root, "src/components/tools");
const imp = (rel) => import(pathToFileURL(path.join(T, rel)).href);
const { parse, select, text, walk, isEl } = await imp("_test/html-lite.mjs");
const { readingPath, structure } = await imp("_test/pilot-checks.mjs");
const { checkContract, deadControls } = await imp("_test/contract.mjs");
const { lintHtml, errorsOnly, format } = await imp("_kit/check/voice-lint.mjs");
const { filterApproved, collectNeedsRn } = await imp("_kit/core/approved.mjs");

const appDir = path.join(root, ".next/server/app");
const read = (f) => fs.readFileSync(f, "utf8");
const tools = [
  { slug: "four-questions-map", dir: "ed001-map", contract: null },
  { slug: "dependency-ranker", dir: "ed002-ranker", contract: null },
  { slug: "framework-strip", dir: "framework-strip", contract: ["ToolShell", "ToolHeader", "LimitsBand", "SourceDrawer", "OriginBar"] },
];
let failed = 0;
const fail = (where, msg) => { failed++; console.error(`FAIL ${where}: ${msg}`); };
const expect = (where, cond, msg) => { if (!cond) fail(where, msg); };

/** Landmarks a screen reader lists: header and footer are page-level only outside article, aside, main, nav and section. */
function landmarks(rootNode) {
  const found = { banner: 0, main: 0, contentinfo: 0, navigation: 0, complementary: 0 };
  const visit = (n, scoped) => {
    if (!isEl(n)) return;
    if (n.tag === "main" || n.attrs.role === "main") found.main++;
    if (n.tag === "nav") found.navigation++;
    if (n.tag === "aside") found.complementary++;
    if (n.tag === "header" && !scoped) found.banner++;
    if (n.tag === "footer" && !scoped) found.contentinfo++;
    const next = scoped || ["article", "aside", "main", "nav", "section"].includes(n.tag);
    n.children.forEach((c) => visit(c, next));
  };
  rootNode.children.forEach((c) => visit(c, false));
  return found;
}

const sitemapFile = path.join(appDir, "sitemap.xml.body");
if (fs.existsSync(sitemapFile)) expect("sitemap", !/\/tools/.test(read(sitemapFile)), "a /tools address is in the sitemap");
else console.log("note: sitemap body not found, skipped");

const pages = [{ name: "hub", file: path.join(appDir, "tools.html"), url: "/tools" }, ...tools.map((t) => ({ ...t, name: t.slug, file: path.join(appDir, "tools", `${t.slug}.html`), url: `/tools/${t.slug}` }))];
for (const p of pages) {
  const where = p.url;
  if (!fs.existsSync(p.file)) { fail(where, `no prerendered page at ${path.relative(root, p.file)}`); continue; }
  const html = read(p.file);
  const doc = parse(html);
  const spec = p.dir ? JSON.parse(read(path.join(T, p.dir, "spec.json"))) : null;
  // search and sharing
  expect(where, /<meta name="robots" content="noindex, nofollow"/.test(html), "missing noindex");
  expect(where, new RegExp(`<link rel="canonical" href="[^"]*${p.url}"`).test(html), "missing canonical");
  for (const k of ["og:title", "og:description", "og:url", "og:image", "og:image:alt", "twitter:card"]) expect(where, new RegExp(`(property|name)="${k}"`).test(html), `missing ${k}`);
  const og = /property="og:image" content="([^"]+)"/.exec(html);
  if (og) { const rel = new URL(og[1], "https://x.test").pathname; expect(where, rel === "/opengraph-image" || fs.existsSync(path.join(root, "public", rel)), `og:image ${rel} does not exist`); }
  // landmarks and structure
  const lm = landmarks(doc);
  expect(where, lm.main === 1, `${lm.main} main landmarks`);
  expect(where, lm.banner === 1, `${lm.banner} banner landmarks`);
  expect(where, lm.contentinfo === 1, `${lm.contentinfo} footer landmarks`);
  expect(where, select(doc, "h1").length === 1, `${select(doc, "h1").length} h1`);
  expect(where, select(doc, "a.skip-link").length === 1 && select(doc, "#main").length === 1, "site skip link or its target is missing");
  for (const e of structure(html)) fail(where, e);
  // the part this integration owns: the article (tool pages) or main (hub)
  const frag = (/<article[\s\S]*<\/article>/.exec(html) || /<main[\s\S]*<\/main>/.exec(html) || [""])[0];
  expect(where, frag.length > 0, "no article or main to check");
  const lint = errorsOnly(lintHtml(frag, where, spec?.voiceExceptions?.map((e) => e.text) || []));
  if (lint.length) fail(where, format(lint));
  expect(where, !/<script[^>]*src="https?:/.test(frag) && !/<(img|link|iframe)[^>]*(src|href)="https?:\/\/(?!commons\.wikimedia|creativecommons|www\.)/.test(frag.replace(/<a [^>]*>/g, "")), "a third-party resource is loaded");
  if (spec) {
    const rp = readingPath({ spec, html: frag });
    if (rp.missing.length) fail(where, `reading path is missing: ${rp.missing.join(", ")}`);
    if (rp.held.length) fail(where, `held text rendered: ${rp.held.join(" | ")}`);
    const dead = deadControls(frag);
    if (dead.length) fail(where, `controls shown without scripting: ${dead.join(" ; ")}`);
    for (const e of checkContract(frag, filterApproved(spec), p.contract || undefined)) fail(where, e);
    const ld = /<script type="application\/ld\+json">([^<]*)<\/script>/.exec(frag);
    if (!ld) fail(where, "no JSON-LD"); else { try { const j = JSON.parse(ld[1]); expect(where, j["@type"] === "WebApplication" && j.author?.name === "RN Collins" && !/anatomist|educator|J\.D\./i.test(ld[1]), "JSON-LD is wrong"); } catch { fail(where, "JSON-LD does not parse"); } }
    expect(where, !/work with rn/i.test(frag), "client line on a tool page");
  } else {
    const links = select(doc, "main a").map((a) => a.attrs.href);
    for (const t of tools) expect(where, links.includes(`/tools/${t.slug}`), `hub does not link /tools/${t.slug}`);
    for (const img of select(doc, "main img")) expect(where, img.attrs.alt && img.attrs.width && img.attrs.height && !/\.(jpe?g|png)/i.test(img.attrs.alt), "hub image needs alt, width and height");
  }
  if (!failed) console.log(`ok   ${where}`);
}
console.log(failed ? `\n${failed} problem(s) in the built tools pages` : "\nall built tools pages passed");
process.exit(failed ? 1 : 0);
