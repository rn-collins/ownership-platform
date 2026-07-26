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
type PublicRelation = { id:string; targetType:string; targetName:string; relationshipType:string; startedAt:Date|null; endedAt:Date|null; verificationStatus:string };
type PublicEvent = { id:string; eventType:string; title:string; description:string|null; occurredAt:Date|null; precision:string; verificationStatus:string };
type PublicObservation = { id:string; constructId:string; valueNumeric:number|null; valueCategory:string|null; measurementMethod:string; instrumentVersion:string|null; evidenceCoverage:number|null; observedAt:Date|null };

export function generateStaticParams() {
  return SEED.map((n) => ({ slug: nodeSlug(n.name) }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const n = findNodeBySlug(params.slug);
  if (!n) return { title: "Profile — The Observatory" };
  return {
    title: `${n.name} — The Observatory | Institutions of One`,
    description: `${n.name}: an evidence-aware case record in the Institutions of One Observatory.`,
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
            orderBy: [{ relationshipType:"asc" },{ targetName:"asc" }],
          },
          events: {
            where: { publicStatus:"public", verificationStatus:{ in:["verified","partially_supported"] } },
            orderBy: { occurredAt:"asc" },
          },
          observations: {
            where: { publicStatus:"public", verificationStatus:"verified" },
            orderBy: [{ constructId:"asc" },{ observedAt:"asc" }],
          },
        },
      });
      if (record) {
        if (record.publicStatus !== "public") notFound();
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

  return <main>
    <p className="eyebrow">Institutions of One · The Observatory</p>
    <a href="/observatory" className="postback">← Back to the Observatory</a>
    <h1 style={{marginTop:6}}>{n.name}</h1>
    <p className="lede">{n.role}.</p>

    <div className="obs-panel-meta" style={{margin:"10px 0 20px"}}>
      <span className="obs-chip">{n.domain}</span>
      <span className="obs-chip">{isCreator ? "Creator" : "Professional"}</span>
      {n.created && <span className="obs-chip built">{databaseStatus==="verified" ? "Reviewed role-built classification" : "Provisional role-built flag"}</span>}
      <span className="obs-chip">{databaseStatus.replaceAll("_"," ")}</span>
    </div>

    <div className="card" style={{borderLeft:`4px solid ${databaseStatus==="verified" ? "#2f7a54" : "#b98f4d"}`}}>
      <h3>{databaseStatus==="verified" ? "Verified case record" : "Provisional case record"}</h3>
      <p>
        {databaseStatus==="verified"
          ? "This case has passed the Observatory’s current claim-and-evidence review gate. Verification applies only to the claims displayed below; it does not validate every possible inference about this person."
          : "This entry remains in the research queue. Its name, role label, field, and flags are starting records to investigate—not completed measurements, rankings, or validated classifications."}
      </p>
      <p className="meta">
        Evidence coverage: {evidenceCoverage==null ? "not yet calculated" : `${Math.round(evidenceCoverage*100)}%`}
        {" · "}Last reviewed: {lastReviewedAt ? date(lastReviewedAt) : "not yet reviewed"}
      </p>
    </div>

    <h2 className="dimhead">Recorded case information</h2>
    <div className="card">
      <p><b>Role label:</b> {n.role}.</p>
      <p><b>Primary field:</b> {n.domain}.</p>
      <p><b>Case category:</b> {isCreator ? "creator" : "professional"}.</p>
      {n.created && <p><b>Role-built field:</b> the record flags the role as potentially created or materially shaped around this person. See the reviewed claims below for any public evidentiary basis.</p>}
    </div>

    {publicClaims.length > 0 && <>
      <h2 className="dimhead">Reviewed claims and sources</h2>
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
      </table></div>
    </>}

    {publicEvents.length > 0 && <>
      <h2 className="dimhead">Case timeline</h2>
      {publicEvents.map(event=><div className="card" key={event.id}>
        <p className="eyebrow">{date(event.occurredAt)} · {event.precision}</p>
        <h3>{event.title}</h3>
        {event.description && <p>{event.description}</p>}
        <p className="meta">{event.eventType.replaceAll("_"," ")} · {event.verificationStatus.replaceAll("_"," ")}</p>
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
      <h2 className="dimhead">Evidence review</h2>
      <div className="card">
        <h3>No reviewed evidence has been published for this case yet.</h3>
        <p>Dated sources, atomic claims, relevant relationships, timeline events, contrary evidence, construct mappings, and review decisions are still required. Missing information remains missing; it is not converted into a zero.</p>
      </div>
    </>}

    <h2 className="dimhead">Interpretive boundary</h2>
    <div className="card">
      <p>
        This case is examined through the <b>{lens}</b> research lens for {forWhom}. The record may inform theory-building
        about ownership, portability, professional infrastructure, role creation, or institutional dependence. Case
        inclusion does not establish prevalence or causation. No psychological characteristic is inferred unless an
        appropriately consented and identified measurement method supports it.
      </p>
    </div>

    <div className="card">
      <h3>Use the related public instrument</h3>
      <p>The {lens} is a separate self-report experience. Taking it measures the respondent’s answers; it does not validate this public case record.{" "}<a href={assessHref} className="fwlink">Open the {lens} →</a></p>
    </div>

    <div className="actions">
      <a href="/observatory"><button className="primary">Explore all cases</button></a>
      <a href="/observatory" style={{textDecoration:"none"}}><span className="progress">Nominate someone →</span></a>
    </div>
  </main>;
}
