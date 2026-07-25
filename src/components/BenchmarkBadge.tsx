"use client";

import { useEffect, useState } from "react";

type Data = { n: number; enough: boolean; percentile?: number | null };

// Reads the anonymous distribution back and tells a participant where they land.
// Honest by construction: below the small-N threshold it shows the growing count
// instead of a noisy percentile, so an early number is never overstated.
export function BenchmarkBadge({ instrument, score }: { instrument: "ownership" | "portfolio_professional"; score: number }) {
  const [d, setD] = useState<Data | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`/api/benchmark?instrument=${instrument}&score=${score}`)
      .then((r) => r.json())
      .then((j) => { if (live) setD(j); })
      .catch(() => {});
    return () => { live = false; };
  }, [instrument, score]);

  if (!d) return null;

  if (d.enough && typeof d.percentile === "number") {
    const top = 100 - d.percentile;
    const phrase = top <= 50 ? `in the top ${top}%` : `higher than ${d.percentile}%`;
    return (
      <div className="bench">
        <span className="bench-pct">{phrase}</span>
        <span className="bench-sub">of the {d.n.toLocaleString()} people measured so far. Percentiles sharpen as more join.</span>
      </div>
    );
  }

  // Not enough data yet — invite them to be early, honestly.
  return (
    <div className="bench">
      <span className="bench-sub">
        {d.n > 0 ? `${d.n.toLocaleString()} measured so far` : "You're among the first to be measured"} — percentiles unlock as the dataset grows.
      </span>
    </div>
  );
}
