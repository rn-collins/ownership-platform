// Seed roster for The Observatory — real, public-figure people from research, so the
// map is alive before any backend data. Live Guests/Nominations layer on top once
// Supabase is wired. Plain module (no "use client") so server components can import it.
// Only public figures with publicly-documented roles/ownership are seeded here;
// lesser-known individuals are added only via consented nominations.

export type Node = {
  name: string;
  role: string;
  domain: string;
  kind: "professional" | "creator"; // the two lenses: Portfolio Professional · Ownership Index
  created?: boolean; // the public record flags a role materially built around the person
  verificationStatus?: "provisional" | "in_review" | "verified" | "disputed" | "rejected";
  evidenceCoverage?: number | null;
  tension?: string;
  question?: string;
};

export const SEED: Node[] = [
  // --- original founding roster ---
  { name: "Suzie Reider", role: "Media executive who helped build YouTube’s revenue organization", domain: "Media", kind: "professional", created: true, tension: "Portable vs embedded", question: "When an executive builds a system inside a giant company, what can actually travel with her?" },
  { name: "Kenny Gold", role: "Global Chief Creator Officer at Edelman", domain: "Media", kind: "professional", created: true, tension: "Role vs person", question: "What changes when a company creates a C-suite role around creator culture?" },
  { name: "Steven Bartlett", role: "Entrepreneur, investor, and podcast host", domain: "Media", kind: "professional", tension: "One field vs many", question: "Can a media personality turn attention across companies, investing, and publishing into one coherent institution?" },
  { name: "Ashley Rudder", role: "Chief Creator Officer at Whalar", domain: "Creator Economy", kind: "professional", created: true, tension: "Role vs person", question: "Is a chief creator officer a real transfer of power—or a new title for old marketing work?" },
  { name: "Gordon Glenister", role: "Influencer-marketing strategist and BCMA Global Head of Influencer Marketing", domain: "Creator Economy", kind: "professional", created: true, tension: "Role vs person", question: "What happens when influence becomes a professional function with its own standards and authority?" },
  { name: "Claire Zau", role: "Partner and new-media lead at Lightspeed", domain: "Venture", kind: "professional", created: true, tension: "Role vs person", question: "What does venture capital have to become when creators are treated as companies, not campaigns?" },
  { name: "Brad Keywell", role: "Entrepreneur, investor, artist, and professor", domain: "Venture", kind: "professional", tension: "One field vs many", question: "Can one person operate across business, art, investing, and teaching without becoming incoherent?" },
  { name: "Klitos Teklos", role: "Chief Brand Officer at Tory Burch", domain: "Fashion & Brand", kind: "professional", created: true, tension: "Role vs person", question: "How much authority can a chief brand officer carry inside a legacy fashion institution?" },
  { name: "Charlotte Tansill", role: "U.S. president of social, creator, and earned media at Publicis", domain: "Agency", kind: "professional", created: true, tension: "Role vs person", question: "What does it mean to combine social, creator, and earned media under one leader?" },
  { name: "Kunal Shah", role: "Founder of CRED and Head of WhatsApp", domain: "Tech", kind: "professional", created: true, tension: "Portable vs embedded", question: "What survives when a founder steps from leading his own company into a platform role?" },
  { name: "Mo Gawdat", role: "Former Google X executive, author, and AI commentator", domain: "Tech", kind: "professional", tension: "Portable vs embedded", question: "How does authority change when an executive identity becomes an independent public voice?" },
  { name: "Josephus Allmond", role: "Chief Energy Officer for Virginia", domain: "Government", kind: "professional", created: true, tension: "Public mandate vs personal authority", question: "Can a public role built around one person become durable government capacity?" },
  { name: "Peter Diamandis", role: "Engineer, physician, and founder and executive chairman of XPRIZE", domain: "Science", kind: "professional", tension: "One field vs many", question: "How does one person turn a recurring thesis about the future into organizations, prizes, and communities?" },
  { name: "Noubar Afeyan", role: "Inventor, entrepreneur, and founder and CEO of Flagship Pioneering", domain: "Science", kind: "professional", tension: "Scale vs dependence", question: "How does an inventor build a repeatable system for creating companies without making every company the same?" },
  { name: "Nadir Godrej", role: "Chemical engineer, business leader, and poet", domain: "Business", kind: "professional", tension: "One field vs many", question: "What makes a life across engineering, business, and poetry feel integrated rather than scattered?" },

  // --- expanded methodology-pilot roster; public evidence status varies by case ---
  // Creators who own their business
  { name: "MrBeast (Jimmy Donaldson)", role: "Creator and founder of Beast Industries", domain: "Consumer", kind: "creator", tension: "Owned vs rented", question: "How much of a creator empire is truly owned when its attention still begins on someone else’s platform?" },
  { name: "Emma Chamberlain", role: "Founder and co-CEO of Chamberlain Coffee", domain: "Consumer", kind: "creator", tension: "Owned vs rented", question: "What changes when creator attention becomes products, retail, and a place people can enter?" },
  { name: "Huda Kattan", role: "Founder of Huda Beauty", domain: "Fashion & Brand", kind: "creator", tension: "Owned vs rented", question: "When does a beauty creator stop extending a personal brand and start governing a company?" },
  { name: "Marques Brownlee", role: "Technology creator and producer", domain: "Tech", kind: "creator", tension: "Owned vs rented", question: "Can trust built on a platform become a portable media institution without losing its independence?" },
  { name: "Pieter Levels", role: "Independent software creator and entrepreneur", domain: "Tech", kind: "creator", tension: "Owned vs rented", question: "How little infrastructure does one person need to operate products with global reach?" },
  { name: "Jack Conte", role: "Co-founder and CEO of Patreon", domain: "Creator Economy", kind: "creator", tension: "Scale vs dependence", question: "Can a creator build the infrastructure other creators use without becoming another gatekeeper?" },
  { name: "Colin & Samir", role: "Creator-economy video creators and podcasters", domain: "Creator Economy", kind: "creator", tension: "One field vs many", question: "Can explaining the creator economy become an institution inside the creator economy itself?" },
  { name: "Alex Cooper", role: "Podcaster and co-founder of Unwell", domain: "Media", kind: "creator", tension: "Portable vs embedded", question: "What did a podcast host carry as distribution partners, contracts, and companies changed around her?" },
  { name: "Codie Sanchez", role: "Founder and CEO of Contrarian Thinking", domain: "Finance", kind: "creator", tension: "Scale vs dependence", question: "How does a media thesis become education, community, acquisition, and operating activity?" },
  { name: "Gary Vaynerchuk", role: "Creator, entrepreneur, and founder of VaynerX", domain: "Agency", kind: "creator", tension: "One field vs many", question: "Can one public identity hold an agency group, media presence, investing, and intellectual property together?" },

  // Roles invented / built around them
  { name: "Alexandr Wang", role: "Chief AI Officer at Meta", domain: "AI", kind: "professional", created: true, tension: "Role vs person", question: "What does a newly created chief AI role reveal about where a company believes power now sits?" },
  { name: "Mustafa Suleyman", role: "CEO of Microsoft AI", domain: "AI", kind: "professional", created: true, tension: "Role vs person", question: "When a company builds a new AI division around one leader, what belongs to the person and what belongs to the platform?" },
  { name: "Cathy Hackl", role: "Technology and gaming executive, futurist, and speaker", domain: "AI", kind: "professional", created: true, tension: "One field vs many", question: "How does a futurist turn work across technology, gaming, speaking, and strategy into durable authority?" },
  { name: "Jane Gilbert", role: "Chief Heat Officer for Miami-Dade County", domain: "Government", kind: "professional", created: true, tension: "Public mandate vs personal authority", question: "How can one coordinator create institutional consequence without personally owning the system?" },
  { name: "Darren Murph", role: "Remote-work leader and former Head of Remote at GitLab", domain: "Business", kind: "professional", created: true, tension: "Role vs person", question: "Can a role invented for remote work outlast the emergency that made it visible?" },
  { name: "Linda Fisher", role: "Former Chief Sustainability Officer at DuPont", domain: "Science", kind: "professional", created: true, tension: "Role vs person", question: "What authority does a first-generation sustainability role create inside a large corporation?" },
  { name: "Jony Ive", role: "Designer and former Chief Design Officer at Apple", domain: "Design", kind: "professional", created: true, tension: "Portable vs embedded", question: "What can a celebrated designer carry when he leaves the company that made his work globally legible?" },

  // Founders-turned-operators / intrapreneurs
  { name: "Astro Teller", role: "Captain of Moonshots at X", domain: "Tech", kind: "professional", created: true, tension: "Role vs person", question: "Does an unusual title create permission to work differently—or merely signal it?" },
  { name: "Marc Lore", role: "Entrepreneur and former head of Walmart U.S. e-commerce", domain: "Business", kind: "professional", created: true, tension: "Portable vs embedded", question: "What does a founder retain when entrepreneurial capability moves inside a retail giant?" },
  { name: "Shonda Rhimes", role: "Writer, producer, and founder of Shondaland", domain: "Media", kind: "professional", created: true, tension: "Owned vs rented", question: "How does an owned creative institution negotiate with the distributor that gives it global reach?" },

  // Cannes / marketing institutions
  { name: "Simon Cook", role: "CEO of LIONS, the organization behind Cannes Lions", domain: "Agency", kind: "professional", tension: "Institution vs individual", question: "What kind of authority does a person exercise when leading a cultural institution built around recognition?" },
  { name: "Marc Pritchard", role: "Chief Brand Officer at Procter & Gamble", domain: "Fashion & Brand", kind: "professional", tension: "Portable vs embedded", question: "Can an executive become an industry authority while the underlying power remains inside one company?" },

  // Polymaths (deep mastery across fields) — charted by their primary lens
  { name: "Reid Hoffman", role: "LinkedIn co-founder, venture investor, author, and podcast host", domain: "Venture", kind: "professional", tension: "One field vs many", question: "How can founding, investing, writing, and podcasting reinforce one another instead of competing for attention?" },
  { name: "Fei-Fei Li", role: "AI scientist, Stanford professor, and World Labs co-founder", domain: "AI", kind: "professional", tension: "Public mandate vs personal authority", question: "How does scientific authority travel across a university, a field-building institute, and a company?" },
  { name: "Neri Oxman", role: "Designer, materials researcher, and founder of OXMAN", domain: "Design", kind: "professional", tension: "One field vs many", question: "What happens when a research practice becomes a studio, a material system, and a public mythology?" },
  { name: "Brian May", role: "Musician and astrophysicist", domain: "Science", kind: "professional", tension: "One field vs many", question: "What lets achievement in music and astrophysics coexist as more than a novelty pairing?" },
];

export const OBSERVATORY_DOMAINS = [
  "Media", "Creator Economy", "Consumer", "Fashion & Brand", "Agency", "Venture",
  "Finance", "Business", "Tech", "AI", "Design", "Science", "Government",
];

// Stable URL slug for a node, for deep-linkable profile pages (/observatory/[slug]).
export function nodeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")        // drop parentheticals
    .replace(/[^a-z0-9]+/g, "-")    // non-alphanumerics → hyphen
    .replace(/^-+|-+$/g, "");        // trim hyphens
}

export function findNodeBySlug(slug: string): Node | undefined {
  return SEED.find((n) => nodeSlug(n.name) === slug);
}
