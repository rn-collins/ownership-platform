import { notFound } from "next/navigation";
import { SEED, nodeSlug, findNodeBySlug } from "@/lib/observatory_seed";

export function generateStaticParams() {
  return SEED.map((n) => ({ slug: nodeSlug(n.name) }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const n = findNodeBySlug(params.slug);
  if (!n) return { title: "Profile — The Observatory" };
  return {
    title: `${n.name} — The Observatory | Institutions of One`,
    description: `${n.name}: ${n.role}. On The Observatory, the living map of individuals becoming institutions.`,
  };
}

export default function ObservatoryProfile({ params }: { params: { slug: string } }) {
  const n = findNodeBySlug(params.slug);
  if (!n) notFound();

  const isCreator = n.kind === "creator";
  const lens = isCreator ? "Ownership Index" : "Portfolio Professional";
  const forWhom = isCreator ? "creators" : "professionals";
  const assessHref = isCreator ? "/assess/creator" : "/assess/professional";

  return (
    <main>
      <p className="eyebrow">Institutions of One · The Observatory</p>
      <a href="/observatory" className="postback">← Back to the map</a>
      <h1 style={{ marginTop: 6 }}>{n.name}</h1>
      <p className="lede">{n.role}.</p>

      <div className="obs-panel-meta" style={{ margin: "10px 0 20px" }}>
        <span className="obs-chip">{n.domain}</span>
        <span className="obs-chip">{isCreator ? "Creator" : "Professional"}</span>
        {n.created && <span className="obs-chip built">The role was built around them</span>}
      </div>

      <div className="card">
        <h3>Why they&rsquo;re on the map</h3>
        <p>
          {n.name} is charted on the <b>{lens}</b> lens — the one for {forWhom}. {isCreator
            ? "They belong here as a case of owning the work: audience, rights, and business that would outlast any single platform."
            : n.created
              ? "They belong here as a case of a role invented around a person — a capability the organization could not get elsewhere, so it built the seat to fit."
              : "They belong here as a case of an individual whose influence and capability are portable — earned, and theirs to carry."}
          {" "}The map is drawn from public evidence and consented nominations; this profile reflects what is on the record.
        </p>
      </div>

      <div className="card">
        <h3>Measure yourself on the same lens</h3>
        <p>
          Curious how you&rsquo;d chart? Take the {lens} — five minutes, and you&rsquo;ll see where you land.
          {" "}<a href={assessHref} className="fwlink">Take the {lens} →</a>
        </p>
      </div>

      <div className="actions">
        <a href="/observatory"><button className="primary">Explore the full map</button></a>
        <a href="/observatory" style={{ textDecoration: "none" }}><span className="progress">Nominate someone →</span></a>
      </div>
    </main>
  );
}
