import { METHODOLOGY_VERSION } from "@/lib/engine";
import { PROFESSIONAL_METHODOLOGY_VERSION } from "@/lib/instrument_professional";

export const metadata = {
  title: "Methodology — Institutions of One",
  description: "What Institutions of One measures, how the pilot assessments work, and the limits of the current research.",
  alternates: { canonical: "/methodology" },
  openGraph: { title: "Methodology — Institutions of One", description: "What Institutions of One measures, how the pilot assessments work, and the limits of the current research.", url: "/methodology", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Methodology — Institutions of One", description: "What Institutions of One measures, how the pilot assessments work, and the limits of the current research.", images: ["/og.png"] },
};

const ownershipDimensions = [
  ["Audience", "Whether a creator can reach their audience directly rather than only through a third-party platform."],
  ["Rights", "Who controls the intellectual property, licensing, and reuse of the work."],
  ["Revenue", "How much income depends on channels the creator controls or can carry elsewhere."],
  ["Identity", "Whether the name, reputation, and public identity function as assets the creator can govern."],
  ["Infrastructure", "Whether the business has systems, relationships, and operating capacity beyond a single platform or project."],
];

const professionalDimensions = [
  ["Capability", "Whether expertise is visible and supported by evidence beyond a title or résumé."],
  ["Systems", "Whether methods have been made reusable, teachable, or transferable."],
  ["Adoption", "Whether other people or organizations use the person’s work."],
  ["Mandate", "Whether responsibility and decision-making authority have been explicitly entrusted to the person."],
  ["Direction", "Whether the person can choose, connect, and sustain a body of work across roles or institutions."],
];

export default function MethodologyPage() {
  return (
    <main className="method-page">
      <p className="eyebrow">Institutions of One · Methodology</p>
      <h1>A transparent pilot for studying work, ownership, and individual institutional power.</h1>
      <p className="lede">
        Institutions of One combines voluntary self-assessments with documented public case research. The assessments
        describe present conditions; the Observatory examines how those conditions appear in real careers and businesses.
        Neither source alone proves that someone is—or is not—an “institution of one.”
      </p>

      <h2 className="dimhead" style={{ marginTop: 30 }}>What the assessments measure</h2>
      <div className="card">
        <h3>Ownership Index</h3>
        <p>
          The Ownership Index asks how much control a creator or independent operator has over the assets and channels
          through which value is created and captured. Its five proposed dimensions are:
        </p>
        <ul>{ownershipDimensions.map(([name, description]) => <li key={name}><b>{name}:</b> {description}</li>)}</ul>
      </div>
      <div className="card">
        <h3>Portfolio Professional</h3>
        <p>
          The Portfolio Professional assessment asks how far a person’s expertise has developed into a portable and
          influential practice rather than remaining confined to a single job description. Its five proposed dimensions are:
        </p>
        <ul>{professionalDimensions.map(([name, description]) => <li key={name}><b>{name}:</b> {description}</li>)}</ul>
      </div>
      <p className="disc">
        The assessments answer related but different questions. Their totals are not combined or interpreted as equivalent.
      </p>

      <h2 className="dimhead" style={{ marginTop: 30 }}>How scoring works</h2>
      <div className="card">
        <p>
          Each pilot contains twenty questions: four questions for each of five proposed dimensions. Responses are assigned
          values from 0 to 5 and summed to a score out of 100. Every result records the assessment version used so it can be
          reproduced if the questions or scoring change later.
        </p>
        <p>
          Current versions: Ownership Index v{METHODOLOGY_VERSION}; Portfolio Professional v{PROFESSIONAL_METHODOLOGY_VERSION}.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 30 }}>Why psychology matters</h2>
      <div className="card">
        <p>
          Becoming more independent or influential is not only an economic or organizational process. It may also involve
          perceived control, self-efficacy, autonomy, career adaptability, identity, motivation, and the ability to imagine
          and pursue future roles. These ideas inform the research questions and future validation work. The current
          assessments do not diagnose those traits or claim to be validated psychological scales.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 30 }}>The Observatory</h2>
      <div className="card">
        <p>
          The Observatory uses public sources to document how selected creators and professionals organize work, authority,
          ownership, and infrastructure. Cases are included to compare patterns across fields—not to endorse, rank, or
          assign assessment scores to the people shown.
        </p>
        <p>
          Public case descriptions distinguish documented facts from interpretation and identify important gaps in the
          available evidence.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 30 }}>What the project cannot yet claim</h2>
      <div className="card">
        <ul>
          <li>The scores are not population norms, percentiles, diagnoses, or rankings of human worth.</li>
          <li>The current sample is voluntary and self-selecting; it does not represent all creators or professionals.</li>
          <li>Equal weighting and score bands are design choices that require empirical testing.</li>
          <li>Cross-sectional self-report data cannot establish that ownership or portability causes a particular outcome.</li>
          <li>Results may reflect occupation, seniority, geography, disability, caregiving, discrimination, access to capital, and organizational power.</li>
        </ul>
      </div>

      <h2 className="dimhead" style={{ marginTop: 30 }}>How the research will be strengthened</h2>
      <div className="card">
        <p>
          The development sequence includes expert content review, interviews about how people understand the questions,
          item and missing-data analysis, reliability testing, factor analysis, comparisons with established measures,
          subgroup fairness testing, and later longitudinal research. Material changes to questions or scoring will be
          released as new versions rather than silently applied to earlier results.
        </p>
        <p><a href="/methodology/candidates" className="fwlink">Review proposed future questions →</a></p>
      </div>

      <div className="actions">
        <a href="/assess"><button className="primary">Choose an assessment</button></a>
        <a href="/observatory" className="hero-link">Explore the cases →</a>
      </div>
    </main>
  );
}
