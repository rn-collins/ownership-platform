import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/supabase/server";
import { plainExcerpt } from "@/lib/markdown";
import { EVIDENCE_TIER } from "@/lib/engine";

// Create / update / publish / unpublish / delete a post on the creator's OWNED
// content home. Publishing content on land the creator owns is evidence of owned
// rights + owned distribution, so the first published post writes an auto-verified
// (0.8) fact into the graph.
const schema = z.object({
  id: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]{1,60}$/, "lowercase letters, numbers, hyphens").optional(),
  title: z.string().min(1).max(160),
  body: z.string().max(50000),
  published: z.boolean().default(false),
  delete: z.boolean().optional(),
});

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 60) || "post";
}

export async function POST(req: Request) {
  const user = await getUser();
  if (!user || !prisma) return NextResponse.json({ saved: false });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  const d = parsed.data;

  const creator = await prisma.creator.findUnique({ where: { authUserId: user.id }, select: { id: true } });
  if (!creator) return NextResponse.json({ error: "Set up your OWNED page first." }, { status: 400 });

  try {
    // Delete
    if (d.delete && d.id) {
      await prisma.post.deleteMany({ where: { id: d.id, creatorId: creator.id } });
      return NextResponse.json({ saved: true, deleted: true });
    }

    let slug = d.slug || slugify(d.title);
    // Ensure slug is unique for this creator (excluding the post being edited).
    const clash = await prisma.post.findFirst({
      where: { creatorId: creator.id, slug, NOT: d.id ? { id: d.id } : undefined },
      select: { id: true },
    });
    if (clash) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

    const excerpt = plainExcerpt(d.body);
    const publishedAt = d.published ? new Date() : null;

    const post = d.id
      ? await prisma.post.update({
          where: { id: d.id },
          data: { title: d.title, body: d.body, excerpt, slug, published: d.published, publishedAt },
        })
      : await prisma.post.create({
          data: { creatorId: creator.id, slug, title: d.title, body: d.body, excerpt, published: d.published, publishedAt },
        });

    // Fusion: once the creator has any published post, record owned-rights evidence.
    if (d.published) {
      const publishedCount = await prisma.post.count({ where: { creatorId: creator.id, published: true } });
      if (publishedCount > 0) {
        const existing = await prisma.fact.findFirst({
          where: { creatorId: creator.id, source: "owned:content", predicate: "R2" },
          select: { id: true },
        });
        await prisma.fact.create({
          data: {
            creatorId: creator.id,
            subject: "owned",
            predicate: "R2",
            value: 3,
            evidenceTier: EVIDENCE_TIER.auto,
            source: "owned:content",
            methodologyRelevant: true,
            supersedesId: existing?.id ?? null,
          },
        });
      }
    }

    return NextResponse.json({ saved: true, id: post.id, slug: post.slug, published: post.published });
  } catch {
    return NextResponse.json({ saved: false });
  }
}
