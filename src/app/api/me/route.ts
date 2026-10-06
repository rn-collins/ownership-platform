import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dataRightsConfigured, verifyEmail } from "@/lib/token";
import { logError } from "@/lib/log";

// Self-serve data rights, tokenized (no login): GET exports the record, DELETE
// erases it. The token is an HMAC of the email under a server secret, so only a
// signed link can act on it. Nothing in the site emails these links today; the
// privacy page tells people to email RN Collins instead.
function auth(url: URL): string | null {
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const token = url.searchParams.get("t") || "";
  return email && verifyEmail(email, token) ? email : null;
}

// Fail closed: without DATA_RIGHTS_SECRET no token can be trusted, so say the
// service is unavailable (and log that, without any secret value) instead of
// answering. Checked before the token so a missing secret is never mistaken for
// a bad link.
function unavailable() {
  logError("me.secret_missing", new Error("DATA_RIGHTS_SECRET is not set"));
  return NextResponse.json({ error: "unavailable" }, { status: 503 });
}

export async function GET(req: Request) {
  if (!dataRightsConfigured()) return unavailable();
  const email = auth(new URL(req.url));
  if (!email) return NextResponse.json({ error: "invalid" }, { status: 403 });
  if (!prisma) return NextResponse.json({ email, records: [] });
  try {
    const rows = await prisma.researchSubscriber.findMany({ where: { email } });
    return NextResponse.json({ email, records: rows });
  } catch (err) {
    logError("me.export", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!dataRightsConfigured()) return unavailable();
  const email = auth(new URL(req.url));
  if (!email) return NextResponse.json({ error: "invalid" }, { status: 403 });
  if (!prisma) return NextResponse.json({ ok: true, deleted: 0 });
  try {
    const r = await prisma.researchSubscriber.deleteMany({ where: { email } });
    return NextResponse.json({ ok: true, deleted: r.count });
  } catch (err) {
    logError("me.delete", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
