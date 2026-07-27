export type CaseResearchSource = {
  id: string;
  label: string;
  href: string;
  publisher: string;
  published: string;
  kind: "independent" | "primary" | "institutional";
};

export type CaseResearchRecord = {
  reviewed: string;
  chronology: { date: string; event: string; sourceIds: string[] }[];
  interpretation: string;
  complication: string[];
  unknowns: string[];
  payoff: string;
  sources: CaseResearchSource[];
};

export const CASE_RESEARCH: Record<string, CaseResearchRecord> = {
  "josephus-allmond": {
    reviewed: "2026-07-27",
    chronology: [
      { date: "Before March 2026", event: "Allmond worked as a Southern Environmental Law Center staff attorney, litigating utility-regulation matters before Virginia’s State Corporation Commission. He also served on the Commission on Electric Utility Regulation.", sourceIds: ["va-bio", "whro-profile"] },
      { date: "March 25, 2026", event: "Governor Abigail Spanberger created a cabinet-level Chief Energy Officer position by executive order and appointed Allmond as its first holder.", sourceIds: ["executive-announcement", "mercury"] },
      { date: "June 17, 2026", event: "Independent reporting described the new office’s practical test: coordinating energy policy amid rising consumer costs, data-center demand, grid constraints, and clean-energy goals.", sourceIds: ["whro-profile"] },
    ],
    interpretation: "This is not a story of a person privately owning an institution. It is a test of whether specialized legal and regulatory knowledge can become durable public coordinating capacity through a newly created office.",
    complication: [
      "The office’s cabinet status supplies formal access, but an executive-created role may remain more vulnerable to a later administration than a statutory agency.",
      "Allmond’s prior litigation experience is evidence of subject-matter expertise; it does not yet establish the new office’s budget, staff capacity, decision rights, or outcomes.",
      "Early coverage describes the mandate more clearly than the office’s completed work because the position is new.",
    ],
    unknowns: [
      "What staff, budget, and binding authorities belong to the office?",
      "Which decisions can the Chief Energy Officer make rather than recommend or coordinate?",
      "What mechanisms would preserve the capacity after this governor or officeholder leaves?",
    ],
    payoff: "Allmond’s case teaches that public authority can be consequential without being owned. The durability question is whether a new mandate becomes routines, resources, and legal structure that survive the person who first carries it.",
    sources: [
      { id: "executive-announcement", label: "Governor creates the office and announces the appointment", href: "https://www.governor.virginia.gov/newsroom/news-releases/2026/march-releases/name-1114943-en.html", publisher: "Commonwealth of Virginia", published: "2026-03-25", kind: "primary" },
      { id: "va-bio", label: "Official biography and prior utility-regulation work", href: "https://www.governor.virginia.gov/cabinet/name-1114976-en.html", publisher: "Commonwealth of Virginia", published: "2026", kind: "institutional" },
      { id: "mercury", label: "Independent report on the office’s creation", href: "https://virginiamercury.com/briefs/spanberger-creates-new-cabinet-position-appoints-selcs-josephus-allmond-chief-energy-officer/", publisher: "Virginia Mercury", published: "2026-03-25", kind: "independent" },
      { id: "whro-profile", label: "Independent profile of the office’s energy-policy challenge", href: "https://www.whro.org/virginia-center-for-investigative-journalism/2026-06-17/vcij-josephus-allmond", publisher: "WHRO / Virginia Center for Investigative Journalism", published: "2026-06-17", kind: "independent" },
    ],
  },
  "kunal-shah": {
    reviewed: "2026-07-27",
    chronology: [
      { date: "2010–2015", event: "Shah co-founded FreeCharge and sold it to Snapdeal, establishing a record in Indian consumer payments.", sourceIds: ["reuters-analysis"] },
      { date: "2018", event: "He founded CRED, a members-focused financial platform that expanded across payments, credit, insurance, and wealth services.", sourceIds: ["reuters-deal"] },
      { date: "June 22, 2026", event: "Meta announced that Shah would step down from CRED’s executive leadership to lead WhatsApp globally as Meta invested $900 million for a minority stake in CRED.", sourceIds: ["reuters-deal", "verge"] },
      { date: "June 25, 2026", event: "Reuters analysis connected the appointment to WhatsApp’s payments and commerce ambitions, particularly in India and other major markets.", sourceIds: ["reuters-analysis"] },
    ],
    interpretation: "Shah’s move is unusually useful because it does not cleanly separate founder ownership from employed authority: he leaves executive control of CRED while retaining an economic relationship to the company and enters a vast platform he does not own.",
    complication: [
      "Founder experience may travel, but WhatsApp’s users, infrastructure, data governance, and strategic constraints belong to Meta.",
      "Meta’s investment in CRED creates a continuing institutional relationship, so the move is not a simple founder-to-employee transition.",
      "Public announcements establish appointment and deal terms, not Shah’s practical decision rights inside Meta.",
    ],
    unknowns: [
      "How will conflicts between CRED’s interests and WhatsApp’s product strategy be governed?",
      "Which decisions over payments, commerce, privacy, and monetization will sit with Shah?",
      "What continuing governance rights or obligations accompany Shah’s retained CRED stake?",
    ],
    payoff: "Shah’s case teaches that portability is not binary. A founder can carry judgment and equity into a larger institution while surrendering control over the platform where that judgment will next be exercised.",
    sources: [
      { id: "reuters-deal", label: "Meta investment in CRED and Shah’s move to WhatsApp", href: "https://www.reuters.com/world/india/indian-fintech-firm-cred-raise-900-million-meta-45-billion-valuation-2026-06-22/", publisher: "Reuters", published: "2026-06-22", kind: "independent" },
      { id: "reuters-analysis", label: "Analysis of Shah’s payments background and WhatsApp mandate", href: "https://www.reuters.com/business/whatsapps-pick-indian-fintech-founder-signals-scale-payment-ambitions-2026-06-25/", publisher: "Reuters", published: "2026-06-25", kind: "independent" },
      { id: "verge", label: "Independent account of the WhatsApp leadership transition", href: "https://www.theverge.com/tech/953464/whatsapp-will-cathcart-stepping-down-cred", publisher: "The Verge", published: "2026-06-22", kind: "independent" },
    ],
  },
};

export function getCaseResearch(slug: string) {
  return CASE_RESEARCH[slug];
}
