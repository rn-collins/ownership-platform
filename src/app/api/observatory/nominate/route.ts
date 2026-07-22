import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

// A public nomination for The Observatory. Guarded: no-ops cleanly if the DB
// isn't configured, so it builds and runs before the backend is wired.
const schema = z.object({
  nomineeName: z.string().min(1).max(120),
  nomineeOrg: z.string().max(160).optional().or(z.literal("")),
  nomineeRole: z.string().max(160).optional().or(z.literal("")),
  why: z.string().min(1).max(2000),
  nominatorEmail: z.string().email().max(200).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  const d = parsed.data;

  if (!prisma) return NextResponse.json({ ok: true, stored: false });

  try {
    await prisma.nomination.create({
      data: {
        nomineeName: d.nomineeName,
        nomineeOrg: d.nomineeOrg || null,
        nomineeRole: d.nomineeRole || null,
        why: d.why,
        nominatorEmail: d.nominatorEmail || null,
        source: "web",
      },
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: true, stored: false });
  }
}
