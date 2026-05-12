/* ─── LENIS ────────────────────────────────────── */
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
function lenisRaf(t) { lenis.raf(t); requestAnimationFrame(lenisRaf); }
requestAnimationFrame(lenisRaf);

/* ─── ELEMENTS ─────────────────────────────────── */
const tabs      = [...document.querySelectorAll('.ph-tab')];
const panels    = [...document.querySelectorAll('.proj-panel')];
const indicator = document.querySelector('.tab-indicator');
const tabsEl    = document.querySelector('.ph-tabs');

/* ─── SLIDING TAB INDICATOR ────────────────────── */
function moveIndicator(tab) {
  const tr = tab.getBoundingClientRect();
  const pr = tabsEl.getBoundingClientRect();
  indicator.style.left  = (tr.left - pr.left) + 'px';
  indicator.style.width = tr.width + 'px';
}

/* ─── INTERSECTION OBSERVER ────────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observePanel(panel) {
  panel.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.remove('visible');
    io.observe(el);
  });
}

/* ─── PARALLAX ON SCROLL ───────────────────────── */
function updateParallax() {
  const activePanel = document.querySelector('.proj-panel.active');
  if (!activePanel) return;
  activePanel.querySelectorAll('.art-image').forEach(img => {
    const r = img.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const progress = (window.innerHeight / 2 - r.top) / (window.innerHeight + r.height);
    const offset = progress * 48;
    img.querySelector('.ai-inner').style.transform = `translateY(${offset}px)`;
  });
}

lenis.on('scroll', updateParallax);

/* ─── CURSOR GLOW ON IMAGES ────────────────────── */
function bindCursorGlow(scope) {
  scope.querySelectorAll('.ai-inner').forEach(inner => {
    inner.addEventListener('mousemove', e => {
      const r = inner.getBoundingClientRect();
      inner.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      inner.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    });
    inner.addEventListener('mouseleave', () => {
      inner.style.setProperty('--mx', '50%');
      inner.style.setProperty('--my', '50%');
    });
  });
}

// bind on all panels once
panels.forEach(p => bindCursorGlow(p));

/* ─── PANEL SWITCH ─────────────────────────────── */
function switchToPanel(panelId) {
  const targetPanel = document.getElementById(panelId);
  if (!targetPanel || targetPanel.classList.contains('active')) return;

  // deactivate current
  panels.forEach(p => p.classList.remove('active', 'entered'));
  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });

  // activate panel
  targetPanel.classList.add('active');

  // activate matching tab + move indicator
  const targetTab = document.querySelector(`.ph-tab[data-panel="${panelId}"]`);
  if (targetTab) {
    targetTab.classList.add('active');
    targetTab.setAttribute('aria-selected', 'true');
    moveIndicator(targetTab);
  }

  // scroll to top
  lenis.scrollTo(0, { duration: 0.6 });

  // re-measure hscroll carousels (absolute position changes per panel)
  requestAnimationFrame(() => {
    targetPanel.querySelectorAll('[data-hscroll]').forEach(t => t._hsMeasure?.());
  });

  // observe reveals in new panel
  observePanel(targetPanel);

  // trigger hero entrance after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      targetPanel.classList.add('entered');
    });
  });

  // update URL hash without scroll jump
  history.replaceState(null, '', '#' + panelId);
}

/* ─── TAB CLICKS ───────────────────────────────── */
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchToPanel(tab.dataset.panel);
  });
});

/* ─── PROJ-NAV CLICKS ──────────────────────────── */
document.querySelectorAll('.pn-item').forEach(item => {
  item.addEventListener('click', () => {
    switchToPanel(item.dataset.panel);
  });
});

/* ─── HORIZONTAL SCROLL CAROUSEL ─────────────── */
const HSCROLL_GAP = 20;

function initHScroll(track) {
  const sticky   = track.querySelector('.hscroll-sticky');
  const strip    = track.querySelector('.hscroll-strip');
  const items    = [...track.querySelectorAll('.hscroll-item')];
  const dots     = [...track.querySelectorAll('.hscroll-dot')];
  const foot     = track.querySelector('.hscroll-foot');
  const progFill = track.querySelector('.hscroll-progress-fill');

  let itemW = 0, totalTravel = 0, trackAbsTop = 0;

  function getLeftPad() {
    const vw = window.innerWidth;
    if (vw <= 640)  return 24;
    if (vw <= 860)  return 48;
    return (vw - 860) / 2 + 48;
  }

  function measure() {
    const vw  = window.innerWidth;
    const lp  = getLeftPad();
    // image width = art-body content width, capped at 764px
    itemW = Math.min(764, vw - lp * 2);

    items.forEach(item => { item.style.width = itemW + 'px'; });
    strip.style.paddingLeft = lp + 'px';
    if (foot) foot.style.paddingLeft = lp + 'px';

    totalTravel = (items.length - 1) * (itemW + HSCROLL_GAP);
    track.style.height = (window.innerHeight + totalTravel) + 'px';

    // cache absolute position — only valid when panel is visible
    const rect = track.getBoundingClientRect();
    if (rect.width > 0) trackAbsTop = rect.top + window.scrollY;
  }

  function update({ scroll }) {
    // only update when this track's panel is active
    if (!track.closest('.proj-panel')?.classList.contains('active')) return;

    const scrolled = scroll - trackAbsTop;
    const clamped  = Math.max(0, Math.min(scrolled, totalTravel));

    strip.style.transform = `translateX(${-clamped}px)`;

    // active dot: which image slot is centered
    const activeIdx = Math.min(
      Math.round(clamped / (itemW + HSCROLL_GAP)),
      items.length - 1
    );
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));

    // progress bar
    if (progFill) {
      progFill.style.width = (totalTravel > 0 ? clamped / totalTravel * 100 : 0) + '%';
    }
  }

  measure();
  window.addEventListener('resize', measure);
  lenis.on('scroll', update);

  // expose for panel-switch re-measure
  track._hsMeasure = measure;
}

document.querySelectorAll('[data-hscroll]').forEach(initHScroll);

/* ─── INIT ─────────────────────────────────────── */
(function init() {
  // read hash to determine starting panel
  const hash = window.location.hash.replace('#', '');
  const startId = document.getElementById(hash) ? hash : 'proj-01';

  // silently activate the right panel without scroll
  panels.forEach(p => p.classList.remove('active', 'entered'));
  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });

  const startPanel = document.getElementById(startId);
  startPanel.classList.add('active');

  const startTab = document.querySelector(`.ph-tab[data-panel="${startId}"]`);
  if (startTab) {
    startTab.classList.add('active');
    startTab.setAttribute('aria-selected', 'true');
  }

  // set indicator after layout
  requestAnimationFrame(() => {
    if (startTab) moveIndicator(startTab);
  });

  // observe reveals
  observePanel(startPanel);

  // measure hscroll carousels after layout is ready
  requestAnimationFrame(() => {
    startPanel.querySelectorAll('[data-hscroll]').forEach(t => t._hsMeasure?.());
  });

  // hero entrance
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      startPanel.classList.add('entered');
    });
  });
})();
