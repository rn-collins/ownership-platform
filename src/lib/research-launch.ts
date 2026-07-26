export const ROUND_ONE_LAUNCH_STATUS = {
  phase: "recruiting_round_1",
  evidenceStatus: "no_interview_evidence_collected",
  ownership: { enrolled: 0, completed: 0, minimumCompleted: 8 },
  portfolioProfessional: { enrolled: 0, completed: 0, minimumCompleted: 8 },
  scoringEnabled: false,
  candidate2GenerationEnabled: false,
} as const;

export const SAMPLING_MATRIX = [
  { id: "career_stage", label: "Career stage", coverage: ["early", "mid", "senior", "transitioning"], rationale: "Tests whether experience and organizational position change interpretation." },
  { id: "work_arrangement", label: "Work arrangement", coverage: ["employee", "independent", "creator", "founder", "mixed portfolio"], rationale: "Tests fit across employment and independent-work structures." },
  { id: "platform_dependence", label: "Platform dependence", coverage: ["low", "mixed", "high"], rationale: "Tests whether platform access changes ownership concepts." },
  { id: "jurisdiction", label: "Jurisdiction", coverage: ["United States", "outside United States", "multiple jurisdictions"], rationale: "Surfaces legal, contractual, and terminology differences." },
  { id: "disability_care", label: "Disability, chronic illness, and care", coverage: ["represented", "not disclosed", "not represented"], rationale: "Tests accessibility and whether continuity items misclassify constrained capacity." },
  { id: "income_structure", label: "Income structure", coverage: ["salary", "project", "recurring", "royalty/licence", "mixed", "variable/seasonal"], rationale: "Tests denominators, reference periods, and not-applicable routing." },
  { id: "resource_access", label: "Professional support", coverage: ["limited", "some", "substantial"], rationale: "Separates individual practice from access to legal, financial, technical, or administrative support." },
] as const;

export const PARTICIPANT_PIPELINE = [
  "request_received",
  "eligibility_screened",
  "sampling_review",
  "invited_to_schedule",
  "scheduled",
  "consent_reconfirmed",
  "interview_completed",
  "coded",
  "quality_reviewed",
  "withdrawn_or_retained",
] as const;

export const RECRUITMENT_CHANNELS = [
  { channel: "LinkedIn", use: "Professionals, creators, founders, and portfolio workers in RN Collins’s extended network.", control: "Record post URL and source code; do not infer consent from engagement." },
  { channel: "X", use: "Creator-economy, independent-work, and research-method communities.", control: "Direct every respondent to the consent-aware intake form." },
  { channel: "Beehiiv", use: "Readers already interested in Institutions of One questions.", control: "Newsletter subscription is not study consent." },
  { channel: "Direct referral", use: "Purposive recruitment for missing sampling cells.", control: "No third party may enroll someone else; invitees decide independently." },
  { channel: "Professional and creator communities", use: "Reach work arrangements and jurisdictions absent from RN Collins’s immediate network.", control: "Obtain moderator permission where required and preserve the exact invitation." },
] as const;

export const PUBLIC_PARTICIPANT_INVITATION = {
  title: "Help test the questions behind Institutions of One",
  short: "Institutions of One is recruiting adults for remote cognitive interviews about two candidate research instruments: the Ownership Index and Portfolio Professional. The interview tests whether each question is understandable, answerable, accessible, and fair. It does not score or evaluate you.",
  participation: "A moderated remote interview asks you to answer selected candidate questions and explain how you understood them, what evidence you used, and where the wording or response options failed.",
  boundaries: "Participation is voluntary. You may skip any question, pause, or stop. Recording and de-identified quotation are optional. Participation produces no score, diagnosis, ranking, or eligibility decision.",
} as const;

export const RESEARCH_RETENTION_RULES = [
  "Contact information is used only for screening, scheduling, withdrawal, and required study communication.",
  "Contact details remain separated from public reporting through a study code.",
  "Recording and quotation permissions are stored separately and may be declined.",
  "A withdrawal request stops contact and withdraws requested or scheduled sessions.",
  "Synthetic QA records use reserved labels and domains, are withdrawn after verification, and are never admissible as research evidence.",
  "Session notes and item-level codes are restricted to authorized researchers.",
  "A retention schedule must be dated and approved before the first real interview; records may not be retained merely because storage is available.",
] as const;

export const LIMITATIONS_TEMPLATE = [
  "Recruitment channels and resulting coverage",
  "Eligibility and exclusion counts",
  "Achieved sampling dimensions and unfilled cells",
  "Interview completion, withdrawal, and missingness",
  "Items not administered to the required number of participants",
  "Unresolved response-process failures",
  "Accessibility and structural-fairness limitations",
  "Researcher interpretation and coding limitations",
  "Claims the evidence does not support",
] as const;

export const ACTIVATION_DECISION_TEMPLATE = {
  decision: "blocked",
  requiredFields: [
    "instrument and frozen candidate version",
    "dated gate snapshot",
    "preregistration record and analysis-plan hash",
    "sample and exclusions",
    "item-performance findings",
    "dimensionality and reliability findings with uncertainty",
    "fairness review and unresolved gaps",
    "approved claim language",
    "migration and crosswalk approval",
    "named approver and decision date",
  ],
  automaticActivationProhibited: true,
} as const;
