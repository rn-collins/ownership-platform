import type { CSSProperties } from "react";
import { publicEditions } from "@/lib/edit-cycle-one";
import { editionId, pieceById, type Piece } from "@/lib/releases";
import { SITE_ORIGIN } from "@/lib/site";

// The link set every released piece carries (data/releases.json): its posts, its source page on RN Collins, selected work,
// its long-form piece, the gallery index, and the previous and next pieces. Links appear only where the record has a target.

const PLATFORM_LABEL: Record<string, string> = { beehiiv: "The Polymath" };
const platformLabel = (platform: string) => PLATFORM_LABEL[platform] ?? platform;
const sameAsSelf = (url: string, selfPath: string) => url === `${SITE_ORIGIN}${selfPath}` || url === selfPath;
const localHref = (url: string) => (url.startsWith(SITE_ORIGIN) ? url.slice(SITE_ORIGIN.length) || "/" : url);

/** Posts, source page and long-form for a piece. Renders nothing when the record has none of them. */
export function GalleryLinks({ piece, selfPath, omit = [] }: { piece: Piece; selfPath: string; omit?: string[] }) {
  const longForm = piece.longFormUrl && !sameAsSelf(piece.longFormUrl, selfPath) && !omit.includes(localHref(piece.longFormUrl)) ? piece.longFormUrl : "";
  const items = [
    ...piece.postUrls.map((post) => ({ key: post.url, href: post.url, label: `Read the post on ${platformLabel(post.platform)}`, external: true })),
    ...(piece.sourcePageUrl ? [{ key: piece.sourcePageUrl, href: piece.sourcePageUrl, label: "Sources for this piece on RN Collins, selected work", external: true }] : []),
    ...(longForm ? [{ key: longForm, href: localHref(longForm), label: longFormLabel(longForm), external: !longForm.startsWith(SITE_ORIGIN) }] : []),
  ];
  if (!items.length) return null;
  return <nav className="gallery-links" aria-label="Where this piece lives">
    <p className="eyebrow">Where this piece lives</p>
    <ul>{items.map((item) => <li key={item.key}>{item.external
      ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>
      : <a href={item.href}>{item.label}</a>}</li>)}</ul>
  </nav>;
}

function longFormLabel(url: string) {
  const match = /\/edit\/(\d{3})$/.exec(url);
  if (!match) return "Read the long-form piece";
  const edition = publicEditions().find((e) => e.number === match[1]);
  return edition ? `Read the long-form edition: Edition ${edition.number}, ${edition.title}` : `Read the long-form edition: Edition ${match[1]}`;
}

/**
 * Previous, all editions, the edition's posts and source page, and next, from the released editions only.
 * Shared by the hand-built editions (001 to 004) and the cycle-one editions (005 onward).
 */
export function EditionNav({ number }: { number: string }) {
  const editions = publicEditions();
  const index = editions.findIndex((e) => e.number === number);
  const previous = index > 0 ? editions[index - 1] : undefined;
  const next = index >= 0 && index < editions.length - 1 ? editions[index + 1] : undefined;
  const piece = pieceById(editionId(number));
  const links: { key: string; href: string; label: string; external?: boolean }[] = [];
  if (previous) links.push({ key: "previous", href: `/edit/${previous.number}`, label: `← Edition ${previous.number}` });
  links.push({ key: "index", href: "/edit", label: "All editions" });
  for (const post of piece?.postUrls ?? []) links.push({ key: post.url, href: post.url, label: `Read it on ${platformLabel(post.platform)}`, external: true });
  if (piece?.sourcePageUrl) links.push({ key: "sources", href: piece.sourcePageUrl, label: "Sources on RN Collins, selected work", external: true });
  if (next) links.push({ key: "next", href: `/edit/${next.number}`, label: `Edition ${next.number} →` });
  return <nav className="edition-continuity" aria-label="Edition navigation" style={{ "--cols": links.length } as CSSProperties}>
    {links.map((link) => link.external
      ? <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
      : <a key={link.key} href={link.href}>{link.label}</a>)}
  </nav>;
}

/** "Cases in this edition": links to the released case records an edition is built on. */
export function EditionCases({ number, cases }: { number: string; cases: { slug: string; name: string; question?: string }[] }) {
  if (!cases.length) return null;
  return <section className="edition-cases" aria-labelledby={`cases-${number}`}>
    <p className="eyebrow">Case records</p>
    <h2 id={`cases-${number}`}>Cases in this edition</h2>
    <p>Each case record sets out the chronology, the sources and what the evidence does not show.</p>
    <ul>{cases.map((c) => <li key={c.slug}><a href={`/observatory/${c.slug}`}><b>{c.name}</b>{c.question ? <span>{c.question}</span> : null}</a></li>)}</ul>
  </section>;
}
