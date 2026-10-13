import { describe, expect, it } from "vitest";
import raw from "../../data/releases.json";
import { caseId, editionId, isHeldPath, isReleasedRecord, pieces, relatedStories, reviewRenderFor, storyIfReleased, todayInHawaii } from "./releases";
import { SEED_RECORDS, nodeSlug } from "./observatory_seed";
import { cycleOneEditions, earlyEditions, editionCases, visualStoryForCase, visualStoryIdForCase } from "./edit-cycle-one";
import publicationDates from "./publication-dates.json";
import { readFileSync } from "node:fs";

// The tool registry imports React components, which the unit tests keep out; read its id and slug pairs as text.
const tools = [...readFileSync(new URL("./tools/registry.ts", import.meta.url), "utf8").matchAll(/\{ id: "([^"]+)", slug: "([^"]+)"/g)].map((m) => ({ id: m[1], slug: m[2] }));

const iso = /^\d{4}-\d{2}-\d{2}$/;

describe("data/releases.json, the one release record", () => {
  it("has one entry per piece with the required fields and unique ids", () => {
    const ids = pieces.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of pieces) {
      expect(p.id).toMatch(/^ioo\/(edit-\d{3}|case-[a-z0-9-]+|tool-[a-z0-9-]+)$/);
      expect(typeof p.hold).toBe("boolean");
      expect(p.releasedAt === "" || iso.test(p.releasedAt)).toBe(true);
      expect(Array.isArray(p.postUrls)).toBe(true);
      expect(typeof p.longFormUrl).toBe("string");
      expect(typeof p.sourcePageUrl).toBe("string");
      expect(p.dateSource.length).toBeGreaterThan(10);
      // A piece without a date is always held.
      if (!p.releasedAt) expect(p.hold).toBe(true);
    }
  });

  it("covers every edition, every case record and every tool in the repository", () => {
    for (const e of [...earlyEditions, ...cycleOneEditions]) expect(pieces.some((p) => p.id === editionId(e.number))).toBe(true);
    for (const n of SEED_RECORDS) expect(pieces.some((p) => p.id === caseId(nodeSlug(n.name)))).toBe(true);
    expect(tools.length).toBe(3);
    for (const t of tools) expect(pieces.some((p) => p.id === `ioo/tool-${t.slug}` && p.toolId === t.id)).toBe(true);
  });

  it("takes edition dates only from publication-dates.json (the Beehiiv post pages) and holds 009, which has no post", () => {
    const dated = publicationDates.editions as Record<string, { published: string; beehiiv: string } | undefined>;
    for (const p of pieces.filter((x) => x.kind === "edition")) {
      const number = p.id.slice(-3);
      const d = dated[number];
      if (d) {
        expect(p.releasedAt).toBe(d.published);
        expect(p.postUrls).toEqual([{ platform: "beehiiv", url: d.beehiiv }]);
      } else {
        expect(p.releasedAt).toBe("");
        expect(p.hold).toBe(true);
      }
    }
    expect(pieces.find((p) => p.id === "ioo/edit-009")?.hold).toBe(true);
  });

  it("holds the three review-release tools, which have no date", () => {
    for (const p of pieces.filter((x) => x.kind === "tool")) {
      expect(p.hold).toBe(true);
      expect(p.releasedAt).toBe("");
    }
  });

  it("never links a home or subscribe page as a long-form piece", () => {
    for (const p of pieces) if (p.longFormUrl) expect(p.longFormUrl).toMatch(/\/edit\/\d{3}$/);
    for (const p of pieces) expect(p.longFormUrl).not.toMatch(/subscribe|beehiiv\.com\/?$/);
  });

  it("points each case discussed in an edition at that edition as its long-form", () => {
    for (const [number, slugs] of Object.entries(editionCases)) {
      for (const slug of slugs) expect(pieces.find((p) => p.id === caseId(slug))?.longFormUrl).toBe(`https://ownership-platform.vercel.app/edit/${number}`);
    }
  });

  it("copies the visual story dates from rn-selected-work sources-ioo.json, one per package P01 to P34", () => {
    expect(relatedStories.map((r) => r.story)).toEqual(Array.from({ length: 34 }, (_, i) => `P${String(i + 1).padStart(2, "0")}`));
    for (const r of relatedStories) {
      expect(r.releasedAt).toMatch(iso);
      expect(r.sourcePageUrl).toBe(`https://rn-selected-work.vercel.app/sources/ioo/c01-${r.story.toLowerCase()}`);
    }
  });

  it("uses no em or en dash and no exclamation mark in the note", () => {
    expect((raw as { _note: string })._note).not.toMatch(/[—–!]/);
  });
});

describe("the release rule", () => {
  it("releases a piece on its Hawaii date and not a day before", () => {
    const r = { releasedAt: "2026-11-02", hold: false };
    expect(isReleasedRecord(r, "2026-11-01")).toBe(false);
    expect(isReleasedRecord(r, "2026-11-02")).toBe(true);
    expect(isReleasedRecord(r, "2026-12-01")).toBe(true);
    expect(isReleasedRecord({ releasedAt: "2026-01-01", hold: true }, "2026-12-01")).toBe(false);
    expect(isReleasedRecord({ releasedAt: "", hold: false }, "2026-12-01")).toBe(false);
    expect(isReleasedRecord(undefined, "2026-12-01")).toBe(false);
  });

  it("counts the day in Pacific/Honolulu", () => {
    // 09:59 UTC on Nov 2 is still Nov 1 in Hawaii; 10:00 UTC is Nov 2.
    expect(todayInHawaii(new Date("2026-11-02T09:59:00Z"))).toBe("2026-11-01");
    expect(todayInHawaii(new Date("2026-11-02T10:00:00Z"))).toBe("2026-11-02");
  });

  it("never applies a review render to production", () => {
    expect(reviewRenderFor({ CYCLE01_RENDER_FREEZE: "1", VERCEL_ENV: "production" })).toBe(false);
    expect(reviewRenderFor({ RELEASE_REVIEW: "1", VERCEL_ENV: "production" })).toBe(false);
    expect(reviewRenderFor({ RELEASE_REVIEW: "1", VERCEL_ENV: "preview" })).toBe(true);
    expect(reviewRenderFor({})).toBe(false);
  });

  it("answers 404 for the files of held pieces", () => {
    const today = "2026-10-13";
    expect(isHeldPath("/edit-images/009/signing-ceremony-14443611224.jpg", today)).toBe(true);
    expect(isHeldPath("/og/edit/009.jpg", today)).toBe(true);
    expect(isHeldPath("/og/edit-card/009", today)).toBe(true);
    expect(isHeldPath("/tools/four-questions-map/images/lead-shoemakers-workbench-roy-egloff-2021.jpg", today)).toBe(true);
    expect(isHeldPath("/images/framework-strip/x.jpg", today)).toBe(true);
    expect(isHeldPath("/edit-images/008/filming-production.jpg", today)).toBe(false);
    expect(isHeldPath("/og/edit/008.jpg", today)).toBe(false);
    expect(isHeldPath("/edit/0090", today)).toBe(false);
  });

  it("links a case's visual story only once the story is released", () => {
    expect(visualStoryIdForCase("mrbeast")).toBe("P26");
    expect(storyIfReleased("P26", "2026-11-01")).toBeUndefined();
    expect(storyIfReleased("P26", "2026-11-02")?.url).toBe("https://institutions-of-one-reader.vercel.app/production/cycle-01/p26");
    // Before Nov 2, 2026 (the P18 to P27 date), no case page links its story.
    if (todayInHawaii() < "2026-11-02") expect(visualStoryForCase("mrbeast")).toBeUndefined();
  });
});
