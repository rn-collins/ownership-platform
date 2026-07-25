import { PartnerInquiry } from "@/components/PartnerInquiry";

export const metadata = {
  title: "Partner — Institutions of One",
  description:
    "How organizations partner with Institutions of One: a defined value-exchange for research partners, data and title sponsors, and advertisers — with the independence of the research protected in writing.",
};

const TIERS: { name: string; who: string; give: string; get: string }[] = [
  {
    name: "Research partner",
    who: "Events, media companies, and platforms with an audience of creators or professionals (SXSW, POSSIBLE, Digiday, and peers).",
    give: "Distribution and an official designation — a stage, a co-branded release, the instrument offered to your audience.",
    get: "A proprietary data cut built for you, the two instruments for your audience, and a co-branded finding with your name on the research. A value-exchange, not a media buy.",
  },
  {
    name: "Chapter / data sponsor",
    who: "Brands and institutions that want to own a section of the flagship report.",
    give: "Support for one chapter or data cut of the Cannes Lions 2027 report.",
    get: "Named association with a specific, defensible finding; early access to that cut; a citable artifact you can circulate.",
  },
  {
    name: "Title sponsor",
    who: "One organization that wants top association with the year's flagship research.",
    give: "Lead support for the report and its launch moment.",
    get: "Top billing on the report and the Cannes launch, and first association with the category as it forms.",
  },
  {
    name: "Advertiser / activation",
    who: "Brands buying attention and a brand-aligned experience (for example, an in-context interview series).",
    give: "A sponsorship of a defined activation or series.",
    get: "Reach into an engaged audience and an experience only this program can offer — priced on audience and exclusivity, not on a promise.",
  },
];

export default function PartnerPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Partner</p>
      <h1>Partner with the research — on terms that protect it.</h1>
      <p className="lede">
        Institutions of One is building the first public measurement of ownership and durability for the
        individual-as-institution, toward a flagship report at Cannes Lions 2027. Partnership makes that research reach
        further and land harder. It is defined work with a defined exchange — not &ldquo;partner with us.&rdquo;
      </p>

      <div className="card" style={{ borderLeftColor: "var(--gold)", borderLeft: "4px solid var(--gold)" }}>
        <h3>What money can never touch</h3>
        <p>Every partnership is disclosed publicly. Sponsors fund the work; they never touch the scores, the items, or the
        findings. The measurement is independent by design and the methodology is versioned, so anyone can see exactly
        what produced a result. Independence is the asset — for the research and for you.</p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 30 }}>Ways to partner</h2>
      {TIERS.map((t) => (
        <div key={t.name} className="card">
          <h3>{t.name}</h3>
          <p><b>Who it&rsquo;s for.</b> {t.who}</p>
          <p style={{ marginTop: 6 }}><b>You bring.</b> {t.give}</p>
          <p style={{ marginTop: 6 }}><b>You receive.</b> {t.get}</p>
        </div>
      ))}

      <p className="disc" style={{ marginTop: 14 }}>
        Figures are set in conversation, against audience and scope. For a one-page brief you can circulate internally,{" "}
        <a href="/partner-brief.pdf" className="fwlink" target="_blank" rel="noopener noreferrer">download the partner brief (PDF)</a>.
      </p>

      <h2 className="dimhead" style={{ marginTop: 30 }}>Start a conversation</h2>
      <p className="rsub" style={{ marginBottom: 14 }}>A sentence or two on the fit you see is enough. Every note is read and answered personally.</p>
      <PartnerInquiry />
    </main>
  );
}
