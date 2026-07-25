export const metadata = { title: "Unsubscribe — Institutions of One", robots: { index: false } };

export default function UnsubscribePage({ searchParams }: { searchParams: { status?: string } }) {
  const status = searchParams.status;
  const msg =
    status === "done" ? "You’re unsubscribed. You won’t receive further emails from the research list."
    : status === "invalid" ? "That link isn’t valid or has expired. Use the unsubscribe link from a recent email, or contact me and I’ll remove you."
    : status === "error" ? "Something went wrong. Please email me and I’ll take care of it."
    : "Use the unsubscribe link in any email from Institutions of One, or contact me to be removed.";

  return (
    <main>
      <p className="eyebrow">Institutions of One</p>
      <h1>Unsubscribe</h1>
      <p className="lede">{msg}</p>
      <p className="disc" style={{ marginTop: 16 }}>
        Data rights, including a copy or deletion of your record, are on the{" "}
        <a href="/privacy" className="fwlink">privacy page</a>. Contact:{" "}
        <a href="mailto:collins.ra@northeastern.edu" className="fwlink">collins.ra@northeastern.edu</a>.
      </p>
    </main>
  );
}
