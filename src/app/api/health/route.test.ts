import { beforeEach, describe, expect, it, vi } from "vitest";

const requireResearcher = vi.fn();
vi.mock("@/lib/researcher-auth", () => ({ requireResearcher: () => requireResearcher() }));

import { GET } from "./route";

beforeEach(() => requireResearcher.mockReset());

describe("/api/health", () => {
  it("tells the public only that the site is up", async () => {
    requireResearcher.mockResolvedValue(null);
    const res = await GET();
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body).not.toHaveProperty("integrations");
  });

  it("shows which integrations are connected to a signed-in researcher", async () => {
    requireResearcher.mockResolvedValue({ id: "u1", email: "researcher@example.test" });
    const body = await (await GET()).json();
    expect(body.integrations).toEqual(expect.objectContaining({ database: expect.any(Boolean), beehiiv: expect.any(Boolean), email: expect.any(Boolean), ratelimit: expect.any(Boolean) }));
  });
});
