// Portfolio Professional — scoring engine (self-contained).
// Mirrors the creator engine's math but is fully independent so it cannot affect
// the live creator flow. 5 dimensions x 4 items x 0-5 = 100; each item point is
// exactly one total point, so improvement lift is exact.

import {
  PROFESSIONAL_DIMENSIONS,
  PROFESSIONAL_ITEM_IDS,
  PROFESSIONAL_OVERALL,
  PROFESSIONAL_DIMENSION_WHY,
  PROFESSIONAL_ITEM_ACTIONS,
  PROFESSIONAL_METHODOLOGY_VERSION,
  type PDimensionKey,
} from "./instrument_professional";

export type PResponses = Record<string, number>;

const clamp05 = (n: number) => Math.max(0, Math.min(5, Math.round(n)));

export interface PDimScore { key: PDimensionKey; name: string; raw: number; answered: number; }

export function scoreProfessionalDimensions(responses: PResponses): PDimScore[] {
  return PROFESSIONAL_DIMENSIONS.map(({ key, name }) => {
    const ids = PROFESSIONAL_ITEM_IDS[key];
    const vals = ids.map((id) => (responses[id] == null ? null : clamp05(responses[id])));
    const answered = vals.filter((v): v is number => v != null);
    const raw = answered.reduce((a, b) => a + b, 0);
    return { key, name, raw, answered: answered.length };
  });
}

export function professionalTotal(dims: PDimScore[]): number {
  return dims.reduce((s, d) => s + d.raw, 0);
}

export function professionalBand(total: number): { key: string; label: string; copy: string } {
  return PROFESSIONAL_OVERALL.find((b) => total >= b.min) ?? PROFESSIONAL_OVERALL[PROFESSIONAL_OVERALL.length - 1];
}

export interface PPlanAction {
  itemId: string;
  dimension: PDimensionKey;
  dimensionName: string;
  from: number;
  to: number;
  lift: number;
}

// Biggest-gap-first prioritized moves. Each point raised on an item is one point
// of total score, so projected score is exact.
export function professionalPlan(responses: PResponses): PPlanAction[] {
  const actions: PPlanAction[] = [];
  for (const { key, name } of PROFESSIONAL_DIMENSIONS) {
    for (const id of PROFESSIONAL_ITEM_IDS[key]) {
      const cur = responses[id];
      if (cur == null || cur >= 5) continue;
      actions.push({ itemId: id, dimension: key, dimensionName: name, from: cur, to: 5, lift: 5 - cur });
    }
  }
  return actions.sort((a, b) => b.lift - a.lift);
}

export function professionalProjected(responses: PResponses, itemIds: string[]): number {
  const dims = scoreProfessionalDimensions(responses);
  const base = professionalTotal(dims);
  const chosen = new Set(itemIds);
  let gain = 0;
  for (const a of professionalPlan(responses)) if (chosen.has(a.itemId)) gain += a.lift;
  return Math.min(100, base + gain);
}

export interface PAssessment {
  methodologyVersion: string;
  dimensions: PDimScore[];
  total: number;
  overall: { key: string; label: string; copy: string };
}

export function assessProfessional(responses: PResponses): PAssessment {
  const dimensions = scoreProfessionalDimensions(responses);
  const total = professionalTotal(dimensions);
  return {
    methodologyVersion: PROFESSIONAL_METHODOLOGY_VERSION,
    dimensions,
    total,
    overall: professionalBand(total),
  };
}

export { PROFESSIONAL_DIMENSION_WHY, PROFESSIONAL_ITEM_ACTIONS };
