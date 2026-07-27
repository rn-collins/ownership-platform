import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED, nodeSlug, findNodeBySlug, type Node } from "@/lib/observatory_seed";
import { prisma } from "@/lib/db";
import styles from "./profile.module.css";
import { CASE_NARRATIVES } from "@/lib/case_narratives";

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
    } catch { /* The public seed keeps the page available if the evidence store is unavailable. */ }
  }
  if (!node) notFound();

  const lens = node.kind === "creator" ? "creator" : "professional";
  const tensionGuides: Record<string, { meaning: string; lookFor: string; comparison: string }> = {
    "Role vs person": { meaning: "whether the authority belongs to the office, the person, or the relationship between them", lookFor: "the decisions, methods, relationships, and public trust associated with the person—not merely the title printed beside their name", comparison: "Ask what would remain recognizable if the title disappeared tomorrow." },
    "One field vs many": { meaning: "how one person creates coherence across work that institutions usually separate", lookFor: "a repeated question, method, audience, or point of view connecting apparently different roles", comparison: "Ask whether the range compounds into a body of work or fragments into unrelated projects." },
    "Creator vs company": { meaning: "where a public personality ends and an operating company begins", lookFor: "products, staff, intellectual property, customer relationships, and systems that can function beyond a single post or appearance", comparison: "Ask which value depends on continuing attention and which has become organizational." },
    "Inside vs outside": { meaning: "what a person can build within an institution without personally owning the institution", lookFor: "portable proof, methods, relationships, and reputation alongside employer-controlled teams, rights, budgets, data, and distribution", comparison: "Ask what could leave with the person without breaching a duty, contract, or relationship." },
    "Platform vs audience": { meaning: "whether public reach has become a direct relationship or remains rented access", lookFor: "email lists, memberships, products, communities, events, and other ways to reach people beyond an algorithmic feed", comparison: "Ask what happens to discovery, communication, and revenue if the largest platform changes its rules." },
    "Independence vs scale": { meaning: "what autonomy gains or loses when work grows", lookFor: "capital, collaborators, distribution, clients, and operating systems that increase reach while creating new obligations", comparison: "Ask which dependencies are chosen, negotiable, diversified, and survivable." },
    "Expertise vs authority": { meaning: "when knowledge becomes permission to decide, allocate resources, or change a field", lookFor: "adoption, mandate, institutional backing, standards, teams, and evidence that other people act on the person's ideas", comparison: "Ask whether the expertise can influence outcomes without the current credential or sponsor." },
  };
  const guide = tensionGuides[node.tension ?? ""] ?? { meaning: "how ownership, portability, authority, and dependence interact", lookFor: "the assets, relationships, systems, and permissions surrounding the work", comparison: "Ask what changes if the career loses its largest source of support." };
  const narrative = CASE_NARRATIVES[params.slug];
  const related = SEED.filter((candidate) => candidate.name !== node!.name && (candidate.tension === node!.tension || candidate.domain === node!.domain)).slice(0, 3);
  const reviewed = status === "verified";
  const date = (value: Date) => new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" }).format(value);

  return <main className={styles.page}>
    <Link href="/observatory" className={styles.back}>← Explore all 41 people</Link>
    <header className={styles.hero}>
      <div><p className={styles.kicker}>{node.tension ?? "An open career question"}</p><h1>{node.name}</h1><p className={styles.role}>{node.role}</p></div>
      <div className={styles.meta}><span>{node.domain}</span><span>{lens === "creator" ? "Creator-led work" : "Work built through organizations"}</span></div>
    </header>

    <section className={styles.question} aria-labelledby="central-question"><span>Why this person is here</span><h2 id="central-question">{node.question ?? "What does this career make possible—and what makes it fragile?"}</h2><p>We use the public record to examine the structure around the career—not to rate the person.</p></section>

    {narrative ? <>
      <section className={styles.section} aria-labelledby="career-story">
        <p className={styles.kicker}>The career story</p>
        <h2 id="career-story">How the work reached this point</h2>
        <p>{narrative.careerArc}</p>
        <h3>The turn that changed the structure</h3>
        <p>{narrative.structuralTurn}</p>
      </section>
      <div className={styles.storyGrid}>
        <section className={styles.section}><h2>What this case helps us see</h2><p>{narrative.whyItMatters}</p><p><strong>The lens:</strong> In this case, {(node.tension ?? "the career tension").toLowerCase()} means {guide.meaning}.</p><p><strong>Read with care:</strong> This is an interpretation of documented public facts, not a judgment of the person or proof of private ownership and power.</p></section>
        <aside className={styles.aside}><h3>Questions the record cannot yet answer</h3><ul>{narrative.unresolved.map((item) => <li key={item}>{item}</li>)}</ul></aside>
      </div>
      <section className={styles.evidence} aria-labelledby="narrative-sources">
        <p className={styles.kicker}>Sources for this profile</p>
        <h2 id="narrative-sources">Follow the evidence</h2>
        <p className={styles.evidenceIntro}>Independent reporting is labeled. First-party sources establish what an organization or person publicly announced about itself; they do not independently prove performance, ownership, or impact.</p>
        <ol>{narrative.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>{source.independent ? " · Independent reporting" : " · First-party or institutional source"}</li>)}</ol>
      </section>
    </> : <div className={styles.storyGrid}>
      <section className={styles.section}><h2>What this question is really asking</h2><p>In {node.name}&apos;s case, <strong>{(node.tension ?? "the career tension").toLowerCase()}</strong> means {guide.meaning}.</p><p><strong>Look for:</strong> {guide.lookFor}.</p><p><strong>Then test the structure:</strong> {guide.comparison}</p></section>
      <aside className={styles.aside}><h3>Research status</h3><p>This career narrative has not yet passed source review.</p></aside>
    </div>}

    {claims.length > 0 ? <section className={styles.evidence} aria-labelledby="record-heading"><p className={styles.kicker}>The public record</p><h2 id="record-heading">What we can responsibly say</h2><p className={styles.evidenceIntro}>These are bounded claims supported by the sources attached to them. Open the evidence only when you want to inspect how a statement was established or qualified.</p>{claims.map((claim) => <article className={styles.claim} key={claim.id}><span className={styles.label}>{claim.claimType.replaceAll("_", " ")} · {claim.verificationStatus.replaceAll("_", " ")}</span><h3>{claim.permissibleLanguage || claim.statement}</h3>{claim.contradictionNote && <p><strong>Important qualification:</strong> {claim.contradictionNote}</p>}<details><summary>Inspect the evidence ({claim.evidence.length})</summary><div className={styles.sources}>{claim.evidence.length ? <ol>{claim.evidence.map((item) => <li key={item.id}><a href={item.source.url} target="_blank" rel="noreferrer">{item.source.title}</a>{item.source.publisher ? ` — ${item.source.publisher}` : ""}{item.source.publishedAt ? ` (${date(item.source.publishedAt)})` : ""}{item.source.primarySource ? " · Primary source" : ""}{item.exactPassage && <blockquote>{item.exactPassage}</blockquote>}{item.locator && <p>Location: {item.locator}</p>}</li>)}</ol> : <p>No public citation is attached yet.</p>}</div></details></article>)}</section> : <section className={styles.unknown}><h2>What we are still researching</h2><p>We have verified the role description, but this page does not yet contain a complete career account. We are still sourcing the turning points, relationships, ownership arrangements, dependencies, and evidence that might complicate the first interpretation. Until those sources are attached, we leave those questions open.</p></section>}

    <section className={styles.next}><p className={styles.kicker}>Keep exploring</p><h2>See how the same question changes in another career.</h2><div className={styles.links}>{related.map((person) => <Link href={`/observatory/${nodeSlug(person.name)}`} key={person.name}>{person.name} →</Link>)}</div></section>
  </main>;
}