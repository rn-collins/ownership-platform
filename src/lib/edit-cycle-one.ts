export type EditionMedia = {
  file: string;
  alt: string;
  caption: string;
  credit: string;
  rights: string;
  /** Intrinsic pixel size of the image served by commonsImageUrl(file) - reserves layout space before load. */
  width: number;
  height: number;
};

export type CanonicalEdition = {
  number: "005" | "006" | "007" | "008" | "009";
  articleId: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  /** Reader-facing publication month, e.g. "August 2026". */
  published: string;
  packages: readonly string[];
  /** Omit until the edition is published on Beehiiv; the web page then hides the link. */
  beehiiv?: string;
  reader: string;
  experience?: string;
  media: readonly EditionMedia[];
  gated?: boolean;
};

const media = (file: string, alt: string, caption: string, credit: string, rights: string, width: number, height: number): EditionMedia => ({ file, alt, caption, credit, rights, width, height });

export const cycleOneEditions: readonly CanonicalEdition[] = [
  {
    gated: false,
    number: "005", articleId: 1, published: "August 2026", title: "The $2,000 Video", subtitle: "A creator deal is usually several decisions wearing one price tag",
    packages: ["P01", "P02", "P03"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-2000-video",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-005",
    experience: "https://institutions-of-one-reader.vercel.app/experiences/ownership-trail",
    media: [
      media("Rechnung Buntpapier-Fabrik Hennessen & Jansen M.-Gladbach 1903.jpg", "A decorated-paper factory invoice dated 1903, with itemized charges and factory letterhead", "The invoice records a price and transaction; it does not disclose every permission or ownership term.", "Deutsches Buch- und Schriftmuseum / Forschungsstelle Papiergeschichte", "Public domain", 1920, 2486),
      media("Signing the agreement (10442537774).jpg", "Parties signing a written operating agreement", "A documented signing makes the parties, governing instrument, and moment of assent visible.", "Oregon Department of Transportation", "CC BY 2.0", 1920, 1278),
      media("Video production workers in studio studying bank of monitors showing camera views.jpg", "Production workers studying a bank of studio monitors", "A working crew reveals the multiple contributors behind a finished deliverable.", "Ryan Hagerty, U.S. Fish and Wildlife Service, via Public-domain-image.com (date not given)", "Public domain (U.S. federal government work)", 1920, 1301),
      media("Graticule.jpg", "Animator’s translucent layout sheet with field guides and peg holes", "A working animation sheet identifies the production format and physical handoff behind a finished frame.", "Popolon", "CC BY-SA 4.0", 1920, 1354),
      media("Group discusses storyboards.jpg", "Three colleagues review illustrated storyboards around a conference table", "A shared storyboard gives the first scope conversation a concrete object: the team can point to what will be made before pricing its uses.", "Bill Branson / National Cancer Institute, NIH", "Public domain", 1920, 1280),
      media("Sales contract Shuruppak Louvre AO3766.jpg", "A Sumerian clay tablet recording the sale of a field and house", "A deal record preserves the exchange outside anyone’s memory—even when the medium changes.", "Marie-Lan Nguyen / Louvre Museum", "Public domain", 1800, 1700),
      media("PixelMusica - Video Production Team.jpg", "Video production team working together", "A production team demonstrates why deal records must identify people, roles, files and obligations.", "Le Martel, 2022-03-23 (PixelMusica video production team)", "CC BY-SA 4.0", 1920, 1280),
    ],
  },
  {
    gated: false,
    number: "006", articleId: 2, published: "August 2026", title: "The Person Inside the Asset", subtitle: "A finished post can contain a copyrighted work, a performance, an identity, and a future edit.",
    packages: ["P04", "P05", "P06", "P07"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-person-inside-the-asset",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-006",
    media: [
      media("Moviola Model D (MOMI).jpg", "A 1927 Moviola film-editing machine with viewing and microscope attachments", "The editing apparatus makes alteration a separate production act, not an invisible extension of permission to post.", "HaeB / Museum of the Moving Image", "CC BY-SA 4.0", 1920, 2880),
      media("WLA LACMA label.jpg", "A museum accession-number label photographed at LACMA", "A label identifies and credits an object; by itself, it is not a permission record.", "Allison Agsten / LACMA", "Public domain", 1920, 1440),
      media("Vocal recording setup & IYE - Studio B, In Your Ear Studios.jpg", "Voice-over recording setup in a professional studio", "A voice recording setup separates the performer, recording, equipment, and later uses carried inside one asset.", "Will Fisher", "CC BY-SA 2.0", 1920, 1280),
      media("Camera crew setting everything up.jpg", "Camera crew preparing equipment on location", "The crew and equipment make the chain of contribution visible before publication.", "Nirvana Studios - Custom Circus, 2026-02-19", "CC BY 4.0", 1920, 1280),
      media("Hardenstein 2014 -- Model Release.png", "Completed model-release document", "A model release is a distinct record of likeness consent, not a substitute for copyright ownership.", "RalfHuels, based on a template by Joi Ito, 2014-04-19", "CC BY 3.0", 826, 1169),
      media("Camera_crew_Brielle.JPG", "A location camera crew works around a mounted cinema camera", "The crew makes the people, equipment and production roles inside one finished asset visible.", "Peter van der Sluijs via Wikimedia Commons", "CC BY-SA 3.0", 1600, 1067),
    ],
  },
  {
    gated: false,
    number: "007", articleId: 3, published: "August 2026", title: "The Asset’s Afterlife", subtitle: "The file did not change. Its commercial life did.",
    packages: ["P08", "P09", "P10", "P11", "P12"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-assets-afterlife",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-007",
    experience: "https://institutions-of-one-reader.vercel.app/experiences/asset-afterlife", media: [],
  },
  {
    gated: false,
    number: "008", articleId: 4, published: "August 2026", title: "The Smallest Institution in the Campaign", subtitle: "One post can contain an entire organization.",
    packages: ["P13", "P14", "P16"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-smallest-institution-in-the-campaign",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-008",
    experience: "https://institutions-of-one-reader.vercel.app/experiences/health-check",
    media: [
      media("Carl Urbano working on a storyboard, 1967.jpg", "Production supervisor Carl Urbano works over a storyboard in 1967", "The storyboard turns scattered production decisions into a visible sequence; the system exists in the relationships among them.", "Steve Fontanini / Los Angeles Times Photographic Collection at UCLA", "CC BY 4.0", 1920, 2359),
      media("Asana Data workflow.jpg", "Data workflow documented in Asana", "A production workflow turns decisions into inspectable assignments and dependencies.", "John Cummings", "CC BY-SA 4.0", 1920, 577),
      media("Filming production.jpg", "Crew filming a production on location", "A production set shows multiple roles working from one coordinated plan.", "Yemi Festus", "CC BY-SA 4.0", 1920, 1280),
      media("35MM ARC Lamp, Film Projector, Sound Mixer.jpg", "Film projector, arc lamp, and sound mixer in a studio collection", "Separate technical systems make the production chain visible as more than a single file.", "Nilanjan19", "CC BY-SA 4.0", 1920, 1440),
      media("My Fair Brady production crew photo Don Ramey Logan.jpg", "Television production crew posed together", "A crew makes the people responsible for building and carrying the work visible.", "Don Ramey Logan", "CC BY-SA 3.0", 1920, 1348),
      media("5.1 mixing room for Radio, TV, and Film production, equipt with AVID Pro Tools including ICON D-Command - Control Room B, In Your Ear Studios.jpg", "Audio post-production control room with mixing console", "The mixing room documents a specialized handoff in the post-production workflow.", "Will Fisher, 2014-11-26", "CC BY-SA 2.0", 1920, 1280),
      media("OLUWAFEMI JONATHAN.jpg", "Camera editor working with production equipment", "A named production specialist represents accountable authorship inside a collaborative system.", "Oluwafemi Jonathan", "CC BY-SA 4.0", 1920, 1280),
    ],
  },
  // Counsel review for P15/P16/P17 completed and all three were signed off 2026-09-24.
  {
    gated: false,
    number: "009", articleId: 5, published: "September 2026", title: "All Media, Now Known or Hereafter Devised", subtitle: "One clause in a contract can decide who controls tomorrow's use of today's video",
    packages: ["P15", "P17"],
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-009",
    // Reuses the same verified Commons photos already cleared for P15/P17's carousel slides
    // (institutions-of-one-reader's data/cycle01/render-inputs/live-gallery/p15-*.json,
    // p17-*.json) rather than sourcing fresh images.
    media: [
      media("Signing ceremony (14443611224).jpg", "Formal signing ceremony with participants gathered around a written agreement", "A signature is the moment a negotiated boundary becomes a governing document—the question is always what boundary it actually states.", "Foreign and Commonwealth Office, 2014-06-17", "CC BY 2.0", 1920, 1280),
      media("Signed and witness partnership agreement Wellcome L0040613.jpg", "A signed and witnessed partnership agreement", "The license-versus-transfer distinction lives in writing like this, not in the price paid or the file delivered.", "Wellcome Library, London", "CC BY 4.0", 1920, 2361),
      media("Agreement signed F. Desloge, November 22, 1883.jpg", "An 1883 agreement with a clause crossed out and rewritten by hand", "A word struck through and replaced is the physical record of a boundary being negotiated—the same negotiation a broad, unread clause skips.", "Firmin Desloge Jr. / Missouri History Museum", "Public domain", 1920, 2948),
      media("Michael D. Antonovich filming Senatorial campaign ad at the California-Mexican border, 1986.jpg", "A 1986 campaign advertisement being filmed on location", "A campaign-specific ad is a bounded deliverable, made for one race, one moment—the opposite of a grant that outlives it.", "Los Angeles Times via UCLA Library Los Angeles Times Photographic Collection", "CC BY 4.0", 1920, 1385),
    ],
  },
] as const;

export const editionByNumber = (number: string) => cycleOneEditions.find((edition) => edition.number === number);

/** Minimal listing record shared by the hand-built editions (001-004) and the cycle-one editions. */
export type EditionListing = { number: string; title: string; subtitle: string; published: string };

/** Editions 001-004 are hand-built pages under src/app/edit/00N; their listing data lives here so the index and sitemap derive from one list. */
export const earlyEditions: readonly EditionListing[] = [
  { number: "001", published: "July 2026", title: "When Does One Person Become an Institution?", subtitle: "What does a person have to build, carry, and control before their work begins to function like an institution?" },
  { number: "002", published: "July 2026", title: "Your Career Has a Supply Chain", subtitle: "Dependence is unavoidable. The danger is a dependency you cannot see, replace, negotiate with, or survive without." },
  { number: "003", published: "August 2026", title: "Your Archive Is Not a Backup", subtitle: "An export can preserve the objects you made while losing the operating memory that made them useful." },
  { number: "004", published: "August 2026", title: "The Exit Is Part of the Architecture", subtitle: "The right to download the parts is not the same as a path for the work to continue somewhere else." },
];

/** Every publicly visible edition, oldest first. Gated cycle-one editions are excluded unless the render freeze is on. */
export const publicEditions = (): EditionListing[] => {
  const freezeRender = process.env.CYCLE01_RENDER_FREEZE === "1";
  return [...earlyEditions, ...cycleOneEditions.filter((e) => !e.gated || freezeRender)];
};

/** Reader-facing titles of the Public Reader visual stories (institutions-of-one-reader /production/cycle-01/pNN). */
const packageTitles: Record<string, string> = {
  P01: "The $35 invoice", P02: "What does ‘buy’ mean?", P03: "The source-file question",
  P04: "Permission to post is not permission to change", P05: "Credit is not clearance", P06: "The person inside the asset",
  P07: "Paid work is not automatically work made for hire", P08: "Partnership Ads / Spark Ads", P09: "YouTube Embed / Big Buck Bunny",
  P10: "The notice must be real", P11: "What Menu Heist actually was", P12: "The podium and the flag",
  P13: "The brief is an operating system", P14: "Many roles, visible collaborators", P15: "License or buyout?",
  P16: "An audience can become a company", P17: "All media, now known or later developed",
  P18: "Portable capacity, one continuing client", P19: "A name above the title is not the institution",
  P20: "Institution-building without personal ownership", P21: "When attention becomes a supply chain",
  P22: "Capability that travels, systems that stay", P23: "Direct operation, no employer of record",
  P24: "Portability and distribution are not the same thing", P25: "Multi-format is not multi-supplier",
  P26: "Scale can hide fragility", P27: "One person’s escape route, another’s infrastructure",
  P28: "Objects", P29: "Context and rights", P30: "Relationships", P31: "Routines and recovery",
  P32: "Transfer", P33: "Redirect", P34: "Export and rebuild",
};
export const packageTitle = (id: string) => packageTitles[id] ?? "Visual story";
export const packageGalleryUrl = (id: string) => `https://institutions-of-one-reader.vercel.app/production/cycle-01/${id.toLowerCase()}`;
export const commonsImageUrl = (file: string) => `https://institutions-of-one-reader.vercel.app/api/commons-image?file=${encodeURIComponent(file)}&width=1600`;
export const commonsSourceUrl = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
