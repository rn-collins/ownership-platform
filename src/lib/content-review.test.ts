import { describe, expect, it } from "vitest";
import { ITEM_CONTENT_REVIEW } from "./item-content-review";
import { ITEM_IDS } from "./engine";
import { PROFESSIONAL_ITEM_IDS } from "./instrument_professional";
import { RESEARCH_MODULES } from "./research";
import { BATTERY_ITEM_TO_CONSTRUCT } from "./research-battery-governance";

describe("content-validity governance", () => {
  it("reviews every scored item exactly once in each instrument", () => {
    const ownership = ITEM_CONTENT_REVIEW.filter((item) => item.instrument === "ownership").map((item) => item.itemId);
    const professional = ITEM_CONTENT_REVIEW.filter((item) => item.instrument === "portfolio_professional").map((item) => item.itemId);
    expect(ownership.sort()).toEqual(Object.values(ITEM_IDS).flat().sort());
    expect(professional.sort()).toEqual(Object.values(PROFESSIONAL_ITEM_IDS).flat().sort());
  });

  it("maps every optional research-battery item to a governed construct", () => {
    const ids = RESEARCH_MODULES.flatMap((module) => module.items.map((item) => item.id));
    expect(new Set(BATTERY_ITEM_TO_CONSTRUCT.keys())).toEqual(new Set(ids));
  });
});
