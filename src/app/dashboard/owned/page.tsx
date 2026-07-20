import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { OwnedEditor, type OwnedInitial } from "./OwnedEditor";

export const dynamic = "force-dynamic";

// The creator's OWNED control room. Loads current page state and hands it to the
// client editor. Publishing writes verified evidence into the graph (see the API).
export default async function OwnedDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");

  let initial: OwnedInitial = {
    slug: "", headline: "", bio: "", customDomain: "", emailCapture: false, published: false, links: [],
  };
  if (prisma) {
    const creator = await prisma.creator.findUnique({
      where: { authUserId: user.id },
      include: { ownedLinks: { orderBy: { position: "asc" } } },
    });
    if (creator) {
      initial = {
        slug: creator.slug ?? "",
        headline: creator.ownedHeadline ?? "",
        bio: creator.ownedBio ?? "",
        customDomain: creator.customDomain ?? "",
        emailCapture: creator.emailCapture,
        published: creator.ownedPublished,
        links: creator.ownedLinks.map((l) => ({ label: l.label, url: l.url, kind: l.kind, owned: l.owned })),
      };
    }
  }

  return (
    <main>
      <p className="eyebrow">OWNED</p>
      <h1>Your page. Your land.</h1>
      <p className="lede">Build the home base you control, not a profile you rent. Every owned destination you add is verified evidence that raises your Ownership Score. <a href="/dashboard/owned/write" className="fwlink">Write posts →</a></p>
      <OwnedEditor initial={initial} dbReady={!!prisma} />
    </main>
  );
}
