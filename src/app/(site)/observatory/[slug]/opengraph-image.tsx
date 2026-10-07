import { notFound } from "next/navigation";
import { findNodeBySlug } from "@/lib/observatory_seed";
import { ogCard, OG_SIZE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Institutions of One case record";

// One share card per case record, so a link to a person's case does not look like every other page (MAIN-015).
export default function CaseOpenGraphImage({ params }: { params: { slug: string } }) {
  const person = findNodeBySlug(params.slug);
  if (!person) notFound();
  return ogCard({ kicker: "The Observatory · Case record", title: person.name, detail: person.role });
}
