/* ─── LENIS ──────────────────────────────────── */
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
function lenisRaf(time) { lenis.raf(time); requestAnimationFrame(lenisRaf); }
requestAnimationFrame(lenisRaf);

/* ─── SECTIONS & NAV ─────────────────────────── */
const sections   = [...document.querySelectorAll('section[id]')];
const navItems   = [...document.querySelectorAll('.nav-item')];
const navSegs    = [...document.querySelectorAll('.nav-seg')];

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const el = document.getElementById(item.dataset.section);
    if (el) lenis.scrollTo(el);
  });
});

function getActive() {
  const mid = window.scrollY + window.innerHeight * 0.45;
  let active = sections[0].id;
  for (const s of sections) {
    if (s.offsetTop <= mid) active = s.id;
  }
  return active;
}

function setNav(id) {
  navItems.forEach((item, i) => {
    const on = item.dataset.section === id;
    item.classList.toggle('active', on);
    /* fill the segment below the active item */
    if (navSegs[i]) {
      navSegs[i].style.setProperty('--fill', on ? '100%' : '0%');
      /* drive ::after height via a CSS var */
      navSegs[i].style.cssText = navSegs[i].style.cssText
        .replace(/--fill:[^;]+;?/, '') + `--fill:${on ? '100%' : '0%'};`;
      /* simpler: toggle class */
      navSegs[i].classList.toggle('lit', on);
    }
  });
}

/* patch nav-seg::after to respond to .lit class */
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-seg.lit::after { height: 100% !important; }`;
document.head.appendChild(navStyle);

/* ─── AMBIENT LINE ───────────────────────────── */
const alA = document.getElementById('alA');
const alB = document.getElementById('alB');
const alC = document.getElementById('alC');

const lineMap = {
  home:     ['38%', '20px', '20px'],
  value:    ['46%', '28px', '12px'],
  projects: ['54%', '10px', '28px'],
  services: ['22%', '38px', '10px'],
  reviews:  ['60%', '14px', '18px'],
  contact:  ['68%', '8px',  '8px' ],
};

function setLine(id) {
  const [a, b, c] = lineMap[id] || lineMap.home;
  alA.style.width = a;
  alB.style.width = b;
  alC.style.width = c;
}

/* ─── SERVICE PANELS ─────────────────────────── */
const svcPanels = [...document.querySelectorAll('.svc-panel')];

svcPanels.forEach((panel, i) => {
  const threshold = i === 0 ? 0.12 : 0.28;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      panel.classList.add('revealed');
      observer.disconnect();
    }
  }, { threshold });
  observer.observe(panel);
});


/* ─── IMPACT ROW REVEALS ─────────────────────── */
const rowIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      rowIO.unobserve(e.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.val-row').forEach(el => rowIO.observe(el));

/* ─── INTERSECTION OBSERVER (scroll reveals) ─── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  /* stagger siblings in same parent */
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  io.observe(el);
});

/* ─── SCROLL HANDLER ─────────────────────────── */
let rafPending = false;

function onScroll() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    const id = getActive();
    setNav(id);
    setLine(id);
    rafPending = false;
  });
}

lenis.on('scroll', onScroll);

/* init */
setNav('home');
setLine('home');

/* ─── MOBILE NAV ─────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const el = document.getElementById(item.dataset.section);
    if (el) lenis.scrollTo(el);
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

/* ─── BEFORE / AFTER SLIDER ─────────────────── */
(function() {
  const slider   = document.getElementById('baSlider');
  const before   = document.getElementById('baBefore');
  const divider  = document.getElementById('baDivider');
  if (!slider) return;

  function setPos(pct) {
    pct = Math.max(0, Math.min(100, pct));
    before.style.clipPath   = `inset(0 ${100 - pct}% 0 0)`;
    divider.style.left      = pct + '%';
  }

  function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  let dragging = false;

  function onMove(e) {
    if (!dragging) return;
    const rect = slider.getBoundingClientRect();
    const pct  = ((getX(e) - rect.left) / rect.width) * 100;
    setPos(pct);
  }

  slider.addEventListener('mousedown',  e => { dragging = true; onMove(e); });
  slider.addEventListener('touchstart', e => { dragging = true; onMove(e); }, { passive: true });
  window.addEventListener('mousemove',  onMove);
  window.addEventListener('touchmove',  onMove, { passive: true });
  window.addEventListener('mouseup',    () => { dragging = false; });
  window.addEventListener('touchend',   () => { dragging = false; });
})();

/* ─── FORM SUBMIT ────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  btn.textContent = 'Sent ✓';
  btn.style.background = '#2a2a2a';
  btn.disabled = true;
});
