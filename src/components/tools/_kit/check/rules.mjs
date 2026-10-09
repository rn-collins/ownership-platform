// House-voice rules (design 7.4 and 2.6 item 5) as data. Each rule: id, severity, test(text) -> array of matched snippets.
// Used by voice-lint.mjs on spec strings, on rendered HTML text, and on files.
const MONTH = 'January|February|March|April|May|June|July|August|September|October|November|December';
const MON_ABBR = 'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec';

// Official names that may keep a spelling or punctuation the rules would otherwise flag.
export const OFFICIAL_NAMES = [
  'International Labour Organization', 'International Labour Office', 'Digital Labour Platforms', 'Digital labour platforms', 'digital labour platforms', 'Labour Organization',
  'Yahoo!', 'Jeopardy!',
];

export const ALLOWED_HASHTAGS = new Set(['renaissancex2m3', 'rn_collins', 'rncollins', 'TechFromHere', 'InstitutionsOfOne', 'ThePolymath']);

const BRITISH = /\b(colour|colours|coloured|labour|labours|programme|programmes|centre|centres|favour|favours|favourite|behaviour|behaviours|organisation|organisations|organise|organised|organising|recognise|recognised|analyse|analysed|catalogue|catalogues|grey|travelled|travelling|licence|licences|defence|offence|practise|practised|judgement|whilst|towards|amongst|artefact|artefacts|fibre|litre|metre|metres|neighbour|neighbours|honour|honours|honoured|realise|realised|summarise|summarised|minimise|prioritise|utilise|cheque|tyre|storey|mould|plough|sceptical|ageing|enrol|fulfil)\b/gi;

const find = (re, text) => { const out = []; let m; const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'); while ((m = r.exec(text))) { out.push(m[0]); if (m.index === r.lastIndex) r.lastIndex++; } return out; };

export const RULES = [
  { id: 'em-dash', severity: 'error', why: 'No em dash. Use a period, comma or colon.', test: t => find(/[—―]/, t) },
  { id: 'dash-connector', severity: 'error', why: 'No spaced en dash or hyphen used as a dash.', test: t => find(/ [–-] /, t) },
  { id: 'exclamation', severity: 'error', why: 'No exclamation marks except inside official names.', test: t => find(/!/, t) },
  {
    id: 'not-x-its-y', severity: 'error', why: 'No "not X, it\'s Y" contrast. State the affirmative.',
    test: t => find(/\b(?:not|isn[’']t|aren[’']t|wasn[’']t|doesn[’']t)\b[^.!?\n:]{1,70}?[,;]\s+(?:it[’']s|it is|that[’']s|this is|but|they[’']re|he[’']s|she[’']s|rather)\b/i, t),
  },
  { id: 'british-spelling', severity: 'error', why: 'American spelling.', test: t => find(BRITISH, t) },
  { id: 'iso-date', severity: 'error', why: 'Dates read "Month D, YYYY", never ISO.', test: t => find(/\b\d{4}-\d{2}-\d{2}\b/, t) },
  {
    id: 'date-format', severity: 'error', why: 'Dates read "Month D, YYYY".',
    test: t => [
      ...find(new RegExp(`\\b\\d{1,2}\\s+(?:${MONTH})\\s+\\d{4}\\b`), t),
      ...find(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/, t),
      ...find(new RegExp(`\\b(?:${MON_ABBR})\\.? \\d{1,2},? \\d{4}\\b`), t),
      ...find(new RegExp(`\\b(?:${MONTH}) \\d{1,2} \\d{4}\\b`), t),
    ],
  },
  { id: 'lawyer', severity: 'error', why: 'RN is never called a lawyer, and tools do not give legal advice.', test: t => find(/\b(?:lawyers?|attorneys?|legal advis[eo]rs?|solicitors?)\b/i, t) },
  { id: 'credential', severity: 'error', why: 'Tools never carry credential text. They carry "By RN Collins" and a link to About.', test: t => find(/\b(?:Northeastern|J\.D\.|Juris Doctor|law student|anatomist|medical educator|Esq\.)/i, t) },
  { id: 'purpose-built', severity: 'error', why: 'Plain labels: not "purpose-built".', test: t => find(/purpose-built/i, t) },
  { id: 'facebook', severity: 'error', why: 'No Facebook or Snapchat content.', test: t => find(/\b(?:facebook|snapchat)\b/i, t) },
  { id: 'email', severity: 'error', why: 'No email addresses anywhere.', test: t => find(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/, t) },
  {
    id: 'hashtag', severity: 'error', why: 'Only the approved tags may appear.',
    test: t => find(/(?<![\w&/#"'=])#([A-Za-z][\w]*)/, t).filter(h => !ALLOWED_HASHTAGS.has(h.slice(1))),
  },
  {
    id: 'workflow-language', severity: 'error', why: 'No workflow language on public pages.',
    test: t => [
      ...find(/\b(?:round (?:one|two|three)|counsel (?:check|context|required|note|review|workflow|annotation)|before (?:legal )?publication|internal (?:note|status|process|workflow)|release[- ]?state|rights[- ]?freeze|retained[- ]?note|test[- ]?bench|comparison candidate|future roadmap|TODO|TBD|lorem ipsum)\b/i, t),
      ...find(/quarterly (?:QA|review|checks?|topical review|eligibility review)/i, t),
    ],
  },
  {
    id: 'ai-tell', severity: 'error', why: 'Anti-AI-tell hard bans.',
    test: t => find(/\b(?:straightforward|genuinely|importantly|it[’']s worth noting|delve|delves|delving|leverage[sd]?|leveraging|tapestry|mosaic|nuanced|robust)\b|in today[’']s (?:landscape|world|environment|climate)/i, t),
  },
  { id: 'hype', severity: 'error', why: 'No hype words.', test: t => find(/\b(?:revolutionary|powerful|unlock|seamless|cutting-edge|game-changing|amazing)\b/i, t) },
  { id: 'okina', severity: 'warn', why: 'Hawaiʻi keeps its ʻokina outside official names and addresses.', test: t => find(/\bHawaii\b(?! Revised| Tech Week| Standard| War)/, t) },
];

/** Removes official names (and per-spec exceptions) so the rules do not fire inside them. */
export function maskOfficial(text, extra = []) {
  let t = text;
  for (const n of [...OFFICIAL_NAMES, ...extra]) t = t.split(n).join(' '.repeat(Math.min(n.length, 1)));
  return t;
}
