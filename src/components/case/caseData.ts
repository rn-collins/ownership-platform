// Pure helpers for the Observatory case pages. No I/O; everything here derives from
// the existing case records (src/lib/case_research.ts, src/lib/case_narratives.ts).
// Nothing in this file adds facts — it only selects, orders, counts, and formats.
import type { CaseResearchRecord, CaseResearchSource } from "@/lib/case_research";
import type { CaseNarrative } from "@/lib/case_narratives";

export type CaseSource = CaseResearchSource & { number: number };

// Whether a citation points at a specific item or at a site/section landing page.
// This checks the SHAPE of the URL only. It says nothing about whether the link
// resolves or supports the claim — do not present it to readers as verification.
const SECTION_SEGMENT = /^(news|press|about|blog|technology|business|climate-environment|articles|stories|team|people|rulings|topic)$/i;

export function isLandingPage(href: string): boolean {
  let path: string;
  try {
    const url = new URL(href);
    if (url.search || url.hash) return false;
    path = url.pathname;
  } catch {
    return false;
  }
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return true;
  return segments.length === 1 && SECTION_SEGMENT.test(segments[0]);
}

/**
 * One source list per case: the research record's sources, followed by any narrative
 * source whose URL the research record does not already cite. The page's counts and
 * its bottom-of-page list are both derived from this, so they cannot disagree.
 */
export function collectSources(research: CaseResearchRecord | undefined, narrative: CaseNarrative | undefined): CaseSource[] {
  const list: CaseResearchSource[] = [...(research?.sources ?? [])];
  const seen = new Set(list.map((source) => normalizeHref(source.href)));
  (narrative?.sources ?? []).forEach((source, index) => {
    const key = normalizeHref(source.href);
    if (seen.has(key)) return;
    seen.add(key);
    list.push({
      id: `narrative-source-${index + 1}`,
      label: source.label,
      href: source.href,
      publisher: source.label.split(":")[0],
      published: "",
      kind: source.independent ? "independent" : "institutional",
    });
  });
  return list.map((source, index) => ({ ...source, number: index + 1 }));
}

function normalizeHref(href: string) {
  return href.trim().replace(/\/+$/, "").toLowerCase();
}

export function sourceKindLabel(kind: CaseResearchSource["kind"]) {
  return kind === "independent" ? "Independent reporting" : kind === "primary" ? "Primary source" : "Institutional source";
}

const LONG_DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "28 July 2026". Accepts a Date or an ISO "YYYY-MM-DD" string; any other string is returned unchanged. */
export function formatLongDate(value: Date | string): string {
  if (value instanceof Date) return LONG_DATE.format(value);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return value;
  return LONG_DATE.format(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))));
}

/** Two-digit display number used for source references, e.g. 3 → "03". */
export function pad(number: number) {
  return String(number).padStart(2, "0");
}

export type FrameworkCell = { key: "Build" | "Carry" | "Control" | "Continue"; prompt: string; label: string; text: string };

// Keyword routing of the record's OWN open questions onto three parts of the framework.
// Each part has tiers: strong signals are tried across all questions before weak ones.
// Parts resolve in this order, and each open question is used at most once.
const ROUTES: { key: "Continue" | "Carry" | "Control"; tiers: RegExp[] }[] = [
  { key: "Continue", tiers: [
    /\b(continue|continuity|succession|successors?|survive|persist|preserve|sustain)\b/i,
    /\b(beyond|without|leaves?|unavailable|stopped)\b/i,
  ] },
  { key: "Carry", tiers: [
    /\b(mov(?:e|ed|es)|carr(?:y|ied)|portab\w*|travel\w*|export\w*|lawfully|reuse)\b/i,
    /\b(reachable|retain)\b/i,
  ] },
  { key: "Control", tiers: [
    /\b(voting|board|equity|decisions?|govern\w*|control\w*)\b/i,
    /\b(own\w*|rights?|authorit\w*)\b/i,
  ] },
];

export function buildFramework(opts: { built: string; unknowns: string[]; carryFallback: string }): FrameworkCell[] {
  const used = new Set<number>();
  const pick = (key: "Continue" | "Carry" | "Control") => {
    const route = ROUTES.find((candidate) => candidate.key === key)!;
    for (const tier of route.tiers) {
      const index = opts.unknowns.findIndex((item, i) => !used.has(i) && tier.test(item));
      if (index >= 0) { used.add(index); return opts.unknowns[index]; }
    }
    return undefined;
  };
  const continueQ = pick("Continue");
  const carryQ = pick("Carry");
  const controlQ = pick("Control");
  return [
    { key: "Build", prompt: "What was built", label: "Turning point", text: opts.built },
    { key: "Carry", prompt: "What can travel", label: carryQ ? "Open question" : "Test", text: carryQ ?? opts.carryFallback },
    { key: "Control", prompt: "What can be governed", label: controlQ ? "Open question" : "Standard", text: controlQ ?? "The record must establish control; prominence cannot substitute for evidence." },
    { key: "Continue", prompt: "What persists if a dependency changes", label: continueQ ? "Open question" : "Unknown", text: continueQ ?? "Unknown where succession, contracts, governance, or operating capacity are private." },
  ];
}
