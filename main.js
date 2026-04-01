(function () {
  'use strict';

  /* ── Progress bar ─────────────────────────────────────────── */
  var bar = document.createElement('div');
  bar.id = 'progress-bar';
  document.body.prepend(bar);

  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
  }

  /* ── Back to top ──────────────────────────────────────────── */
  var topBtn = document.createElement('button');
  topBtn.id = 'back-to-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '↑';
  document.body.appendChild(topBtn);

  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Email reveal ─────────────────────────────────────────── */
  var emailBtn = document.getElementById('reveal-email-btn');
  var emailSpan = document.getElementById('email-reveal');
  if (emailBtn && emailSpan) {
    emailBtn.addEventListener('click', function () {
      var hidden = emailSpan.hasAttribute('hidden');
      if (hidden) {
        emailSpan.removeAttribute('hidden');
        emailBtn.textContent = 'Hide';
      } else {
        emailSpan.setAttribute('hidden', '');
        emailBtn.textContent = 'Get in touch';
      }
    });
  }

  /* ── Card details toggle ──────────────────────────────────── */
  document.querySelectorAll('[data-toggle]').forEach(function (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var targetId = toggleBtn.getAttribute('data-toggle');
      var details = document.getElementById(targetId);
      if (!details) return;
      var isOpen = !details.hasAttribute('hidden');
      if (isOpen) {
        details.setAttribute('hidden', '');
        toggleBtn.textContent = 'Details ↓';
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        details.removeAttribute('hidden');
        toggleBtn.textContent = 'Details ↑';
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Active nav + scroll reveal ───────────────────────────── */
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('main section');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          navLinks.forEach(function (link) { link.classList.remove('active'); });
          var id = entry.target.id;
          var active = document.querySelector('.nav-links a[href="#' + id + '"]');
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: [0, 0.15], rootMargin: '-60px 0px -40% 0px' }
  );

  sections.forEach(function (s) { observer.observe(s); });

  /* ── Scroll handler ───────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    updateProgress();
    if (window.scrollY > 300) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });

  updateProgress();
}());
