export const metadata = {
  title: "About — Institutions of One",
  description: "The purpose, researcher, and development of Institutions of One.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Institutions of One", description: "The purpose, researcher, and development of Institutions of One.", url: "/about", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "About — Institutions of One", description: "The purpose, researcher, and development of Institutions of One.", images: ["/og.png"] },
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <p className="eyebrow">Institutions of One · About</p>
      <h1>A research project about what people create, what can move with them, what they can govern, and what work, systems, relationships, or authority could persist when an essential dependency changes.</h1>
      <p className="lede">
        Institutions of One began with a simple observation: organizations routinely measure reach, productivity, and
        performance, but rarely measure whether the value a person creates becomes portable, durable, and meaningfully
        theirs. The project studies that question across creators, independent operators, employees, executives, researchers, public leaders, and other professionals.
      </p>

      <div className="card">
        <h3>RN Collins</h3>
        <p>
          I am an independent researcher, writer, consultant, and J.D. candidate at Northeastern University School of Law.
          My background spans neuroscience, developmental psychology, medical education, qualitative research, emerging
          industries, and the design of research and intelligence systems. That interdisciplinary path shapes this project:
          it examines work through psychological, organizational, economic, technological, and legal questions.
        </p>
      </div>

      <div className="card">
        <h3>Why this research matters</h3>
        <p>
          A large audience does not necessarily mean ownership. Specialized expertise does not necessarily travel outside
          an employer. A personal brand does not necessarily become a durable business. By separating capability, authority,
          portability, ownership, and institutional support, the project aims to give people and organizations clearer language for identifying what the person created, what can move with them, what they can govern, and what work, systems, relationships, or authority could persist when an essential dependency changes.
        </p>
      </div>

      <div className="card">
        <h3>How the work is supported</h3>
        <p>
          Institutions of One is led by Rayven-Nikkita Collins. Client engagements, research collaborations, and other support
          can fund research, analysis, publication, programs, and events. Each project begins with a clear question, scope,
          role for everyone involved, and explanation of how the resulting work will be used and shared.
        </p>
      </div>

      <div className="card">
        <h3>Current stage</h3>
        <p>
          The project is in active pilot development. Two assessments are collecting exploratory responses, the
          Observatory contains 41 claim-linked comparative case records, and the methods will continue to be tested and
          revised. The long-term aim is a public research program that produces useful evidence for workers, creators,
          organizations, policymakers, and the industries redesigning how work happens.
        </p>
      </div>

      <div className="actions">
        <a href="/methodology"><button className="primary">Read the methodology</button></a>
        <a href="/partner" className="hero-link">See ways to work together →</a>
      </div>

      <p className="disc" style={{ marginTop: 22 }}>
        Contact: <a href="mailto:collins.ra@northeastern.edu" className="fwlink">collins.ra@northeastern.edu</a> ·{" "}
        <a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer" className="fwlink">LinkedIn</a>
      </p>
    </main>
  );
}