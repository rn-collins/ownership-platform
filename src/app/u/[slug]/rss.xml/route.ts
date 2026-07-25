import { prisma } from "@/lib/db";

export const revalidate = 60; // ISR: public page cached, refreshed within a minute

// A creator's RSS feed: owned, portable distribution no platform can gate. Part of
// the "land you own" promise — readers can follow without an algorithm in between.
function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const origin = new URL(req.url).origin;
  const base = `${origin}/u/${params.slug}`;
  if (!prisma) return new Response("", { status: 404 });

  const creator = await prisma.creator.findUnique({
    where: { slug: params.slug },
    select: { id: true, slug: true, displayName: true, ownedHeadline: true, ownedPublished: true },
  });
  if (!creator || !creator.ownedPublished) return new Response("Not found", { status: 404 });

  const posts = await prisma.post.findMany({
    where: { creatorId: creator.id, published: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  const name = creator.displayName || creator.slug || "";
  const items = posts.map((p) => `
    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${base}/${p.slug}</link>
      <guid isPermaLink="true">${base}/${p.slug}</guid>
      ${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ""}
      ${p.excerpt ? `<description>${xmlEscape(p.excerpt)}</description>` : ""}
    </item>`).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${xmlEscape(name)}</title>
  <link>${base}</link>
  <description>${xmlEscape(creator.ownedHeadline ?? name)}</description>
  ${items}
</channel></rss>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
