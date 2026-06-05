# Portfolio Phases Skill

Use this markdown file as a portable planning and continuity skill for Rodel Donadillo's portfolio project. This file is designed to work in ChatGPT and Claude. When this file is uploaded or pasted into a new chat, continue the portfolio project from the latest known phase instead of restarting.

## Core Portfolio Positioning

Rodel Donadillo is positioned as a:

**Social Media Manager + Agentic Full Stack Web Developer helping businesses grow through content, automation, CRM workflows, and smart web systems.**

The portfolio should communicate that Rodel helps businesses attract attention, organize leads, nurture prospects, automate workflows, and build web systems that support growth.

## Global Working Rules

1. Stay aligned with the portfolio positioning above.
2. Use the current project files as the source of truth when provided.
3. If the user uploads `index.html`, `style.css`, or `main.js`, inspect the actual file content before giving instructions.
4. Do not assume placement is correct. If markup or CSS was inserted in the wrong location, explain the issue and provide corrected replacement files.
5. Keep the Fullmetal Alchemist-inspired Equivalent Exchange concept as a visual/philosophical direction, but do not make the site feel like a fan site.
6. Prioritize a polished, professional, business-growth-focused portfolio.
7. Maintain compatibility with plain HTML/CSS/JS unless the user explicitly decides to move to a framework.
8. Use May 20, 2026 style dates for phase updates and journal-style notes.

## Replacement-Code Rule

When the user asks for code changes, fixes, layout corrections, or file updates:

**Provide the full replacement code directly in the chat instead of providing downloadable files.**

Default behavior:

- For an `index.html` issue, provide the full replacement `index.html` code block.
- For a `css/style.css` issue, provide the full replacement `style.css` code block.
- For a `js/main.js` issue, provide the full replacement `main.js` code block.
- If multiple files are affected, provide each complete file separately.
- Do not provide download links unless the user specifically asks for downloadable files.
- Do not provide small "add this block" patches unless the user specifically requests a patch.
- If placement is wrong, explain the placement issue briefly, then provide the full corrected replacement file.

The preferred format is:

1. Say which file to replace.
2. Provide the complete replacement code.
3. Give a short note explaining what changed.

## Current File Structure

```txt
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── arm-automail.png
│   ├── arm-human.png
│   └── hero-composite.png
├── skills/
│   ├── portfolio-journal.md
│   └── portfolio-phases.md
```

## Current Hero Image System

The project uses three PNG images:

- `images/hero-composite.png` — default balanced view: one mechanical arm and one human arm.
- `images/arm-automail.png` — developer hover view: mechanical/automail emphasis.
- `images/arm-human.png` — manager hover view: human/social media manager emphasis.

Expected hero behavior:

- Default state: show balanced split layout and `hero-composite.png`.
- Hover left/developer side: `arm-automail.png` fades in, composite fades out.
- Hover right/manager side: `arm-human.png` fades in, composite fades out.
- Text labels fade the opposite side on hover.
- The hero must remain a complete `<section id="hero">` containing left panel, right panel, image system, and quote bar.

## Current Hero Image CSS Pattern (Cinematic Full-Bleed — confirmed from second session)

The hero image system uses a full-bleed cinematic approach:

```css
/* Container: full-width strip anchored at the bottom of the hero */
.hero__arms {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: min(680px, 72vw);     /* controlled width — centered on viewport midpoint */
  bottom: 0;
  height: 60%;
  z-index: 12;
  pointer-events: none;
}

/* Stage: fills the container completely */
.hero__image-stage {
  position: absolute;
  inset: 0;
}

/* All images: absolutely positioned, centered, bottom-anchored */
.hero__image {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  pointer-events: none;
  transition: opacity 800ms ease;   /* smooth crossfade — no blur */
}

/* Default visibility */
.hero__image--composite { opacity: 1; }
.hero__image--automail,
.hero__image--human     { opacity: 0; }

/* Incoming image gets a small delay so outgoing starts fading first */
.hero:has(.hero__panel--left:hover) .hero__image--automail,
.hero.hero--developer .hero__image--automail {
  opacity: 1;
  transition-delay: 80ms;
}

.hero:has(.hero__panel--right:hover) .hero__image--human,
.hero.hero--manager .hero__image--human {
  opacity: 1;
  transition-delay: 80ms;
}
```

**Key rules:**
- Do NOT apply `filter: blur()` to any image transition — it breaks the smooth crossfade.
- Do NOT use `left: 0; right: 0` on `.hero__arms` — use `left: 50%; transform: translateX(-50%)` with a controlled width.
- If images still appear off-center after CSS fix, check the PNG canvas — `arm-automail.png` and `arm-human.png` need symmetric transparent padding so the figure is centered within the image bounds.

## Known Issues — Resolved

### Hero image was invisible (earlier session) — FIXED
**Root cause:** `aspect-ratio: 21/9` forced a landscape box. Base image used `position: absolute` inside a zero-height parent.
**Fix:** Removed `aspect-ratio`. Used `height: 60%` on `.hero__arms` container instead.

### Hero image inserted in wrong location (earlier session) — FIXED
**Root cause:** Image block replaced the left hero panel instead of being placed as a sibling.
**Correct structure:**
```html
<section class="hero" id="hero">
  <div class="hero__panel hero__panel--left" id="panelLeft">...</div>
  <div class="hero__panel hero__panel--right" id="panelRight">...</div>
  <div class="hero__arms">...</div>
  <div class="hero__quote">...</div>
</section>
```

## Known Issues — Pending Fix

### Hero transition is not smooth (May 20, 2026) — FIX PLANNED
**Root cause:** `filter: blur(3px)` applied to the composite image during fade-out creates an uneven crossfade. The blur animates at a different visual rate than opacity, making the transition feel janky.
**Fix:** Remove `filter` from all hero image hover rules. Use pure opacity crossfade only. Add `transition-delay: 80ms` to incoming image states so the outgoing image starts fading first.

### Hero image appears off-center / one-sided (May 20, 2026) — FIX PLANNED
**Root cause:** `.hero__arms` uses `left: 0; right: 0` stretch positioning. While `.hero__image` is technically centered within the stage via `left: 50%; transform: translateX(-50%)`, the container itself may drift if viewport width is odd or if there is a scrollbar offset. Additionally, if `arm-automail.png` and `arm-human.png` have asymmetric canvas padding (e.g., extra space on the right), they will appear off-center regardless of CSS.
**Fix:** Change `.hero__arms` to `left: 50%; transform: translateX(-50%); width: min(680px, 72vw)`. Check PNG canvas symmetry after applying the fix.

---

## Phase 1 — Foundation

**Status: Completed**

- Created base `index.html`.
- Created `css/style.css`.
- Created `js/main.js`.
- Added local image folder.
- Confirmed Live Server works for the plain HTML/CSS/JS project.

---

## Phase 2 — Hero Interaction

**Status: In Progress — two issues identified, fixes planned**

Goal:

Build a dramatic split hero that communicates Rodel's hybrid positioning: human-centered social media management plus system-driven web development and automation.

Completed:

- Corrected hero HTML structure (panels + arms as siblings inside section).
- Cinematic full-bleed image system coded — figure rises from the bottom, overlaps panel descriptions for depth.
- Hero hover state system coded (JS class + CSS `:has()` combo for broad browser support).
- Hover transitions coded: left hover shows automail, right hover shows human.
- Quote bar coded at the bottom.
- All section styles complete (services, tools, about, contact, footer).
- Responsive breakpoints set at 1100px, 900px, 620px, 420px.

Remaining before Phase 2 is complete:

1. **Fix hero image transition** — remove `filter: blur()`, use pure opacity crossfade with `transition-delay: 80ms` on incoming images.
2. **Fix hero image centering** — change `.hero__arms` to use `left: 50%; transform: translateX(-50%)` with a controlled width.
3. Drop three PNG images into `images/` folder and test in Live Server.
4. Confirm figure renders centered and symmetric on both hover states.
5. Confirm join circle lands near the hands in the image.
6. Confirm quote bar reads cleanly at the bottom.
7. Test on mobile (900px, 620px, 420px breakpoints).

Visual Direction:

- White canvas background.
- Portrait figure centered, rising from bottom.
- Left side: mechanical/developer energy.
- Right side: human/manager energy.
- Gold join pulse at the hands meeting point.
- Quote at the bottom: "In all things — Equivalent Exchange."

---

## Phase 3 — Services and Work Sections

**Status: Completed — June 4, 2026**

Goal:

Refine the service cards, work/case-study area, and proof points after the hero is stable.

Completed tasks:

- Added stronger service messaging.
- Added portfolio/project cards with 3-column grid, hover lift, and image zoom.
- Added GitHub profile CTA below project cards.
- Added tech tags, live site button, and source code button per project card.
- Responsive breakpoints set (3-col → 2-col → 1-col).
- Tools & Stack section relocated to sit between Work and About.
- All new elements added to JS scroll-reveal observer.

Pending tasks (user-owned):

- Replace placeholder thumbnails, URLs, and repo links with real project data.
- Upload professional headshot for About section.

---

## Phase 4 — About and Trust

**Status: In Progress — photo integration planned**

Goal:

Make the about section credible, focused, and client-friendly.

Completed tasks:

- Refined Rodel's story.
- Connected remote experience to business outcomes.
- Made the Equivalent Exchange philosophy professional, not fan-site heavy.
- Stats section added (4+ years, reach growth, satisfaction, claims processed).

In progress:

- Professional headshot placement in About section (photo with slight overlay on stat cards — HTML + CSS ready, awaiting user asset).

Planned tasks:

- Add testimonials or proof points if available.
- Upload real photo asset to `images/` folder.

---

## Phase 5 — Contact and Conversion

**Status: Planned**

Goal:

Make it easy for business owners to inquire.

Planned tasks:

- Improve contact form copy.
- Decide whether to keep `mailto:` behavior or add a real form backend later.
- Add clear CTA language for clients.
- Consider Calendly or direct booking later.

---

## Phase 6 — Polish and Launch

**Status: Planned**

Planned tasks:

- SEO meta tags and Open Graph image.
- Favicon.
- Performance pass (image compression, font loading).
- Final cross-browser test.
- Deploy (Netlify, Vercel, or GitHub Pages — TBD).

---

## Update Protocol

When the user says **"update the skills"**:

1. Update this `portfolio-phases.md` file with the current phase, completed work, new issues, and next steps.
2. Update `portfolio-journal.md` with a dated entry documenting what changed.
3. Preserve all previous context that is still useful.
4. Keep both files compatible with ChatGPT and Claude.
5. Produce updated downloadable `.md` files when possible.