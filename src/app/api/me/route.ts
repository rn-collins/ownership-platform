import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyEmail } from "@/lib/token";
import { logError } from "@/lib/log";

// Self-serve data rights, tokenized (no login): GET exports the record, DELETE
// erases it. The token is an HMAC of the email under a server secret, so only a
// signed link (delivered to that email) can act on it.
function auth(url: URL): string | null {
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const token = url.searchParams.get("t") || "";
  return email && verifyEmail(email, token) ? email : null;
}

export async function GET(req: Request) {
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
