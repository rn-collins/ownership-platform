// Seed roster for The Observatory — real people from research, so the map and the
// show roster are alive before any backend data. Live Guests/Nominations layer on
// top once Supabase is wired. Plain module (no "use client") so server components
// can import it too.

export type Node = {
  name: string;
  role: string;
  domain: string;
  kind: "professional" | "polymath";
  created?: boolean;
};

export const SEED: Node[] = [
  { name: "Suzie Reider", role: "Founded YouTube's revenue org", domain: "Media", kind: "professional", created: true },
  { name: "Kenny Gold", role: "First-ever Global Chief Creator Officer, Edelman", domain: "Media", kind: "professional", created: true },
  { name: "Steven Bartlett", role: "Entrepreneur · investor · #1 podcaster", domain: "Media", kind: "polymath" },
  { name: "Ashley Rudder", role: "Chief Creator Officer, Whalar", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Gordon Glenister", role: "Founded the BCMA influence division", domain: "Creator Economy", kind: "professional", created: true },
  { name: "Claire Zau", role: "First creator-investor partner, Lightspeed", domain: "Venture", kind: "professional", created: true },
  { name: "Brad Keywell", role: "Entrepreneur · investor · artist · professor", domain: "Venture", kind: "polymath" },
  { name: "Klitos Teklos", role: "First-ever Chief Brand Officer, Tory Burch", domain: "Fashion & Brand", kind: "professional", created: true },
  { name: "Charlotte Tansill", role: "New President, Social/Creator/Earned, Publicis", domain: "Agency", kind: "professional", created: true },
  { name: "Kunal Shah", role: "CRED founder → head of WhatsApp", domain: "Tech", kind: "professional", created: true },
  { name: "Mo Gawdat", role: "Ex-Google [X] CBO · author · AI", domain: "Tech", kind: "polymath" },
  { name: "Josephus Allmond", role: "Virginia's first-ever Chief Energy Officer", domain: "Government", kind: "professional", created: true },
  { name: "Peter Diamandis", role: "Engineer · physician · founder (XPRIZE)", domain: "Science", kind: "polymath" },
  { name: "Noubar Afeyan", role: "Inventor · founder · 100+ ventures (Flagship, Moderna)", domain: "Science", kind: "polymath" },
  { name: "Nadir Godrej", role: "Business · science · poetry ('the Renaissance man')", domain: "Business", kind: "polymath" },
];

export const OBSERVATORY_DOMAINS = [
  "Media", "Creator Economy", "Fashion & Brand", "Venture", "Agency", "Tech", "Government", "Science", "Business",
];
