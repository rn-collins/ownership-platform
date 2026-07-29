// The Portfolio Professional — instrument v0.1.
// An exploratory instrument for examining how expertise becomes visible,
// reusable, adopted, authoritative, and portable across roles.
// Self-contained data (no imports) so it's inert until wired into a generalized
// engine at /assess/professional. Mirrors the shape of instrument.ts.

export const PROFESSIONAL_METHODOLOGY_VERSION = "0.1.0";

export type PDimensionKey = "capability" | "value" | "mandate" | "authority" | "thesis";

export const PROFESSIONAL_DIMENSIONS: { key: PDimensionKey; name: string }[] = [
  { key: "capability", name: "Capability Ownership" },
  { key: "value", name: "Institutional Value" },
  { key: "mandate", name: "Mandate & Autonomy" },
  { key: "authority", name: "Visibility & Authority" },
  { key: "thesis", name: "Coherent Thesis" },
];

export const PROFESSIONAL_ITEM_IDS: Record<PDimensionKey, string[]> = {
  capability: ["C1", "C2", "C3", "C4"],
  value: ["V1", "V2", "V3", "V4"],
  mandate: ["M1", "M2", "M3", "M4"],
  authority: ["A1", "A2", "A3", "A4"],
  thesis: ["T1", "T2", "T3", "T4"],
};

export interface PItem { id: string; q: string; options: string[]; } // options[0..5]
export interface PDimension { key: PDimensionKey; name: string; items: PItem[]; }

export const PROFESSIONAL_INSTRUMENT: PDimension[] = [
  { key: "capability", name: "Capability Ownership", items: [
    { id: "C1", q: "How much do you build beyond your assigned responsibilities?", options: [
      "Exactly my job description, nothing more",
      "A little extra when asked",
      "Some initiative beyond my remit",
      "Regular work well past my role",
      "A body of methods and work far beyond it",
      "My job is a floor; most of what I build is beyond it",
    ]},
    { id: "C2", q: "Do you create artifacts others reuse (frameworks, tools, playbooks, writing)?", options: [
      "None",
      "One or two informal things",
      "A few others occasionally use",
      "Several in regular use",
      "A set the team relies on",
      "A library others use daily",
    ]},
    { id: "C3", q: "Is any of your expertise visible outside your team or company?", options: [
      "Nothing public",
      "Internal only, informally known",
      "Known across my company",
      "Some external visibility",
      "A recognized external presence",
      "A recognized public body of work",
    ]},
    { id: "C4", q: "If you left, how much of what you built goes with you as your own capability?", options: [
      "Nothing is mine",
      "Very little",
      "Some, loosely",
      "A meaningful, portable chunk",
      "Most of it is a practice I own",
      "A portable practice I could take anywhere",
    ]},
  ]},
  { key: "value", name: "Institutional Value", items: [
    { id: "V1", q: "Do teammates adopt your artifacts or methods?", options: [
      "No one",
      "One or two people",
      "A handful",
      "Much of the team",
      "Standard practice on the team",
      "Standard practice beyond my team too",
    ]},
    { id: "V2", q: "Can others run your capability independently after a handoff?", options: [
      "Only I can do it",
      "Barely, with heavy help",
      "Somewhat, with support",
      "One or two people can",
      "Several run it independently",
      "It runs org-wide without me",
    ]},
    { id: "V3", q: "If you stopped for a month, what happens to what you built?", options: [
      "It collapses",
      "It stalls badly",
      "It limps along",
      "It holds for a while",
      "It runs largely without me",
      "It runs indefinitely; I built it to outlast me",
    ]},
    { id: "V4", q: "Can you point to organizational value that is traceable to what you built?", options: [
      "None I can name",
      "Anecdotal only",
      "Some, loosely attributed",
      "Clear qualitative impact",
      "Measured impact I can show",
      "Measured value, attributed and repeatable",
    ]},
  ]},
  { key: "mandate", name: "Mandate & Autonomy", items: [
    { id: "M1", q: "How was your current role defined?", options: [
      "A fixed job I applied to",
      "A standard role, lightly tailored",
      "A role I shaped somewhat",
      "A role substantially shaped around me",
      "A role largely written around me",
      "A role created because of me",
    ]},
    { id: "M2", q: "How much do you shape what you work on?", options: [
      "Fully assigned",
      "Mostly assigned",
      "A mix",
      "Mostly self-directed",
      "I set most of my mandate",
      "I set my own mandate",
    ]},
    { id: "M3", q: "How much room do you have to build something new, not just deliver what's assigned?", options: [
      "None — delivery only",
      "Rare slack to build",
      "Some room",
      "Real room, if I push",
      "Genuine room to build",
      "Building is an expected part of my role",
    ]},
    { id: "M4", q: "If you proposed a new function or role, how likely is it created?", options: [
      "Not a chance",
      "Unlikely",
      "Maybe",
      "Probably",
      "Very likely",
      "It already happens",
    ]},
  ]},
  { key: "authority", name: "Visibility & Authority", items: [
    { id: "A1", q: "Are you the person others are sent to for your domain?", options: [
      "No",
      "Occasionally",
      "Within my team",
      "Across my company",
      "In my industry, somewhat",
      "The recognized authority",
    ]},
    { id: "A2", q: "Recognition beyond your company (awards, speaking, press, peer recognition)?", options: [
      "None",
      "A little, once",
      "Occasional",
      "A growing profile",
      "A sustained external profile",
      "A prominent external profile",
    ]},
    { id: "A3", q: "Do you have a direct professional audience (followers, list, community)?", options: [
      "None",
      "A small network",
      "A modest following",
      "A real audience",
      "A large audience I can reach",
      "A large owned audience I reach directly",
    ]},
    { id: "A4", q: "Has your reputation opened doors, roles, or deals?", options: [
      "Never",
      "Once",
      "A few times",
      "Regularly",
      "Reliably",
      "It's my primary source of opportunity",
    ]},
  ]},
  { key: "thesis", name: "Coherent Thesis", items: [
    { id: "T1", q: "Do your projects connect under one clear thesis?", options: [
      "Unrelated",
      "Loosely themed",
      "A rough throughline",
      "A clear throughline",
      "One coherent thesis connects them",
      "One thesis, and everyone can see it",
    ]},
    { id: "T2", q: "Does each project make the next stronger?", options: [
      "Each starts from zero",
      "Little carryover",
      "Some compounding",
      "Clear compounding",
      "They build into a body of work",
      "A compounding body of work others draw on",
    ]},
    { id: "T3", q: "Could someone describe what you do in one sentence that captures your range?", options: [
      "No",
      "Only in pieces",
      "Roughly",
      "Yes, decently",
      "Yes, clearly",
      "Yes, and it's memorable",
    ]},
    { id: "T4", q: "Are you building toward something (a venture, an institution, a category)?", options: [
      "No",
      "A vague someday",
      "An idea forming",
      "A plan taking shape",
      "Clearly, and it's underway",
      "Clearly, and it's already real",
    ]},
  ]},
];

export const PROFESSIONAL_OVERALL: { min: number; key: string; label: string; copy: string }[] = [
  { min: 80, key: "institution", label: "Highly portable pattern", copy: "Your responses indicate visible, reusable capability with substantial reach beyond one role. Public evidence and institutional context may complicate that picture." },
  { min: 55, key: "emerging", label: "Developing portability", copy: "Your responses indicate capability that is becoming visible and reusable, while some dimensions remain tied to the current setting." },
  { min: 30, key: "specialist", label: "Role-centered pattern", copy: "Your responses indicate meaningful capability whose adoption or portability remains concentrated in the current role." },
  { min: 0, key: "slotted", label: "Institution-dependent pattern", copy: "Your responses indicate that capability, mandate, or visibility currently depends heavily on the surrounding institution." },
];

export const PROFESSIONAL_DIMENSION_WHY: Record<PDimensionKey, string> = {
  capability: "Capability you can demonstrate and reuse may remain available when a role or employer changes.",
  value: "Institutional value asks whether other people use what you built and whether it can continue after a handoff.",
  mandate: "Mandate and autonomy describe how much room you have to shape priorities, decisions, and new work.",
  authority: "Visibility and authority describe where your expertise is recognized and whether that recognition creates opportunities beyond one role.",
  thesis: "A coherent thesis helps other people understand how your projects connect and what the body of work is building toward.",
};

export const PROFESSIONAL_ITEM_ACTIONS: Record<string, string> = {
  C1: "Carve out explicit time to build beyond your remit, and name it as your own initiative.",
  C2: "Turn one thing you do well into a reusable artifact others can pick up.",
  C3: "Make one piece of your expertise visible outside your team this quarter.",
  C4: "Document your method so it is a portable practice, not tribal knowledge trapped in the org.",
  V1: "Get one artifact adopted by a teammate; adoption is the first rung of durable value.",
  V2: "Hand off one capability so someone can run it without you.",
  V3: "Design one thing you own to survive a month of your absence.",
  V4: "Pre-define how your work maps to a business outcome before you claim the outcome.",
  M1: "Propose a scoped remit shaped around your strengths, in writing.",
  M2: "Claim direction over one workstream instead of waiting for assignment.",
  M3: "Negotiate for build time and tools, not just delivery targets.",
  M4: "Pitch one new function; even a no maps your leverage.",
  A1: "Become the go-to for one specific problem, publicly.",
  A2: "Say yes to one external talk, panel, or byline this cycle.",
  A3: "Start an owned channel (list, newsletter, or community) you control directly.",
  A4: "Make your work legible enough that your reputation can do the introducing.",
  T1: "Write the one-sentence thesis that connects your projects.",
  T2: "Choose your next project so it compounds the last, not restarts.",
  T3: "Sharpen your one-line description until people repeat it back.",
  T4: "Name the venture or institution you are building toward, and take the first concrete step.",
};
