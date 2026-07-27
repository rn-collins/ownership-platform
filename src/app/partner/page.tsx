import { PartnerInquiry } from "@/components/PartnerInquiry";

export const metadata = {
  title: "Participate or partner — Institutions of One",
  description: "Ways to contribute to or support the Institutions of One research program.",
};

const paths = [
  {
    name: "Research and distribution partner",
    who: "Organizations, communities, events, and media platforms that serve creators or professionals.",
    work: "Invite a relevant audience to participate, host a research conversation, or collaborate on a clearly defined question.",
    result: "An agreed research output or audience-specific analysis, with methods and limitations stated publicly.",
  },
  {
    name: "Data or report supporter",
    who: "Organizations interested in supporting a particular research question, field, or publication.",
    work: "Fund a defined portion of data collection, analysis, reporting, or public communication.",
    result: "Transparent acknowledgment and access to the published work. Funding does not confer control over methods or findings.",
  },
  {
    name: "Interview or case participant",
    who: "Creators, professionals, employers, and experts with relevant experience or evidence.",
    work: "Contribute an interview, case material, methodological feedback, or contextual expertise.",
    result: "Participation terms, attribution, confidentiality, and consent are agreed before material is used.",
  },
  {
    name: "Editorial or event collaboration",
    who: "Publications, conferences, universities, and professional communities.",
    work: "Develop a briefing, article, panel, workshop, interview series, or research presentation.",
    result: "A scoped public-facing collaboration tailored to the audience and grounded in the project’s evidence.",
  },
];

export default function PartnerPage() {
  return (
    <main className="partner-page">
      <p className="eyebrow">Institutions of One · Participate or partner</p>
      <h1>Help investigate how work, ownership, and authority are changing.</h1>
      <p className="lede">
        Institutions of One can work with organizations that have a relevant audience, research question, dataset, case,
        or public forum. Each collaboration begins with a defined purpose, contribution, output, and disclosure plan.
      </p>

      <div className="card" style={{ borderLeft: "4px solid var(--gold)" }}>
        <h3>Research independence</h3>
        <p>
          Partners may support the work, improve access, or help frame useful questions. They do not determine scores,
          suppress results, or purchase a preferred conclusion. Material financial support and substantive collaborations
          are disclosed with the resulting work.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 30 }}>Ways to participate</h2>
      {paths.map((path) => (
        <div key={path.name} className="card">
          <h3>{path.name}</h3>
          <p><b>For:</b> {path.who}</p>
          <p style={{ marginTop: 6 }}><b>Possible work:</b> {path.work}</p>
          <p style={{ marginTop: 6 }}><b>Expected result:</b> {path.result}</p>
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 30 }}>Start a conversation</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>
        Share the organization, audience, question, or collaboration you have in mind. A short note is enough to begin.
      </p>
      <PartnerInquiry />
    </main>
  );
}
