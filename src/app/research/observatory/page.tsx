import { redirect } from "next/navigation";
import { requireResearcher } from "@/lib/researcher-auth";
import { ObservatoryStudio } from "./ObservatoryStudio";

export const dynamic = "force-dynamic";
export const metadata = { title: "Observatory Studio — Institutions of One", robots: { index: false, follow: false } };

export default async function ObservatoryStudioPage() {
  const researcher = await requireResearcher();
  if (!researcher) redirect("/login?next=/research/observatory");
  return <main>
    <p className="eyebrow">Restricted · authorized researchers only</p>
    <h1>Observatory Studio</h1>
    <p className="lede">
      Build evidence-backed case records by separating claims, sources, relationships, events, construct observations,
      verification decisions, and public release. Every mutation creates an append-only audit event.
    </p>
    <p className="meta"><a href="/research/admin">Cognitive-interview operations →</a> · <a href="/observatory">Public Observatory →</a></p>
    <ObservatoryStudio />
  </main>;
}
