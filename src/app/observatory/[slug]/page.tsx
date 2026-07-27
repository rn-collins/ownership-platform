import { notFound } from "next/navigation";
import { SEED, nodeSlug, findNodeBySlug, type Node } from "@/lib/observatory_seed";
import { prisma } from "@/lib/db";

type PublicEvidence = {
  id:string; supportType:string; exactPassage:string|null; locator:string|null;
  source:{ title:string; url:string; publisher:string|null; sourceType:string; publishedAt:Date|null; primarySource:boolean };
};
type PublicClaim = {
  id:string; claimType:string; statement:string; constructId:string|null; epistemicStatus:string;
  verificationStatus:string; confidence:number|null; permissibleLanguage:string|null; contradictionNote:string|null;
  lastReviewedAt:Date|null; evidence:PublicEvidence[];
};
type LinkedSource = { title:string; url:string; publisher:string|null; sourceType:string; publishedAt:Date|null; primarySource:boolean };
type PublicRelation = { id:string; targetType:string; targetName:string; relationshipType:string; startedAt:Date|null; endedAt:Date|null; verificationStatus:string; exactPassage:string|null; sourceLocator:string|null; source:LinkedSource|null };
type PublicEvent = { id:string; eventType:string; title:string; description:string|null; occurredAt:Date|null; precision:string; verificationStatus:string; exactPassage:string|null; sourceLocator:string|null; source:LinkedSource|null };
type PublicObservation = { id:string; constructId:string; valueNumeric:number|null; valueCategory:string|null; measurementMethod:string; instrumentVersion:string|null; evidenceCoverage:number|null; observedAt:Date|null };

export function generateStaticParams() {
  return SEED.map((n) => ({ slug: nodeSlug(n.name) }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  let name = findNodeBySlug(params.slug)?.name;
  if (!name && prisma) {
    try {
      const record = await prisma.observatoryCase.findUnique({
        where:{slug:params.slug}, select:{displayName:true,publicStatus:true},
      });
      if (record?.publicStatus === "public") name = record.displayName;
    } catch {
      // Metadata falls back safely when the evidence store is unavailable.
    }
  }
  if (!name) return { title: "Profile — The Observatory" };
  return {
    title: `${name} — The Observatory | Institutions of One`,
    description: `${name}: an evidence-aware case record in the Institutions of One Observatory.`,
  };
}

export default async function ObservatoryProfile({ params }: { params: { slug: string } }) {
  let n: Node | undefined = findNodeBySlug(params.slug);
  let databaseStatus = "provisional";
  let evidenceCoverage: number | null = null;
  let lastReviewedAt: Date | null = null;
  let publicClaims: PublicClaim[] = [];
  let publicRelationships: PublicRelation[] = [];
  let publicEvents: PublicEvent[] = [];
  let publicObservations: PublicObservation[] = [];

  if (prisma) {
    try {
      const record = await prisma.observatoryCase.findUnique({
        where: { slug: params.slug },
        include: {
          claims: {
            where: { publicStatus:"public", verificationStatus:{ in:["verified","partially_supported"] } },
            include: { evidence:{ include:{ source:true } } },
            orderBy: [{ claimType:"asc" },{ createdAt:"asc" }],
          },
          relationshipsFrom: {
            where: { publicStatus:"public", verificationStatus:{ in:["verified","partially_supported"] } },
            include: { source:true },
            orderBy: [{ relationshipType:"asc" },{ targetName:"asc" }],
          },
          events: {
            where: { publicStatus:"public", verificationStatus:{ in:["verified","partially_supported"] } },
            include: { source:true },
            orderBy: { occurredAt:"asc" },
          },
          observations: {
            where: { publicStatus:"public", verificationStatus:"verified" },
            orderBy: [{ constructId:"asc" },{ observedAt:"asc" }],
          },
        },
      });
      if (record?.publicStatus === "public") {
        n = {
          name:record.displayName, role:record.headline ?? "Case record under evidence review",
          domain:record.primaryField ?? "Unclassified",
          kind:record.caseType === "creator" ? "creator" : "professional",
          created:record.roleBuiltFlag,
        };
        databaseStatus = record.verificationStatus;
        evidenceCoverage = record.evidenceCoverage;
        lastReviewedAt = record.lastReviewedAt;
        publicClaims = record.claims;
        publicRelationships = record.relationshipsFrom;
        publicEvents = record.events;
        publicObservations = record.observations;
      }
    } catch (error) {
      if ((error as {digest?:string})?.digest?.startsWith("NEXT_NOT_FOUND")) throw error;
      // Static roster fallback keeps provisional public routes available during a database interruption.
    }
  }
  if (!n) notFound();

  const isCreator = n.kind === "creator";
  const lens = isCreator ? "Ownership Index" : "Portfolio Professional";
  const forWhom = isCreator ? "creators" : "professionals";
  const assessHref = isCreator ? "/assess/creator" : "/assess/professional";
  const hasPublicEvidence = publicClaims.length + publicRelationships.length + publicEvents.length + publicObservations.length > 0;
  const date = (value:Date|null) => value ? new Intl.DateTimeFormat("en",{year:"numeric",month:"short",day:"numeric"}).format(value) : "date not established";

  return <main className="profile-page">
    <p className="eyebrow">Institutions of One · The Observatory</p>
    <a href="/observatory" className="postback">← Back to the Observatory</a>
    <h1 style={{marginTop:6}}>{n.name}</h1>
    <p className="lede">{n.role}.</p>

    <div className="obs-panel-meta" style={{margin:"10px 0 20px"}}>
      <span className="obs-chip">{n.domain}</span>
      <span className="obs-chip">{isCreator ? "Creator" : "Professional"}</span>
      {n.created && <span className="obs-chip built">{databaseStatus==="verified" ? "Documented role-built case" : "Role-built question"}</span>}
      <span className="obs-chip">{databaseStatus.replaceAll("_"," ")}</span>
    </div>

    <div className="card" style={{borderLeft:`4px solid ${databaseStatus==="verified" ? "#2f7a54" : "#b98f4d"}`}}>
      <h3>{databaseStatus==="verified" ? "What the evidence establishes" : "Why this person is in the pilot"}</h3>
      <p>
        {databaseStatus==="verified"
          ? "The claims shown below have passed the Observatory’s current evidence review. That review applies only to what is displayed here—not to every possible claim or interpretation about this person."
          : "This person is part of the 41-case methodology pilot because their work puts the research questions under useful pressure. The description below is a starting point for investigation—not a score, ranking, endorsement, or finished judgment."}
      </p>
      <p className="meta">
        {databaseStatus==="verified"
          ? `Public evidence reviewed${lastReviewedAt ? ` · Updated ${date(lastReviewedAt)}` : ""}`
          : "Public pilot entry · Evidence review in progress"}
      </p>
    </div>

    <h2 className="dimhead">The working portrait</h2>
    <div className="card">
      <p><b>Working description:</b> {n.role}.</p>
      <p><b>Field:</b> {n.domain}.</p>
      <p><b>Research lens:</b> {lens}.</p>
      {n.created && <p><b>Question under study:</b> Was this role created or materially reshaped around the person doing it? The flag identifies a question for evidence review, not a settled conclusion.</p>}
    </div>

    {publicClaims.length > 0 && <>
      <h2 className="dimhead">What the evidence supports</h2>
      {publicClaims.map(claim=><article className="card" key={claim.id}>
        <p className="eyebrow">{claim.claimType.replaceAll("_"," ")} · {claim.epistemicStatus} · {claim.verificationStatus.replaceAll("_"," ")}</p>
        <h3>{claim.permissibleLanguage || claim.statement}</h3>
        {claim.permissibleLanguage && <p><b>Underlying reviewed statement:</b> {claim.statement}</p>}
        <p className="meta">
          Confidence: {claim.confidence==null ? "not quantified" : `${Math.round(claim.confidence*100)}%`}
          {claim.constructId ? ` · Construct: ${claim.constructId}` : ""}
          {claim.lastReviewedAt ? ` · Reviewed ${date(claim.lastReviewedAt)}` : ""}
        </p>
        {claim.contradictionNote && <p><b>Qualification or contrary evidence:</b> {claim.contradictionNote}</p>}
        <h4>Evidence</h4>
        {claim.evidence.length===0 ? <p>No public citation is attached.</p> :
          <ol>{claim.evidence.map(ev=><li key={ev.id}>
            <p><b>{ev.supportType[0].toUpperCase()+ev.supportType.slice(1)}:</b> <a href={ev.source.url} target="_blank" rel="noreferrer">{ev.source.title}</a>{ev.source.publisher ? `, ${ev.source.publisher}` : ""}{ev.source.publishedAt ? ` (${date(ev.source.publishedAt)})` : ""}. {ev.source.primarySource ? "Primary source." : `Source type: ${ev.source.sourceType.replaceAll("_"," ")}.`}</p>
            {ev.exactPassage && <blockquote>{ev.exactPassage}</blockquote>}
            {ev.locator && <p className="meta">Locator: {ev.locator}</p>}
          </li>)}</ol>}
      </article>)}
    </>}

    {publicRelationships.length > 0 && <>
      <h2 className="dimhead">Documented relationships</h2>
      <div className="card"><table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><th align="left">Relationship</th><th align="left">Target</th><th align="left">Type</th><th align="left">Period</th><th align="left">Status</th></tr></thead>
        <tbody>{publicRelationships.map(r=><tr key={r.id}>
          <td>{r.relationshipType.replaceAll("_"," ")}</td><td>{r.targetName}</td><td>{r.targetType}</td>
          <td>{r.startedAt?date(r.startedAt):"unknown"}–{r.endedAt?date(r.endedAt):"present/unknown"}</td><td>{r.verificationStatus.replaceAll("_"," ")}</td>
        </tr>)}</tbody>
      </table>
      <h4>Relationship sources</h4>
      <ul>{publicRelationships.map(r=><li key={r.id+"-source"}>{r.source ? <><a href={r.source.url} target="_blank" rel="noreferrer">{r.source.title}</a>{r.source.publisher ? ", "+r.source.publisher : ""}{r.source.primarySource ? " · Primary source" : ""}{r.sourceLocator ? " · "+r.sourceLocator : ""}{r.exactPassage ? <blockquote>{r.exactPassage}</blockquote> : null}</> : "Source unavailable"}</li>)}</ul>
      </div>
    </>}

    {publicEvents.length > 0 && <>
      <h2 className="dimhead">Case timeline</h2>
      {publicEvents.map(event=><div className="card" key={event.id}>
        <p className="eyebrow">{date(event.occurredAt)} · {event.precision}</p>
        <h3>{event.title}</h3>
        {event.description && <p>{event.description}</p>}
        <p className="meta">{event.eventType.replaceAll("_"," ")} · {event.verificationStatus.replaceAll("_"," ")}</p>
        {event.source && <p><b>Source:</b> <a href={event.source.url} target="_blank" rel="noreferrer">{event.source.title}</a>{event.source.publisher ? ", "+event.source.publisher : ""}{event.source.primarySource ? " · Primary source" : ""}</p>}
        {event.exactPassage && <blockquote>{event.exactPassage}</blockquote>}
        {event.sourceLocator && <p className="meta">Locator: {event.sourceLocator}</p>}
      </div>)}
    </>}

    {publicObservations.length > 0 && <>
      <h2 className="dimhead">Verified construct observations</h2>
      <div className="card"><table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><th align="left">Construct</th><th align="left">Value</th><th align="left">Method</th><th align="left">Coverage</th><th align="left">Version</th></tr></thead>
        <tbody>{publicObservations.map(o=><tr key={o.id}>
          <td>{o.constructId}</td><td>{o.valueNumeric??o.valueCategory??"missing"}</td><td>{o.measurementMethod.replaceAll("_"," ")}</td>
          <td>{o.evidenceCoverage==null?"not calculated":`${Math.round(o.evidenceCoverage*100)}%`}</td><td>{o.instrumentVersion||"not applicable"}</td>
        </tr>)}</tbody>
      </table>
      <p className="meta">These are method-bound observations. They do not automatically create a total score, rank, psychological diagnosis, causal conclusion, or population benchmark.</p></div>
    </>}

    {!hasPublicEvidence && <>
      <h2 className="dimhead">What we still need to establish</h2>
      <div className="card">
        <h3>The public evidence review for this case is not finished yet.</h3>
        <p>The next step is to establish the key claims with dated sources, relationships, timeline evidence, and meaningful contrary evidence. Until then, open questions stay open; missing information is never treated as proof of absence.</p>
      </div>
    </>}

    <h2 className="dimhead">How to read this case</h2>
    <div className="card">
      <p>
        This case is viewed through the <b>{lens}</b>, one of two distinct research lenses used by Institutions of One.
        It may sharpen questions about ownership, portability, authority, role creation, or dependence on an organization.
        Inclusion does not mean endorsement, ranking, causation, or psychological assessment.
      </p>
    </div>

    <div className="card">
      <h3>Turn the question toward your own work</h3>
      <p>The {lens} is a separate self-reflection pilot. Your answers describe your own work; they do not confirm or change this public case.{" "}<a href={assessHref} className="fwlink">Open the {lens} →</a></p>
    </div>

    <div className="actions">
      <a href="/observatory"><button className="primary">Explore all cases</button></a>
      <a href="/observatory" style={{textDecoration:"none"}}><span className="progress">Nominate someone →</span></a>
    </div>
  </main>;
}
