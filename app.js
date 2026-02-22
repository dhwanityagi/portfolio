const cursorGlow = document.querySelector('.cursor-glow');
const revealNodes = [...document.querySelectorAll('section, .project-card, .about-panel, .skill-cloud, .contact')];
const tiltCards = [...document.querySelectorAll('[data-tilt]')];
const progress = document.getElementById('progress');

function onPointerMove(event) {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
}

function setupReveal() {
  revealNodes.forEach((node, index) => {
    node.classList.add('reveal');
    node.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupTilt() {
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 14;
      const rotateX = ((y / rect.height) - 0.5) * -14;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });
}

function setupMagnetic() {
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

function setupScrollProgress() {
  if (!progress) return;
  function update() {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    const pct = total <= 0 ? 0 : (doc.scrollTop / total) * 100;
    progress.style.width = `${pct}%`;
  }
  addEventListener('scroll', update, { passive: true });
  update();
}

window.addEventListener('pointermove', onPointerMove);
setupReveal();
setupTilt();
setupMagnetic();
setupScrollProgress();
