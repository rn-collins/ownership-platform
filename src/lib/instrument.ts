// The Ownership Index instrument (v0.2.0). The item bank is methodology data:
// every item is scored 0..5 via a behaviourally-anchored option list.
import type { DimensionKey, ItemId } from "./engine";

export interface Item { id: ItemId; q: string; options: string[]; } // options[score] = text, score 0..5
export interface Dimension { key: DimensionKey; name: string; items: Item[]; }

export const INSTRUMENT: Dimension[] = [
  { key: "audience", name: "Audience Ownership", items: [
    { id: "A1", q: "What share of your audience can you reach directly through a channel you own (such as an email list)?",
      options: ["None — no way to reach them off-platform.","Under 1% of my following.","Roughly 1 to 5%.","Roughly 5 to 15%.","Roughly 15 to 30%.","More than 30% — I can reach most of them directly."] },
    { id: "A2", q: "If your main platform account vanished tomorrow, what happens to your audience relationship?",
      options: ["It is gone. Total wipeout.","I keep a handful of contacts, no real channel.","I could reach a minority through owned channels.","I could reach a meaningful share and rebuild slowly.","I could reach most of them and rebuild in weeks.","Barely a dent. My owned channels carry the relationship."] },
    { id: "A3", q: "Where do your reach and revenue actually come from?",
      options: ["Almost entirely the algorithmic feed.","Overwhelmingly the feed, a little owned.","Mostly feed, some owned channels.","A roughly even split.","Mostly owned channels, some feed.","Overwhelmingly owned channels I control."] },
    { id: "A4", q: "Do you capture first-party data (emails, preferences, purchase history) on your audience?",
      options: ["None at all.","Almost none, ad hoc only.","A little, not used.","Some, lightly used.","A good amount, actively used.","Rich first-party data that drives what I do."] },
  ]},
  { key: "rights", name: "Content & Rights", items: [
    { id: "R1", q: "In a typical brand deal, what happens to the copyright in the content you make?",
      options: ["I assign all rights, perpetual and exclusive, for a flat fee.","I usually assign broad rights by default.","I grant broad rights but push back sometimes.","I grant limited rights on most deals.","I retain copyright as standard.","I retain copyright and license tightly, always."] },
    { id: "R2", q: "How long can a brand keep using the content you make for them?",
      options: ["Forever — usage never expires.","Effectively unlimited.","A long, loosely-defined window.","A defined period of a year or more.","A defined period under a year.","A short, specific window set on each deal."] },
    { id: "R3", q: "Do you own and make money from your back-catalogue of content?",
      options: ["I do not track or own it.","I own some but never use it.","I own it, occasionally reuse it.","I reuse it, no direct income.","I license or repurpose it for income sometimes.","My catalogue is an active, owned income line."] },
    { id: "R4", q: "Do you charge brands for usage rights and whitelisting (running your content as their ads)?",
      options: ["Never — it is reused for free.","Rarely.","Sometimes, inconsistently.","Often.","Usually.","On every deal where it applies."] },
  ]},
  { key: "revenue", name: "Revenue Ownership", items: [
    { id: "V1", q: "How many meaningful income streams do you have?",
      options: ["One.","Two.","Three.","Four.","Five.","Six or more."] },
    { id: "V2", q: "What share of your income comes from things you own (products, memberships, licensing) versus platform payouts and one-off brand fees?",
      options: ["Essentially none owned.","Under 10% owned.","Roughly 10 to 25% owned.","Roughly 25 to 50% owned.","Roughly 50 to 75% owned.","The majority is owned income."] },
    { id: "V3", q: "How much of your income is recurring (subscriptions, memberships, retainers)?",
      options: ["None. Everything is one-off.","A token amount.","Under a quarter.","Roughly a third.","Around half.","The majority is recurring."] },
    { id: "V4", q: "What share of your income depends on your single biggest client or platform?",
      options: ["Over 80% from one source.","Roughly 60 to 80%.","Roughly 40 to 60%.","Roughly 25 to 40%.","Roughly 15 to 25%.","Under 15%. Well diversified."] },
  ]},
  { key: "identity", name: "Identity & Likeness", items: [
    { id: "I1", q: "What legal protection do you hold over your name and brand?",
      options: ["None.","Handles secured on platforms only.","Handles plus key domains.","A trademark applied for.","A registered trademark.","Trademarks registered across relevant classes and monitored."] },
    { id: "I2", q: "Do your contracts control how your likeness and voice can be used?",
      options: ["No clauses at all.","Rarely addressed.","Basic likeness clause sometimes.","Likeness controlled on most deals.","Likeness and voice controlled as standard.","Fully controlled, licensed and priced every time."] },
    { id: "I3", q: "Do your agreements address AI and synthetic use of your likeness and voice (deepfakes, cloning, AI training)?",
      options: ["Never mentioned.","Vaguely, once or twice.","A basic clause occasionally.","Addressed on most new deals.","Explicit AI-use clauses by default.","AI, cloning and training terms specified on every new deal."] },
    { id: "I4", q: "Could you detect and act on someone misusing your face or voice?",
      options: ["No idea it was even happening.","I might notice by chance.","I would notice but could not act.","I could act slowly, no process.","I monitor and have a takedown route.","Active monitoring and a real enforcement path."] },
  ]},
  { key: "infra", name: "Business Infrastructure", items: [
    { id: "B1", q: "What legal business structure sits behind what you do?",
      options: ["No entity — just me personally.","Registered self-employed / sole trader.","A single registered company.","A company with a clear ownership structure.","A company with formal governance (board or advisers).","A structured group of entities (holding, IP, trading)."] },
    { id: "B2", q: "Do you work from your own contracts and templates?",
      options: ["No contracts, handshake deals.","Occasional, borrowed contracts.","A basic template I sometimes use.","My own contract for most work.","Standard contracts on everything.","A full, lawyer-reviewed contract suite."] },
    { id: "B3", q: "Who does the work beyond you (team, agency, delegation)?",
      options: ["Everything is me, alone.","Occasional freelance help.","One or two regular helpers.","A small team on core functions.","A team or agency running operations.","A real organisation; I focus on what only I can do."] },
    { id: "B4", q: "If you stopped for a month, what happens to the business?",
      options: ["It collapses immediately.","It stalls badly within days.","It limps along briefly.","It holds for a few weeks.","It runs largely without me.","It runs indefinitely; continuity is planned."] },
  ]},
];

// Why each dimension matters — the stakes, tied to the market and the law.
export const DIMENSION_WHY: Record<DimensionKey, string> = {
  audience: "An owned audience is the one asset a platform can't switch off. It is the line between a business and a following.",
  rights: "Rights are where creators quietly lose the most money. What you sign away, you cannot sell twice.",
  revenue: "Diversified, owned income is what survives an algorithm change or a lost account.",
  identity: "As AI clones voices and faces, legal control of your likeness moves from nice-to-have to core protection — and the law (NO FAKES Act, EU AI Act) is catching up now.",
  infra: "Infrastructure is what lets you step away without the business collapsing, and it is what a buyer actually pays for.",
};

// A concrete, imperative next move per scored item — the "do this" a creator can act on.
export const ITEM_ACTIONS: Record<string, string> = {
  A1: "Start capturing emails so you can reach your audience without a platform.",
  A2: "Move your most engaged followers onto a channel you own.",
  A3: "Shift a share of your effort to owned channels you control.",
  A4: "Begin collecting first-party data on your audience.",
  R1: "Stop assigning copyright by default — retain it and license instead.",
  R2: "Time-box and scope the usage rights you grant brands.",
  R3: "Catalogue and start licensing your back-catalogue.",
  R4: "Charge a usage or whitelisting fee when brands run your content.",
  V1: "Add a second and third income stream beyond the platform.",
  V2: "Build an owned product or membership you control.",
  V3: "Introduce recurring revenue — a subscription or retainer.",
  V4: "Reduce dependence on your single biggest client or platform.",
  I1: "Secure your handles and file a trademark on your name.",
  I2: "Add likeness and voice control clauses to your contracts.",
  I3: "Add explicit AI and cloning terms to every new deal.",
  I4: "Set up monitoring and a takedown route for misuse of your likeness.",
  B1: "Put a proper legal entity and clean finances in place.",
  B2: "Work from your own contract, not the brand's.",
  B3: "Delegate a core function so the business is not all you.",
  B4: "Build continuity so the business runs if you step away.",
};

export const OVERALL_COPY: Record<string, string> = {
  owned: "Your responses indicate substantial control across audience, rights, revenue, identity, and infrastructure. Review the individual dimensions because important dependencies may still remain.",
  building: "Your responses indicate meaningful control in several areas, with other parts of the work still dependent on platforms, clients, partners, or outside infrastructure.",
  rented: "Your responses indicate that several parts of the work depend on platforms, clients, brands, or infrastructure controlled elsewhere.",
  mercy: "Your responses indicate extensive dependence on platforms, clients, brands, or infrastructure controlled elsewhere. The dimensional profile shows where those dependencies are concentrated.",
};
