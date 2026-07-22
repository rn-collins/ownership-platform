"use client";

import { useMemo, useState } from "react";

// A node on the foresight map: an individual who became an institution.
type Node = { name: string; role: string; domain: string; kind: "professional" | "polymath"; created?: boolean };

// Seed constellation — real people (from research), so the map is alive on day one.
// Live guests + nominations layer on top once the backend is wired.
const SEED: Node[] = [
  { name: "Suzie Reider", role: "Founded YouTube's revenue org", domain: "Media", kind: "professional", created: true },
  { name: "Kenny Gold", role: "First-ever Global Chief Creator Officer, Edelman", domain: "Media", kind: "professional", created: true },
  { name: "Steven Bartlett", role: "Entrepreneur · investor · #1 podcaster", domain: "Media", kind: "polymath" },
  { name: "Ashley Rudder", role: "Chief Creator Officer, Whalar", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Gordon Glenister", role: "Founded the BCMA influence division", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Claire Zau", role: "First creator-investor partner, Lightspeed", domain: "Venture", kind: "professional", created: true },
  { name: "Brad Keywell", role: "Entrepreneur · investor · artist · professor", domain: "Venture", kind: "polymath" },
  { name: "Klitos Teklos", role: "First-ever Chief Brand Officer, Tory Burch", domain: "Fashion & Brand", kind: "professional", created: true },
  { name: "Charlotte Tansill", role: "New President, Social/Creator/Earned, Publicis", domain: "Agency", kind: "professional", created: true },
  { name: "Kunal Shah", role: "CRED founder → head of WhatsApp", domain: "Tech", kind: "professional", created: true },
  { name: "Mo Gawdat", role: "Ex-Google [X] CBO · author · AI", domain: "Tech", kind: "polymath" },
  { name: "Josephus Allmond", role: "Virginia's first-ever Chief Energy Officer", domain: "Government", kind: "professional", created: true },
  { name: "Peter Diamandis", role: "Engineer · physician · founder (XPRIZE)", domain: "Science", kind: "polymath" },
  { name: "Noubar Afeyan", role: "Inventor · founder · 100+ ventures (Flagship, Moderna)", domain: "Science", kind: "polymath" },
  { name: "Nadir Godrej", role: "Business · science · poetry ('the Renaissance man')", domain: "Business", kind: "polymath" },
];

const DOMAINS = ["Media", "Creator Economy", "Fashion & Brand", "Venture", "Agency", "Tech", "Government", "Science", "Business"];

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
              fill={n.kind === "professional" ? "#c8a468" : "#8fa1c7"}
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
        <span><i className="dot pro" /> Role built around them</span>
        <span><i className="dot poly" /> Polymath / range</span>
        <span className="obsmaphint">Hover a node · {placed.length} charted · grows with every nomination</span>
      </div>
    </div>
  );
}
