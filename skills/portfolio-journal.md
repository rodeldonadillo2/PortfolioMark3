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

## June 6, 2026 - Center-grow belt: card closest to center scales up

**Status:** Done (on `feature/center-grow-belt` branch)

### Summary
Added a scroll-based center detection that highlights the project card closest to the belt center. The centered card scales to 1.06x with a gold border accent and elevated shadow, creating a dynamic focal point as cards scroll through the belt. The `prototype-v2` branch was deleted after user review. `main` remains the clean base.

### Changed
- CSS: added `.work-card--center` with `scale(1.06)`, gold border, elevated shadow, `z-index: 2`
- JS: added `updateCenterCard()` inside belt block — calculates card closest to belt center using `scrollLeft + clientWidth / 2`, toggles `.work-card--center` class
- `updateCenterCard()` runs on belt scroll, window resize, and on init

### Why
- User wanted motion and hierarchy — the center card growing creates a natural focal point as the belt auto-scrolls or is manually navigated

### Files Affected
- `css/style.css`
- `js/main.js`
- `skills/portfolio-journal.md`

### Decisions Made
- Scroll-based calculation rather than IntersectionObserver — more precise control over which card is "center"
- Card scales to 1.06x — noticeable but not jarring
- Gold border accent ties into Equivalent Exchange visual identity

### Next Actions
- User to replace placeholder images and URLs with real project data

---

## June 5, 2026 - Tab panel hidden when closed (removes empty white space below belt)

**Status:** Done

### Summary
Tab panel now uses `display: none` by default instead of just `opacity: 0`. This eliminates the large white box that appeared below the project belt when no project was selected. The forced-reflow pattern in JS preserves the smooth fade+slide transition when opening.

### Changed
- `.work__tab-panel` CSS: added `display: none`, changed `margin: 32px auto 0` to `margin: 0`
- `.work__tab-panel--open` CSS: added `display: block`, `margin-top: 32px`
- `showProjectTab()` JS: on open -> `display: block`, force reflow via `getBoundingClientRect()`, then add open class
- `showProjectTab()` JS: on close -> remove open class, wait for `opacity` transitionend, then `display: none`

### Why
- Large empty white space below project belt in neutral state was visually distracting
- Display:none takes zero layout space, eliminating the gap entirely

### Files Affected
- `css/style.css`
- `js/main.js`
- `skills/portfolio-journal.md`
- `skills/portfolio-phases.md`

### Decisions Made
- Used forced-reflow pattern so the opacity/transform transition still animates smoothly on open
- transitionend on "opacity" ensures display:none is set only after the fade-out completes
- Added class check in transitionend handler — if panel was re-opened during close animation, display stays "block"

### Next Actions
- None — functional change complete

---

## June 5, 2026 - Multi-section tab panel with per-section images + labeled placeholders

**Status:** Done

### Summary
Tab panel now has section-by-section navigation with Prev/Next buttons and per-section images. Each project in `projectData` has a `sections` array where each entry contains title, text, and image. Clicking Next/Prev changes both the explanation text and the image simultaneously. Created 8 labeled placeholder SVGs for all project sections.

### Changed
- Replaced single `desc` field with `sections[]` array in project data
- Added `.work__tab-section-title`, `.work__tab-section-text`, `.work__tab-nav`, `.work__tab-nav-btn`, `.work__tab-counter` to HTML + CSS
- `renderSection()` updates image + section title + section text + counter + button states
- `goToPrevSection()` / `goToNextSection()` navigate through sections
- Created 8 labeled placeholder images in `images/` (p1-overview, p1-telegram-alerts, p1-excel-automation, p2-overview, p2-feature, p3-overview, p3-feature, p3-another)

### Why
- User wanted to explain different features of each project with corresponding screenshots

### Files Affected
- `index.html`
- `css/style.css`
- `js/main.js`
- `images/p1-overview.svg` (new)
- `images/p1-telegram-alerts.svg` (new)
- `images/p1-excel-automation.svg` (new)
- `images/p2-overview.svg` (new)
- `images/p2-feature.svg` (new)
- `images/p3-overview.svg` (new)
- `images/p3-feature.svg` (new)
- `images/p3-another.svg` (new)
- `skills/portfolio-journal.md`

### How to add more sections (for the user)
To add another step to any project:
1. Open `js/main.js`
2. Find the project in `projectData`
3. Add a new object inside its `sections` array:
   ```js
   { title: "Step Name", text: "Your explanation here...", image: "images/your-screenshot.svg" }
   ```
4. Drop the matching screenshot into `images/`
5. That's it — the Prev/Next buttons and counter will handle it automatically

---

## June 5, 2026 - Belt carousel + inline tab panel (replaced modal)

**Status:** Done

### Summary
Converted the static 3-column project grid into a horizontal auto-scrolling belt carousel with arrow navigation and fade edge overlays. Added an inline tab panel below the belt that shows selected project details — replaces the earlier full-screen modal approach for a cleaner, non-obtrusive experience.

### Changed
- `.work__grid` changed from CSS grid to flexbox with `overflow-x: auto` and `scroll-snap`
- Added `.work__belt-wrap` container with relative positioning
- Added `.work__arrow--left` and `.work__arrow--right` buttons (circular, blur backdrop, show on belt hover, hidden on mobile)
- Added `.work__belt-fade` gradient overlays on each side to hint at more content
- Added `.work__tab-panel` inline below the belt — two-column layout (image left, text right)
- Tab panel slides in with fade+translate animation, toggles open/close on card click
- Clicking same card again closes the panel
- All modal HTML/CSS/JS completely removed and replaced with tab panel
- JS auto-scroll (`setInterval` ~72px/s loops to start), pauses on hover/click
- Arrow buttons scroll by 340px with smooth behavior
- Project data stored in JS array — populates tab panel dynamically
- Auto-scroll only activates above 1000px viewport (disabled on mobile)
- Responsive: 2 cards visible at 1000px → 1 card at 760px, arrows hidden on mobile

### Why
- Belt carousel makes the portfolio feel dynamic while saving vertical space
- Tab panel keeps the detail view inline — no overlay, no body scroll lock, feels more integrated

### Files Affected
- `index.html`
- `css/style.css`
- `js/main.js`
- `skills/portfolio-journal.md`
- `skills/portfolio-phases.md`

### Decisions Made
- Tab panel replaces modal per user request — cleaner UX, stays within the page flow
- Click same card toggles panel closed — intuitive toggle behavior
- Panel scrolls into view on open if off-screen
- Auto-scroll loops to beginning rather than reversing

### Open Questions
- None

### Next Actions
- User to replace placeholder images and URLs with real project data
- User to replace profile photo and CV with real files

---

## June 5, 2026 - Photo overlay, CV download, placeholders, git init

**Status:** Done

### Summary
Added profile photo to About section with slight overlay on stat cards. Added CV download button with placeholder PDF. Created SVG placeholder images for project thumbnails. Initialized git repo and pushed to GitHub.

### Changed
- Added `.about__photo` inside `.about__stats` with circular frame, white border, subtle shadow, and `margin-bottom: -24px` for overlay effect
- Added `.about__cv-btn` download button (black, mono font, download icon SVG, hover invert)
- Created `images/cv-rodel-donadillo.pdf` placeholder
- Created SVG placeholder images for 3 project cards (`placeholder-project-1/2/3.svg`)
- User replaced profile placeholder from `.svg` to `.png` — reference updated
- User filled in GitHub profile URL across all source links and GitHub CTA
- Created `.gitignore`
- Initialized git repo, committed all 14 files, pushed to `github.com/rodeldonadillo2/PortfolioMark3.git`

### Why
- Profile photo adds personal connection while maintaining professional Apple-like look
- CV download makes it easy for potential clients/employers to get a resume
- Placeholders allow layout to render correctly before real assets are ready
- Git push saves work before next feature build (belt carousel + detail modals)

### Files Affected
- `index.html`
- `css/style.css`
- `images/placeholder-profile.png`
- `images/placeholder-project-1.svg`
- `images/placeholder-project-2.svg`
- `images/placeholder-project-3.svg`
- `images/cv-rodel-donadillo.pdf`
- `.gitignore`
- `skills/portfolio-journal.md`
- `skills/portfolio-phases.md`

### Decisions Made
- Photo uses negative margin overlay instead of absolute positioning — keeps it in the document flow
- CV button placed in About section (after email/LinkedIn) — most natural context for a resume download
- GitHub profile URL set to `https://github.com/rodeldonadillo2`
- Live site URLs remain as `Place_the_LIVE_URL_HERE` — user to fill in with real project URLs

### Open Questions
- None

### Next Actions
- Build belt carousel for project cards (horizontal scroll with auto-play, pause on hover/click)
- Build detail modal for each project (full-screen overlay with detailed description, large screenshot, tech stack, links)

---

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