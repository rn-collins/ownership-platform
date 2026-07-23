import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

// Opt-in to The Observatory research list — the audience engine behind the two
// indices and the map. Consent-first: personal data is stored ONLY when consent
// is explicitly true. Guarded: no-ops cleanly if the DB isn't configured, so it
// builds and runs before the backend is wired.
const schema = z.object({
  email: z.string().email().max(200),
  name: z.string().max(120).optional().or(z.literal("")),
  handle: z.string().max(120).optional().or(z.literal("")),
  source: z.enum(["index_creator", "index_pro", "observatory", "site"]).default("site"),
  interest: z.string().max(40).optional().or(z.literal("")),
  consent: z.literal(true), // must explicitly opt in — no consent, no row
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  const d = parsed.data;
  const email = d.email.trim().toLowerCase();

  if (!prisma) return NextResponse.json({ ok: true, stored: false });

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
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: true, stored: false });
  }
}
