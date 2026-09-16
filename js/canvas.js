/**
 * CANVAS.JS - Interactive Cosmic Constellation & Particle Physics
 * High-performance 60fps canvas animation with cursor repulsion and theme sensitivity.
 */

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };
  let isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light';

  // Listen to theme updates
  window.addEventListener('themeChanged', (e) => {
    isDarkMode = e.detail.theme !== 'light';
  });

  // Handle Canvas Resize with devicePixelRatio support
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initParticles();
  }

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
      this.isCyan = Math.random() > 0.4; // 60% Electric Cyan, 40% Cool Silver
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      if (isDarkMode) {
        ctx.fillStyle = this.isCyan
          ? `rgba(0, 229, 255, ${this.baseAlpha * 0.85})`
          : `rgba(241, 245, 244, ${this.baseAlpha * 0.5})`;
      } else {
        ctx.fillStyle = this.isCyan
          ? `rgba(0, 159, 179, ${this.baseAlpha * 0.75})`
          : `rgba(69, 86, 93, ${this.baseAlpha * 0.4})`;
      }
      ctx.fill();
    }

    update() {
      // Mouse Interaction - Soft Repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }

      // Normal movement
      this.x += this.vx;
      this.y += this.vy;

      // Wrap-around screen bounds
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      this.draw();
    }
  }

  // Initialize Particle Array
  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 110);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  // Connect particles with faint line cords
  function connect() {
    const maxDist = 120;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * (isDarkMode ? 0.22 : 0.08);
          ctx.strokeStyle = isDarkMode
            ? `rgba(0, 229, 255, ${opacity})`
            : `rgba(0, 159, 179, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    connect();
    requestAnimationFrame(animate);
  }

  // Mouse move listeners
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', resize);

  // Initialize
  resize();
  animate();
})();
