import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { beehiivUnsubscribe } from "@/lib/beehiiv";
import { dataRightsConfigured, verifyEmail, verifyOwnedUnsubscribe } from "@/lib/token";
import { logError } from "@/lib/log";

// Tokenized unsubscribe. Keeps the row and the consent record (sets
// unsubscribedAt) rather than deleting, so the audit trail stays intact.
//
// Research list link: /api/unsubscribe?email=...&t=...
//   Updates the site's own record AND unsubscribes the address from The Polymath
//   on Beehiiv, because Beehiiv keeps sending until it is told to stop.
// Creator list link (broadcast email): /api/unsubscribe?email=...&c=<creatorId>&t=...
//   Updates that creator's Subscriber row only. Beehiiv is not involved.
//
// GET redirects to the /unsubscribe page. POST answers the one-click request
// that mail apps send when the List-Unsubscribe-Post header is present.
export type UnsubscribeStatus = "done" | "partial" | "invalid" | "error" | "unavailable";

async function run(url: URL): Promise<UnsubscribeStatus> {
  if (!dataRightsConfigured()) {
    logError("unsubscribe.secret_missing", new Error("DATA_RIGHTS_SECRET is not set"));
    return "unavailable";
  }
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const token = url.searchParams.get("t") || "";
  const creatorId = url.searchParams.get("c") || "";
  if (!email) return "invalid";

  if (creatorId) {
    if (!verifyOwnedUnsubscribe(creatorId, email, token)) return "invalid";
    if (!prisma) return "done";
    try {
      await prisma.subscriber.updateMany({ where: { creatorId, email, unsubscribedAt: null }, data: { unsubscribedAt: new Date() } });
      return "done";
    } catch (err) {
      logError("unsubscribe.owned", err);
      return "error";
    }
  }

  if (!verifyEmail(email, token)) return "invalid";

  let siteOk = true;
  if (prisma) {
    try {
      await prisma.researchSubscriber.updateMany({ where: { email }, data: { unsubscribedAt: new Date() } });
    } catch (err) {
      logError("unsubscribe", err);
      siteOk = false;
    }
  }

  const bh = await beehiivUnsubscribe(email);
  const beehiivOk = bh.outcome === "unsubscribed" || bh.outcome === "not_found";
  if (!beehiivOk) logError("unsubscribe.beehiiv", new Error(`beehiiv ${bh.outcome}`), { status: bh.status });

  if (siteOk && beehiivOk) return "done";
  // One side worked and the other did not: say so rather than claim success.
  if (siteOk || beehiivOk) return "partial";
  return "error";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = await run(url);
  return NextResponse.redirect(`${url.origin}/unsubscribe?status=${status}`, { status: 303 });
}

export async function POST(req: Request) {
  const status = await run(new URL(req.url));
  const code = status === "done" ? 200 : status === "invalid" ? 400 : status === "unavailable" ? 503 : 500;
  return NextResponse.json({ ok: status === "done", status }, { status: code });
}
