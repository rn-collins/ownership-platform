import { describe, expect, it } from "vitest";
import { classifyAssessmentRecord, CONSTRUCT_REGISTRY, constructForItem, RESULT_SCHEMA_VERSION } from "./research-governance";
import { ITEM_IDS, METHODOLOGY_VERSION } from "./engine";
import { PROFESSIONAL_ITEM_IDS, PROFESSIONAL_METHODOLOGY_VERSION } from "./instrument_professional";

const answers = (ids: Record<string, string[]>) =>
  Object.fromEntries(Object.values(ids).flat().map((id) => [id, 3]));

describe("research governance", () => {
  it("maps every scored item to exactly one construct in its instrument", () => {
    for (const id of Object.values(ITEM_IDS).flat()) expect(constructForItem("ownership", id)).toBeDefined();
    for (const id of Object.values(PROFESSIONAL_ITEM_IDS).flat()) expect(constructForItem("portfolio_professional", id)).toBeDefined();
    expect(CONSTRUCT_REGISTRY).toHaveLength(10);
  });

  it("classifies a current ownership event as canonical", () => {
    expect(classifyAssessmentRecord({
      instrument: "ownership",
      responses: answers(ITEM_IDS),
      research: { __assessmentId: "assessment-123", __resultSchemaVersion: RESULT_SCHEMA_VERSION },
      methodologyVersion: METHODOLOGY_VERSION,
      total: 60,
    }).classification).toBe("canonical");
  });

  it("classifies a current professional event as canonical", () => {
    expect(classifyAssessmentRecord({
      instrument: "portfolio_professional",
      responses: answers(PROFESSIONAL_ITEM_IDS),
      research: { __assessmentId: "assessment-456", __resultSchemaVersion: RESULT_SCHEMA_VERSION },
      methodologyVersion: PROFESSIONAL_METHODOLOGY_VERSION,
      total: 60,
    }).classification).toBe("canonical");
  });

  it("preserves complete reproducible legacy rows as recoverable", () => {
    expect(classifyAssessmentRecord({
      instrument: "ownership",
      responses: answers(ITEM_IDS),
      research: null,
      methodologyVersion: null,
      total: 60,
    }).classification).toBe("recoverable");
  });

  it("quarantines partial and non-reproducible rows as ambiguous", () => {
    expect(classifyAssessmentRecord({
      instrument: "ownership",
      responses: { A1: 3 },
      research: null,
      methodologyVersion: null,
      total: 3,
    }).classification).toBe("ambiguous");
    expect(classifyAssessmentRecord({
      instrument: "ownership",
      responses: answers(ITEM_IDS),
      research: null,
      methodologyVersion: METHODOLOGY_VERSION,
      total: 99,
    }).classification).toBe("ambiguous");
  });

  it("marks malformed response data unusable", () => {
    expect(classifyAssessmentRecord({
      instrument: "ownership",
      responses: { A1: "high" },
      research: null,
      methodologyVersion: null,
      total: null,
    }).classification).toBe("unusable");
  });
});
