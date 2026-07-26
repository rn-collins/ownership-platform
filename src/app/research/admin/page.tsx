import { redirect } from "next/navigation";
import { requireResearcher } from "@/lib/researcher-auth";
import { ResearchConsole } from "./ResearchConsole";

export const dynamic = "force-dynamic";
export const metadata = { title: "Research operations — Institutions of One", robots: { index: false, follow: false } };

export default async function ResearchAdminPage() {
  const researcher = await requireResearcher();
  if (!researcher) redirect("/login?next=/research/admin");
  return <main>
    <p className="eyebrow">Restricted · authorized researchers only</p>
    <h1>Cognitive interview operations</h1>
    <p className="lede">Screening, scheduling, session evidence, revision records, and activation gates. Candidate scoring remains disabled.</p>
    <ResearchConsole />
  </main>;
}
