import { beforeEach, describe, expect, it, vi } from "vitest";

const requireResearcher = vi.fn();
vi.mock("@/lib/researcher-auth", () => ({ requireResearcher: () => requireResearcher() }));
const findMany = vi.fn();
vi.mock("@/lib/db", () => ({ prisma: { assessment: { findMany: (a: unknown) => findMany(a) } } }));
vi.mock("@/lib/log", () => ({ logError: vi.fn() }));

import { GET } from "./route";

beforeEach(() => {
  requireResearcher.mockReset();
  findMany.mockReset().mockResolvedValue([]);
});

describe("/api/research-integrity", () => {
  it("answers 403 and never reads Assessment rows for an anonymous caller", async () => {
    requireResearcher.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "forbidden" });
    expect(findMany).not.toHaveBeenCalled();
  });

  it("returns the diagnostic to a researcher", async () => {
    requireResearcher.mockResolvedValue({ id: "u1", email: "researcher@example.test" });
    const res = await GET();
    expect(res.status).toBe(200);
    expect((await res.json()).totalRows).toBe(0);
    expect(findMany).toHaveBeenCalledOnce();
  });
});
