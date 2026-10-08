import raw from "./publication-dates.json";

// Byline dates for edition pages (ledger ALL-014, RN Collins' decision DEC-18, October 8, 2026).
// publication-dates.json holds only what each edition's own Beehiiv post page states. An edition without
// an entry (009) shows the byline and nothing else. "Last checked" is a data field RN can change by hand.
type Entry = { published: string; modified: string; beehiiv: string };
const editions = raw.editions as Record<string, Entry | undefined>;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-09-24" to "September 24, 2026". */
export const longDate = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}` : "";
};
/** "2026-09-24" to "September 2026". */
export const monthYear = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-/.exec(iso || "");
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : "";
};

export const lastChecked = () => raw.lastChecked as string;

/** number is "005". Returns null when the edition has no Beehiiv date. `modified` is "" when it equals the published day. */
export function editionDates(number: string) {
  const e = editions[number];
  if (!e || !e.published) return null;
  return { published: e.published, modified: e.modified && e.modified !== e.published ? e.modified : "", lastChecked: lastChecked() };
}

/** The month shown in the eyebrow and the edition list: the Beehiiv post's month where there is one, otherwise the fallback. */
export const editionMonth = (number: string, fallback: string) => {
  const d = editionDates(number);
  return d ? monthYear(d.published) : fallback;
};

/** Open Graph article times for generateMetadata / metadata. Empty when the edition has no date. */
export const ogArticleTimes = (number: string) => {
  const d = editionDates(number);
  return d ? { publishedTime: d.published, ...(d.modified ? { modifiedTime: d.modified } : {}) } : {};
};
