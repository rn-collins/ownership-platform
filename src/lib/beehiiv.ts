// beehiiv subscription bridge. Institutions of One is published on beehiiv on
// purpose — owned land — so the on-site signup dual-writes: the consent-first
// ResearchSubscriber row stays the source of truth for the research list, and
// the same email is pushed to the beehiiv publication so the newsletter is one
// list. Guarded: if the env isn't set it no-ops cleanly and never throws, so the
// app builds and runs before beehiiv keys are added in Vercel.
//
// Env (set in Vercel, never committed):
//   BEEHIIV_API_KEY          — a beehiiv API v2 key
//   BEEHIIV_PUBLICATION_ID   — e.g. "pub_xx….."

type BeehiivResult = { ok: boolean; synced: boolean; status?: number };

export function beehiivConfigured(): boolean {
  return Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID);
}

export async function beehiivSubscribe(opts: {
  email: string;
  source?: string;
  referrer?: string;
}): Promise<BeehiivResult> {
  if (!beehiivConfigured()) return { ok: true, synced: false };

  const pub = process.env.BEEHIIV_PUBLICATION_ID as string;
  const key = process.env.BEEHIIV_API_KEY as string;

  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pub}/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: opts.email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: opts.source || "institutions-of-one",
        utm_medium: "website",
        referring_site: opts.referrer || "ownership-platform.vercel.app",
      }),
      // Never let a slow upstream hang the request.
      signal: AbortSignal.timeout(6000),
    });
    return { ok: res.ok, synced: res.ok, status: res.status };
  } catch {
    // Beehiiv down or misconfigured — the consent row is already saved, so the
    // subscriber isn't lost; a later reconcile can re-push. Fail soft.
    return { ok: false, synced: false };
  }
}

export type BeehiivUnsubscribeResult = {
  // unsubscribed: Beehiiv confirmed. not_found: Beehiiv has no subscriber with
  // this email, so there is nothing to stop. not_configured: env keys missing.
  // failed: Beehiiv was unreachable or refused the request.
  outcome: "unsubscribed" | "not_found" | "not_configured" | "failed";
  status?: number;
};

// Stops The Polymath emails for one address. Uses Beehiiv's "update subscription
// by email" endpoint with unsubscribe: true. Never throws; never logs the key.
export async function beehiivUnsubscribe(email: string): Promise<BeehiivUnsubscribeResult> {
  if (!beehiivConfigured()) return { outcome: "not_configured" };

  const pub = process.env.BEEHIIV_PUBLICATION_ID as string;
  const key = process.env.BEEHIIV_API_KEY as string;

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${encodeURIComponent(pub)}/subscriptions/by_email/${encodeURIComponent(email)}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ unsubscribe: true }),
        signal: AbortSignal.timeout(6000),
      },
    );
    if (res.ok) return { outcome: "unsubscribed", status: res.status };
    if (res.status === 404) return { outcome: "not_found", status: 404 };
    return { outcome: "failed", status: res.status };
  } catch {
    return { outcome: "failed" };
  }
}
