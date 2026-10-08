export const metadata = { title: "Unsubscribe | Institutions of One", robots: { index: false } };

export default function UnsubscribePage({ searchParams }: { searchParams: { status?: string } }) {
  const status = searchParams.status;
  const msg =
    status === "done" ? "You’re unsubscribed. You won’t receive further emails from this list."
    : status === "partial" ? "Part of your request went through. I could not confirm that the newsletter service has stopped sending, so please message me on one of the platforms on the Connect page and I will remove you by hand."
    : status === "invalid" ? "That link isn’t valid or has expired. Use the unsubscribe link from a recent email, or message me on the Connect page and I’ll remove you."
    : status === "unavailable" ? "Unsubscribing from this page is not available right now. Please message me on one of the platforms on the Connect page and I’ll take care of it."
    : status === "error" ? "Something went wrong. Please message me on one of the platforms on the Connect page and I’ll take care of it."
    : "Use the unsubscribe link at the bottom of any email from this list, or message me on the Connect page to be removed.";

  return (
    <main>
      <p className="eyebrow">Institutions of One</p>
      <h1>Unsubscribe</h1>
      <p className="lede">{msg}</p>
      <p className="disc" style={{ marginTop: 16 }}>
        Data rights, including a copy or deletion of your record, are on the{" "}
        <a href="/privacy" className="fwlink">privacy page</a>. To reach me:{" "}
        <a href="/contact" className="fwlink">Connect with RN Collins</a>.
      </p>
    </main>
  );
}
