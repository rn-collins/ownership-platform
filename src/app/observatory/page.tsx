import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { FIRST_COHORT_VERSION, FIRST_OBSERVATORY_COHORT } from "@/lib/observatory-cohort";
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
          verificationStatus: record.verificationStatus as Node["verificationStatus"],
          evidenceCoverage: record.evidenceCoverage,
        }));
      }
    } catch {
      // Preserve the public Observatory if the database is temporarily unavailable.
      nodes = SEED;
    }
  }

  const creatorCount = FIRST_OBSERVATORY_COHORT.filter((member) => member.caseType === "creator").length;
  const professionalCount = FIRST_OBSERVATORY_COHORT.length - creatorCount;
  const fieldCount = new Set(FIRST_OBSERVATORY_COHORT.map((member) => member.field)).size;

  return (
    <main>
      <p className="eyebrow">Institutions of One · The Observatory</p>
      <h1>The individual is becoming an institution.</h1>
      <p className="lede">
        Across the economy, creators and professionals are assembling work, ownership, authority, and infrastructure in
        new combinations. The Observatory is the evidence system for studying those arrangements. The directory is a
        provisional map; reviewed cases and cross-case findings are governed separately.
      </p>

      <section className="card" aria-labelledby="first-cohort-heading" style={{ marginTop: 18, borderLeft: "4px solid #b98f4d" }}>
        <p className="eyebrow">First theory-building cohort · v{FIRST_COHORT_VERSION}</p>
        <h2 id="first-cohort-heading" style={{ fontFamily: "Georgia, serif", fontSize: 22 }}>
          Twelve bounded cases, selected before cross-case analysis
        </h2>
        <p>
          The first cohort contains {creatorCount} creator cases and {professionalCount} professional cases across {fieldCount} fields.
          It is deliberately varied for theory building; it is not a statistically representative sample of a population.
          Selection does not verify a person&apos;s roster description, imply endorsement, or assign either instrument score.
        </p>
        <p>
          Cross-case findings remain blocked until at least eight cohort cases have passed review with at least 80% workflow
          coverage, including at least four creator and four professional cases. MrBeast is retained as one context case but
          frozen from further source-expansion research until eight other cohort subjects are reviewed, except for a documented
          correction or contradiction.
        </p>
        <div className="roster" style={{ marginTop: 14 }}>
          {FIRST_OBSERVATORY_COHORT.map((member) => (
            <article className="rostercard" key={member.slug}>
              <div className="rostername">{member.displayName}</div>
              <p className="rosterrole">{member.institutionalForm}</p>
              <p className="rosterdomain">{member.caseType === "creator" ? "Creator case" : "Professional case"} · {member.field}</p>
              <p className="meta" style={{ margin: "9px 0 0" }}>{member.selectionReason}</p>
              {member.researchRestriction && (
                <p className="meta" style={{ margin: "9px 0 0" }}><b>Research restriction:</b> {member.researchRestriction}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <ObservatoryMap nodes={nodes} />

      <div className="card" style={{ marginTop: 18 }}>
        <h3>Measurement is separate from case inclusion</h3>
        <p>
          The two candidate instruments are voluntary self-report measures. A person&apos;s presence in the Observatory or
          first cohort does not produce, predict, or substitute for an instrument result.
          <a href="/assess/creator" className="fwlink"> Ownership Index →</a>&nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="/assess/professional" className="fwlink"> Portfolio Professional →</a>
        </p>
      </div>

      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, marginTop: 30, marginBottom: 4 }}>Nominate someone</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>
        Nominations expand the candidate directory; they do not automatically enter the bounded first cohort or become
        verified cases. Added only with consent—a project about ownership models it.
      </p>
      <ObservatoryNominate />
    </main>
  );
}
