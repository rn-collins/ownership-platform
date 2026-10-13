import raw from "../../data/releases.json";
import { isReleasedRecord as rule, reviewRenderFor, todayInHawaii, RELEASE_TIMEZONE } from "./release-rule.mjs";
import { idIsPublic } from "./released-ids";

// The release gate for every piece on this site: editions, case records and tools. Server code only; browser code uses
// src/lib/released-ids.ts. data/releases.json is the only record that decides what is public (rule: src/lib/release-rule.mjs).
// A piece is released when its releasedAt date (Pacific/Honolulu) is today or earlier and hold is false. An empty releasedAt
// means unreleased. Pages, lists, the sitemap, share images and files of a piece that is not released return 404.
// "Today" is the build day: next.config.mjs fixes it and inlines the resulting public ids, and the daily rebuild moves it on.

export type PostUrl = { platform: string; url: string };
export type Piece = {
  id: string;
  kind: "edition" | "case" | "tool";
  title: string;
  path: string;
  releasedAt: string;
  hold: boolean;
  postUrls: PostUrl[];
  longFormUrl: string;
  sourcePageUrl: string;
  dateSource: string;
  toolId?: string;
  /** Public paths (a folder when it ends in "/") that belong to the piece and must 404 while it is held. */
  assets?: string[];
};
export type RelatedStory = {
  id: string;
  kind: "visual-story";
  story: string;
  title: string;
  releasedAt: string;
  hold: boolean;
  url: string;
  sourcePageUrl: string;
  dateSource: string;
};

const data = raw as unknown as { timezone: string; siteOrigin: string; pieces: Piece[]; related: RelatedStory[] };
export { RELEASE_TIMEZONE, todayInHawaii, reviewRenderFor };
export const pieces: readonly Piece[] = data.pieces;
export const relatedStories: readonly RelatedStory[] = data.related;

/** True when the record is released on `today` (YYYY-MM-DD, Hawaii). */
export const isReleasedRecord = (record: { releasedAt: string; hold: boolean } | undefined, today: string): boolean => rule(record, today);

export const pieceById = (id: string) => pieces.find((p) => p.id === id);
export const editionId = (number: string) => `ioo/edit-${number}`;
export const caseId = (slug: string) => `ioo/case-${slug}`;
export const toolPieceId = (slug: string) => `ioo/tool-${slug}`;

/** True when the piece is public in this build. Unknown ids are never public. Pass `today` to ask about another day. */
export const isPublic = (id: string, today?: string) => (today ? isReleasedRecord(pieceById(id), today) : idIsPublic(id));
export const editionIsPublic = (number: string) => isPublic(editionId(number));
export const caseIsPublic = (slug: string) => isPublic(caseId(slug));
export const toolIsPublic = (slug: string) => isPublic(toolPieceId(slug));

/** Public Reader visual story (P01 to P34) by its package id, only once released. */
export function storyIfReleased(story: string, today?: string): RelatedStory | undefined {
  const record = relatedStories.find((r) => r.story === story);
  if (!record) return undefined;
  return (today ? isReleasedRecord(record, today) : idIsPublic(record.id)) ? record : undefined;
}

/** Paths that must answer 404: the page and every file of every piece that is not public. */
export function heldAssetPaths(today?: string): string[] {
  return pieces.filter((p) => !isPublic(p.id, today)).flatMap((p) => [p.path, ...(p.assets ?? [])]);
}
export function isHeldPath(pathname: string, today?: string): boolean {
  let decoded = pathname;
  try { decoded = decodeURIComponent(pathname); } catch { /* keep the raw path */ }
  const path = decoded.replace(/\/+$/, "") || "/";
  return heldAssetPaths(today).some((held) => (held.endsWith("/") ? path.startsWith(held) || `${path}/` === held : path === held || path.startsWith(`${held}/`)));
}
