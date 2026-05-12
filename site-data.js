/* ─────────────────────────────────────────────────
   SITE DATA — single source of truth
   Edit here to update cards, reviews, and contact
   across all pages.
───────────────────────────────────────────────── */
const SITE = {

  /* ── Contact ──────────────────────────────────── */
  contact: {
    phone:        '+918277322462',
    phoneDisplay: '+91 82773 22462',
  },

  /* ── Projects (display order = card order) ────── */
  /* projId must match the <article id> in projects.html */
  projects: [
    {
      projId:   'proj-02',
      num:      '01',
      client:   'Nandi Powertronics PVT LTD',
      title:    'Furnace C<span class="ac">O</span>ntrol Panel',
      image:    'assets/images/Mockup-Furnace.png',
      imageAlt: 'Furnace Control Panel mockup',
      caps:     ['UI System Design', 'DGUS Implementation', 'Local Network']
    },
    {
      projId:   'proj-03',
      num:      '02',
      client:   'RabBan Control Solutions PVT LTD',
      title:    'Multi-Zone <span class="ac">S</span>ensor Monitor',
      image:    'assets/images/Mcokup-Sensor.png',
      imageAlt: 'Multi-Zone Sensor Monitor mockup',
      caps:     ['Dashboard Design', 'Local Network']
    },
    {
      projId:   'proj-01',
      num:      '03',
      client:   'RabBan Control Solutions PVT LTD',
      title:    'Trough Automation <span class="ac">S</span>ystem',
      image:    'assets/images/Mcokup-Trough.png',
      imageAlt: 'Trough Automation System mockup',
      caps:     ['Dashboard Design', 'DGUS Implementation', 'Local Network']
    }
  ],

  /* ── Reviews ──────────────────────────────────── */
  /* visible: false = rendered but hidden (placeholder slot) */
  reviews: [
    {
      text:    'Really liked how clean and easy the interface turned out. Everything feels well thought out and simple to use without overcomplicating things. They stayed involved even after the main design was done and helped refine things further.',
      name:    'Nandi Powertronics',
      role:    'Operations Director',
      visible: true
    },
    {
      text:    'They took the time to understand how our trough controller actually works, which made a big difference. Even after delivery, they kept working with us to tweak and adjust things so it fit properly during implementation.',
      name:    'RabBan Control Solutions',
      role:    'CEO',
      visible: true
    },
    {
      text:    'They understood industrial constraints immediately — no unnecessary complexity, clean operator logic, and documentation our embedded team could actually work from. Rare combination.',
      name:    'Arvind T.',
      role:    'Head of Engineering — CoreTech Systems',
      visible: false
    }
  ]

};
