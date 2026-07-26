import { notFound } from "next/navigation";
import { SEED, nodeSlug, findNodeBySlug, type Node } from "@/lib/observatory_seed";
import { prisma } from "@/lib/db";

export function generateStaticParams() {
  return SEED.map((n) => ({ slug: nodeSlug(n.name) }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const n = findNodeBySlug(params.slug);
  if (!n) return { title: "Profile — The Observatory" };
  return {
    title: `${n.name} — The Observatory | Institutions of One`,
    description: `${n.name}: a provisional Institutions of One Observatory case record requiring claim-level source verification.`,
  };
}

export default async function ObservatoryProfile({ params }: { params: { slug: string } }) {
  let n: Node | undefined = findNodeBySlug(params.slug);
  let databaseStatus = "provisional";
  let evidenceCoverage: number | null = null;
  if (prisma) {
    try {
      const record = await prisma.observatoryCase.findUnique({ where: { slug: params.slug } });
      if (record) {
        n = {
          name: record.displayName,
          role: record.headline ?? "Case record under evidence review",
          domain: record.primaryField ?? "Unclassified",
          kind: record.caseType === "creator" ? "creator" : "professional",
          created: record.roleBuiltFlag,
        };
        databaseStatus = record.verificationStatus;
        evidenceCoverage = record.evidenceCoverage;
      }
    } catch {
      // Static roster fallback keeps the public case route available.
    }
  }
  if (!n) notFound();

  const isCreator = n.kind === "creator";
  const lens = isCreator ? "Ownership Index" : "Portfolio Professional";
  const forWhom = isCreator ? "creators" : "professionals";
  const assessHref = isCreator ? "/assess/creator" : "/assess/professional";

  return (
    <main>
      <p className="eyebrow">Institutions of One · The Observatory</p>
      <a href="/observatory" className="postback">← Back to the Observatory</a>
      <h1 style={{ marginTop: 6 }}>{n.name}</h1>
      <p className="lede">{n.role}.</p>

      <div className="obs-panel-meta" style={{ margin: "10px 0 20px" }}>
        <span className="obs-chip">{n.domain}</span>
        <span className="obs-chip">{isCreator ? "Creator" : "Professional"}</span>
        {n.created && <span className="obs-chip built">Provisional role-built flag</span>}
        <span className="obs-chip">Evidence review pending</span>
      </div>

      <div className="card" style={{ borderLeft: "4px solid #b98f4d" }}>
        <h3>Record status: {databaseStatus.replaceAll("_", " ")}</h3>
        <p>
          This page currently preserves an entry from the original Observatory roster in the canonical case database. It is not a completed research
          profile, assessment result, ranking, or verified classification. The label below is the starting claim to be
          checked—not the conclusion of that review.
        </p>
      </div>

      <p className="meta">Evidence coverage: {evidenceCoverage == null ? "not yet calculated" : `${Math.round(evidenceCoverage * 100)}%`}.</p>

      <h2 className="dimhead">What the roster currently says</h2>
      <div className="card">
        <p><b>Recorded role label:</b> {n.role}.</p>
        <p><b>Provisional field:</b> {n.domain}.</p>
        <p><b>Provisional case category:</b> {isCreator ? "creator" : "professional"}.</p>
        {n.created && <p><b>Provisional classification:</b> the role may have been created or materially shaped around this person.</p>}
      </div>

      <h2 className="dimhead">Interpretive question</h2>
      <div className="card">
        <p>
          This case is queued for review through the <b>{lens}</b> research lens for {forWhom}. The review must determine
          whether documented evidence supports claims about ownership, portability, professional infrastructure,
          role-creation, institutional dependence, or another construct. Placement in this queue does not answer those
          questions.
        </p>
      </div>

      <h2 className="dimhead">Evidence still required</h2>
      <div className="card">
        <p>
          Before this profile can be treated as verified, it needs dated sources, claim-by-claim citations, relevant
          organizations and relationships, a timeline, contrary or limiting evidence, construct mappings, review status,
          and permissible public language. Missing information remains missing; it is not converted into a zero.
        </p>
      </div>

      <h2 className="dimhead">Available analysis</h2>
      <div className="card">
        <p>
          No Observatory score has been calculated for this person. No psychological characteristic has been inferred.
          This provisional record is excluded from rankings, statistical models, and construct-level comparisons until
          the necessary evidence is recorded and reviewed.
        </p>
      </div>

      <div className="card">
        <h3>Use the related public instrument</h3>
        <p>
          The {lens} is a separate self-report experience. Taking it measures the respondent&rsquo;s answers; it does not
          validate this public case record.{" "}<a href={assessHref} className="fwlink">Open the {lens} →</a>
        </p>
      </div>

      <div className="actions">
        <a href="/observatory"><button className="primary">Explore all cases</button></a>
        <a href="/observatory" style={{ textDecoration: "none" }}><span className="progress">Nominate someone →</span></a>
      </div>
    </main>
  );
}
