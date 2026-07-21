import { DIMENSIONS, type DimensionKey } from "@/lib/engine";

// Pure SVG radar. raw values 0..20 per dimension. No dependencies.
export function Radar({ values, size = 300 }: { values: Record<DimensionKey, number>; size?: number }) {
  const R = size * 0.36, CX = size / 2, CY = size * 0.47;
  // Horizontal padding so edge labels (Content, Business) are never clipped.
  const PAD = 30;
  const pt = (i: number, f: number): [number, number] => {
    const a = -Math.PI / 2 + i * ((2 * Math.PI) / 5);
    return [CX + Math.cos(a) * R * f, CY + Math.sin(a) * R * f];
  };
  const poly = (fr: number[]) => fr.map((f, i) => pt(i, f).join(",")).join(" ");
  const fr = DIMENSIONS.map((d) => values[d.key] / 20);

  return (
    <svg width={size} height={size * 0.9} viewBox={`${-PAD} 0 ${size + 2 * PAD} ${size * 0.9}`} role="img" aria-label="Ownership profile radar" style={{ overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon key={r} points={poly([r, r, r, r, r])} fill="none" stroke="#2c3348" strokeWidth={1} />
      ))}
      {DIMENSIONS.map((d, i) => {
        const [x, y] = pt(i, 1);
        const [lx, ly] = pt(i, 1.13);
        const anchor = lx > CX + 6 ? "start" : lx < CX - 6 ? "end" : "middle";
        return (
          <g key={d.key}>
            <line x1={CX} y1={CY} x2={x} y2={y} stroke="#2c3348" strokeWidth={1} />
            <text x={lx} y={ly + 3} fill="#9aa2b4" fontSize={9.5} fontFamily="Helvetica, Arial" textAnchor={anchor}>
              {d.name.split(" ")[0]}
            </text>
          </g>
        );
      })}
      <polygon points={poly(fr)} fill="rgba(200,164,104,0.33)" stroke="#c8a468" strokeWidth={2} />
      {DIMENSIONS.map((d, i) => {
        const [x, y] = pt(i, values[d.key] / 20);
        return <circle key={d.key} cx={x} cy={y} r={3} fill="#c8a468" />;
      })}
    </svg>
  );
}
