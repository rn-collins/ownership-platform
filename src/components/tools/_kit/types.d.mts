// Types for tool-spec/1 and its neighbors. The schema in schema/tool-spec-1.json is the source of truth.
export type Basis = 'story' | 'source' | 'dataset' | 'arithmetic' | 'simulation' | 'editorial' | 'input' | 'rule';
export type Approval = 'approved' | 'needs-rn';
export interface Source {
  id: string; kind: 'story' | 'primary' | 'institutional' | 'dataset' | 'image' | 'derived'; title: string; publisher: string;
  date?: string; accessed?: string; url: string; archiveUrl?: string | null; supports: string; doesNotSupport?: string;
  quote?: string; locator?: string; license?: { label: string; deedUrl?: string }; check: 'verified' | 'blocked' | 'needs-lookup';
  status: Approval; recordId?: string; why?: string;
}
export interface Claim {
  id: string; text: string; basis: Basis; sourceIds: string[]; status: Approval; storyQuote?: string; derivation?: string;
  check?: { fn: string; args?: unknown; expect: unknown }; assumptions?: string[]; why?: string;
}
export interface ResultLine { text: string; basis?: Basis }
export interface ToolSpec {
  schema: 'tool-spec/1'; id: string; slug: string; site: 'htw' | 'ioo-reader' | 'ioo-main'; program: 'TFH' | 'IOO'; release: 'draft' | 'review' | 'public';
  mechanic: string; title: string; question: string;
  promise: { learn: string[]; minutes: number; leaveWith: string; privacy: string };
  origin: { kind: 'story' | 'edition' | 'site'; id: string; title: string; path: string; package?: { carouselZip?: string; linkedinPdf?: string; pin?: string }; live?: { beehiiv?: string | null; linkedin?: string | null; pinterest?: string | null }; liveChecked?: string };
  sources: Source[]; claims: Claim[];
  limits: { shows: (string | { text: string; status: Approval; why?: string })[]; doesNotShow: (string | { text: string; status: Approval; why?: string })[]; notAdvice?: boolean };
  states?: { id: string; label: string; claimIds: string[]; status: Approval }[];
  share: { text: boolean; link: 'fragment' | 'never'; image: boolean; print: boolean; files: ('txt' | 'csv')[] };
  card: { name: string; sourceShort: string; urlShort?: string };
  data: Record<string, any>;
  review: { culturalReview?: 'not-required' | 'required-pending' | 'confirmed-by-rn'; culturalNote?: string; rnReview: string[] };
  og: { image: string; alt: string };
  voiceExceptions?: { text: string; reason: string }[];
}
export interface RelatedItem { id?: string; kind: string; title: string; url: string; reason: string; site: string; strength?: 'hard' | 'soft'; cross?: boolean }
export interface Crumb { label: string; href: string }
export interface SiteLinks { about?: string; mistake?: string }
export interface ToolProps { spec: ToolSpec; related?: RelatedItem[]; crumbs?: Crumb[]; siteLinks?: SiteLinks }
