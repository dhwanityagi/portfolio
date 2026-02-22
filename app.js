const cursorGlow = document.querySelector('.cursor-glow');
const revealNodes = [...document.querySelectorAll('section, .project-card, .about-panel, .skill-cloud, .contact')];
const tiltCards = [...document.querySelectorAll('[data-tilt]')];

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

window.addEventListener('pointermove', onPointerMove);
setupReveal();
setupTilt();
