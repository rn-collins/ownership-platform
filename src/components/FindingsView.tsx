"use client";

import { useEffect, useState } from "react";

type Agg = { n: number; enough: boolean; mean?: number; median?: number; distribution?: number[] };

function useAgg(instrument: string) {
  const [data, setData] = useState<Agg | null>(null);
  useEffect(() => {
    let active = true;
    fetch(`/api/benchmark?instrument=${instrument}`).then((response) => response.json())
      .then((result) => { if (active) setData(result); }).catch(() => {});
    return () => { active = false; };
  }, [instrument]);
  return data;
}

function Panel({ title, audience, data }: { title: string; audience: string; data: Agg | null }) {
  if (!data) return <div className="find-panel"><div className="find-title">{title}</div><p className="find-empty">Loading…</p></div>;
  if (!data.enough) return (
    <div className="find-panel">
      <div className="find-title">{title} <span className="find-for">{audience}</span></div>
      <p className="find-empty">
        {data.n > 0
          ? `${data.n.toLocaleString()} responses so far. Aggregate results will appear when the reporting threshold is reached.`
          : "No aggregate results are available yet."}
      </p>
    </div>
  );

  const max = Math.max(1, ...(data.distribution ?? [1]));
  return (
    <div className="find-panel">
      <div className="find-title">{title} <span className="find-for">{audience}</span></div>
      <div className="find-stats">
        <div><span className="find-big">{data.mean}</span><span className="find-lbl">mean score</span></div>
        <div><span className="find-big">{data.median}</span><span className="find-lbl">median score</span></div>
        <div><span className="find-big">{data.n.toLocaleString()}</span><span className="find-lbl">responses</span></div>
      </div>
      <div className="find-hist" aria-label="Score distribution in ten-point ranges">
        {(data.distribution ?? []).map((count, index) => (
          <div key={index} className="find-bar-wrap" title={`${index * 10}–${index * 10 + 9}: ${count}`}>
            <div className="find-bar" style={{ height: `${(count / max) * 100}%` }} />
            <span className="find-xlabel">{index * 10}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FindingsView() {
  const ownership = useAgg("ownership");
  const professional = useAgg("portfolio_professional");
  return (
    <div className="findings">
      <Panel title="Ownership Index" audience="creators and independent operators" data={ownership} />
      <Panel title="Portfolio Professional" audience="professionals" data={professional} />
      <p className="disc">
        Results are anonymous, self-reported, and exploratory. Only complete responses to the current assessment versions
        are included. Score distributions are shown in ten-point ranges. See the <a href="/methodology" className="fwlink">methodology and limitations</a>.
      </p>
    </div>
  );
}
