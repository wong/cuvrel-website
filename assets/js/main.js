const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Lightweight animated network visual for the hero. It stays local and needs no library.
const canvas = document.querySelector('.network-canvas');
const heroArt = document.querySelector('.hero-art');
if (canvas && heroArt) {
  const context = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0;
  let height = 0;
  let frame = 0;
  let points = [];

  const resizeNetwork = () => {
    const bounds = heroArt.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(80, Math.min(190, Math.round(width / 10)));
    points = Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2;
      const radius = 0.38 + Math.random() * 0.48;
      return {
        x: width * (0.73 + Math.cos(angle) * radius * Math.min(0.41, height / width * 0.78)),
        y: height * (0.51 + Math.sin(angle) * radius * 0.47),
        phase: Math.random() * Math.PI * 2,
      };
    });
  };

  const drawNetwork = (time = 0) => {
    context.clearRect(0, 0, width, height);
    const t = reducedMotion.matches ? 0 : time * 0.00018;
    const animated = points.map((point) => ({
      x: point.x + Math.sin(t + point.phase) * 8,
      y: point.y + Math.cos(t * 1.2 + point.phase) * 7,
    }));

    for (let i = 0; i < animated.length; i += 1) {
      for (let j = i + 1; j < animated.length; j += 1) {
        const dx = animated[i].x - animated[j].x;
        const dy = animated[i].y - animated[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 132) {
          context.strokeStyle = `rgba(112, 190, 239, ${(1 - distance / 132) * 0.18})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(animated[i].x, animated[i].y);
          context.lineTo(animated[j].x, animated[j].y);
          context.stroke();
        }
      }
      const point = animated[i];
      const glow = 0.45 + (Math.sin(t * 2 + points[i].phase) + 1) * 0.25;
      context.fillStyle = `rgba(119, 222, 232, ${glow})`;
      context.beginPath();
      context.arc(point.x, point.y, 1.25, 0, Math.PI * 2);
      context.fill();
    }
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(drawNetwork);
  };

  resizeNetwork();
  drawNetwork();
  window.addEventListener('resize', resizeNetwork, { passive: true });
  reducedMotion.addEventListener?.('change', () => {
    window.cancelAnimationFrame(frame);
    drawNetwork();
  });
}

// Bring sections in gently as they enter the viewport.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.intro, .pillars, .brands, .global, .contact').forEach((section) => {
    section.classList.add('reveal-section');
    revealObserver.observe(section);
  });
}
