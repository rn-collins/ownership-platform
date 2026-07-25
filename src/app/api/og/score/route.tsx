import { ImageResponse } from "next/og";

export const runtime = "edge";

// Dynamic per-score share card. A participant can save/share this image with
// their result. Honest: it shows the self-reported band and, when supplied, a
// percentile — nothing it can't back up. 1200x630 for social unfurls.
// /api/og/score?total=61&band=Building%20ownership&instrument=ownership&pct=34
export async function GET(req: Request) {
  const url = new URL(req.url);
  const total = Math.max(0, Math.min(100, Number(url.searchParams.get("total")) || 0));
  const band = (url.searchParams.get("band") || "").slice(0, 40);
  const instrument = url.searchParams.get("instrument") === "portfolio_professional"
    ? "portfolio_professional" : "ownership";
  const pctRaw = url.searchParams.get("pct");
  const pct = pctRaw != null && pctRaw !== "" ? Math.max(0, Math.min(100, Number(pctRaw))) : null;

  const label = instrument === "portfolio_professional" ? "The Portfolio Professional" : "The Ownership Index";
  const forWhom = instrument === "portfolio_professional" ? "for professionals" : "for creators";
  const accent = instrument === "portfolio_professional" ? "#c8a468" : "#5bbfa5";

  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column",
        background: "#111829", color: "#eee7d8", padding: "64px 72px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "#b98f4d", fontWeight: 700 }}>
          Institutions of One
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: accent, marginBottom: 8 }}>{label} · {forWhom}</div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ fontSize: 150, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{total}</div>
            <div style={{ fontSize: 44, color: "#8a92a6", marginLeft: 10 }}>/ 100</div>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#fff", marginTop: 6 }}>{band}</div>
          {pct != null && (
            <div style={{ display: "flex", fontSize: 24, color: "#aab0c0", marginTop: 8 }}>
              {100 - pct <= 50 ? `Top ${100 - pct}%` : `Higher than ${pct}%`} of those measured so far
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#8a92a6" }}>
          Measure how much you own → ownership-platform.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
