import { POLYMATH_URL, LINKEDIN_URL } from "@/lib/site";

export const metadata = {
  title: "About — Institutions of One",
  description: "The purpose, researcher, and development of Institutions of One.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Institutions of One", description: "The purpose, researcher, and development of Institutions of One.", url: "/about", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "About — Institutions of One", description: "The purpose, researcher, and development of Institutions of One.", images: ["/opengraph-image"] },
};


// Portrait chosen by RN on October 7, 2026 (DEC-05). Alt text exactly as she gave it; no caption and no
// credit line, and no other image of her is used on the site.
type Portrait = { src: string; srcSet: string; alt: string; width: number; height: number };
const PORTRAIT: Portrait | null = {
  src: "/about/rn-collins-portrait-800x1000.jpg",
  srcSet: "/about/rn-collins-portrait-480x600.jpg 480w, /about/rn-collins-portrait-800x1000.jpg 800w",
  alt: "Portrait of RN Collins",
  width: 800,
  height: 1000,
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <p className="eyebrow">Institutions of One · About</p>
      <h1>A research project about what people build, carry, control, and continue.</h1>
      <p className="about-credential">RN Collins · storytelling strategist, content and experiential producer, resident neuroscientist and design technologist · M.S. Anatomy &amp; Neurobiology, Boston University</p>
      <p className="lede">
        Institutions of One began with a simple observation: organizations routinely measure reach, productivity, and
        performance, but rarely measure whether the value a person creates becomes portable, durable, and meaningfully
        theirs. I study that question across creators, independent operators, employees, executives, researchers, public leaders, and other professionals.
      </p>

      <div className={`card about-intro${PORTRAIT ? " about-intro-portrait" : ""}`}>
        {PORTRAIT && (
          <figure className="about-portrait">
            <img src={PORTRAIT.src} srcSet={PORTRAIT.srcSet} sizes="(max-width: 800px) 100vw, 260px" alt={PORTRAIT.alt} width={PORTRAIT.width} height={PORTRAIT.height} style={{ height: "auto" }} />
          </figure>
        )}
        <div>
          <h2>RN Collins</h2>
          <p>
            I&rsquo;m a storyteller and a neuroscientist by training. I make documentaries and short videos about the technology underneath places, and who really owns creative work.
          </p>
          <p>
            My background spans neuroscience, developmental psychology, medical education, qualitative research, emerging
            industries, and the design of research and intelligence systems. That interdisciplinary path shapes this project:
            it examines work through psychological, organizational, economic, technological, and legal questions.
          </p>
          <p className="about-brandline">Curious about everything. Precise about all of it.</p>
        </div>
      </div>

      <div className="card">
        <h2>Why this research matters</h2>
        <p>
          A large audience does not necessarily mean ownership. Specialized expertise does not necessarily travel outside
          an employer. A personal brand does not necessarily become a durable business. By separating capability, authority,
          portability, ownership, and institutional support, I want to give people and organizations clearer language for what a person built, what they can carry, what they control, and what would continue if a job, platform, or title changed.
        </p>
      </div>

      <div className="card">
        <h2>How the work is supported</h2>
        <p>
          I lead Institutions of One. Client engagements, research collaborations, and other support
          can fund research, analysis, publication, programs, and events. Each project begins with a clear question, scope,
          role for everyone involved, and explanation of how the resulting work will be used and shared.
        </p>
      </div>

      <div className="card">
        <h2>Where else to find the work</h2>
        <p>
          <a href={POLYMATH_URL} target="_blank" rel="noopener noreferrer">The Polymath</a> is my newsletter, for questions too messy for one discipline. The I/1 Edit, the editions of Institutions of One, arrives there.
          You can also follow my work on <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
      </div>

      <div className="card">
        <h2>Current stage</h2>
        <p>
          The project is in active pilot development. Two assessments are collecting exploratory responses, the
          Observatory contains claim-linked comparative case records, and the methods will continue to be tested and
          revised. The long-term aim is a public research program that produces useful evidence for workers, creators,
          organizations, policymakers, and the industries redesigning how work happens.
        </p>
      </div>

      <div className="actions">
        <a href="/methodology"><button className="primary">Read the methodology</button></a>
        <a href="/partner" className="hero-link">See ways to work together →</a>
      </div>

      <p className="disc" style={{ marginTop: 22 }}>
        <a href="/contact" className="fwlink">Contact RN Collins</a> ·{" "}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="fwlink">LinkedIn</a>
      </p>
    </main>
  );
}
