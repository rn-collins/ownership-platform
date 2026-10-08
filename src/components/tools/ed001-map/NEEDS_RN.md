# Four questions map (M1, Edition 001): for RN

Status: built, review release (noindex). October 8, 2026. Nothing published, nothing pushed.

## Held, never rendered
- Eleven case sources the edition lists (Apple, Shondaland, Netflix, Miami-Dade x2, Chamberlain x2, Lyft, levels.io x2, Shondaland bio). Nobody opened them for this tool, so they are `needs-lookup` and the "Cases in the edition" list stays off. The page links to the edition's own "Sources and limits" section instead. Say the word and they can be opened one at a time, two seconds apart.

## Wording that renders but has no edition behind it (please read once)
- Step names and help lines, the empty sentence, and the result templates: "Your map if the role disappears.", "These items stay:", "These go with the container:", "Look first at:" (the items marked Not sure), "Not marked yet:", "These stay under all four changes:", "Nothing listed under Control."
- The three marks: Stays with me, Goes with the container, Not sure. They come from the design, not the edition.
- The four change labels are the edition's closing question put in the present tense ("the role disappeared" became "The role disappears").
- Page title is the old lab's published title ("Where does your work become structurally yours?").

## Decisions I made
- Marks belong to one change each, so switching change keeps the earlier marks, and a small table shows every item under all four changes.
- Five items per column, 60 characters each. Nothing typed goes in the address, a file name or a request. Copy as text, .txt and print only.

## Photographs
- All 14 slots filled, every one a labeled stand-in ("Illustrative photo"), all from Wikimedia Commons with creator and licence in the caption. Files are resized to 900 px (lead 1000 px) from the sourced originals.
- Weakest slots: the three marks, the empty state and the result. If you prefer, drop those five and keep the lead, columns and changes.
- Photo permission from IMAGE_MAP.json was used as written; I did not contact Wikimedia or Flickr.

## Fixtures and not checked
- Edition 001 text is the page source of the main site working copy (`ownership-platform-fixes`, branch audit-fixes-ownership-platform-2026-10-07, commit bafa0f1), not a fresh read of the live page.
- Not run inside Next. No screen reader pass. No Open Graph image drawn.

## For the integrator
- `data.schema.json` is the data schema. kit/ has none for this shape: add it to `kit/schema/mechanics/sheet-1.json` as an anyOf branch (see qa/kit-cli-check.mjs, which proves it passes the kit CLI on a scratch copy).
- Import `tool.css` once. Serve `images/` at `/tools/four-questions-map/images/`.
- Relations (not edited here): M1 with M2 (LK-18), M1 with the Institution Map (LK-19).
