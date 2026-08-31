export const metadata = {
  title: "Assessments — Institutions of One",
  description: "Choose one of two pilot assessments exploring ownership or professional portability.",
  alternates: { canonical: "/assess" },
  openGraph: { title: "Assessments — Institutions of One", description: "Choose one of two pilot assessments exploring ownership or professional portability.", url: "/assess", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Assessments — Institutions of One", description: "Choose one of two pilot assessments exploring ownership or professional portability.", images: ["/og.png"] },
};

export default function AssessChooserPage() {
  return (
    <main className="choice-page">
      <p className="eyebrow">Institutions of One · Assessments</p>
      <h1>What part of your work do you want to examine?</h1>
      <p className="lede">
        The project includes two separate pilot assessments. Choose the one that matches the question you want to answer.
        You may complete both, but each produces its own result and the results answer different questions and should be read separately.
      </p>

      <div className="card">
        <h3>How much of what you create do you control?</h3>
        <p>
          The <b>Ownership Index</b> is designed for creators and independent operators. It examines control of audience,
          intellectual property, income channels, public identity, and business infrastructure.
          <a href="/assess/creator" className="fwlink"> Take the Ownership Index →</a>
        </p>
      </div>

      <div className="card">
        <h3>How portable and influential has your expertise become?</h3>
        <p>
          The <b>Portfolio Professional</b> assessment is designed for people whose work crosses roles, teams, or
          organizations. It examines capability ownership, institutional value, mandate and autonomy, visibility and authority, and whether your work has a coherent thesis.
          <a href="/assess/professional" className="fwlink"> Take the Portfolio Professional →</a>
        </p>
      </div>

      <h2 style={{ marginTop: 34 }}>What the two instruments have in common</h2>
      <p>
        Each is twenty questions across five areas, four questions to an area, and each takes
        about five minutes. Both are built on the same underlying idea: that the interesting
        question about a person&apos;s work is not how visible it is but how much of the system
        behind it they actually hold. Audience, rights, revenue, identity and infrastructure are
        the five for creators; capability, institutional value, mandate, authority and thesis are
        the five for professionals. In both cases the areas are scored separately, because the
        pattern across them says more than any single total.
      </p>

      <h2 style={{ marginTop: 26 }}>How to read a result</h2>
      <p>
        A result describes where control is concentrated and where it depends on something you do
        not hold. A low score in one area is not a failing grade; a creator who reaches an audience
        entirely through one platform and knows it may be making a deliberate trade. What the
        instrument is useful for is making that trade explicit, so it can be reviewed rather than
        discovered during a platform change. The five area scores are meant to be read together
        and against each other, not summed into a single verdict.
      </p>

      <h2 style={{ marginTop: 26 }}>Which one to choose</h2>
      <p>
        If your work is published under your own name and your income depends on reaching people
        directly, the Ownership Index is the closer fit. If your work happens inside organisations
        and the open question is how much of it would travel with you, start with the Portfolio
        Professional. People whose work does both often find it clearest to take them separately
        and compare, rather than trying to answer one set of questions for two situations at once.
      </p>

      <p className="meta" style={{ marginTop: 18 }}>
        No account is required. Responses are anonymous. Both assessments are pilots, so results are exploratory and should not be read as diagnoses, rankings, or standards a person must meet.
        The methodology, including how the areas were chosen and what the current version does not
        yet measure, is documented in the <a href="/methodology" className="fwlink">methodology</a>.
      </p>
    </main>
  );
}
