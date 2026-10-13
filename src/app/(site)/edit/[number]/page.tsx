import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEditionPage } from "@/components/CanonicalEdition";
import { editionByNumber, publicCycleOneEditions } from "@/lib/edit-cycle-one";
import { ogArticleTimes } from "@/lib/publication-dates";
import { editionIsPublic } from "@/lib/releases";

// Only released editions (data/releases.json) get a page; any other number returns 404, including by direct address.
export const dynamicParams = false;
export function generateStaticParams() { return publicCycleOneEditions().map(({ number }) => ({ number })); }

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  const edition = editionByNumber(params.number);
  if (!edition || !editionIsPublic(edition.number)) return {};
  const canonical = `/edit/${edition.number}`;
  // Next.js does not deep-merge a route's openGraph/twitter objects with the root layout's -
  // omitting images here loses the root's site-wide fallback entirely. Editions 001-004 have
  // hand-generated PNGs at /og/edit/00N.png; editions with article photos use a 1200x630 crop of
  // the edition's first (self-hosted) photo at /og/edit/00N.jpg. Edition 007 has no edition-level
  // photo, so it falls back to the generic site image. Relative URLs resolve against metadataBase.
  // 005 opens with a cropped 1903 invoice and 007 has no photograph, so those two get a title card.
  const titleCard = edition.number === "005" || !edition.media[0];
  const image = titleCard ? `/og/edit-card/${edition.number}` : `/og/edit/${edition.number}.jpg`;
  const hasPhoto = !titleCard;
  return {
    title: `${edition.title} | The I/1 Edit`, description: edition.subtitle,
    alternates: { canonical }, robots: { index: true, follow: true },
    openGraph: { title: `Edition ${edition.number}: ${edition.title}`, description: edition.subtitle, url: canonical, type: "article", ...ogArticleTimes(edition.number), images: [{ url: image, width: 1200, height: 630, alt: hasPhoto ? edition.media[0].alt : edition.title }] },
    twitter: { card: "summary_large_image", title: `Edition ${edition.number}: ${edition.title}`, description: edition.subtitle, images: [image] },
  };
}

export default function EditionPage({ params }: { params: { number: string } }) {
  const edition = editionByNumber(params.number);
  if (!edition || !editionIsPublic(edition.number)) notFound();
  return <CanonicalEditionPage edition={edition} />;
}
