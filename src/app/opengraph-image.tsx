import { ImageResponse } from "next/og";

export const alt = "Institutions of One — what people build, carry, control, and continue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f4efe5",
        color: "#11100e",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: 350,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#11100e",
          color: "#dfff00",
          fontSize: 190,
          fontWeight: 900,
          letterSpacing: "-0.1em",
          paddingRight: 20,
        }}
      >
        I/1
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 66px 54px",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          An independent research and editorial project by RN Collins
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 84, lineHeight: 0.92, letterSpacing: "-0.045em" }}>
            Institutions
          </div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 84, lineHeight: 0.92, letterSpacing: "-0.045em" }}>
            of One
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 27, lineHeight: 1.28, maxWidth: 700 }}>
          What people build. What they can carry. What they control. What can continue.
        </div>
      </div>
    </div>,
    size,
  );
}
