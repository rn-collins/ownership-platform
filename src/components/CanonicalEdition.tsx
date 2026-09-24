import fs from "node:fs";
import path from "node:path";
import { Fragment, type ReactNode } from "react";
import { Edition007Figure, edition007FigureForHeading } from "@/components/Edition007Figure";
import { commonsImageUrl, commonsSourceUrl, cycleOneEditions, packageGalleryUrl, type CanonicalEdition as Edition } from "@/lib/edit-cycle-one";

const stripFrontMatter = (raw: string) => raw
  .replace(/^---[\s\S]*?---\s*/, "")
  .replace(/^# [^\n]+\n+(?:## [^\n]+\n+)?(?:\*\*By [^\n]+\*\*\n+)?(?:!\[[^\]]*\]\([^)]+\)\n+)?/, "")
  .replace(/^\*[^\n]+\*\n+/, "")
  .replace(/^\*\*Image credit:\*\*[^\n]*\n?/gm, "")
  .trim();

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    let match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) return <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a>;
    match = part.match(/^\*\*([^*]+)\*\*$/);
    if (match) return <strong key={index}>{match[1]}</strong>;
    match = part.match(/^\*([^*]+)\*$/);
    if (match) return <em key={index}>{match[1]}</em>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function EvidenceFigure({ edition, index }: { edition: Edition; index: number }) {
  const item = edition.media[index];
  if (!item) return null;
  return <figure className="canonical-edition-figure">
    <img src={commonsImageUrl(item.file)} alt={item.alt} loading={index < 1 ? "eager" : "lazy"} />
    <figcaption><span>{item.caption}</span><small>Credit: {item.credit}. {item.rights}. <a href={commonsSourceUrl(item.file)} target="_blank" rel="noopener noreferrer">Source record ↗</a></small></figcaption>
  </figure>;
}

function ArticleBody({ edition }: { edition: Edition }) {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "edit", `article-${edition.articleId}.md`), "utf8");
  const blocks = stripFrontMatter(raw).split(/\n\s*\n/);
  let heading = 0;
  return <>{blocks.map((block, index) => {
    if (block.startsWith("## ")) {
      const headingText = block.slice(3);
      const figure007 = edition.number === "007" ? edition007FigureForHeading(headingText) : undefined;
      const figureIndex = heading++;
      return <Fragment key={index}><h2>{inline(headingText)}</h2>{figure007 ? <Edition007Figure item={figure007} /> : <EvidenceFigure edition={edition} index={figureIndex} />}</Fragment>;
    }
    if (block.startsWith("### ")) return <h3 key={index}>{inline(block.slice(4))}</h3>;
    if (block.startsWith("> ")) return <blockquote key={index}>{inline(block.replace(/^> ?/gm, ""))}</blockquote>;
    const lines = block.split("\n");
    if (lines.every((line) => /^[-*] /.test(line))) return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{inline(line.slice(2))}</li>)}</ul>;
    if (lines.every((line) => /^\d+\. /.test(line))) return <ol key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{inline(line.replace(/^\d+\. /, ""))}</li>)}</ol>;
    return <p key={index}>{inline(block.replace(/\n/g, " "))}</p>;
  })}</>;
}

export function CanonicalEditionPage({ edition }: { edition: Edition }) {
  const number = Number(edition.number);
  // Derived from the actual (gate-filtered) edition list rather than hardcoded edges - a
  // hardcoded "number === 8 is last" broke the moment a 009 entry existed, silently linking
  // "next" to a nonexistent /edit/010.
  const freezeRender = process.env.CYCLE01_RENDER_FREEZE === "1";
  const visible = cycleOneEditions.filter((e) => !e.gated || freezeRender);
  const index = visible.findIndex((e) => e.number === edition.number);
  const previous = index === 0 ? "/edit/004" : `/edit/${visible[index - 1].number}`;
  const next = index === visible.length - 1 ? undefined : `/edit/${visible[index + 1].number}`;
  return <main className="edit-edition-page canonical-edition" data-edition={edition.number}>
    <a className="postback" href="/edit">← All editions</a>
    <p className="eyebrow">Edition {edition.number} · August 2026</p>
    <h1>{edition.title}</h1>
    <p className="edition-dek">{edition.subtitle}</p>
    <div className="canonical-status"><span>Canonical web edition</span><span>Full text · evidence · sources</span></div>
    <article className="canonical-edition-copy"><ArticleBody edition={edition} /></article>

    {edition.experience && <section className="edition-interactive" aria-labelledby={`interactive-${edition.number}`}>
      <p className="eyebrow">Interactive companion</p><h2 id={`interactive-${edition.number}`}>Put the edition’s framework to work.</h2>
      <p>The companion opens as a focused tool and does not save or score your answers.</p>
      <a href={edition.experience} target="_blank" rel="noopener noreferrer">Open the interactive ↗</a>
    </section>}

    <section className="edition-package-map" aria-labelledby={`packages-${edition.number}`}>
      <p className="eyebrow">Visual package gallery</p><h2 id={`packages-${edition.number}`}>Continue through the supporting stories.</h2>
      <p>Each package contains the complete carousel, its editable post copy, captions, source records, and available downloads.</p>
      <div>{edition.packages.map((id) => <a key={id} href={packageGalleryUrl(id)} target="_blank" rel="noopener noreferrer"><b>{id}</b><span>Open complete package</span><strong>↗</strong></a>)}</div>
    </section>

    <nav className="edition-continuity" aria-label="Edition navigation">
      <a href={previous}>← Edition {String(number - 1).padStart(3, "0")}</a>
      <a href={edition.beehiiv} target="_blank" rel="noopener noreferrer">Readable Beehiiv edition ↗</a>
      {next ? <a href={next}>Edition {String(number + 1).padStart(3, "0")} →</a> : <a href="/edit">All editions →</a>}
    </nav>
  </main>;
}
