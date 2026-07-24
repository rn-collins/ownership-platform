import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { limit } from "@/lib/ratelimit";
import { logError } from "@/lib/log";
import { RESEARCH_VERSION } from "@/lib/research";

// Anonymous benchmark write. The stored record holds ONLY the banded answers and
// research modules — no identity. The IP is used solely as an ephemeral rate-limit
// key and is never persisted, which is what keeps the dataset genuinely anonymous.
const schema = z.object({
  responses: z.record(z.string(), z.number().min(0).max(5)),
  research: z.record(z.string(), z.any()).optional(),
  instrument: z.enum(["ownership", "portfolio_professional"]).default("ownership"),
  methodologyVersion: z.string().max(20).optional(),
});

export async function POST(req: Request) {
  const ipKey = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const { success } = await limit(`bm:${ipKey}`);
  if (!success) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 422 });

  // No database configured (local dev): accept and drop.
  if (!prisma) return NextResponse.json({ ok: true, stored: false });

  try {
    await prisma.assessment.create({
      data: {
        instrument: parsed.data.instrument,
        source: "self",
        anonymous: true,
        responses: parsed.data.responses,
        research: parsed.data.research ?? undefined,
        methodologyVersion: parsed.data.methodologyVersion,
        researchVersion: RESEARCH_VERSION,
      },
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    logError("benchmark.create", err);
    return NextResponse.json({ ok: true, stored: false });
  }
}
