// ============ PRELOADER ============
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Trigger hero animation
    document.querySelector('.hero').classList.add('in-view');
  }, 2500);
});

document.body.style.overflow = 'hidden';

// ============ INTERSECTION OBSERVER ============
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll(
  '.section-card, .quote-content, .profile-header, .profile-item, ' +
  '.timeline-header, .timeline-item, .fullwidth-image'
).forEach(el => observer.observe(el));

// ============ NAVBAR HIDE/SHOW ON SCROLL ============
let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.classList.add('nav-hidden');
  } else {
    navbar.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;

  // Sidebar nav visibility
  const sidebar = document.querySelector('.sidebar-nav');
  if (sidebar) {
    if (currentScrollY > window.innerHeight * 0.5) {
      sidebar.classList.add('visible');
    } else {
      sidebar.classList.remove('visible');
    }
  }

  // Update active sidebar dot
  updateActiveDot();
});

// ============ SIDEBAR DOTS ============
function updateActiveDot() {
  const sections = document.querySelectorAll('[data-section]');
  const dots = document.querySelectorAll('.sidebar-dot');

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }
  });
}

// Sidebar dot click
document.querySelectorAll('.sidebar-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const target = dot.getAttribute('data-target');
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============ HAMBURGER MENU ============
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');

    if (mobileNav.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
}

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = 'auto';
  });
});

// ============ Cursor personalizado ============
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hover effects
  document.querySelectorAll('a, button, .sidebar-dot').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursor.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '1';
    });
  });
}

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    heroBg.style.transform = `scale(${1.1 - scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
  }
});

// ============ SMOOTH ANCHOR SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
