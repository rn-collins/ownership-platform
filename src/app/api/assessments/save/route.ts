import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/supabase/server";
import { assess, ITEM_IDS, METHODOLOGY_VERSION } from "@/lib/engine";
import { RESEARCH_VERSION } from "@/lib/research";

// Saves an assessment to the SIGNED-IN creator's account (Supabase auth via cookie).
// Score is recomputed server-side (never trusted from the client). If not signed in
// or no DB configured, returns { saved: false } without error.
const schema = z.object({
  responses: z.record(z.string(), z.number().min(0).max(5)),
  research: z.record(z.string(), z.any()).optional(),
});

export async function POST(req: Request) {
  const user = await getUser();
  if (!user || !prisma) return NextResponse.json({ saved: false });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 422 });
  const expected = new Set(Object.values(ITEM_IDS).flat());
  const received = Object.keys(parsed.data.responses);
  if (received.length !== expected.size || !received.every((id) => expected.has(id))) {
    return NextResponse.json({ error: "incomplete_assessment" }, { status: 422 });
  }

  const result = assess(parsed.data.responses);

  try {
    const creator = await prisma.creator.upsert({
      where: { authUserId: user.id },
      update: {},
      create: { authUserId: user.id },
    });
    const saved = await prisma.assessment.create({
      data: {
        creatorId: creator.id,
        anonymous: false,
        instrument: "ownership",
        source: "self",
        responses: parsed.data.responses,
        research: parsed.data.research ?? undefined,
        methodologyVersion: METHODOLOGY_VERSION,
        researchVersion: RESEARCH_VERSION,
        total: result.total,
        overallBand: result.overall.label,
        confidence: result.confidence.overall,
      },
    });
    return NextResponse.json({ saved: true, id: saved.id, total: result.total });
  } catch {
    return NextResponse.json({ saved: false });
  }
}
