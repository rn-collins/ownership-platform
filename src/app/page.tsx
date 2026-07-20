export default function Home() {
  return (
    <main>
      <p className="eyebrow">The Portfolio Creator · Research Programme</p>
      <h1>The Ownership Index</h1>
      <p className="lede">
        AI has turned the individual creator into something close to an institution: a media business and rights-holder
        that is also one person. Reach is measured everywhere. Ownership is measured nowhere. The Ownership Index
        measures how much of themselves creators actually hold, across five dimensions, scored to 100.
      </p>
      <p className="lede">
        This is the companion to an industry’s agency and platform indices: they measure the businesses that serve
        creators; this measures the creators themselves.
      </p>

      <div className="card"><h3>01 · Audience Ownership</h3><p>A direct, portable relationship with the audience, versus a follower count on someone else’s algorithm.</p></div>
      <div className="card"><h3>02 · Content &amp; Rights</h3><p>Who owns the work and its future use. Rights retained and licensed, versus signed away in the small print.</p></div>
      <div className="card"><h3>03 · Revenue Ownership</h3><p>Income the creator controls directly, versus platform payouts and one-off brand fees.</p></div>
      <div className="card"><h3>04 · Identity &amp; Likeness</h3><p>Control of name, face and voice as synthetic media arrives. Licensed and protected, versus exposed.</p></div>
      <div className="card"><h3>05 · Business Infrastructure</h3><p>The scaffolding that lets one person operate as an institution that lasts.</p></div>

      <div className="actions">
        <a href="/assess"><button className="primary">Take the assessment</button></a>
        <a href="/methodology" style={{ textDecoration: "none" }}><span className="progress">Read the methodology →</span></a>
      </div>
    </main>
  );
}
