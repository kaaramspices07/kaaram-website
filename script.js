const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('done'), 450);
});

document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Replay the pack's entrance animation if the visitor returns to the top.
const heroPack = document.querySelector('.hero-pack');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY < 40 && lastScrollY > 200) {
    heroPack.style.animation = 'none';
    void heroPack.offsetWidth;
    heroPack.style.animation = '';
  }
  lastScrollY = window.scrollY;
}, { passive: true });
