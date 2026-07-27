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
        A project about ownership has to model it. This page says plainly what is collected, why, and what you can do
        about it. If anything here is unclear, ask — the answer will be a person, not a policy.
      </p>

      <div className="card">
        <h3>The anonymous assessments</h3>
        <p>When you take an index, the system stores your banded answers, computed score, instrument and methodology
        versions, and an opaque assessment-event identifier — no name, email, or account identity. The identifier lets
        later optional research answers update the same assessment instead of creating duplicate respondents; it is not
        used to identify you. Your IP address is used briefly to prevent abuse and is never stored. Optional research
        answers are stored with the same anonymous assessment and are not added to the public findings unless the record
        passes the stated completion and version checks.</p>
      </div>

      <div className="card">
        <h3>The research list (only with consent)</h3>
        <p>Your email is stored only when you explicitly opt in, and the consent wording is versioned for the record.
        It is used to send occasional updates and, if you asked for it, your report. It is never sold. The on-site signup
        also adds you to the newsletter on beehiiv so it is one list.</p>
      </div>

      <div className="card">
        <h3>Your rights</h3>
        <p>You can unsubscribe at any time from the link in any email, or on the{" "}
        <a href="/unsubscribe" className="fwlink">unsubscribe page</a>. You can request a copy of your record or its
        deletion — the links in your emails are signed so they work without a login, and you can also email me directly
        and I will action it. Unsubscribing keeps a minimal consent record for the audit trail; deletion removes the row
        entirely.</p>
      </div>

      <div className="card">
        <h3>The Observatory</h3>
        <p>People appear on the public map only from public evidence or a consented nomination. If you are on the map and
        would like to be removed or corrected, contact me and it will be handled promptly.</p>
      </div>

      <p className="disc" style={{ marginTop: 16 }}>
        Contact: <a href="mailto:collins.ra@northeastern.edu" className="fwlink">collins.ra@northeastern.edu</a>.
      </p>
    </main>
  );
}
