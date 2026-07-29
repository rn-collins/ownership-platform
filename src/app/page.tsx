import { ObservatoryMap } from "@/components/ObservatoryMap";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SEED } from "@/lib/observatory_seed";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-index" aria-hidden="true">01 / THE PREMISE</div>
        <p className="eyebrow">A research and editorial project by Rayven-Nikkita Collins</p>
        <h1 className="hero-h1">What will still be yours when the job, platform, or title changes?</h1>
        <p className="hero-lede">
          People build valuable work inside companies, platforms, professions, communities, and independent practices. Institutions of One studies what happens to that work when a job, platform, client, or title changes: what the person built, what they can carry, what they control, and what work, systems, relationships, or authority could persist when an essential dependency changes.
        </p>
        <div className="hero-cta">
          <a className="button-primary" href="/methodology">Understand the framework</a>
          <a href="/observatory" className="hero-link">Explore 41 public cases →</a>
        </div>
        <p className="hero-note">Creators · employees · executives · independent professionals · researchers · public leaders · the groups working with them</p>
      </section>

      <section className="manifesto">
        <p className="manifesto-kicker">A familiar work structure</p>
        <p className="manifesto-line">An organization often controls the name, audience, infrastructure, budget, and decision-making authority behind a person’s work.</p>
        <p className="manifesto-kicker">Another structure</p>
        <p className="manifesto-line accent">Some people also build names, audiences, methods, relationships, and businesses that can move between roles or continue independently.</p>
      </section>

      <section className="editorial-section">
        <div className="section-number">02</div>
        <div className="section-intro">
          <p className="eyebrow">The Build–Carry–Control–Continue framework</p>
          <h2 className="display-h2">Four questions reveal the structure beneath a career.</h2>
        </div>
        <div className="question-grid">
          <article><span>01</span><h3>Build</h3><p>What body of work, method, audience, product, or operating system did the person create?</p></article>
          <article><span>02</span><h3>Carry</h3><p>What expertise, reputation, relationships, and opportunities can move with them?</p></article>
          <article><span>03</span><h3>Control</h3><p>What do they own or govern—and what still belongs to an employer, platform, investor, or collaborator?</p></article>
          <article><span>04</span><h3>Continue</h3><p>What work, systems, relationships, or authority could persist when an essential dependency changes?</p></article>
        </div>
      </section>

      <section className="editorial-section split-section">
        <div className="section-number">03</div>
        <div className="section-intro">
          <p className="eyebrow">Two pilot assessments</p>
          <h2 className="display-h2">Examine what you control.<br/>Examine what you can carry.</h2>
          <p className="sec-sub">Choose the question that matches your work. One assessment examines what you control; the other examines what you can carry between roles and organizations.</p>
        </div>
        <div className="lensgrid">
          <a className="lenscard creator" href="/assess/creator">
            <span className="lensnum">A</span><span className="lenskick">Ownership Index</span>
            <span className="lensfor">For creators and independent operators</span>
            <p className="lensdesc">See where your audience, rights, revenue, identity, and infrastructure sit—and how much of that foundation is truly yours.</p>
            <span className="lensgo">Take the pilot →</span>
          </a>
          <a className="lenscard pro" href="/assess/professional">
            <span className="lensnum">B</span><span className="lenskick">Portfolio Professional</span>
            <span className="lensfor">For people whose work exceeds a job title</span>
            <p className="lensdesc">Examine whether your capability has become visible, reusable, adopted, authoritative, and portable across institutions.</p>
            <span className="lensgo">Take the pilot →</span>
          </a>
        </div>
        <p className="disc">These are exploratory research instruments—not diagnoses, rankings, or measures of human worth.</p>
      </section>

      <section className="editorial-section mapsec">
        <div className="section-number">04</div>
        <div className="sec-head">
          <div><p className="eyebrow">The Observatory</p><h2 className="display-h2">Examine the structure<br/>behind the work.</h2><p className="sec-sub">Explore 41 public careers to see what each person built, what still depends on an employer or platform, and what the public record cannot tell us.</p></div>
          <a href="/observatory" className="sec-link">Open the Observatory →</a>
        </div>
        <ObservatoryMap embed />
      </section>

      <section className="closing-call">
        <p className="eyebrow">The I/1 Edit</p>
        <h2>One original idea about work, power, ownership, and how valuable work is structured around people and organizations.</h2>
        <p>Every other week, the inbox edition gives you the central argument and strongest case moments. The permanent web edition adds sources, case comparisons, updates, and related cases.</p>
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
