import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED, nodeSlug, findNodeBySlug, type Node } from "@/lib/observatory_seed";
import { prisma } from "@/lib/db";
import styles from "./profile.module.css";

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

    <div className={styles.storyGrid}>
      <section className={styles.section}><h2>What to notice</h2><p>{node.name} helps us examine <strong>{(node.tension ?? "ownership and dependence").toLowerCase()}</strong> in {node.domain.toLowerCase()}.</p><p>Look past the title. Which parts of the work come from the person—their name, ideas, relationships, methods, or audience? Which parts come from an organization—the team, budget, data, distribution, authority, or legal rights? That separation is what makes this career useful to study.</p></section>
      <aside className={styles.aside}><h3>How certain are we?</h3><p>{reviewed ? `The claims displayed below have passed the current public-evidence review${reviewedAt ? ` as of ${date(reviewedAt)}` : ""}.` : "The role description has been checked and narrowed, but the full evidence review is still in progress."}</p><p>Public sources rarely reveal complete contracts, private economics, informal power, or what would happen if a key relationship ended. We do not fill those gaps with guesses.</p></aside>
    </div>

    {claims.length > 0 ? <section className={styles.evidence} aria-labelledby="record-heading"><p className={styles.kicker}>The public record</p><h2 id="record-heading">What we can responsibly say</h2><p className={styles.evidenceIntro}>These are bounded claims supported by the sources attached to them. Open the evidence only when you want to inspect how a statement was established or qualified.</p>{claims.map((claim) => <article className={styles.claim} key={claim.id}><span className={styles.label}>{claim.claimType.replaceAll("_", " ")} · {claim.verificationStatus.replaceAll("_", " ")}</span><h3>{claim.permissibleLanguage || claim.statement}</h3>{claim.contradictionNote && <p><strong>Important qualification:</strong> {claim.contradictionNote}</p>}<details><summary>Inspect the evidence ({claim.evidence.length})</summary><div className={styles.sources}>{claim.evidence.length ? <ol>{claim.evidence.map((item) => <li key={item.id}><a href={item.source.url} target="_blank" rel="noreferrer">{item.source.title}</a>{item.source.publisher ? ` — ${item.source.publisher}` : ""}{item.source.publishedAt ? ` (${date(item.source.publishedAt)})` : ""}{item.source.primarySource ? " · Primary source" : ""}{item.exactPassage && <blockquote>{item.exactPassage}</blockquote>}{item.locator && <p>Location: {item.locator}</p>}</li>)}</ol> : <p>No public citation is attached yet.</p>}</div></details></article>)}</section> : <section className={styles.unknown}><h2>What we are still researching</h2><p>We have verified the role description, but this page does not yet contain a complete career account. We are still sourcing the turning points, relationships, ownership arrangements, dependencies, and evidence that might complicate the first interpretation. Until those sources are attached, we leave those questions open.</p></section>}

    <section className={styles.next}><p className={styles.kicker}>Keep exploring</p><h2>See how the same question changes in another career.</h2><div className={styles.links}>{related.map((person) => <Link href={`/observatory/${nodeSlug(person.name)}`} key={person.name}>{person.name} →</Link>)}</div></section>
  </main>;
}