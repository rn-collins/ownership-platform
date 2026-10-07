import { z } from "zod";

// Contact form logic that does not touch the network or a database, so it can be tested directly.
// The destination address is never written in code: it is read from the CONTACT_TO environment
// variable on the server (the repository is public).

export const CONTACT_TOPICS = [
  ["general", "A general question"],
  ["work", "Working together"],
  ["correction", "A correction or reply about a case record"],
  ["privacy", "A copy or deletion of my data"],
] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number][0];
export const topicLabel = (topic: ContactTopic) => CONTACT_TOPICS.find(([value]) => value === topic)?.[1] ?? "A general question";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  topic: z.enum(CONTACT_TOPICS.map(([value]) => value) as [ContactTopic, ...ContactTopic[]]).default("general"),
  message: z.string().trim().min(10).max(4000),
  // Which site the visitor came from (?from= on /contact): a short slug, nothing else.
  from: z.string().trim().max(40).regex(/^[a-z0-9-]*$/).optional().or(z.literal("")),
  // Honeypot: a field people never see. Anything in it marks the post as automated.
  website: z.string().max(500).optional().or(z.literal("")),
});
export type ContactInput = z.infer<typeof contactSchema>;

export type ContactCapabilities = { deliver: boolean; store: boolean };

/** What this deployment can actually do with a message. Booleans only. */
export function contactCapabilities(env: Record<string, string | undefined>, hasDatabase: boolean): ContactCapabilities {
  return { deliver: Boolean(env.CONTACT_TO && env.RESEND_API_KEY && env.RESEND_FROM), store: hasDatabase };
}

/**
 * A small per-IP limit that needs no outside service. It keeps counts in this server instance's
 * memory, so it is a brake on casual abuse, not a guarantee across many instances.
 */
export function createIpLimiter(max: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, number[]>();
  return {
    take(key: string): boolean {
      const t = now();
      const recent = (hits.get(key) ?? []).filter((time) => t - time < windowMs);
      if (recent.length >= max) { hits.set(key, recent); return false; }
      recent.push(t);
      hits.set(key, recent);
      if (hits.size > 5000) for (const [k, v] of hits) if (v.every((time) => t - time >= windowMs)) hits.delete(k);
      return true;
    },
  };
}

export type ContactResult =
  | { ok: true; delivered: boolean; stored: boolean }
  | { ok: false; error: "not_available" | "invalid" | "rate_limited" };

/** The sentence shown to the visitor. It says "sent" only when the message was handed to the mail provider. */
export function describeContactResult(result: ContactResult): string {
  if (result.ok && result.delivered) return "Your message was sent. RN will reply to the email address you gave.";
  if (result.ok) return "Your message is saved. Email delivery is not switched on yet, so RN may not see it right away. For a faster answer, message RN on LinkedIn.";
  if (result.error === "rate_limited") return "Too many messages from this connection in a short time. Please wait a while and try again.";
  if (result.error === "invalid") return "Some details were not accepted. Please check the form and try again.";
  return "This form cannot receive messages right now. Please reach RN on LinkedIn or by direct message on Instagram.";
}
