export type CohortCaseType = "creator" | "professional";
export type CohortStage = "selected_pending_review" | "reviewed" | "excluded";

export type CohortMember = {
  slug: string;
  displayName: string;
  caseType: CohortCaseType;
  field: string;
  institutionalForm: string;
  selectionReason: string;
  stage: CohortStage;
  researchRestriction?: string;
};

export const FIRST_COHORT_VERSION = "1.0.0";
export const FIRST_COHORT_TARGET = 12;

export const FIRST_OBSERVATORY_COHORT: readonly CohortMember[] = [
  {
    slug: "mrbeast",
    displayName: "MrBeast (Jimmy Donaldson)",
    caseType: "creator",
    field: "Consumer",
    institutionalForm: "creator-led operating company",
    selectionReason: "Tests large-scale conversion of audience and brand into a multi-line company.",
    stage: "selected_pending_review",
    researchRestriction:
      "Context case is frozen. No new dossier or source-expansion pass until eight other cohort cases are reviewed, except to correct a material error or resolve a documented contradiction.",
  },
  {
    slug: "emma-chamberlain",
    displayName: "Emma Chamberlain",
    caseType: "creator",
    field: "Consumer",
    institutionalForm: "creator-founded consumer brand",
    selectionReason: "Tests a creator-to-consumer-company pathway at a different scale and governance profile.",
    stage: "selected_pending_review",
  },
  {
    slug: "huda-kattan",
    displayName: "Huda Kattan",
    caseType: "creator",
    field: "Fashion & Brand",
    institutionalForm: "founder-led brand with external-capital history",
    selectionReason: "Tests ownership change, founder control, and brand institutionalization.",
    stage: "selected_pending_review",
  },
  {
    slug: "marques-brownlee",
    displayName: "Marques Brownlee",
    caseType: "creator",
    field: "Tech",
    institutionalForm: "independent media studio with commercial partnerships",
    selectionReason: "Tests studio ownership, distribution dependence, and partner equity.",
    stage: "selected_pending_review",
  },
  {
    slug: "pieter-levels",
    displayName: "Pieter Levels",
    caseType: "creator",
    field: "Tech",
    institutionalForm: "independent product portfolio",
    selectionReason: "Tests a low-headcount, multi-product institution built without a conventional employer.",
    stage: "selected_pending_review",
  },
  {
    slug: "jack-conte",
    displayName: "Jack Conte",
    caseType: "creator",
    field: "Creator Economy",
    institutionalForm: "creator-founded platform company",
    selectionReason: "Tests movement from personal creative practice into platform governance.",
    stage: "selected_pending_review",
  },
  {
    slug: "suzie-reider",
    displayName: "Suzie Reider",
    caseType: "professional",
    field: "Media",
    institutionalForm: "role-building inside a platform company",
    selectionReason: "Tests capability institutionalized through an employer-created operating mandate.",
    stage: "selected_pending_review",
  },
  {
    slug: "ashley-rudder",
    displayName: "Ashley Rudder",
    caseType: "professional",
    field: "Creator Economy",
    institutionalForm: "executive role shaped around creator expertise",
    selectionReason: "Tests authority and portability inside an agency or services institution.",
    stage: "selected_pending_review",
  },
  {
    slug: "claire-zau",
    displayName: "Claire Zau",
    caseType: "professional",
    field: "Venture",
    institutionalForm: "specialist investing mandate",
    selectionReason: "Tests whether a differentiated capability becomes durable investment authority.",
    stage: "selected_pending_review",
  },
  {
    slug: "josephus-allmond",
    displayName: "Josephus Allmond",
    caseType: "professional",
    field: "Government",
    institutionalForm: "public-sector role created around a policy mandate",
    selectionReason: "Tests institution-building where authority is public and ownership is structurally constrained.",
    stage: "selected_pending_review",
  },
  {
    slug: "neri-oxman",
    displayName: "Neri Oxman",
    caseType: "professional",
    field: "Design",
    institutionalForm: "research-to-company hybrid",
    selectionReason: "Tests portability across university research, public authority, and a founder-led organization.",
    stage: "selected_pending_review",
  },
  {
    slug: "shonda-rhimes",
    displayName: "Shonda Rhimes",
    caseType: "professional",
    field: "Media",
    institutionalForm: "named creative enterprise within a distribution partner",
    selectionReason: "Tests negotiated authority, owned identity assets, and dependence on institutional distribution.",
    stage: "selected_pending_review",
  },
] as const;

export type CohortGateInput = {
  reviewedSlugs: readonly string[];
  evidenceCoverageBySlug: Readonly<Record<string, number>>;
};

export type CohortGateResult = {
  eligible: boolean;
  reasons: string[];
  reviewedCount: number;
  creatorReviewed: number;
  professionalReviewed: number;
};

export function evaluateCrossCaseFindingGate(input: CohortGateInput): CohortGateResult {
  const reviewed = FIRST_OBSERVATORY_COHORT.filter((member) =>
    input.reviewedSlugs.includes(member.slug),
  );
  const sufficientlyCovered = reviewed.filter(
    (member) => (input.evidenceCoverageBySlug[member.slug] ?? 0) >= 0.8,
  );
  const creatorReviewed = sufficientlyCovered.filter(
    (member) => member.caseType === "creator",
  ).length;
  const professionalReviewed = sufficientlyCovered.filter(
    (member) => member.caseType === "professional",
  ).length;
  const reasons: string[] = [];

  if (sufficientlyCovered.length < 8) {
    reasons.push("At least eight cohort cases must be reviewed with 80% or greater workflow coverage.");
  }
  if (creatorReviewed < 4) {
    reasons.push("At least four sufficiently covered creator cases are required.");
  }
  if (professionalReviewed < 4) {
    reasons.push("At least four sufficiently covered professional cases are required.");
  }

  return {
    eligible: reasons.length === 0,
    reasons,
    reviewedCount: sufficientlyCovered.length,
    creatorReviewed,
    professionalReviewed,
  };
}

export function mayExpandFrozenContextCase(reviewedSlugs: readonly string[]): boolean {
  return reviewedSlugs.filter((slug) => slug !== "mrbeast").length >= 8;
}
