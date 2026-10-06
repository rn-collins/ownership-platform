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
    // Third round: interviews, as-told-to essays, and republished announcements or statements.
    for (const [slug, id] of [
      ["suzie-reider", "modern-retail"], ["ashley-rudder", "muse-interview"], ["klitos-teklos", "cyprus-interview"],
      ["jack-conte", "wired-2025"], ["marques-brownlee", "bi-2018"], ["marques-brownlee", "stratechery"],
      ["marques-brownlee", "cortex-workflow"], ["cathy-hackl", "digiday-title"], ["jane-gilbert", "governing"],
      ["darren-murph", "coo"], ["darren-murph", "running-remote"], ["codie-sanchez", "liberty-2021"],
      ["brian-may", "space-bennu"], ["emma-chamberlain", "people-cafe"],
      ["kenny-gold", "buzzincontent"], ["charlotte-tansill", "provokemedia-profile"],
      ["marc-pritchard", "cmo-survey"],
    ]) expect(find(slug, id).kind, `${slug}:${id}`).toBe("interview");
    expect(find("ashley-rudder", "bi-whalar").kind).toBe("self_authored");
    expect(find("klitos-teklos", "comparably-elc").kind).toBe("institutional");
    for (const [slug, id] of [
      ["mo-gawdat", "tech-eu-flightstory"], ["mo-gawdat", "businesscloud-flightstory"], ["linda-fisher", "2020-goals"],
      ["emma-chamberlain", "yahoo-podcast-break"], ["emma-chamberlain", "yahoo-depleted"], ["shonda-rhimes", "playbill-response"],
      // Browser-checked pages: recaps, reprinted releases, and rewrites of the subject's own announcements.
      ["emma-chamberlain", "people-pause"], ["alex-cooper", "people-2025"], ["charlotte-tansill", "lbb-appointment"],
      ["simon-cook", "lbb-2019"], ["huda-kattan", "gcimag-stepdown"], ["huda-kattan", "gci-return"], ["gary-vaynerchuk", "chukmedia"],
    ]) expect(find(slug, id).kind, `${slug}:${id}`).toBe("derivative");
    // Directory and list-entry pages are institutional listings, not reporting.
    expect(find("klitos-teklos", "models-profile").kind).toBe("institutional");
    expect(find("claire-zau", "forbes").kind).toBe("institutional");
    // Pages that stay independent after the browser check.
    expect(find("jane-gilbert", "harvard").kind).toBe("independent");
    expect(find("charlotte-tansill", "prweek-power").kind).toBe("independent");
  });

  it("labels the People pieces on Emma Chamberlain by what they are", () => {
    const sources = records.find((row) => row.slug === "emma-chamberlain")!.research.sources;
    const pause = sources.find((source) => source.id === "people-pause")!;
    const cafe = sources.find((source) => source.id === "people-cafe")!;
    expect(pause.label).not.toMatch(/interview with/i);
    expect(cafe.label).toMatch(/People interview with Chamberlain/);
  });

  it("attributes the Tracks and awards claims about Simon Cook to Ascential's announcement", () => {
    const cook = records.find((row) => row.slug === "simon-cook")!.research;
    const claims = cook.chronology.filter((event) => /Tracks/.test(event.event));
    expect(claims.length).toBeGreaterThan(0);
    for (const event of claims) expect(event.event).toMatch(/Ascential announced/);
  });

  it("keeps the case-by-case independent counts after the browser check", () => {
    const counts = (slug: string) => countSources(records.find((row) => row.slug === slug)!.research.sources).independent;
    expect(counts("kenny-gold")).toBe(0);
    expect(counts("alex-cooper")).toBe(12);
    expect(counts("klitos-teklos")).toBe(3);
    expect(counts("claire-zau")).toBe(2);
    expect(counts("charlotte-tansill")).toBe(4);
    expect(counts("simon-cook")).toBe(6);
    expect(counts("huda-kattan")).toBe(15);
    expect(counts("gary-vaynerchuk")).toBe(2);
    expect(counts("emma-chamberlain")).toBe(8);
    expect(counts("jane-gilbert")).toBe(4);
  });
});

describe("open-facts corrections (October 5, 2026)", () => {
  const research = (slug: string) => records.find((row) => row.slug === slug)!.research;
  const find = (slug: string, id: string) => research(slug).sources.find((source) => source.id === id)!;
  const text = (slug: string) => JSON.stringify(research(slug));
  const counts = (slug: string) => countSources(research(slug).sources);

  it("pins the source counts of the four corrected cases", () => {
    expect(counts("neri-oxman")).toEqual({ total: 19, independent: 6, other: 13 });
    expect(counts("jane-gilbert")).toEqual({ total: 13, independent: 4, other: 9 });
    expect(counts("gordon-glenister")).toEqual({ total: 13, independent: 1, other: 12 });
    expect(counts("kunal-shah")).toEqual({ total: 10, independent: 8, other: 2 });
  });

  it("states the Oxman statement with its publication details", () => {
    expect(text("neri-oxman")).toContain("written statement published by the Boston Globe on September 13, 2019, and sent to Dezeen");
    expect(text("neri-oxman")).toContain("inadvertent involvement");
  });

  it("uses the county's word for the 2025 Chief Heat Officer change and dates the 2025 chronology", () => {
    const gilbert = research("jane-gilbert");
    expect(text("jane-gilbert")).not.toMatch(/eliminated/i);
    expect(gilbert.chronology.some((event) => event.date === "February 20, 2025" && /consolidated into one position/.test(event.event) && /Loren Parra/.test(event.event))).toBe(true);
    expect(gilbert.chronology.some((event) => event.date === "November 6, 2025" && /Chief Heat Ambassador/.test(event.event))).toBe(true);
    expect(gilbert.chronology.some((event) => /do not give Gilbert’s last day/.test(event.event))).toBe(true);
    expect(find("jane-gilbert", "county-restructure-2025").kind).toBe("primary");
    expect(find("jane-gilbert", "governing-2026").published).toBe("2026-05-29");
  });

  it("expands ISBA on first use and fixes the code chronology", () => {
    const row = research("gordon-glenister").chronology.find((event) => /ISBA/.test(event.event))!;
    expect(row.event.indexOf("Incorporated Society of British Advertisers (ISBA), the UK advertiser trade body")).toBeGreaterThanOrEqual(0);
    expect(row.event).toContain("first published an influencer marketing code in 2021");
    expect(row.event).toContain("jointly owned by ISBA and the Influencer Marketing Trade Body (IMTB) in 2023");
    expect(row.event).toContain("November 28, 2024");
    expect(row.event).not.toMatch(/IMTB and ISBA developed/);
    expect(find("gordon-glenister", "isba-release-2024").published).toBe("2024-11-28");
  });

  it("replaces the Kunal Shah Wikipedia rows and flat $400 million claim with dated sources", () => {
    const ids = research("kunal-shah").sources.map((source) => source.id);
    expect(ids).not.toContain("wikipedia-freecharge");
    expect(ids).not.toContain("wikipedia-cred");
    expect(research("kunal-shah").sources.some((source) => /wikipedia/i.test(source.publisher))).toBe(false);
    expect(text("kunal-shah")).not.toMatch(/for about \$400 million/);
    expect(find("kunal-shah", "shah-x").kind).toBe("self_authored");
    expect(find("kunal-shah", "bloomberg-cred").kind).toBe("independent");
    expect(find("kunal-shah", "upstox-cred").kind).toBe("independent");
    expect(find("kunal-shah", "reuters-freecharge").published).toBe("2015-04-08");
    expect(find("kunal-shah", "outlook-filings").label).toContain("filing not seen");
    expect(find("kunal-shah", "outlook-filings").published).toBe("2026-07-16");
    const june = research("kunal-shah").chronology.find((event) => event.date === "June 22, 2026")!;
    expect(june.event).toContain("Shah said on X");
    expect(june.event).toContain("No source reviewed states when Shah starts at WhatsApp");
    expect(text("kunal-shah")).not.toContain("facebook.com/zuck");
  });
});

describe("record last updated", () => {
  it("is never earlier than the newest fully dated source a record cites", () => {
    for (const { slug, research } of records) {
      const dated = research.sources.map((source) => source.published).filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value));
      for (const value of dated) expect(recordLastUpdated(research) >= value, slug).toBe(true);
    }
  });

  it("uses the date of the latest cited source for Nadir Godrej (the August 14, 2026 effective date)", () => {
    expect(recordLastUpdated(records.find((row) => row.slug === "nadir-godrej")!.research)).toBe("2026-08-14");
  });
});
