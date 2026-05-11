# Project Overview — Glance Studios

**Type:** Agency portfolio website  
**Brand:** Glance Studios — HMI Interface Design / Industrial Systems  
**Stack:** Vanilla HTML + CSS + JS. No framework. No build step. Lenis for smooth scroll.  
**Font:** Urbanist (Google Fonts). Display headings use `'Sifonn'` (assumed locally available or fallback chain: Futura → Century Gothic → sans-serif).  
**Accent color:** `var(--primary)` — orange `#ff691d`  
**Theme vars defined in:** `main.css` (`:root`)

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Main portfolio page — single scroll with 5 sections |
| `projects.html` | Project detail page — tab-based, 3 project panels |
| `main.css` | All shared styles for both pages |
| `index.js` | JS for index.html only (nav, scroll, mobile menu, form) |
| `Content.md` | Raw copy/content source for all 3 projects |
| `TASKS.md` | Active task list / change requests |

---

## index.html Sections (in order)

| ID | Label | What's there |
|----|-------|-------------|
| `#home` | Home | Hero — tagline top, big name bottom, ambient animated line |
| `#value` | Impact | "The Case For Design" — 3 data rows (stats + text) explaining design ROI |
| `#projects` | Projects | 3 project cards linking to `projects.html#proj-0X` |
| `#services` | Services | 2 stacked service panels (dark/light) |
| `#reviews` | Reviews | 3 review cards (3rd hidden — `visibility: hidden`) |
| `#contact` | Connect | Contact form + phone number |

Closing band + footer appear below contact, outside any section.

---

## projects.html Panels

| ID | Tab | Project |
|----|-----|---------|
| `#proj-01` | Trough Controller | Tea drying trough — RabBan Control Solutions |
| `#proj-02` | Furnace Control | Furnace system — Nandi Powertronics |
| `#proj-03` | Sensor Monitor | Multi-zone gas/sensor dashboard — RabBan Control Solutions |

Note: index.html card order is Furnace (01) → Sensor (02) → Trough (03), but projects.html tab order is Trough (01) → Furnace (02) → Sensor (03). The hash links in cards are correct per projects.html IDs.

---

## Navigation

- **Desktop:** Right-side sticky vertical nav (`nav.nav`) — highlight follows scroll via `index.js`
- **Mobile:** Top bar with hamburger → full-screen overlay menu
- **projects.html:** Has its own sticky header with back-link + sliding tab indicator (no right nav)
