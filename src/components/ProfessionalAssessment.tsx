"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { QuestionStepper } from "./QuestionStepper";
import { focusAndReveal } from "./formKit";
import s from "./forms.module.css";

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

  // Record an answer; the stepper handles auto-advance and focus.
  function answer(id: string, value: number) {
    setResponses((r) => ({ ...r, [id]: value }));
  }
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const [restarted, setRestarted] = useState(false);
  useEffect(() => {
    if (submitted) focusAndReveal(resultsHeadingRef.current);
  }, [submitted]);

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
    const text = `I completed the Portfolio Professional pilot. It examines capability ownership, institutional value, mandate and autonomy, visibility and authority, and whether your work has a coherent thesis. Take it:`;
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
        <QuestionStepper
          items={CORE}
          responses={responses}
          onAnswer={answer}
          step={step}
          onStepChange={setStep}
          onSubmit={() => setSubmitted(true)}
          submitLabel="See my portability profile"
          focusOnMount={restarted}
        />
      )}

      {submitted && result && (
        <div className="results">
          <div className="scorecard" style={{ gridTemplateColumns: "1fr 300px" }}>
            <div>
              <h2 className={s.resultsHeading} ref={resultsHeadingRef} tabIndex={-1}>
                <span className="eyebrow">Your portability profile</span>
                <span className="bandlbl">{result.overall.label}</span>
              </h2>
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
            <a href="/observatory"><button className="primary">Explore the 41 public cases</button></a>
            <a href="/methodology" className="fwlink">See how the profile is calculated →</a>
          </div>

          <ResearchOptIn source="index_pro" interest="professional" heading="Want your results and what comes next?" report={{ total: result.total, band: result.overall.label, instrument: "portfolio_professional" }} />

          <p className="disc">Portfolio Professional · methodology v{result.methodologyVersion}. This result was calculated under the current Institutions of One pilot methodology.</p>
          <div className="actions">
            <button className={`primary ${s.button}`} onClick={shareProfile}>{shared ? "Link copied ✓" : "Share my profile"}</button>
            <button className={`ghost ${s.button}`} onClick={() => { setSubmitted(false); setResponses({}); setStep(0); setShared(false); setRestarted(true); }}>Start again</button>
          </div>
        </div>
      )}
    </div>
  );
}
