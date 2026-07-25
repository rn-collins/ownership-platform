import { ObservatoryMap } from "@/components/ObservatoryMap";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MeasuredCounter } from "@/components/MeasuredCounter";
import { SEED } from "@/lib/observatory_seed";

export default function Home() {
  const creators = SEED.filter((n) => n.kind === "creator").length;
  const pros = SEED.length - creators;

  return (
    <main>
      {/* ---- hero ---- */}
      <section className="hero">
        <p className="eyebrow">An Independent Research Program · RN Collins</p>
        <h1 className="hero-h1">The individual is becoming an institution.</h1>
        <p className="hero-lede">
          Work is shifting from <em>&ldquo;get hired for a role&rdquo;</em> to <em>&ldquo;the role gets built around
          you.&rdquo;</em> Creators and professionals alike are becoming institutions in themselves — their own audience,
          capability, rights, and durable value. Reach and activity are measured everywhere. <b>Ownership and durability —
          the part that actually makes someone an institution — are measured nowhere.</b>
        </p>
        <p className="hero-lede"><b>The individual is becoming an institution. Institutions of One measures what makes that real</b> — in public: one method, two lenses, a living map.</p>
        <div className="hero-cta">
          <a href="/assess"><button className="primary">Measure yourself</button></a>
          <a href="#map" className="hero-link">See the map ↓</a>
        </div>
        <div className="hero-stats">
          <span><b>2</b> instruments</span>
          <span className="hero-dot">·</span>
          <span><b>{SEED.length}</b> charted so far</span>
          <MeasuredCounter prefix="· " suffix="measured" />
          <span className="hero-dot">·</span>
          <span>toward a flagship report at <b>Cannes Lions 2027</b></span>
        </div>
      </section>

      {/* ---- the two instruments ---- */}
      <section className="lenses">
        <h2 className="sec-h2">One method, two lenses</h2>
        <div className="lensgrid">
          <a className="lenscard creator" href="/assess/creator">
            <span className="lenskick">Ownership Index</span>
            <span className="lensfor">for creators</span>
            <p className="lensdesc">How much of their business a creator actually owns — audience, rights, revenue, identity,
              and infrastructure — scored to 100.</p>
            <span className="lensgo">Take the Ownership Index →</span>
          </a>
          <a className="lenscard pro" href="/assess/professional">
            <span className="lenskick">Portfolio Professional</span>
            <span className="lensfor">for professionals</span>
            <p className="lensdesc">How much of an institution a professional has become inside their organization —
              capability, value, mandate, authority, and thesis.</p>
            <span className="lensgo">Take the Portfolio Professional →</span>
          </a>
        </div>
      </section>

      {/* ---- live Observatory preview ---- */}
      <section id="map" className="mapsec">
        <div className="sec-head">
          <div>
            <h2 className="sec-h2">The Observatory</h2>
            <p className="sec-sub">The living map that ties both lenses together — {creators} creators who own their work and
              {" "}{pros} professionals whose roles were built around them, drawn from public evidence. Filter, search, and open any node.</p>
          </div>
          <a href="/observatory" className="sec-link">Enter The Observatory →</a>
        </div>
        <ObservatoryMap />
      </section>

      {/* ---- newsletter ---- */}
      <NewsletterSignup source="site" />

      {/* ---- honest status + methodology ---- */}
      <section className="statusnote">
        <p>The framework and both instruments are built. The live measurement is underway now — one conversation and one
          nomination at a time. You&rsquo;ll watch it get sharper in public. <a href="/methodology" className="fwlink">Read the methodology →</a></p>
      </section>
    </main>
  );
}
