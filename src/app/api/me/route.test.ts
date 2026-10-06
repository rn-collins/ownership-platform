import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const findMany = vi.fn();
const deleteMany = vi.fn();
vi.mock("@/lib/db", () => ({ prisma: { researchSubscriber: { findMany: (a: unknown) => findMany(a), deleteMany: (a: unknown) => deleteMany(a) } } }));
const logError = vi.fn();
vi.mock("@/lib/log", () => ({ logError: (...a: unknown[]) => logError(...a) }));

import { DELETE, GET } from "./route";
import { signEmail } from "@/lib/token";

const url = (q: Record<string, string>) => `https://site.test/api/me?${new URLSearchParams(q).toString()}`;

beforeEach(() => {
  findMany.mockReset().mockResolvedValue([]);
  deleteMany.mockReset().mockResolvedValue({ count: 0 });
  logError.mockReset();
  vi.stubEnv("NODE_ENV", "production");
});
afterEach(() => vi.unstubAllEnvs());

describe("/api/me", () => {
  it("returns 503 and touches nothing when DATA_RIGHTS_SECRET is unset in production", async () => {
    vi.stubEnv("DATA_RIGHTS_SECRET", "");
    // A token forged with the old development fallback must not work either.
    vi.stubEnv("NODE_ENV", "development");
    const forged = signEmail("victim@example.com");
    vi.stubEnv("NODE_ENV", "production");
    for (const handler of [GET, DELETE]) {
      const res = await handler(new Request(url({ email: "victim@example.com", t: forged })));
      expect(res.status).toBe(503);
      expect(await res.json()).toEqual({ error: "unavailable" });
    }
    expect(findMany).not.toHaveBeenCalled();
    expect(deleteMany).not.toHaveBeenCalled();
    expect(logError).toHaveBeenCalledWith("me.secret_missing", expect.any(Error));
    expect(JSON.stringify(logError.mock.calls)).not.toContain("dev-only");
  });

  it("returns 403 for a bad token when the secret is set", async () => {
    vi.stubEnv("DATA_RIGHTS_SECRET", "route-test-secret");
    const res = await GET(new Request(url({ email: "a@example.com", t: "0".repeat(32) })));
    expect(res.status).toBe(403);
    expect(findMany).not.toHaveBeenCalled();
  });

  it("exports and deletes with a valid token", async () => {
    vi.stubEnv("DATA_RIGHTS_SECRET", "route-test-secret");
    const t = signEmail("a@example.com");
    expect((await GET(new Request(url({ email: "a@example.com", t })))).status).toBe(200);
    expect(findMany).toHaveBeenCalledOnce();
    expect((await DELETE(new Request(url({ email: "a@example.com", t })))).status).toBe(200);
    expect(deleteMany).toHaveBeenCalledOnce();
  });
});
