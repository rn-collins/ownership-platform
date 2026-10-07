import { beforeEach, describe, expect, it, vi } from "vitest";

const create = vi.fn();
let hasDb = true;
vi.mock("@/lib/db", () => ({ get prisma() { return hasDb ? { partnerInquiry: { create: (a: unknown) => create(a) } } : null; } }));
const send = vi.fn();
vi.mock("@/lib/email", () => ({ getResend: () => (process.env.RESEND_API_KEY ? { emails: { send: (a: unknown) => send(a) } } : null), getFrom: () => process.env.RESEND_FROM ?? null }));
vi.mock("@/lib/log", () => ({ logError: vi.fn() }));

import { POST } from "./route";

let n = 0;
const post = (body: unknown) => POST(new Request("https://site.test/api/contact", { method: "POST", headers: { "x-forwarded-for": `10.0.0.${++n}` }, body: JSON.stringify(body) }));
const valid = { name: "Test Person", email: "test.person@example.test", topic: "work", message: "A message that is long enough." };

beforeEach(() => {
  create.mockReset().mockResolvedValue({});
  send.mockReset().mockResolvedValue({ error: null });
  hasDb = true;
  vi.stubEnv("CONTACT_TO", "");
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("RESEND_FROM", "");
});

describe("/api/contact", () => {
  it("refuses honestly when it can neither deliver nor store", async () => {
    hasDb = false;
    const res = await post(valid);
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "not_available" });
  });

  it("stores and reports delivered:false when email is not configured", async () => {
    const res = await post(valid);
    expect(await res.json()).toEqual({ ok: true, delivered: false, stored: true });
    expect(create).toHaveBeenCalledOnce();
    expect(send).not.toHaveBeenCalled();
  });

  it("delivers to the CONTACT_TO environment address and replies to the visitor", async () => {
    vi.stubEnv("CONTACT_TO", "inbox.placeholder@example.test");
    vi.stubEnv("RESEND_API_KEY", "key");
    vi.stubEnv("RESEND_FROM", "Site <site@example.test>");
    const res = await post(valid);
    expect(await res.json()).toEqual({ ok: true, delivered: true, stored: true });
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: "inbox.placeholder@example.test", replyTo: valid.email }));
    expect(JSON.stringify(send.mock.calls[0][0].subject)).not.toContain(valid.name);
  });

  it("reports delivered:false when the mail provider fails but the message was stored", async () => {
    vi.stubEnv("CONTACT_TO", "inbox.placeholder@example.test");
    vi.stubEnv("RESEND_API_KEY", "key");
    vi.stubEnv("RESEND_FROM", "Site <site@example.test>");
    send.mockResolvedValue({ error: { message: "nope" } });
    expect(await (await post(valid)).json()).toEqual({ ok: true, delivered: false, stored: true });
  });

  it("keeps and sends nothing when the honeypot is filled", async () => {
    vi.stubEnv("CONTACT_TO", "inbox.placeholder@example.test");
    vi.stubEnv("RESEND_API_KEY", "key");
    vi.stubEnv("RESEND_FROM", "Site <site@example.test>");
    const res = await post({ ...valid, website: "http://spam.test" });
    expect(res.status).toBe(200);
    expect(create).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects invalid input with 422", async () => {
    expect((await post({ ...valid, email: "nope" })).status).toBe(422);
    expect(create).not.toHaveBeenCalled();
  });

  it("limits one address to five messages an hour", async () => {
    const same = () => POST(new Request("https://site.test/api/contact", { method: "POST", headers: { "x-forwarded-for": "203.0.113.9" }, body: JSON.stringify(valid) }));
    for (let i = 0; i < 5; i++) expect((await same()).status).toBe(200);
    expect((await same()).status).toBe(429);
  });
});
