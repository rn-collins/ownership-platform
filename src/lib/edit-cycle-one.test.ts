import { describe, expect, it } from "vitest";
import { cycleOneEditions, licenseDeedUrl } from "./edit-cycle-one";

describe("edition image license links", () => {
  it("links each Creative Commons label to its deed", () => {
    expect(licenseDeedUrl("CC BY 2.0")).toBe("https://creativecommons.org/licenses/by/2.0/");
    expect(licenseDeedUrl("CC BY-SA 4.0")).toBe("https://creativecommons.org/licenses/by-sa/4.0/");
    expect(licenseDeedUrl("CC BY-SA 3.0")).toBe("https://creativecommons.org/licenses/by-sa/3.0/");
  });

  it("does not link public-domain labels", () => {
    expect(licenseDeedUrl("Public domain")).toBeUndefined();
    expect(licenseDeedUrl("Public domain (U.S. federal government work)")).toBeUndefined();
  });

  it("gives every Creative Commons edition image a deed link and every other image a public-domain label", () => {
    const rights = cycleOneEditions.flatMap((edition) => edition.media.map((item) => item.rights));
    expect(rights.length).toBe(24);
    for (const label of rights) {
      if (label.startsWith("CC ")) expect(licenseDeedUrl(label), label).toMatch(/^https:\/\/creativecommons\.org\/licenses\/by(-sa)?\/\d\.\d\/$/);
      else expect(label, label).toMatch(/^Public domain/);
    }
  });
});
