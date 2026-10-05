// Body of the branded 404, shared by the root not-found (unmatched URLs, which needs its own
// chrome) and the (site) not-found (notFound() calls inside site routes, which already sit in
// the site header and footer).
export function NotFoundContent() {
  return <main className="editorial-page">
    <p className="eyebrow">Institutions of One · 404</p>
    <h1>That page is not here.</h1>
    <p className="lede">The link may be old, mistyped, or for an edition or case that has not been published. Start from the home page, or go straight to the editions or the cases.</p>
    <p className="hero-cta">
      <a className="cta-next" href="/">Back to the home page</a>
      <a className="hero-link" href="/edit">Browse the editions →</a>
      <a className="hero-link" href="/observatory">Explore the cases →</a>
    </p>
  </main>;
}
