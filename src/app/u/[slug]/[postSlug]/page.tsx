import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

async function load(slug: string, postSlug: string) {
  if (!prisma) return null;
  const creator = await prisma.creator.findUnique({ where: { slug }, select: { id: true, slug: true, displayName: true, ownedPublished: true } });
  if (!creator || !creator.ownedPublished) return null;
  const post = await prisma.post.findFirst({ where: { creatorId: creator.id, slug: postSlug, published: true } });
  if (!post) return null;
  return { creator, post };
}

export async function generateMetadata({ params }: { params: { slug: string; postSlug: string } }): Promise<Metadata> {
  const data = await load(params.slug, params.postSlug);
  if (!data) return { title: "Not found" };
  return { title: data.post.title, description: data.post.excerpt ?? undefined };
}

export default async function PostPage({ params }: { params: { slug: string; postSlug: string } }) {
  const data = await load(params.slug, params.postSlug);
  if (!data) notFound();
  const { creator, post } = data;
  const name = creator.displayName || creator.slug;
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

  return (
    <main className="postmain">
      <a className="postback" href={`/u/${creator.slug}`}>← {name}</a>
      <article className="post">
        <h1 className="posttitle">{post.title}</h1>
        {date && <p className="postdate">{date}</p>}
        <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
      </article>
      <a className="ownedfoot" href="/">Measured by The Ownership Index</a>
    </main>
  );
}
