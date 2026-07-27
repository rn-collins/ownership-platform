import { ObservatoryMap } from "@/components/ObservatoryMap";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MeasuredCounter } from "@/components/MeasuredCounter";
import { SEED } from "@/lib/observatory_seed";

const PUBLIC_FUNCTIONS = [
  {
    title: "Understand the phenomenon",
    body: "Read the theory, construct boundaries, methods, limitations, and the questions the program is testing.",
    href: "/methodology",
    action: "Understand the research →",
  },
  {
    title: "Measure yourself",
    body: "Use one of two distinct candidate instruments. Results are useful and exploratory, not validated or normed.",
    href: "/assess",
    action: "Choose an instrument →",
  },
  {
    title: "Explore the evidence",
    body: "Examine reviewed people, claims, sources, relationships, and events in the evidence-governed Observatory.",
    href: "/observatory",
    action: "Enter the Observatory →",
  },
  {
    title: "Follow the research",
    body: "See provisional findings and, as the cohort matures, methods, corrections, briefs, articles, and reports.",
    href: "/findings",
    action: "Follow the research →",
  },
  {
    title: "Participate or partner",
    body: "Contribute through assessment, nomination, research participation, or an independence-protected partnership.",
    href: "/partner",
    action: "See ways to participate →",
  },
] as const;

export default function Home() {
  const creators = SEED.filter((n) => n.kind === "creator").length;
  const pros = SEED.length - creators;

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">An Independent Research Program · RN Collins</p>
        <h1 className="hero-h1">The individual is becoming an institution.</h1>
        <p className="hero-lede">
          Institutions of One studies how people turn individual capability into durable, portable, ownable institutional
          power. It separates what someone can do from what travels with them, what they control, what survives them, and
          who captures the value they create.
        </p>
        <p className="hero-lede">
          <b>Understand the phenomenon, measure yourself, explore the evidence, follow the research, or help build it.</b>
        </p>
        <div className="hero-cta">
          <a href="/methodology"><button className="primary">Understand the research</button></a>
          <a href="/assess" className="hero-link">Measure yourself →</a>
        </div>
        <div className="hero-stats">
          <span><b>2</b> candidate instruments</span>
          <span className="hero-dot">·</span>
          <span><b>{SEED.length}</b> charted so far</span>
          <MeasuredCounter prefix="· " suffix="measured" />
          <span className="hero-dot">·</span>
          <span>building toward a flagship report at <b>Cannes Lions 2027</b></span>
        </div>
      </section>

      <section className="research" aria-labelledby="start-here">
        <h2 id="start-here" className="sec-h2">Start with what you want to do</h2>
        <p className="sec-sub">Five public functions organize the entire research program.</p>
        {PUBLIC_FUNCTIONS.map((item) => (
          <div className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body} <a href={item.href} className="fwlink">{item.action}</a></p>
          </div>
        ))}
      </section>

      <section className="lenses">
        <h2 className="sec-h2">Measure: one program, two distinct lenses</h2>
        <p className="sec-sub">
          The instruments answer different questions. Their scores must not be combined, equated, or used as substitutes
          for one another.
        </p>
        <div className="lensgrid">
          <a className="lenscard creator" href="/assess/creator">
            <span className="lenskick">Ownership Index</span>
            <span className="lensfor">control of value capture</span>
            <p className="lensdesc">
              How much of a creator&apos;s audience, rights, income channels, identity assets, and business infrastructure
              they control.
            </p>
            <span className="lensgo">Take the Ownership Index →</span>
          </a>
          <a className="lenscard pro" href="/assess/professional">
            <span className="lenskick">Portfolio Professional</span>
            <span className="lensfor">capability converted into practice</span>
            <p className="lensdesc">
              How capability becomes portable evidence, reusable systems, organizational adoption, negotiated mandate,
              authority, and portfolio direction.
            </p>
            <span className="lensgo">Take the Portfolio Professional →</span>
          </a>
        </div>
        <p className="disc">
          Both are candidate instruments. Published pilot results remain exploratory until their recorded validation and
          activation gates are met.
        </p>
      </section>

      <section id="map" className="mapsec">
        <div className="sec-head">
          <div>
            <h2 className="sec-h2">Explore: The Observatory</h2>
            <p className="sec-sub">
              A living evidence map of {creators} creators and {pros} professionals. Public inclusion, source support,
              review status, and instrument measurement remain separate records.
            </p>
          </div>
          <a href="/observatory" className="sec-link">Enter The Observatory →</a>
        </div>
        <ObservatoryMap />
      </section>

      <section className="statusnote">
        <p>
          This is an active research program, not a finished verdict. Instruments are being validated, Observatory cases
          are published only when their review state permits it, and cross-case findings will be bounded by the evidence
          and cohort actually available. <a href="/methodology" className="fwlink">Read the methodology →</a>
        </p>
      </section>

      <NewsletterSignup source="site" />
    </main>
  );
}
