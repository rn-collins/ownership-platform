// Writes the sources data for this site's released pieces in the format RN Collins, selected work reads
// (rn-collins/rn-selected-work data/sources-ioo-site.json). Each released edition, case record and interactive tool in
// data/releases.json gets one sources page there, at /sources/ioo/<slug>, where <slug> is the id after "ioo/".
// Held pieces are never written, so nothing about them reaches that site.
//
// What each page lists, taken only from this repository:
//   editions 001 to 004  the sources list on the hand-built page (src/app/(site)/edit/00N/page.tsx)
//   editions 005 onward  the "Sources and further reading" list in content/edit/article-N.md, and the image credits
//                        in src/lib/edit-cycle-one.ts (007: its figures in src/components/Edition007Figure.tsx)
//   cases                the sources of the case record (src/lib/case_research.ts)
//   interactive tools    the pages they are built on
//
// Run from the repository root:
//      npx esbuild scripts/export-selected-work-sources.ts --bundle --platform=node --format=esm --loader:.css=empty --outfile=/tmp/export-sources.mjs
//      node /tmp/export-sources.mjs <path to rn-selected-work>/data/sources-ioo-site.json
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import releases from "../data/releases.json";
import { CASE_RESEARCH } from "../src/lib/case_research";
import { commonsSourceUrl, cycleOneEditions } from "../src/lib/edit-cycle-one";
import { edition007Figures } from "../src/components/Edition007Figure";
import { isReleasedRecord } from "../src/lib/release-rule.mjs";

type Link = { label: string; url: string };
type Image = { where: string; what: string; credit: string; url: string; card: boolean };
type Piece = { id: string; kind: string; title: string; path: string; releasedAt: string; hold: boolean; longFormUrl: string };

const ORIGIN = "https://ownership-platform.vercel.app";
const today = process.env.EXPORT_DATE ?? new Intl.DateTimeFormat("en-CA", { timeZone: "Pacific/Honolulu" }).format(new Date());
const out = process.argv[2];
if (!out) throw new Error("usage: node export-sources.mjs <output json path>");

// Run from the repository root: the bundled script no longer sits in scripts/.
const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
// Page wording carries no em or en dash and no exclamation mark: a range becomes "to", any other dash a hyphen.
const plain = (text: string) => text.replace(/(\d)\s*[\u2013\u2014]\s*(\d)/g, "$1 to $2").replace(/\s*\u2014\s*/g, ", ").replace(/\u2013/g, "-").replace(/!/g, ".");
const unique = (links: Link[]) => links.filter((l, i) => links.findIndex((m) => m.url === l.url) === i);

function handBuiltSources(number: string): Link[] {
  const src = read(`src/app/(site)/edit/${number}/page.tsx`);
  const links: Link[] = [];
  // { label: "...", href: "..." } objects (001, 002)
  for (const m of src.matchAll(/label:\s*"((?:[^"\\]|\\.)*)",\s*href:\s*"(https?:[^"]+)"/g)) links.push({ label: m[1], url: m[2] });
  // ["label", "https://..."] tuples (003)
  for (const m of src.matchAll(/\[\s*"((?:[^"\\]|\\.)*)",\s*"(https?:[^"]+)"\s*\]/g)) links.push({ label: m[1], url: m[2] });
  // inline anchors in the page text (004)
  for (const m of src.matchAll(/<a href="(https?:[^"]+)"[^>]*>([^<]+)<\/a>/g)) links.push({ label: m[2].trim(), url: m[1] });
  return unique(links);
}

function articleSources(articleId: number): Link[] {
  const md = read(`content/edit/article-${articleId}.md`);
  const at = md.search(/^#{2,3} Sources and further reading/m);
  if (at < 0) return [];
  const links: Link[] = [];
  for (const m of md.slice(at).matchAll(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g)) links.push({ label: m[1].replace(/\*/g, ""), url: m[2] });
  return unique(links);
}

function editionImages(number: string): Image[] {
  // Edition 007 carries figures (src/components/Edition007Figure.tsx), each with its credit and source record.
  if (number === "007") return edition007Figures.map((f, i) => ({ where: `Figure ${i + 1}`, what: f.title, credit: f.credit, url: f.sourceUrl, card: false }));
  const edition = cycleOneEditions.find((e) => e.number === number);
  if (!edition) return [];
  return edition.media.map((m, i) => ({
    where: `Image ${i + 1}`,
    what: m.caption,
    credit: `${m.credit}, ${m.rights}`,
    url: commonsSourceUrl(m.file),
    card: false,
  }));
}

function caseSources(slug: string): Link[] {
  const record = CASE_RESEARCH[slug];
  if (!record) throw new Error(`no case research for ${slug}`);
  return unique(record.sources.filter((s) => s.href).map((s) => ({ label: s.publisher ? `${s.label} (${s.publisher})` : s.label, url: s.href })));
}

const TOOL_SOURCES: Record<string, { research: Link[]; other: Link[] }> = {
  "/observatory/dependencies": {
    research: [],
    other: [
      { label: "The 41 case records the explorer reads, each with its own sources", url: `${ORIGIN}/observatory` },
      { label: "How the evidence behind the case records is checked", url: `${ORIGIN}/observatory/evidence` },
    ],
  },
  "/assess/creator": {
    research: [],
    other: [
      { label: "The method behind the Ownership Index: the questions, the five areas and how a result is read", url: `${ORIGIN}/methodology` },
      { label: "The two self-checks, side by side", url: `${ORIGIN}/assess` },
    ],
  },
};

const pieces = (releases as unknown as { pieces: Piece[] }).pieces.filter((p) => isReleasedRecord(p, today));
const posts = pieces.map((p) => {
  const slug = p.id.replace(/^ioo\//, "");
  const number = /^ioo\/edit-(\d{3})$/.exec(p.id)?.[1];
  const caseSlug = /^ioo\/case-(.+)$/.exec(p.id)?.[1];
  const longForm = p.longFormUrl || `${ORIGIN}${p.path}`;
  const longFormLabel = (() => {
    const ed = /\/edit\/(\d{3})$/.exec(longForm)?.[1];
    if (ed) {
      const title = pieces.find((q) => q.id === `ioo/edit-${ed}`)?.title ?? "";
      return `Edition ${ed}: ${title}, in The I/1 Edit`;
    }
    if (longForm.endsWith("/methodology")) return "The Ownership Index method, on Institutions of One";
    return `${p.title}: the case record on Institutions of One`;
  })();
  const base = { slug, date: p.releasedAt, title: p.title, origin: { kind: "article" as const, label: longFormLabel, url: longForm } };
  if (number) {
    const edition = cycleOneEditions.find((e) => e.number === number);
    return { ...base, id: `Edition ${number}`, series: "The I/1 Edit", research: edition ? articleSources(edition.articleId) : handBuiltSources(number), other: [], images: editionImages(number) };
  }
  if (caseSlug) {
    return { ...base, id: `Case: ${p.title}`, series: "Institutions of One Observatory, case record", research: caseSources(caseSlug), other: [], images: [] };
  }
  const tool = TOOL_SOURCES[p.path];
  if (!tool) throw new Error(`no sources set for ${p.id}`);
  return { ...base, id: p.title, series: "Institutions of One Observatory, interactive tool", ...tool, images: [] };
});

for (const p of posts) {
  if (!p.research.length && !p.other.length) throw new Error(`${p.slug} has no sources`);
  p.title = plain(p.title);
  p.origin.label = plain(p.origin.label);
  for (const l of [...p.research, ...p.other]) l.label = plain(l.label);
  for (const im of p.images as Image[]) { im.what = plain(im.what); im.credit = plain(im.credit); }
}
writeFileSync(out, `${JSON.stringify({ generated: today, host: "rn-selected-work.vercel.app", from: "rn-collins/ownership-platform scripts/export-selected-work-sources.ts", posts }, null, 1)}\n`);
console.log(`wrote ${posts.length} sources pages to ${out}`);
