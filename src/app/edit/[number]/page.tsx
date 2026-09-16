import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEditionPage } from "@/components/CanonicalEdition";
import { cycleOneEditions, editionByNumber } from "@/lib/edit-cycle-one";

export function generateStaticParams() { return cycleOneEditions.map(({ number }) => ({ number })); }

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  const edition = editionByNumber(params.number);
  if (!edition) return {};
  const canonical = `/edit/${edition.number}`;
  return {
    title: `${edition.title} — The I/1 Edit`, description: edition.subtitle,
    alternates: { canonical }, robots: { index: true, follow: true },
    openGraph: { title: `Edition ${edition.number} — ${edition.title}`, description: edition.subtitle, url: canonical, type: "article" },
    twitter: { card: "summary_large_image", title: `Edition ${edition.number} — ${edition.title}`, description: edition.subtitle },
  };
}

export default function EditionPage({ params }: { params: { number: string } }) {
  const edition = editionByNumber(params.number);
  if (!edition) notFound();
  return <CanonicalEditionPage edition={edition} />;
}
