import { NewsletterSignup } from "@/components/NewsletterSignup";
import { publicEditions } from "@/lib/edit-cycle-one";

export const metadata = {
  title: "The I/1 Edit — Institutions of One",
  description: "Original ideas, cases, and evidence about what people build through work, what they can carry, what they control, and what can continue.",
  alternates: { canonical: "/edit" },
  openGraph: { images: [{ url: "/og/edit/index.png", width: 1200, height: 630, alt: "The I/1 Edit — what people build, carry, control, and continue." }],
    title: "The I/1 Edit",
    description: "Original ideas, cases, and evidence about what people build through work, what they can carry, what they control, and what can continue.",
    url: "/edit",
    type: "website",
  },
  twitter: { images: ["/og/edit/index.png"],
    card: "summary_large_image",
    title: "The I/1 Edit",
    description: "Original ideas, cases, and evidence about what people build through work, what they can carry, what they control, and what can continue.",
  },
};

export default function EditPage() {
  // Derived from the edition data so a newly published edition is listed (and becomes "Latest") automatically.
  const editions = publicEditions();
  const latest = editions[editions.length - 1];
  return (
    <main className="findings-page edit-index-page">
      <p className="eyebrow">The publication · The I/1 Edit</p>
      <h1>Research and ideas about the structure behind people’s work.</h1>
      <p className="lede">
        New editions arrive by email. Each one takes one question about work, power, and ownership—and follows it far enough
        to become useful, examining what makes work portable, durable, controlled, or dependent on an employer, platform, client, partner, or other institution.
      </p>

      <section className="edit-promise">
        <div>
          <p className="eyebrow">How to read</p>
          <h2>Choose the reading path you need.</h2>
        </div>
        <div>
          <p>
            Beehiiv carries the readable newsletter edition on the web: the central argument and strongest case moments in a focused reading experience. The canonical edition lives here on this site, with citations, interactive tools, updates, and related cases.
          </p>
          <p>
            Every edition has the same intellectual core, while each surface serves a different purpose. Read on Beehiiv for the narrative. Use this site for the complete numbered editions and their cited record. The Public Reader extends each edition through visual stories, interactive tools, and ready-to-use files.
          </p>
          <p><a href="https://institutions-of-one-reader.vercel.app/production/cycle-01">Explore the Public Reader’s visual stories →</a></p>
        </div>
      </section>

      {editions.map((edition) => {
        const isLatest = edition === latest;
        return (
          <a key={edition.number} className={isLatest ? "edit-feature edit-feature-latest" : "edit-feature"} href={`/edit/${edition.number}`}>
            <span className="edit-feature-number">{edition.number}</span>
            <div>
              <p className="eyebrow">{isLatest ? "Latest edition" : `Edition ${edition.number}`} · {edition.published}</p>
              <h2>{edition.title}</h2>
              <p>{edition.subtitle}</p>
              <strong>Read Edition {edition.number} →</strong>
            </div>
          </a>
        );
      })}

      <section className="edit-signup">
        <div>
          <p className="eyebrow">Follow the series</p>
          <h2>Keep up with new web editions.</h2>
          <p>Subscribe for publication updates, then return here for the canonical, cited and interactive record.</p>
        </div>
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
