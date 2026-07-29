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
  documentationLevel: "saturated" | "provisional";
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
    documentationLevel: "saturated",
    reviewed: "2026-07-27",
    chronology: [
      { date: "Before March 2026", event: "Allmond worked as a Southern Environmental Law Center staff attorney, litigating utility-regulation matters before Virginia’s State Corporation Commission. He also served on the Commission on Electric Utility Regulation.", sourceIds: ["va-bio", "whro-profile"] },
      { date: "March 25, 2026", event: "Governor Abigail Spanberger created a cabinet-level Chief Energy Officer position by executive order and appointed Allmond as its first holder.", sourceIds: ["executive-announcement", "mercury"] },
      { date: "June 17, 2026", event: "Independent reporting described the new office’s practical test: coordinating energy policy amid rising consumer costs, data-center demand, grid constraints, and clean-energy goals.", sourceIds: ["whro-profile"] },
    ],
    interpretation: "The public record concerns a person privately owning an institution only indirectly. More directly, it concerns a test of whether specialized legal and regulatory knowledge can become durable public coordinating capacity through a newly created office.",
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
    payoff: "Allmond’s case teaches that public authority can be consequential without being owned. durability depends on whether a new mandate becomes routines, resources, and legal structure that survive the person who first carries it.",
    sources: [
      { id: "executive-announcement", label: "Governor creates the office and announces the appointment", href: "https://www.governor.virginia.gov/newsroom/news-releases/2026/march-releases/name-1114943-en.html", publisher: "Commonwealth of Virginia", published: "2026-03-25", kind: "primary" },
      { id: "va-bio", label: "Official biography and prior utility-regulation work", href: "https://www.governor.virginia.gov/cabinet/name-1114976-en.html", publisher: "Commonwealth of Virginia", published: "2026", kind: "institutional" },
      { id: "mercury", label: "Independent report on the office’s creation", href: "https://virginiamercury.com/briefs/spanberger-creates-new-cabinet-position-appoints-selcs-josephus-allmond-chief-energy-officer/", publisher: "Virginia Mercury", published: "2026-03-25", kind: "independent" },
      { id: "whro-profile", label: "Independent profile of the office’s energy-policy challenge", href: "https://www.whro.org/virginia-center-for-investigative-journalism/2026-06-17/vcij-josephus-allmond", publisher: "WHRO / Virginia Center for Investigative Journalism", published: "2026-06-17", kind: "independent" },
    ],
  },
  "kunal-shah": {
    documentationLevel: "saturated",
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
  "suzie-reider": {
    documentationLevel: "saturated",
    reviewed: "2026-07-27",
    chronology: [
      { date: "2006", event: "Reider joined YouTube as chief marketing officer before Google's acquisition and later built revenue and marketing functions within Google.", sourceIds: ["middlebury-career", "middlebury-trustee"] },
      { date: "2019–2020", event: "At Waze, Reider led advertising and sales during the pandemic traffic collapse, when mobility and advertising revenue fell sharply.", sourceIds: ["bi-waze", "modern-retail"] },
      { date: "December 4–10, 2024", event: "Lyft appointed Reider executive vice president of Lyft Media and Lyft Business, reporting to CEO David Risher.", sourceIds: ["lyft-announcement", "mediapost"] },
    ],
    interpretation: "Reider's public record tests portability inside large companies: she could carry knowledge of advertising, video, local commerce, and platform monetization across YouTube, Waze, and Lyft, while the audience, data, product, capital, and distribution remained institution-owned.",
    complication: [
      "Appointment announcements document senior roles but do not establish how much platform performance was personally caused by Reider rather than teams, acquisitions, market position, and Google's infrastructure.",
      "The Waze pandemic record shows that even a sophisticated advertising operation remained dependent on mobility behavior and advertiser demand outside the leader's control.",
      "Public sources do not establish Reider's budgets, internal decision rights, product ownership, or the successor-capability of the businesses she leads.",
    ],
    unknowns: [
      "What binding product, pricing, hiring, and data-access decisions sit with Reider at Lyft?",
      "Which methods or relationships moved with her from Google, and which remained proprietary or team-embedded?",
      "What structures would allow Lyft Media and Lyft Business to continue beyond their current executive sponsor?",
    ],
    payoff: "The case distinguishes portable executive judgment from portable infrastructure. Reider can carry expertise and credibility; the systems through which they produce value still belong to the companies supplying data, products, teams, and distribution.",
    sources: [
      { id: "lyft-announcement", label: "Lyft appointment announcement and reporting line", href: "https://www.lyft.com/blog/posts/lyft-welcomes-suzie-reider", publisher: "Lyft", published: "2024-12-04", kind: "primary" },
      { id: "middlebury-career", label: "Career chronology across Ziff-Davis, CNET, YouTube, and Waze", href: "https://www.middlebury.edu/middcore/suzie-reider", publisher: "Middlebury College", published: "See linked record", kind: "institutional" },
      { id: "middlebury-trustee", label: "Institutional biography describing YouTube and Waze leadership", href: "https://www.middlebury.edu/about-middlebury/suzanne-reider-87", publisher: "Middlebury College", published: "See linked record", kind: "institutional" },
      { id: "mediapost", label: "Independent report on the Lyft appointment", href: "https://www.mediapost.com/publications/article/401629/googles-suzie-reider-joins-lyft.html", publisher: "MediaPost", published: "2024-12-04", kind: "independent" },
      { id: "bi-waze", label: "Independent report on Waze's pandemic advertising dependence", href: "https://www.businessinsider.com/how-googles-waze-salvaged-its-ad-business-amid-the-coronavirus-2020-6", publisher: "Business Insider", published: "2020-06-04", kind: "independent" },
      { id: "modern-retail", label: "Interview on Waze traffic and retail-advertising dependence", href: "https://www.modernretail.co/retailers/wazes-suzie-reider-on-the-return-of-road-traffic-and-the-retailers-that-depend-on-it/", publisher: "Modern Retail", published: "2020-11-05", kind: "independent" },
    ],
  },
  "kenny-gold": {
    documentationLevel: "saturated",
    reviewed: "2026-07-27",
    chronology: [
      { date: "Before 2021", event: "Gold led social-media work at Grey Group North America before moving from agency work into consulting.", sourceIds: ["aef-bio", "gold-reflection"] },
      { date: "2021", event: "Gold joined Deloitte Digital as managing director and head of social, content, and influencer.", sourceIds: ["aef-bio"] },
      { date: "2023–2025", event: "Public appearances documented Gold's thesis that creators should retain authentic voice, receive support and compensation, and use AI as an enabling tool.", sourceIds: ["buzzincontent", "cmo-podcast", "gold-creator-post"] },
      { date: "June 2, 2026", event: "Edelman appointed Gold global chief creator officer to lead Edelman Creator across a network of approximately 200 specialists.", sourceIds: ["edelman-announcement", "gold-reflection"] },
    ],
    interpretation: "Gold's public record examines how a specialist turns a cross-functional practice into an executive mandate across institutions. A thesis, reputation, relationships, and practice-building experience travel; each firm's staff, clients, data, budgets, and authority do not.",
    complication: [
      "A first-ever global title signals recognition but does not establish independent budget, hiring authority, or control over regional teams.",
      "Edelman's approximately 200 creator specialists predated the appointment, so the mandate inherits substantial institutional capacity.",
      "Gold's public philosophy is evidence of a consistent point of view, not proof that client outcomes or organizational change were caused by him alone.",
    ],
    unknowns: [
      "Which global standards, budgets, hiring decisions, and client decisions can Gold make rather than influence?",
      "What portion of Deloitte Digital's creator capability can be attributed to Gold rather than distributed teams?",
      "Will Edelman's creator mandate become durable governance, methods, and succession capacity beyond its first global officeholder?",
    ],
    payoff: "The case separates carrying a field-building point of view from controlling the institution that adopts it. Durability depends on decision rights, routines, distributed capability, and succession—not the novelty of the title.",
    sources: [
      { id: "edelman-announcement", label: "Edelman appointment, reporting line, mandate, and existing team scale", href: "https://www.edelman.com/news-awards/kenny-gold-global-chief-creator-officer", publisher: "Edelman", published: "2026-06-02", kind: "primary" },
      { id: "gold-reflection", label: "First-person account of moving into consulting and building at Deloitte Digital", href: "https://www.linkedin.com/posts/kennethrgold_nearly-five-years-ago-i-took-a-bet-on-myself-activity-7460702920838246400-2cVb", publisher: "Kenny Gold / LinkedIn", published: "2026", kind: "primary" },
      { id: "aef-bio", label: "Institutional biography documenting Grey and Deloitte roles", href: "https://aef.com/partnership-programs/honors-night/honors2021/2021-champions/champion-gold/", publisher: "Advertising Educational Foundation", published: "2021", kind: "institutional" },
      { id: "buzzincontent", label: "Independent report on Gold's creator and AI position", href: "https://www.buzzincontent.com/story/ai-is-an-ally-not-a-replacement-for-creators-deloitte-digital-single-s-kenny-gold/", publisher: "BuzzInContent", published: "2023-06-21", kind: "independent" },
      { id: "cmo-podcast", label: "Creator-economy roundtable documenting Gold's role and thesis", href: "https://podscan.fm/podcasts/the-cmo-podcast/episodes/the-creator-economy-roundtable-with-brandon-b-kim-larson-youtube-and-kenny-gold-deloitte-digital", publisher: "The CMO Podcast", published: "2025-06-25", kind: "independent" },
      { id: "gold-creator-post", label: "First-person articulation of creator autonomy in brand partnerships", href: "https://www.linkedin.com/videos/kennethrgold_creatoreconomy-advertising-content-activity-7394014142975721472-eu7w", publisher: "Kenny Gold / LinkedIn", published: "2025", kind: "primary" },
    ],
  },
  "steven-bartlett": {
    documentationLevel: "saturated",
    reviewed: "2026-07-27",
    chronology: [
      { date: "2014–2017", event: "Bartlett and Dominic McGregor built Social Chain; Bartlett began The Diary of a CEO in 2017 while still associated with the company.", sourceIds: ["guardian-profile", "prolific-listing", "flightstory-show"] },
      { date: "October 2019", event: "Social Chain combined with Lumaland and traded in Germany; reporting named Bartlett as one of three co-CEOs.", sourceIds: ["prolific-listing"] },
      { date: "August 2020", event: "Bartlett and McGregor announced their departure from Social Chain.", sourceIds: ["prolific-departure", "guardian-profile"] },
      { date: "2021–2024", event: "The podcast expanded while Bartlett held financial relationships with Huel and ZOE; ASA rulings found advertising