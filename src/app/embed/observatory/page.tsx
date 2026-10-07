import { ObservatoryMap } from "@/components/ObservatoryMap";
import { SEED } from "@/lib/observatory_seed";

export const metadata = {
  title: "The Observatory — Institutions of One",
  robots: { index: false }, // the canonical map lives at /observatory
};

// Chrome-less, iframe-friendly map for partners and press.
// Embed with: <iframe src="https://ownership-platform.vercel.app/embed/observatory"
//   width="100%" height="560" style="border:0" loading="lazy"></iframe>
export default function EmbedObservatory() {
  return (
    <main className="embed-main">
      <a className="skip-link" href="#embed-credit">Skip to the link back to the Observatory</a>
      <h1 className="sr-only">The Observatory: a map of {SEED.length} public careers</h1>
      <h2 className="sr-only">The careers</h2>
      <ObservatoryMap embed />
      <a id="embed-credit" className="embed-credit" href="https://ownership-platform.vercel.app/observatory" target="_blank" rel="noopener noreferrer">
        The Observatory · Institutions of One →
      </a>
    </main>
  );
}
