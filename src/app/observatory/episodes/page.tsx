import { prisma } from "@/lib/db";
import { SEED } from "@/lib/observatory_seed";

export const dynamic = "force-dynamic";
export const metadata = { title: "The Job That Didn't Exist — The Observatory" };

function ytId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default async function EpisodesPage() {
  const episodes = prisma
    ? await prisma.episode.findMany({
        where: { publishedAt: { not: null } },
        orderBy: { publishedAt: "desc" },
        include: { guest: true },
      }).catch(() => [])
    : [];

  return (
    <main>
      <p className="eyebrow">The Observatory · The Show</p>
      <h1>The Job That Didn&apos;t Exist</h1>
      <p className="lede">
        Conversations with people whose role was built around them — filmed in motion and live on stage. Each one ends
        on the same question: what does this tell us about how everyone will work next?
      </p>

      {episodes.length > 0 ? (
        <div className="episodes">
          {episodes.map((e) => {
            const id = e.youtubeUrl ? ytId(e.youtubeUrl) : null;
            return (
              <article key={e.id} className="episode">
                <h3 className="eptitle">{e.title}</h3>
                <div className="epmeta">{e.guest?.name}{e.guest?.org ? ` · ${e.guest.org}` : ""} · {e.venue}</div>
                {id && (
                  <div className="epvideo"><iframe src={`https://www.youtube.com/embed/${id}`} title={e.title} allowFullScreen loading="lazy" /></div>
                )}
                {e.signal && <p className="epsignal"><b>The signal →</b> {e.signal}</p>}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <h3>The first episodes are being filmed.</h3>
          <p>The show launches with a small set of founding conversations. Want in? <a href="/assess/professional" className="fwlink">Take the index</a> to see if you&apos;re one of them, or <a href="/observatory" className="fwlink">nominate someone</a> whose job didn&apos;t exist until them.</p>
        </div>
      )}

      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, marginTop: 34, marginBottom: 4 }}>The movement so far</h2>
      <p className="rsub" style={{ marginBottom: 12 }}>People whose work and roles are being built around them — the shortlist we&apos;re charting on <a href="/observatory" className="fwlink">the map</a>.</p>
      <div className="roster">
        {SEED.map((n) => (
          <div key={n.name} className="rostercard">
            <div className="rostername">{n.name}{n.created && <span className="rosterflag">role built around them</span>}</div>
            <div className="rosterrole">{n.role}</div>
            <div className="rosterdomain">{n.domain}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
