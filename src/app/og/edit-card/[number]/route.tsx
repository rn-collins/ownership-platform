import { notFound } from "next/navigation";
import { ogCard } from "@/lib/og-card";
import { editionByNumber } from "@/lib/edit-cycle-one";
import { editionIsPublic } from "@/lib/releases";

// Title card for an edition that has no photograph of its own to preview (MAIN-015).
export async function GET(_req: Request, { params }: { params: { number: string } }) {
  const edition = editionByNumber(params.number);
  if (!edition || !editionIsPublic(edition.number)) notFound();
  return ogCard({ kicker: `The I/1 Edit · Edition ${edition.number}`, title: edition.title, detail: edition.subtitle });
}
