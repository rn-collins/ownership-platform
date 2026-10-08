import { editionDates, longDate } from "@/lib/publication-dates";

/** Byline and dates under an edition title (DEC-18). An edition with no Beehiiv date shows the byline only. */
export function EditionDateline({ number }: { number: string }) {
  const d = editionDates(number);
  return <div className="edition-dateline">
    <p className="edition-byline">By RN Collins</p>
    {d && <p className="edition-dates">
      <span>Published <time dateTime={d.published}>{longDate(d.published)}</time></span>
      {d.modified && <span>Updated <time dateTime={d.modified}>{longDate(d.modified)}</time></span>}
      <span>Last checked: <time dateTime={d.lastChecked}>{longDate(d.lastChecked)}</time></span>
    </p>}
  </div>;
}
