import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { SEED, type Node } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — how individuals are becoming institutions",
  description: "A browsable collection of documented creator and professional cases, grouped by field.",
};

export default async function ObservatoryPage() {
  let nodes: Node[] = SEED;
  if (prisma) {
    try {
      const records = await prisma.observatoryCase.findMany({
        where: { publicStatus: "public" },
        orderBy: [{ primaryField: "asc" }, { displayName: "asc" }],
      });
      if (records.length > 0) {
        nodes = records.map((record) => ({
          name: record.displayName,
          role: record.headline ?? "Case record under evidence review",
          domain: record.primaryField ?? "Unclassified",
          kind: record.caseType === "creator" ? "creator" : "professional",
          created: record.roleBuiltFlag,
        }));
      }
    } catch {
      // Preserve the public Observatory if the database is temporarily unavailable.
      nodes = SEED;
    }
  }

  return (
    <main>
      <p className="eyebrow">Institutions of One · The Observatory</p>
      <h1>The individual is becoming an institution.</h1>
      <p className="lede">
        Across the economy — creators and professionals alike — work is flipping from &ldquo;get hired for a role&rdquo;
        to &ldquo;the role gets built around you.&rdquo; The Observatory is the map: a living picture of the people already
        living the shift, drawn from public evidence and consented nominations. Filter it, search it, and open any node to
        see the case.
      </p>

      <ObservatoryMap nodes={nodes} />

      <div className="card" style={{ marginTop: 18 }}>
        <h3>Are you one of these people?</h3>
        <p>Measure yourself in five minutes and see how much of an institution you already are.
        <a href="/assess/creator" className="fwlink"> Ownership Index (creators) →</a>&nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="/assess/professional" className="fwlink">Portfolio Professional (professionals) →</a></p>
      </div>

      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, marginTop: 30, marginBottom: 4 }}>Nominate someone</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>Know someone whose role was built around them, or who owns their work in a way that would outlast any platform? Put them on the map. Added only with consent — a project about ownership models it.</p>
      <ObservatoryNominate />
    </main>
  );
}
