export const metadata = {
  title: "Privacy & data use — Institutions of One",
  description: "What Institutions of One collects, why, how it is used, and your rights — consent-first, by design.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy & data use — Institutions of One", description: "What Institutions of One collects, why, how it is used, and your rights — consent-first, by design.", url: "/privacy", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Privacy & data use — Institutions of One", description: "What Institutions of One collects, why, how it is used, and your rights — consent-first, by design.", images: ["/og.png"] },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <p className="eyebrow">Institutions of One · Privacy</p>
      <h1>Privacy &amp; data use</h1>
      <p className="lede">
        This page explains what the site collects, why it is collected, how it is used, and how to request access or deletion. Questions can be sent directly to Rayven-Nikkita Collins.
      </p>

      <div className="card">
        <h2>The anonymous assessments</h2>
        <p>When you take an index, the system stores your answers grouped by response range, the five-dimensional profile, a secondary composite total, instrument and methodology
        versions, and a random assessment identifier — no name, email, or account identity. The identifier lets
        later optional research answers update the same assessment instead of creating duplicate respondents; it is not
        used to identify you. Your IP address is used briefly to prevent abuse and is never stored. Optional research
        answers are stored with the same anonymous assessment and are not added to the public findings unless the record
        contains a complete response from a supported assessment version.</p>
      </div>

      <div className="card">
        <h2>Email updates and the newsletter</h2>
        <p>Your email is stored only when you explicitly opt in, and the exact consent statement shown when you subscribe is stored with the date and form version.
        It is used to send occasional updates and, if you asked for it, your report. It is never sold. The on-site signup
        also adds you to the newsletter on beehiiv so the site and Beehiiv use the same subscriber list.</p>
      </div>

      <div className="card">
        <h2>Your rights</h2>
        <p>You can unsubscribe at any time from the link in any email, or on the{" "}
        <a href="/unsubscribe" className="fwlink">unsubscribe page</a>. You can request a copy of your record or its
        deletion — the links in your emails are signed so they work without a login, and you can also email me directly
        and I will process the request. Unsubscribing keeps a minimal consent record for the audit trail; deletion removes the row
        entirely.</p>
      </div>

      <div className="card">
        <h2>The Observatory</h2>
        <p>The 41 named case records use publicly available evidence. A nomination begins a private review; it does not automatically create a public record. If a case concerns you and you would like to request a correction or raise a privacy concern, contact me and it will be reviewed promptly.</p>
      </div>

      <p className="disc" style={{ marginTop: 16 }}>
        Contact: <a href="mailto:collins.ra@northeastern.edu" className="fwlink">collins.ra@northeastern.edu</a>.
      </p>
    </main>
  );
}
