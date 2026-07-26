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
  { name: "Suzie Reider", role: "Founded YouTube's revenue org", domain: "Media", kind: "professional", created: true },
  { name: "Kenny Gold", role: "First-ever Global Chief Creator Officer, Edelman", domain: "Media", kind: "professional", created: true },
  { name: "Steven Bartlett", role: "Entrepreneur · investor · #1 podcaster", domain: "Media", kind: "professional" },
  { name: "Ashley Rudder", role: "Chief Creator Officer, Whalar", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Gordon Glenister", role: "Founded the BCMA influence division", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Claire Zau", role: "First creator-investor partner, Lightspeed", domain: "Venture", kind: "professional", created: true },
  { name: "Brad Keywell", role: "Entrepreneur · investor · artist · professor", domain: "Venture", kind: "professional" },
  { name: "Klitos Teklos", role: "First-ever Chief Brand Officer, Tory Burch", domain: "Fashion & Brand", kind: "professional", created: true },
  { name: "Charlotte Tansill", role: "President, Social/Creator/Earned, Publicis", domain: "Agency", kind: "professional", created: true },
  { name: "Kunal Shah", role: "CRED founder → head of WhatsApp", domain: "Tech", kind: "professional", created: true },
  { name: "Mo Gawdat", role: "Ex-Google [X] CBO · author · AI", domain: "Tech", kind: "professional" },
  { name: "Josephus Allmond", role: "Virginia's first-ever Chief Energy Officer", domain: "Government", kind: "professional", created: true },
  { name: "Peter Diamandis", role: "Engineer · physician · founder (XPRIZE)", domain: "Science", kind: "professional" },
  { name: "Noubar Afeyan", role: "Inventor · founder · 100+ ventures (Flagship, Moderna)", domain: "Science", kind: "professional" },
  { name: "Nadir Godrej", role: "Business · science · poetry ('the Renaissance man')", domain: "Business", kind: "professional" },

  // --- researched wave (public figures, evidence-backed) ---
  // Creators who own their business
  { name: "MrBeast (Jimmy Donaldson)", role: "Owns ~half of Beast Industries (~$5B)", domain: "Consumer", kind: "creator" },
  { name: "Emma Chamberlain", role: "Founder & Co-CEO, Chamberlain Coffee", domain: "Consumer", kind: "creator" },
  { name: "Huda Kattan", role: "Bought back Huda Beauty to own it fully", domain: "Fashion & Brand", kind: "creator" },
  { name: "Marques Brownlee", role: "Owns his studio; board & equity at Ridge", domain: "Tech", kind: "creator" },
  { name: "Pieter Levels", role: "Solo owner of 40+ products, no VC", domain: "Tech", kind: "creator" },
  { name: "Jack Conte", role: "Co-founder & CEO, Patreon", domain: "Creator Economy", kind: "creator" },
  { name: "Colin & Samir", role: "Own an independent creator-economy media co.", domain: "Creator Economy", kind: "creator" },
  { name: "Alex Cooper", role: "Founder & CEO, Unwell Network", domain: "Media", kind: "creator" },
  { name: "Codie Sanchez", role: "Owns Contrarian Thinking + a business holdco", domain: "Finance", kind: "creator" },
  { name: "Gary Vaynerchuk", role: "Built VaynerX around 'GaryVee'", domain: "Agency", kind: "creator" },

  // Roles invented / built around them
  { name: "Alexandr Wang", role: "Meta's first-ever Chief AI Officer", domain: "AI", kind: "professional", created: true },
  { name: "Mustafa Suleyman", role: "CEO of Microsoft AI (invented division)", domain: "AI", kind: "professional", created: true },
  { name: "Cathy Hackl", role: "World's first Chief Metaverse Officer", domain: "AI", kind: "professional", created: true },
  { name: "Jane Gilbert", role: "World's first Chief Heat Officer, Miami-Dade", domain: "Government", kind: "professional", created: true },
  { name: "Darren Murph", role: "GitLab's first-ever Head of Remote", domain: "Business", kind: "professional", created: true },
  { name: "Linda Fisher", role: "World's first Chief Sustainability Officer (DuPont)", domain: "Science", kind: "professional", created: true },
  { name: "Jony Ive", role: "Apple's first-ever Chief Design Officer", domain: "Design", kind: "professional", created: true },

  // Founders-turned-operators / intrapreneurs
  { name: "Astro Teller", role: "Captain of Moonshots (CEO), X", domain: "Tech", kind: "professional", created: true },
  { name: "Marc Lore", role: "Walmart built US e-commerce around him", domain: "Business", kind: "professional", created: true },
  { name: "Shonda Rhimes", role: "Netflix built a multi-format apparatus around Shondaland", domain: "Media", kind: "professional", created: true },

  // Cannes / marketing institutions
  { name: "Simon Cook", role: "CEO, Cannes LIONS", domain: "Agency", kind: "professional" },
  { name: "Marc Pritchard", role: "Chief Brand Officer, P&G · Cannes icon", domain: "Fashion & Brand", kind: "professional" },

  // Polymaths (deep mastery across fields) — charted by their primary lens
  { name: "Reid Hoffman", role: "Founder · VC · author · podcaster", domain: "Venture", kind: "professional" },
  { name: "Fei-Fei Li", role: "AI scientist · founder (World Labs) · author", domain: "AI", kind: "professional" },
  { name: "Neri Oxman", role: "Design · materials science · founder (OXMAN)", domain: "Design", kind: "professional" },
  { name: "Brian May", role: "Queen · astrophysics PhD · publisher", domain: "Science", kind: "professional" },
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
