"use client";

import { useEffect, useState } from "react";

type Agg = { n: number; enough: boolean; mean?: number; median?: number; distribution?: number[] };

function useAgg(instrument: string) {
  const [d, setD] = useState<Agg | null>(null);
  useEffect(() => {
    let live = true;
    fetch(`/api/benchmark?instrument=${instrument}`).then((r) => r.json()).then((j) => { if (live) setD(j); }).catch(() => {});
    return () => { live = false; };
  }, [instrument]);
  return d;
}

function Panel({ title, forWhom, d }: { title: string; forWhom: string; d: Agg | null }) {
  if (!d) return <div className="find-panel"><div className="find-title">{title}</div><p className="find-empty">Loading…</p></div>;

  if (!d.enough) {
    return (
      <div className="find-panel">
        <div className="find-title">{title} <span className="find-for">{forWhom}</span></div>
        <p className="find-empty">
          {d.n > 0
            ? `${d.n.toLocaleString()} measured so far. The first readings publish here once the sample is large enough to report honestly.`
            : "No readings yet. This fills in as people measure themselves — the research, in public."}
        </p>
      </div>
    );
  }

  const max = Math.max(1, ...(d.distribution ?? [1]));
  return (
    <div className="find-panel">
      <div className="find-title">{title} <span className="find-for">{forWhom}</span></div>
      <div className="find-stats">
        <div><span className="find-big">{d.mean}</span><span className="find-lbl">mean score</span></div>
        <div><span className="find-big">{d.median}</span><span className="find-lbl">median</span></div>
        <div><span className="find-big">{d.n.toLocaleString()}</span><span className="find-lbl">measured</span></div>
      </div>
      <div className="find-hist" aria-label="Score distribution in 10-point bins">
        {(d.distribution ?? []).map((c, i) => (
          <div key={i} className="find-bar-wrap" title={`${i * 10}–${i * 10 + 9}: ${c}`}>
            <div className="find-bar" style={{ height: `${(c / max) * 100}%` }} />
            <span className="find-xlabel">{i * 10}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FindingsView() {
  const own = useAgg("ownership");
  const pro = useAgg("portfolio_professional");
  return (
    <div className="findings">
      <Panel title="The Ownership Index" forWhom="creators" d={own} />
      <Panel title="The Portfolio Professional" forWhom="professionals" d={pro} />
      <p className="disc">
        Anonymous, self-reported, and provisional by design. Distributions shown in 10-point bins. A percentile appears on
        your own result once the sample is large enough to report without noise. Method and limits on the{" "}
        <a href="/methodology" className="fwlink">methodology page</a>.
      </p>
    </div>
  );
}
