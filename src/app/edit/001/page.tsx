import { EditionLab } from "@/components/EditionLab";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "When Does One Person Become an Institution? — The I/1 Edit",
  description:
    "Edition 001 of The I/1 Edit introduces Build, Carry, Control, and Continue: four questions for examining when a person’s work begins to function institutionally.",
  alternates: { canonical: "/edit/001" },
  openGraph: { images: [{ url: "/og/edit/001.png", width: 1200, height: 630, alt: "Edition 001 — when does one person become an institution?" }],
    title: "When Does One Person Become an Institution?",
    description:
      "Six contrasting cases reveal why visibility, ownership, portability, and institutional consequence are not the same thing.",
    url: "/edit/001",
    type: "article",
  },
  twitter: { images: ["/og/edit/001.png"],
    card: "summary_large_image",
    title: "When Does One Person Become an Institution?",
    description:
      "Six contrasting cases reveal why visibility, ownership, portability, and institutional consequence are not the same thing.",
  },
};

const thresholds = [
  {
    number: "01",
    name: "Build",
    question: "What exists because this person made it exist?",
    body:
      "Look for a recognizable body of work, methods, relationships, audience, and operating capacity—not merely output or attention.",
  },
  {
    number: "02",
    name: "Carry",
    question: "What survives when the container changes?",
    body:
      "Look for capability, reputation, systems, relationships, and opportunities that can travel across an employer, platform, client, format, or moment.",
  },
  {
    number: "03",
    name: "Control",
    question: "Who can decide what happens next?",
    body:
      "Look for meaningful authority over identity, access, rights, revenue, data, and the conditions under which the work is used.",
  },
  {
    number: "04",
    name: "Continue",
    question: "What could persist if an essential dependency changed?",
    body:
      "Look for work, systems, relationships, or authority that could keep functioning if a role, platform, employer, client, or other essential dependency changed.",
  },
];

const sources = [
  {
    id: 1,
    label: "Apple Newsroom, “Jony Ive to form independent design company with Apple as client” (June 27, 2019)",
    href: "https://www.apple.com/newsroom/2019/06/jony-ive-to-form-independent-design-company-with-apple-as-client/",
  },
  {
    id: 2,
    label: "Shondaland, “Shonda Rhimes”",
    href: "https://www.shondaland.com/about-us/shonda-rhimes",
  },
  {
    id: 3,
    label: "Netflix, “Netflix and Shonda Rhimes Expand Creative Pact” (July 8, 2021)",
    href: "https://about.netflix.com/news/netflix-and-shonda-rhimes-expand-creative-pact",
  },
  {
    id: 4,
    label: "Miami-Dade County, “Heat Action Plan 2022”",
    href: "https://www.miamidade.gov/resources/environment/documents/2022-heat-action-plan.pdf",
  },
  {
    id: 5,
    label: "Miami-Dade County, employee profile of Jane Gilbert",
    href: "https://secure.miamidade.gov/employee/ithrive/archive/ithrive-rer-gilbert.page",
  },
  {
    id: 6,
    label: "Chamberlain Coffee, “About Chamberlain”",
    href: "https://chamberlaincoffee.com/pages/about-us",
  },
  {
    id: 7,
    label: "Chamberlain Coffee, café page",
    href: "https://chamberlaincoffee.com/pages/chamberlain-coffee-cafe",
  },
  {
    id: 8,
    label: "Lyft, “Lyft welcomes Suzie Reider” (December 4, 2024)",
    href: "https://www.lyft.com/blog/posts/lyft-welcomes-suzie-reider",
  },
  {
    id: 9,
    label: "Pieter Levels, “Nomad List Founder” (January 7, 2017)",
    href: "https://levels.io/nomad-list-founder",
  },
  {
    id: 10,
    label: "Pieter Levels, “How I built Nomad Jobs” (August 31, 2014)",
    href: "https://levels.io/how-i-built-a-remote-jobs-board",
  },
];

export default function EditionOnePage() {
  return (
    <main className="edit-edition-page">
      <a className="postback" href="/edit">← The I/1 Edit</a>
      <p className="eyebrow">Edition 001 · July 2026</p>
      <h1>When does one person become an institution?</h1>
      <p className="edition-dek">
        Visibility can make a person look powerful. Structure determines whether that power can endure, travel, and be governed.
      </p>

      <section className="edition-opening">
        <p className="edition-dropcap">
          We have familiar words for a famous person, founder, executive, creator, or expert. We have fewer useful words for someone whose work now operates as a studio, school of thought, distribution system, employer, public function, or several of these at once.
        </p>
        <p>
          Calling someone an institution can sound like praise. Here, it is a question about structure. What has the person built? What can they carry when a role or platform changes? What can they actually control? What could continue if an essential role, platform, employer, or relationship changed?
        </p>
        <p>
          Public visibility often makes different forms of power look the same. A person may have a large audience and little control over distribution. An executive may create consequential systems without owning them. A founder may own a company while depending on platforms, clients, vendors, or capital. No one is completely independent, and dependence alone does not mean failure.
        </p>
      </section>

      <section className="edition-thresholds" aria-labelledby="thresholds-heading">
        <p className="eyebrow">The working model</p>
        <h2 id="thresholds-heading">Build. Carry. Control. Continue.</h2>
        <div className="edition-threshold-grid">
          {thresholds.map((threshold) => (
            <article key={threshold.name}>
              <span>{threshold.number}</span>
              <h3>{threshold.name}</h3>
              <h4>{threshold.question}</h4>
              <p>{threshold.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="edition-distinction">
        <p className="eyebrow">A definition, not a compliment</p>
        <blockquote>
          An institution of one is a person around whom durable capacity has formed: work, methods, relationships, systems, and authority that produce continuity and consequence beyond a single assignment. The phrase does not mean the person works alone, owns everything, or no longer depends on institutions.
        </blockquote>
        <p>
          The pilot maps dimensions of that capacity. It does not certify that a person has crossed a binary threshold or earned an institutional status.
        </p>
      </section>

      <section className="edition-opening">
        <h2>Build is the easiest dimension to see—and the easiest to overstate.</h2>
        <p>
          Build asks what exists because of a person’s work. The answer may be a company, method, public program, body of work, team, audience, operating system, or shared language. Calling something “built” by one person should never erase collaborators. Institutions are collective achievements, even when one person receives most of the public attention.
        </p>
        <p>
          Shonda Rhimes is a clear example of build becoming legible as an institution. Her own company biography states that she created Shondaland in 2004.<sup><a href="#source-2">2</a></sup> In 2021, Netflix described an expanded agreement with Rhimes and Shondaland Media that covered feature films and potential gaming and virtual-reality content, while adding live events and experiences to an existing branding and merchandise agreement.<sup><a href="#source-3">3</a></sup> The relevant fact is not simply that Rhimes writes successful television. A named organization, production capacity, partnerships, and extensions across formats now sit around the work.
        </p>
        <p>
          Emma Chamberlain presents a different route. Chamberlain Coffee describes itself as created by Chamberlain, and the brand now markets products, a store network, and a physical café.<sup><a href="#source-6">6</a></sup><sup><a href="#source-7">7</a></sup> That is evidence that attention has been translated into operating activity beyond content. It is not, by itself, evidence of Chamberlain’s precise equity, governance rights, supplier dependence, or control over customer data. “Creator-founded” tells us something important about origin; it does not answer every ownership question.
        </p>
        <p>
          Jane Gilbert shows why build cannot be restricted to private ownership. Miami-Dade County’s 2022 Extreme Heat Action Plan says Gilbert and physician Cheryl Holder co-chaired a 15-member task force that included government, community, private-sector, and scientific participants. The process included six public workshops with 298 community members.<sup><a href="#source-4">4</a></sup> A county profile says Gilbert works across departments and with external partners to implement the plan.<sup><a href="#source-5">5</a></sup> Her institutional consequence comes through coordination inside public infrastructure. Excluding that case because Gilbert does not personally own the program would confuse ownership with institution-building.
        </p>
      </section>

      <section className="edition-opening">
        <h2>Carry is what remains when the container changes.</h2>
        <p>
          A title lends authority, staff, information, and distribution. Carry asks what happens when those supports change. Does the person retain a recognized body of work, trusted relationships, methods, demand, or the ability to convene? Can the work move without pretending the former institution contributed nothing?
        </p>
        <p>
          Jony Ive makes the transition visible. In 2019, Apple announced that its chief design officer would leave as an employee, form an independent design company, and count Apple among that company’s primary clients.<sup><a href="#source-1">1</a></sup> The move demonstrated portability: Ive’s reputation and design capacity could support a new organizational container. It also demonstrated continuing dependence: the former employer remained a primary client at the moment of departure. Portability did not require a fiction of total separation.
        </p>
        <p>
          Suzie Reider supplies the opposite view. Lyft’s 2024 announcement of her appointment as head of Lyft Business describes 17 years at Google, including leadership at Waze and the founding of YouTube’s revenue and marketing organization.<sup><a href="#source-8">8</a></sup> Her career suggests that capability, reputation, and operating knowledge can travel between major organizations. But the revenue systems she helped build belonged to the companies whose authority, capital, data, and platforms enabled them. That is not a lesser form of work. It is a different relationship between personal capability and organizational ownership.
        </p>
        <p>
          These cases rule out a simple conclusion. Carry does not mean “quit your job” or “start a company.” Ive moved his capacity into a new company while keeping a major institutional dependency. Reider moved her capability through successive executive roles while the systems remained with her employers. The questions are what traveled, what stayed, and who retained decision-making authority.
        </p>
      </section>

      <section className="edition-opening">
        <h2>Control is the dimension visibility hides.</h2>
        <p>
          Control concerns decisions. Who can use the name, reach the audience, change the product, license the work, set prices, retain the data, receive the revenue, or continue after a platform or partner leaves? Public sources rarely answer every question. A responsible case record identifies what remains unknown instead of treating admiration as evidence.
        </p>
        <p>
          Pieter Levels offers an unusually legible model of direct operation. In his own account, he started Nomad List in 2014 as part of a project to launch 12 startups in 12 months, later describing it as both an information service and a paid membership community.<sup><a href="#source-9">9</a></sup> He separately documented building the remote-work job board that became Remote OK.<sup><a href="#source-10">10</a></sup> These are first-person sources, not audited ownership records. They nevertheless support a bounded claim: Levels presented himself as the builder and operator of products whose identities and revenue mechanisms were not synonymous with an employer’s title.
        </p>
        <p>
          Shondaland and Chamberlain Coffee complicate that apparently clean picture. Both have identities that can extend beyond a single social account, yet each operates through other systems: streaming and distribution partners in Shondaland’s case; commerce, manufacturing, retail, and digital platforms in Chamberlain Coffee’s. Institutional capacity does not eliminate dependencies. The useful issue is whether dependencies are visible, diversified, negotiable, and survivable.
        </p>
      </section>

      <section className="edition-status">
        <div>
          <p className="eyebrow">Why all six cases remain</p>
          <h2>A contrast set, not a ranking.</h2>
        </div>
        <div>
          <p>
            Jony Ive shows what can move when a person leaves a powerful employer. Shonda Rhimes shows a named organizational identity working through a major distributor. Jane Gilbert shows institution-building inside government. Emma Chamberlain shows creator attention becoming products and a physical place. Suzie Reider shows executive capability traveling without personal ownership of the systems created. Pieter Levels shows direct operation of small digital products.
          </p>
          <p>
            Removing the employee and public-sector cases would make the framework founder-biased. Removing the creator and independent-operator cases would make it conventionally corporate. All six belong because the disagreement among them is the point.
          </p>
        </div>
      </section>

      <section className="edition-opening">
        <h2>The first finding is not a score. It is a better set of questions.</h2>
        <p>
          The 41-person Observatory is a methodology pilot. It tests whether Build, Carry, Control, and Continue can organize heterogeneous public cases without collapsing them into celebrity profiles or pretending that public evidence reveals private arrangements. Six cases can expose distinctions; they cannot validate a universal model.
        </p>
        <p>
          The pilot already reveals one methodological risk: the more famous the person, the easier it is to mistake available publicity for available evidence. Press releases can establish appointments, announced agreements, and organizational claims. They usually cannot establish equity percentages, contract durability, data rights, internal decision rules, or what would survive a dispute. Those questions require interviews, documents, participant research, or a clearly stated “unknown.”
        </p>
        <p>
          The model should therefore produce a map of relationships, not a halo. Someone may build extensively, carry little, and control only a narrow layer. Another person may own few formal assets but carry rare capability and exercise substantial authority inside a public institution. Neither pattern is automatically superior. The value lies in seeing the structure clearly enough to make choices.
        </p>
      </section>

      <section className="edition-distinction">
        <p className="eyebrow">The question to carry forward</p>
        <blockquote>
          If the role disappeared, the platform changed its rules, the distributor walked away, or the employer kept the system, what work, systems, relationships, or authority could continue?
        </blockquote>
      </section>

      <EditionLab edition="001" />

      <section className="edition-opening" aria-labelledby="sources-heading">
        <p className="eyebrow">Sources and limits</p>
        <h2 id="sources-heading">What supports this edition</h2>
        <p>
          Sources were rechecked on August 7, 2026. Company and personal sources are used for bounded facts about their own announcements and representations; they are not treated as independent proof of performance, ownership, or value. No private contract, cap table, or participant interview was reviewed for this edition.
        </p>
        <ol>
          {sources.map((source) => (
            <li id={`source-${source.id}`} key={source.id}>
              <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
            </li>
          ))}
        </ol>
        <p>
          Corrections or material primary sources can be submitted through the <a href="/about">About page</a>. Substantive corrections will be dated on this page.
        </p>
      </section>

      <nav className="edition-status" aria-label="Edition navigation">
        <div><p className="eyebrow">Continue the inquiry</p><h2>Continue needs a closer look.</h2><p>Edition 002 examines the suppliers beneath the work and what happens when an essential dependency changes.</p></div>
        <div><a href="/edit/002"><strong>Edition 002 →</strong><br/>Your career has a supply chain.</a></div>
      </nav>

      <section className="edition-subscribe">
        <p className="eyebrow">The I/1 Edit</p>
        <h2>One original argument, every other week.</h2>
        <p>
          The inbox edition delivers the central argument and strongest case moments through Beehiiv. This cited, interactive, updateable web edition is the permanent record.
        </p>
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
