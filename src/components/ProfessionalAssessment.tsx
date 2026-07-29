"use client";

import { useEffect, useMemo, useState } from "react";
import {
  assessProfessional,
  professionalPlan,
  professionalProjected,
  PROFESSIONAL_DIMENSION_WHY,
  PROFESSIONAL_ITEM_ACTIONS,
} from "@/lib/engine_professional";
import { PROFESSIONAL_INSTRUMENT, PROFESSIONAL_DIMENSIONS, type PDimensionKey } from "@/lib/instrument_professional";
import { ResearchOptIn } from "@/components/ResearchOptIn";
import { ProjectionDumbbell } from "@/components/ProjectionDumbbell";

type Responses = Record<string, number>;

const CORE = PROFESSIONAL_INSTRUMENT.flatMap((d) =>
  d.items.map((it) => ({ id: it.id, q: it.q, options: it.options, dim: d.name })),
);

// Compact self-contained radar (5 professional dimensions), padded so labels never clip.
function PRadar({ values }: { values: Record<PDimensionKey, number> }) {
  const size = 300, R = size * 0.36, CX = size / 2, CY = size * 0.47, PAD = 30;
  const pt = (i: number, f: number): [number, number] => {
    const a = -Math.PI / 2 + i * ((2 * Math.PI) / 5);
    return [CX + Math.cos(a) * R * f, CY + Math.sin(a) * R * f];
  };
  const poly = (fr: number[]) => fr.map((f, i) => pt(i, f).join(",")).join(" ");
  const fr = PROFESSIONAL_DIMENSIONS.map((d) => (values[d.key] ?? 0) / 20);
  return (
    <svg width={size} height={size * 0.9} viewBox={`${-PAD} 0 ${size + 2 * PAD} ${size * 0.9}`} role="img" aria-label="Portfolio Professional profile" style={{ overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon key={r} points={poly([r, r, r, r, r])} fill="none" stroke="#2c3348" strokeWidth={1} />
      ))}
      {PROFESSIONAL_DIMENSIONS.map((d, i) => {
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
      {PROFESSIONAL_DIMENSIONS.map((d, i) => {
        const [x, y] = pt(i, (values[d.key] ?? 0) / 20);
        return <circle key={d.key} cx={x} cy={y} r={3} fill="#c8a468" />;
      })}
    </svg>
  );
}

export function ProfessionalAssessment() {
  const [responses, setResponses] = useState<Responses>({});
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const [shared, setShared] = useState(false);
  const [assessmentId] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
  );

  function chooseCore(index: number, value: number) {
    const id = CORE[index].id;
    setResponses((r) => ({ ...r, [id]: value }));
    if (index < CORE.length - 1) window.setTimeout(() => setStep(index + 1), 160);
  }

  const result = useMemo(() => (submitted ? assessProfessional(responses) : null), [submitted, responses]);

  // Anonymous server capture once submitted — no identity, only the banded answers,
  // stamped with the instrument + methodology version. No-op if the API/DB isn't wired.
  useEffect(() => {
    if (!submitted) return;
    void fetch("/api/benchmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        responses,
        instrument: "portfolio_professional",
        assessmentId,
      }),
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);
  const plan = useMemo(() => (submitted ? professionalPlan(responses).slice(0, 5) : []), [submitted, responses]);
  const projected = useMemo(
    () => (submitted ? professionalProjected(responses, plan.map((a) => a.itemId)) : 0),
    [submitted, responses, plan],
  );
  const radarValues = useMemo(() => {
    const v = {} as Record<PDimensionKey, number>;
    PROFESSIONAL_DIMENSIONS.forEach((d) => (v[d.key] = result?.dimensions.find((x) => x.key === d.key)?.raw ?? 0));
    return v;
  }, [result]);

  async function shareProfile() {
    const r = assessProfessional(responses);
    const url = typeof window !== "undefined" ? `${window.location.origin}/assess/professional` : "/assess/professional";
    const text = `I completed the Portfolio Professional pilot — it examines how visible, reusable, portable, and influential your expertise has become across roles and organizations. Take it:`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) { await navigator.share({ title: "Portfolio Professional", text, url }); return; }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch { /* dismissed */ }
  }

  return (
    <div>
      {!submitted && (
        <div className="stepper">
          <div className="progressbar"><div className="progressfill" style={{ width: `${((step + 1) / CORE.length) * 100}%` }} /></div>
          <div className="stepmeta">
            <span className="stepdim">{CORE[step].dim}</span>
            <span className="stepcount">{step + 1} / {CORE.length}</span>
          </div>
          <p className="qbig">{CORE[step].q}</p>
          <div className="optcards">
            {CORE[step].options.map((opt, s) => (
              <button key={s} type="button" className={`optcard${responses[CORE[step].id] === s ? " sel" : ""}`} onClick={() => chooseCore(step, s)}>{opt}</button>
            ))}
          </div>
          <div className="stepnav">
            <button className="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</button>
            {step === CORE.length - 1 ? (
              <button className="primary" onClick={() => setSubmitted(true)} disabled={responses[CORE[step].id] == null}>See my portability profile</button>
            ) : (
              <button className="ghost" onClick={() => setStep((s) => Math.min(CORE.length - 1, s + 1))} disabled={responses[CORE[step].id] == null}>Next</button>
            )}
          </div>
        </div>
      )}

      {submitted && result && (
        <div className="results">
          <div className="scorecard" style={{ gridTemplateColumns: "1fr 300px" }}>
            <div>
              <p className="eyebrow">Your portability profile</p>
              <div className="bandlbl">{result.overall.label}</div>
              <div className="bandnote">{result.overall.copy}</div>
              <div className="conf"><span className="pill">Evidence status: self-reported</span>This pattern is exploratory and is not a rank or identity verdict.<br />Composite index: {result.total} / 100 under the current methodology.</div>
            </div>
            <PRadar values={radarValues} />
          </div>


          <div className="bars">
            {result.dimensions.map((d) => (
              <div key={d.key} className="bar">
                <div className="lbl">{d.name}</div>
                <div className="track"><div className="fill" style={{ width: `${(d.raw / 20) * 100}%` }} /></div>
                <div className="sc">{d.raw}<span> /20</span></div>
              </div>
            ))}
          </div>

          <div className="forward">
            <h3>Questions your profile raises</h3>
            {plan.length > 0 ? (
              <>
                <ProjectionDumbbell rows={result.dimensions.map((d) => ({ name: d.name, current: d.raw, projected: d.raw + plan.filter((p) => p.dimension === d.key).reduce((s, p) => s + p.lift, 0) }))} />
                {(() => {
                  const seen = new Set<string>();
                  return plan.map((a, i) => {
                    const showWhy = !seen.has(a.dimension);
                    seen.add(a.dimension);
                    return (
                      <div key={a.itemId} className="planstep">
                        <span className="fwn">{i + 1}</span>
                        <div className="planbody">
                          <div className="planhead">
                            <span className="plandim">{a.dimensionName}</span>
                            <span className="planlift">Changes this dimension</span>
                          </div>
                          <div className="planaction">{PROFESSIONAL_ITEM_ACTIONS[a.itemId]}</div>
                          {showWhy && <div className="planwhy">{PROFESSIONAL_DIMENSION_WHY[a.dimension]}</div>}
                        </div>
                      </div>
                    );
                  });
                })()}
              </>
            ) : (
              <p className="fwsub">No change prompts were generated for this response pattern. Review the five dimensions and the framework limits before drawing a conclusion.</p>
            )}
          </div>

          <div className="fwcta" style={{ marginTop: 18 }}>
            <a href="/observatory"><button className="primary">See the map &amp; nominate someone</button></a>
            <a href="/observatory" className="fwlink">Explore The Observatory →</a>
          </div>

          <ResearchOptIn source="index_pro" interest="professional" heading="Want your results and what comes next?" report={{ total: result.total, band: result.overall.label, instrument: "portfolio_professional" }} />

          <p className="disc">Portfolio Professional · methodology v{result.methodologyVersion}. Part of Institutions of One.</p>
          <div className="actions">
            <button className="primary" onClick={shareProfile}>{shared ? "Link copied ✓" : "Share my profile"}</button>
            <button className="ghost" onClick={() => { setSubmitted(false); setResponses({}); setStep(0); setShared(false); }}>Start again</button>
          </div>
        </div>
      )}
    </div>
  );
}
