# Design Decisions & Conventions

## Visual Language

- **Accent letter** — one letter in key titles/names gets `<span class="ac">` → renders in `--primary` orange. Convention: capitalize that letter in the word (e.g., "Glance **S**tudios", "Trough C**O**ntroller").
- **Label tags** — small all-caps eyebrow labels use `.label-tag` class.
- **Ghost numbers** — large faded background numbers (`.card-ghost-num`, `.ai-ghost`, `.svc-panel-bg-num`) for visual texture. Pure decoration, `aria-hidden`.
- **Caps/pills** — technology/scope tags use `.cap` inside `.card-caps` or `.art-caps`. Small uppercase, pill border.

## Animation Patterns

- **Scroll reveal:** Add `data-reveal` attribute → JS observes and adds `.visible` class → CSS transitions trigger. Used on cards, sections, image blocks.
- **Hero entrance (projects.html):** Panel gets `.entered` class after 2x rAF → CSS transitions on `.art-eyebrow`, `.art-title`, `.art-caps .cap`, `.art-lead`.
- **Service panels:** Use `.revealed` class (not `.visible`) — separate observer with different threshold.
- **Stagger:** `transition-delay` on nth-child for `.art-caps .cap` items and `.spec-item` entries.

## Layout Conventions

- Max content width: `860px` centered (projects.html article body/hero).
- Right nav padding offset applied in main.css — projects.html overrides closing-band/footer padding since it has no right nav.
- Service section uses sticky-ish stacking panels (`svc-stack`), not a grid.
- Projects grid on index: CSS grid, cards have `data-reveal` for stagger.

## CSS Architecture

- Single shared `main.css` for both pages.
- projects.html has all its own styles in an **inline `<style>` block** — not in main.css. This is intentional isolation (different layout paradigm).
- No utility classes. No framework. All styles are component-scoped by BEM-ish class naming.
- CSS nesting used (modern syntax `& .child {}`).

## JS Architecture

- `index.js` is only for `index.html`. projects.html has inline script.
- No modules. No bundler. Plain ES6 in `<script>` tags.
- Lenis smooth scroll on both pages (`lerp: 0.08`).
- Nav active state driven by `window.scrollY` midpoint check (not IntersectionObserver) in index.js.

## Content / Copy Rules

- Project descriptions sourced from `Content.md` — keep in sync if copy changes.
- Third review card (`Arvind T. / CoreTech Systems`) is `visibility: hidden` — placeholder slot, not yet a real client review.
- Phone number in contact section (`+91 98765 43210`) is a placeholder.
- Form has no backend — submit handler just shows fake success state.

## Adding a New Project

1. Add card to `index.html` `#projects` grid (follow card 1/2/3 pattern).
2. Add tab button to `projects.html` `.ph-tabs`.
3. Add `<article class="proj-panel" id="proj-0X">` in projects.html following existing article structure.
4. Update `proj-nav` prev/next links in all panels to reflect new circular order.
5. Add content to `Content.md`.

## Adding a New Section to index.html

1. Add `<section id="sectionname">` in the scroll order.
2. Add `.nav-item` + `.nav-seg` pair to right sticky nav (keep order in sync).
3. Add `.mobile-menu-item` to mobile overlay.
4. Add entry to `lineMap` in `index.js` with ambient line widths.
