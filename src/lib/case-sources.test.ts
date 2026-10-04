import { describe, expect, it } from "vitest";
import { SEED, nodeSlug } from "./observatory_seed";
import { getCaseResearch, recordLastUpdated } from "./case_research";
import { collectSources, countSources, isIndependent } from "../components/case/caseData";

const records = SEED.map((node) => ({ slug: nodeSlug(node.name), research: getCaseResearch(nodeSlug(node.name))! }));

describe("case source lists", () => {
  it("has one record per case", () => {
    expect(records.every((row) => row.research)).toBe(true);
  });

  it("derives the case-page list from the research record, so counts cannot differ", () => {
    for (const { slug, research } of records) {
      expect(collectSources(research).length, slug).toBe(research.sources.length);
      expect(countSources(research.sources).total, slug).toBe(research.sources.length);
    }
  });

  it("never lists the same URL twice in a case", () => {
    for (const { slug, research } of records) {
      const hrefs = research.sources.map((source) => source.href.trim().replace(/\/+$/, "").toLowerCase());
      expect(new Set(hrefs).size, slug).toBe(hrefs.length);
    }
  });

  it("only cites source ids that exist in the record", () => {
    for (const { slug, research } of records) {
      const ids = new Set(research.sources.map((source) => source.id));
      for (const event of research.chronology) for (const id of event.sourceIds) expect(ids.has(id), `${slug}:${id}`).toBe(true);
    }
  });

  it("counts only independent reporting as independent", () => {
    const kinds = ["primary", "institutional", "interview", "self_authored", "derivative"] as const;
    for (const kind of kinds) expect(isIndependent({ kind })).toBe(false);
    expect(isIndependent({ kind: "independent" })).toBe(true);
  });

  it("does not count subject interviews, self-authored pieces, or republished reports as independent", () => {
    const find = (slug: string, id: string) => records.find((row) => row.slug === slug)!.research.sources.find((source) => source.id === id)!;
    expect(find("jony-ive", "reuters-apple-end").kind).toBe("derivative");
    expect(find("cathy-hackl", "hbr-spatial").kind).toBe("self_authored");
    expect(find("colin-samir", "spi-origin").kind).toBe("interview");
    expect(find("colin-samir", "nathan-barry").kind).toBe("interview");
    expect(find("pieter-levels", "lex-transcript").kind).toBe("interview");
    expect(find("kenny-gold", "cmo-podcast").kind).toBe("interview");
    expect(find("gordon-glenister", "bigeye").kind).toBe("interview");
  });
});

describe("record last updated", () => {
  it("is never earlier than the newest fully dated source a record cites", () => {
    for (const { slug, research } of records) {
      const dated = research.sources.map((source) => source.published).filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value));
      for (const value of dated) expect(recordLastUpdated(research) >= value, slug).toBe(true);
    }
  });

  it("uses the date of the latest cited source for Nadir Godrej (the 14 August 2026 effective date)", () => {
    expect(recordLastUpdated(records.find((row) => row.slug === "nadir-godrej")!.research)).toBe("2026-08-14");
  });
});
