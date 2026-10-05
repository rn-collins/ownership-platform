import { createHmac, timingSafeEqual } from "node:crypto";

// Signed tokens for self-serve data rights (unsubscribe / export / delete).
// The token is an HMAC of the email under a server secret, so a link can be
// verified without a login.
//
// Fail closed: DATA_RIGHTS_SECRET must be set. A fixed development secret is
// used only when NODE_ENV is "development" or "test", so a missing secret in
// production can never produce tokens that anyone could forge from the source.
const DEV_ONLY_SECRET = "dev-only-insecure-secret";

export class DataRightsSecretMissingError extends Error {
  constructor() {
    super("DATA_RIGHTS_SECRET is not set");
    this.name = "DataRightsSecretMissingError";
  }
}

function secretOrNull(): string | null {
  const configured = process.env.DATA_RIGHTS_SECRET;
  if (configured) return configured;
  const env = process.env.NODE_ENV;
  return env === "development" || env === "test" ? DEV_ONLY_SECRET : null;
}

/** True when tokens can be signed and verified in this environment. */
export function dataRightsConfigured(): boolean {
  return secretOrNull() !== null;
}

function secret(): string {
  const s = secretOrNull();
  if (!s) throw new DataRightsSecretMissingError();
  return s;
}

function sign(message: string): string {
  return createHmac("sha256", secret()).update(message).digest("hex").slice(0, 32);
}

function matches(expected: string, token: string): boolean {
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function signEmail(email: string): string {
  return sign(email.trim().toLowerCase());
}

export function verifyEmail(email: string, token: string): boolean {
  return matches(signEmail(email), token);
}

// A separate scope for the unsubscribe link in a creator's broadcast email. The
// message is prefixed and includes the creator, so a research-list token can
// never unsubscribe someone from a creator list or the other way around.
const ownedMessage = (creatorId: string, email: string) =>
  `owned-unsubscribe:${creatorId}:${email.trim().toLowerCase()}`;

export function signOwnedUnsubscribe(creatorId: string, email: string): string {
  return sign(ownedMessage(creatorId, email));
}

export function verifyOwnedUnsubscribe(creatorId: string, email: string, token: string): boolean {
  return matches(signOwnedUnsubscribe(creatorId, email), token);
}
