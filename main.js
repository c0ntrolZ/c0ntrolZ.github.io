(function () {
  'use strict';

  /* ── Progress bar ─────────────────────────────────────────── */
  const bar = document.createElement('div');
  bar.id = 'progress-bar';
  document.body.prepend(bar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
  }

  /* ── Back to top ──────────────────────────────────────────── */
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Active nav + scroll reveal ───────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        // Scroll reveal
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
        // Active nav
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          navLinks.forEach(function (link) { link.classList.remove('active'); });
          const id = entry.target.id;
          const active = document.querySelector('.nav-links a[href="#' + id + '"]');
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: [0, 0.25], rootMargin: '-60px 0px -40% 0px' }
  );

  sections.forEach(function (s) { observer.observe(s); });

  /* ── Scroll handler ───────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    updateProgress();
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  updateProgress();
}());
