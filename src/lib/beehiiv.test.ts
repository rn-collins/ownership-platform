import { afterEach, describe, expect, it, vi } from "vitest";
import { beehiivUnsubscribe } from "./beehiiv";

// Mocks only: no live Beehiiv calls, and the keys below are placeholders.
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function configured() {
  vi.stubEnv("BEEHIIV_API_KEY", "placeholder-key");
  vi.stubEnv("BEEHIIV_PUBLICATION_ID", "pub_placeholder");
}

describe("beehiivUnsubscribe", () => {
  it("does nothing and makes no network call when env is missing", async () => {
    vi.stubEnv("BEEHIIV_API_KEY", "");
    vi.stubEnv("BEEHIIV_PUBLICATION_ID", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await beehiivUnsubscribe("a@example.com")).toEqual({ outcome: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends unsubscribe:true to the by_email endpoint with an encoded address", async () => {
    configured();
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const r = await beehiivUnsubscribe("a+tag@example.com");
    expect(r.outcome).toBe("unsubscribed");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.beehiiv.com/v2/publications/pub_placeholder/subscriptions/by_email/a%2Btag%40example.com");
    expect(init.method).toBe("PUT");
    expect(JSON.parse(init.body)).toEqual({ unsubscribe: true });
    expect(init.headers.Authorization).toBe("Bearer placeholder-key");
  });

  it("treats 404 as not_found (nothing to stop)", async () => {
    configured();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
    expect((await beehiivUnsubscribe("a@example.com")).outcome).toBe("not_found");
  });

  it("reports failed on other statuses and on network errors, without throwing", async () => {
    configured();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    expect(await beehiivUnsubscribe("a@example.com")).toEqual({ outcome: "failed", status: 500 });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    expect(await beehiivUnsubscribe("a@example.com")).toEqual({ outcome: "failed" });
  });
});
