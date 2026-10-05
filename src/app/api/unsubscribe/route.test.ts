import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mocks only: no database and no live Beehiiv calls.
const researchUpdate = vi.fn();
const subscriberUpdate = vi.fn();
vi.mock("@/lib/db", () => ({
  prisma: { researchSubscriber: { updateMany: (a: unknown) => researchUpdate(a) }, subscriber: { updateMany: (a: unknown) => subscriberUpdate(a) } },
}));
vi.mock("@/lib/log", () => ({ logError: vi.fn() }));
const beehiivMock = vi.fn();
vi.mock("@/lib/beehiiv", () => ({ beehiivUnsubscribe: (e: string) => beehiivMock(e) }));

import { GET, POST } from "./route";
import { signEmail, signOwnedUnsubscribe } from "@/lib/token";

const link = (q: Record<string, string>) => `https://site.test/api/unsubscribe?${new URLSearchParams(q).toString()}`;
const statusOf = (res: Response) => new URL(res.headers.get("location") || "").searchParams.get("status");

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("DATA_RIGHTS_SECRET", "route-test-secret");
  researchUpdate.mockReset().mockResolvedValue({ count: 1 });
  subscriberUpdate.mockReset().mockResolvedValue({ count: 1 });
  beehiivMock.mockReset().mockResolvedValue({ outcome: "unsubscribed", status: 200 });
});
afterEach(() => vi.unstubAllEnvs());

describe("/api/unsubscribe research list", () => {
  it("updates the site record and unsubscribes in Beehiiv", async () => {
    const res = await GET(new Request(link({ email: "a@example.com", t: signEmail("a@example.com") })));
    expect(statusOf(res)).toBe("done");
    expect(researchUpdate).toHaveBeenCalledOnce();
    expect(beehiivMock).toHaveBeenCalledWith("a@example.com");
  });

  it("counts a Beehiiv 404 as done", async () => {
    beehiivMock.mockResolvedValue({ outcome: "not_found", status: 404 });
    const res = await GET(new Request(link({ email: "a@example.com", t: signEmail("a@example.com") })));
    expect(statusOf(res)).toBe("done");
  });

  it("says partial, not done, when Beehiiv is not configured", async () => {
    beehiivMock.mockResolvedValue({ outcome: "not_configured" });
    const res = await GET(new Request(link({ email: "a@example.com", t: signEmail("a@example.com") })));
    expect(statusOf(res)).toBe("partial");
    expect(researchUpdate).toHaveBeenCalledOnce();
  });

  it("says partial when Beehiiv fails, and error when both fail", async () => {
    beehiivMock.mockResolvedValue({ outcome: "failed", status: 500 });
    const t = signEmail("a@example.com");
    expect(statusOf(await GET(new Request(link({ email: "a@example.com", t }))))).toBe("partial");
    researchUpdate.mockRejectedValue(new Error("db down"));
    expect(statusOf(await GET(new Request(link({ email: "a@example.com", t }))))).toBe("error");
  });

  it("rejects a bad token without touching the database or Beehiiv", async () => {
    const res = await GET(new Request(link({ email: "a@example.com", t: "0".repeat(32) })));
    expect(statusOf(res)).toBe("invalid");
    expect(researchUpdate).not.toHaveBeenCalled();
    expect(beehiivMock).not.toHaveBeenCalled();
  });

  it("is unavailable, not open, when the secret is missing in production", async () => {
    vi.stubEnv("DATA_RIGHTS_SECRET", "");
    const res = await GET(new Request(link({ email: "a@example.com", t: "0".repeat(32) })));
    expect(statusOf(res)).toBe("unavailable");
    expect(researchUpdate).not.toHaveBeenCalled();
  });
});

describe("/api/unsubscribe creator list", () => {
  it("unsubscribes only that creator's row and leaves Beehiiv alone", async () => {
    const t = signOwnedUnsubscribe("c1", "a@example.com");
    const res = await GET(new Request(link({ email: "a@example.com", c: "c1", t })));
    expect(statusOf(res)).toBe("done");
    expect(subscriberUpdate).toHaveBeenCalledOnce();
    expect(researchUpdate).not.toHaveBeenCalled();
    expect(beehiivMock).not.toHaveBeenCalled();
  });

  it("rejects a research-list token on a creator link", async () => {
    const res = await GET(new Request(link({ email: "a@example.com", c: "c1", t: signEmail("a@example.com") })));
    expect(statusOf(res)).toBe("invalid");
    expect(subscriberUpdate).not.toHaveBeenCalled();
  });

  it("answers the one-click POST with JSON", async () => {
    const t = signOwnedUnsubscribe("c1", "a@example.com");
    const res = await POST(new Request(link({ email: "a@example.com", c: "c1", t }), { method: "POST" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, status: "done" });
  });
});
