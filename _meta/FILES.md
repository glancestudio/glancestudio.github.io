# File Map — Key Locations

## main.css (1009 lines)
All shared styles. Both pages use this. No page-specific overrides here except what's scoped by class.

| What | Where to look |
|------|--------------|
| CSS custom properties (colors, easing) | Top of file — `:root` block |
| `--primary` accent orange | `:root` |
| `--bg`, `--ink`, `--muted`, `--rule` | `:root` |
| `--ease` bezier | `:root` |
| Right sticky nav (`.nav`, `.nav-item`, `.nav-seg`) | Search `/* NAV */` or `.nav {` |
| Mobile top bar + hamburger | Search `.mobile-nav-bar` |
| Hero section (`.hero-top`, `.hero-bottom`, `.hero-name`) | Search `.hero-` |
| Ambient line (`.ambient-line`, `.al-a/b/c`) | Search `.ambient-line` |
| Project cards (`.project-card`, `.card-image`, `.card-body`) | Search `.project-card` |
| Service panels (`.svc-panel`, `.svc-stack`) | Search `.svc-panel` |
| Review cards (`.review-card`) | Search `.review-card` |
| Contact form (`.contact-grid`, `.fg`) | Search `.contact-grid` |
| Closing band (`.closing-band`) | Search `.closing-band` |
| Footer | Search `footer {` |
| `[data-reveal]` scroll animation base | Search `data-reveal` |
| `@font-face` Sifonn | Search `@font-face` or `Sifonn` |
| Mobile breakpoints | Search `@media` |

---

## index.html (314 lines)

| Lines | What |
|-------|------|
| 18–30 | Mobile nav bar + hamburger + overlay menu |
| 35–59 | Right sticky nav (desktop) |
| 64–85 | Hero section (`#home`) |
| 90–148 | Projects section (`#projects`) — 3 cards |
| 154–195 | Services section (`#services`) — 2 panels |
| 200–237 | Reviews section (`#reviews`) — 3 cards (3rd hidden) |
| 242–283 | Contact section (`#contact`) — form |
| 288–299 | Closing band |
| 304–307 | Footer |

---

## index.js (150 lines)

| Lines | What |
|-------|------|
| 1–4 | Lenis init |
| 6–16 | Section list, nav click handlers |
| 18–41 | Active section detection + nav highlight (`setNav`) |
| 48–66 | Ambient line width animation map (`lineMap`) + `setLine` |
| 68–80 | Service panels IntersectionObserver (`.revealed` class) |
| 82–96 | Generic scroll reveal observer (`[data-reveal]` → `.visible`) |
| 98–116 | Scroll handler (RAF-throttled, calls setNav + setLine) |
| 118–140 | Mobile nav open/close + menu item scroll |
| 142–149 | Contact form submit handler (fake success state) |

---

## projects.html (1137 lines)

All styles are in an inline `<style>` block within the `<head>` (lines ~13–720). No separate CSS file for this page.

| Lines | What |
|-------|------|
| 13–720 | Inline `<style>` — all projects page styles |
| 727–750 | Sticky header: back link + 3 tabs + sliding indicator |
| 756–814 | `#proj-01` — Trough Controller article |
| 820–878 | `#proj-02` — Furnace Control article |
| 885–942 | `#proj-03` — Sensor Monitor article |
| 948–959 | Closing band |
| 963–967 | Footer |
| 973–1134 | Inline `<script>` — Lenis, tab switching, reveal observer, parallax, cursor glow |

**Key JS functions in projects.html script:**
- `switchToPanel(panelId)` — L1044: activates panel, moves tab indicator, triggers hero entrance
- `moveIndicator(tab)` — L986: repositions sliding underline
- `observePanel(panel)` — L1003: sets up IntersectionObserver for a panel's `[data-reveal]` elements
- `bindCursorGlow(scope)` — L1026: mouse tracking on `.ai-inner` image blocks
- `updateParallax()` — L1011: subtle parallax on `.art-image` blocks on scroll

---

## Content.md

Raw marketing copy for all 3 projects. Use as source of truth for text content in projects.html panels. Order: (1) Trough Controller, (2) Furnace Control System, (3) Multi Zone Sensor Monitoring System.

---

## TASKS.md

Active tasks / change requests for this project. Check here before starting work to understand what's pending or in-progress.
