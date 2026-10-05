import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEditionPage } from "@/components/CanonicalEdition";
import { cycleOneEditions, editionByNumber } from "@/lib/edit-cycle-one";

const freezeRender = process.env.CYCLE01_RENDER_FREEZE === "1";
export function generateStaticParams() { return cycleOneEditions.filter((e) => !e.gated || freezeRender).map(({ number }) => ({ number })); }

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  const edition = editionByNumber(params.number);
  if (!edition || (edition.gated && !freezeRender)) return {};
  const canonical = `/edit/${edition.number}`;
  // Next.js does not deep-merge a route's openGraph/twitter objects with the root layout's -
  // omitting images here loses the root's site-wide fallback entirely. Editions 001-004 have
  // hand-generated PNGs at /og/edit/00N.png; editions with article photos use a 1200x630 crop of
  // the edition's first (self-hosted) photo at /og/edit/00N.jpg. Edition 007 has no edition-level
  // photo, so it falls back to the generic site image. Relative URLs resolve against metadataBase.
  const image = edition.media[0] ? `/og/edit/${edition.number}.jpg` : "/opengraph-image";
  return {
    title: `${edition.title} — The I/1 Edit`, description: edition.subtitle,
    alternates: { canonical }, robots: { index: true, follow: true },
    openGraph: { title: `Edition ${edition.number} — ${edition.title}`, description: edition.subtitle, url: canonical, type: "article", images: [{ url: image, ...(edition.media[0] ? { width: 1200, height: 630 } : {}), alt: edition.media[0]?.alt ?? edition.title }] },
    twitter: { card: "summary_large_image", title: `Edition ${edition.number} — ${edition.title}`, description: edition.subtitle, images: [image] },
  };
}

export default function EditionPage({ params }: { params: { number: string } }) {
  const edition = editionByNumber(params.number);
  if (!edition || (edition.gated && !freezeRender)) notFound();
  return <CanonicalEditionPage edition={edition} />;
}
