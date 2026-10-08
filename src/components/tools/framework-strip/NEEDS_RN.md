# Framework strip (X3, main home page): for RN

Status: built as a drop-in section (`FrameworkStrip.mjs`, `strip.css`), review release. October 8, 2026.

## Decisions for you
- The cells now carry Edition 001's own questions ("What exists because this person made it exist?") in place of the home page's one-line glosses ("What you made: ..."). That is what the design asked for. The old glosses are not used.
- Edition 001 has no anchor for each verb. All four cell links go to the working model heading (`/edit/001#thresholds-heading`). Adding `id="build"` and so on to the four section headings on `/edit/001` would let each cell land on its own section; that edit touches a published page, so I did not assume it.
- The Edition 008 line is your approved sentence LK-19, as written. It links to Edition 008 (`/edit/008`). The design pointed it at the Institution Map; that tool is not published, so the link goes to the edition for now (`futureToolId` in the spec holds the intended target).
- "Make your own map" links to `/tools/four-questions-map`, which only exists once M1 ships.

## Photographs
- Four slots filled, all illustrative stand-ins from Wikimedia Commons with creator and licence in the caption. These differ from M1's column photographs on purpose. The Build photo is a black-and-white c. 1900 forge exterior; the Carry photo is a 19th-century belt with tools (public domain).

## Fixtures and not checked
- Edition 001 text: main site working copy, commit bafa0f1. Edition 008 text (for the "four verbs" quote): the reader fixture another agent saved; copied here as `edition-008.reference.txt`.
- The home page's current CSS overlap bug is already fixed in that working copy; the strip uses its own `.fs-` rules and does not depend on `.question-grid`.
- Not run inside Next. No screen reader pass.

## For the integrator
- Replace the `question-grid` div on the home page with `<FrameworkStrip spec={filterApproved(spec)} />` and import `strip.css`. Keep the page's own section heading and the "How the framework is measured" link.
- `data.schema.json`: add as an anyOf branch of `kit/schema/mechanics/figure-1.json`.
