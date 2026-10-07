import { describe, expect, it } from "vitest";
import { interpretResponse } from "../components/formKit";

describe("interpretResponse and the mailing-list connection", () => {
  it("passes synced:false through so the signup form can say the list is not connected", () => {
    expect(interpretResponse(200, { ok: true, stored: true, synced: false })).toEqual({ ok: true, synced: false });
  });
  it("passes synced:true through", () => {
    expect(interpretResponse(200, { ok: true, stored: true, synced: true })).toEqual({ ok: true, synced: true });
  });
  it("leaves synced out when the server does not say", () => {
    expect(interpretResponse(200, { ok: true })).toEqual({ ok: true });
  });
  it("still reports a refused signup as a failure", () => {
    expect(interpretResponse(503, { ok: false, error: "newsletter_not_connected" }).ok).toBe(false);
  });
});
