// =========================================
//  COOKIE DIGITAL — Main JS
// =========================================

// ---- NAV SCROLL STATE ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- MOBILE BURGER MENU ----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  burger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  if (nav && mobileMenu && !nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =========================================
//  ANIMATIONS
// =========================================

// ---- 1. SCROLL REVEAL ----
// Elements fade up into view as you scroll down
const revealEls = document.querySelectorAll(
  '.service-card, .value-card, .process-step, .teaser-card, .plan-card, .addon-item, .faq-item, .contact-detail-item, .contact-reassurance, .contact-form-wrap, .about-page__photo, .about-page__text, .section-header'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger each element slightly so they don't all pop in at once
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.classList.add('will-reveal');
  revealObserver.observe(el);
});

// Inject the reveal styles
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .will-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .revealed {
      opacity: 1 !important;
      transform: none !important;
    }
  </style>
`);

// ---- 2. HERO TEXT ENTRANCE ----
// Staggers the hero headline, subtext, and buttons on page load
document.querySelectorAll('.animate-in').forEach((el, i) => {
  el.style.animationDelay = el.style.getPropertyValue('--delay') || `${i * 0.12}s`;
});

// ---- 3. SERVICE CARD HOVER LIFT ----
// Cards get a subtle shadow lift on hover (done in CSS but triggered here for smoothness)
document.querySelectorAll('.service-card, .value-card, .plan-card, .teaser-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s';
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 16px 40px rgba(46, 28, 14, 0.1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  });
});

// ---- 4. NAV LINK UNDERLINE ANIMATION ----
// Smooth animated underline on nav links
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .nav__links a:not(.nav__cta) {
      position: relative;
    }
    .nav__links a:not(.nav__cta)::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1.5px;
      background: var(--caramel);
      transition: width 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .nav__links a:not(.nav__cta):hover::after {
      width: 100%;
    }
  </style>
`);

// ---- 5. BUTTON PRESS FEEL ----
// Buttons get a tiny scale-down on click for a tactile feel
document.querySelectorAll('.btn, .btn--primary, .btn--ghost, .btn--light, .btn--submit, .nav__cta').forEach(btn => {
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.97)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = '';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ---- 6. MARQUEE PAUSE ON HOVER ----
const marquee = document.querySelector('.marquee');
if (marquee) {
  marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
}

// ---- 7. PROCESS STEP NUMBER COUNT-UP ----
// Numbers animate from 0 when they scroll into view
const processNums = document.querySelectorAll('.process-step__num');

const numObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent);
      let current = 0;
      const duration = 600;
      const step = duration / target;
      const counter = setInterval(() => {
        current++;
        el.textContent = String(current).padStart(2, '0');
        if (current >= target) clearInterval(counter);
      }, step);
      numObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

processNums.forEach(el => numObserver.observe(el));

// ---- 8. SMOOTH PAGE ENTRANCE ----
// Page fades in cleanly on load instead of just snapping in
document.head.insertAdjacentHTML('beforeend', `
  <style>
    body {
      animation: pageFadeIn 0.4s ease forwards;
    }
    @keyframes pageFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  </style>
`);
