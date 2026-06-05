# Portfolio Journal Skill

## Purpose
Use this markdown file as a portable instruction skill for ChatGPT, Claude, or any AI assistant helping with Rodel Donadillo's portfolio.

This skill tracks what changed in the portfolio, why it changed, which files were affected, what decisions were made, and what should happen next. It prevents the assistant from starting over when the project continues in a new chat.

## Compatibility
This file is designed to work as plain markdown in both ChatGPT and Claude.

Use it by uploading or pasting it into a new chat and saying:

> Use this as my portfolio journal skill. Continue from the latest entries and do not restart the portfolio process.

Do not rely on hidden memory. Treat this file as the source of truth for the change history unless the user provides newer files or instructions.

## Trigger Phrases
Use this skill when the user says or implies:

- update the skills
- update the journal
- log this change
- add this to the portfolio journal
- what changed so far?
- summarize today's portfolio changes
- continue the portfolio from the journal

## Date Format
Always use this date format:

`Month Day, Year`

Example:

`May 20, 2026`

## Core Rules
1. Preserve existing journal entries unless the user explicitly asks to rewrite or clean them.
2. Add new entries under **Journal Entries**.
3. Put the newest entry at the top.
4. Keep entries factual and specific.
5. Record file names exactly when known.
6. If the user says **update the skills**, update this journal with the latest confirmed changes.
7. Do not invent completed work. Mark uncertain items as **Unconfirmed** or **Needs Review**.
8. Keep the portfolio positioning consistent:
   **Social Media Manager + Agentic Full Stack Web Developer helping businesses grow through content, automation, CRM workflows, and smart web systems.**

## Journal Entry Template
Use this format for every new entry:

```md
## Month Day, Year - Short Change Title

**Status:** Planned / In Progress / Done / Revised / Blocked

### Summary
Briefly explain what changed.

### Changed
- List concrete changes.

### Why
- Explain the purpose or reason behind the change.

### Files Affected
- `file/path.ext`

### Decisions Made
- Record decisions that should guide future work.

### Open Questions
- List unresolved questions, or write `None`.

### Next Actions
- List practical next steps.
```

---

## Journal Entries

## June 4, 2026 - Featured Work showcase added, Tools section relocated, About photo planned

**Status:** Done — awaiting photo asset

### Summary
Transformed the "Tools & Stack" section into a "Featured Work" portfolio showcase with 3 project card placeholders and a GitHub CTA. Relocated Tools & Stack to a new `#tools` section between Work and About. Added full CSS for project cards (responsive 3→2→1 column grid, hover lift, image zoom, dual-button pattern). Updated JS reveal observer. Planned a professional photo placement in the About section with subtle overlay on stat cards.

### Changed
- Replaced `#work` section content: "Tools & Stack" → "Featured Work" with project cards + GitHub row
- Created new `#tools` section (moved Tools & Stack after Work, before About)
- Added `.work__grid`, `.work-card`, `.work-card__thumb`, `.work-card__body`, `.work-card__tags`, `.work-card__links`, `.work-card__btn`, `.work__github` CSS
- Added responsive breakpoints for work grid (3-col → 2-col → 1-col)
- Updated JS `.revealItems` to include `.work-card` and `.work__github`
- Plan for: Add `.about__photo` element and CSS for photo overlay on stats cards

### Why
- User wanted a dedicated section to showcase websites they've created
- Needed GitHub profile integration for developer credibility
- Wanted Apple-like clean aesthetic with integrated buttons
- Photo adds personal connection while maintaining professional look

### Files Affected
- `index.html`
- `css/style.css`
- `js/main.js`
- `skills/portfolio-journal.md`
- `skills/portfolio-phases.md`

### Decisions Made
- Work section uses 3-column grid matching existing card aesthetic
- Each project card has a thumbnail, tags, and dual buttons (Live site + Source)
- GitHub CTA placed below project cards with icon + button consistent with Apple-like design
- Tools section moved but retained in full — important for SEO and client trust
- Photo will sit above stat cards in the About section right column, with slight negative margin overlay on the first stat card

### Open Questions
- Photo asset not yet available — placeholder will be used until real asset is provided

### Next Actions
- Add photo HTML + CSS to About section
- User to provide professional headshot photo
- Replace placeholder project URLs with real project links and screenshots
- Replace GitHub placeholder URLs with real profile/repo URLs

---

## May 20, 2026 - Hero transition and centering issues diagnosed, fix planned

**Status:** Planned — awaiting build approval

### Summary
After reviewing the new CSS delivered in a second session with "Rocky," two issues were identified with the hero image system:
1. The crossfade between images is not smooth — the outgoing composite image has a `blur(3px)` filter applied during fade-out that makes the transition feel uneven and janky.
2. The image appears off-center or only shows one side — the `.hero__arms` container uses `left: 0; right: 0` stretch positioning, and while `.hero__image` uses `left: 50%; transform: translateX(-50%)`, the entire container may not be properly centered on the viewport midpoint. There is also an asset-level risk: if the PNG files themselves are not symmetrically padded canvases, the images will visually appear off-center regardless of CSS.

### Changed
- No files changed yet — planning only.

### Why
- Planning needed before implementing the CSS fix to avoid introducing new issues.

### Files Affected
- `css/style.css` (fix pending)

### Decisions Made
- Remove `filter: blur(3px)` from all hero image fade-out rules — use pure opacity crossfade only.
- Add `transition-delay: 80ms` to the incoming image's hover state so the outgoing image begins fading before the incoming one fully appears — classic crossfade technique.
- Change `.hero__arms` from `left: 0; right: 0` to `left: 50%; transform: translateX(-50%)` with a controlled width (`min(680px, 72vw)`) to guarantee it is always centered on the viewport midpoint.
- Set all three `.hero__image` elements to `width: 100%; height: 100%; object-fit: contain; object-position: center bottom` so the browser handles centering within the bounding stage.
- Note to check after fix: if images still look off-center, the PNG canvas itself may need to be re-exported with symmetric transparent padding on both sides.

### Open Questions
- Are `arm-automail.png` and `arm-human.png` exported with centered/symmetric canvas padding? If not, the images will appear off-center even after the CSS fix. This needs visual confirmation after code is applied.
- Does the `arms__join` gold circle still land at the hands after the centering fix? It may need `bottom` percentage adjustment.

### Next Actions
- Wait for build approval.
- When approved, apply CSS changes to `css/style.css`.
- Test in Live Server at desktop (1440px), tablet (900px), and mobile (420px).
- Confirm the crossfade is smooth and symmetric.
- Confirm the gold join circle lands near the hands.
- If images still look off, re-export PNGs with symmetric canvas.

---

## May 20, 2026 - New CSS delivered from second session (Rocky), reviewed and logged

**Status:** Done — reviewed, issues identified

### Summary
A new `style.css` was provided after a second working session. The hero image system was confirmed as a cinematic full-bleed layout where the figure image fills the bottom of the hero using `position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%` inside a `.hero__arms` container that spans `left: 0; right: 0; bottom: 0; height: 60%`. The image stage uses `position: absolute; inset: 0`. The three images are layered: composite at `opacity: 1`, automail and human at `opacity: 0`, with transitions on opacity and filter.

### Changed
- Confirmed `.hero__arms` uses the full-bleed width approach (no fixed pixel width constraint on the stage).
- Confirmed the base image uses `position: absolute` within `.hero__image-stage` — different from the previous fix that used `position: relative` to drive stage height. This version uses `height: 60%` on `.hero__arms` instead.
- All hover transitions, quote bar, join marker, and section styles are complete.
- Decorative elements (`code__float`, `steel__lines`, `warm__blob`) set to `display: none`.

### Why
- To document the current state of the CSS before the next change pass.

### Files Affected
- `css/style.css`

### Decisions Made
- The cinematic full-bleed image approach (image fills the bottom 60% strip of the hero) is confirmed as the current direction. This is a different pattern than the portrait-stage approach from the previous session. Both aim for the same visual result but the centering mechanics differ.
- All issues found in this review will be addressed in the next CSS update.

### Open Questions
- See entry above for the transition and centering issues.

### Next Actions
- Proceed to the transition + centering fix pass when approved.

---

## May 20, 2026 - Hero image stage layout corrected

**Status:** Done

### Summary
The hero image was broken because `aspect-ratio: 21/9` was forcing a landscape box on a portrait figure. The image stage collapsed to zero height because `.hero__image` used `position: absolute` with no height anchor inside a zero-height parent. The gold join circle was also hardcoded to a pixel value that didn't match the image.

### Changed
- Removed `aspect-ratio: 21/9` from `.hero__image-stage`.
- Changed `.hero__image--composite` from `position: absolute` to `display: block; position: relative` so the stage grows to fit the image height naturally.
- Changed `.hero__image--automail` and `.hero__image--human` to `position: absolute; top: 0; left: 0; width: 100%; height: 100%` so they stack correctly on top of the composite.
- Changed `.arms__join` from a fixed pixel `bottom` value to `bottom: 34%` so it floats near where the hands meet in the image proportionally.
- Updated responsive `hero__image-stage` widths across all breakpoints to use sensible portrait-friendly values (`min(560px, 88vw)` on mobile, etc.).
- Removed oversized mobile widths (`118vw`, `128vw`) that caused horizontal overflow.

### Why
- The user's hero image is a **portrait figure** (person with arms outstretched), not a wide landscape banner.

### Files Affected
- `css/style.css`

### Decisions Made
- `.hero__image-stage` width is controlled by `min(520px, 34vw)` on desktop.
- `arms__join` bottom position is `34%` of hero height.
- The image system uses a base flow image (`--composite`) to drive stage height, with the alternate images (`--automail`, `--human`) stacked absolutely on top.

### Open Questions
- None — superseded by the next session's cinematic approach.

### Next Actions
- Proceed to transition and centering fix.

---

## May 20, 2026 - Portable portfolio journal skill created

**Status:** Done

### Summary
Created a portable markdown-based journal skill that can be used in ChatGPT or Claude to preserve portfolio change history across chats.

### Changed
- Defined journal rules, update triggers, date format, and a repeatable journal entry template.

### Why
- To prevent future conversations from restarting the portfolio process.

### Files Affected
- `portfolio-journal.md`

### Decisions Made
- The journal skill will be separate from the phases skill.
- New entries should be added newest-first.

### Open Questions
- None.

### Next Actions
- Use this file whenever continuing the portfolio in a new chat.
- Update this file after each major portfolio change.

---

## May 20, 2026 - Portfolio positioning established

**Status:** Done

### Summary
The portfolio positioning was defined around Rodel Donadillo as a hybrid Social Media Manager and Agentic Full Stack Web Developer.

### Files Affected
- Project planning notes.
- Portfolio copy direction.

### Decisions Made
- Main positioning: **Social Media Manager + Agentic Full Stack Web Developer helping businesses grow through content, automation, CRM workflows, and smart web systems.**
- Target clients include service-based businesses, local businesses, agencies, cleaning companies, insurance-related businesses, coaches, consultants, and small business owners.

### Open Questions
- Exact service packages still need refinement.

### Next Actions
- Continue refining services, case studies, and conversion copy.

---

## May 20, 2026 - Base portfolio HTML provided

**Status:** In Progress

### Summary
A base `index.html` file was provided. It includes navigation, split hero, services, tools, about, contact, and footer sections.

### Files Affected
- `index.html`

### Decisions Made
- The site will use a split identity concept: developer on the left, manager on the right.
- Equivalent Exchange / alchemist-inspired theme — professional, not fan-site.

### Next Actions
- Finalize CSS, JavaScript, and image assets.
- Review responsiveness after images are integrated.

---

## May 20, 2026 - Hero direction selected and image assets generated

**Status:** In Progress

### Summary
Hero direction confirmed as Option C with Option A concept: left mechanical/developer side, right human/manager side, meeting at center.

### Files Affected
- `images/hero-composite.png`
- `images/arm-automail.png`
- `images/arm-human.png`

### Decisions Made
- Balanced state: one mechanical arm and one human arm.
- Left hover: mechanical/automail emphasis.
- Right hover: human/manager emphasis.
- Visual style: red coat, black shirt, white background, dramatic studio lighting.

### Next Actions
- Save generated images into `/images` folder.
- Test hover transitions after CSS fix is applied.

---

## May 20, 2026 - CSS and JavaScript started

**Status:** In Progress

### Summary
Initial `style.css` and `main.js` files created for the portfolio.

### Files Affected
- `css/style.css`
- `js/main.js`

### Decisions Made
- JavaScript should remain lightweight.
- Contact form uses `mailto:` fallback until a backend or form service is chosen.

### Open Questions
- Whether to use pure static HTML/CSS/JS or move later to React/Next.js remains open.

### Next Actions
- Finish the image files.
- Test the full site locally in VS Code.
- Revise hero interaction after visual testing.