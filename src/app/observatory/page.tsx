import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { SEED, nodeSlug, type Node } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — Institutions of One",
  description: "A 41-case methodology pilot mapping how creators and professionals build ownership, authority, portability, and durable infrastructure.",
  alternates: { canonical: "/observatory" },
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
        const recordsBySlug = new Map(records.map((record) => [record.slug, record]));
        nodes = SEED.map((seed) => {
          const record = recordsBySlug.get(nodeSlug(seed.name));
          if (!record) return seed;
          return {
            ...seed,
            // The reviewed evidence store enriches the canonical 41-case roster.
            // A partial database must never shrink the public methodology pilot.
            role: record.verificationStatus === "verified" && record.headline ? record.headline : seed.role,
            verificationStatus: record.verificationStatus as Node["verificationStatus"],
            evidenceCoverage: record.evidenceCoverage,
          };
        });
      }
    } catch {
      nodes = SEED;
    }
  }

  const creators = nodes.filter((member) => member.kind === "creator").length;
  const professionals = nodes.length - creators;
  const fields = new Set(nodes.map((member) => member.domain)).size;

  return (
    <main className="observatory-page">
      <p className="eyebrow">Institutions of One · The Observatory</p>
      <h1>Forty-one lives. One methodology under pressure.</h1>
      <p className="lede">
        The Observatory studies how creators and professionals turn work into something portable, ownable, authoritative,
        and durable. The map lets you move across fields, compare institutional forms, and see where public evidence is
        strong, thin, or still unresolved.
      </p>

      <section className="card" aria-labelledby="pilot-heading" style={{ marginTop: 18, borderLeft: "4px solid #b98f4d" }}>
        <p className="eyebrow">The 41-case methodology pilot</p>
        <h2 id="pilot-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30 }}>Why these cases are here before participant data exists</h2>
        <p>
          All {nodes.length} public cases—{creators} creator cases and {professionals} professional cases across {fields} fields—form
          the first stress test of the research method. They test whether the same questions can describe very different
          careers, distinguish documented facts from interpretation, expose missing evidence, and support useful comparison
          without forcing everyone into one model of success.
        </p>
        <p>
          This is theory-building case research, not validation data, a representative workforce sample, or a ranking.
          The point is to test and improve the methodology now; later participant data will test the assessments in a
          different way.
        </p>
      </section>

      <h2 className="dimhead" style={{ marginTop: 54 }}>Explore the Observatory map</h2>
      <p className="rsub" style={{ marginBottom: 18 }}>
        Switch between the visual field map and the searchable directory. Every dot opens a case record; filters reveal
        contrasts across creators, professionals, fields, and roles built around a particular person.
      </p>
      <ObservatoryMap nodes={nodes} initialView="map" />

      <div className="card" style={{ marginTop: 28 }}>
        <h3>What inclusion means</h3>
        <p>
          Inclusion means a case can teach the method something. It is not an endorsement, ranking, or assessment result.
          Case records separate sourced evidence from working interpretation and invite corrections when stronger evidence appears.
        </p>
      </div>

      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 30, marginTop: 48, marginBottom: 4 }}>Who would challenge the map?</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>
        Suggest someone whose work reveals a structure, contradiction, or field the current 41 cases miss. Nominations are
        reviewed for what they add to the research—not for fame.
      </p>
      <ObservatoryNominate />
    </main>
  );
}
