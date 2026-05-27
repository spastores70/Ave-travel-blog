(function () {
  'use strict';
  var SOLO = [
    '#map',
    '.article-container > h2',
    '.article-container > p.lead',
    '.article-container > .pull-quote',
    '.article-container > .article-img-wrap',
    '.article-container > .tip-box',
    '.more-inner > h2',
    '.more-inner > .more-divider',
  ].join(', ');
  var STAGGER = ['.section-header', '.blog-grid', '.story-grid', '.about-inner'];
  var STEP = 80;

  function inViewport(el) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  function arm(el, delay) {
    if (inViewport(el)) return;
    if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    el.classList.add('reveal');
    io.observe(el);
  }

  document.querySelectorAll(SOLO).forEach(function (el) { arm(el, 0); });
  STAGGER.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (parent) {
      Array.from(parent.children).forEach(function (child, i) { arm(child, i * STEP); });
    });
  });
})();
