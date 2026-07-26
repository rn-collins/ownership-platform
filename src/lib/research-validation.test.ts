import { describe, expect, it } from "vitest";
import { OWNERSHIP_INDEX_0_3_0_CANDIDATE } from "./candidate-instruments";
import {
  ACTIVATION_REQUIREMENTS,
  COGNITIVE_PROBE_GUIDES,
  RESPONSE_PROCESS_DOMAINS,
  ROUND_GATES,
  generateRevisedCandidate,
  scoringMayActivate,
} from "./research-validation";

describe("candidate validation operations", () => {
  it("registers one six-domain guide for every candidate item", () => {
    expect(COGNITIVE_PROBE_GUIDES).toHaveLength(40);
    expect(new Set(COGNITIVE_PROBE_GUIDES.map((g) => `${g.instrument}:${g.itemId}`)).size).toBe(40);
    for (const guide of COGNITIVE_PROBE_GUIDES) {
      expect(Object.keys(guide.probes).sort()).toEqual(RESPONSE_PROCESS_DOMAINS.map((d) => d.id).sort());
      expect(guide.responseOptions.length).toBeGreaterThanOrEqual(2);
      expect(guide.closingDecision.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("requires evidence-backed approval before producing a revised candidate", () => {
    const original = OWNERSHIP_INDEX_0_3_0_CANDIDATE.items[0];
    const revised = generateRevisedCandidate(OWNERSHIP_INDEX_0_3_0_CANDIDATE, "0.3.0-candidate.2", [{
      instrument: "ownership",
      sourceVersion: OWNERSHIP_INDEX_0_3_0_CANDIDATE.version,
      targetVersion: "0.3.0-candidate.2",
      itemId: original.id,
      decisionStatus: "approved",
      afterValue: { ...original, prompt: `${original.prompt} Clarified after interview evidence.` },
      evidenceCodeIds: ["code-1"],
      reviewedBy: "researcher@example.org",
      reviewedAt: "2026-07-26T00:00:00Z",
    }], {
      round1Gate: "met",
      approvedRevisionCount: 1,
      expectedRevisionCount: 1,
      generatedBy: "researcher@example.org",
      generatedAt: "2026-07-26T00:00:00Z",
    });
    expect(revised.version).toBe("0.3.0-candidate.2");
    expect(revised.scoringStatus).toBe("prohibited_pending_validation");
    expect(revised.items[0].prompt).toContain("Clarified");
  });

  it("rejects a revision without coded evidence", () => {
    const original = OWNERSHIP_INDEX_0_3_0_CANDIDATE.items[0];
    expect(() => generateRevisedCandidate(OWNERSHIP_INDEX_0_3_0_CANDIDATE, "0.3.0-candidate.2", [{
      instrument: "ownership", sourceVersion: OWNERSHIP_INDEX_0_3_0_CANDIDATE.version, targetVersion: "0.3.0-candidate.2", itemId: original.id,
      decisionStatus: "approved", afterValue: original, evidenceCodeIds: [], reviewedBy: "researcher@example.org", reviewedAt: "2026-07-26T00:00:00Z",
    }], {
      round1Gate: "met",
      approvedRevisionCount: 1,
      expectedRevisionCount: 1,
      generatedBy: "researcher@example.org",
      generatedAt: "2026-07-26T00:00:00Z",
    })).toThrow("Unreviewed revision");
  });


  it("refuses candidate.2 generation before the Round 1 gate and complete ledger", () => {
    const original = OWNERSHIP_INDEX_0_3_0_CANDIDATE.items[0];
    const revisions = [{
      instrument: "ownership" as const,
      sourceVersion: OWNERSHIP_INDEX_0_3_0_CANDIDATE.version,
      targetVersion: "0.3.0-candidate.2",
      itemId: original.id,
      decisionStatus: "approved" as const,
      afterValue: original,
      evidenceCodeIds: ["code-1"],
      reviewedBy: "researcher@example.org",
      reviewedAt: "2026-07-26T00:00:00Z",
    }];
    expect(() => generateRevisedCandidate(OWNERSHIP_INDEX_0_3_0_CANDIDATE, "0.3.0-candidate.2", revisions, {
      round1Gate: "met",
      approvedRevisionCount: 0,
      expectedRevisionCount: 1,
      generatedBy: "researcher@example.org",
      generatedAt: "2026-07-26T00:00:00Z",
    })).toThrow("Approved revision ledger is incomplete");
  });

  it("defines distinct completion gates for detection and retest rounds", () => {
    expect(ROUND_GATES.round1.id).not.toBe(ROUND_GATES.round2.id);
    expect(ROUND_GATES.round1.minimumCompletedPerInstrument).toBeGreaterThan(0);
    expect(ROUND_GATES.round2.requirements.some((r) => r.includes("New participants"))).toBe(true);
  });

  it("keeps scoring locked unless every requirement is explicitly met", () => {
    const allMet = Object.fromEntries(ACTIVATION_REQUIREMENTS.map((g) => [g, "met"])) as Record<string, "met">;
    expect(scoringMayActivate(allMet)).toBe(true);
    expect(scoringMayActivate({ ...allMet, fairness_reviewed: "waived" })).toBe(false);
    expect(scoringMayActivate({})).toBe(false);
  });
});
