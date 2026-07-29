import { PartnerInquiry } from "@/components/PartnerInquiry";

export const metadata = {
  title: "Research and workshops for organizations",
  description: "Use comparative career research to examine key-person dependence, portable authority, intellectual property, succession, and creator or expert partnerships.",
  alternates: { canonical: "/partner" },
  openGraph: { title: "Build something with Institutions of One", description: "Bring a question, community, case, dataset, publication, or stage to Institutions of One.", url: "/partner", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Build something with Institutions of One", description: "Bring a question, community, case, dataset, publication, or stage to Institutions of One.", images: ["/og.png"] },
};

const paths = [
  { prompt: "You have a community.", example: "Invite creators, professionals, students, or employees into a focused study, conversation, or assessment pilot.", make: "A question-led session and a public or private readout designed for that community." },
  { prompt: "You have a question.", example: "Investigate how authority travels after a layoff, what creators actually own, or how a field treats people whose work exceeds one title.", make: "A scoped research brief, case comparison, edition, workshop, or presentation." },
  { prompt: "You have a case or evidence.", example: "Contribute a career story, documents, data, expert review, or a counterexample that changes the framework.", make: "A responsibly sourced case, methodological improvement, or new research direction—with terms agreed before use." },
  { prompt: "You have a platform or stage.", example: "Collaborate on an article, live interview, panel, classroom experience, conference session, or interactive installation.", make: "An audience-specific editorial or event experience grounded in the project’s evidence." },
  { prompt: "You want to fund public knowledge.", example: "Support a defined field, research question, round of interviews, analysis, or public release.", make: "Published work with transparent support and no purchased conclusions." },
];

export default function PartnerPage() {
  return (
    <main className="partner-page partner-2">
      <p className="eyebrow">Work with Institutions of One</p>
      <h1>See where exceptional work lives—and what happens when the person leaves.</h1>
      <p className="lede partner-hook">Institutions of One helps leadership teams examine key-person dependence, portable authority, intellectual-property boundaries, succession, and roles built around visible experts or creators. Engagements can take the form of an executive workshop, comparative case brief, research sprint, assessment pilot, or evidence-backed presentation.</p>

      <section className="partner-example">
        <p className="eyebrow">For example</p>
        <h2>What happens to a person’s authority after the organization that made it visible disappears?</h2>
        <p>An alumni community might help recruit participants. A publication might host the resulting edition. A researcher might challenge the interpretation. A funder might support interviews and analysis. Each contributes something different; none purchases the answer.</p>
      </section>

      <section aria-labelledby="bring-heading"><p className="eyebrow">Ways to work together</p><h2 id="bring-heading" className="display-h2">Choose the problem you need to understand.</h2>
        <div className="partner-paths">{paths.map((path, index) => <article key={path.prompt}><span>{String(index + 1).padStart(2, "0")}</span><h3>{path.prompt}</h3><p>{path.example}</p><p><b>We could make:</b> {path.make}</p></article>)}</div>
      </section>

      <section className="partner-boundary"><div><p className="eyebrow">The non-negotiable</p><h2>Support can expand the inquiry. It cannot buy the finding.</h2></div><div><p>Before work begins, we define the question, each party’s contribution, the intended output, consent and confidentiality, credit, access, and disclosure.</p><p>Financial support and substantive collaboration are disclosed. A partner cannot determine a score, suppress an inconvenient result, or purchase a preferred conclusion.</p></div></section>

      <section className="partner-start"><p className="eyebrow">Start with the unfinished thought</p><h2>You do not need a polished proposal.</h2><p>Tell RN what you keep noticing, who it affects, and what you could contribute. A few honest sentences are enough to discover whether there is real work to do together.</p><PartnerInquiry /></section>
    </main>
  );
}
