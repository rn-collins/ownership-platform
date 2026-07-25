"use client";

// Before/after dumbbell: shows which dimensions the recommended moves lift, from
// current to projected (each out of 20). Honest and legible where the radar was
// decorative — the eye sees exactly which axes move and by how much.
export function ProjectionDumbbell({ rows }: { rows: { name: string; current: number; projected: number }[] }) {
  const movers = rows.filter((r) => r.projected > r.current);
  if (movers.length === 0) return null;
  const pct = (v: number) => `${(Math.max(0, Math.min(20, v)) / 20) * 100}%`;
  return (
    <div className="dumb">
      <div className="dumb-head">Where these moves take you</div>
      {movers.map((r) => (
        <div key={r.name} className="dumb-row">
          <div className="dumb-lbl">{r.name}</div>
          <div className="dumb-track">
            <div className="dumb-conn" style={{ left: pct(r.current), width: `calc(${pct(r.projected)} - ${pct(r.current)})` }} />
            <div className="dumb-dot now" style={{ left: pct(r.current) }} title={`Now: ${r.current}/20`} />
            <div className="dumb-dot next" style={{ left: pct(r.projected) }} title={`Projected: ${r.projected}/20`} />
          </div>
          <div className="dumb-delta">+{r.projected - r.current}</div>
        </div>
      ))}
      <div className="dumb-key"><span><i className="dumb-dot now" /> now</span><span><i className="dumb-dot next" /> projected</span></div>
    </div>
  );
}
