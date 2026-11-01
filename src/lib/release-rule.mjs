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

/**
 * RN Collins release pause (RN, Oct 30, 2026): no piece or visual story opens on its own until every RN Collins content
 * package is complete. While on is true, only the ids in live (the records live on pausedOn) can be released, whatever
 * data/releases.json says, so a push, a manual run of the daily release workflow or a later build date opens nothing
 * new. data/releases.json and its dates are unchanged. To undo, set on to false.
 */
export const RELEASE_PAUSE = Object.freeze({
  on: true,
  pausedOn: "2026-11-01",
  by: "RN Oct 30",
  live: Object.freeze([
    "ioo/c01-p01",
    "ioo/case-alex-cooper",
    "ioo/case-alexandr-wang",
    "ioo/case-ashley-rudder",
    "ioo/case-astro-teller",
    "ioo/case-brad-keywell",
    "ioo/case-brian-may",
    "ioo/case-cathy-hackl",
    "ioo/case-charlotte-tansill",
    "ioo/case-claire-zau",
    "ioo/case-codie-sanchez",
    "ioo/case-colin-samir",
    "ioo/case-darren-murph",
    "ioo/case-emma-chamberlain",
    "ioo/case-fei-fei-li",
    "ioo/case-gary-vaynerchuk",
    "ioo/case-gordon-glenister",
    "ioo/case-huda-kattan",
    "ioo/case-jack-conte",
    "ioo/case-jane-gilbert",
    "ioo/case-jony-ive",
    "ioo/case-josephus-allmond",
    "ioo/case-kenny-gold",
    "ioo/case-klitos-teklos",
    "ioo/case-kunal-shah",
    "ioo/case-linda-fisher",
    "ioo/case-marc-lore",
    "ioo/case-marc-pritchard",
    "ioo/case-marques-brownlee",
    "ioo/case-mo-gawdat",
    "ioo/case-mrbeast",
    "ioo/case-mustafa-suleyman",
    "ioo/case-nadir-godrej",
    "ioo/case-neri-oxman",
    "ioo/case-noubar-afeyan",
    "ioo/case-peter-diamandis",
    "ioo/case-pieter-levels",
    "ioo/case-reid-hoffman",
    "ioo/case-shonda-rhimes",
    "ioo/case-simon-cook",
    "ioo/case-steven-bartlett",
    "ioo/case-suzie-reider",
    "ioo/edit-001",
    "ioo/edit-002",
    "ioo/edit-003",
    "ioo/edit-004",
    "ioo/edit-005",
    "ioo/edit-006",
    "ioo/edit-007",
    "ioo/edit-008",
    "ioo/tool-dependency-explorer",
    "ioo/tool-ownership-index",
  ]),
});
export const NO_PAUSE = Object.freeze({ on: false, pausedOn: "", by: "", live: Object.freeze([]) });

/** True when the record is released on `today`: its date has come, it is not held, and the release pause allows it. */
export function isReleasedRecord(record, today, pause = RELEASE_PAUSE) {
  const open = Boolean(record) && record.hold === false && isIsoDate(record.releasedAt) && record.releasedAt <= today;
  return open && (!pause.on || pause.live.includes(record.id));
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
