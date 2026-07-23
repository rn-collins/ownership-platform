"use client";

import { useMemo, useState } from "react";
import { SEED, OBSERVATORY_DOMAINS as DOMAINS, type Node } from "@/lib/observatory_seed";

export function ObservatoryMap({ nodes = SEED }: { nodes?: Node[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 1000, H = 640, CX = W / 2, CY = H / 2;

  const placed = useMemo(() => {
    const used = DOMAINS.filter((d) => nodes.some((n) => n.domain === d));
    const centers: Record<string, [number, number]> = {};
    used.forEach((d, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / used.length;
      centers[d] = [CX + Math.cos(a) * 235, CY + Math.sin(a) * 200];
    });
    const perDomainIndex: Record<string, number> = {};
    return nodes.map((n) => {
      const [dx, dy] = centers[n.domain] ?? [CX, CY];
      const k = (perDomainIndex[n.domain] = (perDomainIndex[n.domain] ?? 0) + 1) - 1;
      const ring = 34 + k * 20;
      const a = k * 2.399; // golden-angle scatter
      return { ...n, x: dx + Math.cos(a) * ring, y: dy + Math.sin(a) * ring, cx: dx, cy: dy };
    });
  }, [nodes]);

  return (
    <div className="obsmap">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="The Observatory foresight map">
        <rect x={0} y={0} width={W} height={H} fill="#141b2e" rx={12} />
        {placed.map((n, i) => (
          <line key={`l${i}`} x1={n.cx} y1={n.cy} x2={n.x} y2={n.y} stroke="#2a3247" strokeWidth={1} />
        ))}
        {Array.from(new Set(placed.map((n) => n.domain))).map((d) => {
          const c = placed.find((n) => n.domain === d)!;
          return <text key={`d${d}`} x={c.cx} y={c.cy - 4} fill="#5b647c" fontSize={11} fontFamily="Helvetica, Arial" textAnchor="middle" style={{ letterSpacing: 1, textTransform: "uppercase" }}>{d}</text>;
        })}
        {placed.map((n, i) => (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <circle cx={n.x} cy={n.y} r={hover === i ? 8 : 5.5}
              fill={n.kind === "creator" ? "#5bbfa5" : "#c8a468"}
              stroke={n.created ? "#e6c68a" : "none"} strokeWidth={n.created ? 1.5 : 0} />
          </g>
        ))}
        {hover !== null && (() => {
          const n = placed[hover];
          const left = n.x > CX;
          return (
            <g>
              <text x={left ? n.x - 12 : n.x + 12} y={n.y - 2} fill="#fff" fontSize={14} fontFamily="Georgia, serif" textAnchor={left ? "end" : "start"}>{n.name}</text>
              <text x={left ? n.x - 12 : n.x + 12} y={n.y + 15} fill="#aab0c0" fontSize={11} fontFamily="Helvetica, Arial" textAnchor={left ? "end" : "start"}>{n.role}</text>
            </g>
          );
        })()}
      </svg>
      <div className="obsmaplegend">
        <span><i className="dot pro" /> Professional · Portfolio Professional</span>
        <span><i className="dot creator" /> Creator · Ownership Index</span>
        <span className="obsmaphint">Ringed = the role was built around them · hover a node · {placed.length} charted</span>
      </div>
    </div>
  );
}
