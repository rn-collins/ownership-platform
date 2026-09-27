"use client";

import { useEffect, useId, useRef, useState } from "react";
import { focusAndReveal } from "./formKit";
import s from "./forms.module.css";

export type StepItem = { id: string; q: string; options: readonly string[]; dim: string };

type Props = {
  items: readonly StepItem[];
  responses: Record<string, number>;
  onAnswer: (id: string, value: number) => void;
  step: number;
  onStepChange: (step: number) => void;
  onSubmit: () => void;
  submitLabel: string;
  /** Focus the current question on mount (e.g. after "Start again"). */
  focusOnMount?: boolean;
};

const ADVANCE_MS = 160;

// One-question-at-a-time stepper. Each step is a native radio group inside a
// fieldset, so arrow keys move between options and screen readers announce the
// question as the group label. Pointer, Space and Enter selections auto-advance;
// Space/Enter are handled explicitly because a checked radio fires no click.
// arrow-key browsing does not (it would otherwise skip past the question).
export function QuestionStepper({ items, responses, onAnswer, step, onStepChange, onSubmit, submitLabel, focusOnMount = false }: Props) {
  const uid = useId();
  const legendRef = useRef<HTMLLegendElement>(null);
  const firstRadioRef = useRef<HTMLInputElement>(null);
  const shouldFocus = useRef(focusOnMount);
  const arrowNav = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const [error, setError] = useState("");

  const total = items.length;
  const item = items[step];
  const isLast = step === total - 1;
  const errorId = `${uid}-error`;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!shouldFocus.current) return;
    focusAndReveal(legendRef.current, "nearest");
  }, [step]);

  function goTo(next: number) {
    window.clearTimeout(timer.current);
    setError("");
    shouldFocus.current = true;
    onStepChange(Math.max(0, Math.min(total - 1, next)));
  }

  function choose(value: number, advance: boolean) {
    const index = step;
    onAnswer(items[index].id, value);
    setError("");
    window.clearTimeout(timer.current);
    if (advance && index < total - 1) timer.current = window.setTimeout(() => goTo(index + 1), ADVANCE_MS);
  }

  function next() {
    if (responses[item.id] == null) {
      setError("Choose an answer to continue.");
      firstRadioRef.current?.focus();
      return;
    }
    goTo(step + 1);
  }

  function submit() {
    const missing = items.findIndex((it) => responses[it.id] == null);
    if (missing === -1) { onSubmit(); return; }
    if (missing !== step) {
      goTo(missing);
      setError(`Question ${missing + 1} still needs an answer before you can see your result.`);
      return;
    }
    setError("Choose an answer to see your result.");
    firstRadioRef.current?.focus();
  }

  return (
    <div className="stepper">
      <div
        className="progressbar"
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
        aria-valuetext={`Question ${step + 1} of ${total}`}
      >
        <div className="progressfill" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <p className={`stepmeta ${s.meta}`} aria-live="polite" aria-atomic="true">
        <span className="stepcount">Question {step + 1} of {total}</span>{" "}
        <span className="stepcount" aria-hidden="true">·</span>{" "}
        <span className="stepdim">{item.dim}</span>
      </p>

      <fieldset key={item.id} className={s.fieldset} aria-describedby={error ? errorId : undefined}>
        <legend ref={legendRef} tabIndex={-1} className={`qbig ${s.legend}`}>{item.q}</legend>
        <div className="optcards">
          {item.options.map((opt, value) => {
            const selected = responses[item.id] === value;
            return (
              <label key={value} className={`optcard ${s.card}${selected ? " sel" : ""}`}>
                <input
                  ref={value === 0 ? firstRadioRef : undefined}
                  className={s.radio}
                  type="radio"
                  name={`${uid}-${item.id}`}
                  value={value}
                  checked={selected}
                  onChange={() => onAnswer(item.id, value)}
                  onClick={() => { const viaArrow = arrowNav.current; arrowNav.current = false; choose(value, !viaArrow); }}
                  onKeyDown={(e) => {
                    if (e.key.startsWith("Arrow")) arrowNav.current = true;
                    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(value, true); }
                  }}
                  onKeyUp={() => { arrowNav.current = false; }}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
        <div role="alert">{error && <p className={s.alert} id={errorId}>{error}</p>}</div>
      </fieldset>

      <div className="stepnav">
        <button
          type="button"
          className={`ghost ${s.button}${step === 0 ? ` ${s.inactive}` : ""}`}
          aria-disabled={step === 0 || undefined}
          onClick={() => { if (step > 0) goTo(step - 1); }}
        >
          Back
        </button>
        {isLast ? (
          <button type="button" className={`primary cta-next ${s.button}`} onClick={submit}>{submitLabel}</button>
        ) : (
          <button type="button" className={`ghost ${s.button}`} onClick={next}>Next</button>
        )}
      </div>
    </div>
  );
}
