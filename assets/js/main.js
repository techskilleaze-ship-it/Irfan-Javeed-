(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero reveal
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('is-loaded'); }); });

  // Year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 981px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  // Active nav link
  var links = document.querySelectorAll('.nav__links a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['markets', 'profile', 'experience', 'expertise', 'contact'].forEach(function (id) {
      var el = document.getElementById(id); if (el) io.observe(el);
    });
  }

  // Map: arc draw-in
  var map = document.querySelector('.map');
  var arcs = document.querySelectorAll('.arc');
  arcs.forEach(function (p, i) {
    var len = Math.ceil(p.getTotalLength());
    p.style.setProperty('--len', len);
    p.style.setProperty('--delay', (i * 0.18) + 's');
  });
  if (map) {
    if (reduce || !('IntersectionObserver' in window)) map.classList.add('is-drawn');
    else {
      var mo = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { map.classList.add('is-drawn'); mo.disconnect(); }
      }, { threshold: 0.3 });
      mo.observe(map);
    }
  }

  // Map: market highlight
  var rows = document.querySelectorAll('.mrow');
  var pinned = null;
  function highlight(code) {
    document.querySelectorAll('.arc, .node').forEach(function (el) {
      var m = el.getAttribute('data-m');
      el.classList.toggle('is-on', !!code && (m === code || (code !== 'AE' && el.classList.contains('hub'))));
    });
    rows.forEach(function (r) { r.classList.toggle('is-on', r.getAttribute('data-m') === code); });
  }
  rows.forEach(function (r) {
    var code = r.getAttribute('data-m');
    r.addEventListener('mouseenter', function () { highlight(code); });
    r.addEventListener('mouseleave', function () { highlight(pinned); });
    r.addEventListener('focus', function () { highlight(code); });
    r.addEventListener('blur', function () { highlight(pinned); });
    r.addEventListener('click', function () {
      pinned = pinned === code ? null : code;
      rows.forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-m') === pinned)); });
      highlight(pinned || code);
    });
  });

  // Experience accordion
  var btns = document.querySelectorAll('.role__btn');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      btns.forEach(function (o) {
        o.setAttribute('aria-expanded', 'false');
        document.getElementById(o.getAttribute('aria-controls')).hidden = true;
        o.closest('.role').classList.remove('is-open');
      });
      if (!open) {
        b.setAttribute('aria-expanded', 'true');
        document.getElementById(b.getAttribute('aria-controls')).hidden = false;
        b.closest('.role').classList.add('is-open');
      }
    });
  });
})();
