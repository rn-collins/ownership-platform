import { describe, expect, it } from "vitest";
import {
  FIRST_COHORT_TARGET,
  FIRST_OBSERVATORY_COHORT,
  evaluateCrossCaseFindingGate,
  mayExpandFrozenContextCase,
} from "./observatory-cohort";

describe("first Observatory cohort governance", () => {
  it("keeps the first cohort bounded and balanced across the two case types", () => {
    expect(FIRST_OBSERVATORY_COHORT).toHaveLength(FIRST_COHORT_TARGET);
    expect(FIRST_OBSERVATORY_COHORT.filter((member) => member.caseType === "creator")).toHaveLength(6);
    expect(FIRST_OBSERVATORY_COHORT.filter((member) => member.caseType === "professional")).toHaveLength(6);
    expect(new Set(FIRST_OBSERVATORY_COHORT.map((member) => member.slug)).size).toBe(FIRST_COHORT_TARGET);
    expect(new Set(FIRST_OBSERVATORY_COHORT.map((member) => member.field)).size).toBeGreaterThanOrEqual(6);
  });

  it("blocks cross-case findings until both case types meet the review and coverage gate", () => {
    const creatorOnly = FIRST_OBSERVATORY_COHORT
      .filter((member) => member.caseType === "creator")
      .map((member) => member.slug);
    const result = evaluateCrossCaseFindingGate({
      reviewedSlugs: creatorOnly,
      evidenceCoverageBySlug: Object.fromEntries(creatorOnly.map((slug) => [slug, 1])),
    });

    expect(result.eligible).toBe(false);
    expect(result.professionalReviewed).toBe(0);
  });

  it("opens the gate only for at least four sufficiently covered cases of each type", () => {
    const selected = [
      ...FIRST_OBSERVATORY_COHORT.filter((member) => member.caseType === "creator").slice(0, 4),
      ...FIRST_OBSERVATORY_COHORT.filter((member) => member.caseType === "professional").slice(0, 4),
    ];
    const slugs = selected.map((member) => member.slug);
    const result = evaluateCrossCaseFindingGate({
      reviewedSlugs: slugs,
      evidenceCoverageBySlug: Object.fromEntries(slugs.map((slug) => [slug, 0.8])),
    });

    expect(result.eligible).toBe(true);
    expect(result.reviewedCount).toBe(8);
  });

  it("freezes the overdeveloped context case until eight other subjects are reviewed", () => {
    const otherSlugs = FIRST_OBSERVATORY_COHORT
      .filter((member) => member.slug !== "mrbeast")
      .map((member) => member.slug);

    expect(mayExpandFrozenContextCase(otherSlugs.slice(0, 7))).toBe(false);
    expect(mayExpandFrozenContextCase(otherSlugs.slice(0, 8))).toBe(true);
  });
});
