export default function Home() {
  return (
    <main>
      <p className="eyebrow">An Independent Research Program · RN Collins</p>
      <h1>Institutions of One</h1>
      <p className="lede">
        Work is shifting from “get hired for a role” to “the role gets built around you.” Individuals — creators and
        professionals alike — are becoming institutions: their own audience, capability, rights, and durable value.
        Reach and activity are measured everywhere. Ownership and durability — the part that actually makes someone an
        institution — are measured nowhere. Institutions of One measures it.
      </p>
      <p className="lede">
        One method, two lenses, culminating in a flagship report at <b>Cannes Lions 2027</b>. The framework is built;
        the live measurement is underway now.
      </p>

      <div className="card">
        <h3>The Ownership Index <span className="gold">·</span> creators</h3>
        <p>How much of their business a creator actually owns — audience, rights, revenue, identity, and infrastructure —
        scored to 100. <a href="/assess/creator" className="fwlink">Take the Ownership Index →</a></p>
      </div>
      <div className="card">
        <h3>The Portfolio Professional <span className="gold">·</span> professionals</h3>
        <p>How much of an institution a professional has become inside their organization — capability, value, mandate,
        authority, and thesis. <a href="/assess/professional" className="fwlink">Take the Portfolio Professional Index →</a></p>
      </div>
      <div className="card">
        <h3>The Observatory <span className="gold">·</span> the map that links them</h3>
        <p>The living map that ties both indices together — a nodal view of people already living the shift: creators who
        own their work, and professionals whose roles were built around them. <a href="/observatory" className="fwlink">Enter The Observatory →</a></p>
      </div>

      <div className="actions">
        <a href="/assess"><button className="primary">Take the assessment</button></a>
        <a href="/methodology" style={{ textDecoration: "none" }}><span className="progress">Read the methodology →</span></a>
      </div>
    </main>
  );
}
