import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DataRightsSecretMissingError,
  dataRightsConfigured,
  signEmail,
  signOwnedUnsubscribe,
  verifyEmail,
  verifyOwnedUnsubscribe,
} from "./token";

afterEach(() => vi.unstubAllEnvs());

describe("data-rights token secret", () => {
  it("fails closed in production when DATA_RIGHTS_SECRET is unset", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATA_RIGHTS_SECRET", "");
    expect(dataRightsConfigured()).toBe(false);
    expect(() => signEmail("a@example.com")).toThrow(DataRightsSecretMissingError);
    expect(() => verifyEmail("a@example.com", "x".repeat(32))).toThrow(DataRightsSecretMissingError);
  });

  it("fails closed when NODE_ENV is something other than development or test", () => {
    vi.stubEnv("NODE_ENV", "staging");
    vi.stubEnv("DATA_RIGHTS_SECRET", "");
    expect(dataRightsConfigured()).toBe(false);
  });

  it("never reveals a secret value in the error message", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATA_RIGHTS_SECRET", "");
    try {
      signEmail("a@example.com");
    } catch (err) {
      expect(String((err as Error).message)).not.toContain("dev-only");
    }
  });

  it("does not accept a token forged with the old development fallback in production", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("DATA_RIGHTS_SECRET", "");
    const forged = signEmail("victim@example.com");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATA_RIGHTS_SECRET", "a-real-production-secret");
    expect(verifyEmail("victim@example.com", forged)).toBe(false);
  });

  it("allows a development fallback only in development and test", () => {
    vi.stubEnv("DATA_RIGHTS_SECRET", "");
    vi.stubEnv("NODE_ENV", "development");
    expect(dataRightsConfigured()).toBe(true);
    vi.stubEnv("NODE_ENV", "test");
    expect(dataRightsConfigured()).toBe(true);
  });

  it("signs and verifies with a configured secret, ignoring case and spacing", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATA_RIGHTS_SECRET", "test-secret-one");
    const t = signEmail(" Person@Example.com ");
    expect(verifyEmail("person@example.com", t)).toBe(true);
    expect(verifyEmail("other@example.com", t)).toBe(false);
    expect(verifyEmail("person@example.com", "short")).toBe(false);
  });

  it("changes tokens when the secret changes", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATA_RIGHTS_SECRET", "secret-a");
    const t = signEmail("p@example.com");
    vi.stubEnv("DATA_RIGHTS_SECRET", "secret-b");
    expect(verifyEmail("p@example.com", t)).toBe(false);
  });

  it("keeps creator-list unsubscribe tokens separate from data-rights tokens", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATA_RIGHTS_SECRET", "test-secret-one");
    const owned = signOwnedUnsubscribe("creator1", "p@example.com");
    expect(verifyOwnedUnsubscribe("creator1", "P@example.com", owned)).toBe(true);
    expect(verifyOwnedUnsubscribe("creator2", "p@example.com", owned)).toBe(false);
    expect(verifyEmail("p@example.com", owned)).toBe(false);
    expect(verifyOwnedUnsubscribe("creator1", "p@example.com", signEmail("p@example.com"))).toBe(false);
  });
});
