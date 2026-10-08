import { describe, expect, it } from "vitest";
import { editionDates, editionMonth, lastChecked, longDate, ogArticleTimes } from "./publication-dates";
import { publicEditions } from "./edit-cycle-one";

describe("edition publication dates (DEC-18)", () => {
  it("writes dates as Month D, YYYY", () => {
    expect(longDate("2026-09-16")).toBe("September 16, 2026");
    expect(longDate("2026-08-21")).toBe("August 21, 2026");
    expect(longDate("")).toBe("");
  });
  it("has a date for 001 to 008 and none for 009", () => {
    for (const n of ["001", "002", "003", "004", "005", "006", "007", "008"]) expect(editionDates(n)?.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(editionDates("009")).toBeNull();
    expect(ogArticleTimes("009")).toEqual({});
  });
  it("keeps last checked as a plain ISO date field", () => {
    expect(lastChecked()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it("lists the Beehiiv month for dated editions and leaves 009 alone", () => {
    expect(editionMonth("001", "July 2026")).toBe("September 2026");
    expect(editionMonth("005", "August 2026")).toBe("August 2026");
    expect(editionMonth("009", "September 2026")).toBe("September 2026");
    const listed = Object.fromEntries(publicEditions().map((e) => [e.number, e.published]));
    expect(listed["001"]).toBe("September 2026");
    expect(listed["008"]).toBe("August 2026");
  });
  it("prints no em dash or exclamation mark in the data", () => {
    expect(JSON.stringify(editionDates("005"))).not.toMatch(/[—!]/);
  });
});
