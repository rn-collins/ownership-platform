import { ObservatoryNominate } from "@/components/ObservatoryNominate";
import { ObservatoryMap } from "@/components/ObservatoryMap";

export const metadata = {
  title: "The Observatory — how individuals are becoming institutions",
  description: "A living observatory of the individual-as-institution: creators and professionals whose work and roles are being built around them, measured and mapped.",
};

export default function ObservatoryPage() {
  return (
    <main>
      <p className="eyebrow">The Observatory</p>
      <h1>The individual is becoming an institution.</h1>
      <p className="lede">
        Across the economy — creators and professionals alike — work is flipping from &ldquo;get hired for a role&rdquo;
        to &ldquo;the role gets built around you.&rdquo; The Observatory measures it, maps it, and shows where it&apos;s
        headed. This is a preview of how everyone will work.
      </p>

      <ObservatoryMap />

      <div className="card">
        <h3>Are you one of these people?</h3>
        <p>Take the Portfolio Professional Index — five minutes — and find out how much of an institution you already are inside your organization. <a href="/assess/professional" className="fwlink">Take the index →</a></p>
      </div>

      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, marginTop: 30, marginBottom: 4 }}>Nominate someone</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>Know someone whose job didn&apos;t exist until them? Put them on the map. The best nominations become guests on the show.</p>
      <ObservatoryNominate />
    </main>
  );
}
