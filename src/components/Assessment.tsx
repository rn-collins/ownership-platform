"use client";

import { useEffect, useMemo, useState } from "react";
import { assess, improvementPlan, projectedScore, DIMENSIONS, type DimensionKey } from "@/lib/engine";
import { INSTRUMENT, OVERALL_COPY, DIMENSION_WHY, ITEM_ACTIONS } from "@/lib/instrument";
import { RESEARCH_MODULES, APP_RESEARCH_MODULE_KEYS, isResearchItemHidden, type ResearchItem } from "@/lib/research";
import { Radar } from "./Radar";
import { ResearchOptIn } from "@/components/ResearchOptIn";
import { BenchmarkBadge } from "@/components/BenchmarkBadge";
import { ProjectionDumbbell } from "@/components/ProjectionDumbbell";

type Responses = Record<string, number>;
type ResearchAnswers = Record<string, string | string[]>;
const APP_RESEARCH = RESEARCH_MODULES.filter((m) => APP_RESEARCH_MODULE_KEYS.includes(m.key));

// Flat, ordered list of the 20 scored items for the one-at-a-time stepper.
const CORE = INSTRUMENT.flatMap((d) =>
  d.items.map((it) => ({ id: it.id, q: it.q, options: it.options, dim: d.name })),
);

export function Assessment() {
  const [responses, setResponses] = useState<Responses>({});
  const [research, setResearch] = useState<ResearchAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const [shared, setShared] = useState(false);
  const [assessmentId] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
  );

  // Pick an option for the current step; auto-advance for a frictionless flow.
  function chooseCore(index: number, value: number) {
    const id = CORE[index].id;
    setResponses((r) => ({ ...r, [id]: value }));
    if (index < CORE.length - 1) window.setTimeout(() => setStep(index + 1), 160);
  }
  const result = useMemo(() => (submitted ? assess(responses) : null), [submitted, responses]);

  // Anonymous capture — no identity, only banded answers, score, and research modules.
  // Upserts a single record per assessment so late research answers enrich it.
  // In production this PATCHes /api/benchmark.
  function persist() {
    const r = assess(responses);
    const record = {
      id: assessmentId,
      ts: new Date().toISOString(),
      methodology: r.methodologyVersion,
      total: r.total,
      responses: { ...responses },
      research: { ...research },
    };
    try {
      const key = "oi_benchmark";
      const arr = JSON.parse(localStorage.getItem(key) || "[]") as { id: string }[];
      const i = arr.findIndex((x) => x.id === assessmentId);
      if (i >= 0) arr[i] = record; else arr.push(record);
      localStorage.setItem(key, JSON.stringify(arr));
    } catch { /* no-op */ }
    // Anonymous server capture (no identity sent). No-op if the API/DB isn't configured.
    void fetch("/api/benchmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses, research, instrument: "ownership", assessmentId }),
    }).catch(() => {});
  }

  // Enrich the single anonymous record as research answers fill in.
  useEffect(() => {
    if (submitted) persist();
    // persist reads current responses/research from closure; intentional single-record upsert.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [research]);

  function onSubmit() {
    persist();
    // If signed in, save this assessment to the creator's account (the route
    // authenticates via cookie and no-ops for anonymous users).
    void fetch("/api/assessments/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses, research }),
    }).catch(() => {});
    setSubmitted(true);
  }

  // Share the score — native share sheet where available, clipboard otherwise.
  // Built for the "post your score" growth loop: one tap to spread the Index.
  async function shareScore() {
    const r = assess(responses);
    const url = typeof window !== "undefined" ? `${window.location.origin}/assess/creator` : "/assess/creator";
    const text = `I scored ${r.total}/100 on The Ownership Index — it measures how much of your creator business you actually own: audience, rights, revenue, likeness, and business. Take it:`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "The Ownership Index", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      /* user dismissed the share sheet — no-op */
    }
  }

  function setResearchAnswer(item: ResearchItem, value: string) {
    if (item.type === "multi") {
      setResearch((r) => {
        const cur = (r[item.id] as string[] | undefined) ?? [];
        const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
        return { ...r, [item.id]: next };
      });
    } else {
      setResearch((r) => ({ ...r, [item.id]: value }));
    }
  }

  const radarValues = useMemo(() => {
    const v = {} as Record<DimensionKey, number>;
    DIMENSIONS.forEach((d) => (v[d.key] = result?.dimensions.find((x) => x.key === d.key)?.raw ?? 0));
    return v;
  }, [result]);

  // Precise, engine-computed plan: the five highest-priority moves and the exact
  // score they would produce. This is the "worth paying for" part.
  const plan = useMemo(() => (submitted ? improvementPlan(responses).slice(0, 5) : []), [submitted, responses]);
  const projected = useMemo(
    () => (submitted ? projectedScore(responses, plan.map((a) => a.itemId)) : 0),
    [submitted, responses, plan],
  );

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
              <button
                key={s}
                type="button"
                className={`optcard${responses[CORE[step].id] === s ? " sel" : ""}`}
                onClick={() => chooseCore(step, s)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="stepnav">
            <button className="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</button>
            {step === CORE.length - 1 ? (
              <button className="primary" onClick={onSubmit} disabled={responses[CORE[step].id] == null}>See my Ownership Score</button>
            ) : (
              <button className="ghost" onClick={() => setStep((s) => Math.min(CORE.length - 1, s + 1))} disabled={responses[CORE[step].id] == null}>Next</button>
            )}
          </div>
        </div>
      )}

      {submitted && result && (
        <div className="results">
          <div className="scorecard">
            <div>
              <div className="big">{result.total}<span className="of"> / 100</span></div>
              <div className="bandlbl">{result.overall.label}</div>
              <div className="bandnote">{OVERALL_COPY[result.overall.key]}</div>
              <div className="conf">
                <span className="pill">Evidence status: {result.confidence.label}</span>
                Self-reported. Evidence verification will raise this.
              </div>
            </div>
            <Radar values={radarValues} />
          </div>

          <BenchmarkBadge instrument="ownership" score={result.total} />

          <div className="bars">
            {result.dimensions.map((d) => (
              <div key={d.key} className="bar">
                <div className="lbl">{d.name}</div>
                <div className="track"><div className="fill" style={{ width: `${(d.raw / 20) * 100}%` }} /></div>
                <div className="sc">{d.raw}<span> /20</span></div>
              </div>
            ))}
          </div>

          {result.flags.length > 0 && (
            <div className="flagsbox">
              <h3>Where you are exposed</h3>
              <p className="fsub">The sharp risks in your current setup, most urgent first.</p>
              {result.flags.map((f) => (
                <div key={f.id} className="flag">
                  <span className={`dot ${f.severity}`} />
                  <span><span className={`sev ${f.severity}`}>{f.severity}</span>{f.message}</span>
                </div>
              ))}
            </div>
          )}

          <div className="research">
            <h3>The fuller picture</h3>
            <p className="rsub">A few taps across your rights, revenue, brand, wellbeing and trajectory. Anonymous, matched to your score. The more you share, the sharper your picture.</p>
            {(() => {
              const items = APP_RESEARCH.flatMap((m) => m.items).filter((it) => !isResearchItemHidden(it.id, responses));
              const done = items.filter((it) => {
                const v = research[it.id];
                return Array.isArray(v) ? v.length > 0 : v != null && v !== "";
              }).length;
              const pct = items.length ? Math.round((done / items.length) * 100) : 0;
              return (
                <div className="meter">
                  <div className="meter-track"><div className="meter-fill" style={{ width: `${pct}%` }} /></div>
                  <div className="meter-label">{done} of {items.length} shared{pct >= 100 ? " — complete, thank you" : ""}</div>
                </div>
              );
            })()}
            {APP_RESEARCH.map((mod) => {
              const items = mod.items.filter((it) => !isResearchItemHidden(it.id, responses));
              if (items.length === 0) return null;
              return (
              <section key={mod.key} className="rmod">
                <div className="rmodhead"><span className="rmodname">{mod.name}</span><span className="rmodlens">{mod.lens}</span></div>
                {items.map((it) => (
                  <fieldset key={it.id} className="q">
                    <legend className="qt">{it.q}</legend>
                    {it.type === "open" ? (
                      <textarea className="opentext" rows={2} value={(research[it.id] as string) ?? ""} onChange={(e) => setResearchAnswer(it, e.target.value)} />
                    ) : (
                      <div className="chips">
                        {(it.options ?? []).map((opt) => {
                          const selected = it.type === "multi"
                            ? ((research[it.id] as string[] | undefined) ?? []).includes(opt)
                            : research[it.id] === opt;
                          return (
                            <button key={opt} type="button" className={`rchip${selected ? " on" : ""}`} onClick={() => setResearchAnswer(it, opt)}>{opt}</button>
                          );
                        })}
                      </div>
                    )}
                  </fieldset>
                ))}
              </section>
              );
            })}
          </div>

          <div className="forward">
            <h3>Your path forward</h3>
            {plan.length > 0 ? (
              <>
                <div className="proj">
                  <div className="projrow">
                    <span className="projnow">{result.total}</span>
                    <span className="projarrow">→</span>
                    <span className="projnext">{projected}</span>
                  </div>
                  <p className="projsub">If your circumstances later matched these {plan.length} response conditions, the current methodology would calculate <b>{projected}</b> out of 100, compared with {result.total} today.</p>
                </div>
                <ProjectionDumbbell rows={result.dimensions.map((d) => ({ name: d.name, current: d.raw, projected: d.raw + plan.filter((p) => p.dimension === d.key).reduce((s, p) => s + p.lift, 0) }))} />
                {(() => {
                  const seenWhy = new Set<string>();
                  return plan.map((a, i) => {
                    const showWhy = !seenWhy.has(a.dimension);
                    seenWhy.add(a.dimension);
                    return (
                      <div key={a.itemId} className="planstep">
                        <span className="fwn">{i + 1}</span>
                        <div className="planbody">
                          <div className="planhead">
                            <span className="plandim">{a.dimensionName}</span>
                            <span className="planlift">+{a.lift} {a.lift === 1 ? "pt" : "pts"}</span>
                          </div>
                          <div className="planaction">{ITEM_ACTIONS[a.itemId]}</div>
                          {showWhy && <div className="planwhy">{DIMENSION_WHY[a.dimension]}</div>}
                        </div>
                      </div>
                    );
                  });
                })()}
              </>
            ) : (
              <p className="fwsub">You are at the top of every measure. The question now is whether you can carry it — the human half of this research.</p>
            )}
            <div className="fwcta">
              <a href="/login"><button className="primary">Save my plan and track my progress</button></a>
              <a href="/methodology" className="fwlink">How the score works →</a>
            </div>
          </div>

          <ResearchOptIn source="index_creator" interest="creator" heading="Want your results and what comes next?" report={{ total: result.total, band: result.overall.label, instrument: "ownership" }} />

          <p className="disc">Your answers are collected anonymously. Score reproducible under methodology v{result.methodologyVersion}.</p>
          <div className="actions">
            <button className="primary" onClick={shareScore}>{shared ? "Link copied ✓" : "Share my score"}</button>
            <button className="ghost" onClick={() => { setSubmitted(false); setResponses({}); setResearch({}); setStep(0); setShared(false); }}>Start again</button>
          </div>
        </div>
      )}
    </div>
  );
}
