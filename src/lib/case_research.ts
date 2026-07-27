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
    interpretation: "Reider's case tests portability inside large companies: she could carry knowledge of advertising, video, local commerce, and platform monetization across YouTube, Waze, and Lyft, while the audience, data, product, capital, and distribution remained institution-owned.",
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
    interpretation: "Gold's case examines how a specialist turns a cross-functional practice into an executive mandate across institutions. A thesis, reputation, relationships, and practice-building experience travel; each firm's staff, clients, data, budgets, and authority do not.",
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
  }
  "steven-bartlett": {
    documentationLevel: "saturated",
    reviewed: "2026-07-27",
    chronology: [
      { date: "2014–2017", event: "Bartlett and Dominic McGregor built Social Chain; Bartlett began The Diary of a CEO in 2017 while still associated with the company.", sourceIds: ["guardian-profile", "prolific-listing", "flightstory-show"] },
      { date: "October 2019", event: "Social Chain combined with Lumaland and traded in Germany; reporting named Bartlett as one of three co-CEOs.", sourceIds: ["prolific-listing"] },
      { date: "August 2020", event: "Bartlett and McGregor announced their departure from Social Chain.", sourceIds: ["prolific-departure", "guardian-profile"] },
      { date: "2021–2024", event: "The podcast expanded while Bartlett held financial relationships with Huel and ZOE; ASA rulings found advertising disclosures inadequate.", sourceIds: ["asa-huel-2022", "asa-huel-2024", "asa-zoe-2024"] },
      { date: "December 2024", event: "A BBC investigation reported recurring harmful health claims in sampled episodes and questioned editorial challenge and verification.", sourceIds: ["bbc-health", "guardian-health"] },
      { date: "2025–2026", event: "FlightStory and Steven.com described a broader system spanning creator media, communities, products, and technology.", sourceIds: ["flightstory-show", "steven-company"] },
    ],
    interpretation: "Bartlett's case examines whether audience attention can become owned media and operating infrastructure beyond one platform. The portfolio creates more capacity than a personal channel alone, but discovery, authority, monetization, and demand remain closely tied to Bartlett and major distributors.",
    complication: [
      "Social Chain's history identifies co-founders, co-CEOs, merger partners, investors, and a later departure; it does not support a sole-builder account.",
      "Commercial scale is not evidence of editorial reliability. BBC reporting and ASA rulings document verification and disclosure failures.",
      "Venture diversity can coexist with dependence on one person's visibility, voice, relationships, and reputation.",
      "Company descriptions do not establish entity-level ownership, audience-data rights, licensing, intercompany agreements, or succession.",
    ],
    unknowns: [
      "Which entities own the podcast name, archive, feeds, formats, audience data, and derivative rights?",
      "What ownership and control rights does Bartlett hold across FlightStory, Steven.com, Flight Fund, and related ventures?",
      "Which platform and distribution relationships are portable if partners change terms?",
      "What editorial, medical-review, corrections, and conflict-disclosure standards govern health content?",
      "What could continue at comparable quality and demand without Bartlett?",
    ],
    payoff: "Attention can seed an institution, but durability depends on rights, governance, editorial controls, direct audience relationships, distributed capability, and succession—not reach or venture count.",
    sources: [
      { id: "guardian-profile", label: "Independent career profile", href: "https://www.theguardian.com/tv-and-radio/2022/jan/06/steven-bartlett-dragons-den-interview", publisher: "The Guardian", published: "2022-01-06", kind: "independent" },
      { id: "prolific-listing", label: "Contemporaneous Social Chain listing report", href: "https://www.prolificnorth.co.uk/news/social-chain-goes-public-german-stock-exchange/", publisher: "Prolific North", published: "2019-10-17", kind: "independent" },
      { id: "prolific-departure", label: "Contemporaneous founder-departure report", href: "https://www.prolificnorth.co.uk/news/co-founders-steven-bartlett-and-dominic-mcgregor-leave-social-chain/", publisher: "Prolific North", published: "2020-08-17", kind: "independent" },
      { id: "flightstory-show", label: "FlightStory description of the show", href: "https://www.flightstory.com/shows/diary-of-a-ceo", publisher: "FlightStory", published: "Current record", kind: "primary" },
      { id: "steven-company", label: "Steven.com system description", href: "https://steven.com/", publisher: "Steven.com", published: "Current record", kind: "primary" },
      { id: "asa-huel-2022", label: "Huel podcast advertising ruling", href: "https://www.asa.org.uk/rulings/huel-ltd-a22-1140981-huel-ltd.html", publisher: "Advertising Standards Authority", published: "2022-08-10", kind: "institutional" },
      { id: "asa-huel-2024", label: "Huel financial-interest disclosure ruling", href: "https://www.asa.org.uk/rulings/huel-ltd-g24-1237493-huel-ltd.html", publisher: "Advertising Standards Authority", published: "2024-08-14", kind: "institutional" },
      { id: "asa-zoe-2024", label: "ZOE financial-interest disclosure ruling", href: "https://www.asa.org.uk/rulings/zoe-ltd-g24-1237489-zoe-ltd.html", publisher: "Advertising Standards Authority", published: "2024-08-14", kind: "institutional" },
      { id: "bbc-health", label: "Investigation of health claims in sampled episodes", href: "https://www.bbc.com/news/articles/c4gpz163vg2o", publisher: "BBC World Service", published: "2024-12-13", kind: "independent" },
      { id: "guardian-health", label: "Report on the investigation and company response", href: "https://www.theguardian.com/media/2024/dec/13/steven-bartlett-accused-of-amplifying-dangerous-health-claims-on-his-podcast", publisher: "The Guardian", published: "2024-12-13", kind: "independent" },
    ],
  },
  "ashley-rudder": {
    documentationLevel: "saturated",
    reviewed: "2026-07-27",
    chronology: [
      { date: "Approximately 2000–2020", event: "Rudder developed from makeup artist into digital-content and artistry leadership during a long M·A·C career.", sourceIds: ["muse-interview", "whalar-announcement"] },
      { date: "2020–2022", event: "She moved through senior creative and creator-strategy roles and developed her creator practice and HAUS OF SÔS collective.", sourceIds: ["muse-interview", "bi-whalar", "haus"] },
      { date: "December 2022–January 2023", event: "Whalar named Rudder Global Chief Creator Officer with a stated remit spanning guidance, support, advocacy, safety, pay, representation, and creative excellence.", sourceIds: ["whalar-announcement", "bi-whalar"] },
      { date: "2024", event: "Deutsch New York appointed Rudder its first chief creator officer as it launched SociStudio.", sourceIds: ["muse-interview", "deutsch-report"] },
    ],
    interpretation: "Rudder's case tests whether practitioner knowledge and creator participation can become an organizational mandate rather than remain campaign labor. Her expertise travels; institutional teams, clients, budgets, and distribution do not.",
    complication: [
      "First-of-kind titles do not establish binding decision rights, budget control, or durability.",
      "Both organizations had pre-existing capabilities, so appointment announcements cannot isolate Rudder's causal contribution.",
      "The record is rich in appointments and first-person explanation but thin on independent outcome, governance, budget, pay-equity, and succession evidence.",
      "Her executive, creator, and collective roles can aid translation while complicating whose interests, IP, and attribution a decision represents.",
    ],
    unknowns: [
      "What binding authority covered budgets, hiring, campaign approval, creator selection, pay, and client strategy?",
      "Which programs and policies were created by Rudder rather than inherited or jointly produced?",
      "What evidence shows changes in creator pay, representation, safety, retention, quality, or client outcomes?",
      "Who owns methods and IP developed across her personal practice, HAUS OF SÔS, Whalar, and Deutsch?",
      "Did either organization preserve the office, remit, or routines after her tenure?",
    ],
    payoff: "Creator judgment becomes institutional only through authority, repeatable policy, evidence of changed practice, distributed capability, and succession—not a novel title.",
    sources: [
      { id: "whalar-announcement", label: "Whalar announcement defining the remit", href: "https://www.prnewswire.com/news-releases/whalar-names-ashley-rudder-first-ever-chief-creator-officer-301729971.html", publisher: "Whalar / PR Newswire", published: "2023-01-25", kind: "primary" },
      { id: "bi-whalar", label: "Independent report and first-person role account", href: "https://www.businessinsider.com/whalar-global-chief-creator-officer-new-c-suite-role-position-2023-1", publisher: "Business Insider", published: "2023-01-30", kind: "independent" },
      { id: "muse-interview", label: "Career chronology and Deutsch role interview", href: "https://musebyclios.com/culture-creators/ashley-rudder-on-steering-deutsch-n-y-deeper-into-creator-content/", publisher: "Muse by Clio", published: "2024-08-14", kind: "independent" },
      { id: "deutsch-report", label: "Institutional report on the Deutsch remit", href: "https://attivogroup.co/news/dnys-ashley-rudder-talks-to-muse-by-clio-about-delving-deeper-into-creator-content/", publisher: "Attivo Group", published: "2024-08-14", kind: "institutional" },
      { id: "haus", label: "Creator collective record", href: "https://www.hausofsos.com/", publisher: "HAUS OF SÔS", published: "Current record", kind: "primary" },
      { id: "linkedin-career", label: "Self-maintained role chronology", href: "https://www.linkedin.com/in/ashleyrudder1", publisher: "Ashley Rudder / LinkedIn", published: "Current record", kind: "primary" },
    ],
  },
};

const CASE_MILESTONES: Record<string, { date: string; event: string }> = {
  "suzie-reider": { date: "2006–2024", event: "Reider moved from CNET into a 17-year Google career spanning YouTube and Waze, then joined Lyft to lead Lyft Media and Lyft Business." },
  "kenny-gold": { date: "June 2, 2026", event: "Edelman appointed Gold its first global chief creator officer after he built Deloitte Digital’s social-and-creator practice." },
  "steven-bartlett": { date: "2017–present", event: "Bartlett developed The Diary of a CEO from a founder-hosted podcast into the center of a wider media and venture system." },
  "ashley-rudder": { date: "2023–2024", event: "Rudder held first-of-kind chief creator officer roles at Whalar and Deutsch New York." },
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
    documentationLevel: "provisional",
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
