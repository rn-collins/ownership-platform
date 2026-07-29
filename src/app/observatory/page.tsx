import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { SEED, nodeSlug, type Node } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — Institutions of One",
  description: "Explore and compare 41 evidence-backed career cases through ownership, authority, portability, and dependence.",
  alternates: { canonical: "/observatory" },
  openGraph: { title: "The Observatory — Institutions of One", description: "Explore and compare 41 evidence-backed career cases through ownership, authority, portability, and dependence.", url: "/observatory", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "The Observatory — Institutions of One", description: "Explore and compare 41 evidence-backed career cases through ownership, authority, portability, and dependence.", images: ["/og.png"] },
};

export default async function ObservatoryPage() {
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
    <h1>Forty-one careers. One question: what actually makes a person’s work durable?</h1>
    <p className="lede">Explore evidence-backed public cases to see what a person built, what they could carry, what they controlled, what depended on someone else, and what might continue without them.</p>

    <section className="card" aria-labelledby="purpose-heading" style={{ marginTop: 18, borderLeft: "4px solid #b98f4d" }}>
      <p className="eyebrow">What this is for</p>
      <h2 id="purpose-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30 }}>Use the cases to test a structure—not to imitate a person.</h2>
      <p>Each career makes a different problem visible: a founder who owns the company but rents the audience; an executive whose authority depends on an employer; a creator whose identity is inseparable from the institution; or a public leader whose mandate may not survive succession.</p>
      <p><strong>The Observatory turns public evidence into comparison.</strong> It does not rank people, infer private facts, or mix participant responses into the case record.</p>
    </section>

    <ObservatoryMap nodes={nodes} initialView="directory" />

    <section style={{ margin: "64px 0 22px" }} aria-labelledby="investigate-heading">
      <p className="eyebrow">Go beyond a profile</p>
      <h2 id="investigate-heading" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.05, maxWidth: 880 }}>Three ways to interrogate the collection.</h2>
      <p className="rsub">Each view answers a different question. None changes the underlying case evidence.</p>
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
        <p>Start with one case, surface the tempting conclusion, and examine a structurally different case before generalizing.</p>
        <a className="button-primary" href="/observatory/countercases">Challenge a conclusion →</a>
      </section>

      <section style={{ padding: "28px", border: "1px solid #141b2e", background: "#b9d7ce" }} aria-labelledby="apply-heading">
        <p className="eyebrow">What does this reveal about my work?</p>
        <h3 id="apply-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30, margin: "8px 0" }}>Apply the cases</h3>
        <p>Describe a career arrangement and receive a private, unscored pathway through three cases and one countercase.</p>
        <a className="button-primary" href="/observatory/apply">Apply the research →</a>
      </section>
    </div>

    <section style={{ margin: "0 0 42px", padding: "34px 32px", border: "1px solid #141b2e", background: "#141b2e", color: "#faf8f4" }} aria-labelledby="organization-heading">
      <p className="eyebrow">Why this matters to organizations</p>
      <h2 id="organization-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0", color: "#faf8f4" }}>See the structure around exceptional people before it becomes a risk.</h2>
      <p style={{ maxWidth: 860, color: "#e5e0d6" }}>The same questions that clarify an individual career also help organizations examine key-person dependence, portable authority, partnership design, intellectual-property boundaries, succession, and whether a role has become an institution—or remains inseparable from one person.</p>
      <p style={{ maxWidth: 860, color: "#e5e0d6" }}>The cases do not prescribe a universal model. They provide concrete comparisons that make better executive questions possible.</p>
      <a className="button-primary" href="/partner" style={{ display: "inline-block", marginTop: 8 }}>Explore organizational work →</a>
    </section>

    <section style={{ margin: "0 0 42px", padding: "30px 32px", border: "1px solid #141b2e", background: "#efe8d8" }} aria-labelledby="integrity-heading">
      <p className="eyebrow">Research integrity</p>
      <h2 id="integrity-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>Inspect the evidence without turning methodology into another attraction.</h2>
      <p style={{ maxWidth: 820 }}>The public cases, private individual responses, and any future deidentified participant research are separate evidence layers. Public cases remain named and source-linked. Participant data is not currently used to alter them.</p>
      <p><a href="/observatory/evidence">Explore the case evidence →</a> &nbsp; <a href="/observatory/documentation">Review documentation status →</a></p>
    </section>

    <section id="nominate" style={{ marginTop: 64 }} aria-labelledby="nominate-heading">
      <p className="eyebrow">Extend the public collection</p>
      <h2 id="nominate-heading" style={{ fontFamily: "Georgia, serif", fontSize: 36, marginBottom: 8 }}>Whose career would make us ask a better question?</h2>
      <p className="rsub" style={{ marginBottom: 18 }}>Suggest someone whose work complicates the current patterns. They do not need to be famous; the value is what their structure helps everyone understand.</p>
      <ObservatoryNominate />
    </section>
  </main>;
}