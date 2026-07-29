import { EditionLab } from "@/components/EditionLab";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "Your Career Has a Supply Chain — The I/1 Edit",
  description: "Edition 002 examines the platforms, employers, distributors, clients, and infrastructure between a person and their ability to continue.",
  alternates: { canonical: "/edit/002" },
  openGraph: {
    title: "Your Career Has a Supply Chain",
    description: "Dependence is unavoidable. The real risk is a supply chain you cannot see, replace, negotiate with, or survive without.",
    url: "/edit/002",
    type: "article",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Career Has a Supply Chain",
    description: "Dependence is unavoidable. The real risk is a supply chain you cannot see, replace, negotiate with, or survive without.",
    images: ["/og.png"],
  },
};

const layers = [
  { number: "01", name: "Discovery", question: "Who decides whether new people can find you?", body: "Search, recommendations, feeds, press, retailers, employers, conferences, and referrals can all function as discovery suppliers." },
  { number: "02", name: "Relationship", question: "Who can reach the people who already chose you?", body: "A follower count is not the same as a reachable audience. Email, membership, customer records, community spaces, and direct contact create different degrees of continuity." },
  { number: "03", name: "Revenue", question: "Who can interrupt the money?", body: "Advertising systems, employers, clients, distributors, payment processors, retailers, sponsors, and licensing partners sit between work and payment." },
  { number: "04", name: "Continuation", question: "What would have to remain for the work to continue?", body: "Identity, rights, archives, methods, team knowledge, supplier relationships, capital, data, and permission may live in different hands." },
];

const tests = [
  ["Visible", "Can you name the dependency and explain exactly what it supplies?"],
  ["Substitutable", "Could another supplier perform the same job without destroying the work?"],
  ["Negotiable", "Can you change price, access, rights, timing, or exit terms?"],
  ["Survivable", "If it disappeared tomorrow, could you keep operating long enough to adapt?"],
];

const sources = [
  { id: 1, label: "Spotify Newsroom, “‘Call Her Daddy’ Is Making It Exclusive With Spotify” (June 15, 2021)", href: "https://newsroom.spotify.com/2021-06-15/call-her-daddy-is-making-it-exclusive-with-spotify/" },
  { id: 2, label: "SiriusXM, “SiriusXM Inks New Multi-Year Agreement with Alex Cooper” (August 20, 2024)", href: "https://investor.siriusxm.com/news-events/press-releases/detail/2096/siriusxm-inks-new-multi-year-agreement-with-alex-cooper" },
  { id: 3, label: "YouTube Blog, “Marques Brownlee shares how podcasting can help creators establish their voice” (June 6, 2022)", href: "https://blog.youtube/creator-and-artist-stories/marques-brownlee-podcasting-youtube-creator-economy/" },
  { id: 4, label: "YouTube Blog, “From the CEO: What’s coming to YouTube in 2026” (January 21, 2026)", href: "https://blog.youtube/inside-youtube/the-future-of-youtube-2026/" },
  { id: 5, label: "Amazon, “‘Beast Games’ renewed for two more seasons” (May 12, 2025)", href: "https://www.aboutamazon.com/news/entertainment/mrbeast-prime-video-beast-games-season-2-and-3" },
  { id: 6, label: "Feastables, “Our commitment to ethical sourcing”", href: "https://feastables.com/pages/ethicalsourcing" },
  { id: 7, label: "Patreon, “The story of Patreon”", href: "https://www.patreon.com/about" },
];

export default function EditionTwoPage() {
  return (
    <main className="edit-edition-page edition-002">
      <a className="postback" href="/edit">← The I/1 Edit</a>
      <p className="eyebrow">Edition 002 · July 2026</p>
      <h1>Your career has a supply chain.</h1>
      <p className="edition-dek">
        Dependence is unavoidable. The danger is a dependency you cannot see, replace, negotiate with, or survive without.
      </p>

      <section className="edition-opening">
        <p className="edition-dropcap">
          A creator loses access to an account. An executive leaves and discovers that the team, data, budget, and authority belonged to the title. A founder owns the company but not the channel that finds its customers. A writer controls the copyright and still cannot reach a reader without a distributor.
        </p>
        <p>
          We usually describe these events separately—as platform risk, career risk, client concentration, or bad luck. Structurally, they share one problem: individual work also has a supply chain.
        </p>
        <p>
          A person’s ability to continue may depend on employers, platforms, distributors, clients, retailers, payment systems, manufacturers, collaborators, capital, software, data, reputation, and permission. Some dependencies are chosen. Others come with a role or industry. Some become visible only when they fail.
        </p>
        <p>
          Edition 001 introduced three questions: what have you built, what can you carry, and what do you control? This edition adds a fourth: <em>what must keep working for any of it to matter?</em>
        </p>
      </section>

      <section className="edition-thresholds" aria-labelledby="supply-layers">
        <p className="eyebrow">The dependency stack</p>
        <h2 id="supply-layers">Four layers between work and continuity.</h2>
        <div className="edition-threshold-grid edition-four">
          {layers.map((layer) => (
            <article key={layer.name}>
              <span>{layer.number}</span>
              <h3>{layer.name}</h3>
              <h4>{layer.question}</h4>
              <p>{layer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="edition-distinction">
        <p className="eyebrow">The argument</p>
        <blockquote>
          Independence is not the absence of dependence. It is the ability to see your dependencies, distribute them, negotiate them, and survive when one changes.
        </blockquote>
      </section>

      <section className="edition-opening">
        <h2>Alex Cooper shows why portability and distribution are not the same thing.</h2>
        <p>
          In 2021, Spotify announced that new and existing episodes of <em>Call Her Daddy</em> would become exclusive to Spotify.<sup><a href="#source-1">1</a></sup> Three years later, SiriusXM announced a multi-year agreement involving Cooper, <em>Call Her Daddy</em>, and the Unwell Network. SiriusXM said the arrangement included exclusive advertising and distribution rights, content, events, and exclusive global ad-sales rights across Unwell’s current and future shows.<sup><a href="#source-2">2</a></sup>
        </p>
        <p>
          The public record establishes movement between powerful distribution partners and the expansion of a named network around Cooper. It does not reveal every right, approval, revenue share, exit provision, or audience-data term in either contract.
        </p>
        <p>
          That distinction matters. Cooper appears highly portable: the host, show identity, audience relationship, and ability to attract another major deal survived a change in platform arrangement. But portability did not make distribution irrelevant. The work moved from one large supply relationship into another.
        </p>
        <p>
          Asking whether Cooper is “independent” hides the useful details. The better questions are what she and her company brought into the agreement, what SiriusXM supplies, what remains available outside the exclusive arrangement, and whether either party could replace the other if the relationship changed.
        </p>
      </section>

      <section className="edition-opening">
        <h2>Marques Brownlee shows the difference between multi-format and multi-supplier.</h2>
        <p>
          In a 2022 YouTube interview, Brownlee described a main channel optimized for polished clarity and a podcast that created room for different kinds of thought. YouTube described the surrounding business as including the WVFRM podcast, an original series, and merchandise.<sup><a href="#source-3">3</a></sup> Brownlee also named YouTube’s discovery advantage directly: people searching for a topic or guest can encounter the podcast there.
        </p>
        <p>
          Multiple formats can deepen a body of work without diversifying its supply chain. A main channel, podcast, clips, and series may all depend on the same discovery system, account relationship, advertising market, or recommendation infrastructure.
        </p>
        <p>
          YouTube itself now describes creators as studios and emphasizes that creators can green-light their own work.<sup><a href="#source-4">4</a></sup> That is a meaningful shift in creative authority. Yet “green-light yourself” and “distribute yourself” are not identical. The platform still supplies discovery, hosting, analytics, monetization tools, and access to viewers.
        </p>
        <p>
          Brownlee’s case therefore asks a sharper question than “Does he have more than one show?” It asks whether trust, identity, archive, production knowledge, audience contact, and revenue paths could travel if the primary discovery supplier changed.
        </p>
      </section>

      <section className="edition-opening">
        <h2>MrBeast shows how expansion can diversify the business while multiplying the dependencies.</h2>
        <p>
          Amazon describes <em>Beast Games</em> as a competition series created and hosted by Jimmy Donaldson and distributed through Prime Video; in 2025 it announced two additional seasons.<sup><a href="#source-5">5</a></sup> Feastables separately operates a consumer-products business with its own sourcing commitments, products, retail relationships, and corporate identity.<sup><a href="#source-6">6</a></sup>
        </p>
        <p>
          Moving from videos into a streaming production and packaged goods creates forms of capacity that are not reducible to a social account. It also introduces different suppliers: a global distributor, production systems, insurers, retailers, manufacturers, logistics, cocoa cooperatives, certification systems, and many others.
        </p>
        <p>
          Diversification requires more than having several businesses. A portfolio can reduce reliance on one revenue source while creating operational exposure across several supply chains. That trade may be worthwhile. The public materials cannot tell us how Donaldson, his entities, Amazon, retailers, and other partners privately divide ownership, control, liability, or bargaining power.
        </p>
        <p>
          The case is useful because scale can hide fragility. The more spectacular the output, the easier it is to assume the person controls the system. A supply-chain view asks what must coordinate successfully before the spectacle can exist—and who can stop it.
        </p>
      </section>

      <section className="edition-opening">
        <h2>Jack Conte shows how one person’s escape route can become another person’s infrastructure.</h2>
        <p>
          Patreon says the company began after Conte saw a mismatch between millions of video views and only hundreds of dollars reaching him. The company frames its purpose as connecting creators directly with people willing to pay and helping creators build community and durable businesses.<sup><a href="#source-7">7</a></sup>
        </p>
        <p>
          The origin story names a real structural problem: discovery and compensation can be supplied by different systems, and attention does not guarantee capture. Membership can diversify revenue and create a more legible relationship with committed supporters.
        </p>
        <p>
          Patreon does not remove infrastructure; it becomes part of the infrastructure. Creators still rely on the company’s product, policies, fees, payment systems, data practices, and continued operation. A tool that reduces dependence on advertising algorithms can become a new concentrated supplier.
        </p>
        <p>
          This is not a criticism unique to Patreon. Every solution becomes part of somebody else’s stack. The relevant question is whether the new relationship improves visibility, substitutability, bargaining power, and survivability compared with the old one.
        </p>
      </section>

      <section className="edition-status">
        <div>
          <p className="eyebrow">A practical test</p>
          <h2>Do not count dependencies. Test them.</h2>
        </div>
        <div className="edition-test-list">
          {tests.map(([name, question]) => <p key={name}><b>{name}:</b> {question}</p>)}
        </div>
      </section>

      <section className="edition-opening">
        <h2>The goal is not to own everything.</h2>
        <p>
          Total ownership is neither realistic nor automatically desirable. An employer can supply scale a person could not reproduce. A distributor can create reach worth sharing control to obtain. A manufacturer can turn an idea into a safe physical product. A platform can make discovery radically easier. Collaboration is not structural weakness.
        </p>
        <p>
          The danger appears when a critical supplier is invisible, irreplaceable, non-negotiable, and fatal if lost. One dependency can be manageable if the terms are clear and the relationship is strong. Ten dependencies can still be fragile if they all ultimately rely on the same account, employer, client, or pool of capital.
        </p>
        <p>
          This changes the questions used in career planning. If you want to build an audience, identify who can reach it. If you want several income streams, determine whether they can fail at the same time. If you want to own your work, identify the rights, records, relationships, and permissions that let it continue. If you want independence, design dependencies you can understand and survive.
        </p>
      </section>

      <section className="edition-distinction">
        <p className="eyebrow">The question to carry forward</p>
        <blockquote>
          If your most important supplier disappeared tomorrow, which part of your work would stop first—and what could you move before it did?
        </blockquote>
      </section>

      <EditionLab edition="002" />

      <section className="edition-opening" aria-labelledby="sources-heading">
        <p className="eyebrow">Sources and limits</p>
        <h2 id="sources-heading">What supports this edition</h2>
        <p>
          Sources were checked on July 26, 2026. The sources are first-party company announcements and representations. They support bounded facts about announced arrangements, products, and organizational descriptions; they do not independently establish financial performance, private ownership percentages, unpublished contract terms, internal data access, or bargaining power.
        </p>
        <ol>
          {sources.map((source) => (
            <li id={`source-${source.id}`} key={source.id}>
              <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
            </li>
          ))}
        </ol>
        <p>Corrections or material primary sources can be submitted through the <a href="/about">About page</a>. Substantive corrections will be dated here.</p>
      </section>

      <nav className="edition-status" aria-label="Edition navigation">
        <div><p className="eyebrow">Read in sequence</p><h2>Build the idea from the beginning.</h2></div>
        <div><a href="/edit/001"><strong>← Edition 001</strong><br/>When does one person become an institution?</a><p><a href="/edit">See every edition →</a></p></div>
      </nav>

      <section className="edition-subscribe">
        <p className="eyebrow">The I/1 Edit</p>
        <h2>One original argument, every other week.</h2>
        <p>The inbox edition delivers the argument and strongest case moments through Beehiiv. The cited, interactive, updateable edition lives permanently here.</p>
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
