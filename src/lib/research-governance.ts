import { assess, ITEM_IDS, METHODOLOGY_VERSION } from "./engine";
import {
  PROFESSIONAL_ITEM_IDS,
  PROFESSIONAL_METHODOLOGY_VERSION,
  type PDimensionKey,
} from "./instrument_professional";
import { assessProfessional } from "./engine_professional";

export const RESULT_SCHEMA_VERSION = "0.2.1";

export type InstrumentId = "ownership" | "portfolio_professional";
export type RecordClass = "canonical" | "recoverable" | "ambiguous" | "unusable";
export type EpistemicRole = "measurement_construct" | "causal_hypothesis" | "interpretive_theory";
export type ValidationState = "conceptual" | "content_review" | "pilot" | "reliability_tested" | "validated";
export type ClaimStrength = "descriptive" | "associational" | "predictive" | "causal";

export interface ConstructDefinition {
  id: string;
  instrument: InstrumentId;
  dimension: string;
  label: string;
  itemIds: string[];
  measurementConstruct: string;
  psychologicalConnection: string;
  operationalDefinition: string;
  epistemicRole: EpistemicRole;
  validationState: ValidationState;
  evidenceRequiredNext: string[];
  permissibleClaims: string[];
  prohibitedClaims: string[];
}

export const CONSTRUCT_REGISTRY: ConstructDefinition[] = [
  {
    id: "OI-AUD",
    instrument: "ownership",
    dimension: "audience",
    label: "Audience ownership",
    itemIds: ["A1", "A2", "A3", "A4"],
    measurementConstruct: "Direct, portable access to an audience and first-party relationship data.",
    psychologicalConnection: "Perceived control and dependence: whether reach is experienced as self-directed or contingent on an intermediary.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering direct reach, platform-loss continuity, channel mix, and first-party data use.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["expert content-validity review", "response-process interviews", "internal-consistency estimate", "comparison with verifiable channel records"],
    permissibleClaims: ["The respondent reported more or less direct audience access under this instrument.", "The dimension score summarizes the four stated response conditions."],
    prohibitedClaims: ["The score proves audience ownership.", "The score predicts business survival.", "A higher score causes resilience."],
  },
  {
    id: "OI-RGT",
    instrument: "ownership",
    dimension: "rights",
    label: "Content and rights control",
    itemIds: ["R1", "R2", "R3", "R4"],
    measurementConstruct: "Reported retention, limitation, reuse, and monetization of content rights.",
    psychologicalConnection: "Psychological ownership and legal agency: the felt and exercised authority to control an asset.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering copyright retention, usage duration, catalogue exploitation, and usage-fee practice.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["creator-lawyer content review", "contract-coding comparison", "response-process interviews", "factor analysis"],
    permissibleClaims: ["The score describes reported rights practices.", "Lower responses identify stated contract-control exposures."],
    prohibitedClaims: ["The result is legal advice.", "A high score establishes legal ownership.", "The score measures contract quality comprehensively."],
  },
  {
    id: "OI-REV",
    instrument: "ownership",
    dimension: "revenue",
    label: "Revenue ownership",
    itemIds: ["V1", "V2", "V3", "V4"],
    measurementConstruct: "Reported diversification, recurrence, and control of income sources.",
    psychologicalConnection: "Economic self-efficacy and uncertainty tolerance: perceived capacity to maintain income under changing conditions.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering stream count, owned-income share, recurrence, and concentration.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["financial-record criterion comparison", "test–retest reliability", "distribution and floor/ceiling analysis", "factor analysis"],
    permissibleClaims: ["The dimension summarizes the respondent's selected income-structure bands.", "It can identify reported concentration or recurrence exposure."],
    prohibitedClaims: ["The score proves financial health.", "The score predicts income.", "More income streams necessarily improve wellbeing."],
  },
  {
    id: "OI-IDN",
    instrument: "ownership",
    dimension: "identity",
    label: "Identity and likeness control",
    itemIds: ["I1", "I2", "I3", "I4"],
    measurementConstruct: "Reported legal, contractual, monitoring, and enforcement capacity over commercial identity.",
    psychologicalConnection: "Identity continuity and personal agency: capacity to maintain boundaries around how the self is represented and used.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering marks, likeness clauses, synthetic-use clauses, and enforcement readiness.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["IP-law content review", "document-verification study", "jurisdictional sensitivity review", "response-process interviews"],
    permissibleClaims: ["The score describes reported protective practices.", "The result can flag areas for independent legal review."],
    prohibitedClaims: ["The score determines legal protection.", "The score confirms enforceability.", "A low score means rights do not exist."],
  },
  {
    id: "OI-INF",
    instrument: "ownership",
    dimension: "infra",
    label: "Business infrastructure",
    itemIds: ["B1", "B2", "B3", "B4"],
    measurementConstruct: "Reported formalization, contracting, delegation, and operational continuity.",
    psychologicalConnection: "Role release and self-efficacy: movement from personal execution toward systems that can carry work beyond the individual.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering entity form, contracting, delegation, and continuity.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["small-business expert review", "document and process corroboration", "test–retest reliability", "factor analysis"],
    permissibleClaims: ["The score summarizes reported operating structures.", "The responses indicate where work depends on the individual."],
    prohibitedClaims: ["The score proves enterprise value.", "Formalization always improves outcomes.", "The result is legal or business advice."],
  },
  {
    id: "PP-CAP",
    instrument: "portfolio_professional",
    dimension: "capability",
    label: "Capability ownership",
    itemIds: ["C1", "C2", "C3", "C4"],
    measurementConstruct: "Reported creation and portability of work, methods, artifacts, and expertise beyond a formal job description.",
    psychologicalConnection: "Job crafting, proactive behavior, career adaptability, and occupational self-efficacy.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering extra-role building, reusable artifacts, external visibility, and portability.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["organizational-psychology content review", "response-process interviews", "convergent measures of job crafting and career adaptability", "factor analysis"],
    permissibleClaims: ["The score describes reported portable capability-building behaviors.", "It does not measure intelligence, talent, or employability."],
    prohibitedClaims: ["The respondent is objectively more capable.", "A high score guarantees career mobility.", "Extra-role work is inherently beneficial."],
  },
  {
    id: "PP-VAL",
    instrument: "portfolio_professional",
    dimension: "value",
    label: "Institutionalized value",
    itemIds: ["V1", "V2", "V3", "V4"],
    measurementConstruct: "Reported adoption, transferability, continuity, and traceability of value within an organization.",
    psychologicalConnection: "Knowledge codification, collective efficacy, transactive memory, and reduced key-person dependence.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering adoption, handoff, continuity, and attributable impact.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["manager or peer corroboration", "artifact adoption records", "impact-measure audit", "discriminant-validity testing"],
    permissibleClaims: ["The score summarizes reported institutional uptake and continuity.", "It distinguishes personal execution from reported transfer to others."],
    prohibitedClaims: ["The score establishes organizational ROI.", "A high score proves indispensability.", "Institutional uptake was caused by the respondent alone."],
  },
  {
    id: "PP-MAN",
    instrument: "portfolio_professional",
    dimension: "mandate",
    label: "Mandate and autonomy",
    itemIds: ["M1", "M2", "M3", "M4"],
    measurementConstruct: "Reported discretion to shape role, priorities, new work, and organizational function.",
    psychologicalConnection: "Self-determination theory's autonomy construct, job crafting, role innovation, and perceived organizational support.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering role formation, priority control, building latitude, and function creation.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["convergent autonomy measure", "manager corroboration", "organizational-level invariance testing", "response-process interviews"],
    permissibleClaims: ["The score describes perceived and reported latitude under the presented conditions.", "It may be examined for association with other dimensions."],
    prohibitedClaims: ["The score proves actual authority.", "Autonomy causes performance.", "Lower autonomy reflects individual failure."],
  },
  {
    id: "PP-AUT",
    instrument: "portfolio_professional",
    dimension: "authority",
    label: "Visibility and authority",
    itemIds: ["A1", "A2", "A3", "A4"],
    measurementConstruct: "Reported recognition, audience, domain referral, and reputation-generated opportunity.",
    psychologicalConnection: "Professional identity, reputational capital, social capital, and signaling.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering referral authority, external recognition, direct audience, and reputation-led opportunity.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["public-record corroboration", "network-measure comparison", "bias and differential-item-functioning review", "factor analysis"],
    permissibleClaims: ["The score summarizes reported visibility and reputation-related opportunity.", "Public evidence may later corroborate selected responses."],
    prohibitedClaims: ["Visibility equals expertise.", "A large audience proves authority.", "The score is a ranking of professional worth."],
  },
  {
    id: "PP-THS",
    instrument: "portfolio_professional",
    dimension: "thesis",
    label: "Coherent thesis",
    itemIds: ["T1", "T2", "T3", "T4"],
    measurementConstruct: "Reported coherence, compounding, legibility, and future direction across a body of work.",
    psychologicalConnection: "Narrative identity, possible selves, goal orientation, sensemaking, and identity-based motivation.",
    operationalDefinition: "Sum of four self-reported 0–5 response conditions covering thematic connection, compounding, external legibility, and directed institution-building.",
    epistemicRole: "measurement_construct",
    validationState: "pilot",
    evidenceRequiredNext: ["narrative-identity expert review", "blind portfolio coding", "response-process interviews", "convergent and discriminant validity"],
    permissibleClaims: ["The score describes the respondent's reported coherence and direction.", "It is one lens on a portfolio, not a judgment of its substantive value."],
    prohibitedClaims: ["A coherent story proves strategic quality.", "The score predicts future success.", "Range without one thesis is deficient."],
  },
];

export const THEORY_REGISTRY = [
  {
    id: "TH-01",
    role: "interpretive_theory" as const,
    label: "Institution of One",
    statement: "An individual may accumulate portable capability, controlled assets, institutionalized value, authority, and a coherent direction such that work and opportunity increasingly organize around them.",
    status: "interpretive framework; not a measured latent variable in the current versions",
  },
  {
    id: "H-01",
    role: "causal_hypothesis" as const,
    label: "Control–resilience hypothesis",
    statement: "Greater control of audience, rights, revenue, identity, or infrastructure may reduce exposure to intermediary or key-person shocks.",
    status: "untested causal hypothesis; requires longitudinal or quasi-experimental evidence",
  },
  {
    id: "H-02",
    role: "causal_hypothesis" as const,
    label: "Codification–institutionalization hypothesis",
    statement: "Codifying and transferring individual capability may increase continuity and organizational adoption.",
    status: "untested causal hypothesis; current cross-sectional self-report cannot establish direction or causation",
  },
  {
    id: "H-03",
    role: "causal_hypothesis" as const,
    label: "Coherence–opportunity hypothesis",
    statement: "A more legible portfolio thesis may improve recognition or opportunity formation.",
    status: "untested causal hypothesis; reputation, resources, selection, and network position are plausible confounders",
  },
];

export const CLAIM_POLICY: Record<ClaimStrength, { permitted: boolean; rule: string }> = {
  descriptive: { permitted: true, rule: "Permitted when tied to the exact self-reported response, score, instrument version, population, and time window." },
  associational: { permitted: false, rule: "Not permitted until sample size, preregistered analysis, uncertainty, and confounding treatment support it." },
  predictive: { permitted: false, rule: "Not permitted until out-of-sample predictive validation and calibration are reported." },
  causal: { permitted: false, rule: "Not permitted from current cross-sectional self-report data; requires a defensible causal design." },
};

const expectedIds = (instrument: InstrumentId) =>
  Object.values(instrument === "ownership" ? ITEM_IDS : PROFESSIONAL_ITEM_IDS).flat();

function responseObject(value: unknown): Record<string, number> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.some(([, v]) => typeof v !== "number" || !Number.isInteger(v) || v < 0 || v > 5)) return null;
  return Object.fromEntries(entries) as Record<string, number>;
}

function inferInstrument(responses: Record<string, number>): InstrumentId | null {
  const ids = new Set(Object.keys(responses));
  const ownership = expectedIds("ownership");
  const professional = expectedIds("portfolio_professional");
  const ownershipUnique = ownership.some((id) => ids.has(id) && !professional.includes(id));
  const professionalUnique = professional.some((id) => ids.has(id) && !ownership.includes(id));
  if (ownershipUnique && !professionalUnique) return "ownership";
  if (professionalUnique && !ownershipUnique) return "portfolio_professional";
  return null;
}

export interface AssessmentRecordLike {
  instrument: string;
  responses: unknown;
  research: unknown;
  methodologyVersion: string | null;
  total: number | null;
}

export interface RecordDiagnosis {
  classification: RecordClass;
  reason: string;
  inferredInstrument: InstrumentId | null;
  scoreReproducible: boolean;
}

export function classifyAssessmentRecord(row: AssessmentRecordLike): RecordDiagnosis {
  const responses = responseObject(row.responses);
  if (!responses || Object.keys(responses).length === 0) {
    return { classification: "unusable", reason: "responses are empty or contain invalid values", inferredInstrument: null, scoreReproducible: false };
  }
  const declared = row.instrument === "ownership" || row.instrument === "portfolio_professional" ? row.instrument : null;
  const inferred = inferInstrument(responses);
  const instrument = inferred ?? declared;
  if (!instrument || (inferred && declared && inferred !== declared)) {
    return { classification: "ambiguous", reason: "instrument cannot be identified unambiguously", inferredInstrument: inferred, scoreReproducible: false };
  }
  const expected = expectedIds(instrument);
  const keys = Object.keys(responses);
  const complete = keys.length === expected.length && expected.every((id) => keys.includes(id));
  if (!complete) {
    return { classification: "ambiguous", reason: "response set is incomplete or contains unexpected item identifiers", inferredInstrument: instrument, scoreReproducible: false };
  }
  const computed = instrument === "ownership" ? assess(responses).total : assessProfessional(responses).total;
  const scoreReproducible = row.total == null || row.total === computed;
  if (!scoreReproducible) {
    return { classification: "ambiguous", reason: "stored total does not reproduce from the stored responses", inferredInstrument: instrument, scoreReproducible: false };
  }
  const research = row.research && typeof row.research === "object" && !Array.isArray(row.research)
    ? row.research as Record<string, unknown>
    : {};
  const expectedVersion = instrument === "ownership" ? METHODOLOGY_VERSION : PROFESSIONAL_METHODOLOGY_VERSION;
  const canonical = row.methodologyVersion === expectedVersion
    && research.__resultSchemaVersion === RESULT_SCHEMA_VERSION
    && typeof research.__assessmentId === "string";
  if (canonical) {
    return { classification: "canonical", reason: "complete, reproducible, current-version record with canonical event metadata", inferredInstrument: instrument, scoreReproducible: true };
  }
  return { classification: "recoverable", reason: "complete and reproducible but missing or predating canonical event/version metadata", inferredInstrument: instrument, scoreReproducible: true };
}

export const CONSTRUCT_BY_ITEM = new Map(
  CONSTRUCT_REGISTRY.flatMap((construct) =>
    construct.itemIds.map((itemId) => [`${construct.instrument}:${itemId}`, construct] as const),
  ),
);

export function constructForItem(instrument: InstrumentId, itemId: string) {
  return CONSTRUCT_BY_ITEM.get(`${instrument}:${itemId}`);
}

