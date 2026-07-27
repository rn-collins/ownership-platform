export const metadata = {
  title: "Assessments — Institutions of One",
  description: "Choose one of two pilot assessments exploring ownership or professional portability.",
};

export default function AssessChooserPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Assessments</p>
      <h1>What part of your work do you want to examine?</h1>
      <p className="lede">
        The project includes two separate pilot assessments. Choose the one that matches the question you want to answer.
        You may complete both, but each produces its own result and the scores should not be combined.
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
          organizations. It examines evidence of capability, reusable systems, adoption, mandate, authority, and direction.
          <a href="/assess/professional" className="fwlink"> Take the Portfolio Professional →</a>
        </p>
      </div>

      <p className="meta" style={{ marginTop: 18 }}>
        No account is required. Responses are anonymous. Both assessments are pilots, so results are exploratory rather
        than diagnostic or normative.
      </p>
    </main>
  );
}
