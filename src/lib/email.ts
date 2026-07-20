import { Resend } from "resend";

// Guarded Resend client. Null when RESEND_API_KEY is unset, so the app builds and
// runs without email configured — broadcast routes simply report "not configured".
let _resend: Resend | null = null;
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

// The verified sending identity. Set RESEND_FROM to something on your verified
// domain, e.g. "The Ownership Index <hello@rncollins.com>".
export function getFrom(): string | null {
  return process.env.RESEND_FROM ?? null;
}

export interface BroadcastEmail { to: string; subject: string; html: string; text: string; }

// Send one email per subscriber (separate sends, so recipients never see each
// other) in batches of 100 via Resend's batch API. Returns how many were accepted.
export async function sendBroadcast(emails: BroadcastEmail[]): Promise<{ sent: number; error?: string }> {
  const resend = getResend();
  const from = getFrom();
  if (!resend) return { sent: 0, error: "email-not-configured" };
  if (!from) return { sent: 0, error: "from-not-configured" };

  let sent = 0;
  for (let i = 0; i < emails.length; i += 100) {
    const chunk = emails.slice(i, i + 100).map((e) => ({ from, to: e.to, subject: e.subject, html: e.html, text: e.text }));
    try {
      const res = await resend.batch.send(chunk);
      if (!res.error) sent += chunk.length;
    } catch {
      // continue with remaining chunks; report partial
    }
  }
  return { sent };
}
