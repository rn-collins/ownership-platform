import { PartnerInquiry } from "@/components/PartnerInquiry";

export const metadata = {
  title: "Ways to work together — Institutions of One",
  description: "Research, strategy, workshops, and evidence-backed tools for groups examining how expertise, authority, ownership, and continuity are structured.",
  alternates: { canonical: "/partner" },
  openGraph: { title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, and evidence-backed tools for groups examining how expertise, authority, ownership, and continuity are structured.", url: "/partner", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, and evidence-backed tools for groups examining how expertise, authority, ownership, and continuity are structured.", images: ["/og.png"] },
};

const audiences = [
  "Businesses and leadership teams",
  "Nonprofits, foundations, and community groups",
  "Law firms and professional practices",
  "Universities, schools, laboratories, and research teams",
  "Government and public-interest organizations",
  "Publishers, conferences, and cultural institutions",
  "Brands, agencies, creators, and talent teams",
  "Startups, funds, associations, and collectives",
];

const waysToHelp = [
  {
    title: "Find where important work depends on one person",
    copy: "RN maps where knowledge, relationships, authority, and revenue live. The work can support continuity planning, succession, role design, and decisions about what to document, distribute, or protect.",
    outputs: "Dependency map, continuity review, decision brief, succession questions, or leadership workshop.",
  },
  {
    title: "Clarify roles, rights, and working relationships",
    copy: "RN helps founders, experts, employees, creators, and collaborators name how credit, intellectual property, data, authority, and future use should work together.",
    outputs: "Role and rights map, partnership-design brief, facilitated working session, or issue checklist for counsel and leadership.",
  },
  {
    title: "Research a difficult question",
    copy: "RN defines the question, gathers and evaluates evidence, compares relevant cases, tests the first explanation, and reports what the evidence supports.",
    outputs: "Research sprint, comparative case study, evidence review, executive brief, report, or presentation.",
  },
  {
    title: "Use the framework with a group",
    copy: "RN adapts Build–Carry–Control–Continue for teams, cohorts, professions, and communities that want to examine how their work is structured and how it can become more durable.",
    outputs: "Executive workshop, team session, assessment pilot, facilitated discussion, or private readout.",
  },
  {
    title: "Create a learning or editorial experience",
    copy: "RN turns the research into a useful experience for an audience, classroom, publication, conference, or platform while keeping the evidence and its limits visible.",
    outputs: "Talk, panel, class session, article, interview, live program, special edition, or evidence-backed interactive.",
  },
  {
    title: "Develop new research together",
    copy: "RN works with groups that can contribute cases, data, documents, expertise, participants, distribution, or funding to a defined research question.",
    outputs: "Case research, interviews, a defined study, public findings, or a methodological improvement.",
  },
];

export default function PartnerPage() {
  return (
    <main className="partner-page partner-2">
      <header className="partner-hero">
        <p className="eyebrow">Ways to work together</p>
        <h1>Bring a question about people, work, ownership, or continuity.</h1>
        <p className="lede partner-hook">Rayven-Nikkita Collins helps groups understand how valuable work is built, what travels with the people who create it, who controls its conditions, and what allows it to continue.</p>
      </header>

      <section className="partner-section" aria-labelledby="who-heading">
        <div className="partner-section-intro">
          <p className="eyebrow">Who RN works with</p>
          <h2 id="who-heading" className="display-h2">The work begins with the question.</h2>
          <p>RN works across industries, professions, institutions, and communities. You can arrive with an early observation, a live decision, a recurring problem, or a defined project.</p>
        </div>
        <div className="partner-audiences">
          {audiences.map((audience) => <p key={audience}>{audience}</p>)}
        </div>
      </section>

      <section className="partner-section partner-help" aria-labelledby="help-heading">
        <div className="partner-section-intro">
          <p className="eyebrow">How RN can help</p>
          <h2 id="help-heading" className="display-h2">Research, structure, and practical next steps.</h2>
          <p>Each engagement is shaped around the decision, question, or body of work in front of you.</p>
        </div>
        <div className="partner-services">
          {waysToHelp.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="partner-outputs"><strong>What you might receive:</strong> {item.outputs}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-process" aria-labelledby="process-heading">
        <p className="eyebrow">What working together looks like</p>
        <h2 id="process-heading">A clear question. A right-sized engagement. Work you can use.</h2>
        <div className="partner-process-grid">
          <p><strong>Begin with the situation.</strong> Tell RN what is happening, who it affects, and what you are trying to decide, understand, or make.</p>
          <p><strong>Shape the work.</strong> RN recommends an approach, the information it requires, the deliverable, the timing, and the boundaries of the inquiry.</p>
          <p><strong>Use the result.</strong> You receive a brief, map, workshop, study, tool, or other agreed form designed for the people who need it.</p>
        </div>
      </section>

      <section className="partner-start" aria-labelledby="contact-heading">
        <p className="eyebrow">Contact RN</p>
        <h2 id="contact-heading">What are you trying to understand, decide, or create?</h2>
        <p>Share the situation in a few direct sentences. RN reads every inquiry and will reply with the most useful next step.</p>
        <PartnerInquiry />
      </section>
    </main>
  );
}
