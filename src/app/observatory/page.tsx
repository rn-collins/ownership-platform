import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";
import { prisma } from "@/lib/db";
import { SEED, nodeSlug, type Node } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — Institutions of One",
  description: "Explore 41 careers through the questions they raise about ownership, power, portability, and dependence.",
  alternates: { canonical: "/observatory" },
  openGraph: { title: "The Observatory — Institutions of One", description: "Explore 41 careers through the questions they raise about ownership, power, portability, and dependence.", url: "/observatory", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "The Observatory — Institutions of One", description: "Explore 41 careers through the questions they raise about ownership, power, portability, and dependence.", images: ["/og.png"] },
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
    <h1>Forty-one careers that refuse to fit inside one box.</h1>
    <p className="lede">Not a ranking. Not a hall of fame. This is a place to investigate how people build work that can travel, survive, compound, and sometimes become bigger than a job title.</p>

    <section className="card" aria-labelledby="why-heading" style={{ marginTop: 18, borderLeft: "4px solid #b98f4d" }}>
      <p className="eyebrow">Why these people?</p>
      <h2 id="why-heading" style={{ fontFamily: "Georgia, serif", fontSize: 30 }}>Each career makes a different problem visible.</h2>
      <p>Some people own the company but rent the audience. Some transform an institution but cannot take its machinery with them. Some work across so many fields that ordinary labels stop helping. We put these cases beside one another to see the choices, dependencies, and unanswered questions that a résumé hides.</p>
      <p><strong>The point is not to copy them.</strong> The point is to notice structures you can use to understand your own work—and to see what public information cannot establish.</p>
    </section>

    <section style={{ margin: "58px 0 42px", padding: "38px", border: "1px solid #141b2e", background: "#f2e95a" }} aria-labelledby="apply-heading">
      <p className="eyebrow">Start somewhere more personal</p>
      <h2 id="apply-heading" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1, maxWidth: 860, margin: "10px 0 16px" }}>Bring the structure of your work into the Observatory.</h2>
      <p style={{ maxWidth: 760, fontSize: 17, lineHeight: 1.55 }}>Describe your current career arrangement and receive a private, unscored pathway through three cases and one countercase—with questions to carry back into your own work.</p>
      <a className="button-primary" href="/observatory/apply">Apply the cases to my work →</a>
    </section>

    <section style={{ margin: "0 0 20px", padding: "28px 32px", border: "1px solid #141b2e", background: "#eef1f6" }} aria-labelledby="dependencies-heading">
      <p className="eyebrow">A different way into the collection</p>
      <h2 id="dependencies-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>Explore what the work depends upon.</h2>
      <p style={{ maxWidth: 760 }}>Filter the 41 cases by employer, platform, title, capital, audience access, personal visibility, public mandate, founder involvement, intellectual property, and distribution partners.</p>
      <a className="button-primary" href="/observatory/dependencies">Open the Dependency Explorer →</a>
    </section>

    <section style={{ margin: "0 0 20px", padding: "28px 32px", border: "1px solid #141b2e", background: "#f3eddf" }} aria-labelledby="countercases-heading">
      <p className="eyebrow">Resist the easy lesson</p>
      <h2 id="countercases-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>Find the case that complicates the conclusion.</h2>
      <p style={{ maxWidth: 760 }}>Start with any case, see the lesson it may appear to support, and examine a structurally different case before deciding the lesson generally follows.</p>
      <a className="button-primary" href="/observatory/countercases">Open the Countercase Finder →</a>
    </section>

    <section style={{ margin: "0 0 42px", padding: "28px 32px", border: "1px solid #141b2e", background: "#b9d7ce" }} aria-labelledby="timeline-heading">
      <p className="eyebrow">Read change across time</p>
      <h2 id="timeline-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>Trace structural turns across all 41 cases.</h2>
      <p style={{ maxWidth: 760 }}>Examine employment becoming independence, attention becoming a company, titles becoming mandates, practices becoming institutions, founder-led work becoming successor-capable, and platform access moving toward direct distribution.</p>
      <a className="button-primary" href="/observatory/timeline">Open the Cross-case Timeline →</a>
    </section>

    <section style={{ margin: "0 0 42px", padding: "28px 32px", border: "1px solid #141b2e", background: "#efe8d8" }} aria-labelledby="evidence-heading">
      <p className="eyebrow">Inspect the research itself</p>
      <h2 id="evidence-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>See what the collection knows, how it knows it, and what remains unresolved.</h2>
      <p style={{ maxWidth: 760 }}>Explore documentation strength, reliance on first-party descriptions, private or unknown ownership, competing evidence, recurring source publishers, and cases that need another review.</p>
      <a className="button-primary" href="/observatory/evidence">Open the Evidence Explorer →</a>
    </section>

    <section style={{ margin: "0 0 42px", padding: "28px 32px", border: "1px solid #141b2e", background: "#d9d0ff" }} aria-labelledby="living-findings-heading">
      <p className="eyebrow">Watch the research evolve</p>
      <h2 id="living-findings-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>See what the collection currently supports—and what it cannot yet claim.</h2>
      <p style={{ maxWidth: 760 }}>Generate provisional patterns, emerging exceptions, unresolved research gaps, framework-changing cases, and a review ledger directly from the standardized case records.</p>
      <a className="button-primary" href="/observatory/findings">Open Living Findings →</a>
    </section>

    <section style={{ margin: "0 0 20px", padding: "28px 32px", border: "1px solid #141b2e", background: "#f2e95a" }} aria-labelledby="teaching-heading">
      <p className="eyebrow">Classroom, team, and conference use</p>
      <h2 id="teaching-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>Practice structural reasoning with the evidence.</h2>
      <p style={{ maxWidth: 760 }}>Generate facilitator-ready exercises for classifying assets, reconstructing dependencies, testing explanations, identifying evidence that would change a conclusion, and redesigning work under constraint.</p>
      <a className="button-primary" href="/observatory/teaching">Open Teaching & Workshop Mode →</a>
    </section>

    <section style={{ margin: "0 0 42px", padding: "28px 32px", border: "1px solid #141b2e", background: "#d9d0ff" }} aria-labelledby="resources-heading">
      <p className="eyebrow">One record, several responsible forms</p>
      <h2 id="resources-heading" style={{ fontFamily: "Georgia, serif", fontSize: 34, margin: "8px 0" }}>Build a source-bounded production brief.</h2>
      <p style={{ maxWidth: 760 }}>Turn a case into a visual explainer, worksheet, discussion guide, short audio story, carousel, newsletter argument, teaching exercise, constellation, research question, or organization-facing workshop.</p>
      <a className="button-primary" href="/observatory/resources">Open the Case Resource Studio →</a>
    </section>

    <ObservatoryMap nodes={nodes} initialView="directory" />

    <section id="nominate" style={{ marginTop: 64 }} aria-labelledby="nominate-heading">
      <p className="eyebrow">Add a missing perspective</p>
      <h2 id="nominate-heading" style={{ fontFamily: "Georgia, serif", fontSize: 36, marginBottom: 8 }}>Whose career would make us ask a better question?</h2>
      <p className="rsub" style={{ marginBottom: 18 }}>Tell us about someone whose work does not fit the patterns you see here—or exposes a pattern we have missed. They do not need to be famous. We care about what their career helps everyone understand.</p>
      <ObservatoryNominate />
    </section>
  </main>;
}