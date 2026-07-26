import {
  OWNERSHIP_INDEX_0_3_0_CANDIDATE,
  PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE,
  type CandidateItem,
  type InstrumentCandidate,
} from "./candidate-instruments";

export const CONSENT_VERSION = "cognitive-interview-2026-07-v1";
export const PILOT_PROTOCOL_VERSION = "pilot-2026-07-v1";

export const RESPONSE_PROCESS_DOMAINS = [
  { id: "comprehension", label: "Comprehension", definition: "Meaning assigned to the item, construct, terms, and reference period." },
  { id: "retrieval", label: "Retrieval", definition: "Information, records, examples, and memory strategies used to answer." },
  { id: "judgment", label: "Judgment", definition: "How mixed, uncertain, exceptional, or context-dependent evidence is combined." },
  { id: "response_mapping", label: "Response mapping", definition: "Fit between the participant’s answer and the available response options." },
  { id: "sensitivity", label: "Sensitivity", definition: "Disclosure pressure, discomfort, perceived judgment, and impression management." },
  { id: "accessibility", label: "Accessibility", definition: "Language, format, memory, disability, care, technology, or structural barriers." },
] as const;

export type ResponseProcessDomain = typeof RESPONSE_PROCESS_DOMAINS[number]["id"];
export type FailureSeverity = "none" | "minor" | "major" | "critical";

export const SEVERITY_RULES: Record<FailureSeverity, string> = {
  none: "No material response-process failure observed.",
  minor: "Friction exists but the intended construct and response remain usable.",
  major: "The failure could change the selected response or construct interpretation.",
  critical: "The item is unsafe, inaccessible, structurally invalid, or cannot support its intended claim.",
};

const domainProbes: Record<ResponseProcessDomain, readonly string[]> = {
  comprehension: ["Tell me what this question is asking in your own words.", "Which words or phrases are unclear, overloaded, or unfamiliar?", "What does the stated time period mean for your answer?"],
  retrieval: ["What examples, records, or period did you draw on?", "How confident are you that the information is available and complete?", "What would make recall easier or more accurate?"],
  judgment: ["How did you combine different situations or exceptions?", "What assumptions did you make?", "Which structural constraints affected the answer but are not the thing being measured?"],
  response_mapping: ["Which option fits best, and why?", "Was your answer between options or missing from the list?", "Would a not-applicable or do-not-know route be valid here?"],
  sensitivity: ["Did this feel judgmental, risky, intrusive, or pressure you toward a desirable answer?", "What could reduce disclosure pressure without losing the construct?"],
  accessibility: ["What made the item harder because of language, memory, disability, care context, technology, or work structure?", "What format or accommodation would produce a more valid answer?"],
};

export type CognitiveProbeGuide = {
  instrument: InstrumentCandidate["id"];
  candidateVersion: string;
  itemId: string;
  construct: string;
  itemPrompt: string;
  responseOptions: readonly string[];
  contextChecks: readonly string[];
  probes: Readonly<Record<ResponseProcessDomain, readonly string[]>>;
  closingDecision: readonly string[];
};

function guideFor(instrument: InstrumentCandidate, item: CandidateItem): CognitiveProbeGuide {
  return {
    instrument: instrument.id,
    candidateVersion: instrument.version,
    itemId: item.id,
    construct: item.construct,
    itemPrompt: item.prompt,
    responseOptions: item.anchors,
    contextChecks: item.contextFields ?? [],
    probes: domainProbes,
    closingDecision: [
      `Does the response reflect ${item.construct}, or a different construct?`,
      "Should the item be retained, clarified, split, re-anchored, routed, deferred, or removed?",
      "What evidence supports that decision?",
    ],
  };
}

export const COGNITIVE_PROBE_GUIDES: readonly CognitiveProbeGuide[] = [
  ...OWNERSHIP_INDEX_0_3_0_CANDIDATE.items.map((item) => guideFor(OWNERSHIP_INDEX_0_3_0_CANDIDATE, item)),
  ...PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.items.map((item) => guideFor(PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE, item)),
];

export const ROUND_GATES = {
  round1: {
    id: "round_1_complete",
    minimumCompletedPerInstrument: 8,
    requirements: [
      "Every item administered to at least two participants.",
      "Purposive sample covers at least four declared sampling dimensions and records remaining gaps.",
      "All observed failures coded by item, domain, severity, and evidence.",
      "Every major or critical failure has a proposed disposition.",
      "No revision is applied without a ledger entry and linked evidence codes.",
    ],
  },
  round2: {
    id: "round_2_complete",
    minimumCompletedPerInstrument: 8,
    requirements: [
      "New participants test the versioned Round 1 revisions.",
      "Every materially revised item administered to at least two participants.",
      "No unresolved critical failures remain.",
      "Major failures are resolved or explicitly deferred with a claim restriction.",
      "Accessibility and structural-fairness review is documented.",
      "A frozen pilot candidate is generated only from approved ledger entries.",
    ],
  },
} as const;

export type ApprovedRevision = {
  instrument: InstrumentCandidate["id"];
  sourceVersion: string;
  targetVersion: string;
  itemId: string;
  decisionStatus: "approved";
  afterValue: CandidateItem;
  evidenceCodeIds: readonly string[];
  reviewedBy: string;
  reviewedAt: string;
};

export type CandidateGenerationAuthorization = {
  round1Gate: "met";
  approvedRevisionCount: number;
  expectedRevisionCount: number;
  generatedBy: string;
  generatedAt: string;
};

export function generateRevisedCandidate(
  source: InstrumentCandidate,
  targetVersion: string,
  revisions: readonly ApprovedRevision[],
  authorization: CandidateGenerationAuthorization,
): InstrumentCandidate {
  if (!targetVersion.includes("-candidate.")) throw new Error("Candidate version required");
  if (authorization.round1Gate !== "met") throw new Error("Round 1 completion gate required");
  if (!authorization.generatedBy || !authorization.generatedAt) throw new Error("Dated generation authorization required");
  const applicable = revisions.filter((r) => r.instrument === source.id && r.sourceVersion === source.version && r.targetVersion === targetVersion);
  if (!applicable.length) throw new Error("At least one approved revision is required");
  if (authorization.approvedRevisionCount !== applicable.length || authorization.expectedRevisionCount !== applicable.length) {
    throw new Error("Approved revision ledger is incomplete");
  }
  for (const revision of applicable) {
    if (!revision.evidenceCodeIds.length || !revision.reviewedBy || !revision.reviewedAt) throw new Error(`Unreviewed revision: ${revision.itemId}`);
    if (!source.items.some((item) => item.id === revision.itemId)) throw new Error(`Unknown item: ${revision.itemId}`);
  }
  return {
    ...source,
    version: targetVersion,
    status: "candidate",
    scoringStatus: "prohibited_pending_validation",
    items: source.items.map((item) => applicable.find((r) => r.itemId === item.id)?.afterValue ?? item),
  };
}

export const PILOT_PROTOCOL = {
  version: PILOT_PROTOCOL_VERSION,
  status: "draft_pending_cognitive_interviews",
  objective: "Estimate item performance and measurement structure; do not produce individual decisions or population prevalence claims.",
  sampling: {
    target: "Set after feasibility review and before data collection; justify separately for each instrument and planned model.",
    recruitment: "Document channels, eligibility, duplicates, completion, exclusions, incentives, and achieved sample gaps.",
    strata: ["career stage", "work arrangement", "business model", "jurisdiction", "disability/care context", "resource access", "platform dependence"],
    separation: "Cognitive-interview participants are excluded from the primary pilot analysis unless preregistered otherwise.",
  },
  preregistration: {
    requiredBeforeCollection: ["frozen candidate version", "construct-item map", "primary and secondary analyses", "exclusions", "missing/not-applicable handling", "fairness analyses", "decision thresholds", "deviations process"],
    immutableRecord: "Store public registration URL, timestamp, protocol version, and analysis-plan hash.",
  },
  analysis: [
    "Item response distributions, floor/ceiling effects, missingness, and not-applicable patterns.",
    "Inter-item associations and redundancy, interpreted against construct definitions.",
    "Dimensionality using preregistered models appropriate to ordinal items and sample size.",
    "Reliability with uncertainty; no alpha-only validation claim.",
    "Differential item functioning or structured fairness review where sample size permits.",
    "Sensitivity analyses for missing data, exclusions, and plausible alternative specifications.",
  ],
  activation: "Pilot findings inform a dated decision; passing automated checks never activates scoring by itself.",
} as const;

export const ACTIVATION_REQUIREMENTS = [
  ROUND_GATES.round1.id,
  ROUND_GATES.round2.id,
  "pilot_preregistered",
  "pilot_complete",
  "item_performance_reviewed",
  "dimensionality_reviewed",
  "reliability_reviewed",
  "fairness_reviewed",
  "claim_language_approved",
  "crosswalk_approved",
  "methodology_record_published",
  "dated_activation_decision_approved",
] as const;

export function scoringMayActivate(gates: Readonly<Record<string, "met" | "not_met" | "waived">>) {
  return ACTIVATION_REQUIREMENTS.every((gate) => gates[gate] === "met");
}
