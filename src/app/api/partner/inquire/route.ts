import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { limit } from "@/lib/ratelimit";
import { logError } from "@/lib/log";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  organization: z.string().max(160).optional().or(z.literal("")),
  kind: z.enum(["research", "data_sponsor", "title_sponsor", "advertiser", "other"]).default("other"),
  message: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  const ipKey = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const { success } = await limit(`partner:${ipKey}`);
  if (!success) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  const d = parsed.data;

  let stored = false;
  if (prisma) {
    try {
      await prisma.partnerInquiry.create({
        data: {
          name: d.name,
          email: d.email.trim().toLowerCase(),
          organization: d.organization || null,
          kind: d.kind,
          message: d.message,
        },
      });
      stored = true;
    } catch (err) {
      logError("partner.inquire.store", err);
    }
  }

  if (!stored) {
    return NextResponse.json({ ok: false, stored: false, error: "not_received" }, { status: 503 });
  }

  return NextResponse.json({ ok: true, stored });
}
