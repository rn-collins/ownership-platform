"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SEED, OBSERVATORY_DOMAINS as DOMAINS, nodeSlug, type Node } from "@/lib/observatory_seed";

type Lens = "all" | "creator" | "professional";
type Placed = Node & { i: number; ax: number; ay: number; fx: number; fy: number };

const CREATOR = "#5bbfa5";
const PRO = "#c8a468";
const W = 1000, H = 680, CX = W / 2, CY = H / 2;

// Deterministic force layout: attract each node to its domain anchor, then push
// overlapping nodes apart. Runs synchronously (seeded, so SSR-stable) — no d3
// dependency, and collision-free however large the roster grows.
function layout(nodes: Node[]): Placed[] {
  const used = DOMAINS.filter((d) => nodes.some((n) => n.domain === d));
  const anchors: Record<string, [number, number]> = {};
  used.forEach((d, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / used.length;
    anchors[d] = [CX + Math.cos(a) * 250, CY + Math.sin(a) * 205];
  });
  const P = nodes.map((n, i) => {
    const [ax, ay] = anchors[n.domain] ?? [CX, CY];
    const a = i * 2.399, r = 12 + (i % 5) * 5; // seeded starting scatter
    return { ...n, i, ax, ay, fx: ax + Math.cos(a) * r, fy: ay + Math.sin(a) * r };
  });
  const R = 24; // min distance between node centers
  for (let iter = 0; iter < 240; iter++) {
    for (const p of P) { p.fx += (p.ax - p.fx) * 0.06; p.fy += (p.ay - p.fy) * 0.06; }
    for (let i = 0; i < P.length; i++) {
      for (let j = i + 1; j < P.length; j++) {
        const dx = P[j].fx - P[i].fx, dy = P[j].fy - P[i].fy;
        const dist = Math.hypot(dx, dy) || 0.01;
        if (dist < R) {
          const push = (R - dist) / 2, ux = dx / dist, uy = dy / dist;
          P[i].fx -= ux * push; P[i].fy -= uy * push;
          P[j].fx += ux * push; P[j].fy += uy * push;
        }
      }
    }
  }
  return P;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function ObservatoryMap({ nodes = SEED, embed = false }: { nodes?: Node[]; embed?: boolean }) {
  const [lens, setLens] = useState<Lens>("all");
  const [domain, setDomain] = useState<string | "all">("all");
  const [builtOnly, setBuiltOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [t, setT] = useState(embed ? 1 : 0);           // settle animation progress
  const [view, setView] = useState({ x: 0, y: 0, s: 1 }); // pan/zoom
  const drag = useRef<{ x: number; y: number } | null>(null);

  const usedDomains = useMemo(() => DOMAINS.filter((d) => nodes.some((n) => n.domain === d)), [nodes]);
  const placed = useMemo(() => layout(nodes), [nodes]);

  // Read filters from the URL on mount; write them back as they change (deep-linkable).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("lens")) setLens(p.get("lens") as Lens);
    if (p.get("domain")) setDomain(p.get("domain")!);
    if (p.get("built") === "1") setBuiltOnly(true);
    if (p.get("q")) setQuery(p.get("q")!);
  }, []);
  useEffect(() => {
    if (embed) return;
    const p = new URLSearchParams();
    if (lens !== "all") p.set("lens", lens);
    if (domain !== "all") p.set("domain", domain);
    if (builtOnly) p.set("built", "1");
    if (query) p.set("q", query);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [lens, domain, builtOnly, query, embed]);

  // Settle animation on mount.
  useEffect(() => {
    if (embed) return;
    let raf = 0; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 700);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [embed]);

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
  const posX = (p: Placed) => p.ax + (p.fx - p.ax) * easeOut(t);
  const posY = (p: Placed) => p.ay + (p.fy - p.ay) * easeOut(t);

  const counts = useMemo(() => ({
    total: placed.length,
    creators: placed.filter((n) => n.kind === "creator").length,
    pros: placed.filter((n) => n.kind === "professional").length,
  }), [placed]);

  // Zoom / pan
  const vb = `${view.x} ${view.y} ${W / view.s} ${H / view.s}`;
  const zoom = (f: number) => setView((v) => {
    const s = Math.max(1, Math.min(4, v.s * f));
    return { s, x: CX - (CX - v.x) * (v.s / s), y: CY - (CY - v.y) * (v.s / s) };
  });
  const reset = () => setView({ x: 0, y: 0, s: 1 });

  function selectNode(i: number) { setSelected((cur) => (cur === i ? null : i)); }

  return (
    <div className="obs">
      {!embed && (
        <div className="obs-controls">
          <div className="obs-lens">
            {(["all", "creator", "professional"] as Lens[]).map((l) => (
              <button key={l} className={`obs-tab${lens === l ? " on" : ""}`} onClick={() => setLens(l)} type="button">
                {l === "all" ? "Everyone" : l === "creator" ? "Creators" : "Professionals"}
              </button>
            ))}
          </div>
          <input className="obs-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a name, role, or field…" aria-label="Search the Observatory" />
          <select className="obs-domain" value={domain} onChange={(e) => setDomain(e.target.value)} aria-label="Filter by field">
            <option value="all">All fields</option>
            {usedDomains.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <label className="obs-built">
            <input type="checkbox" checked={builtOnly} onChange={(e) => setBuiltOnly(e.target.checked)} />
            <span>Role built around them</span>
          </label>
        </div>
      )}

      {!embed && (
        <section className="card" aria-labelledby="observatory-reading-guide" style={{ margin: "12px 0 16px" }}>
          <h3 id="observatory-reading-guide">How to read this Observatory</h3>
          <p style={{ marginBottom: 10 }}>
            This is a <strong>directory of documented cases</strong>, grouped by field. It is not a score chart, ranking,
            network analysis, or statistical model.
          </p>
          <dl style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "7px 14px", margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>
            <dt><strong>Each dot</strong></dt>
            <dd style={{ margin: 0 }}>One person whose public case is included in the Observatory.</dd>
            <dt><strong>Dot color</strong></dt>
            <dd style={{ margin: 0 }}>Teal identifies a creator case; gold identifies a professional case. These are research lenses, not scores.</dd>
            <dt><strong>Field label</strong></dt>
            <dd style={{ margin: 0 }}>The person’s primary field, such as Media, Science, or Tech.</dd>
            <dt><strong>Dot position</strong></dt>
            <dd style={{ margin: 0 }}>Dots are placed near their field label and spaced to avoid overlap. Left, right, height, distance, and the overall shape have no measured meaning.</dd>
            <dt><strong>Gold outline</strong></dt>
            <dd style={{ margin: 0 }}>The case is flagged as an example of an employer or institution creating or materially shaping a role around that person.</dd>
            <dt><strong>Click a dot</strong></dt>
            <dd style={{ margin: 0 }}>See the person, role, field, classification, and link to the documented case profile.</dd>
          </dl>
        </section>
      )}

      <div className="obs-stage">
        <div className="obs-zoom">
          <button aria-label="Zoom in" onClick={() => zoom(1.25)}>+</button>
          <button aria-label="Zoom out" onClick={() => zoom(0.8)}>−</button>
          <button aria-label="Reset view" onClick={reset}>⟲</button>
        </div>
        <svg viewBox={vb} width="100%" role="group" aria-label="The Observatory — a map of individuals becoming institutions" className="obs-svg"
          style={{ cursor: drag.current ? "grabbing" : "grab" }}
          onMouseDown={(e) => { drag.current = { x: e.clientX, y: e.clientY }; }}
          onMouseMove={(e) => {
            if (!drag.current) return;
            const dx = (e.clientX - drag.current.x) * (W / view.s) / (e.currentTarget.clientWidth || W);
            const dy = (e.clientY - drag.current.y) * (H / view.s) / (e.currentTarget.clientHeight || H);
            drag.current = { x: e.clientX, y: e.clientY };
            setView((v) => ({ ...v, x: v.x - dx, y: v.y - dy }));
          }}
          onMouseUp={() => { drag.current = null; }}
          onMouseLeave={() => { drag.current = null; }}>
          <defs>
            <radialGradient id="obsglow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1b2440" /><stop offset="100%" stopColor="#111829" />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={W} height={H} fill="url(#obsglow)" rx={14} />

          {placed.map((n) => (
            <line key={`l${n.i}`} x1={n.ax} y1={n.ay} x2={posX(n)} y2={posY(n)} stroke={matches(n) ? "#2f3a55" : "#1c2438"} strokeWidth={1} />
          ))}
          {usedDomains.map((d) => {
            const c = placed.find((n) => n.domain === d)!;
            const dim = domain !== "all" && domain !== d;
            return (
              <text key={`d${d}`} x={c.ax} y={c.ay - 6} fill={dim ? "#39435c" : "#6b7488"} fontSize={11} fontFamily="Helvetica, Arial" textAnchor="middle" style={{ letterSpacing: 1, textTransform: "uppercase", opacity: dim ? 0.5 : 1 }}>{d}</text>
            );
          })}

          {placed.map((n) => {
            const on = matches(n);
            const isSel = selected === n.i, isHov = hover === n.i;
            const r = isSel ? 9 : isHov ? 8 : 5.6;
            const x = posX(n), y = posY(n);
            return (
              <g key={n.i} tabIndex={on ? 0 : -1} role="button"
                aria-label={`${n.name}. ${n.role}. ${n.domain}. ${n.kind === "creator" ? "Creator" : "Professional"}${n.created ? ", role built around them" : ""}.`}
                onMouseEnter={() => setHover(n.i)} onMouseLeave={() => setHover(null)}
                onClick={() => selectNode(n.i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectNode(n.i); } }}
                style={{ cursor: "pointer", opacity: on ? 1 : 0.13, transition: "opacity .2s", outline: "none" }}>
                {isSel && <circle cx={x} cy={y} r={r + 6} fill="none" stroke={n.kind === "creator" ? CREATOR : PRO} strokeWidth={1.2} opacity={0.5} />}
                <circle cx={x} cy={y} r={r} fill={n.kind === "creator" ? CREATOR : PRO} stroke={n.created ? "#e6c68a" : "none"} strokeWidth={n.created ? 1.6 : 0} />
              </g>
            );
          })}

          {hover !== null && selected !== hover && (() => {
            const n = placed[hover]; const x = posX(n), y = posY(n); const left = x > CX;
            const tw = Math.max(n.name.length, n.role.length) * 7 + 16;
            return (
              <g pointerEvents="none">
                <rect x={left ? x - 12 - tw : x + 12} y={y - 16} width={tw} height={34} rx={5} fill="#0d1322" opacity={0.9} />
                <text x={left ? x - 18 : x + 18} y={y - 1} fill="#fff" fontSize={13} fontFamily="Georgia, serif" textAnchor={left ? "end" : "start"}>{n.name}</text>
                <text x={left ? x - 18 : x + 18} y={y + 14} fill="#aab0c0" fontSize={10.5} fontFamily="Helvetica, Arial" textAnchor={left ? "end" : "start"}>{n.role}</text>
              </g>
            );
          })()}
        </svg>

        {shown.length === 0 && (
          <div className="obs-empty"><b>No one matches yet.</b>Loosen the filters or clear the search — or nominate someone who fits below.</div>
        )}

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
            <a href={`/observatory/${nodeSlug(sel.name)}`} className="obs-panel-cta">View full profile →</a>
          </aside>
        )}
      </div>

      {!embed && (
        <div className="obs-legend" aria-label="Map key">
          <span><i className="dot creator" /> <strong>Teal:</strong> creator case <b>{counts.creators}</b></span>
          <span><i className="dot pro" /> <strong>Gold:</strong> professional case <b>{counts.pros}</b></span>
          <span><i className="dot pro" style={{ background: "transparent" }} /> <strong>Gold outline:</strong> role built around the person</span>
          <span className="obs-legend-hint">{shown.length} of {counts.total} cases shown{q || lens !== "all" || domain !== "all" || builtOnly ? " (filtered)" : ""} · Click a dot for its case · drag to pan · +/− to zoom</span>
        </div>
      )}
    </div>
  );
}
