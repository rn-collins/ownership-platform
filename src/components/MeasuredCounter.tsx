"use client";

import { useEffect, useState } from "react";

// Live "N measured" proof number. Sums both instruments. Renders nothing until
// there's a real count, so the site never shows a hollow "0 measured."
export function MeasuredCounter({ prefix = "", suffix = "people measured so far" }: { prefix?: string; suffix?: string }) {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    Promise.all([
      fetch("/api/benchmark?instrument=ownership").then((r) => r.json()).catch(() => ({ n: 0 })),
      fetch("/api/benchmark?instrument=portfolio_professional").then((r) => r.json()).catch(() => ({ n: 0 })),
    ]).then(([a, b]) => { if (live) setN((a?.n ?? 0) + (b?.n ?? 0)); });
    return () => { live = false; };
  }, []);

  if (!n || n <= 0) return null;
  return (
    <span className="measured">{prefix}<b>{n.toLocaleString()}</b> {suffix}</span>
  );
}
