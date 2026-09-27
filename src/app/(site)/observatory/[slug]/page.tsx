import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED, nodeSlug, findNodeBySlug, type Node } from "@/lib/observatory_seed";
import { prisma } from "@/lib/db";
import styles from "./profile.module.css";
import { CASE_NARRATIVES } from "@/lib/case_narratives";
import { getCaseResearch } from "@/lib/case_research";
import CaseLab from "./CaseLab";
import { CaseStatus } from "@/components/case/CaseStatus";
import { buildFramework, collectSources, formatLongDate, isLandingPage, pad, sourceKindLabel } from "@/components/case/caseData";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const revalidate = 3600;

// Evidence comes from the database; serve a cached render and refresh it hourly
// so a cold or unavailable database never sits in front of a reader.
export const revalidate = 3600;

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

const tensionGuides: Record<string, { meaning: string; lookFor: string; comparison: string }> = {
  "Role vs person": { meaning: "whether authority belongs to the office, the person, or the relationship between them", lookFor: "decisions, methods, relationships, and trust associated with the person—not merely the title", comparison: "Ask what remains recognizable if the title disappears." },
  "One field vs many": { meaning: "how one person creates coherence across work institutions usually separate", lookFor: "a repeated question, method, audience, or point of view connecting the roles", comparison: "Ask whether the range compounds or fragments." },
  "Owned vs rented": { meaning: "which parts of the work are directly controlled and which depend on access supplied by platforms, distributors, retailers, or partners", lookFor: "rights, customer relationships, audience access, data, products, and operating systems", comparison: "Ask what continues if the largest outside channel changes its rules." },
  "Portable vs embedded": { meaning: "what travels with the person and what remains inside an employer, client, platform, or other institutional container", lookFor: "portable reputation, methods, relationships, and proof beside employer-controlled teams, rights, budgets, data, and distribution", comparison: "Ask what could move lawfully and practically when the container changes." },
  "Scale vs dependence": { meaning: "what autonomy gains or loses as the work needs more capital, people, distribution, and infrastructure", lookFor: "dependencies that increase reach while creating obligations or single points of failure", comparison: "Ask which dependencies are visible, substitutable, negotiable, and survivable." },
  "Public mandate vs personal authority": { meaning: "how individual expertise becomes permission to coordinate public systems without becoming private ownership", lookFor: "formal mandate, cross-agency adoption, budgets, standards, succession, and evidence that institutions act", comparison: "Ask what capacity remains after the officeholder leaves." },
  "Institution vs individual": { meaning: "how a person stewards, changes, or speaks through an institution whose authority predates and exceeds them", lookFor: "the difference between personal decisions and inherited rules, reputation, resources, and symbolic power", comparison: "Ask what changed because of this leader and what belongs to the institution itself." },
};
const fallbackGuide = { meaning: "how ownership, portability, authority, and dependence interact", lookFor: "the assets, relationships, systems, and permissions surrounding the work", comparison: "Ask what changes if the career loses its largest source of support." };

const SECTIONS = [
  { id: "story", label: "Story" },
  { id: "framework", label: "Framework" },
  { id: "chronology", label: "Chronology" },
  { id: "reading", label: "Reading" },
  { id: "test", label: "Test" },
  { id: "compare", label: "Compare" },
  { id: "sources", label: "Sources" },
] as const;

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
  const person = node;

  const guide = tensionGuides[person.tension ?? ""] ?? fallbackGuide;
  const narrative = CASE_NARRATIVES[params.slug];
  const research = getCaseResearch(params.slug);
  const currentIndex = SEED.findIndex((candidate) => nodeSlug(candidate.name) === params.slug);
  const previous = currentIndex > 0 ? SEED[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < SEED.length - 1 ? SEED[currentIndex + 1] : undefined;
  const related = SEED.filter((candidate) => candidate.name !== person.name && (candidate.tension === person.tension || candidate.domain === person.domain)).slice(0, 3);

  // One source list drives both the status line counts and the sources section.
  const sources = collectSources(research, narrative);
  const sourceNumber = new Map(sources.map((source) => [source.id, source.number]));
  const independentCount = sources.filter((source) => source.kind === "independent").length;
  const landingPageCount = sources.filter((source) => isLandingPage(source.href)).length;

  const reviewed = reviewedAt ? formatLongDate(reviewedAt) : research ? formatLongDate(research.reviewed) : undefined;
  const finding = research?.payoff ?? narrative?.whyItMatters;
  const unknowns = research?.unknowns ?? narrative?.unresolved ?? [];
  const framework = narrative ? buildFramework({ built: narrative.structuralTurn, unknowns, carryFallback: guide.comparison }) : [];
  const hasCase = Boolean(narrative && research);
  const section = (id: (typeof SECTIONS)[number]["id"]) => pad(SECTIONS.findIndex((item) => item.id === id) + 1);

  return <main className={styles.page}>
    <Link href="/observatory" className={styles.back}>← Explore all {SEED.length} people</Link>

    <header className={styles.hero}>
      <h1>{person.name}</h1>
      <p className={styles.role}>{person.role}</p>
      <ul className={styles.chips} aria-label="Case details">
        {person.tension && <li>{person.tension}</li>}
        <li>{person.domain}</li>
        <li>{person.kind === "creator" ? "Creator case" : "Professional case"}</li>
        {reviewed && <li>Reviewed {reviewed}</li>}
      </ul>
      <div className={styles.question}>
        <p className={styles.questionLabel}>The case question</p>
        <p className={styles.questionText}>{person.question ?? "What does this career make possible—and what makes it fragile?"}</p>
      </div>
      {finding && <div className={styles.finding}>
        <p className={styles.findingLabel}>What this case shows</p>
        <p className={styles.findingText}>{finding}</p>
      </div>}
      <CaseStatus total={sources.length} independent={independentCount} status={status} />
    </header>

    {hasCase && narrative && research ? <>
      <nav className={styles.rail} aria-label="Case sections">
        <ol>{SECTIONS.map((item, index) => <li key={item.id}><a href={`#${item.id}`}><span aria-hidden="true">{pad(index + 1)}</span>{item.label}</a></li>)}</ol>
      </nav>

      <section className={styles.section} id="story" aria-labelledby="story-heading">
        <p className={styles.num} aria-hidden="true">{section("story")}</p>
        <h2 id="story-heading">The career in brief</h2>
        <p className={styles.lede}>{narrative.careerArc}</p>
        {narrative.whyItMatters !== finding && <div className={styles.turn}><p className={styles.turnLabel}>Why the case matters</p><p>{narrative.whyItMatters}</p></div>}
      </section>

      <section className={styles.section} id="framework" aria-labelledby="framework-heading">
        <p className={styles.num} aria-hidden="true">{section("framework")}</p>
        <h2 id="framework-heading">Build · Carry · Control · Continue</h2>
        <p className={styles.sectionIntro}>Four separate questions. Public visibility alone answers none of them.</p>
        <div className={styles.framework}>
          {framework.map((cell) => <article key={cell.key}>
            <h3>{cell.key}</h3>
            <p className={styles.frameworkPrompt}>{cell.prompt}</p>
            <p className={styles.frameworkLabel}>{cell.label}</p>
            <p>{cell.text}</p>
          </article>)}
        </div>
        <p className={styles.sectionIntro}><strong>The tension in this case:</strong> {person.tension ? <>here, {person.tension.toLowerCase()} means {guide.meaning}.</> : <>{guide.meaning}.</>} Look for {guide.lookFor}.</p>
      </section>

      <section className={styles.section} id="chronology" aria-labelledby="chronology-heading">
        <p className={styles.num} aria-hidden="true">{section("chronology")}</p>
        <h2 id="chronology-heading">What happened</h2>
        <ol className={styles.timeline}>
          {research.chronology.map((item) => <li className={styles.event} key={item.date + item.event}>
            <p className={styles.eventDate}>{item.date}</p>
            <div>
              <p>{item.event}</p>
              {item.sourceIds.length > 0 && <p className={styles.cites}>Sources: {item.sourceIds.map((sourceId, index) => {
                const number = sourceNumber.get(sourceId);
                return <span key={sourceId}>{index > 0 && ", "}{number ? <a href={`#source-${number}`} aria-label={`Source ${number}`}>{pad(number)}</a> : sourceId}</span>;
              })}</p>}
            </div>
          </li>)}
        </ol>
      </section>

      <section className={styles.section} id="reading" aria-labelledby="reading-heading">
        <p className={styles.num} aria-hidden="true">{section("reading")}</p>
        <h2 id="reading-heading">What it may mean, and where the evidence stops</h2>
        <p className={styles.lede}>{research.interpretation}</p>
        <div className={styles.read}>
          <section aria-labelledby="complication-heading"><h3 id="complication-heading">Evidence that complicates the first reading</h3><ul>{research.complication.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section aria-labelledby="unknowns-heading"><h3 id="unknowns-heading">What remains unknown</h3><ul>{unknowns.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
      </section>

      <section className={styles.section} id="test" aria-labelledby="test-heading">
        <p className={styles.num} aria-hidden="true">{section("test")}</p>
        <h2 id="test-heading">Change one dependency</h2>
        <p className={styles.sectionIntro}>Use a counterfactual to expose the architecture: answer first, then compare your reasoning with the record.</p>
        <CaseLab slug={params.slug} name={person.name} tension={person.tension ?? ""} unknowns={unknowns} dependencyPrompt={guide.comparison} />
      </section>

      <section className={styles.section} id="compare" aria-labelledby="compare-heading">
        <p className={styles.num} aria-hidden="true">{section("compare")}</p>
        <h2 id="compare-heading">Read it against another career</h2>
        <p className={styles.sectionIntro}>Hold the tension constant across different careers, or hold the field constant and inspect a different path. A comparison is useful because it can challenge the first explanation.</p>
        <ul className={styles.compareGrid}>{related.map((other) => <li key={other.name}><Link href={`/observatory/${nodeSlug(other.name)}`}><span>{other.tension === person.tension ? "Same tension" : "Same field"}</span><strong>{other.name}</strong><small>{other.question ?? "Open the case question"}</small></Link></li>)}</ul>
        <Link className={styles.textLink} href="/observatory?mode=compare">Open the full comparison tool →</Link>
      </section>

      <section className={styles.section} id="sources" aria-labelledby="sources-heading">
        <p className={styles.num} aria-hidden="true">{section("sources")}</p>
        <h2 id="sources-heading">Sources and their limits</h2>
        <p className={styles.sectionIntro}>{sources.length} source{sources.length === 1 ? "" : "s"}: {independentCount} independent and {sources.length - independentCount} primary or institutional. First-party sources establish what a person or organization announced; they do not independently prove performance, ownership, causation, or impact. This is analysis of a public record, not a rating of the person.</p>
        <p className={styles.sourceNote}>Each link was checked by hand when the record was last reviewed{reviewed ? ` (${reviewed})` : ""}; the site does not continuously re-check them. A broken link, or one that does not support its statement, is a defect in the record — please report it.{landingPageCount > 0 && <> {landingPageCount} link{landingPageCount === 1 ? " leads" : "s lead"} to a publisher or organization landing page rather than the exact supporting item, so {landingPageCount === 1 ? "it identifies" : "they identify"} a research lead rather than a claim-level citation.</>}</p>
        <ol className={styles.sourceList}>{sources.map((source) => <li id={`source-${source.number}`} key={source.id}>
          <span className={styles.sourceNum} aria-hidden="true">{pad(source.number)}</span>
          <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
          <span className={styles.sourceMeta}>{[sourceKindLabel(source.kind), source.publisher, source.published ? formatLongDate(source.published) : ""].filter(Boolean).join(" · ")}</span>
        </li>)}</ol>

        {claims.length > 0 && <div className={styles.claims}>
          <h3>Claim-to-source record</h3>
          <p className={styles.sectionIntro}>Open any claim to see how it was established, qualified, or contradicted.</p>
          {claims.map((claim) => <article className={styles.claim} key={claim.id}>
            <p className={styles.claimLabel}>{claim.claimType.replaceAll("_", " ")} · {claim.verificationStatus.replaceAll("_", " ")}</p>
            <h4>{claim.permissibleLanguage || claim.statement}</h4>
            {claim.contradictionNote && <p><strong>Important qualification:</strong> {claim.contradictionNote}</p>}
            <details><summary>Inspect the evidence ({claim.evidence.length})</summary>{claim.evidence.length ? <ol>{claim.evidence.map((item) => <li key={item.id}><a href={item.source.url} target="_blank" rel="noreferrer">{item.source.title}</a>{item.source.publisher ? ` — ${item.source.publisher}` : ""}{item.source.publishedAt ? ` (${formatLongDate(item.source.publishedAt)})` : ""}{item.source.primarySource ? " · Primary source" : ""}{item.exactPassage && <blockquote>{item.exactPassage}</blockquote>}{item.locator && <p>Location: {item.locator}</p>}</li>)}</ol> : <p>No public citation is attached yet.</p>}</details>
          </article>)}
        </div>}
      </section>
    </> : <section className={styles.unknown} aria-labelledby="not-ready-heading"><h2 id="not-ready-heading">This case is not ready for interpretation</h2><p>The role description is present, but the career narrative has not passed source review. We leave the analysis open rather than fill the page with unsupported inference.</p></section>}

    <section className={styles.lens} aria-labelledby="lens-heading">
      <h2 id="lens-heading">Turn the lens on your own work</h2>
      <p>The same four questions — Build, Carry, Control, Continue — apply to any career, including yours.</p>
      <div className={styles.lensActions}>
        <Link href="/assess" className={`cta-next ${styles.ctaNext}`}>Take the 5-minute assessment <span aria-hidden="true">→</span></Link>
        <p className={styles.lensAlt}>Working inside an organization? <Link href="/assess/professional">Take the professional assessment</Link>.</p>
      </div>
      <NewsletterSignup source="observatory" variant="inline" />
    </section>

    <nav className={styles.next} aria-label="More cases">
      {next && <Link className={styles.nextCase} href={`/observatory/${nodeSlug(next.name)}`}>
        <span className={styles.nextLabel}>Next case: {next.name}{next.question ? " — " : ""}</span>
        {next.question && <span className={styles.nextQuestion}>{next.question}</span>}
      </Link>}
      <ul className={styles.links}>
        {previous && <li><Link href={`/observatory/${nodeSlug(previous.name)}`}>← Previous: {previous.name}</Link></li>}
        <li><Link href="/observatory">All {SEED.length} people</Link></li>
      </ul>
    </nav>
  </main>;
}
