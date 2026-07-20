import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// A visitor subscribing on a creator's OWNED page. The creator owns this
// relationship directly — no platform sits between them. Accepts a form POST and
// redirects back to the page. Silently idempotent on duplicate email.
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const slug = String(form?.get("slug") ?? "");
  const email = String(form?.get("email") ?? "").trim().toLowerCase();
  const origin = new URL(req.url).origin;
  const back = slug ? `${origin}/u/${slug}?subscribed=1` : `${origin}/`;

  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!valid || !slug || !prisma) return NextResponse.redirect(back, { status: 303 });

  try {
    const creator = await prisma.creator.findUnique({ where: { slug }, select: { id: true } });
    if (creator) {
      await prisma.subscriber.upsert({
        where: { creatorId_email: { creatorId: creator.id, email } },
        update: {},
        create: { creatorId: creator.id, email },
      });
    }
  } catch {
    // swallow — never block the visitor on a storage hiccup
  }
  return NextResponse.redirect(back, { status: 303 });
}
