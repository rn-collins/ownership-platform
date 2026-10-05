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
    expect(counts("jane-gilbert")).toEqual({ total: 14, independent: 4, other: 10 });
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

describe("main-site fact corrections (October 5, 2026)", () => {
  const research = (slug: string) => records.find((row) => row.slug === slug)!.research;
  const find = (slug: string, id: string) => research(slug).sources.find((source) => source.id === id)!;
  const text = (slug: string) => JSON.stringify(research(slug));
  const counts = (slug: string) => countSources(research(slug).sources);

  it("pins the source counts of the cases whose sources changed", () => {
    const expected: Record<string, [number, number]> = {
      "brad-keywell": [22, 9], "mrbeast": [23, 11], "huda-kattan": [24, 15], "jack-conte": [12, 10], "colin-samir": [12, 2],
      "alexandr-wang": [16, 10], "darren-murph": [9, 0], "linda-fisher": [14, 2], "simon-cook": [11, 6], "fei-fei-li": [18, 8], "marc-lore": [15, 9],
    };
    for (const [slug, [total, independent]] of Object.entries(expected)) expect([counts(slug).total, counts(slug).independent], slug).toEqual([total, independent]);
    const all = records.reduce((sum, row) => {
      const c = countSources(row.research.sources);
      return [sum[0] + c.total, sum[1] + c.independent];
    }, [0, 0]);
    expect(all).toEqual([542, 207]);
  });

  it("states AMD's agreement to acquire World Labs from the 8-K and a second report, and updates the role line", () => {
    const li = research("fei-fei-li");
    const row = li.chronology.find((event) => event.date === "September 26, 2026")!;
    expect(row.event).toContain("about $8.2 billion in AMD common stock");
    expect(row.event).toContain("expected to close by the end of 2026");
    expect(find("fei-fei-li", "amd-8k-worldlabs").kind).toBe("primary");
    expect(find("fei-fei-li", "tnw-amd-worldlabs").kind).toBe("independent");
    expect(SEED.find((node) => node.name === "Fei-Fei Li")!.role).toContain("AMD agreed in September 2026 to acquire World Labs");
    expect(text("fei-fei-li")).toContain("deeply against my principles");
  });

  it("gives Alexandr Wang's record the closed DOL investigation, the settlement, and the CEO change", () => {
    const wang = research("alexandr-wang");
    expect(text("alexandr-wang")).toContain("closed that investigation in May 2025 without announcing a finding");
    expect(text("alexandr-wang")).toContain("$12.5 million class settlement");
    expect(text("alexandr-wang")).toContain("without admitting wrongdoing");
    expect(wang.chronology.some((event) => event.date === "July 30, 2026" && /Francis deSouza/.test(event.event))).toBe(true);
    expect(text("alexandr-wang")).not.toContain("information restrictions");
    expect(find("alexandr-wang", "mckinney-settlement").kind).toBe("derivative");
    expect(find("alexandr-wang", "storyboard18-meta").kind).toBe("derivative");
  });

  it("dates Jane Gilbert's Extreme Heat Action Plan to December 2022", () => {
    expect(text("jane-gilbert")).not.toContain("May 2022");
    expect(research("jane-gilbert").chronology.some((event) => event.date === "November 2021–December 2022" && /December 14, 2022/.test(event.event))).toBe(true);
    expect(find("jane-gilbert", "action-plan").published).toBe("2022-12");
  });

  it("does not tie Glenister to the IMTB without a source", () => {
    const record = research("gordon-glenister");
    expect(record.unknowns.some((line) => /authority did Glenister hold in BCMA Influence\?$/.test(line))).toBe(true);
    expect(record.unknowns.some((line) => /No cited source places Glenister in a role at the Influencer Marketing Trade Body/.test(line))).toBe(true);
    expect(text("gordon-glenister")).not.toMatch(/BCMA Influence and the IMTB/);
  });

  it("reports the WNDR closures and does not name WNDR as continuing", () => {
    const record = research("brad-keywell");
    expect(record.chronology.some((event) => event.date === "2018–2026" && /Boston museum would close on August 30/.test(event.event) && /September 7, 2026/.test(event.event))).toBe(true);
    expect(record.unknowns.join(" ")).not.toMatch(/Chicago Ideas, WNDR/);
    expect(text("brad-keywell")).toContain("Keywell was not a defendant");
    expect(text("brad-keywell")).not.toContain("reuters.com/article/us-uptake");
    expect(find("brad-keywell", "wndr-installation").href).toMatch(/^https:\/\/web\.archive\.org\//);
  });

  it("keeps Rudder's own-website claim to what the page shows", () => {
    expect(text("ashley-rudder")).not.toMatch(/updated in September 2026|previous roles|after her tenure/);
    expect(text("ashley-rudder")).toContain("without saying whether she is still at DNY");
  });

  it("keeps the Gawdat quotation off the Emma page", () => {
    expect(text("mo-gawdat")).not.toContain("therapist-backed");
    expect(text("mo-gawdat")).toContain("not to be mistaken for a human coach or therapist");
  });

  it("sources the 2021 Patreon valuation to a 2021 report", () => {
    expect(find("jack-conte", "tubefilter-patreon-2021").published).toBe("2021-04-07");
    const row = research("jack-conte").chronology.find((event) => /\$4 billion/.test(event.event))!;
    expect(row.sourceIds).toContain("tubefilter-patreon-2021");
  });

  it("keeps the single-source Sephora campaign claim out and carries Kattan's response", () => {
    const text_ = text("huda-kattan");
    expect(research("huda-kattan").sources.some((source) => source.id === "puck-sephora")).toBe(false);
    expect(text_).not.toContain("removed Huda Beauty from a planned campaign");
    expect(text_).toContain("Kattan said she removed it herself");
    expect(text_).toContain("never condone hate of any kind");
    expect(text_).not.toContain("$1.2 billion valuation");
    expect(find("huda-kattan", "khaleej-kattan").kind).toBe("independent");
  });

  it("adds the company's response to the MrBeast Mexico item and states the Mavromatis suit as filed", () => {
    const t = text("mrbeast");
    expect(t).toContain("no advertising material was shot on sites overseen by INAH");
    expect(t).toContain("On April 22, 2026, a former employee, Lorrayne Mavromatis");
    expect(t).toContain("Donaldson is not a named defendant");
    expect(t).not.toContain("February–July 2026");
    expect(t).not.toContain("August 14, 2023");
  });

  it("states The Lacrosse Network's founders and Rosenblum's role", () => {
    const t = text("colin-samir");
    expect(t).toContain("Julien Berndt co-founded The Lacrosse Network");
    expect(t).toContain("creative director");
    expect(t).not.toContain("The pair sold");
  });

  it("replaces the dead Blue Apron press page and the Grubhub release that now redirects", () => {
    expect(find("marc-lore", "wonder-blueapron").href).toBe("https://njbiz.com/wonder-continues-pivot-closes-103m-blue-apron-acquisition");
    expect(find("marc-lore", "wonder-blueapron").kind).toBe("independent");
    expect(find("marc-lore", "grubhub").href).toMatch(/^https:\/\/web\.archive\.org\//);
  });

  it("states Linda Fisher's career in order and names her successor", () => {
    expect(text("linda-fisher")).toContain("Before joining Monsanto she practiced at Latham & Watkins");
    expect(text("linda-fisher")).toContain("Krysta Harden succeeded Fisher");
  });

  it("says who ruled against whom in the Bartlett ASA item and uses a working departure link", () => {
    expect(text("steven-bartlett")).toContain("against Huel and against ZOE, not against Bartlett");
    expect(text("steven-bartlett")).not.toContain("prolificnorth.co.uk/news/co-founders");
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
