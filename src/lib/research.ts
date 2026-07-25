// The Ownership Index research battery (v0.2.0). Companion to instrument.ts.
// These modules DO NOT feed the score. They are anonymous research data:
// segmentation, the human-capacity study, and criterion (outcome) variables.
// Versioned alongside the methodology so waves can widen without touching the score.

export const RESEARCH_VERSION = "0.2.0";

export type ResearchType = "single" | "multi" | "likert" | "open";
export interface ResearchItem {
  id: string;
  q: string;
  type: ResearchType;
  options?: string[];   // for single / multi
  tag?: "data" | "outcome" | "qual";
}
export interface ResearchModule { key: string; name: string; lens: string; items: ResearchItem[]; }

const LIKERT = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

export const RESEARCH_MODULES: ResearchModule[] = [
  { key: "profile", name: "About you", lens: "Segmentation spine", items: [
    { id: "P1", q: "Primary platform", type: "single", options: ["YouTube","TikTok","Instagram","X","LinkedIn","Twitch","Newsletter/Substack","Podcast","Other"] },
    { id: "P3", q: "Content vertical", type: "single", options: ["Beauty/Fashion","Fitness/Health","Finance","Tech","Gaming","Education","Business/B2B","Food","Travel","Entertainment/Comedy","Music","Lifestyle","News/Commentary","Art/Design","Other"] },
    { id: "P4", q: "Audience size", type: "single", options: ["Under 1k","1–10k","10–50k","50–250k","250k–1M","1M–5M","5M+"] },
    { id: "P5", q: "Years active", type: "single", options: ["Under 1","1–2","3–5","6–10","10+"] },
    { id: "P6", q: "Monthly income from creating", type: "single", options: ["None","Under 500","500–2k","2k–5k","5k–10k","10k–25k","25k–100k","100k+"] },
    { id: "P7", q: "Is creating your…", type: "single", options: ["Full-time work","Primary income","Side income","Monetising hobby"] },
    { id: "P8", q: "Team size", type: "single", options: ["Just me","Me + freelancers","2–5","6–20","20+"] },
    { id: "P9", q: "Region", type: "single", options: ["North America","UK/Ireland","Europe (other)","LATAM","MENA","Sub-Saharan Africa","South Asia","East/SE Asia","Oceania"] },
    { id: "P10", q: "Age band", type: "single", options: ["18–24","25–34","35–44","45–54","55+"] },
    { id: "P12", q: "Representation", type: "single", options: ["Independent","Manager/agent","Agency/MCN","Network"] },
  ]},
  { key: "wellbeing", name: "How it feels to carry it", lens: "Psychology · the human half", items: [
    // Attention check: a correct response is "Disagree" (index 1). Used only to
    // screen inattentive/straight-lined records out of the research dataset; it is
    // never scored and never shown as a result. Straight-lining (zero variance
    // across this block) is flagged at analysis time.
    { id: "ATTN1", q: "Attention check — to help us keep the data clean, please select “Disagree” for this item.", type: "likert", options: LIKERT, tag: "outcome" },
    { id: "G1", q: "I feel in control of what I create and how.", type: "likert", options: LIKERT },
    { id: "G2", q: "I feel skilled and effective at what I do.", type: "likert", options: LIKERT },
    { id: "G3", q: "I feel genuinely connected to my audience.", type: "likert", options: LIKERT },
    { id: "G4", q: "I feel emotionally exhausted by creating.", type: "likert", options: LIKERT },
    { id: "G5", q: "I feel I have to always be on and available.", type: "likert", options: LIKERT },
    { id: "G6", q: "My sense of self is hard to separate from my content or brand.", type: "likert", options: LIKERT },
    { id: "G7", q: "I worry constantly about the algorithm and staying relevant.", type: "likert", options: LIKERT },
    { id: "G8", q: "Creating has harmed my mental health in the past year.", type: "likert", options: LIKERT, tag: "outcome" },
    { id: "G11", q: "The financial uncertainty causes me significant stress.", type: "likert", options: LIKERT },
    { id: "G12", q: "I find real meaning and purpose in this work.", type: "likert", options: LIKERT },
    { id: "G13", q: "At my current pace, I can sustain this for years.", type: "single", options: ["Not a chance","Doubtful","Maybe","Probably","Definitely"], tag: "outcome" },
    { id: "G14", q: "Average hours a week on the business", type: "single", options: ["Under 10","10–20","20–40","40–60","60+"] },
    { id: "G15", q: "If nothing changed, in three years I will be…", type: "single", options: ["Having quit","Doing something else","Doing this smaller","Doing this the same","Doing this bigger"], tag: "outcome" },
  ]},
  { key: "rights", name: "Rights & legal", lens: "IP attorney", items: [
    { id: "C1", q: "Who drafts the contracts you sign?", type: "single", options: ["Brand's lawyers, I sign as-is","Brand's, I redline","A template I found","My own or my lawyer's","Depends"] },
    { id: "C3", q: "Content reused by a brand beyond what you were paid for?", type: "single", options: ["Never","Once","A few times","Often","I don't track it"], tag: "outcome" },
    { id: "C4", q: "Paid a usage/whitelisting fee in the last 12 months?", type: "single", options: ["No","Once","Several","It's standard"] },
    { id: "C7", q: "Trademark status of your name/brand", type: "single", options: ["None","Considered","Applied","Registered (1 class)","Registered (multiple)"] },
    { id: "C8", q: "Dispute over unpaid invoices or misused content?", type: "single", options: ["Never","Once","A few","Ongoing"], tag: "outcome" },
    { id: "C10", q: "Awareness of right of publicity / NO FAKES Act", type: "single", options: ["Never heard of it","Heard of it","Understand it","Actively protecting"] },
  ]},
  { key: "revenue", name: "Business model", lens: "Business strategist", items: [
    { id: "D3", q: "Do you have a rate card / standard pricing?", type: "single", options: ["No, I guess each time","Rough idea","Yes","Yes and I hold to it"] },
    { id: "D4", q: "Pricing confidence", type: "single", options: ["I undercharge","About right","I charge a premium"] },
    { id: "D5", q: "Months you could sustain with zero new income", type: "single", options: ["0","Under 1","1–3","3–6","6–12","12+"], tag: "outcome" },
    { id: "D6", q: "Income trajectory last 12 months", type: "single", options: ["Fell sharply","Fell","Flat","Grew","Grew sharply"], tag: "outcome" },
    { id: "D8", q: "Separate business bank account?", type: "single", options: ["No","Yes"] },
  ]},
  { key: "audience", name: "Audience & distribution", lens: "Creator mastermind", items: [
    { id: "E1", q: "Email list size", type: "single", options: ["None","Under 500","500–2k","2k–10k","10k–50k","50k+"] },
    { id: "E2", q: "Owned community (Discord/app/membership)", type: "single", options: ["None","Free only","Paid","Both"] },
    { id: "E6", q: "Discovery dependence", type: "single", options: ["I live and die by the algorithm","Mixed","My audience seeks me out"] },
    { id: "E8", q: "Ever lost significant reach to an algorithm change?", type: "single", options: ["No","Once","Repeatedly"], tag: "outcome" },
  ]},
  { key: "brand", name: "Brand & positioning", lens: "Brand strategist", items: [
    { id: "F1", q: "Niche clarity", type: "single", options: ["A bit of everything","Loosely themed","Clear niche","Known for one thing"] },
    { id: "F3", q: "Faceless or personal", type: "single", options: ["Faceless/brand-led","Mixed","Personal brand (I am the asset)"] },
    { id: "F4", q: "Brand assets you own", type: "multi", options: ["Logo/wordmark","Distinct visual style","Catchphrase/format","Trademark","Domain","Original IP/characters","None"] },
    { id: "F7", q: "If you disappeared, would your format outlive you?", type: "single", options: ["No","Maybe","Yes"] },
  ]},
  { key: "ai", name: "AI & the frontier", lens: "The future", items: [
    { id: "H1", q: "AI tools in your workflow", type: "single", options: ["None","Ideation","Editing/production","Full pieces","Core to everything"] },
    { id: "H2", q: "Been impersonated or deepfaked?", type: "single", options: ["No","Suspect so","Yes, once","Yes, repeatedly"], tag: "outcome" },
    { id: "H3", q: "Voice or likeness cloned without consent?", type: "single", options: ["No","Not sure","Yes"], tag: "outcome" },
    { id: "H5", q: "Would you license your likeness/voice to an AI model on the right terms?", type: "single", options: ["Never","Unsure","Yes, with control","Already have"] },
  ]},
  { key: "outcomes", name: "Trajectory", lens: "Criterion variables", items: [
    { id: "I1", q: "Platform strikes/bans/demonetisation in last 2 years", type: "single", options: ["None","One","Several","Lost an account"], tag: "outcome" },
    { id: "I2", q: "Biggest income shock and recovery in last 2 years", type: "single", options: ["None","Shock, recovered fast","Shock, slow recovery","Shock, never recovered"], tag: "outcome" },
    { id: "I3", q: "Would you start this career again?", type: "single", options: ["No","Unsure","Yes"], tag: "outcome" },
    { id: "I4", q: "Primary goal now", type: "single", options: ["Grow reach","Grow income","Diversify/own more","Sustain/protect","Exit/sell","Wind down"] },
    { id: "I5", q: "Open to selling or being acquired?", type: "single", options: ["No","Curious","Actively exploring","Have had offers"] },
  ]},
  { key: "qual", name: "In your words", lens: "Qualitative", items: [
    { id: "J1", q: "In one line, what does owning your creator business mean to you?", type: "open", tag: "qual" },
    { id: "J2", q: "What is the single biggest threat to your livelihood right now?", type: "open", tag: "qual" },
  ]},
];

// Every respondent answers the full battery, matched to their Index score in one
// record. Ordered so the lighter profile leads and the reflective ones follow.
export const APP_RESEARCH_MODULE_KEYS = RESEARCH_MODULES.map((m) => m.key);

// Adaptive skip: hide research items that a creator's scored answers make moot,
// so "ask everything" never means "ask everyone every question". Extensible —
// add rules keyed off the scored responses (A1..B4). Scored items are never skipped.
export function isResearchItemHidden(itemId: string, core: Record<string, number>): boolean {
  // No owned audience at all → email-list size and owned-community detail are moot.
  if ((itemId === "E1" || itemId === "E2") && core["A1"] === 0) return true;
  // No brand deals implied (assigns all rights AND never charges usage) → skip whitelisting nuance.
  if (itemId === "C4" && core["R1"] === 0 && core["R4"] === 0) return true;
  // Solo with no recurring revenue → skip the "acquired/exit offers" question as premature.
  if (itemId === "I5" && core["B3"] === 0 && core["V3"] === 0) return true;
  return false;
}
