import { PartnerInquiry } from "@/components/PartnerInquiry";

export const metadata = {
  title: "Ways to work together — Institutions of One",
  description: "Research, strategy, workshops, practical tools, and ongoing support for groups examining how expertise, authority, ownership, and continuity are structured.",
  alternates: { canonical: "/partner" },
  openGraph: { title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, practical tools, and ongoing support for groups examining how expertise, authority, ownership, and continuity are structured.", url: "/partner", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, practical tools, and ongoing support for groups examining how expertise, authority, ownership, and continuity are structured.", images: ["/opengraph-image"] },
};

const problems = [
  "Your top creator partner leaves: what goes with them?",
  "One expert holds the knowledge, relationships, or authority a program runs on. What happens when that person moves on?",
  "A founder, an employee, and a collaborator each assume the work is theirs. Who actually holds the credit, the rights, and the decisions?",
];

// Six earlier engagement types merged into three offers. Copy and deliverables are
// drawn only from the prior six; nothing new has been added.
const engagements = [
  {
    title: "Continuity and rights review",
    copy: "I identify where essential knowledge, relationships, authority, audience access, and revenue live, and help founders, experts, employees, creators, and collaborators make credit, intellectual property, data, and decision rights easier to understand and discuss. Together, you can decide what should be documented, shared, protected, transferred, or redesigned. I can also stay on to advise through a transition, pilot, or partnership as the situation develops.",
    outputs: "Dependency map, continuity review, succession plan, role and rights map, decision-rights map, issue checklist for counsel and leadership, or ongoing advisory reviews.",
  },
  {
    title: "Evidence research",
    copy: "I define the question, gather and evaluate sources, compare relevant cases, test competing explanations, and explain what the available evidence supports.",
    outputs: "Research sprint, evidence review, comparative case study, executive brief, report, presentation, or recommendation memo.",
  },
  {
    title: "Workshops, programs, and tools",
    copy: "I adapt Build · Carry · Control · Continue for a team, cohort, profession, institution, or community, or turn the research into something people can use: a program, learning experience, editorial project, decision tool, or interactive resource designed for a specific audience.",
    outputs: "Executive workshop, team session, assessment pilot, private group readout, talk, class, curriculum, worksheet, special edition, or evidence-backed interactive.",
  },
];

export default function PartnerPage() {
  return (
    <main className="partner-page partner-2">
      <header className="partner-hero">
        <p className="eyebrow">Ways to work together</p>
        <h1>Bring a question, decision, or piece of work that needs careful attention.</h1>
        <p className="lede partner-hook">I help groups see what their people build, carry, control, and continue.</p>
      </header>

      <section className="partner-section" aria-labelledby="who-heading">
        <div className="partner-section-intro">
          <p className="eyebrow">Problems I work on</p>
          <h2 id="who-heading" className="display-h2">Valuable work often sits with one person, one platform, or one partner.</h2>
          <p>I work with businesses, nonprofits, law firms, universities, research teams, public institutions, publishers, creators and talent teams, and startups. Bring an early observation, a decision that needs to be made, a recurring problem, or a defined project.</p>
        </div>
        <div className="partner-audiences">
          {problems.map((problem) => <p key={problem}>{problem}</p>)}
        </div>
      </section>

      <section className="partner-section partner-help" aria-labelledby="help-heading">
        <div className="partner-section-intro">
          <p className="eyebrow">Engagements</p>
          <h2 id="help-heading" className="display-h2">Three ways to work together.</h2>
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
        <p className="disc"><strong>General information, not legal advice.</strong> These deliverables identify issues to discuss. They are not a legal opinion, and questions about legal obligations belong with a licensed attorney.</p>
      </section>

      <section className="partner-process" aria-labelledby="research-collaboration-heading">
        <p className="eyebrow">Research collaboration</p>
        <h2 id="research-collaboration-heading">Contribute to a defined research question.</h2>
        <p>Groups can also contribute cases, documents, data, expertise, participants, distribution, or funding to a clearly defined inquiry. Before the work begins, I explain the research question, each party’s role, how information will be handled, and what the collaboration is intended to produce.</p>
      </section>

      <section className="partner-process" aria-labelledby="process-heading">
        <p className="eyebrow">What working together looks like</p>
        <h2 id="process-heading">Begin with the situation. Agree on the work. Use the result.</h2>
        <div className="partner-process-grid">
          <p><strong>Share what is happening.</strong> Tell me who is involved and what you are trying to understand, decide, change, or create.</p>
          <p><strong>Choose the engagement.</strong> I recommend the approach, information needed, deliverable, timing, and scope.</p>
          <p><strong>Put the work to use.</strong> You receive the agreed result and a clear explanation of what it shows, what it leaves open, and what to do next.</p>
        </div>
      </section>

      <section className="partner-start" aria-labelledby="contact-heading">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading">What would you like help understanding, deciding, or creating?</h2>
        <p>Share the situation in a few direct sentences. I read every inquiry and reply by email.</p>
        <PartnerInquiry />
      </section>
    </main>
  );
}