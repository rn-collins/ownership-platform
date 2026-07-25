import { describe, it, expect } from "vitest";
import { assess, confidence, flags, EVIDENCE_TIER, dimensionBand, overallBand, METHODOLOGY_VERSION } from "./engine";

const ALL = ["A1","A2","A3","A4","R1","R2","R3","R4","V1","V2","V3","V4","I1","I2","I3","I4","B1","B2","B3","B4"];
const perfect = Object.fromEntries(ALL.map((k) => [k, 5]));
const zero = Object.fromEntries(ALL.map((k) => [k, 0]));
const renter = Object.fromEntries(ALL.map((k) => [k, 1]));

describe("scoring", () => {
  it("perfect scores 100 / owned", () => {
    const r = assess(perfect);
    expect(r.total).toBe(100);
    expect(r.overall.label).toBe("Owned institution");
    r.dimensions.forEach((d) => expect(d.raw).toBe(20));
  });
  it("zero scores 0 / at mercy", () => {
    const r = assess(zero);
    expect(r.total).toBe(0);
    expect(r.overall.label).toBe("At the platform’s mercy");
  });
  it("dimension + overall band boundaries", () => {
    expect(dimensionBand(4)).toBe(0);
    expect(dimensionBand(17)).toBe(4);
    expect(overallBand(30).label).toBe("Mostly rented");
    expect(overallBand(80).label).toBe("Owned institution");
  });
  it("geometric aggregation punishes imbalance", () => {
    const imb: Record<string, number> = {};
    ["A1","A2","A3","A4","R1","R2","R3","R4","V1","V2","V3","V4","I1","I2","I3","I4"].forEach((id) => (imb[id] = 5));
    ["B1","B2","B3","B4"].forEach((id) => (imb[id] = 0));
    expect(assess(imb, { aggregation: "additive" }).total).toBe(80);
    expect(assess(imb, { aggregation: "geometric" }).total).toBeLessThan(80);
  });
});

describe("confidence", () => {
  it("full self-report is labeled Self-reported (0.4)", () => {
    const c = assess(perfect).confidence;
    expect(c.overall).toBe(0.4);
    expect(c.label).toBe("Self-reported");
  });
  it("audited evidence is independently reviewed", () => {
    const tiers = Object.fromEntries(ALL.map((k) => [k, EVIDENCE_TIER.audited]));
    const c = confidence(perfect, tiers);
    expect(c.overall).toBe(1);
    expect(c.label).toBe("Independently reviewed");
  });
});

describe("risk flags", () => {
  it("a renter trips high-severity risks first; a strong creator trips none", () => {
    const f = flags(renter).map((x) => x.id);
    ["CONCENTRATION","PLATFORM_REACH","NO_OWNED_AUDIENCE","RIGHTS_GIVEAWAY","NO_AI_CLAUSE"].forEach((id) => expect(f).toContain(id));
    expect(flags(perfect).length).toBe(0);
  });
});

describe("reproducibility", () => {
  it("stamps the methodology version", () => {
    expect(assess(perfect).methodologyVersion).toBe(METHODOLOGY_VERSION);
  });
});
