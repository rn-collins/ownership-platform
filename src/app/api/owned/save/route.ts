import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/supabase/server";
import { deriveFacts, OWNED_FACT_TIER, type OwnedState } from "@/lib/owned";

// Saves the signed-in creator's OWNED page and — the reflexive part — writes
// auto-verified (0.8-tier) Facts into the graph for what the page proves they own.
// Prior owned-source facts are superseded (history preserved), never deleted.
const linkSchema = z.object({
  label: z.string().min(1).max(80),
  url: z.string().url().max(400),
  kind: z.enum(["link", "newsletter", "membership", "shop", "social"]).default("link"),
  owned: z.boolean().default(false),
});
const schema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{3,40}$/, "3–40 chars, lowercase letters, numbers, hyphens"),
  headline: z.string().max(120).optional(),
  bio: z.string().max(500).optional(),
  customDomain: z.string().max(120).optional().or(z.literal("")),
  emailCapture: z.boolean().default(false),
  published: z.boolean().default(false),
  links: z.array(linkSchema).max(20).default([]),
});

export async function POST(req: Request) {
  const user = await getUser();
  if (!user || !prisma) return NextResponse.json({ saved: false });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }
  const d = parsed.data;
  const customDomain = d.customDomain && d.customDomain.length ? d.customDomain : null;

  try {
    // Slug/domain uniqueness across other creators.
    const clash = await prisma.creator.findFirst({
      where: { slug: d.slug, NOT: { authUserId: user.id } },
      select: { id: true },
    });
    if (clash) return NextResponse.json({ error: { slug: ["That handle is taken."] } }, { status: 409 });

    const creator = await prisma.creator.upsert({
      where: { authUserId: user.id },
      update: {
        slug: d.slug,
        ownedHeadline: d.headline ?? null,
        ownedBio: d.bio ?? null,
        customDomain,
        emailCapture: d.emailCapture,
        ownedPublished: d.published,
        ownedUpdatedAt: new Date(),
      },
      create: {
        authUserId: user.id,
        slug: d.slug,
        ownedHeadline: d.headline ?? null,
        ownedBio: d.bio ?? null,
        customDomain,
        emailCapture: d.emailCapture,
        ownedPublished: d.published,
        ownedUpdatedAt: new Date(),
      },
    });

    // Replace the link set (simplest correct model for v1).
    await prisma.ownedLink.deleteMany({ where: { creatorId: creator.id } });
    if (d.links.length) {
      await prisma.ownedLink.createMany({
        data: d.links.map((l, i) => ({
          creatorId: creator.id,
          label: l.label,
          url: l.url,
          kind: l.kind,
          owned: l.owned,
          position: i,
        })),
      });
    }

    // ---- Fusion: write auto-verified evidence for what OWNED proves ----
    const state: OwnedState = {
      published: d.published,
      customDomain,
      emailCapture: d.emailCapture,
      links: d.links.map((l) => ({ kind: l.kind, owned: l.owned, url: l.url })),
    };
    const derived = deriveFacts(state);
    // Supersede prior owned-source facts (keep the history via supersededId chain).
    const prior = await prisma.fact.findMany({
      where: { creatorId: creator.id, source: "owned:platform" },
      select: { id: true, predicate: true },
    });
    const priorByPred = new Map(prior.map((p) => [p.predicate, p.id]));
    if (derived.length) {
      await prisma.fact.createMany({
        data: derived.map((f) => ({
          creatorId: creator.id,
          subject: "owned",
          predicate: f.predicate,
          value: f.value,
          evidenceTier: OWNED_FACT_TIER,
          source: f.source,
          methodologyRelevant: true,
          supersedesId: priorByPred.get(f.predicate) ?? null,
        })),
      });
    }

    return NextResponse.json({
      saved: true,
      slug: creator.slug,
      published: d.published,
      verifiedFacts: derived.length,
    });
  } catch {
    return NextResponse.json({ saved: false });
  }
}
