import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { limit } from "@/lib/ratelimit";
import { logError } from "@/lib/log";

const schema = z.object({ studyCode: z.string().min(5).max(40), withdrawalToken: z.string().min(20).max(200) });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!(await limit(`interview-withdraw:${ip}`)).success) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  if (!prisma) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  const tokenHash = createHash("sha256").update(parsed.data.withdrawalToken).digest("hex");
  try {
    const participant = await prisma.researchParticipant.findFirst({ where: { studyCode: parsed.data.studyCode, withdrawalTokenHash: tokenHash } });
    if (!participant) return NextResponse.json({ ok: false, error: "invalid" }, { status: 403 });
    await prisma.$transaction([
      prisma.researchParticipant.update({ where: { id: participant.id }, data: { status: "withdrawn", withdrawnAt: new Date(), contactConsent: false } }),
      prisma.cognitiveInterviewSession.updateMany({ where: { participantId: participant.id, status: { in: ["requested", "scheduled"] } }, data: { status: "withdrawn" } }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    logError("research.interviews.withdraw", err);
    return NextResponse.json({ ok: false, error: "error" }, { status: 500 });
  }
}
