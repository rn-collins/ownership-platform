/**
 * Pre-activation research candidates.
 *
 * These instruments are intentionally not imported by application routes.
 * They may be used only in cognitive interviews and controlled pilots until
 * the activation gates below have been satisfied.
 */
export type CandidateItem = {
  id: string;
  construct: string;
  prompt: string;
  responseFormat: string;
  anchors: readonly string[];
  contextFields?: readonly string[];
};

export type InstrumentCandidate = {
  id: "ownership" | "portfolio_professional";
  version: string;
  status: "candidate";
  referencePeriod: string;
  scoringStatus: "prohibited_pending_validation";
  items: readonly CandidateItem[];
};

const frequency = ["Never", "Rarely", "Sometimes", "Often", "Usually", "Every applicable time"] as const;
const percent = ["0%", "1–9%", "10–24%", "25–49%", "50–74%", "75–100%"] as const;
const maturity = [
  "No practice or evidence",
  "Informal or exceptional practice",
  "Repeatable in a minority of applicable situations",
  "Documented in about half of applicable situations",
  "Documented in most applicable situations",
  "Documented, reviewed, and consistently used",
] as const;

export const OWNERSHIP_INDEX_0_3_0_CANDIDATE: InstrumentCandidate = {
  id: "ownership",
  version: "0.3.0-candidate.1",
  status: "candidate",
  referencePeriod: "previous 12 complete months unless an item states otherwise",
  scoringStatus: "prohibited_pending_validation",
  items: [
    { id:"A1", construct:"direct audience access", prompt:"What percentage of the people who regularly engage with your work can you contact through channels whose contact list you can export?", responseFormat:"single choice", anchors:percent, contextFields:["denominator used","channel types"] },
    { id:"A2", construct:"audience continuity", prompt:"If your largest platform account became unavailable today, what percentage of that active audience could you contact directly within seven days?", responseFormat:"single choice", anchors:percent, contextFields:["largest platform","active-audience definition"] },
    { id:"A3", construct:"discovery dependence", prompt:"What percentage of new audience discovery came through your single largest third-party platform?", responseFormat:"reverse-scored single choice", anchors:["75–100%","50–74%","25–49%","10–24%","1–9%","0%"], contextFields:["platform","measurement source"] },
    { id:"A4", construct:"first-party data governance", prompt:"How consistently do you collect and use audience data with documented notice, consent where required, and an export or deletion process?", responseFormat:"single choice", anchors:maturity, contextFields:["data types","jurisdiction","consent mechanism"] },
    { id:"R1", construct:"copyright retention", prompt:"In agreements for original content, how often do you retain copyright and grant a defined licence instead of assigning copyright?", responseFormat:"single choice", anchors:frequency, contextFields:["not-applicable option","agreement sample count"] },
    { id:"R2", construct:"usage-term control", prompt:"For licensed content, how consistently are duration, media, territory, renewal, and price stated in writing?", responseFormat:"single choice", anchors:maturity, contextFields:["not-applicable option","term checklist"] },
    { id:"R3", construct:"catalogue records", prompt:"How much of your commercially reusable catalogue has a current record of ownership, licences, locations, and restrictions?", responseFormat:"single choice", anchors:percent, contextFields:["catalogue definition","record system"] },
    { id:"R4", construct:"secondary-use compensation", prompt:"When a client uses your content beyond the original publication, how often is that use separately approved and compensated?", responseFormat:"single choice", anchors:frequency, contextFields:["not-applicable option","exclude creator-posted organic use"] },
    { id:"V1", construct:"income diversification", prompt:"How many independent income streams each contributed at least 10% of gross income or paid in at least six separate months?", responseFormat:"single choice", anchors:["0","1","2","3","4","5 or more"], contextFields:["gross-income basis"] },
    { id:"V2", construct:"controlled-income share", prompt:"What percentage of gross income came from offers or assets for which you control pricing, customer access, and continuation?", responseFormat:"single choice", anchors:percent, contextFields:["included streams"] },
    { id:"V3", construct:"recurring-income share", prompt:"What percentage of gross income was contractually recurring or subscription-based?", responseFormat:"single choice", anchors:percent },
    { id:"V4", construct:"payer concentration", prompt:"What percentage of gross income came from your largest payer?", responseFormat:"reverse-scored single choice", anchors:["75–100%","50–74%","25–49%","10–24%","1–9%","0%"], contextFields:["payer definition"] },
    { id:"I1", construct:"identifier control", prompt:"How consistently do you maintain current records of the domains, handles, registrations, renewals, and authorized users needed for your brand identifiers?", responseFormat:"single choice", anchors:maturity, contextFields:["jurisdiction","registration not required option"] },
    { id:"I2", construct:"likeness contract coverage", prompt:"In agreements that may use your name, image, likeness, or voice, how often are permitted uses and approval rights stated in writing?", responseFormat:"single choice", anchors:frequency, contextFields:["not-applicable option"] },
    { id:"I3", construct:"synthetic-use control", prompt:"In agreements that may involve synthetic media or model training, how often are permission, purpose, duration, compensation, and revocation terms stated in writing?", responseFormat:"single choice", anchors:frequency, contextFields:["not-applicable option","use-type checklist"] },
    { id:"I4", construct:"misuse response readiness", prompt:"How complete is your documented process for detecting, recording, escalating, and responding to suspected misuse of your identity?", responseFormat:"single choice", anchors:maturity, contextFields:["monitoring method","response route"] },
    { id:"B1", construct:"fit-for-purpose separation", prompt:"How consistently are business money, obligations, records, and decision authority separated from personal activity in a form appropriate to your jurisdiction and stage?", responseFormat:"single choice", anchors:maturity, contextFields:["jurisdiction","business stage"] },
    { id:"B2", construct:"contract coverage", prompt:"For paid work, how often is the agreement documented using a current template or reviewed written terms before work begins?", responseFormat:"single choice", anchors:frequency, contextFields:["not-applicable option"] },
    { id:"B3", construct:"operational transferability", prompt:"How many necessary operating functions have current instructions and can be completed by another person or an approved automated system?", responseFormat:"single choice", anchors:["None","One","Two","Three","Four","Five or more"], contextFields:["valid solo-model context","function inventory"] },
    { id:"B4", construct:"continuity", prompt:"If you performed no routine work for 30 days, what share of already-planned obligations could the business meet without emergency intervention?", responseFormat:"single choice", anchors:percent, contextFields:["seasonality","care or disability context","business model"] },
  ],
};

export const PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE: InstrumentCandidate = {
  id: "portfolio_professional",
  version: "0.2.0-candidate.1",
  status: "candidate",
  referencePeriod: "previous 12 complete months unless an item states otherwise",
  scoringStatus: "prohibited_pending_validation",
  items: [
    { id:"C1",construct:"proactive capability building",prompt:"How consistently did you initiate a new capability, method, or body of knowledge relevant to your work?",responseFormat:"single choice",anchors:maturity,contextFields:["structural opportunity"]},
    { id:"C2",construct:"reusable knowledge artifacts",prompt:"How many reusable artifacts—such as a method, guide, model, dataset, workflow, or curriculum—did you create and maintain?",responseFormat:"single choice",anchors:["0","1","2","3","4","5 or more"]},
    { id:"C3",construct:"capability legibility",prompt:"How consistently could the audiences relevant to your goals find credible evidence of your capabilities?",responseFormat:"single choice",anchors:maturity,contextFields:["internal/external/both","intended audience"]},
    { id:"C4",construct:"capability portability",prompt:"How much of your capability can you demonstrate or apply in another setting without using restricted employer or client property?",responseFormat:"single choice",anchors:percent,contextFields:["contractual restrictions"]},
    { id:"V1",construct:"organizational adoption",prompt:"How consistently did other people use a method or artifact you created in their work?",responseFormat:"single choice",anchors:maturity,contextFields:["team boundary","evidence type"]},
    { id:"V2",construct:"transferability",prompt:"How consistently could another person produce an acceptable result from your documented method without your live assistance?",responseFormat:"single choice",anchors:maturity,contextFields:["observation period"]},
    { id:"V3",construct:"continuity",prompt:"When you were unavailable, how consistently did the capability continue to operate as intended?",responseFormat:"candidate redundancy item; single choice",anchors:maturity,contextFields:["staffing/support","compare with V2"]},
    { id:"V4",construct:"traceable organizational value",prompt:"How consistently was your contribution linked to a documented operational, learning, customer, risk, or financial result?",responseFormat:"single choice",anchors:maturity,contextFields:["evidence type","no sole-attribution claim"]},
    { id:"M1",construct:"role shaping",prompt:"How much of your role’s scope, priorities, or interfaces resulted from proposals you made and agreements you negotiated?",responseFormat:"single choice",anchors:percent,contextFields:["seniority","organizational opportunity"]},
    { id:"M2",construct:"work autonomy",prompt:"How much discretion did you have over the methods used to produce agreed outcomes?",responseFormat:"single choice",anchors:percent,contextFields:["task/schedule/priority autonomy recorded separately"]},
    { id:"M3",construct:"innovation latitude",prompt:"How consistently did you have explicit permission, time, and psychological safety to test a new approach?",responseFormat:"candidate distinctness item; single choice",anchors:maturity,contextFields:["compare with M2"]},
    { id:"M4",construct:"organizational receptivity",prompt:"For the most consequential proposal you made, what observable decision followed?",responseFormat:"single choice",anchors:["No proposal","Not reviewed","Reviewed; no decision","Decision with reasons","Approved for test","Adopted or scaled"],contextFields:["proposal type","decision evidence"]},
    { id:"A1",construct:"domain referral",prompt:"How often were you asked for guidance or referred work because of a specific domain capability?",responseFormat:"single choice",anchors:frequency,contextFields:["reference group"]},
    { id:"A2",construct:"recognition evidence",prompt:"Which independently conferred recognition signals did you receive?",responseFormat:"unscored multi-select",anchors:["Peer referral","Invited talk","Award or fellowship","Editorial or press citation","Formal internal recognition","Other","None"],contextFields:["access opportunity"]},
    { id:"A3",construct:"professional audience access",prompt:"What percentage of the professional audience relevant to your goals could you contact through an exportable list or direct relationship?",responseFormat:"single choice",anchors:percent,contextFields:["audience definition","relationship depth"]},
    { id:"A4",construct:"reputation-linked opportunity",prompt:"How often did an inbound opportunity identify a prior artifact, referral, talk, publication, or result as its source?",responseFormat:"single choice",anchors:frequency,contextFields:["source evidence"]},
    { id:"T1",construct:"portfolio thematic coherence",prompt:"How clearly can you identify one or more through-lines connecting the work in your portfolio?",responseFormat:"single choice",anchors:maturity,contextFields:["plural/interdisciplinary option"]},
    { id:"T2",construct:"portfolio compounding",prompt:"How consistently did one project create a reusable resource—skill, evidence, audience, capital, access, or method—for a later project?",responseFormat:"single choice",anchors:frequency,contextFields:["resource type"]},
    { id:"T3",construct:"external legibility",prompt:"How accurately can intended audiences describe the through-lines and evidence in your portfolio after reviewing it?",responseFormat:"single choice",anchors:maturity,contextFields:["audience feedback source"]},
    { id:"T4",construct:"future direction",prompt:"How consistently did current projects produce observable progress toward your stated next direction?",responseFormat:"single choice",anchors:maturity,contextFields:["direction type","progress evidence"]},
  ],
};

export const INSTRUMENT_RECONCILIATION = {
  programmeQuestion:
    "How do people convert individual capability into durable, portable, ownable institutional power?",
  ownership: {
    activePilotVersion: "0.2.0",
    candidateVersion: OWNERSHIP_INDEX_0_3_0_CANDIDATE.version,
    primaryUnit: "a person-operated business or creator enterprise",
    primaryQuestion:
      "How much control does the respondent retain over the audiences, rights, income channels, identity assets, and operating infrastructure through which value is created and captured?",
    domains: [
      "audience and first-party data control",
      "content, licensing, and reusable-rights control",
      "income ownership, recurrence, and concentration",
      "name, likeness, voice, and synthetic-use control",
      "business separation, contracting, transferability, and continuity",
    ],
    excludes: [
      "general talent or professional competence",
      "portfolio coherence by itself",
      "organizational recognition by itself",
      "clinical, legal, financial, or employment evaluation",
    ],
  },
  portfolioProfessional: {
    activePilotVersion: "0.1.0",
    candidateVersion: PORTFOLIO_PROFESSIONAL_0_2_0_CANDIDATE.version,
    primaryUnit: "a professional's capability across roles, organizations, and projects",
    primaryQuestion:
      "How far has the respondent converted capability into portable evidence, reusable systems, organizational adoption, negotiated mandate, recognized authority, and a compounding direction?",
    domains: [
      "capability development, artifacts, legibility, and portability",
      "adoption, transferability, continuity, and traceable value",
      "role shaping, autonomy, innovation latitude, and receptivity",
      "referral, recognition, professional audience access, and opportunity",
      "portfolio coherence, compounding, legibility, and future direction",
    ],
    excludes: [
      "ownership of business assets or intellectual property unless an item asks directly",
      "enterprise financial performance",
      "employee value, promotability, or job performance",
      "clinical, legal, financial, or employment evaluation",
    ],
  },
  overlapRules: [
    {
      topic: "portability",
      ownershipMeaning: "whether controlled audiences, rights, revenue channels, identity assets, and operations survive a platform, client, or key-person dependency",
      portfolioMeaning: "whether capability and credible evidence can travel to and operate in another role or setting",
    },
    {
      topic: "continuity",
      ownershipMeaning: "whether the business can meet planned obligations without the respondent's routine labor",
      portfolioMeaning: "whether a documented capability continues to produce acceptable results through others",
    },
    {
      topic: "audience and authority",
      ownershipMeaning: "exportable direct audience access and first-party data governance",
      portfolioMeaning: "professional recognition, referral, direct relationships, and reputation-linked opportunity",
    },
    {
      topic: "institutionalization",
      ownershipMeaning: "formal control and continuity of the value-capture system",
      portfolioMeaning: "conversion of individual know-how into reusable, adopted, legible practice",
    },
  ],
  reportingRules: [
    "Report the two instruments separately; do not combine their totals into a single score.",
    "Do not interpret equal numeric totals as equivalent construct levels across instruments.",
    "Do not infer ownership from Portfolio Professional results or capability from Ownership Index results.",
    "Active pilot results are exploratory and provisionally scored; candidate-item responses are unscored and cannot be merged with active-pilot scores.",
    "A future combined Institutions of One measure requires a separately preregistered model and validation study.",
  ],
} as const;

export const CANDIDATE_ACTIVATION_GATES = [
  "Complete two cognitive-interview rounds per instrument with revisions logged between rounds.",
  "Include participants across career stage, jurisdiction, business model, disability/care context, and platform dependence relevant to intended use.",
  "Resolve comprehension, retrieval, judgment, response-mapping, sensitivity, and accessibility failures.",
  "Pre-register scoring, missing-data, not-applicable, fairness, and validation analyses.",
  "Run a separate pilot; examine item distributions, redundancy, dimensionality, reliability, and differential item functioning where sample size permits.",
  "Approve a dated methodology record and explicit migration/crosswalk before any production activation.",
] as const;
