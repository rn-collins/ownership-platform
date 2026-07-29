import { PartnerInquiry } from "@/components/PartnerInquiry";

export const metadata = {
  title: "Ways to work together — Institutions of One",
  description: "Research, strategy, workshops, and evidence-backed tools for companies, nonprofits, professional firms, universities, public institutions, creative teams, communities, and other groups.",
  alternates: { canonical: "/partner" },
  openGraph: { title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, and evidence-backed tools for any group examining how expertise, authority, ownership, and continuity are structured.", url: "/partner", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Ways to work together — Institutions of One", description: "Research, strategy, workshops, and evidence-backed tools for any group examining how expertise, authority, ownership, and continuity are structured.", images: ["/og.png"] },
};

const audiences = [
  "Companies and leadership teams",
  "Nonprofits, foundations, and community organizations",
  "Law firms, professional-services firms, and other practices",
  "Universities, schools, laboratories, and research groups",
  "Government, public-interest, and policy organizations",
  "Media companies, publishers, conferences, and cultural institutions",
  "Brands, agencies, creator teams, and talent organizations",
  "Startups, funds, associations, collectives, and emerging or unconventional groups",
];

const waysToHelp = [
  {
    title: "Understand dependence and continuity",
    problem: "Important knowledge, relationships, authority, or revenue may be concentrated in one person, role, platform, or institution.",
    help: "Map where the work lives, what can travel, what the group controls, what could fail, and what should be made more durable.",
    outputs: "Dependency map, continuity review, succession questions, decision brief, or leadership workshop.",
  },
  {
    title: "Design roles, partnerships, and ownership",
    problem: "A creator, expert, founder, employee, or collaborator is producing value, but the boundaries around credit, intellectual property, data, authority, and future use are unclear.",
    help: "Identify the questions that need to be resolved before expectations harden into conflict.",
    outputs: "Partnership-design brief, role and rights map, facilitated working session, or issue checklist for counsel and leadership.",
  },
  {
    title: "Research a difficult question",
    problem: "Your group keeps noticing a pattern but lacks the evidence, language, or comparative cases needed to understand it.",
    help: "Define the question, assemble and evaluate public evidence, compare cases, test easy assumptions, and state what the evidence does and does not support.",
    outputs: "Research sprint, comparative case study, evidence review, executive brief, report, or presentation.",
  },
  {
    title: "Use the framework with your people",
    problem: "A team, cohort, profession, or community needs a structured way to examine what people build, what travels with them, what they control, and what can continue.",
    help: "Adapt Build–Carry–Control–Continue to the audience without treating an exploratory framework as a diagnosis or rank.",
    outputs: "Executive workshop, team session, assessment pilot, facilitated discussion, or private readout.",
  },
  {
    title: "Create a public learning experience",
    problem: "You have an audience, classroom, publication, event, or platform and want to make the research useful to them.",
    help: "Translate the evidence into a format suited to that audience while preserving sources, limits, and intellectual seriousness.",
    outputs: "Talk, panel, class session, article, interview, live experience, special edition, or evidence-backed interactive.",
  },
  {
    title: "Contribute evidence or support research",
    problem: "You have a case, dataset, documents, expertise, participant community, distribution, or funding that could improve a defined inquiry.",
    help: "Agree in advance on the research question, contribution, access, consent, confidentiality, credit, disclosure, and publication boundaries.",
    outputs: "New or corrected case research, a defined study, interviews, public findings, or a methodological improvement.",
  },
];

export default function PartnerPage() {
  return (
    <main className="partner-page partner-2">
      <p className="eyebrow">Ways to work together</p>
      <h1>Institutions of One can work with any group trying to understand how valuable work is built, carried, controlled, and continued.</h1>
      <p className="lede partner-hook">The work is not limited to corporations, creators, or a particular industry. RN Collins supports groups wherever individual capability and organizational structure meet: when expertise is hard to replace, ownership is unclear, a role has outgrown its title, a partnership needs better boundaries, or important work needs to survive change.</p>

      <section aria-labelledby="who-heading">
        <p className="eyebrow">Who this is for</p>
        <h2 id="who-heading" className="display-h2">Any group can begin with a real question.</h2>
        <p>No special vocabulary, existing programme, or polished proposal is required. The question and the evidence determine the engagement—not the organization’s size, sector, or prestige.</p>
        <div className="partner-paths">{audiences.map((audience, index) => <article key={audience}><span>{String(index + 1).padStart(2, "0")}</span><h3>{audience}</h3></article>)}</div>
      </section>

      <section aria-labelledby="help-heading">
        <p className="eyebrow">How RN can help</p>
        <h2 id="help-heading" className="display-h2">Start with the problem. The format follows.</h2>
        <div className="partner-paths">{waysToHelp.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p><b>The situation:</b> {item.problem}</p><p><b>What RN does:</b> {item.help}</p><p><b>Possible deliverables:</b> {item.outputs}</p></article>)}</div>
      </section>

      <section className="partner-example">
        <p className="eyebrow">What an engagement looks like</p>
        <h2>A defined question, a clear method, and something your group can use.</h2>
        <p>We first identify the decision or uncertainty that brought you here. RN then recommends the smallest useful engagement, states what information is needed, defines the deliverable and boundaries, and explains what the work can and cannot establish. A short brief may be enough; a workshop, research sprint, pilot, or longer collaboration may be appropriate when the question requires it.</p>
      </section>

      <section className="partner-boundary"><div><p className="eyebrow">Research and commercial boundaries</p><h2>Paying for the work does not buy a preferred answer.</h2></div><div><p>Before work begins, the parties define the question, scope, contributions, deliverables, timing, confidentiality, consent, access, credit, intellectual-property treatment, and disclosure.</p><p>Research support and substantive collaboration are disclosed when appropriate. A client, sponsor, or partner cannot determine a finding, suppress an inconvenient result, change a case record without evidence, or purchase a preferred conclusion.</p></div></section>

      <section className="partner-start">
        <p className="eyebrow">Contact RN</p>
        <h2>Describe the group, the situation, and what you need help understanding or producing.</h2>
        <p>You can be early. A few direct sentences are enough. RN will review the inquiry personally and respond if the work appears aligned.</p>
        <PartnerInquiry />
      </section>
    </main>
  );
}
