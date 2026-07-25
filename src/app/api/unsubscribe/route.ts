import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyEmail } from "@/lib/token";
import { logError } from "@/lib/log";

// Tokenized unsubscribe from the research list. Keeps the row and the consent
// record (sets unsubscribedAt) rather than deleting, so the audit trail stays
// intact. Link form: /api/unsubscribe?email=...&t=... — redirects to a page.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const token = url.searchParams.get("t") || "";
  const back = `${url.origin}/unsubscribe`;

  if (!email || !verifyEmail(email, token)) return NextResponse.redirect(`${back}?status=invalid`, { status: 303 });
  if (!prisma) return NextResponse.redirect(`${back}?status=done`, { status: 303 });

  try {
    await prisma.researchSubscriber.updateMany({ where: { email }, data: { unsubscribedAt: new Date() } });
    return NextResponse.redirect(`${back}?status=done`, { status: 303 });
  } catch (err) {
    logError("unsubscribe", err);
    return NextResponse.redirect(`${back}?status=error`, { status: 303 });
  }
}
