"use client";

import { useMemo, useState } from "react";
import styles from "./profile.module.css";

type Props = {
  name: string;
  tension: string;
  unknowns: string[];
  dependencyPrompt: string;
};

const scenarios: Record<string, { label: string; question: string; interpretation: string }[]> = {
  "Role vs person": [
    { label: "Remove the title", question: "What remains credible and usable if the formal title disappears?", interpretation: "This tests whether authority travels with the person or was conferred by the office." },
    { label: "Change the employer", question: "Which relationships, methods, and proof could move lawfully and practically?", interpretation: "This separates portable capability from employer-owned systems and assets." },
  ],
  "One field vs many": [
    { label: "Remove the most famous field", question: "Does a coherent method still connect the remaining work?", interpretation: "This tests whether range compounds around a thesis or merely accumulates." },
    { label: "Require one operating system", question: "Which audience, method, or institution could hold the work together?", interpretation: "Coherence becomes structural only when it can be recognized and repeated." },
  ],
  "Owned vs rented": [
    { label: "Remove the main platform", question: "Which audience relationships, rights, products, and revenue routes remain?", interpretation: "Visibility can travel while access, data, and distribution remain rented." },
    { label: "Change the distributor", question: "What can continue without renegotiating the entire career?", interpretation: "Substitutability is a different question from legal ownership." },
  ],
  "Portable vs embedded": [
    { label: "Leave the institution", question: "What can the person carry without the team, budget, data, or brand?", interpretation: "This tests capability portability without pretending institutional resources belong to the individual." },
    { label: "Keep only the method", question: "Could the method produce value in another setting?", interpretation: "A portable method may survive even when execution infrastructure does not." },
  ],
  "Scale vs dependence": [
    { label: "Remove the largest dependency", question: "Which part of the system fails first—and which continues?", interpretation: "Scale can increase capacity while creating a new single point of failure." },
    { label: "Replace outside capital", question: "What changes if growth must be financed or distributed differently?", interpretation: "This distinguishes durable capacity from capacity contingent on one resource provider." },
  ],
  "Public mandate vs personal authority": [
    { label: "Change administrations", question: "Which plans, budgets, standards, and cross-agency routines remain?", interpretation: "Public consequence is durable when capacity becomes institutional, not personally owned." },
    { label: "Remove the named office", question: "Who retains responsibility and coordination authority?", interpretation: "A title matters only if it clarifies and embeds accountable action." },
  ],
  "Institution vs individual": [
    { label: "Change the leader", question: "What changed because of this person, and what belongs to the institution?", interpretation: "Stewardship and personal ownership are not the same form of power." },
    { label: "Remove inherited prestige", question: "Which authority can still be traced to the individual’s work?", interpretation: "This separates a leader’s contribution from the institution’s accumulated legitimacy." },
  ],
};

export default function CaseLab({ name, tension, unknowns, dependencyPrompt }: Props) {
  const options = useMemo(() => scenarios[tension] ?? [
    { label: "Remove the largest support", question: dependencyPrompt, interpretation: "This reveals which parts of the career are portable, controlled, or dependent." },
    { label: "Change the context", question: "Which assets, relationships, and permissions still work?", interpretation: "A career can look independent while relying on infrastructure it does not control." },
  ], [tension, dependencyPrompt]);
  const [selected, setSelected] = useState(0);
  const scenario = options[selected];

  return <div className={styles.lab}>
    <div className={styles.labControls} role="group" aria-label={`Test ${name}'s career structure`}>
      {options.map((option, index) => <button type="button" key={option.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{option.label}</button>)}
    </div>
    <div className={styles.labResult} aria-live="polite">
      <p className={styles.kicker}>Thought experiment</p>
      <h3>{scenario.question}</h3>
      <p>{scenario.interpretation}</p>
      <p><strong>Use the record, not intuition:</strong> identify what the sources establish, then check the unresolved questions below. This tool does not predict what {name} will do.</p>
      {unknowns[0] && <p className={styles.labUnknown}><strong>The missing evidence that matters most:</strong> {unknowns[0]}</p>}
    </div>
  </div>;
}
