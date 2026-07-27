import { ObservatoryMap } from "@/components/ObservatoryMap";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MeasuredCounter } from "@/components/MeasuredCounter";
import { SEED } from "@/lib/observatory_seed";

export default function Home() {
  const creators = SEED.filter((n) => n.kind === "creator").length;
  const professionals = SEED.length - creators;

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Independent research by RN Collins</p>
        <h1 className="hero-h1">Some people no longer simply work within institutions. They function like institutions themselves.</h1>
        <p className="hero-lede">
          Institutions of One studies how creators and professionals build authority, audiences, intellectual property,
          income, and systems around their own work—and whether the value they create remains under their control.
        </p>
        <div className="hero-cta">
          <a href="/methodology"><button className="primary">Explore the research</button></a>
          <a href="/assess" className="hero-link">Take an assessment →</a>
        </div>
        <div className="hero-stats">
          <span><b>2</b> pilot assessments</span>
          <span className="hero-dot">·</span>
          <span><b>{SEED.length}</b> people mapped</span>
          <MeasuredCounter prefix="· " suffix="assessments completed" />
        </div>
      </section>

      <section className="research" aria-labelledby="research-questions">
        <h2 id="research-questions" className="sec-h2">The questions</h2>
        <p className="sec-sub">The project examines a shift visible across media, technology, science, law, business, and culture.</p>
        <div className="card"><h3>What makes a career portable?</h3><p>Can the person carry their reputation, relationships, knowledge, and opportunities across organizations and platforms?</p></div>
        <div className="card"><h3>Who owns the value?</h3><p>Who controls the audience, intellectual property, identity, income channels, data, and infrastructure that the work creates?</p></div>
        <div className="card"><h3>What turns individual work into an institution?</h3><p>When do a person’s methods, systems, authority, and body of work become durable enough to outlast a single role or project?</p></div>
      </section>

      <section className="lenses">
        <h2 className="sec-h2">Two ways to examine the shift</h2>
        <p className="sec-sub">Each pilot assessment addresses a different part of the research. Their results are reported separately.</p>
        <div className="lensgrid">
          <a className="lenscard creator" href="/assess/creator">
            <span className="lenskick">Ownership Index</span>
            <span className="lensfor">For creators and independent operators</span>
            <p className="lensdesc">Examines control of audience, rights, revenue, identity, and business infrastructure.</p>
            <span className="lensgo">Take the Ownership Index →</span>
          </a>
          <a className="lenscard pro" href="/assess/professional">
            <span className="lenskick">Portfolio Professional</span>
            <span className="lensfor">For professionals across organizations</span>
            <p className="lensdesc">Examines whether expertise has become visible, reusable, portable, and influential beyond a job description.</p>
            <span className="lensgo">Take the Portfolio Professional →</span>
          </a>
        </div>
        <p className="disc">Both assessments are in pilot development. Results are exploratory and should not be treated as psychological diagnoses, rankings, or population norms.</p>
      </section>

      <section id="map" className="mapsec">
        <div className="sec-head">
          <div>
            <h2 className="sec-h2">The Observatory</h2>
            <p className="sec-sub">A growing collection of {creators} creator cases and {professionals} professional cases across fields.</p>
          </div>
          <a href="/observatory" className="sec-link">Explore the cases →</a>
        </div>
        <ObservatoryMap />
      </section>

      <section className="statusnote">
        <p>
          Institutions of One is an active independent research project. Its methods, evidence, limitations, and corrections
          are published so readers can evaluate the work as it develops. <a href="/methodology" className="fwlink">Read the methodology →</a>
        </p>
      </section>

      <NewsletterSignup source="site" />
    </main>
  );
}
