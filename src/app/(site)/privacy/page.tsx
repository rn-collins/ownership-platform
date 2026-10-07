export const metadata = {
  title: "Privacy & data use | Institutions of One",
  description: "What Institutions of One collects, why, how it is used, and your rights: consent-first, by design.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy & data use | Institutions of One", description: "What Institutions of One collects, why, how it is used, and your rights: consent-first, by design.", url: "/privacy", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Privacy & data use | Institutions of One", description: "What Institutions of One collects, why, how it is used, and your rights: consent-first, by design.", images: ["/opengraph-image"] },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <p className="eyebrow">Institutions of One · Privacy</p>
      <h1>Privacy &amp; data use</h1>
      <p className="lede">
        This page explains what the site collects, why it is collected, how it is used, and how to request access or deletion. Questions can be sent directly to RN Collins.
      </p>

      <div className="card">
        <h2>The anonymous assessments</h2>
        <p>When you take an index, the system stores your item-by-item answers on a 0 to 5 scale, the five-area profile, the secondary composite score shown for transparency, instrument and methodology
        versions, and a random assessment identifier, with no name, email, or account identity. The identifier lets
        later optional research answers update the same assessment instead of creating duplicate respondents; it is not
        used to identify you. A copy of your answers also stays in your browser on your device. Optional research
        answers are stored with the same anonymous assessment and are not added to the public findings unless the record
        contains a complete response from a supported assessment version.</p>
        <p>If you are signed in when you submit the Ownership Index, a second copy of your answers and score is saved
        to your account, linked to your sign-in. That copy is separate from the anonymous record and is not used
        in the public findings.</p>
        <p>Your IP address is not saved with your answers or in our database. To limit abuse, the forms that
        accept submissions, including assessment submission, count requests per IP address, up to 20 per minute. The address
        (the first one in the request&rsquo;s forwarding header) is used as an unhashed key in a counter held in Upstash
        Redis, and the counter expires automatically after about two minutes. Our hosting provider may also keep
        standard server logs outside this counter.</p>
      </div>

      <div className="card">
        <h2>Email updates and the newsletter</h2>
        <p>Newsletter subscriptions are stored only after you tick the consent box. The site keeps your email address, the date, and the version of the consent wording you saw. It is used to send occasional updates and, if you asked for it, your report. It is never sold.</p>
        <p>The signup adds you to the newsletter The Polymath on Beehiiv. The I/1 Edit is one section of The Polymath, so you will receive The Polymath&rsquo;s emails. The site and Beehiiv each keep a copy of your address.</p>
      </div>

      <div className="card">
        <h2>Contact, nomination, and study forms</h2>
        <p>These forms store what you submit, for the purpose you submitted it.</p>
        <ul>
          <li><b>Partner inquiries.</b> Your name, email, organization, the kind of inquiry, and your message. The site stores them and also emails them to RN Collins through Resend.</li>
          <li><b>Contact messages.</b> Your name, email, the topic you chose, your message, and which site sent you to the form. The site saves the message when its database is connected and emails it to RN Collins through Resend when email delivery is switched on. If neither is available the form says so and keeps nothing.</li>
          <li><b>Observatory nominations.</b> The name, organization, and role of the person you are nominating, your reason, and your email if you choose to give one.</li>
          <li><b>Cognitive interview intake.</b> You must be 18 or older. The form stores your name, email, how you work and your career stage, your location or jurisdiction, your availability and time zone, and your instrument interest. It also stores any access needs you describe, which can include disability, chronic illness, or caregiving context. That information is sensitive. It is used only to plan an interview you can take part in, and you do not have to give it. The form also stores whether you agreed to be recorded and to be quoted, and a withdrawal code so you can withdraw. This study has not been reviewed by an institutional review board.</li>
          <li><b>Creator pages.</b> If you sign up with your email on a creator&rsquo;s own page, the address is stored for that creator, who can email you. Each of those emails has an unsubscribe link.</li>
          <li><b>Accounts.</b> If you sign in, Supabase holds your email address and sign-in details, and your saved results are linked to that account.</li>
        </ul>
        <p>We keep this information only as long as needed for the purpose it was collected for.</p>
      </div>

      <div className="card">
        <h2>Who handles data for this site</h2>
        <p>These services process data on the site&rsquo;s behalf. They may store or process it in the United States or other countries.</p>
        <ul>
          <li><b>Vercel</b> hosts the site and keeps standard server logs.</li>
          <li><b>Supabase</b> holds the database and handles sign-in.</li>
          <li><b>Resend</b> sends the emails the site sends, such as partner inquiry notices.</li>
          <li><b>Upstash</b> holds the short-lived request counter described above.</li>
          <li><b>Beehiiv</b> sends The Polymath newsletter and keeps its subscriber list.</li>
        </ul>
        <p>Data is not sold. RN Collins runs the site and decides what is collected.</p>
      </div>

      <div className="card">
        <h2>Your rights</h2>
        <p>Every Beehiiv email has an unsubscribe link at the bottom. Using it stops The Polymath emails. To also have your address removed from the site&rsquo;s own record, write to RN Collins through the <a href="/contact" className="fwlink">contact form</a>.</p>
        <p>To get a copy of your record, or to have it deleted, use the <a href="/contact" className="fwlink">contact form</a>, choose &ldquo;A copy or deletion of my data,&rdquo; and give the email address you used on this site. A reply will confirm what was found and what was removed. Deletion covers the site&rsquo;s database, and on request your Beehiiv subscription and any contact, nomination, or study records. Unsubscribing keeps a minimal consent record for the audit trail. Deletion removes the row entirely.</p>
      </div>

      <div className="card">
        <h2>The Observatory</h2>
        <p>The named case records use publicly available evidence. A nomination begins a private review; it does not automatically create a public record. If a case concerns you and you would like to request a correction or raise a privacy concern, contact RN Collins and it will be reviewed promptly.</p>
      </div>

      <p className="disc" style={{ marginTop: 16 }}>
        Contact: <a href="/contact" className="fwlink">use the contact form</a>.
      </p>
    </main>
  );
}
