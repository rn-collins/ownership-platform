// Pure helpers for the Observatory case pages. No I/O; everything here derives from
// the existing case records (src/lib/case_research.ts).
// Nothing in this file adds facts — it only selects, orders, counts, and formats.
import type { CaseResearchRecord, CaseResearchSource } from "@/lib/case_research";

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
 * One numbered source list per case: the research record's sources, in order. The status
 * line, the sources section, the documentation ledger, and the Evidence Explorer all count
 * from this list (or from the same record), so the numbers cannot disagree. Headline-only
 * rows from the older narrative summaries are not added here: a row appears only when the
 * research record gives its outlet, title, date, and URL and a claim cites it.
 */
export function collectSources(research: CaseResearchRecord | undefined): CaseSource[] {
  return (research?.sources ?? []).map((source, index) => ({ ...source, number: index + 1 }));
}

/**
 * Only independent reporting counts as independent. Sources that are authored or co-authored by
 * the subject, interviews in which the subject describes their own work, republished reports
 * that add nothing new, and primary or institutional records are all counted as other sources.
 */
export function isIndependent(source: Pick<CaseResearchSource, "kind">): boolean {
  return source.kind === "independent";
}

export function countSources(sources: Pick<CaseResearchSource, "kind">[]) {
  const independent = sources.filter(isIndependent).length;
  return { total: sources.length, independent, other: sources.length - independent };
}

const KIND_LABELS: Record<CaseResearchSource["kind"], string> = {
  independent: "Independent reporting",
  primary: "Primary source",
  institutional: "Institutional source",
  interview: "Subject interview",
  self_authored: "Self-authored",
  derivative: "Republished report",
  reference: "Reference work (secondary)",
};

export function sourceKindLabel(kind: CaseResearchSource["kind"]) {
  return KIND_LABELS[kind];
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const LONG_DATE = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Human-readable date in "Month D, YYYY" form, for example "July 28, 2026". Accepts a Date, an ISO
 * "YYYY-MM-DD" string, or a "YYYY-MM" string (shown as "May 2022"). ISO dates inside a longer string
 * are converted in place. Anything else, such as a bare year or "Current record", is returned unchanged.
 */
export function formatLongDate(value: Date | string): string {
  if (value instanceof Date) return LONG_DATE.format(value);
  return value.replace(/\b(\d{4})-(\d{2})(?:-(\d{2}))?\b/g, (whole, year: string, month: string, day?: string) => {
    const monthIndex = Number(month) - 1;
    if (monthIndex < 0 || monthIndex > 11) return whole;
    if (day === undefined) return `${MONTHS[monthIndex]} ${year}`;
    const dayNumber = Number(day);
    if (dayNumber < 1 || dayNumber > 31) return whole;
    return `${MONTHS[monthIndex]} ${dayNumber}, ${year}`;
  });
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
    // Inflected forms ("succeeded", "survived", "disappears", "continued") that the exact words above miss.
    /\b(succe\w+|surviv\w*|outlast\w*|disappear\w*)/i,
    /\bcontinu\w*/i,
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
    { key: "Continue", prompt: "What persists if a dependency changes", label: continueQ ? "Open question" : "Not publicly documented", text: continueQ ?? "The public record reviewed for this case does not say what continues if this person's role, employer, or relationship changes." },
  ];
}
