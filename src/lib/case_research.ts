import { CASE_NARRATIVES } from "@/lib/case_narratives";

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

const CASE_MILESTONES: Record<string, { date: string; event: string }> = {
  "suzie-reider": { date: "2006–2024", event: "Reider moved from CNET into a 17-year Google career spanning YouTube and Waze, then joined Lyft to lead Lyft Media and Lyft Business." },
  "kenny-gold": { date: "June 2, 2026", event: "Edelman appointed Gold its first global chief creator officer after he built Deloitte Digital’s social-and-creator practice." },
  "steven-bartlett": { date: "2014–2025", event: "Bartlett’s public career moved from Social Chain into The Diary of a CEO, books, investment vehicles, and a wider media-and-venture system." },
  "ashley-rudder": { date: "2000s–2024", event: "Rudder advanced from makeup artistry through two decades at M·A·C, then creator leadership at Whalar and Deutsch New York." },
  "gordon-glenister": { date: "2010s–2020s", event: "Glenister moved from trade-association leadership into influencer-marketing field building, consulting, publishing, and convening." },
  "claire-zau": { date: "2026", event: "Lightspeed recruited Zau into a dual seed-investing and new-media role after she built an independent technology audience." },
  "brad-keywell": { date: "2000s–2020s", event: "Keywell co-founded technology companies, built Lightbank and Chicago Ideas, taught entrepreneurship, and developed a public art practice." },
  "klitos-teklos": { date: "2010s–2020s", event: "Teklos organized fashion and luxury creative-direction work through an independent studio and embedded brand residencies." },
  "charlotte-tansill": { date: "2026", event: "Publicis Creative US placed social, creator, and earned media under Tansill’s leadership after agency strategy roles." },
  "mo-gawdat": { date: "2007–2020s", event: "Gawdat moved from Google and Google X leadership into books, podcasting, speaking, happiness advocacy, and public AI commentary." },
  "peter-diamandis": { date: "1990s–2020s", event: "Diamandis repeatedly organized prizes, space ventures, education, and future-oriented entrepreneurship through entities including XPRIZE." },
  "noubar-afeyan": { date: "2000–2020s", event: "Afeyan developed Flagship Pioneering’s venture-creation model, which formed companies including Moderna." },
  "nadir-godrej": { date: "1977–2026", event: "Godrej combined nearly five decades in the family-controlled Godrej group with a public practice in poetry, science, and speaking." },
  "mrbeast": { date: "2012–2026", event: "Jimmy Donaldson expanded YouTube production into consumer products, philanthropy, licensing, and Amazon’s Beast Games." },
  "emma-chamberlain": { date: "2017–2025", event: "Chamberlain expanded from YouTube into podcasting, fashion partnerships, packaged coffee, retail distribution, and a physical café." },
  "huda-kattan": { date: "2010–2020s", event: "Kattan moved from beauty blogging and makeup artistry into a global product company built with family members." },
  "marques-brownlee": { date: "2008–2020s", event: "Brownlee grew a student technology-review channel into a staffed media operation spanning video, podcasts, merchandise, and collaborations." },
  "pieter-levels": { date: "2014–2020s", event: "Levels publicly built and operated internet products including Nomad List and Remote OK through a deliberately small independent model." },
  "jack-conte": { date: "2013", event: "Conte and Sam Yam founded Patreon after Conte’s experience trying to finance music through online audiences." },
  "colin-samir": { date: "2011–2024", event: "Colin Rosenblum and Samir Chaudry built and sold a lacrosse channel, then created a creator-economy publication, show, podcast, and course business." },
  "alex-cooper": { date: "2018–2024", event: "Cooper carried Call Her Daddy from Barstool to Spotify and SiriusXM while building the Unwell network." },
  "codie-sanchez": { date: "2020–2026", event: "Sanchez turned a small-business acquisition thesis into Contrarian Thinking’s media, education, community, and investment ecosystem." },
  "gary-vaynerchuk": { date: "2006–2020s", event: "Vaynerchuk used online video to expand a family wine business, then built agencies, media, investing, conferences, books, and IP ventures." },
  "alexandr-wang": { date: "2016–2026", event: "Wang co-founded Scale AI and later entered Meta’s AI leadership structure alongside a major Meta investment in Scale." },
  "mustafa-suleyman": { date: "2010–2024", event: "Suleyman moved from co-founding DeepMind through Google, Inflection AI, and leadership of Microsoft’s newly organized consumer-AI division." },
  "cathy-hackl": { date: "2010s–2020s", event: "Hackl built a portfolio across immersive technology, spatial computing, gaming, consulting, writing, and executive roles." },
  "jane-gilbert": { date: "2021", event: "Miami-Dade appointed Gilbert its first chief heat officer, giving extreme-heat coordination a named office and cross-sector mandate." },
  "darren-murph": { date: "2019–2023", event: "GitLab formalized Murph’s remote-work expertise as Head of Remote and distributed it through a public operating handbook." },
  "linda-fisher": { date: "2004", event: "DuPont appointed Fisher its first chief sustainability officer after senior environmental-law and EPA roles." },
  "jony-ive": { date: "1992–2019", event: "Ive’s Apple design career culminated in the formation of independent studio LoveFrom, with Apple announced as a client." },
  "astro-teller": { date: "2010–2020s", event: "Teller led Alphabet’s X moonshot factory under the title Captain of Moonshots, institutionalizing staged experimentation and project graduation." },
  "marc-lore": { date: "2016–2021", event: "Walmart acquired Jet.com and placed founder Marc Lore over U.S. e-commerce before he returned to independent ventures." },
  "shonda-rhimes": { date: "2005–2021", event: "Rhimes built Shondaland around television authorship, then moved its primary development relationship from ABC to Netflix." },
  "simon-cook": { date: "2000s–2020s", event: "Cook advanced through Cannes Lions awards and operations leadership to become CEO of LIONS." },
  "marc-pritchard": { date: "1982–2020s", event: "Pritchard’s long P&G career culminated in chief brand leadership and public interventions in advertising standards, media quality, and representation." },
  "reid-hoffman": { date: "2003–2020s", event: "Hoffman co-founded LinkedIn, then used the resulting capital and network across venture investing, publishing, podcasting, and political activity." },
  "fei-fei-li": { date: "2009–2024", event: "Li’s work moved through ImageNet, Stanford, Google Cloud AI, Stanford HAI, public policy, and co-founding World Labs." },
  "neri-oxman": { date: "2010–2020s", event: "Oxman developed material ecology at MIT and later moved the authored research identity into the private company OXMAN." },
  "brian-may": { date: "1970s–2007", event: "May paused doctoral astrophysics as Queen became successful, then returned decades later and completed the PhD." },
};

function narrativeResearch(slug: string): CaseResearchRecord | undefined {
  const narrative = CASE_NARRATIVES[slug];
  const milestone = CASE_MILESTONES[slug];
  if (!narrative || !milestone) return undefined;
  const sources = narrative.sources.map((source, index) => ({
    id: "source-" + (index + 1),
    label: source.label,
    href: source.href,
    publisher: source.label.split(":")[0],
    published: "See linked record",
    kind: source.independent ? "independent" as const : "institutional" as const,
  }));
  const sourceIds = sources.map((source) => source.id);
  return {
    reviewed: "2026-07-27",
    chronology: [
      { ...milestone, sourceIds },
      { date: "Structural turn", event: narrative.structuralTurn, sourceIds },
    ],
    interpretation: narrative.whyItMatters,
    complication: [
      "The linked public record documents visible roles and announcements; it does not by itself establish private equity, contracts, decision rights, compensation, audience ownership, or causal impact.",
      "Career outcomes belong partly to teams, employers, partners, platforms, capital providers, and inherited institutional infrastructure; the record does not permit sole-credit attribution.",
      ...narrative.unresolved.slice(0, 1).map((item) => "Open complication: " + item),
    ],
    unknowns: narrative.unresolved,
    payoff: narrative.whyItMatters,
    sources,
  };
}

export function getCaseResearch(slug: string) {
  return CASE_RESEARCH[slug] ?? narrativeResearch(slug);
}
