export type BatteryValidationState = "descriptive" | "adapted_single_item" | "outcome_candidate" | "qualitative";

export interface BatteryConstruct {
  id: string;
  module: string;
  label: string;
  itemIds: string[];
  role: string;
  constructDefinition: string;
  primaryRisks: string[];
  validationState: BatteryValidationState;
  permissibleUse: string;
}

export const RESEARCH_BATTERY_VERSION_REVIEWED = "0.2.0";

export const RESEARCH_BATTERY_REGISTRY: BatteryConstruct[] = [
  {
    id:"RB-PROFILE",module:"profile",label:"Creator context and segmentation",
    itemIds:["P1","P3","P4","P5","P6","P7","P8","P9","P10","P12"],
    role:"descriptive covariates and subgroup context",
    constructDefinition:"Platform, field, reach, tenure, income, work status, team, region, age, and representation context reported by the respondent.",
    primaryRisks:["category coverage and changing platform landscape","income currency and period ambiguity","multi-platform and multi-vertical respondents forced into one category","regional categories too broad for legal or economic comparison"],
    validationState:"descriptive",
    permissibleUse:"Describe the responding sample with missingness and category definitions; do not treat categories as causal explanations.",
  },
  {
    id:"RB-AGENCY",module:"wellbeing",label:"Perceived creative autonomy",
    itemIds:["G1"],
    role:"psychological correlate candidate",
    constructDefinition:"A single self-report indication of perceived control over creative work.",
    primaryRisks:["single-item coverage","combines what is created with how it is created","not equivalent to a validated autonomy scale"],
    validationState:"adapted_single_item",
    permissibleUse:"Report the item response descriptively and examine preregistered associations; do not label it a validated autonomy score.",
  },
  {
    id:"RB-EFFICACY",module:"wellbeing",label:"Perceived competence",
    itemIds:["G2"],
    role:"psychological correlate candidate",
    constructDefinition:"A single global judgment of skill and effectiveness in the respondent's creator work.",
    primaryRisks:["skill and effectiveness are distinct","global self-evaluation","social-desirability and reference-group effects"],
    validationState:"adapted_single_item",
    permissibleUse:"Describe perceived competence; do not infer objective skill or performance.",
  },
  {
    id:"RB-RELATED",module:"wellbeing",label:"Audience relatedness",
    itemIds:["G3"],
    role:"psychological correlate candidate",
    constructDefinition:"A single indication of felt connection to the respondent's audience.",
    primaryRisks:["connection type and audience are undefined","parasocial and reciprocal relationships differ","single-item coverage"],
    validationState:"adapted_single_item",
    permissibleUse:"Describe felt audience connection without inferring relationship quality or audience sentiment.",
  },
  {
    id:"RB-STRAIN",module:"wellbeing",label:"Creator strain and identity load",
    itemIds:["G4","G5","G6","G7","G11"],
    role:"multidimensional psychological risk battery",
    constructDefinition:"Separate indications of emotional exhaustion, availability pressure, identity entanglement, algorithm worry, and financial stress.",
    primaryRisks:["items are not one established scale","G7 uses 'constantly'","different time frames","identity entanglement is not necessarily harmful","financial stress is structurally conditioned"],
    validationState:"adapted_single_item",
    permissibleUse:"Analyze each item separately until dimensionality and reliability support any composite.",
  },
  {
    id:"RB-WELLBEING-OUT",module:"wellbeing",label:"Wellbeing and sustainability outcomes",
    itemIds:["G8","G12","G13","G14","G15"],
    role:"criterion and outcome candidates",
    constructDefinition:"Self-reported mental-health harm, meaning, anticipated sustainability, workload, and projected continuation.",
    primaryRisks:["G8 is sensitive health information","causal wording in 'creating has harmed'","future projections are not outcomes","hours omit unpaid care and other employment","purpose and sustainability are distinct"],
    validationState:"outcome_candidate",
    permissibleUse:"Report separately with consent, safeguarding, time frames, and uncertainty; never diagnose or infer causation.",
  },
  {
    id:"RB-ATTN",module:"wellbeing",label:"Instructional attention indicator",
    itemIds:["ATTN1"],
    role:"data-quality flag",
    constructDefinition:"Whether the respondent selected the explicitly requested response.",
    primaryRisks:["failure may reflect language, accessibility, fatigue, or interface error","must not be used as the sole exclusion rule"],
    validationState:"descriptive",
    permissibleUse:"Flag for sensitivity analysis alongside completion time, missingness, and pattern checks; do not automatically discard a person.",
  },
  {
    id:"RB-LEGAL",module:"rights",label:"Contracting and rights experience",
    itemIds:["C1","C3","C4","C7","C8","C10"],
    role:"legal-practice context and criterion candidates",
    constructDefinition:"Reported contract authorship, unauthorized or unpaid reuse, usage-fee experience, trademark status, disputes, and legal awareness.",
    primaryRisks:["jurisdiction dependence","double-barreled unpaid invoice/content misuse item","awareness is not protection","NO FAKES Act status may change","not-applicable paths are missing"],
    validationState:"descriptive",
    permissibleUse:"Describe reported practices and experiences; do not determine rights, compliance, enforceability, or legal quality.",
  },
  {
    id:"RB-BIZ",module:"revenue",label:"Business-model resilience context",
    itemIds:["D3","D4","D5","D6","D8"],
    role:"business practices and criterion candidates",
    constructDefinition:"Reported pricing structure, pricing appraisal, liquidity runway, income trajectory, and banking separation.",
    primaryRisks:["currency and period definitions","pricing confidence lacks a factual benchmark","runway may expose financial vulnerability","binary bank-account item is jurisdiction and stage dependent"],
    validationState:"outcome_candidate",
    permissibleUse:"Use defined time periods and analyze separately; do not infer financial health or business quality.",
  },
  {
    id:"RB-DIST",module:"audience",label:"Audience distribution context",
    itemIds:["E1","E2","E6","E8"],
    role:"distribution practices and shock experience",
    constructDefinition:"Reported list scale, community form, discovery dependence, and algorithm-change reach loss.",
    primaryRisks:["raw list size is not comparable across creator scale","community categories overlap","discovery dependence anchors are subjective","reach loss lacks magnitude and period"],
    validationState:"outcome_candidate",
    permissibleUse:"Describe channels and reported shock experience; normalize or stratify scale before comparison.",
  },
  {
    id:"RB-BRAND",module:"brand",label:"Brand architecture and portability",
    itemIds:["F1","F3","F4","F7"],
    role:"positioning and asset context",
    constructDefinition:"Reported thematic positioning, identity model, controlled brand assets, and perceived format continuity.",
    primaryRisks:["one niche is not inherently superior","faceless/personal is not ordinal","asset checklist mixes legal and creative assets","F7 is hypothetical"],
    validationState:"descriptive",
    permissibleUse:"Create descriptive profiles; do not score these options as a maturity ladder without validation.",
  },
  {
    id:"RB-AI",module:"ai",label:"AI use and synthetic-identity exposure",
    itemIds:["H1","H2","H3","H5"],
    role:"technology-practice and harm context",
    constructDefinition:"Reported AI workflow use, impersonation, unauthorized cloning, and willingness to license synthetic identity.",
    primaryRisks:["rapid temporal drift","AI use categories are not a single progression","impersonation and deepfake are distinct","sensitive harm disclosure","hypothetical willingness depends on terms"],
    validationState:"outcome_candidate",
    permissibleUse:"Report item-level prevalence with dates and definitions; do not create a single AI maturity or risk score.",
  },
  {
    id:"RB-TRAJ",module:"outcomes",label:"Career shocks, intentions, and strategic direction",
    itemIds:["I1","I2","I3","I4","I5"],
    role:"criterion candidates and current intentions",
    constructDefinition:"Reported platform sanctions, income shock recovery, career reconsideration, current goal, and acquisition interest.",
    primaryRisks:["double-barreled shock and recovery","counterfactual regret item","goals may be multiple","acquisition interest is stage and market dependent","platform sanction severity varies"],
    validationState:"outcome_candidate",
    permissibleUse:"Analyze items separately with stated time windows; do not combine intentions and realized outcomes.",
  },
  {
    id:"RB-QUAL",module:"qual",label:"Respondent-defined ownership and threat",
    itemIds:["J1","J2"],
    role:"qualitative theory development",
    constructDefinition:"Open-text accounts of creator-business ownership and current livelihood threats.",
    primaryRisks:["privacy and re-identification","one-line prompt limits complexity","coding framework may impose researcher assumptions"],
    validationState:"qualitative",
    permissibleUse:"Use a documented qualitative coding protocol, redact identifiers, preserve deviant cases, and distinguish participant language from researcher interpretation.",
  },
];

export const BATTERY_ITEM_TO_CONSTRUCT = new Map(
  RESEARCH_BATTERY_REGISTRY.flatMap((construct) =>
    construct.itemIds.map((itemId) => [itemId, construct.id] as const),
  ),
);

