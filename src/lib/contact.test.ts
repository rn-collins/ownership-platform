import { describe, expect, it } from "vitest";
import { contactCapabilities, contactSchema, createIpLimiter, describeContactResult } from "./contact";

const valid = { name: "Test Person", email: "test.person@example.test", topic: "general", message: "A message that is long enough." };

describe("contact form checks", () => {
  it("accepts a normal message and defaults the topic", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
    expect(contactSchema.parse({ ...valid, topic: undefined }).topic).toBe("general");
  });
  it("rejects a bad email, a short message, an unknown topic and a long message", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "short" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, topic: "sell-me-things" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false);
  });
  it("only lets a short slug through as the from value", () => {
    expect(contactSchema.safeParse({ ...valid, from: "hawaii" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, from: "<script>" }).success).toBe(false);
  });
});

describe("what this deployment can do", () => {
  it("needs the destination, the mail key and the sender to deliver", () => {
    expect(contactCapabilities({}, false)).toEqual({ deliver: false, store: false });
    expect(contactCapabilities({ CONTACT_TO: "x", RESEND_API_KEY: "k" }, true)).toEqual({ deliver: false, store: true });
    expect(contactCapabilities({ CONTACT_TO: "x", RESEND_API_KEY: "k", RESEND_FROM: "f" }, false)).toEqual({ deliver: true, store: false });
  });
});

describe("per-IP limit", () => {
  it("allows the limit, refuses the next, and recovers after the window", () => {
    let t = 0;
    const limiter = createIpLimiter(2, 1000, () => t);
    expect(limiter.take("a")).toBe(true);
    expect(limiter.take("a")).toBe(true);
    expect(limiter.take("a")).toBe(false);
    expect(limiter.take("b")).toBe(true);
    t = 1001;
    expect(limiter.take("a")).toBe(true);
  });
});

describe("what the visitor is told", () => {
  it("says sent only when the message was delivered", () => {
    expect(describeContactResult({ ok: true, delivered: true, stored: true })).toMatch(/was sent/);
    expect(describeContactResult({ ok: true, delivered: false, stored: true })).not.toMatch(/was sent/);
    expect(describeContactResult({ ok: true, delivered: false, stored: true })).toMatch(/not switched on/);
    expect(describeContactResult({ ok: false, error: "not_available" })).toMatch(/cannot receive/);
  });
});
