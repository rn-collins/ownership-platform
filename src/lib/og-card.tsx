import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

/**
 * Typographic share card in the site's look: the I/1 mark, a kicker, a title and one line of detail.
 * It carries words only; no photograph is used or implied (MAIN-015).
 */
export function ogCard({ kicker, title, detail }: { kicker: string; title: string; detail?: string }) {
  const titleSize = title.length > 48 ? 58 : title.length > 28 ? 72 : 88;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4efe5", color: "#11100e", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div style={{ width: 220, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#11100e", color: "#dfff00", fontSize: 120, fontWeight: 900, letterSpacing: "-0.1em", paddingRight: 12 }}>I/1</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 62px 52px" }}>
        <div style={{ display: "flex", fontSize: 24, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" }}>{clip(kicker, 60)}</div>
        <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: titleSize, lineHeight: 1, letterSpacing: "-0.035em" }}>{clip(title, 90)}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {detail ? <div style={{ display: "flex", fontSize: 28, lineHeight: 1.3, marginBottom: 18 }}>{clip(detail, 120)}</div> : null}
          <div style={{ display: "flex", fontSize: 22, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>Institutions of One · RN Collins</div>
        </div>
      </div>
    </div>,
    OG_SIZE,
  );
}
