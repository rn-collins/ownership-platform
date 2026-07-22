import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function ytId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default async function GuestPage({ params }: { params: { id: string } }) {
  if (!prisma) notFound();
  const guest = await prisma.guest.findUnique({
    where: { id: params.id },
    include: { episodes: { where: { publishedAt: { not: null } }, orderBy: { publishedAt: "desc" } } },
  }).catch(() => null);
  if (!guest) notFound();

  return (
    <main>
      <a href="/observatory/episodes" className="postback">← The Show</a>
      <p className="eyebrow">The Observatory · Guest</p>
      <h1>{guest.name}</h1>
      {guest.role && <p className="lede">{guest.role}{guest.org ? ` · ${guest.org}` : ""}{guest.roleCreated ? " — a role that didn't exist until them." : ""}</p>}

      {guest.indexScore != null && (
        <div className="scorecard" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <div className="big">{guest.indexScore}<span className="of"> / 100</span></div>
            {guest.band && <div className="bandlbl">{guest.band}</div>}
            <div className="bandnote">Portfolio Professional Index — how much of an institution they are inside their organization.</div>
          </div>
        </div>
      )}

      {guest.episodes.map((e) => {
        const id = e.youtubeUrl ? ytId(e.youtubeUrl) : null;
        return (
          <article key={e.id} className="episode" style={{ marginTop: 20 }}>
            <h3 className="eptitle">{e.title}</h3>
            {id && <div className="epvideo"><iframe src={`https://www.youtube.com/embed/${id}`} title={e.title} allowFullScreen loading="lazy" /></div>}
            {e.signal && <p className="epsignal"><b>The signal →</b> {e.signal}</p>}
          </article>
        );
      })}
    </main>
  );
}
