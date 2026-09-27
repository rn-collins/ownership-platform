import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const revalidate = 60; // ISR: public page cached, refreshed within a minute

// A creator's OWNED page — land they own. Public, no chrome, their name up top.
// This is the antithesis of a rented profile: it lives on the platform's domain
// today and their own domain the moment they connect one.
export default async function OwnedPage({ params }: { params: { slug: string } }) {
  if (!prisma) notFound();
  const creator = await prisma.creator.findUnique({
    where: { slug: params.slug },
    include: {
      ownedLinks: { orderBy: { position: "asc" } },
      // published posts, newest first — the content home
    },
  });
  if (!creator || !creator.ownedPublished) notFound();
  const posts = await prisma.post.findMany({
    where: { creatorId: creator.id, published: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
    select: { slug: true, title: true, excerpt: true, publishedAt: true },
  });

  const name = creator.displayName || creator.slug;
  return (
    <main className="owned">
      <div className="ownedcard">
        <div className="ownedavatar">{(name ?? "").slice(0, 1).toUpperCase()}</div>
        <h1 className="ownedname">{name}</h1>
        {creator.ownedHeadline && <p className="ownedhead">{creator.ownedHeadline}</p>}
        {creator.ownedBio && <p className="ownedbio">{creator.ownedBio}</p>}

        {creator.emailCapture && (
          <form className="ownedcapture" action="/api/owned/subscribe" method="post">
            <input type="hidden" name="slug" value={creator.slug ?? ""} />
            <input className="ownedinput" type="email" name="email" placeholder="Your email" required />
            <button className="ownedsub" type="submit">Subscribe</button>
          </form>
        )}

        <div className="ownedlinks">
          {creator.ownedLinks.map((l) => (
            <a key={l.id} className={`ownedlink${l.owned ? " own" : ""}`} href={l.url} target="_blank" rel="noopener noreferrer">
              <span>{l.label}</span>
              {l.owned && <span className="ownedbadge">Owned</span>}
            </a>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="ownedposts">
            <div className="ownedpostshead">
              <span>Writing</span>
              <a href={`/u/${creator.slug}/rss.xml`} className="rsslink" target="_blank" rel="noopener noreferrer">RSS</a>
            </div>
            {posts.map((p) => (
              <a key={p.slug} className="ownedpost" href={`/u/${creator.slug}/${p.slug}`}>
                <span className="ownedposttitle">{p.title}</span>
                {p.excerpt && <span className="ownedpostex">{p.excerpt}</span>}
              </a>
            ))}
          </div>
        )}

        <a className="ownedfoot" href="/">Measured by The Ownership Index</a>
      </div>
    </main>
  );
}
