import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEditionPage } from "@/components/CanonicalEdition";
import { commonsImageUrl, cycleOneEditions, editionByNumber } from "@/lib/edit-cycle-one";

const freezeRender = process.env.CYCLE01_RENDER_FREEZE === "1";
export function generateStaticParams() { return cycleOneEditions.filter((e) => !e.gated || freezeRender).map(({ number }) => ({ number })); }

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  const edition = editionByNumber(params.number);
  if (!edition || (edition.gated && !freezeRender)) return {};
  const canonical = `/edit/${edition.number}`;
  // Next.js does not deep-merge a route's openGraph/twitter objects with the root layout's -
  // omitting images here (as this previously did) loses the root's site-wide fallback
  // entirely, shipping editions 005-008 with no og:image/twitter:image at all. Editions 1-4
  // have hand-generated static PNGs at /og/edit/00N.png; these don't, so fall back to that
  // edition's own first article photo (already real, licensed, and on-topic), and only to the
  // generic site image if an edition genuinely has none (edition 007 currently has empty media).
  const image = edition.media[0] ? commonsImageUrl(edition.media[0].file) : "/opengraph-image";
  return {
    title: `${edition.title} — The I/1 Edit`, description: edition.subtitle,
    alternates: { canonical }, robots: { index: true, follow: true },
    openGraph: { title: `Edition ${edition.number} — ${edition.title}`, description: edition.subtitle, url: canonical, type: "article", images: [{ url: image, width: 1600, height: 2000, alt: edition.media[0]?.alt ?? edition.title }] },
    twitter: { card: "summary_large_image", title: `Edition ${edition.number} — ${edition.title}`, description: edition.subtitle, images: [image] },
  };
}

export default function EditionPage({ params }: { params: { number: string } }) {
  const edition = editionByNumber(params.number);
  if (!edition || (edition.gated && !freezeRender)) notFound();
  return <CanonicalEditionPage edition={edition} />;
}
