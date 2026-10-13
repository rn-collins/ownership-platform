// The release rule, in one place for next.config.mjs, the unit tests, src/lib/releases.ts and the build scripts.
// A record is released when releasedAt (a YYYY-MM-DD date in Pacific/Honolulu) is today or earlier and hold is false.
// An empty releasedAt means unreleased. Plain JavaScript with no imports so every caller can load it.

export const RELEASE_TIMEZONE = "Pacific/Honolulu";

/** Today's date in Hawaii as YYYY-MM-DD. */
export function todayInHawaii(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: RELEASE_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export const isIsoDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s ?? "");

/** True when the record is released on `today`. */
export function isReleasedRecord(record, today) {
  return Boolean(record) && record.hold === false && isIsoDate(record.releasedAt) && record.releasedAt <= today;
}

/** Review renders show held pieces for checking by eye. They need CYCLE01_RENDER_FREEZE=1 or RELEASE_REVIEW=1 and never apply in production. */
export function reviewRenderFor(env) {
  if (env.VERCEL_ENV === "production") return false;
  return env.CYCLE01_RENDER_FREEZE === "1" || env.RELEASE_REVIEW === "1";
}

/**
 * Ids that are public for a build on `today`: released pieces (every piece in a review render) and released visual stories.
 * Only this list reaches browser code, so nothing about a held piece is sent to the browser.
 */
export function publicIds(releases, today, review = false) {
  return [
    ...releases.pieces.filter((p) => review || isReleasedRecord(p, today)).map((p) => p.id),
    ...releases.related.filter((r) => isReleasedRecord(r, today)).map((r) => r.id),
  ];
}
