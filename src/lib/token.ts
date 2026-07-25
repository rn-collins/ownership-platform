import { createHmac, timingSafeEqual } from "node:crypto";

// Signed tokens for self-serve data rights (unsubscribe / export / delete).
// The token is an HMAC of the email under a server secret, so a link can be
// included in an email footer and verified without a login. Falls back to a
// build-local secret in dev; set DATA_RIGHTS_SECRET in production.
const secret = () => process.env.DATA_RIGHTS_SECRET || "dev-only-insecure-secret";

export function signEmail(email: string): string {
  return createHmac("sha256", secret()).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

export function verifyEmail(email: string, token: string): boolean {
  const expected = signEmail(email);
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
