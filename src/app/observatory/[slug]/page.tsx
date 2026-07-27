import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED, nodeSlug, findNodeBySlug, type Node } from "@/lib/observatory_seed";
import { prisma } from "@/lib/db";
import styles from "./profile.module.css";
import { CASE_NARRATIVES } from "@/lib/case_narratives";\nimport { getCaseResearch } from "@/lib/case_research";
import CaseLab from "./CaseLab";

type Evidence = { id: string; supportType: string; exactPassage: string | null; locator: string | null; source: { title: string; url: string; publisher: string | null; publishedAt: Date | null; primarySource: boolean } };
type Claim = { id: string; statement: string; permissibleLanguage: string | null; claimType: string; verificationStatus: string; contradictionNote: string | null; evidence: Evidence[] };

export function generateStaticParams() { return SEED.map((n) => ({ slug: nodeSlug(n.name) })); }

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const node = findNodeBySlug(params.slug);
  if (!node) return { title: "Case — The Observatory" };
  const canonical = `/observatory/${params.slug}`;
  const title = `${node.name}: ${node.question ?? "A career worth investigating"} — The Observatory`;
  const description = node.question ?? `Explore what ${node.name}'s career reveals about ownership, portability, power, and dependence.`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, images: ["/og.png"] }, twitter: { card: "summary_large_image", title, description, images: ["/og.png"] } };
}

export default async function ObservatoryProfile({ params }: { params: { slug: string } }) {
  let node: Node | undefined = findNodeBySlug(params.slug);
  let status = "provisional";
  let reviewedAt: Date | null = null;
  let claims: Claim[] = [];

  if (prisma) {
    try {
      const record = await prisma.observatoryCase.findUnique({ where: { slug: params.slug }, include: { claims: { where: { publicStatus: "public", verificationStatus: { in: ["verified", "partially_supported"] } }, include: { evidence: { include: { source: true } } }, orderBy: [{ claimType: "asc" }, { createdAt: "asc" }] } } });
      if (record?.publicStatus === "public") {
        const seed = node;
        node = { name: record.displayName, role: record.verificationStatus === "verified" && record.headline ? record.headline : seed?.role ?? "Public role under review", domain: seed?.domain ?? record.primaryField ?? "Unclassified", kind: seed?.kind ?? (record.caseType === "creator" ? "creator" : "professional"), created: seed?.created ?? record.roleBuiltFlag, tension: seed?.tension, question: seed?.question };
        status = record.verificationStatus;
        reviewedAt = record.lastReviewedAt;
        claims = record.claims;
      }
    } catch { /* Keep the public seed available if the evidence store is unavailable. */ }
  }
  if (!node) notFound();

  const tensionGuides: Record<string, { meaning: string; lookFor: string; comparison: string }> = {
    "Role vs person": { meaning: "whether authority belongs to the office, the person, or the relationship between them", lookFor: "decisions, methods, relationships, and trust associated with the person—not merely the title", comparison: "Ask what remains recognizable if the title disappears." },
    "One field vs many": { meaning: "how one person creates coherence across work institutions usually separate", lookFor: "a repeated question, method, audience, or point of view connecting the roles", comparison: "Ask whether the range compounds or fragments." },
    "Owned vs rented": { meaning: "which parts of the work are directly controlled and which depend on access supplied by platforms, distributors, retailers, or partners", lookFor: "rights, customer relationships, audience access, data, products, and operating systems", comparison: "Ask what continues if the largest outside channel changes its rules." },
    "Portable vs embedded": { meaning: "what travels with the person and what remains inside an employer, client, platform, or other institutional container", lookFor: "portable reputation, methods, relationships, and proof beside employer-controlled teams, rights, budgets, data, and distribution", comparison: "Ask what could move lawfully and practically when the container changes." },
    "Scale vs dependence": { meaning: "what autonomy gains or loses as the work needs more capital, people, distribution, and infrastructure", lookFor: "dependencies that increase reach while creating obligations or single points of failure", comparison: "Ask which dependencies are visible, substitutable, negotiable, and survivable." },
    "Public mandate vs personal authority": { meaning: "how individual expertise becomes permission to coordinate public systems without becoming private ownership", lookFor: "formal mandate, cross-agency adoption, budgets, standards, succession, and evidence that institutions act", comparison: "Ask what capacity remains after the officeholder leaves." },
    "Institution vs individual": { meaning: "how a person stewards, changes, or speaks through an institution whose authority predates and exceeds them", lookFor: "the difference between personal decisions and inherited rules, reputation, resources, and symbolic power", comparison: "Ask what changed because of this leader and what belongs to the institution itself." },
  };
  const guide = tensionGuides[node.tension ?? ""] ?? { meaning: "how ownership, portability, authority, and dependence interact", lookFor: "the assets, relationships, systems, and permissions surrounding the work", comparison: "Ask what changes if the career loses its largest source of support." };
  const narrative = CASE_NARRATIVES[params.slug];\n  const researchRecord = getCaseResearch(params.slug);
  const currentIndex = SEED.findIndex((candidate) => nodeSlug(candidate.name) === params.slug);
  const previous = currentIndex > 0 ? SEED[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < SEED.length - 1 ? SEED[currentIndex + 1] : undefined;
  const related = SEED.filter((candidate) => candidate.name !== node!.name && (candidate.tension === node!.tension || candidate.domain === node!.domain)).slice(0, 3);
  const independentSourceCount = narrative?.sources.filter((source) => source.independent).length ?? 0;
  const institutionalSourceCount = (narrative?.sources.length ?? 0) - independentSourceCount;
  const date = (value: Date) => new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" }).format(value);
  const reviewLabel = reviewedAt ? date(reviewedAt) : "July 2026";

  return <main className={styles.page}>
    <Link href="/observatory" className={styles.back}>← Explore all 41 people</Link>
    <header className={styles.hero}>
      <div><p className={styles.kicker}>{node.tension ?? "An open career question"}</p><h1>{node.name}</h1><p className={styles.role}>{node.role}</p></div>
      <div className={styles.meta}><span>{node.domain}</span><span>{node.kind === "creator" ? "Creator-led work" : "Work built through organizations"}</span><span>Reviewed {reviewLabel}</span><span>{researchRecord?.documentationLevel === "saturated" ? "Saturated research record" : "Provisional research record"}</span></div>
    </header>

    <section className={styles.question} aria-labelledby="central-question"><span>What this career helps us understand</span><h2 id="central-question">{node.question ?? "What does this career make possible—and what makes it fragile?"}</h2><p>Follow the story, inspect the structure, test a dependency, compare the case, and verify the evidence. This is analysis of a public record—not a rating of the person.</p></section>

    <nav className={styles.layerNav} aria-label="Case study sections">
      <a href="#understand"><span>01</span>Understand</a><a href="#trace"><span>02</span>Trace</a><a href="#examine"><span>03</span>Examine</a><a href="#test"><span>04</span>Test</a><a href="#compare"><span>05</span>Compare</a><a href="#verify"><span>06</span>Verify</a>
    </nav>

    {researchRecord?.documentationLevel === "provisional" && <p className={styles.warning}><strong>Documentation status:</strong> This is a provisional research profile, not yet a claim-level saturated case. Use it as a research lead and inspect the source limits below. <Link href="/observatory/documentation">See what completion requires →</Link></p>}\n\n    {narrative ? <>
      <section className={styles.section} id="understand" aria-labelledby="career-story">
        <p className={styles.kicker}>01 · Understand</p><h2 id="career-story">The human story—and the structural question</h2><p>{narrative.careerArc}</p>
        <div className={styles.payoff}><p className={styles.kicker}>The immediate payoff</p><h3>What this case changes</h3><p>{narrative.whyItMatters}</p></div>
      </section>

      <section className={styles.section} id="trace" aria-labelledby="career-trace">
        <p className={styles.kicker}>02 · Trace</p><h2 id="career-trace">The turn that changed the structure</h2>
        <div className={styles.turn}><div><span>Before</span><p>The career depended on the roles, institutions, platforms, or fields described above.</p></div><div><span>Turning point</span><p>{narrative.structuralTurn}</p></div><div><span>What changed</span><p>The question becomes what moved with {node.name}, what remained embedded, and what could continue.</p></div></div>
        <p className={styles.methodNote}>This is a structural chronology, not a résumé. Exact dates and claim-level events appear in the verified public record below when available.</p>
      </section>

      <section className={styles.section} id="examine" aria-labelledby="case-structure">
        <p className={styles.kicker}>03 · Examine</p><h2 id="case-structure">Build, carry, control, continue</h2>
        <p>These are four different questions. Public visibility alone does not answer any of them.</p>
        <div className={styles.framework}>
          <article><span>Build</span><h3>What was created?</h3><p>Reputation, methods, relationships, products, teams, companies, public capacity, or a recognizable body of work.</p><strong>Look for: {guide.lookFor}.</strong></article>
          <article><span>Carry</span><h3>What could move?</h3><p>Knowledge, credibility, relationships, proof, or an audience may travel even when data, teams, rights, and budgets do not.</p><strong>{guide.comparison}</strong></article>
          <article><span>Control</span><h3>What could be governed?</h3><p>Legal ownership, practical decision rights, access, influence, and visibility are not interchangeable.</p><strong>The record must establish control; prominence cannot substitute for evidence.</strong></article>
          <article><span>Continue</span><h3>What could persist?</h3><p>Durability asks what survives a changed title, employer, platform, administration, distributor, or founder.</p><strong>Unknown where succession, contracts, governance, or operating capacity are private.</strong></article>
        </div>
        <div className={styles.storyGrid}><section><h3>The principal interpretation</h3><p>Here, {(node.tension ?? "the career tension").toLowerCase()} means {guide.meaning}.</p></section><aside className={styles.aside}><h3>Complications and unknowns</h3><ul>{narrative.unresolved.map((item) => <li key={item}>{item}</li>)}</ul></aside></div>
      </section>

      <section className={styles.section} id="test" aria-labelledby="test-heading">
        <p className={styles.kicker}>04 · Test</p><h2 id="test-heading">Change one dependency</h2><p>Use a counterfactual to expose the architecture. Your answer stays in this browser; nothing is scored or stored.</p>
        <CaseLab name={node.name} tension={node.tension ?? ""} unknowns={narrative.unresolved} dependencyPrompt={guide.comparison} />
      </section>

      <section className={styles.section} id="compare" aria-labelledby="compare-heading">
        <p className={styles.kicker}>05 · Compare</p><h2 id="compare-heading">Do not interpret this career alone</h2>
        <p>Compare a shared tension across different careers, or hold the field constant and inspect a different path. A comparison is useful because it can challenge the first explanation.</p>
        <div className={styles.compareGrid}>{related.map((person) => <Link href={`/observatory/${nodeSlug(person.name)}`} key={person.name}><span>{person.tension === node!.tension ? "Same tension" : "Same field"}</span><strong>{person.name}</strong><small>{person.question ?? "Open the case question"}</small></Link>)}</div>
        <Link className={styles.textLink} href="/observatory?mode=compare">Open the full comparison tool →</Link>
      </section>

      <section className={styles.evidence} id="verify" aria-labelledby="narrative-sources">
        <p className={styles.kicker}>06 · Verify</p><h2 id="narrative-sources">Inspect the evidence and its limits</h2>
        <p className={styles.evidenceIntro}>This record uses {narrative.sources.length} linked source{narrative.sources.length === 1 ? "" : "s"}: {independentSourceCount} independent and {institutionalSourceCount} first-party or institutional. First-party sources establish what a person or organization announced; they do not independently prove performance, ownership, causation, or impact.</p>
        {independentSourceCount === 0 && <p className={styles.warning}><strong>Evidence warning:</strong> No independent source is attached. Treat this as a documented research lead, not an independently corroborated conclusion.</p>}
        <ol>{narrative.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>{source.independent ? " · Independent reporting" : " · First-party or institutional source"}</li>)}</ol>
      </section>
    </> : <section className={styles.unknown}><h2>This case is not ready for interpretation</h2><p>The role description is present, but the career narrative has not passed source review. We leave the analysis open rather than fill the page with unsupported inference.</p></section>}

    {claims.length > 0 && <section className={styles.evidence} aria-labelledby="record-heading"><p className={styles.kicker}>Claim-to-source record</p><h2 id="record-heading">What we can responsibly say</h2><p className={styles.evidenceIntro}>Open any claim to see how it was established, qualified, or contradicted.</p>{claims.map((claim) => <article className={styles.claim} key={claim.id}><span className={styles.label}>{claim.claimType.replaceAll("_", " ")} · {claim.verificationStatus.replaceAll("_", " ")}</span><h3>{claim.permissibleLanguage || claim.statement}</h3>{claim.contradictionNote && <p><strong>Important qualification:</strong> {claim.contradictionNote}</p>}<details><summary>Inspect the evidence ({claim.evidence.length})</summary><div className={styles.sources}>{claim.evidence.length ? <ol>{claim.evidence.map((item) => <li key={item.id}><a href={item.source.url} target="_blank" rel="noreferrer">{item.source.title}</a>{item.source.publisher ? ` — ${item.source.publisher}` : ""}{item.source.publishedAt ? ` (${date(item.source.publishedAt)})` : ""}{item.source.primarySource ? " · Primary source" : ""}{item.exactPassage && <blockquote>{item.exactPassage}</blockquote>}{item.locator && <p>Location: {item.locator}</p>}</li>)}</ol> : <p>No public citation is attached yet.</p>}</div></details></article>)}</section>}

    {narrative && <section className={styles.ending}><div><span>What this case establishes</span><p>{narrative.whyItMatters}</p></div><div><span>What it cannot yet establish</span><p>{narrative.unresolved[0] ?? "Private contracts, governance, and internal authority may not be publicly knowable."}</p></div><div><span>The question to carry forward</span><p>{next?.question ?? guide.comparison}</p></div></section>}

    <nav className={styles.next} aria-label="Profile navigation"><p className={styles.kicker}>Continue through the Observatory</p><h2>Every case should alter how you read the next one.</h2><div className={styles.links}>{previous && <Link href={`/observatory/${nodeSlug(previous.name)}`}>← Previous: {previous.name}</Link>}<Link href="/observatory">All 41 people</Link>{next && <Link href={`/observatory/${nodeSlug(next.name)}`}>Next: {next.name} →</Link>}</div></nav>
  </main>;
}
