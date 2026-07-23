export const metadata = { title: "Assess — Institutions of One" };

export default function AssessChooserPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Assess</p>
      <h1>Two lenses. Pick yours.</h1>
      <p className="lede">
        One shift — the individual becoming an institution — measured through two instruments. Choose the one that fits
        the work you do. Take both if you&rsquo;re building on both sides.
      </p>

      <div className="card">
        <h3>The Ownership Index <span className="gold">·</span> for creators</h3>
        <p>How much of your audience, rights, revenue, identity, and infrastructure you actually own — scored to 100,
        with the ranked moves to own more. <a href="/assess/creator" className="fwlink">Take the Ownership Index →</a></p>
      </div>

      <div className="card">
        <h3>The Portfolio Professional <span className="gold">·</span> for professionals</h3>
        <p>How much of an institution you&rsquo;ve become inside your organization — capability, value, mandate, authority,
        thesis — scored to 100, with the moves that turn a role you fill into a role built around you.
        <a href="/assess/professional" className="fwlink"> Take the Portfolio Professional →</a></p>
      </div>

      <p className="meta" style={{ marginTop: 18 }}>No sign-up. Answered anonymously. Every score is reproducible under a stamped methodology version.</p>
    </main>
  );
}
