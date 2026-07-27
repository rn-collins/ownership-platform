import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "The I/1 Edit — Institutions of One",
  description: "Original ideas, cases, conversations, and visual findings about how a person becomes an institution.",
  alternates: { canonical: "/edit" },
  openGraph: {
    title: "The I/1 Edit",
    description: "Original ideas, cases, conversations, and visual findings about how a person becomes an institution.",
    url: "/edit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The I/1 Edit",
    description: "Original ideas, cases, conversations, and visual findings about how a person becomes an institution.",
  },
};

export default function EditPage() {
  return (
    <main className="findings-page edit-index-page">
      <p className="eyebrow">The publication · The I/1 Edit</p>
      <h1>Ideas for people whose work no longer fits inside a title.</h1>
      <p className="lede">
        Every other week, The I/1 Edit takes one question about work, power, and ownership—and follows it far enough
        to become useful. Each edition asks how a person can make work travel, last, and matter beyond the next assignment.
      </p>

      <section className="edit-promise">
        <div>
          <p className="eyebrow">What arrives</p>
          <h2>One idea, designed for two different reading moments.</h2>
        </div>
        <div>
          <p>
            Subscribers receive a self-contained inbox edition through Beehiiv: the central argument and the strongest case moments, edited for email. The permanent web edition lives here with citations, interactive tools, updates, and related cases. LinkedIn and X introduce one idea at a time and point readers to the edition or subscription.
          </p>
          <p>
            Every edition has the same intellectual core but uses each channel for a different reading experience. You never need to click away to understand the email; you visit the site when you want to test the idea, inspect the evidence, or keep exploring.
          </p>
        </div>
      </section>

      <a className="edit-feature edit-feature-latest" href="/edit/002">
        <span className="edit-feature-number">002</span>
        <div>
          <p className="eyebrow">Latest edition · July 2026</p>
          <h2>Your career has a supply chain.</h2>
          <p>
            Dependence is unavoidable. The danger is a dependency you cannot see, replace, negotiate with, or survive without.
          </p>
          <strong>Read Edition 002 →</strong>
        </div>
      </a>

      <a className="edit-feature" href="/edit/001">
        <span className="edit-feature-number">001</span>
        <div>
          <p className="eyebrow">Edition 001 · July 2026</p>
          <h2>When does one person become an institution?</h2>
          <p>
            What does a person have to build, carry, and control before their work begins to function like an institution?
          </p>
          <strong>Read Edition 001 →</strong>
        </div>
      </a>

      <section className="edit-signup">
        <div>
          <p className="eyebrow">Every other week</p>
          <h2>Receive the inbox edition.</h2>
          <p>A self-contained reading experience in your inbox, with a path into the cited, interactive web edition when you want to go deeper.</p>
        </div>
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
