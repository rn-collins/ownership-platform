import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { beehiivSubscribe } from "@/lib/beehiiv";
import { limit } from "@/lib/ratelimit";
import { logError } from "@/lib/log";

const schema = z.object({
  email: z.string().email().max(200),
  name: z.string().max(120).optional().or(z.literal("")),
  handle: z.string().max(120).optional().or(z.literal("")),
  source: z.enum(["index_creator", "index_pro", "observatory", "site"]).default("site"),
  interest: z.string().max(40).optional().or(z.literal("")),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  const ipKey = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const { success } = await limit(`subscribe:${ipKey}`);
  if (!success) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  const d = parsed.data;
  const email = d.email.trim().toLowerCase();

  let stored = false;
  if (prisma) {
    try {
      await prisma.researchSubscriber.upsert({
        where: { email },
        update: {
          name: d.name || undefined,
          handle: d.handle || undefined,
          source: d.source,
          interest: d.interest || undefined,
          consent: true,
        },
        create: {
          email,
          name: d.name || null,
          handle: d.handle || null,
          source: d.source,
          interest: d.interest || null,
          consent: true,
        },
      });
      stored = true;
    } catch (err) {
      logError("research.subscribe.upsert", err);
    }
  }

  const beehiiv = await beehiivSubscribe({ email, source: d.source });
  if (!stored && !beehiiv.synced) {
    return NextResponse.json({ ok: false, stored: false, synced: false, error: "not_saved" }, { status: 503 });
  }

  return NextResponse.json({ ok: true, stored, synced: beehiiv.synced });
}
