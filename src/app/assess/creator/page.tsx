import { Assessment } from "@/components/Assessment";
import { METHODOLOGY_VERSION } from "@/lib/engine";

export const metadata = { title: "The Ownership Index — how much of your work do you own?" };

export default function CreatorAssessPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Ownership Index</p>
      <h1>How much of your business do you actually own?</h1>
      <p className="lede">
        Reach is easy to count. Ownership isn&rsquo;t. Twenty questions across five dimensions — audience, rights,
        revenue, identity, and infrastructure. No sign-up; answered anonymously. You leave with a score to 100, your
        risk exposure, and the exact, ranked moves that turn rented reach into something you own.
      </p>
      <p className="meta">Methodology v{METHODOLOGY_VERSION} · five dimensions, four questions each, scored to 100.</p>
      <Assessment />
    </main>
  );
}
