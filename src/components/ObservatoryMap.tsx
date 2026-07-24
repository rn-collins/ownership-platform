"use client";

import { useMemo, useState } from "react";
import { SEED, OBSERVATORY_DOMAINS as DOMAINS, type Node } from "@/lib/observatory_seed";

type Lens = "all" | "creator" | "professional";
type Placed = Node & { x: number; y: number; cx: number; cy: number; i: number };

const CREATOR = "#5bbfa5";
const PRO = "#c8a468";

export function ObservatoryMap({ nodes = SEED }: { nodes?: Node[] }) {
  const [lens, setLens] = useState<Lens>("all");
  const [domain, setDomain] = useState<string | "all">("all");
  const [builtOnly, setBuiltOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const W = 1000, H = 660, CX = W / 2, CY = H / 2;

  // Which domains actually have nodes, in canonical order — cluster centers ring the field.
  const usedDomains = useMemo(
    () => DOMAINS.filter((d) => nodes.some((n) => n.domain === d)),
    [nodes],
  );

  const placed: Placed[] = useMemo(() => {
    const centers: Record<string, [number, number]> = {};
    usedDomains.forEach((d, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / usedDomains.length;
      centers[d] = [CX + Math.cos(a) * 250, CY + Math.sin(a) * 208];
    });
    const perDomain: Record<string, number> = {};
    return nodes.map((n, i) => {
      const [dx, dy] = centers[n.domain] ?? [CX, CY];
      const k = (perDomain[n.domain] = (perDomain[n.domain] ?? 0) + 1) - 1;
      const ring = 30 + k * 19;
      const a = k * 2.399; // golden-angle scatter keeps clusters legible
      return { ...n, i, x: dx + Math.cos(a) * ring, y: dy + Math.sin(a) * ring, cx: dx, cy: dy };
    });
  }, [nodes, usedDomains]);

  const q = query.trim().toLowerCase();
  function matches(n: Placed): boolean {
    if (lens !== "all" && n.kind !== lens) return false;
    if (domain !== "all" && n.domain !== domain) return false;
    if (builtOnly && !n.created) return false;
    if (q && !(`${n.name} ${n.role} ${n.domain}`.toLowerCase().includes(q))) return false;
    return true;
  }

  const shown = placed.filter(matches);
  const sel = selected != null ? placed[selected] : null;

  const counts = useMemo(() => ({
    total: placed.length,
    creators: placed.filter((n) => n.kind === "creator").length,
    pros: placed.filter((n) => n.kind === "professional").length,
    built: placed.filter((n) => n.created).length,
  }), [placed]);

  return (
    <div className="obs">
      {/* controls */}
      <div className="obs-controls">
        <div className="obs-lens">
          {(["all", "creator", "professional"] as Lens[]).map((l) => (
            <button
              key={l}
              className={`obs-tab${lens === l ? " on" : ""}`}
              onClick={() => setLens(l)}
              type="button"
            >
              {l === "all" ? "Everyone" : l === "creator" ? "Creators" : "Professionals"}
            </button>
          ))}
        </div>
        <input
          className="obs-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a name, role, or field…"
          aria-label="Search the Observatory"
        />
        <select className="obs-domain" value={domain} onChange={(e) => setDomain(e.target.value)} aria-label="Filter by field">
          <option value="all">All fields</option>
          {usedDomains.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <label className="obs-built">
          <input type="checkbox" checked={builtOnly} onChange={(e) => setBuiltOnly(e.target.checked)} />
          <span>Role built around them</span>
        </label>
      </div>

      <div className="obs-stage">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="The Observatory — a map of individuals becoming institutions" className="obs-svg">
          <defs>
            <radialGradient id="obsglow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1b2440" />
              <stop offset="100%" stopColor="#111829" />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={W} height={H} fill="url(#obsglow)" rx={14} />

          {/* spokes */}
          {placed.map((n) => {
            const on = matches(n);
            return (
              <line key={`l${n.i}`} x1={n.cx} y1={n.cy} x2={n.x} y2={n.y}
                stroke={on ? "#2f3a55" : "#1c2438"} strokeWidth={1} />
            );
          })}

          {/* domain labels */}
          {usedDomains.map((d) => {
            const c = placed.find((n) => n.domain === d)!;
            const dim = domain !== "all" && domain !== d;
            return (
              <text key={`d${d}`} x={c.cx} y={c.cy - 2} fill={dim ? "#39435c" : "#6b7488"} fontSize={11}
                fontFamily="Helvetica, Arial" textAnchor="middle"
                style={{ letterSpacing: 1, textTransform: "uppercase", opacity: dim ? 0.5 : 1 }}>
                {d}
              </text>
            );
          })}

          {/* nodes */}
          {placed.map((n) => {
            const on = matches(n);
            const isSel = selected === n.i;
            const isHov = hover === n.i;
            const r = isSel ? 9 : isHov ? 8 : 5.6;
            return (
              <g key={n.i}
                onMouseEnter={() => setHover(n.i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setSelected(isSel ? null : n.i)}
                style={{ cursor: "pointer", opacity: on ? 1 : 0.14, transition: "opacity .2s" }}>
                {isSel && <circle cx={n.x} cy={n.y} r={r + 6} fill="none" stroke={n.kind === "creator" ? CREATOR : PRO} strokeWidth={1.2} opacity={0.5} />}
                <circle cx={n.x} cy={n.y} r={r}
                  fill={n.kind === "creator" ? CREATOR : PRO}
                  stroke={n.created ? "#e6c68a" : "none"} strokeWidth={n.created ? 1.6 : 0} />
              </g>
            );
          })}

          {/* hover label (skip if a panel is open for that node) */}
          {hover !== null && selected !== hover && (() => {
            const n = placed[hover];
            const left = n.x > CX;
            return (
              <g pointerEvents="none">
                <text x={left ? n.x - 12 : n.x + 12} y={n.y - 1} fill="#fff" fontSize={14} fontFamily="Georgia, serif" textAnchor={left ? "end" : "start"}>{n.name}</text>
                <text x={left ? n.x - 12 : n.x + 12} y={n.y + 15} fill="#aab0c0" fontSize={11} fontFamily="Helvetica, Arial" textAnchor={left ? "end" : "start"}>{n.role}</text>
              </g>
            );
          })()}
        </svg>

        {/* empty state when filters match nothing */}
        {shown.length === 0 && (
          <div className="obs-empty">
            <b>No one matches yet.</b>
            Loosen the filters or clear the search — or nominate someone who fits below.
          </div>
        )}

        {/* detail panel */}
        {sel && (
          <aside className="obs-panel">
            <button className="obs-panel-x" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <span className={`obs-badge ${sel.kind}`}>{sel.kind === "creator" ? "Ownership Index · creator" : "Portfolio Professional · professional"}</span>
            <h4 className="obs-panel-name">{sel.name}</h4>
            <p className="obs-panel-role">{sel.role}</p>
            <div className="obs-panel-meta">
              <span className="obs-chip">{sel.domain}</span>
              {sel.created && <span className="obs-chip built">The role was built around them</span>}
            </div>
            <a href={sel.kind === "creator" ? "/assess/creator" : "/assess/professional"} className="obs-panel-cta">
              {sel.kind === "creator" ? "Measure your ownership →" : "Measure your standing →"}
            </a>
          </aside>
        )}
      </div>

      {/* legend + counts */}
      <div className="obs-legend">
        <span><i className="dot creator" /> Creator · Ownership Index <b>{counts.creators}</b></span>
        <span><i className="dot pro" /> Professional · Portfolio Professional <b>{counts.pros}</b></span>
        <span className="obs-legend-hint">Ringed = the role was built around them · {shown.length} of {counts.total} shown{q || lens !== "all" || domain !== "all" || builtOnly ? " (filtered)" : ""}</span>
      </div>
    </div>
  );
}
