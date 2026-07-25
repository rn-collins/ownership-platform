export const metadata = {
  title: "About — Institutions of One",
  description:
    "Who is behind Institutions of One, why it exists, how it is funded, and the consent and independence commitments that govern the research. By RN Collins.",
};

export default function AboutPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · About</p>
      <h1>Who is behind this, and why to trust it.</h1>
      <p className="lede">
        Institutions of One is an independent research program measuring a shift most of us are living through: work is
        moving from &ldquo;get hired for a role&rdquo; to &ldquo;the role gets built around you.&rdquo; Individuals —
        creators and professionals alike — are becoming institutions in themselves. Reach and activity are measured
        everywhere. Ownership and durability, the part that actually makes someone an institution, are measured almost
        nowhere. This is where that gets measured, in public.
      </p>

      <div className="card">
        <h3>The person doing the work</h3>
        <p>
          I&rsquo;m RN Collins — an independent researcher, writer, and self-taught builder. I hold an M.S. in
          neuroscience from Boston University School of Medicine and am a J.D. candidate at Northeastern Law, with five
          peer-reviewed publications. I&rsquo;ve done qualitative research with large-language-model tooling since 2021,
          starting at Harvard Business School, and I taught myself Python without a computer-science background — which is
          how a writer and researcher became someone who ships. I write in public as a columnist and across more than
          twenty pieces in the trade press, and I built and self-host a 143-article law library. The measurement platform
          you&rsquo;re reading — two instruments, a live map, the research backend — is one of dozens of things I&rsquo;ve
          designed and deployed. I mention the range only because it&rsquo;s the point: I study people who own their work,
          and I try to live the same way.
        </p>
      </div>

      <div className="card">
        <h3>How this is funded — and what money can never touch</h3>
        <p>
          The program is supported in part by disclosed partners: tools I use and, over time, advertisers and event and
          report sponsors. Two commitments make that safe. Every partnership is disclosed publicly. And sponsors fund the
          work — they never touch the scores, the items, or the findings. The measurement is independent by design, and
          the methodology is versioned so anyone can see exactly what produced a result and when it changed.
        </p>
      </div>

      <div className="card">
        <h3>How your data is treated</h3>
        <p>
          A project about ownership has to model it. The anonymous assessments store only banded answers — no identity —
          and your IP is used briefly to prevent abuse and never stored. Nothing personal is kept without an explicit,
          versioned consent, and people appear on the public Observatory only from public evidence or a consented
          nomination. You can join the research and leave it whenever you like.
          {" "}
          <a href="/methodology" className="fwlink">Read the methodology →</a>
        </p>
      </div>

      <div className="card">
        <h3>Where this is going</h3>
        <p>
          I&rsquo;ll say plainly where it stands: the framework and both instruments are built; the live measurement is
          underway now, one assessment and one nomination at a time. It builds toward a flagship report at Cannes Lions
          2027. Early by design — which is exactly why what you measure and who you nominate now helps shape the finished
          picture.
        </p>
      </div>

      <div className="actions">
        <a href="/assess"><button className="primary">Measure yourself</button></a>
        <a href="/observatory" style={{ textDecoration: "none" }}><span className="progress">Explore The Observatory →</span></a>
      </div>

      <p className="disc" style={{ marginTop: 22 }}>
        Contact: <a href="mailto:collins.ra@northeastern.edu" className="fwlink">collins.ra@northeastern.edu</a> ·{" "}
        <a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer" className="fwlink">LinkedIn</a>
      </p>
    </main>
  );
}
