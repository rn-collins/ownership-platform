export type EditionMedia = {
  file: string;
  alt: string;
  caption: string;
  credit: string;
  rights: string;
};

export type CanonicalEdition = {
  number: "005" | "006" | "007" | "008";
  articleId: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  packages: readonly string[];
  beehiiv: string;
  reader: string;
  experience?: string;
  media: readonly EditionMedia[];
};

const media = (file: string, alt: string, caption: string, credit: string, rights: string): EditionMedia => ({ file, alt, caption, credit, rights });

export const cycleOneEditions: readonly CanonicalEdition[] = [
  {
    number: "005", articleId: 1, title: "The $2,000 Video", subtitle: "A creator deal is usually several decisions wearing one price tag",
    packages: ["P01", "P02", "P03"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-2000-video",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-005",
    experience: "https://institutions-of-one-reader.vercel.app/experiences/ownership-trail",
    media: [
      media("Rechnung Buntpapier-Fabrik Hennessen & Jansen M.-Gladbach 1903.jpg", "A decorated-paper factory invoice dated 1903, with itemized charges and factory letterhead", "The invoice records a price and transaction; it does not disclose every permission or ownership term.", "Deutsches Buch- und Schriftmuseum / Forschungsstelle Papiergeschichte", "Public domain"),
      media("Signing the agreement (10442537774).jpg", "Parties signing a written operating agreement", "A documented signing makes the parties, governing instrument, and moment of assent visible.", "Oregon Department of Transportation", "CC BY 2.0"),
      media("Video production workers in studio studying bank of monitors showing camera views.jpg", "Production workers studying a bank of studio monitors", "A working crew reveals the multiple contributors behind a finished deliverable.", "National Archives and Records Administration", "Public domain"),
      media("Graticule.jpg", "Animator’s translucent layout sheet with field guides and peg holes", "A working animation sheet identifies the production format and physical handoff behind a finished frame.", "Popolon", "CC BY-SA 4.0"),
      media("Group discusses storyboards.jpg", "Three colleagues review illustrated storyboards around a conference table", "A shared storyboard gives the first scope conversation a concrete object: the team can point to what will be made before pricing its uses.", "Bill Branson / National Cancer Institute, NIH", "Public domain"),
      media("Sales contract Shuruppak Louvre AO3766.jpg", "A Sumerian clay tablet recording the sale of a field and house", "A deal record preserves the exchange outside anyone’s memory—even when the medium changes.", "Marie-Lan Nguyen / Louvre Museum", "Public domain"),
      media("PixelMusica - Video Production Team.jpg", "Video production team working together", "A production team demonstrates why deal records must identify people, roles, files and obligations.", "PixelMusica", "CC BY-SA 4.0"),
    ],
  },
  {
    number: "006", articleId: 2, title: "The Person Inside the Asset", subtitle: "A finished post can contain a copyrighted work, a performance, an identity, and a future edit.",
    packages: ["P04", "P05", "P06", "P07"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-person-inside-the-asset",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-006",
    media: [
      media("Moviola Model D (MOMI).jpg", "A 1927 Moviola film-editing machine with viewing and microscope attachments", "The editing apparatus makes alteration a separate production act, not an invisible extension of permission to post.", "HaeB / Museum of the Moving Image", "CC BY-SA 4.0"),
      media("WLA LACMA label.jpg", "A museum accession-number label photographed at LACMA", "A label identifies and credits an object; by itself, it is not a permission record.", "Allison Agsten / LACMA", "Public domain"),
      media("Vocal recording setup & IYE - Studio B, In Your Ear Studios.jpg", "Voice-over recording setup in a professional studio", "A voice recording setup separates the performer, recording, equipment, and later uses carried inside one asset.", "Will Fisher", "CC BY-SA 2.0"),
      media("Camera crew setting everything up.jpg", "Camera crew preparing equipment on location", "The crew and equipment make the chain of contribution visible before publication.", "Wikimedia Commons contributor", "CC BY-SA 4.0"),
      media("Hardenstein 2014 -- Model Release.png", "Completed model-release document", "A model release is a distinct record of likeness consent, not a substitute for copyright ownership.", "Wikimedia Commons contributor", "CC BY-SA 4.0"),
      media("Camera_crew_Brielle.JPG", "A location camera crew works around a mounted cinema camera", "The crew makes the people, equipment and production roles inside one finished asset visible.", "Peter van der Sluijs via Wikimedia Commons", "CC BY-SA 3.0"),
    ],
  },
  {
    number: "007", articleId: 3, title: "The Asset’s Afterlife", subtitle: "The file did not change. Its commercial life did.",
    packages: ["P08", "P09", "P10", "P11", "P12"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-assets-afterlife",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-007",
    experience: "https://institutions-of-one-reader.vercel.app/experiences/asset-afterlife", media: [],
  },
  {
    number: "008", articleId: 4, title: "The Smallest Institution in the Campaign", subtitle: "One post can contain an entire organization.",
    packages: ["P13", "P14"], beehiiv: "https://polymath-rn-collins.beehiiv.com/p/the-smallest-institution-in-the-campaign",
    reader: "https://institutions-of-one-reader.vercel.app/stories/edition-008",
    experience: "https://institutions-of-one-reader.vercel.app/experiences/health-check",
    media: [
      media("Carl Urbano working on a storyboard, 1967.jpg", "Production supervisor Carl Urbano works over a storyboard in 1967", "The storyboard turns scattered production decisions into a visible sequence; the system exists in the relationships among them.", "Steve Fontanini / Los Angeles Times Photographic Collection at UCLA", "CC BY 4.0"),
      media("Asana Data workflow.jpg", "Data workflow documented in Asana", "A production workflow turns decisions into inspectable assignments and dependencies.", "John Cummings", "CC BY-SA 4.0"),
      media("Filming production.jpg", "Crew filming a production on location", "A production set shows multiple roles working from one coordinated plan.", "Yemi Festus", "CC BY-SA 4.0"),
      media("35MM ARC Lamp, Film Projector, Sound Mixer.jpg", "Film projector, arc lamp, and sound mixer in a studio collection", "Separate technical systems make the production chain visible as more than a single file.", "Nilanjan19", "CC BY-SA 4.0"),
      media("My Fair Brady production crew photo Don Ramey Logan.jpg", "Television production crew posed together", "A crew makes the people responsible for building and carrying the work visible.", "Don Ramey Logan", "CC BY-SA 3.0"),
      media("5.1 mixing room for Radio, TV, and Film production, equipt with AVID Pro Tools including ICON D-Command - Control Room B, In Your Ear Studios.jpg", "Audio post-production control room with mixing console", "The mixing room documents a specialized handoff in the post-production workflow.", "In Your Ear Studios", "CC BY-SA 3.0"),
      media("OLUWAFEMI JONATHAN.jpg", "Camera editor working with production equipment", "A named production specialist represents accountable authorship inside a collaborative system.", "Oluwafemi Jonathan", "CC BY-SA 4.0"),
    ],
  },
] as const;

export const editionByNumber = (number: string) => cycleOneEditions.find((edition) => edition.number === number);
export const packageGalleryUrl = (id: string) => `https://institutions-of-one-reader.vercel.app/production/cycle-01/${id.toLowerCase()}`;
export const commonsImageUrl = (file: string) => `https://institutions-of-one-reader.vercel.app/api/commons-image?file=${encodeURIComponent(file)}&width=1600`;
export const commonsSourceUrl = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
