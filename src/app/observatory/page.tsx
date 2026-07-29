import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { SEED, nodeSlug, type Node } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — Institutions of One",
  description: "Explore and compare 41 evidence-backed career cases by asking what each person built, what could move with them, what they could govern, and what work, systems, relationships, or authority could persist when an essential dependency changes.",
  alternates: { canonical: "/observatory" },
  openGraph: { title: "The Observatory — Institutions of One", description: "Explore and compare 41 evidence-backed career cases by asking what each person built, what could move with them, what they could govern, and what work, systems, relationships, or authority could persist when an essential dependency changes.", url: "/observatory", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "The Observatory — Institutions of One", description: "Explore and compare 41 evidence-backed career cases by asking what each person built, what could move with them, what they could govern, and what work, systems, relationships, or authority could persist when an essential dependency changes.", images: ["/og.png"] },
};

export default async function ObservatoryPage({ searchParams }: { searchParams?: { mode?: string } }) {
  let nodes: Node[] = SEED;
  if (prisma) {
    try {
      const records = await prisma.observatoryCase.findMany({ where: { publicStatus: "public" }, orderBy: [{ primaryField: "asc" }, { displayName: "asc" }] });
      if (records.length) {
        const bySlug = new Map(records.map((record) => [record.slug, record]));
        nodes = SEED.map((seed) => {
          const record = bySlug.get(nodeSlug(seed.name));
          if (!record) return seed;
          return { ...seed, role: record.verificationStatus === "verified" && record.headline ? record.headline : seed.role, verificationStatus: record.verificationStatus as Node["verificationStatus"], evidenceCoverage: record.evidenceCoverage };
        });
      }
    } catch { nodes = SEED; }
  }

  return <main className="observatory-page">
    <p className="eyebrow">The Observatory</p>
    <h1>Explore the structure behind 41 public careers.</h1>
    <p className="lede">Compare evidence-backed cases through four questions: what did this person create, what can move with them, what can they govern, and what work, systems, relationships, or authority could persist when an essential dependency changes? Start with a person, a question about work, or a recurring problem shown across several careers.</p>

    <section className="card" aria-labelledby="purpose-heading" style={{ marginTop: 18, borderLeft: "4px solid #b98f4d" }}>
      <p className="eyebrow">What this is for</p>
      <h2 id="purpose-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30 }}>This is a comparative research collection—not a ranking or hall of fame.</h2>
      <p>Each career makes a different problem visible: a founder who owns the company but rents the audience; an executive whose authority depends on an employer; a creator whose identity is inseparable from the institution; or a public leader whose mandate may not survive succession.</p>
      <p><strong>Use it to test a conclusion.</strong> Open a case, compare it with another, filter by dependency, then find the countercase that makes the easy lesson harder to claim.</p><p>All 41 records use publicly available evidence. The Observatory does not infer private facts or mix participant responses into the public case record.</p>
    </section>

    <ObservatoryMap nodes={nodes} initialView={searchParams?.mode === "compare" ? "compare" : searchParams?.mode === "patterns" ? "patterns" : "directory"} />

    <section style={{ margin: "64px 0 22px" }} aria-labelledby="investigate-heading">
      <p className="eyebrow">Use the collection</p>
      <h2 id="investigate-heading" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.05, maxWidth: 880 }}>Three ways to examine the cases.</h2>
      <p className="rsub">Each tool helps you ask a different question about the same 41 evidence records.</p>
    </section>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginBottom: 42 }}>
      <section style={{ padding: "28px", border: "1px solid #141b2e", background: "#eef1f6" }} aria-labelledby="dependencies-heading">
        <p className="eyebrow">What does the work rely on?</p>
        <h3 id="dependencies-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30, margin: "8px 0" }}>Explore dependencies</h3>
        <p>Filter all 41 cases by employer, platform, capital, audience access, founder identity, intellectual property, and distribution.</p>
        <a className="button-primary" href="/observatory/dependencies">Open the explorer →</a>
      </section>

      <section style={{ padding: "28px", border: "1px solid #141b2e", background: "#f3eddf" }} aria-labelledby="countercases-heading">
        <p className="eyebrow">What would challenge the lesson?</p>
        <h3 id="countercases-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30, margin: "8px 0" }}>Find a countercase</h3>
        <p>Start with one case, identify the conclusion it may suggest, and examine a structurally different case before applying that conclusion elsewhere.</p>
        <a className="button-primary" href="/observatory/countercases">Challenge a conclusion →</a>
      </section>

      <section style={{ padding: "28px", border: "1px solid #141b2e", background: "#b9d7ce" }} aria-labelledby="apply-heading">
        <p className="eyebrow">What does this reveal about my work?</p>
        <h3 id="apply-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30, margin: "8px 0" }}>Apply the cases</h3>
        <p>Choose a problem in your own work and receive a private, unscored reading path through three relevant cases and one case that complicates the apparent lesson.</p>
        <a className="button-primary" href="/observatory/apply">Apply the cases to your work →</a>
      </section>
    </div>

    <section style={{ margin: "0 0 42px", padding: "34px 32px", border: "1px solid #141b2e", background: "#141b2e", color: "#faf8f4" }} aria-labelledby="organization-heading">
      <p className="eyebrow">Use this work with your group</p>
      <h2 id="organization-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0", color: "#faf8f4" }}>Understand where valuable work lives, what it depends on, and what could persist when an essential dependency changes.</h2>
      <p style={{ maxWidth: 860, color: "#e5e0d6" }}>RN works with companies, professional firms, universities, research teams, nonprofits, public institutions, creative organizations, communities, and other groups. The framework can support continuity planning, role and partnership design, research, workshops, practical tools, and ongoing decisions.</p>
      <p style={{ maxWidth: 860, color: "#e5e0d6" }}>The cases offer concrete comparisons for examining your own situation. The engagement is shaped around the question your group needs to answer or the work it needs to produce.</p>
      <a className="button-primary" href="/partner" style={{ display: "inline-block", marginTop: 8 }}>See ways to work together →</a>
    </section>

    <section style={{ margin: "0 0 42px", padding: "30px 32px", border: "1px solid #141b2e", background: "#efe8d8" }} aria-labelledby="integrity-heading">
      <p className="eyebrow">Evidence and methods</p>
      <h2 id="integrity-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>See what supports each case and what remains unknown.</h2>
      <p style={{ maxWidth: 820 }}>Every public case is built from named, linked sources. The evidence pages show how claims are classified, how thoroughly each case is documented, and which facts the public record cannot establish. Private assessment responses and future participant research remain separate from the named public cases.</p>
      <p><a href="/observatory/evidence">Examine the evidence →</a> &nbsp; <a href="/observatory/documentation">Check documentation status →</a></p>
    </section>

    <section id="nominate" style={{ marginTop: 64 }} aria-labelledby="nominate-heading">
      <p className="eyebrow">Extend the public collection</p>
      <h2 id="nominate-heading" style={{ fontFamily: "Georgia, serif", fontSize: 36, marginBottom: 8 }}>Whose career would help the collection examine something it currently misses?</h2>
      <p className="rsub" style={{ marginBottom: 18 }}>Suggest a person whose career adds a missing field, work arrangement, dependency, or point of comparison. The person does not need to be famous.</p>
      <ObservatoryNominate />
    </section>
  </main>;
}