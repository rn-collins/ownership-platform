import { ObservatoryMap } from "@/components/ObservatoryMap";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SEED } from "@/lib/observatory_seed";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-index" aria-hidden="true">01 / THE PREMISE</div>
        <p className="eyebrow">A research and editorial project by RN Collins</p>
        <h1 className="hero-h1">What will still be yours when the job, platform, or title changes?</h1>
        <p className="hero-lede">
          Your audience, reputation, and expertise feel like yours. Some of it belongs to an employer or a platform. Find out which.
        </p>
        <div className="hero-cta">
          <a className="cta-next" href="/assess">Take the 5-minute assessment</a>
          <a href="/observatory" className="hero-link">Or explore 41 public careers →</a>
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
          <p className="eyebrow">The framework</p>
          <h2 className="display-h2">Build · Carry · Control · Continue</h2>
        </div>
        <div className="question-grid">
          <article><span>01</span><h3>Build</h3><p>What you made: the work, method, audience, or product.</p></article>
          <article><span>02</span><h3>Carry</h3><p>What moves with you: expertise, reputation, relationships.</p></article>
          <article><span>03</span><h3>Control</h3><p>What you own or govern, and what someone else does.</p></article>
          <article><span>04</span><h3>Continue</h3><p>What keeps working if the job, platform, or title changes.</p></article>
        </div>
        <p><a href="/methodology" className="sec-link">How the framework is measured →</a></p>
      </section>

      <section className="editorial-section split-section">
        <div className="section-number">03</div>
        <div className="section-intro">
          <p className="eyebrow">Two pilot assessments</p>
          <h2 className="display-h2">Examine what you control.<br/>Examine what you can carry.</h2>
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
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
