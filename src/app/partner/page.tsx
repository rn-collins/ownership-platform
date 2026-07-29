import { PartnerInquiry } from "@/components/PartnerInquiry";

export const metadata = {
  title: "Ways to work together — Institutions of One",
  description: "Research, strategy, workshops, practical tools, and ongoing support for groups examining how expertise, authority, ownership, and continuity are structured.",
  alternates: { canonical: "/partner" },
  openGraph: { title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, practical tools, and ongoing support for groups examining how expertise, authority, ownership, and continuity are structured.", url: "/partner", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, practical tools, and ongoing support for groups examining how expertise, authority, ownership, and continuity are structured.", images: ["/og.png"] },
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

const engagements = [
  {
    title: "Map dependence and plan for continuity",
    copy: "RN identifies where essential knowledge, relationships, authority, audience access, and revenue live. Together, you can decide what should be documented, shared, protected, transferred, or redesigned.",
    outputs: "Dependency map, continuity review, succession plan, decision brief, or leadership working session.",
  },
  {
    title: "Clarify roles, rights, and decisions",
    copy: "RN helps founders, experts, employees, creators, and collaborators make credit, intellectual property, data, authority, responsibilities, and future use easier to understand and discuss.",
    outputs: "Role and rights map, partnership-design brief, decision-rights map, facilitated session, or issue checklist for counsel and leadership.",
  },
  {
    title: "Answer a difficult question with evidence",
    copy: "RN defines the question, gathers and evaluates sources, compares relevant cases, tests competing explanations, and explains what the available evidence supports.",
    outputs: "Research sprint, evidence review, comparative case study, executive brief, report, presentation, or recommendation memo.",
  },
  {
    title: "Use Build–Carry–Control–Continue with a group",
    copy: "RN adapts the framework for a team, cohort, profession, institution, or community. Participants examine what they create, what can move with them, what they can govern, and what work, systems, relationships, or authority could persist when an essential dependency changes.",
    outputs: "Executive workshop, team session, assessment pilot, facilitated discussion, or private group readout.",
  },
  {
    title: "Create a useful program, tool, or publication",
    copy: "RN turns the research into something people can use: a program, learning experience, editorial project, decision tool, or interactive resource designed for a specific audience and purpose.",
    outputs: "Talk, class, panel, live program, article, report, special edition, curriculum, worksheet, decision tool, or evidence-backed interactive.",
  },
  {
    title: "Provide ongoing advice during change",
    copy: "RN can advise through a transition, pilot, partnership, research program, or evolving body of work. RN helps the group interpret new information, review progress, and make decisions as the situation develops.",
    outputs: "Ongoing advisory support, scheduled reviews, working sessions, research updates, or implementation guidance.",
  },
];

export default function PartnerPage() {
  return (
    <main className="partner-page partner-2">
      <header className="partner-hero">
        <p className="eyebrow">Ways to work together</p>
        <h1>Bring a question, decision, or piece of work that needs careful attention.</h1>
        <p className="lede partner-hook">RN Collins helps groups understand what people create, what can move with them, what they can govern, and what work, systems, relationships, or authority could persist when an essential dependency changes.</p>
      </header>

      <section className="partner-section" aria-labelledby="who-heading">
        <div className="partner-section-intro">
          <p className="eyebrow">Who RN works with</p>
          <h2 id="who-heading" className="display-h2">RN works with groups across sectors, professions, and communities.</h2>
          <p>RN works across industries, professions, institutions, creative fields, research settings, public-interest work, and communities. Bring an early observation, a decision that needs to be made, a recurring problem, or a defined project.</p>
        </div>
        <div className="partner-audiences">
          {audiences.map((audience) => <p key={audience}>{audience}</p>)}
        </div>
      </section>

      <section className="partner-section partner-help" aria-labelledby="help-heading">
        <div className="partner-section-intro">
          <p className="eyebrow">Engagements</p>
          <h2 id="help-heading" className="display-h2">Choose the kind of help your group needs.</h2>
          <p>Each engagement begins with the result your group needs: a decision, shared understanding, a plan, a piece of research, a practical resource, or continued guidance.</p>
        </div>
        <div className="partner-services">
          {engagements.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="partner-outputs"><strong>Possible deliverables:</strong> {item.outputs}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-process" aria-labelledby="research-collaboration-heading">
        <p className="eyebrow">Research collaboration</p>
        <h2 id="research-collaboration-heading">Contribute to a defined research question.</h2>
        <p>Groups can also work with RN by contributing cases, documents, data, expertise, participants, distribution, or funding to a clearly defined inquiry. RN will explain the research question, each party’s role, how information will be handled, and what the collaboration is intended to produce before the work begins.</p>
      </section>

      <section className="partner-process" aria-labelledby="process-heading">
        <p className="eyebrow">What working together looks like</p>
        <h2 id="process-heading">Begin with the situation. Agree on the work. Use the result.</h2>
        <div className="partner-process-grid">
          <p><strong>Share what is happening.</strong> Tell RN who is involved and what you are trying to understand, decide, change, or create.</p>
          <p><strong>Choose the engagement.</strong> RN recommends the approach, information needed, deliverable, timing, and scope.</p>
          <p><strong>Put the work to use.</strong> You receive the agreed result and a clear explanation of what it shows, what it leaves open, and what to do next.</p>
        </div>
      </section>

      <section className="partner-start" aria-labelledby="contact-heading">
        <p className="eyebrow">Contact RN</p>
        <h2 id="contact-heading">What would you like help understanding, deciding, or creating?</h2>
        <p>Share the situation in a few direct sentences. RN reads every inquiry and will reply with a useful next step.</p>
        <PartnerInquiry />
      </section>
    </main>
  );
}