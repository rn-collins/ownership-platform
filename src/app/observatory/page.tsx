import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { SEED, nodeSlug, type Node } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — Institutions of One",
  description: "A 41-case methodology pilot mapping how creators and professionals build ownership, authority, portability, and durable infrastructure.",
  alternates: { canonical: "/observatory" },
  openGraph: { title: "The Observatory — Institutions of One", description: "A 41-case methodology pilot mapping how creators and professionals build ownership, authority, portability, and durable infrastructure.", url: "/observatory", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "The Observatory — Institutions of One", description: "A 41-case methodology pilot mapping how creators and professionals build ownership, authority, portability, and durable infrastructure.", images: ["/og.png"] },
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
      <h1>Forty-one people. Seven tensions. No neat answers.</h1>
      <p className="lede">
        The Observatory is a living collection of careers that break ordinary labels. Start with a tension—owned versus
        rented, portable versus embedded, one field versus many—then follow the people who make that tension impossible
        to ignore.
      </p>

      <section className="card" aria-labelledby="pilot-heading" style={{ marginTop: 18, borderLeft: "4px solid #b98f4d" }}>
        <p className="eyebrow">Why these 41</p>
        <h2 id="pilot-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30 }}>What can 41 wildly different careers teach us?</h2>
        <p>
          These {nodes.length} people—{creators} creators and {professionals} professionals across {fields} fields—were chosen
          because their careers put pressure on easy ideas about success. Some built companies. Some changed institutions
          from inside. Some carried authority across fields. Some became inseparable from the platform or employer that
          made their scale possible.
        </p>
        <p>
          They are not winners, templates, or proof that the framework is correct. They are provocations: public cases that
          help us ask sharper questions, notice missing evidence, and compare structures without pretending every career
          should end in the same place.
        </p>
      </section>

      <h2 className="dimhead" style={{ marginTop: 54 }}>Choose what you want to understand</h2>
      <p className="rsub" style={{ marginBottom: 18 }}>
        Begin with a career tension, search for someone you know, or step back to see the whole field. Every person opens
        a question you can carry into your own work.
      </p>
      <ObservatoryMap nodes={nodes} initialView="directory" />

      <div className="card" style={{ marginTop: 28 }}>
        <h3>What inclusion means</h3>
        <p>
          Inclusion means a case can teach the method something. It is not an endorsement, ranking, or assessment result.
          Case records separate sourced evidence from working interpretation and invite corrections when stronger evidence appears.
        </p>
      </div>

      <h2 id="nominate" style={{ fontFamily: "Georgia, serif", fontSize: 30, marginTop: 48, marginBottom: 4 }}>Who would challenge the Observatory?</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>
        Suggest someone whose work reveals a structure, contradiction, or field the current 41 cases miss. Nominations are
        reviewed for what they add to the research—not for fame.
      </p>
      <ObservatoryNominate />
    </main>
  );
}
