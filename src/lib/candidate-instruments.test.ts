import { describe, expect, it } from "vitest";
import {
  CANDIDATE_ACTIVATION_GATES,
  INSTRUMENT_RECONCILIATION,
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
} from "./candidate-instruments";

const candidates = [OWNERSHIP_INDEX_0_3_0_CANDIDATE, PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE];

describe("candidate instrument release boundaries", () => {
  it("keeps both candidates inactive and unscored", () => {
    for (const candidate of candidates) {
      expect(candidate.status).toBe("candidate");
      expect(candidate.scoringStatus).toBe("prohibited_pending_validation");
      expect(candidate.version).toContain("-candidate.");
    }
  });

  it("publishes complete twenty-item banks with unique IDs", () => {
    for (const candidate of candidates) {
      expect(candidate.items).toHaveLength(20);
      expect(new Set(candidate.items.map((item) => item.id)).size).toBe(20);
      for (const item of candidate.items) {
        expect(item.prompt.trim().length).toBeGreaterThan(20);
        expect(item.anchors.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("requires cognitive interviews and a separate pilot before activation", () => {
    expect(CANDIDATE_ACTIVATION_GATES.some((gate) => gate.includes("cognitive-interview"))).toBe(true);
    expect(CANDIDATE_ACTIVATION_GATES.some((gate) => gate.includes("separate pilot"))).toBe(true);
    expect(CANDIDATE_ACTIVATION_GATES.some((gate) => gate.includes("methodology record"))).toBe(true);
  });
  it("keeps the instruments analytically distinct", () => {
    expect(INSTRUMENT_RECONCILIATION.ownership.primaryUnit)
      .not.toBe(INSTRUMENT_RECONCILIATION.portfolioProfessional.primaryUnit);
    expect(INSTRUMENT_RECONCILIATION.reportingRules)
      .toContain("Report the two instruments separately; do not combine their totals into a single score.");
    expect(INSTRUMENT_RECONCILIATION.overlapRules.map((rule) => rule.topic))
      .toEqual(["portability", "continuity", "audience and authority", "institutionalization"]);
  });

});
