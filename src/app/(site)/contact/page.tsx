import { ContactForm } from "@/components/ContactForm";
import { prisma } from "@/lib/db";
import { contactCapabilities } from "@/lib/contact";
import { LINKEDIN_URL } from "@/lib/site";

// Read at request time so the page tells the truth about what this deployment can do right now.
export const dynamic = "force-dynamic";

const TITLE = "Contact | Institutions of One";
const DESC = "Send a message to RN Collins about Institutions of One, a case record, a project, or your data.";
export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESC, url: "/contact", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/opengraph-image"] },
};

export default function ContactPage() {
  const caps = contactCapabilities(process.env, Boolean(prisma));
  const available = caps.deliver || caps.store;
  return <main className="partner-page partner-2">
    <header className="partner-hero">
      <p className="eyebrow">Contact</p>
      <h1>Write to RN Collins.</h1>
      <p className="lede partner-hook">One form for questions, project inquiries, corrections to a case record, and requests about your data.</p>
    </header>
    <section className="partner-start" aria-labelledby="contact-form-heading">
      <h2 id="contact-form-heading">Send a message</h2>
      {available ? <>
        {!caps.deliver && <p className="meta">Email delivery is not switched on yet. Your message will be saved, and RN may not see it right away. For a faster answer, message RN on <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>}
        <ContactForm />
      </> : <div className="partner-confirmation" role="status">
        <h3>This form is not available yet.</h3>
        <p>Messages cannot be received here right now. Reach RN on <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a> or by direct message on Instagram.</p>
      </div>}
    </section>
  </main>;
}
