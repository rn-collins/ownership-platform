import { afterEach, describe, expect, it, vi } from "vitest";
import { ownedUnsubscribeUrl, renderBroadcast, unsubscribeHeaders } from "./broadcast";
import { verifyOwnedUnsubscribe } from "./token";

afterEach(() => vi.unstubAllEnvs());

describe("creator-list broadcast email", () => {
  it("builds a signed per-recipient unsubscribe link that verifies", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATA_RIGHTS_SECRET", "test-secret-one");
    const link = new URL(ownedUnsubscribeUrl("https://example.org", "creator1", "Fan@Example.com"));
    expect(link.pathname).toBe("/api/unsubscribe");
    expect(link.searchParams.get("email")).toBe("fan@example.com");
    expect(link.searchParams.get("c")).toBe("creator1");
    expect(verifyOwnedUnsubscribe("creator1", "fan@example.com", link.searchParams.get("t") || "")).toBe(true);
  });

  it("puts the unsubscribe link in the html, the text, and the List-Unsubscribe headers", () => {
    const url = "https://example.org/api/unsubscribe?email=a%40b.co&c=c1&t=abc";
    const { html, text } = renderBroadcast({ title: "T", contentHtml: "<p>x</p>", contentText: "x", name: "Ann", url: "https://example.org/u/ann/t", unsubscribeUrl: url });
    expect(html).toContain("Unsubscribe</a>");
    expect(html).toContain("email=a%40b.co&amp;c=c1&amp;t=abc");
    expect(text).toContain(`Unsubscribe: ${url}`);
    const h = unsubscribeHeaders(url);
    expect(h["List-Unsubscribe"]).toBe(`<${url}>`);
    expect(h["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
  });

  it("adds a postal address only when one is provided", () => {
    const base = { title: "T", contentHtml: "", contentText: "", name: "Ann", url: "u", unsubscribeUrl: "v" };
    expect(renderBroadcast(base).text).not.toContain("Main St");
    expect(renderBroadcast({ ...base, postalAddress: "1 Main St" }).text).toContain("1 Main St");
    expect(renderBroadcast({ ...base, postalAddress: "1 Main St" }).html).toContain("1 Main St");
  });
});
