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
};

export const SEED: Node[] = [
  // --- original founding roster ---
  { name: "Suzie Reider", role: "Media executive who helped build YouTube’s revenue organization", domain: "Media", kind: "professional", created: true },
  { name: "Kenny Gold", role: "Global Chief Creator Officer at Edelman", domain: "Media", kind: "professional", created: true },
  { name: "Steven Bartlett", role: "Entrepreneur, investor, and podcast host", domain: "Media", kind: "professional" },
  { name: "Ashley Rudder", role: "Chief Creator Officer at Whalar", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Gordon Glenister", role: "Influencer-marketing strategist and BCMA Global Head of Influencer Marketing", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Claire Zau", role: "Partner and new-media lead at Lightspeed", domain: "Venture", kind: "professional", created: true },
  { name: "Brad Keywell", role: "Entrepreneur, investor, artist, and professor", domain: "Venture", kind: "professional" },
  { name: "Klitos Teklos", role: "Chief Brand Officer at Tory Burch", domain: "Fashion & Brand", kind: "professional", created: true },
  { name: "Charlotte Tansill", role: "U.S. president of social, creator, and earned media at Publicis", domain: "Agency", kind: "professional", created: true },
  { name: "Kunal Shah", role: "Founder of CRED and Head of WhatsApp", domain: "Tech", kind: "professional", created: true },
  { name: "Mo Gawdat", role: "Former Google X executive, author, and AI commentator", domain: "Tech", kind: "professional" },
  { name: "Josephus Allmond", role: "Chief Energy Officer for Virginia", domain: "Government", kind: "professional", created: true },
  { name: "Peter Diamandis", role: "Engineer, physician, and founder and executive chairman of XPRIZE", domain: "Science", kind: "professional" },
  { name: "Noubar Afeyan", role: "Inventor, entrepreneur, and founder and CEO of Flagship Pioneering", domain: "Science", kind: "professional" },
  { name: "Nadir Godrej", role: "Chemical engineer, business leader, and poet", domain: "Business", kind: "professional" },

  // --- expanded methodology-pilot roster; public evidence status varies by case ---
  // Creators who own their business
  { name: "MrBeast (Jimmy Donaldson)", role: "Creator and founder of Beast Industries", domain: "Consumer", kind: "creator" },
  { name: "Emma Chamberlain", role: "Founder and co-CEO of Chamberlain Coffee", domain: "Consumer", kind: "creator" },
  { name: "Huda Kattan", role: "Founder of Huda Beauty", domain: "Fashion & Brand", kind: "creator" },
  { name: "Marques Brownlee", role: "Technology creator and producer", domain: "Tech", kind: "creator" },
  { name: "Pieter Levels", role: "Independent software creator and entrepreneur", domain: "Tech", kind: "creator" },
  { name: "Jack Conte", role: "Co-founder and CEO of Patreon", domain: "Creator Economy", kind: "creator" },
  { name: "Colin & Samir", role: "Creator-economy video creators and podcasters", domain: "Creator Economy", kind: "creator" },
  { name: "Alex Cooper", role: "Podcaster and co-founder of Unwell", domain: "Media", kind: "creator" },
  { name: "Codie Sanchez", role: "Founder and CEO of Contrarian Thinking", domain: "Finance", kind: "creator" },
  { name: "Gary Vaynerchuk", role: "Creator, entrepreneur, and founder of VaynerX", domain: "Agency", kind: "creator" },

  // Roles invented / built around them
  { name: "Alexandr Wang", role: "Chief AI Officer at Meta", domain: "AI", kind: "professional", created: true },
  { name: "Mustafa Suleyman", role: "CEO of Microsoft AI", domain: "AI", kind: "professional", created: true },
  { name: "Cathy Hackl", role: "Technology and gaming executive, futurist, and speaker", domain: "AI", kind: "professional", created: true },
  { name: "Jane Gilbert", role: "Chief Heat Officer for Miami-Dade County", domain: "Government", kind: "professional", created: true },
  { name: "Darren Murph", role: "Remote-work leader and former Head of Remote at GitLab", domain: "Business", kind: "professional", created: true },
  { name: "Linda Fisher", role: "Former Chief Sustainability Officer at DuPont", domain: "Science", kind: "professional", created: true },
  { name: "Jony Ive", role: "Designer and former Chief Design Officer at Apple", domain: "Design", kind: "professional", created: true },

  // Founders-turned-operators / intrapreneurs
  { name: "Astro Teller", role: "Captain of Moonshots at X", domain: "Tech", kind: "professional", created: true },
  { name: "Marc Lore", role: "Entrepreneur and former head of Walmart U.S. e-commerce", domain: "Business", kind: "professional", created: true },
  { name: "Shonda Rhimes", role: "Writer, producer, and founder of Shondaland", domain: "Media", kind: "professional", created: true },

  // Cannes / marketing institutions
  { name: "Simon Cook", role: "CEO of LIONS, the organization behind Cannes Lions", domain: "Agency", kind: "professional" },
  { name: "Marc Pritchard", role: "Chief Brand Officer at Procter & Gamble", domain: "Fashion & Brand", kind: "professional" },

  // Polymaths (deep mastery across fields) — charted by their primary lens
  { name: "Reid Hoffman", role: "LinkedIn co-founder, venture investor, author, and podcast host", domain: "Venture", kind: "professional" },
  { name: "Fei-Fei Li", role: "AI scientist, Stanford professor, and World Labs co-founder", domain: "AI", kind: "professional" },
  { name: "Neri Oxman", role: "Designer, materials researcher, and founder of OXMAN", domain: "Design", kind: "professional" },
  { name: "Brian May", role: "Musician and astrophysicist", domain: "Science", kind: "professional" },
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
