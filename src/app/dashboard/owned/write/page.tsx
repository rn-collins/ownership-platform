import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { Writer, type PostRow } from "./Writer";

export const dynamic = "force-dynamic";

// The creator's writing surface. Loads their posts and hands them to the client
// editor. Publishing here writes owned-rights evidence into the graph.
export default async function WritePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  let slug = "";
  let posts: PostRow[] = [];
  let subscriberCount = 0;
  if (prisma) {
    const creator = await prisma.creator.findUnique({
      where: { authUserId: user.id },
      select: { id: true, slug: true },
    });
    slug = creator?.slug ?? "";
    if (creator) {
      const rows = await prisma.post.findMany({
        where: { creatorId: creator.id },
        orderBy: { updatedAt: "desc" },
      });
      posts = rows.map((p) => ({
        id: p.id, slug: p.slug, title: p.title, body: p.body,
        published: p.published, updatedAt: p.updatedAt.toISOString(),
        broadcastAt: p.broadcastAt ? p.broadcastAt.toISOString() : null,
        broadcastCount: p.broadcastCount,
      }));
      subscriberCount = await prisma.subscriber.count({ where: { creatorId: creator.id } });
    }
  }

  return (
    <main>
      <p className="eyebrow">OWNED · Write</p>
      <h1>Your content home</h1>
      <p className="lede">Publish on land you own. Your words, your URL, your RSS. Nothing here depends on a platform&apos;s reach.{slug ? <> Your posts live at <code>/u/{slug}</code>.</> : <> Set a handle on your <a href="/dashboard/owned">OWNED page</a> first.</>}</p>
      <Writer initialPosts={posts} slug={slug} dbReady={!!prisma} subscriberCount={subscriberCount} />
    </main>
  );
}
