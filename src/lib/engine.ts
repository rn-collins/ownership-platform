// The Ownership Index — pure scoring engine (v1), TypeScript.
// No DOM, no I/O, no framework. The single source of truth for the math,
// imported identically by the web app, the API route, and batch re-scoring.
// Mirror of app/engine.mjs (13/13 tests); typed and made the canonical version.

export const METHODOLOGY_VERSION = "0.2.0";

export type DimensionKey = "audience" | "rights" | "revenue" | "identity" | "infra";
export type ItemId = string;
export type Responses = Partial<Record<ItemId, number>>;
export type EvidenceTierMap = Partial<Record<ItemId, number>>;
export type Aggregation = "additive" | "geometric";

export const WEIGHTS: Record<DimensionKey, number> = {
  audience: 1, rights: 1, revenue: 1, identity: 1, infra: 1,
};

export const DIMENSIONS: { key: DimensionKey; name: string }[] = [
  { key: "audience", name: "Audience Ownership" },
  { key: "rights", name: "Content & Rights" },
  { key: "revenue", name: "Revenue Ownership" },
  { key: "identity", name: "Identity & Likeness" },
  { key: "infra", name: "Business Infrastructure" },
];

export const ITEM_IDS: Record<DimensionKey, ItemId[]> = {
  audience: ["A1", "A2", "A3", "A4"],
  rights: ["R1", "R2", "R3", "R4"],
  revenue: ["V1", "V2", "V3", "V4"],
  identity: ["I1", "I2", "I3", "I4"],
  infra: ["B1", "B2", "B3", "B4"],
};

export const EVIDENCE_TIER = { self: 0.4, auto: 0.8, audited: 1.0 } as const;

const clamp05 = (n: number) => Math.max(0, Math.min(5, Math.round(n)));

export interface DimScore { raw: number; answered: number; of: number; complete: boolean; }

export function scoreDimensions(responses: Responses): Record<DimensionKey, DimScore> {
  const out = {} as Record<DimensionKey, DimScore>;
  for (const { key } of DIMENSIONS) {
    const ids = ITEM_IDS[key];
    const vals = ids.map((id) => (responses[id] == null ? null : clamp05(responses[id]!)));
    const answered = vals.filter((v): v is number => v != null);
    const complete = answered.length >= Math.ceil(ids.length * 0.7);
    const raw = answered.reduce((a, b) => a + b, 0);
    out[key] = { raw, answered: answered.length, of: ids.length, complete };
  }
  return out;
}

export function totalScore(
  dims: Record<DimensionKey, DimScore>,
  { aggregation = "additive" as Aggregation } = {},
): number {
  const keys = DIMENSIONS.map((d) => d.key);
  if (aggregation === "geometric") {
    const prod = keys.reduce((p, k) => p * (dims[k].raw / 20 + 0.01), 1);
    const gm = Math.pow(prod, 1 / keys.length) - 0.01;
    return Math.round(Math.max(0, gm) * 100);
  }
  return keys.reduce((sum, k) => sum + dims[k].raw * WEIGHTS[k], 0);
}

export function dimensionBand(raw: number): number {
  return raw <= 4 ? 0 : raw <= 8 ? 1 : raw <= 12 ? 2 : raw <= 16 ? 3 : 4;
}

// PROVISIONAL band cutoffs (80/55/30). These are not yet derived from a score
// distribution — they will be replaced by norming once enough responses land.
// Treat the labels as directional, not calibrated, until then.
export function overallBand(total: number): { key: string; label: string } {
  if (total >= 80) return { key: "owned", label: "Owned institution" };
  if (total >= 55) return { key: "building", label: "Building ownership" };
  if (total >= 30) return { key: "rented", label: "Mostly rented" };
  return { key: "mercy", label: "At the platform’s mercy" };
}

export function confidence(responses: Responses, tiers: EvidenceTierMap = {}) {
  const byDimension = {} as Record<DimensionKey, number>;
  let acc = 0, n = 0;
  for (const { key } of DIMENSIONS) {
    const ids = ITEM_IDS[key];
    const answered = ids.filter((id) => responses[id] != null);
    const meanTier = answered.length
      ? answered.reduce((s, id) => s + (tiers[id] ?? EVIDENCE_TIER.self), 0) / answered.length
      : 0;
    const c = meanTier * (answered.length / ids.length);
    byDimension[key] = Math.round(c * 100) / 100;
    acc += c; n += 1;
  }
  const overall = Math.round((acc / n) * 100) / 100;
  const label = overall >= 0.95 ? "Independently reviewed" : overall >= 0.7 ? "Corroborated" : "Self-reported";
  return { overall, byDimension, label };
}

type Severity = "high" | "medium";
interface FlagRule { id: string; item: ItemId; v: number; severity: Severity; message: string; }

const FLAG_RULES: FlagRule[] = [
  { id: "CONCENTRATION", item: "V4", v: 1, severity: "high", message: "Income concentration: a majority of your income depends on one client or platform." },
  { id: "PLATFORM_REACH", item: "A2", v: 1, severity: "high", message: "Platform-fragile: losing one account would wipe out your audience relationship." },
  { id: "NO_OWNED_AUDIENCE", item: "A1", v: 1, severity: "high", message: "No owned audience: you cannot reach your followers off-platform." },
  { id: "RIGHTS_GIVEAWAY", item: "R1", v: 1, severity: "high", message: "You are signing away copyright for flat fees." },
  { id: "NO_AI_CLAUSE", item: "I3", v: 1, severity: "high", message: "No protection against AI cloning of your voice or likeness." },
  { id: "NO_TRADEMARK", item: "I1", v: 1, severity: "medium", message: "Your name and brand are legally unprotected." },
  { id: "NO_RECURRING", item: "V3", v: 1, severity: "medium", message: "No recurring revenue: every month starts from zero." },
  { id: "KEYPERSON", item: "B4", v: 1, severity: "medium", message: "Key-person risk: the business stops if you do." },
  { id: "NO_CONTRACTS", item: "B2", v: 1, severity: "medium", message: "You are working without your own contracts." },
];
const SEV_RANK: Record<Severity, number> = { high: 0, medium: 1 };

export function flags(responses: Responses) {
  return FLAG_RULES
    .filter((r) => responses[r.item] != null && responses[r.item]! <= r.v)
    .map((r) => ({ id: r.id, severity: r.severity, message: r.message }))
    .sort((a, b) => SEV_RANK[a.severity] - SEV_RANK[b.severity]);
}

// --- Improvement engine: precise, engine-computed "if you act" projections ---

export interface PlanAction {
  itemId: ItemId;
  dimension: DimensionKey;
  dimensionName: string;
  from: number;   // current item score
  to: number;     // next step (from + 1)
  lift: number;   // exact total-score gain from advancing this one item
}

// Every improvable scored item, with the exact score lift from advancing it one
// step. Ranked biggest-gap-first (then largest lift) — fix the worst, most exposed
// first. Deterministic under the given weighting/aggregation.
export function improvementPlan(
  responses: Responses,
  opts: { aggregation?: Aggregation } = {},
): PlanAction[] {
  const base = totalScore(scoreDimensions(responses), opts);
  const nameByKey = Object.fromEntries(DIMENSIONS.map((d) => [d.key, d.name])) as Record<DimensionKey, string>;
  const actions: PlanAction[] = [];
  for (const { key } of DIMENSIONS) {
    for (const id of ITEM_IDS[key]) {
      const cur = responses[id];
      if (cur == null || cur >= 5) continue;
      const raised: Responses = { ...responses, [id]: cur + 1 };
      const lift = totalScore(scoreDimensions(raised), opts) - base;
      actions.push({ itemId: id, dimension: key, dimensionName: nameByKey[key], from: cur, to: cur + 1, lift });
    }
  }
  return actions.sort((a, b) => a.from - b.from || b.lift - a.lift);
}

// Exact projected total if the given items are each advanced one step.
export function projectedScore(
  responses: Responses,
  itemIds: ItemId[],
  opts: { aggregation?: Aggregation } = {},
): number {
  const raised: Responses = { ...responses };
  for (const id of itemIds) raised[id] = Math.min(5, (raised[id] ?? 0) + 1);
  return totalScore(scoreDimensions(raised), opts);
}

export interface AssessmentResult {
  methodologyVersion: string;
  aggregation: Aggregation;
  dimensions: { key: DimensionKey; name: string; raw: number; band: number; complete: boolean }[];
  total: number;
  overall: { key: string; label: string };
  confidence: ReturnType<typeof confidence>;
  flags: ReturnType<typeof flags>;
}

export function assess(
  responses: Responses,
  opts: { aggregation?: Aggregation; tiers?: EvidenceTierMap } = {},
): AssessmentResult {
  const dims = scoreDimensions(responses);
  const total = totalScore(dims, opts);
  return {
    methodologyVersion: METHODOLOGY_VERSION,
    aggregation: opts.aggregation ?? "additive",
    dimensions: DIMENSIONS.map((d) => ({
      key: d.key, name: d.name,
      raw: dims[d.key].raw, band: dimensionBand(dims[d.key].raw),
      complete: dims[d.key].complete,
    })),
    total,
    overall: overallBand(total),
    confidence: confidence(responses, opts.tiers ?? {}),
    flags: flags(responses),
  };
}
