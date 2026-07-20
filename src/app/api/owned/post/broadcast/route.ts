import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/supabase/server";
import { getResend, getFrom, sendBroadcast } from "@/lib/email";
import { renderMarkdown, plainExcerpt } from "@/lib/markdown";
import { EVIDENCE_TIER } from "@/lib/engine";

// Broadcast a published post to the creator's owned subscribers via Resend.
// Owned audience + owned content + owned delivery: the full loop. Reaching your
// audience without a platform in the middle is strong evidence, so a successful
// send writes an auto-verified (0.8) audience-distribution fact into the graph.
const schema = z.object({ postId: z.string() });

export async function POST(req: Request) {
  const user = await getUser();
  if (!user || !prisma) return NextResponse.json({ ok: false, error: "not-configured" });

  // Fail clearly if email isn't set up, before touching data.
  if (!getResend() || !getFrom()) {
    return NextResponse.json({ ok: false, error: "email-not-configured" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  const creator = await prisma.creator.findUnique({
    where: { authUserId: user.id },
    select: { id: true, slug: true, displayName: true },
  });
  if (!creator) return NextResponse.json({ ok: false, error: "no-creator" }, { status: 400 });

  const post = await prisma.post.findFirst({
    where: { id: parsed.data.postId, creatorId: creator.id, published: true },
  });
  if (!post) return NextResponse.json({ ok: false, error: "post-not-published" }, { status: 400 });
  if (post.broadcastAt) return NextResponse.json({ ok: false, error: "already-sent" }, { status: 409 });

  const subs = await prisma.subscriber.findMany({ where: { creatorId: creator.id }, select: { email: true } });
  if (subs.length === 0) return NextResponse.json({ ok: false, error: "no-subscribers" }, { status: 400 });

  const origin = new URL(req.url).origin;
  const url = `${origin}/u/${creator.slug}/${post.slug}`;
  const name = creator.displayName || creator.slug || "";
  const contentHtml = renderMarkdown(post.body);
  const html = `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1b2233;">
    <h1 style="font-size:24px;">${post.title}</h1>
    <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;">${contentHtml}</div>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#6b7488;margin-top:24px;">
      You're receiving this because you subscribed to ${name}. <a href="${url}">Read on the web</a>.
    </p>
  </div>`;
  const text = `${post.title}\n\n${plainExcerpt(post.body, 120)}\n\nRead: ${url}`;

  const emails = subs.map((s) => ({ to: s.email, subject: post.title, html, text }));
  const { sent, error } = await sendBroadcast(emails);
  if (error) return NextResponse.json({ ok: false, error }, { status: 400 });

  await prisma.post.update({
    where: { id: post.id },
    data: { broadcastAt: new Date(), broadcastCount: sent },
  });

  // Fusion: reaching an owned audience directly is audience-distribution evidence.
  const existing = await prisma.fact.findFirst({
    where: { creatorId: creator.id, source: "owned:broadcast", predicate: "A3" },
    select: { id: true },
  });
  await prisma.fact.create({
    data: {
      creatorId: creator.id,
      subject: "owned",
      predicate: "A3",
      value: Math.min(5, 2 + Math.floor(sent / 100)), // scales gently with reach
      evidenceTier: EVIDENCE_TIER.auto,
      source: "owned:broadcast",
      methodologyRelevant: true,
      supersedesId: existing?.id ?? null,
    },
  });

  return NextResponse.json({ ok: true, sent });
}
