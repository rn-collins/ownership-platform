import { describe, expect, it } from "vitest";
import { SEED, nodeSlug } from "./observatory_seed";
import { CASE_NARRATIVES } from "./case_narratives";
import { getCaseResearch } from "./case_research";
import { buildFramework, formatLongDate } from "../components/case/caseData";

const slugs = SEED.map((node) => nodeSlug(node.name));

describe("formatLongDate", () => {
  it("writes full dates as Month D, YYYY", () => {
    expect(formatLongDate("2026-07-27")).toBe("July 27, 2026");
    expect(formatLongDate(new Date(Date.UTC(2026, 6, 28)))).toBe("July 28, 2026");
  });
  it("writes year-month values as Month YYYY", () => {
    expect(formatLongDate("2018-05")).toBe("May 2018");
  });
  it("converts ISO dates inside longer strings and leaves other text alone", () => {
    expect(formatLongDate("2025-05-21; updated 2025-07-09")).toBe("May 21, 2025; updated July 9, 2025");
    expect(formatLongDate("2024")).toBe("2024");
    expect(formatLongDate("Current record")).toBe("Current record");
  });
});

describe("framework lanes", () => {
  it("never shows the template placeholder in the Continue lane", () => {
    for (const slug of slugs) {
      const research = getCaseResearch(slug)!;
      const cells = buildFramework({ built: CASE_NARRATIVES[slug].structuralTurn, unknowns: research.unknowns, carryFallback: "x" });
      const cont = cells.find((cell) => cell.key === "Continue")!;
      expect(cont.text, slug).not.toMatch(/^Unknown/);
      expect(cont.label, slug).not.toBe("Unknown");
    }
  });
  it("uses the record's own succession question for the four cases that showed the placeholder", () => {
    for (const slug of ["kunal-shah", "jane-gilbert", "linda-fisher", "marc-lore"]) {
      const research = getCaseResearch(slug)!;
      const cont = buildFramework({ built: "", unknowns: research.unknowns, carryFallback: "x" }).find((cell) => cell.key === "Continue")!;
      expect(research.unknowns, slug).toContain(cont.text);
    }
  });
  it("states plainly when the record gives nothing to show", () => {
    const cont = buildFramework({ built: "b", unknowns: [], carryFallback: "x" }).find((cell) => cell.key === "Continue")!;
    expect(cont.label).toBe("Not publicly documented");
  });
});

describe("role lines", () => {
  it("attributes the Chief Heat Officer claim to Miami-Dade County", () => {
    const role = SEED.find((node) => node.name === "Jane Gilbert")!.role;
    expect(role).toContain("described by Miami-Dade County as the world’s first Chief Heat Officer");
  });
});
