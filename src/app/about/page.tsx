export const metadata = {
  title: "About — Institutions of One",
  description: "The purpose, researcher, independence, and development of Institutions of One.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <p className="eyebrow">Institutions of One · About</p>
      <h1>A research project about the people building careers larger than a job.</h1>
      <p className="lede">
        Institutions of One began with a simple observation: organizations routinely measure reach, productivity, and
        performance, but rarely measure whether the value a person creates becomes portable, durable, and meaningfully
        theirs. The project studies that gap across creators and professionals.
      </p>

      <div className="card">
        <h3>RN Collins</h3>
        <p>
          I am an independent researcher, writer, consultant, and J.D. candidate at Northeastern University School of Law.
          My background spans neuroscience, developmental psychology, medical education, qualitative research, emerging
          industries, and the design of research and intelligence systems. That interdisciplinary path shapes this project:
          it treats work as a psychological, organizational, economic, technological, and legal phenomenon at once.
        </p>
      </div>

      <div className="card">
        <h3>Why this research matters</h3>
        <p>
          A large audience does not necessarily mean ownership. Specialized expertise does not necessarily travel outside
          an employer. A personal brand does not necessarily become a durable business. By separating capability, authority,
          portability, ownership, and institutional support, the project aims to give people and organizations better
          language for understanding what is actually being built.
        </p>
      </div>

      <div className="card">
        <h3>Independence and funding</h3>
        <p>
          Institutions of One is independently led. Partnerships and financial support may fund data collection,
          analysis, publication, or events, but they do not buy control of assessment scores or research conclusions.
          Material support will be disclosed with the work it enables.
        </p>
      </div>

      <div className="card">
        <h3>Current stage</h3>
        <p>
          The project is in active pilot development. Two assessments are collecting exploratory responses, the
          Observatory is building a documented comparative case base, and the methods will continue to be tested and
          revised. The long-term aim is a public research program that produces useful evidence for workers, creators,
          organizations, policymakers, and the industries redesigning how work happens.
        </p>
      </div>

      <div className="actions">
        <a href="/methodology"><button className="primary">Read the methodology</button></a>
        <a href="/partner" className="hero-link">Participate or partner →</a>
      </div>

      <p className="disc" style={{ marginTop: 22 }}>
        Contact: <a href="mailto:collins.ra@northeastern.edu" className="fwlink">collins.ra@northeastern.edu</a> ·{" "}
        <a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer" className="fwlink">LinkedIn</a>
      </p>
    </main>
  );
}
