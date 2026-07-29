export type CaseNarrative = {
  careerArc: string;
  structuralTurn: string;
  whyItMatters: string;
  unresolved: string[];
  sources: { label: string; href: string; independent?: boolean }[];
};

export const CASE_NARRATIVES: Record<string, CaseNarrative> = {
  "suzie-reider": {
    careerArc: "Reider’s career moved through CNET, YouTube, Google, Waze, and Lyft. The recurring thread is commercial infrastructure: turning emerging media or mobility products into systems that advertisers and enterprise customers can use.",
    structuralTurn: "At YouTube, she helped establish the revenue and marketing organization; later roles placed that experience inside different large companies rather than converting it into a Reider-owned company.",
    whyItMatters: "Her case separates portable operating capability from ownership. A person can repeatedly build consequential systems, carry the know-how and reputation forward, and still leave the underlying data, teams, contracts, and platforms with each employer.",
    unresolved: ["Which methods and relationships traveled between roles?", "How much of the institutional memory depended on Reider personally?", "Which accomplishments are attributable to teams rather than one executive?"],
    sources: [
      { label: "Lyft: Suzie Reider appointment and career history", href: "https://www.lyft.com/blog/posts/lyft-welcomes-suzie-reider" },
      { label: "Adweek: YouTube’s Suzie Reider on the creator economy", href: "https://www.adweek.com/media/youtube-suzie-reider-cannes-lions/", independent: true },
    ],
  },
  "kenny-gold": {
    careerArc: "Gold built social and creator practices inside agency and consulting organizations, including Deloitte Digital, before Edelman appointed him its first global chief creator officer in 2026.",
    structuralTurn: "The appointment moved creator work from a specialist service toward a global leadership mandate covering a roughly 200-person practice.",
    whyItMatters: "This is a test of whether a new C-suite title changes budget, decision rights, and organizational behavior—or simply gives existing work a more visible spokesperson.",
    unresolved: ["What decisions moved into the new office?", "Which capabilities predated the title?", "Will the role persist beyond its first holder?"],
    sources: [
      { label: "Edelman: appointment and remit", href: "https://www.edelman.com/news-awards/kenny-gold-global-chief-creator-officer" },
      { label: "PRWeek: Edelman hires first global chief creator officer", href: "https://www.prweek.com/article/1960080/edelman-hires-first-global-chief-creator-officer", independent: true },
    ],
  },
  "steven-bartlett": {
    careerArc: "Bartlett first became publicly legible through Social Chain, then expanded into podcasting, investing, publishing, and a group of media and venture businesses organized around his name and audience.",
    structuralTurn: "The Diary of a CEO evolved from a founder’s podcast into a production and distribution engine capable of supporting books, events, international versions, partnerships, and adjacent companies.",
    whyItMatters: "His career tests whether many ventures share a durable operating thesis or remain dependent on one personality’s continuing attention. It also shows why commercial scale and editorial reliability must be examined separately.",
    unresolved: ["Which entities own the program’s intellectual property and audience data?", "How substitutable is Bartlett within the system?", "How are editorial standards governed across health and science content?"],
    sources: [
      { label: "The Guardian: Bartlett’s route from dropout to Dragons’ Den", href: "https://www.theguardian.com/tv-and-radio/2022/jan/06/steven-bartlett-dragons-den-interview", independent: true },
      { label: "BBC: investigation of health misinformation on Diary of a CEO", href: "https://www.bbc.com/news/articles/c4gpz163vg2o", independent: true },
    ],
  },
  "ashley-rudder": {
    careerArc: "Rudder began as a makeup artist and spent roughly two decades at M·A·C, eventually directing digital content and artistry. She later moved through Lashify and Whalar into creator-strategy leadership.",
    structuralTurn: "Her ascent from practitioner to executive matters because her authority was built through the labor and culture of creation before it was expressed through a C-suite title.",
    whyItMatters: "The case asks whether a chief creator officer can move creator judgment into corporate decisions, or whether the role remains downstream from conventional marketing authority.",
    unresolved: ["What formal decision rights accompanied the title?", "How do creators participate in governance rather than campaign execution?", "How portable is authority rooted in a particular company’s relationships?"],
    sources: [
      { label: "Muse by Clio: Rudder’s career from M·A·C to creator leadership", href: "https://musebyclios.com/culture-creators/ashley-rudder-on-steering-deutsch-n-y-deeper-into-creator-content/", independent: true },
      { label: "Business Insider: why Whalar created the role", href: "https://www.businessinsider.com/whalar-global-chief-creator-officer-new-c-suite-role-position-2023-1", independent: true },
    ],
  },
  "gordon-glenister": {
    careerArc: "Glenister moved from drinks and promotional marketing into trade-association leadership, then helped establish an influencer-marketing association function and built an independent practice around consulting, speaking, writing, and convening.",
    structuralTurn: "His work helped turn influencer marketing from an informal tactic into a field with shared language, professional networks, and claims to standards.",
    whyItMatters: "This is institution-building through category formation: authority can come from organizing a field, not only from owning a company or holding a famous title.",
    unresolved: ["Which standards have been adopted beyond his own network?", "How independent is field leadership from commercial consulting?", "What survives if the founder stops convening it?"],
    sources: [
      { label: "Technology for Marketing: Glenister’s career path", href: "https://www.technologyformarketing.co.uk/news/influencer-marketing-gordon-glenister", independent: true },
      { label: "Bigeye: discussion of his industry role", href: "https://www.bigeyeagency.com/podcast/influencer-marketing-strategy-with-gordon-glenister", independent: true },
    ],
  },
  "claire-zau": {
    careerArc: "Zau combined early-stage technology investing with a fast-growing public media practice explaining AI and startups. Lightspeed recruited her in 2026 for a dual role spanning seed investing and new media.",
    structuralTurn: "Her independently built distribution became part of the value she brought to an investment firm, while she said her personal channels would remain independent.",
    whyItMatters: "The case makes distribution visible as professional capital. It also raises a conflict question: when investor, educator, recruiter, and media personality share one voice, audiences need to understand which interest is speaking.",
    unresolved: ["How are portfolio-company conflicts disclosed?", "Who owns media produced through the firm?", "Can the personal audience remain meaningfully independent of institutional incentives?"],
    sources: [
      { label: "Business Insider: the rise of the creator-investor", href: "https://www.businessinsider.com/why-lightspeed-ventures-hired-first-creator-seed-investor-claire-zau-2026-5", independent: true },
      { label: "Lightspeed: Claire Zau profile", href: "https://lsvp.com/team/claire-zau/" },
    ],
  },
  "brad-keywell": {
    careerArc: "Keywell co-founded or led technology companies including Groupon and Uptake, built the Chicago Ideas convening platform, invested through Lightbank, taught entrepreneurship, and later made his visual-art practice public.",
    structuralTurn: "Instead of treating business, civic convening, teaching, and art as separate résumés, his career repeatedly creates organizations around curiosity, technology, and public exchange.",
    whyItMatters: "The public record helps distinguish whether range becomes institutional when it shares infrastructure and a repeated purpose—or whether prominence merely allows unrelated projects to coexist.",
    unresolved: ["What operating systems connect the ventures?", "Which projects continue without Keywell’s direct involvement?", "How should collaborators’ institutional contributions be represented?"],
    sources: [
      { label: "Chicago Magazine: Brad Keywell profile", href: "https://www.chicagomag.com/chicago-magazine/june-2017/brad-keywell/", independent: true },
      { label: "University of Chicago Booth: Brad Keywell", href: "https://www.chicagobooth.edu/faculty/directory/k/brad-keywell" },
    ],
  },
  "klitos-teklos": {
    careerArc: "Teklos developed a career in fashion and luxury creative direction, then organized his independent work through a studio and long-form brand residencies embedded inside client companies.",
    structuralTurn: "The residency model sits between employment and conventional agency work: the strategist brings an authored method but works deeply inside another organization’s daily constraints.",
    whyItMatters: "His case is useful because portability is not synonymous with distance. An independent practice can gain influence through temporary embeddedness while preserving a distinct identity and method.",
    unresolved: ["What intellectual property remains with the studio?", "How are outcomes attributed between resident and client teams?", "Does the model scale without diluting the founder’s judgment?"],
    sources: [
      { label: "Models.com: Klitos Teklos creative-director profile", href: "https://models.com/people/klitos-teklos", independent: true },
      { label: "Tēklos Studio: practice and residency model", href: "https://www.klitosteklos.com/about" },
    ],
  },
  "charlotte-tansill": { careerArc: "Tansill built a strategy career across advertising and public relations before Publicis Groupe placed social, creator, and earned media under her U.S. leadership.", structuralTurn: "The combined remit treats three formerly separate channels as one influence system.", whyItMatters: "The public record helps distinguish whether integration changes how work and budgets move, or simply consolidates reporting lines.", unresolved: ["Which decisions are genuinely integrated?", "Can expertise survive another reorganization?"], sources: [{ label: "PRWeek: Publicis appoints Charlotte Tansill", href: "https://www.prweek.com/article/1940878/publicis-creative-us-hires-charlotte-tansill-president-social-creator-earned" , independent: true }, { label: "LinkedIn: Charlotte Tansill career record", href: "https://www.linkedin.com/in/charlottetansill/" }] },
  "kunal-shah": { careerArc: "Shah founded FreeCharge, sold it to Snapdeal, and later founded the fintech company CRED. In 2026 he stepped away from an executive role at CRED to lead WhatsApp.", structuralTurn: "A founder identified with a privately built product moved into leadership of one of Meta’s global platforms.", whyItMatters: "The move separates entrepreneurial capability from founder control and asks what a builder gains—and gives up—inside vastly larger infrastructure.", unresolved: ["What continuing governance or economic relationship does Shah have with CRED?", "What authority accompanies the WhatsApp role?"], sources: [{ label: "Reuters: Kunal Shah appointed to lead WhatsApp", href: "https://www.reuters.com/world/india/indian-fintech-firm-cred-raise-900-million-meta-45-billion-valuation-2026-06-22/", independent: true }, { label: "CRED: company information", href: "https://www.reuters.com/business/whatsapps-pick-indian-fintech-founder-signals-scale-payment-ambitions-2026-06-25/" }] },
  "mo-gawdat": { careerArc: "Gawdat spent years in technology leadership, including as chief business officer at Google X, before becoming an author, podcaster, and public commentator on happiness and artificial intelligence.", structuralTurn: "Authority once supplied by a famous laboratory became a personally distributed body of books, talks, and media.", whyItMatters: "His case tests how far institutional credibility can travel—and how audiences should distinguish experience, interpretation, and scientific evidence.", unresolved: ["Which claims rest on research rather than personal authority?", "How dependent is the public platform on the Google X credential?"], sources: [{ label: "The Guardian: Mo Gawdat profile", href: "https://www.theguardian.com/technology/2017/apr/30/google-mo-gawdat-solve-for-happy-interview", independent: true }, { label: "MIT Sloan: Mo Gawdat speaker profile", href: "https://www.theguardian.com/membership/video/2020/may/20/the-upside-in-conversation-with-mo-gawdat-video" }] },
  "josephus-allmond": { careerArc: "Allmond’s work spans energy law, regulation, and public service. Virginia appointed him its chief energy officer, placing cross-agency energy coordination in a named office.", structuralTurn: "The role converts specialized expertise into a public mandate that depends on statutory, gubernatorial, and agency authority.", whyItMatters: "The record shows that institutional consequence can be public and non-owned, while still raising whether capacity survives an administration or officeholder.", unresolved: ["Which authorities are formal rather than relational?", "What systems will remain after the appointment ends?"], sources: [{ label: "Virginia Governor: Josephus Allmond cabinet profile", href: "https://www.governor.virginia.gov/cabinet/name-1114976-en.html" }] },
  "peter-diamandis": { careerArc: "Diamandis combined engineering and medical training with a series of organizations built around prizes, exponential technology, space, and future-oriented entrepreneurship.", structuralTurn: "XPRIZE turned a recurring thesis—that incentives can mobilize distributed problem solving—into a durable institutional mechanism.", whyItMatters: "His career shows how a person’s worldview can become organizations, programs, language, and communities rather than remain a speaking brand.", unresolved: ["Which organizations remain founder-dependent?", "How are impacts independently evaluated?"], sources: [{ label: "Encyclopaedia Britannica: Peter Diamandis", href: "https://www.britannica.com/biography/Peter-Diamandis", independent: true }, { label: "XPRIZE: leadership", href: "https://www.xprize.org/about/people/peter-diamandis" }] },
  "noubar-afeyan": { careerArc: "Afeyan moved from biochemical engineering into company formation, founding Flagship Pioneering and developing a venture-creation model that generated companies including Moderna.", structuralTurn: "The work became a repeatable institutional process for originating hypotheses, teams, and companies—not only a portfolio of investments.", whyItMatters: "The public record helps distinguish whether a founder can systematize invention without making discovery formulaic or obscuring the scientists and operators doing the work.", unresolved: ["How are ideas and credit allocated?", "Which outcomes validate the platform rather than one exceptional company?"], sources: [{ label: "Forbes: Noubar Afeyan profile", href: "https://www.forbes.com/profile/noubar-afeyan/", independent: true }, { label: "Flagship Pioneering: Noubar Afeyan", href: "https://www.flagshippioneering.com/people/noubar-afeyan" }] },
  "nadir-godrej": { careerArc: "Godrej trained as a chemical engineer, became a senior leader in the family-controlled Godrej group, and maintained a public practice as a poet and speaker.", structuralTurn: "Poetry became part of how he communicated business, science, and social ideas rather than a hidden life outside executive work.", whyItMatters: "His case asks whether multiple forms of mastery c