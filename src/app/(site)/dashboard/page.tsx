import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { assess, improvementPlan, projectedScore } from "@/lib/engine";
import { ITEM_ACTIONS, DIMENSION_WHY, OVERALL_COPY } from "@/lib/instrument";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  createdAt: Date;
  total: number | null;
  overallBand: string | null;
  responses: Record<string, number>;
};

// The signed-in creator's home: score history, trajectory, and the live plan
// computed from their most recent assessment. Turns a one-time score into a
// relationship — the thing they come back to.
export default async function Dashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!prisma) {
    return (
      <main>
        <p className="eyebrow">Your dashboard</p>
        <h1>Signed in</h1>
        <p className="lede">The database isn&apos;t configured in this environment yet, so there&apos;s nothing to show. Once <code>DATABASE_URL</code> is set, your saved assessments appear here.</p>
        <p><a href="/assess/creator" className="fwlink">Take the assessment →</a></p>
      </main>
    );
  }

  const creator = await prisma.creator.findUnique({ where: { authUserId: user.id } });
  const assessments = creator
    ? await prisma.assessment.findMany({
        where: { creatorId: creator.id, anonymous: false },
        orderBy: { createdAt: "asc" },
      })
    : [];

  const rows: Row[] = assessments.map((a) => ({
    id: a.id,
    createdAt: a.createdAt,
    total: a.total,
    overallBand: a.overallBand,
    responses: (a.responses as Record<string, number>) ?? {},
  }));

  if (rows.length === 0) {
    return (
      <main>
        <p className="eyebrow">Your dashboard</p>
        <h1>Nothing saved yet</h1>
        <p className="lede">Take the assessment and your score will save here so you can watch it climb over time.</p>
        <p><a href="/assess/creator"><button className="primary">Take the assessment</button></a></p>
      </main>
    );
  }

  const latest = rows[rows.length - 1];
  const first = rows[0];
  const result = assess(latest.responses);
  const plan = improvementPlan(latest.responses).slice(0, 5);
  const projected = projectedScore(latest.responses, plan.map((a) => a.itemId));
  const delta = rows.length > 1 && first.total != null && latest.total != null ? latest.total - first.total : null;

  // Trajectory sparkline geometry.
  const totals = rows.map((r) => r.total ?? 0);
  const W = 620, H = 120, pad = 14;
  const maxV = 100, minV = 0;
  const xFor = (i: number) => rows.length === 1 ? W / 2 : pad + (i * (W - 2 * pad)) / (rows.length - 1);
  const yFor = (v: number) => H - pad - ((v - minV) / (maxV - minV)) * (H - 2 * pad);
  const pts = totals.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ");

  const fmt = (d: Date) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <main>
      <p className="eyebrow">Your dashboard</p>
      <h1>How much you own</h1>
      <p className="lede">Your ownership over time, and the moves that raise it next. Signed in as {user.email}.</p>

      <div className="scorecard" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="big">{latest.total}<span className="of"> / 100</span></div>
          <div className="bandlbl">{latest.overallBand}</div>
          <div className="bandnote">{OVERALL_COPY[result.overall.key]}</div>
          {delta != null && (
            <div className="conf">
              <span className="pill">{delta >= 0 ? `+${delta}` : delta} since {fmt(first.createdAt)}</span>
              {delta > 0 ? "You are owning more of your business than when you started." : delta < 0 ? "Your ownership has slipped — the plan below is how you recover it." : "Holding steady. The plan below is how you climb."}
            </div>
          )}
        </div>
      </div>

      {rows.length > 1 && (
        <div className="road" style={{ marginTop: 24 }}>
          <h3>Your trajectory</h3>
          <p className="rsub">{rows.length} assessments, {fmt(first.createdAt)} → {fmt(latest.createdAt)}.</p>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Ownership score over time">
            <polyline fill="none" stroke="#b98f4d" strokeWidth="2.5" points={pts} />
            {totals.map((v, i) => (
              <circle key={i} cx={xFor(i)} cy={yFor(v)} r="3.5" fill="#141b2e" />
            ))}
          </svg>
        </div>
      )}

      <div className="bars" style={{ marginTop: 22 }}>
        {result.dimensions.map((d) => (
          <div key={d.key} className="bar">
            <div className="lbl">{d.name}</div>
            <div className="track"><div className="fill" style={{ width: `${(d.raw / 20) * 100}%` }} /></div>
            <div className="sc">{d.raw}<span> /20</span></div>
          </div>
        ))}
      </div>

      <div className="forward" style={{ marginTop: 28 }}>
        <h3>Your next moves</h3>
        {plan.length > 0 ? (
          <>
            <div className="proj">
              <div className="projrow">
                <span className="projnow">{latest.total}</span>
                <span className="projarrow">→</span>
                <span className="projnext">{projected}</span>
              </div>
              <p className="projsub">Make these {plan.length} moves and your Ownership Score rises from {latest.total} to <b>{projected}</b> out of 100.</p>
            </div>
            {plan.map((a, i) => (
              <div key={a.itemId} className="planstep">
                <span className="fwn">{i + 1}</span>
                <div className="planbody">
                  <div className="planhead">
                    <span className="plandim">{a.dimensionName}</span>
                    <span className="planlift">+{a.lift} {a.lift === 1 ? "pt" : "pts"}</span>
                  </div>
                  <div className="planaction">{ITEM_ACTIONS[a.itemId]}</div>
                  <div className="planwhy">{DIMENSION_WHY[a.dimension]}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="fwsub">You are at the top of every measure. The question now is whether you can carry it.</p>
        )}
        <div className="fwcta">
          <a href="/assess/creator"><button className="primary">Re-assess and update my score</button></a>
          <a href="/methodology" className="fwlink">How the score works →</a>
        </div>
      </div>

      <div className="road" style={{ marginTop: 26 }}>
        <h3>History</h3>
        <p className="rsub">Every assessment you&apos;ve saved.</p>
        {[...rows].reverse().map((r) => (
          <div key={r.id} className="step" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div className="d" style={{ textTransform: "none", letterSpacing: 0, color: "var(--slate)", fontWeight: 600 }}>{fmt(r.createdAt)}</div>
            <div className="next"><b style={{ color: "var(--ink)" }}>{r.total} / 100</b> · {r.overallBand}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
