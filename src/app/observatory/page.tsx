import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { FIRST_OBSERVATORY_COHORT } from "@/lib/observatory-cohort";
import { SEED, type Node } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — Institutions of One",
  description: "Documented cases showing how creators and professionals build ownership, authority, and durable systems around their work.",
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
          role: record.headline ?? "Case under review",
          domain: record.primaryField ?? "Unclassified",
          kind: record.caseType === "creator" ? "creator" : "professional",
          created: record.roleBuiltFlag,
          verificationStatus: record.verificationStatus as Node["verificationStatus"],
          evidenceCoverage: record.evidenceCoverage,
        }));
      }
    } catch {
      nodes = SEED;
    }
  }

  const creators = FIRST_OBSERVATORY_COHORT.filter((member) => member.caseType === "creator").length;
  const professionals = FIRST_OBSERVATORY_COHORT.length - creators;
  const fields = new Set(FIRST_OBSERVATORY_COHORT.map((member) => member.field)).size;

  return (
    <main className="observatory-page">
      <p className="eyebrow">Institutions of One · The Observatory</p>
      <h1>How individual institutions take shape in the real world.</h1>
      <p className="lede">
        The Observatory documents creators and professionals who offer useful cases for studying ownership, authority,
        portability, and durable infrastructure. It brings public evidence into one place so patterns can be compared
        across careers and industries.
      </p>

      <section className="card" aria-labelledby="cohort-heading" style={{ marginTop: 18, borderLeft: "4px solid #b98f4d" }}>
        <p className="eyebrow">Initial comparative cohort</p>
        <h2 id="cohort-heading" style={{ fontFamily: "Georgia, serif", fontSize: 22 }}>Twelve cases across different forms of work</h2>
        <p>
          The first comparative cohort includes {creators} creator cases and {professionals} professional cases across {fields} fields.
          It was selected to examine contrasting ways individuals build audiences, businesses, expertise, authority, and
          institutional support. It is a theory-building sample, not a statistically representative portrait of the workforce.
        </p>
        <div className="roster" style={{ marginTop: 14 }}>
          {FIRST_OBSERVATORY_COHORT.map((member) => (
            <article className="rostercard" key={member.slug}>
              <div className="rostername">{member.displayName}</div>
              <p className="rosterrole">{member.institutionalForm}</p>
              <p className="rosterdomain">{member.caseType === "creator" ? "Creator" : "Professional"} · {member.field}</p>
              <p className="meta" style={{ margin: "9px 0 0" }}>{member.selectionReason}</p>
            </article>
          ))}
        </div>
      </section>

      <ObservatoryMap nodes={nodes} />

      <div className="card" style={{ marginTop: 18 }}>
        <h3>What inclusion means</h3>
        <p>
          Inclusion identifies a useful case for research. It is not an endorsement, ranking, or assessment result.
          Profiles distinguish reviewed evidence from provisional information and can be corrected as better sources emerge.
        </p>
      </div>

      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, marginTop: 30, marginBottom: 4 }}>Suggest a case</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>
        Know someone whose career or business would add a meaningful contrast? Submit a nomination for research review.
        A nomination does not guarantee public inclusion.
      </p>
      <ObservatoryNominate />
    </main>
  );
}
