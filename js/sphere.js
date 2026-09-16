/**
 * SPHERE.JS - Elite 8-Orbit Celestial Solar System & Tech Stack Model
 * 
 * Features:
 * - Exactly 8 Concentric Planetary Orbits matching PLACEHOLDERS.md
 * - Separate Planets and Skill Nodes distributed along each orbit
 * - Distinct brand logo icons for each skill (no plain text cluttering orbits)
 * - Interactive Hover HUD tooltips showing skill details on cursor hover
 * - Realistic Earth's Moon with visible circular orbit around Earth & crater topography
 * - Majestic, slow orbital velocities reflecting true cosmic hierarchy
 * - Dynamic wandering asteroids with glowing comet trails, collision detection, and spark particle bursts
 * - Zero scroll hijacking: Zoom strictly controlled via dedicated floating [+] / [-] buttons
 * - Complete 8-orbit visibility with 3D rotational freedom (drag up/down/left/right)
 * - Orbit name labels removed for ultra-sleek, clean aesthetics
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('tech-sphere-container');
    const canvas = document.getElementById('tech-sphere-canvas');
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');

    // 8 Concentric Planetary Orbits with 100% UNIQUE, non-duplicated skills
    const orbitsData = [
      {
        orbit: 1,
        planet: {
          name: 'Mercury',
          symbol: '☿',
          category: 'Programming Core',
          color: '#94A3B8',
          secondary: '#E2E8F0',
          radius: 6.5
        },
        orbitRadius: 75,
        speed: 0.007,
        skills: [
          { name: 'Python', type: 'python', color: '#38BDF8', secondary: '#F59E0B' },
          { name: 'Java', type: 'java', color: '#EF4444', secondary: '#F97316' },
          { name: 'JavaScript', type: 'javascript', color: '#FACC15', secondary: '#EAB308' },
          { name: 'C/C++', type: 'cpp', color: '#0284C7', secondary: '#38BDF8' },
          { name: 'TypeScript', type: 'typescript', color: '#3178C6', secondary: '#60A5FA' }
        ]
      },
      {
        orbit: 2,
        planet: {
          name: 'Venus',
          symbol: '♀',
          category: 'Frontend & UI Systems',
          color: '#F59E0B',
          secondary: '#FDE68A',
          radius: 8.5
        },
        orbitRadius: 125,
        speed: 0.0052,
        skills: [
          { name: 'React', type: 'react', color: '#00E5FF', secondary: '#38BDF8' },
          { name: 'HTML5', type: 'html5', color: '#EA580C', secondary: '#F97316' },
          { name: 'CSS3', type: 'css3', color: '#2563EB', secondary: '#60A5FA' },
          { name: 'Tailwind CSS', type: 'tailwind', color: '#06B6D4', secondary: '#38BDF8' },
          { name: 'Responsive Design', type: 'responsive', color: '#10B981', secondary: '#34D399' }
        ]
      },
      {
        orbit: 3,
        planet: {
          name: 'Earth',
          symbol: '🌍',
          category: 'Full Stack Engineering',
          color: '#00E5FF',
          secondary: '#38BDF8',
          radius: 10,
          hasMoon: true
        },
        orbitRadius: 180,
        speed: 0.0038,
        skills: [
          { name: 'Node.js', type: 'nodejs', color: '#22C55E', secondary: '#4ADE80' },
          { name: 'FastAPI', type: 'fastapi', color: '#00A499', secondary: '#14B8A6' },
          { name: 'REST APIs', type: 'api', color: '#8B5CF6', secondary: '#A78BFA' },
          { name: 'WebSockets', type: 'websockets', color: '#06B6D4', secondary: '#67E8F9' },
          { name: 'GraphQL', type: 'graphql', color: '#E10098', secondary: '#F472B6' }
        ]
      },
      {
        orbit: 4,
        planet: {
          name: 'Mars',
          symbol: '♂',
          category: 'Backend Systems & Architecture',
          color: '#EF4444',
          secondary: '#FCA5A5',
          radius: 7.8
        },
        orbitRadius: 240,
        speed: 0.0028,
        skills: [
          { name: 'Spring Boot', type: 'springboot', color: '#6DB33F', secondary: '#86EFAC' },
          { name: 'Microservices', type: 'microservices', color: '#3B82F6', secondary: '#93C5FD' },
          { name: 'API Development', type: 'gear', color: '#EC4899', secondary: '#F472B6' },
          { name: 'JWT Auth', type: 'jwt', color: '#F59E0B', secondary: '#FDE047' },
          { name: 'System Design', type: 'system_design', color: '#A855F7', secondary: '#C084FC' }
        ]
      },
      {
        orbit: 5,
        planet: {
          name: 'Jupiter',
          symbol: '♃',
          category: 'AI & Machine Learning',
          color: '#D97706',
          secondary: '#FCD34D',
          radius: 16.5,
          hasBands: true
        },
        orbitRadius: 305,
        speed: 0.002,
        skills: [
          { name: 'Machine Learning', type: 'ml', color: '#8B5CF6', secondary: '#C084FC' },
          { name: 'Generative AI', type: 'genai', color: '#EC4899', secondary: '#F472B6' },
          { name: 'LLMs', type: 'llm', color: '#00E5FF', secondary: '#67E8F9' },
          { name: 'NLP', type: 'nlp', color: '#10B981', secondary: '#34D399' },
          { name: 'Deep Learning', type: 'deep_learning', color: '#F43F5E', secondary: '#FB7185' }
        ]
      },
      {
        orbit: 6,
        planet: {
          name: 'Saturn',
          symbol: '♄',
          category: 'RAG & AI Systems',
          color: '#EAB308',
          secondary: '#FEF08A',
          radius: 13.5,
          hasRing: true
        },
        orbitRadius: 375,
        speed: 0.0014,
        skills: [
          { name: 'RAG', type: 'rag', color: '#00E5FF', secondary: '#38BDF8' },
          { name: 'Adaptive RAG', type: 'adaptive_rag', color: '#6366F1', secondary: '#818CF8' },
          { name: 'Vector Search', type: 'vector', color: '#EC4899', secondary: '#F472B6' },
          { name: 'Embeddings', type: 'embeddings', color: '#14B8A6', secondary: '#2DD4BF' },
          { name: 'AI Agents', type: 'agent', color: '#F59E0B', secondary: '#FBBF24' },
          { name: 'LangChain', type: 'langchain', color: '#10B981', secondary: '#34D399' }
        ]
      },
      {
        orbit: 7,
        planet: {
          name: 'Uranus',
          symbol: '♅',
          category: 'Cloud & DevOps Infrastructure',
          color: '#06B6D4',
          secondary: '#67E8F9',
          radius: 11.5,
          hasRing: true,
          ringVertical: true
        },
        orbitRadius: 445,
        speed: 0.001,
        skills: [
          { name: 'AWS', type: 'aws', color: '#F59E0B', secondary: '#F97316' },
          { name: 'Google Cloud', type: 'gcp', color: '#3B82F6', secondary: '#60A5FA' },
          { name: 'Docker', type: 'docker', color: '#0284C7', secondary: '#38BDF8' },
          { name: 'Linux', type: 'linux', color: '#E2E8F0', secondary: '#94A3B8' },
          { name: 'Git', type: 'git', color: '#F97316', secondary: '#FB923C' },
          { name: 'GitHub', type: 'github', color: '#FFFFFF', secondary: '#CBD5E1' },
          { name: 'CI/CD', type: 'cicd', color: '#10B981', secondary: '#34D399' }
        ]
      },
      {
        orbit: 8,
        planet: {
          name: 'Neptune',
          symbol: '♆',
          category: 'Databases & Data Systems',
          color: '#3B82F6',
          secondary: '#93C5FD',
          radius: 11
        },
        orbitRadius: 520,
        speed: 0.0007,
        skills: [
          { name: 'PostgreSQL', type: 'postgres', color: '#3B82F6', secondary: '#60A5FA' },
          { name: 'MongoDB', type: 'mongodb', color: '#22C55E', secondary: '#4ADE80' },
          { name: 'MySQL', type: 'mysql', color: '#0284C7', secondary: '#F59E0B' },
          { name: 'SQL', type: 'sql', color: '#06B6D4', secondary: '#22D3EE' },
          { name: 'FAISS', type: 'faiss', color: '#8B5CF6', secondary: '#A78BFA' },
          { name: 'Data Processing', type: 'data', color: '#F59E0B', secondary: '#FCD34D' },
          { name: 'Database Design', type: 'schema', color: '#EC4899', secondary: '#F472B6' }
        ]
      }
    ];

    let width = 1000;
    let height = 650;
    let baseScale = 1;
    let userZoom = 1.0;
    let scaleFactor = 1;

    // View angles: 3D perspective looking down onto the celestial ecliptic plane
    let rotX = 0.52; // Elevation (~30 deg)
    let rotY = 0.0;  // Azimuth
    let velX = 0.0003;
    let velY = 0.0015;
    let isDragging = false;
    let startX = 0, startY = 0;
    let hoveredObject = null;
    let mousePos = { x: -999, y: -999 };
    let sunPulse = 0;

    let celestialBodies = [];
    let asteroids = [];
    let sparks = [];

    // Helper: 3D projection onto 2D canvas
    function project3D(x3d, y3d, z3d) {
      // 1. Rotate around Y axis (rotY)
      const rx = x3d * Math.cos(rotY) + z3d * Math.sin(rotY);
      const rz = z3d * Math.cos(rotY) - x3d * Math.sin(rotY);

      // 2. Rotate around X axis (rotX)
      const ry = y3d * Math.cos(rotX) - rz * Math.sin(rotX);
      const fz = rz * Math.cos(rotX) + y3d * Math.sin(rotX);

      const fov = 750;
      const scale = fov / (fov + fz);
      const projX = width / 2 + rx * scale;
      const projY = height / 2 + ry * scale;

      return { x: rx, y: ry, z: fz, projX, projY, scale };
    }

    function resize() {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width || 1000;
      height = rect.height || 650;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Fit outermost orbit (~520px) comfortably inside bounds
      baseScale = Math.min(width / 1160, height / 680, 1.05);
      baseScale = Math.max(0.55, baseScale);
      scaleFactor = baseScale * userZoom;
    }

    // Spark particle burst for asteroid collisions/near-misses
    class Spark {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color || '#00E5FF';
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0;
        this.decay = 0.035 + Math.random() * 0.03;
        this.size = 1.5 + Math.random() * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    function createSparkBurst(px, py, color, count = 12) {
      for (let i = 0; i < count; i++) {
        const sparkColor = Math.random() > 0.4 ? color : (Math.random() > 0.5 ? '#FFFFFF' : '#FCD34D');
        sparks.push(new Spark(px, py, sparkColor));
      }
    }

    /**
     * PLANET CELESTIAL BODY
     */
    class PlanetBody {
      constructor(orbitData, angleOffset) {
        this.orbitData = orbitData;
        this.data = orbitData.planet;
        this.orbitRadius = orbitData.orbitRadius;
        this.speed = orbitData.speed;
        this.angle = angleOffset;
        this.moonAngle = 0;
        this.projX = 0;
        this.projY = 0;
        this.z = 0;
        this.scale = 1;
        this.isPlanet = true;
      }

      update() {
        if (!hoveredObject) {
          this.angle += this.speed;
          if (this.data.hasMoon) {
            this.moonAngle += 0.045; // Moon orbiting Earth
          }
        }

        const r = this.orbitRadius * scaleFactor;
        const x3d = r * Math.cos(this.angle);
        const y3d = 0;
        const z3d = r * Math.sin(this.angle);

        const proj = project3D(x3d, y3d, z3d);
        this.x = proj.x;
        this.y = proj.y;
        this.z = proj.z;
        this.projX = proj.projX;
        this.projY = proj.projY;
        this.scale = proj.scale;
      }

      draw() {
        ctx.save();
        ctx.translate(this.projX, this.projY);
        ctx.scale(this.scale, this.scale);

        const r = this.data.radius;
        const isHovered = hoveredObject === this;

        // Hover Ambient Glow Halo
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.35)';
          ctx.fill();
        }

        // Planet Body with 3D Spherical Radial Lighting
        const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, 1, 0, 0, r);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.35, this.data.secondary);
        grad.addColorStop(0.8, this.data.color);
        grad.addColorStop(1, '#05080A');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // Atmospheric Rim Stroke
        ctx.strokeStyle = isHovered ? '#00E5FF' : 'rgba(0, 229, 255, 0.65)';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Jupiter Bands
        if (this.data.hasBands) {
          ctx.save();
          ctx.clip();
          ctx.strokeStyle = 'rgba(120, 53, 15, 0.65)';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(-r, -r * 0.35);
          ctx.lineTo(r, -r * 0.35);
          ctx.moveTo(-r, r * 0.05);
          ctx.lineTo(r, r * 0.05);
          ctx.moveTo(-r, r * 0.4);
          ctx.lineTo(r, r * 0.4);
          ctx.stroke();
          ctx.restore();
        }

        // Saturn & Uranus Rings
        if (this.data.hasRing) {
          ctx.save();
          ctx.rotate(this.data.ringVertical ? 1.4 : 0.35);
          ctx.strokeStyle = this.orbitData.orbit === 6 ? 'rgba(234, 179, 8, 0.85)' : 'rgba(0, 229, 255, 0.75)';
          ctx.lineWidth = this.orbitData.orbit === 6 ? 3 : 1.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 2.3, r * 0.55, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Earth's Realistic Moon with Visible Circular Local Orbit
        if (this.data.hasMoon) {
          const mRadius = r * 2.3;
          // 1. Draw Visible Moon Orbit Ellipse Track around Earth
          ctx.save();
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
          ctx.lineWidth = 0.8;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.ellipse(0, 0, mRadius, mRadius * 0.55, 0.25, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // 2. Realistic Moon Position along the Orbit
          const mx = Math.cos(this.moonAngle) * mRadius;
          const my = Math.sin(this.moonAngle) * (mRadius * 0.55);

          // Lunar Surface & Craters
          const moonR = 3.2;
          const moonGrad = ctx.createRadialGradient(mx - 0.9, my - 0.9, 0.5, mx, my, moonR);
          moonGrad.addColorStop(0, '#FFFFFF');
          moonGrad.addColorStop(0.45, '#E2E8F0');
          moonGrad.addColorStop(0.85, '#94A3B8');
          moonGrad.addColorStop(1, '#334155');

          ctx.fillStyle = moonGrad;
          ctx.beginPath();
          ctx.arc(mx, my, moonR, 0, Math.PI * 2);
          ctx.fill();

          // Craters on Moon
          ctx.fillStyle = 'rgba(71, 85, 105, 0.5)';
          ctx.beginPath();
          ctx.arc(mx - 0.8, my + 0.5, 0.7, 0, Math.PI * 2);
          ctx.arc(mx + 0.9, my - 0.4, 0.6, 0, Math.PI * 2);
          ctx.fill();

          // Moon Rim
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Planet Name Label
        ctx.font = '700 10px "JetBrains Mono", monospace';
        ctx.fillStyle = isHovered ? '#00E5FF' : 'rgba(241, 245, 244, 0.95)';
        ctx.textAlign = 'center';
        ctx.fillText(`${this.data.symbol} ${this.data.name}`, 0, r + 13);

        ctx.restore();
      }

      isHit(mx, my) {
        const dx = mx - this.projX;
        const dy = my - this.projY;
        const hitR = Math.max(26, (this.data.radius + 12) * this.scale);
        return (dx * dx + dy * dy) < (hitR * hitR);
      }
    }

    /**
     * SKILL LOGO BADGE BODY (Separated on the Orbit)
     * Renders distinct brand vector logo badge along the orbit track
     */
    class SkillBadgeBody {
      constructor(orbitData, skill, angleOffset) {
        this.orbitData = orbitData;
        this.skill = skill;
        this.orbitRadius = orbitData.orbitRadius;
        this.speed = orbitData.speed;
        this.angle = angleOffset;
        this.projX = 0;
        this.projY = 0;
        this.z = 0;
        this.scale = 1;
        this.badgeRadius = 8.5;
        this.isSkill = true;
      }

      update() {
        if (!hoveredObject) {
          this.angle += this.speed;
        }

        const r = this.orbitRadius * scaleFactor;
        const x3d = r * Math.cos(this.angle);
        const y3d = 0;
        const z3d = r * Math.sin(this.angle);

        const proj = project3D(x3d, y3d, z3d);
        this.x = proj.x;
        this.y = proj.y;
        this.z = proj.z;
        this.projX = proj.projX;
        this.projY = proj.projY;
        this.scale = proj.scale;
      }

      draw() {
        ctx.save();
        ctx.translate(this.projX, this.projY);
        ctx.scale(this.scale, this.scale);

        const r = this.badgeRadius;
        const isHovered = hoveredObject === this;

        // Glowing pulse halo on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, r * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.6)';
          ctx.fill();
        }

        // Circular Glass Badge Background
        const badgeGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 1, 0, 0, r);
        badgeGrad.addColorStop(0, isHovered ? '#164E63' : '#0F172A');
        badgeGrad.addColorStop(0.7, '#070C12');
        badgeGrad.addColorStop(1, '#020508');

        ctx.fillStyle = badgeGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // Edge Border
        ctx.strokeStyle = isHovered ? '#00E5FF' : (this.skill.color ? this.skill.color : 'rgba(0, 229, 255, 0.6)');
        ctx.lineWidth = isHovered ? 2 : 1.2;
        ctx.stroke();

        // Vector Logo Rendering per Skill Type
        this.drawBrandLogo(r);

        ctx.restore();
      }

      // Draw custom vector tech logo inside badge circle
      drawBrandLogo(r) {
        const type = this.skill.type;
        const col = this.skill.color || '#00E5FF';
        const sec = this.skill.secondary || '#FFFFFF';

        ctx.save();

        if (type === 'react') {
          // React Atom loops
          ctx.strokeStyle = col;
          ctx.lineWidth = 0.9;
          for (let a = 0; a < 3; a++) {
            ctx.save();
            ctx.rotate((a * Math.PI) / 3);
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.68, r * 0.24, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          ctx.fillStyle = sec;
          ctx.beginPath();
          ctx.arc(0, 0, 1.4, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'python') {
          // Python Dual Serpents Monogram
          ctx.fillStyle = col; // Blue top serpent
          ctx.beginPath();
          ctx.arc(-1.2, -1.8, 1.8, 0, Math.PI * 2);
          ctx.rect(-1.2, -2.4, 3.2, 2.2);
          ctx.fill();
          ctx.fillStyle = sec; // Yellow bottom serpent
          ctx.beginPath();
          ctx.arc(1.2, 1.8, 1.8, 0, Math.PI * 2);
          ctx.rect(-2, 0.2, 3.2, 2.2);
          ctx.fill();
        } else if (type === 'javascript') {
          // JS Golden Square Badge
          ctx.fillStyle = '#FACC15';
          ctx.fillRect(-r * 0.55, -r * 0.55, r * 1.1, r * 1.1);
          ctx.font = '900 6.5px "JetBrains Mono", sans-serif';
          ctx.fillStyle = '#05080A';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('JS', 0, 0.5);
        } else if (type === 'java') {
          // Java Coffee Cup Steam
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 1, 3.2, 0, Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-1.2, -1);
          ctx.quadraticCurveTo(-0.6, -3, -1.2, -4.5);
          ctx.moveTo(1.2, -1);
          ctx.quadraticCurveTo(1.8, -3, 1.2, -4.5);
          ctx.stroke();
        } else if (type === 'cpp') {
          // C++ Emblem
          ctx.font = '800 6px "JetBrains Mono", monospace';
          ctx.fillStyle = col;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('C++', 0, 0.5);
        } else if (type === 'typescript') {
          // TypeScript Blue Box with TS
          ctx.fillStyle = col;
          ctx.fillRect(-r * 0.55, -r * 0.55, r * 1.1, r * 1.1);
          ctx.font = '900 6px "JetBrains Mono", sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('TS', 0, 0.5);
        } else if (type === 'tailwind') {
          // Tailwind Wave
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.arc(-1.5, -0.8, 1.8, Math.PI * 0.8, Math.PI * 1.8);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(1.5, 0.8, 1.8, Math.PI * 0.8, Math.PI * 1.8);
          ctx.stroke();
        } else if (type === 'websockets') {
          // WebSockets <-> Arrow
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-3.5, 0);
          ctx.lineTo(3.5, 0);
          ctx.moveTo(-2, -2);
          ctx.lineTo(-3.5, 0);
          ctx.lineTo(-2, 2);
          ctx.moveTo(2, -2);
          ctx.lineTo(3.5, 0);
          ctx.lineTo(2, 2);
          ctx.stroke();
        } else if (type === 'graphql') {
          // GraphQL Hexagon with Central Triangle
          ctx.strokeStyle = col;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(0, -3.8);
          ctx.lineTo(3.3, -1.8);
          ctx.lineTo(3.3, 1.8);
          ctx.lineTo(0, 3.8);
          ctx.lineTo(-3.3, 1.8);
          ctx.lineTo(-3.3, -1.8);
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = sec;
          ctx.beginPath();
          ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'springboot') {
          // Spring Boot Power Loop
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.arc(0, 0, 3.2, 0.4, Math.PI * 1.8);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, -3.5);
          ctx.lineTo(0, 0.5);
          ctx.stroke();
        } else if (type === 'microservices') {
          // Microservices 3 Modular Cubes
          ctx.fillStyle = col;
          ctx.fillRect(-3.2, -3.2, 2.6, 2.6);
          ctx.fillRect(0.6, -3.2, 2.6, 2.6);
          ctx.fillRect(-1.3, 0.6, 2.6, 2.6);
        } else if (type === 'jwt') {
          // JWT Lock
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.strokeRect(-2.8, -0.5, 5.6, 4.2);
          ctx.beginPath();
          ctx.arc(0, -0.5, 2, Math.PI, 0);
          ctx.stroke();
        } else if (type === 'system_design') {
          // System Design Tier Blocks
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.strokeRect(-3.5, -3.5, 7, 2);
          ctx.strokeRect(-3.5, -0.8, 7, 2);
          ctx.strokeRect(-3.5, 1.8, 7, 2);
        } else if (type === 'deep_learning') {
          // Deep Learning Neural Layers
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(-3.2, -2, 1, 0, Math.PI * 2);
          ctx.arc(-3.2, 2, 1, 0, Math.PI * 2);
          ctx.arc(0, -3, 1, 0, Math.PI * 2);
          ctx.arc(0, 0, 1, 0, Math.PI * 2);
          ctx.arc(0, 3, 1, 0, Math.PI * 2);
          ctx.arc(3.2, 0, 1, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'faiss') {
          // FAISS Vector Space
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.strokeRect(-3.5, -3.5, 7, 7);
          ctx.fillStyle = sec;
          ctx.beginPath();
          ctx.arc(-1.5, -1.5, 1, 0, Math.PI * 2);
          ctx.arc(1.5, 1.5, 1, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'html5') {
          // HTML5 Orange Shield
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(-3.5, -4);
          ctx.lineTo(3.5, -4);
          ctx.lineTo(2.5, 3.5);
          ctx.lineTo(0, 4.5);
          ctx.lineTo(-2.5, 3.5);
          ctx.closePath();
          ctx.fill();
          ctx.font = '800 5px sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('5', 0, 0);
        } else if (type === 'css3') {
          // CSS3 Blue Shield
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(-3.5, -4);
          ctx.lineTo(3.5, -4);
          ctx.lineTo(2.5, 3.5);
          ctx.lineTo(0, 4.5);
          ctx.lineTo(-2.5, 3.5);
          ctx.closePath();
          ctx.fill();
          ctx.font = '800 5px sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('3', 0, 0);
        } else if (type === 'nodejs') {
          // Node Hexagon
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            const hx = Math.cos(a) * (r * 0.6);
            const hy = Math.sin(a) * (r * 0.6);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.font = '800 6px sans-serif';
          ctx.fillStyle = sec;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('N', 0, 0.5);
        } else if (type === 'fastapi') {
          // FastAPI Bolt
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(1, -4.5);
          ctx.lineTo(-2.5, 0.2);
          ctx.lineTo(0.2, 0.2);
          ctx.lineTo(-1, 4.5);
          ctx.lineTo(2.5, -0.2);
          ctx.lineTo(-0.2, -0.2);
          ctx.closePath();
          ctx.fill();
        } else if (type === 'api' || type === 'responsive') {
          // Interconnect Nodes or Responsive Screen
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(-2.5, 0, 1.4, 0, Math.PI * 2);
          ctx.arc(2.5, -2, 1.4, 0, Math.PI * 2);
          ctx.arc(2.5, 2, 1.4, 0, Math.PI * 2);
          ctx.moveTo(-1.2, 0);
          ctx.lineTo(1.2, -1.8);
          ctx.moveTo(-1.2, 0);
          ctx.lineTo(1.2, 1.8);
          ctx.stroke();
        } else if (type === 'gear') {
          // Gear / API Development
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.stroke();
          for (let g = 0; g < 4; g++) {
            const ga = (g * Math.PI) / 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(ga) * 2.5, Math.sin(ga) * 2.5);
            ctx.lineTo(Math.cos(ga) * 4.2, Math.sin(ga) * 4.2);
            ctx.stroke();
          }
        } else if (type === 'ml' || type === 'llm') {
          // Neural Network / AI Nodes
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(-3, -2.5, 1.3, 0, Math.PI * 2);
          ctx.arc(-3, 2.5, 1.3, 0, Math.PI * 2);
          ctx.arc(3, 0, 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = sec;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-3, -2.5);
          ctx.lineTo(3, 0);
          ctx.moveTo(-3, 2.5);
          ctx.lineTo(3, 0);
          ctx.stroke();
        } else if (type === 'genai' || type === 'adaptive_rag') {
          // 4-point Sparkle Star
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(0, -4.5);
          ctx.quadraticCurveTo(0, 0, 4.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, 4.5);
          ctx.quadraticCurveTo(0, 0, -4.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, -4.5);
          ctx.closePath();
          ctx.fill();
        } else if (type === 'rag' || type === 'vector' || type === 'embeddings') {
          // Vector Search / RAG Document Vector
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.strokeRect(-3, -3.5, 4.5, 6);
          ctx.beginPath();
          ctx.moveTo(-1, 0);
          ctx.lineTo(3.5, -2.5);
          ctx.lineTo(3.5, 0);
          ctx.stroke();
        } else if (type === 'agent') {
          // Agent Core
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.1;
          ctx.strokeRect(-3.5, -3.5, 7, 7);
          ctx.fillStyle = sec;
          ctx.beginPath();
          ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'langchain') {
          // Linked Chains
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.strokeRect(-3.5, -2, 4.5, 3.5);
          ctx.strokeRect(-0.5, -0.5, 4.5, 3.5);
        } else if (type === 'aws') {
          // AWS Smile Arrow
          ctx.font = '800 5px "JetBrains Mono", sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.fillText('AWS', 0, -0.5);
          ctx.strokeStyle = col;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(0, 0.5, 3, 0.2, Math.PI - 0.2);
          ctx.stroke();
        } else if (type === 'gcp') {
          // GCP Cloud
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(-1.5, 0.5, 1.8, Math.PI * 0.7, Math.PI * 1.8);
          ctx.arc(1.5, 0.5, 1.8, Math.PI * 1.2, Math.PI * 0.3);
          ctx.closePath();
          ctx.stroke();
        } else if (type === 'docker') {
          // Docker Container Stacks
          ctx.fillStyle = col;
          ctx.fillRect(-3, -3, 2.2, 2);
          ctx.fillRect(0, -3, 2.2, 2);
          ctx.fillRect(-3, 0, 2.2, 2);
          ctx.fillRect(0, 0, 2.2, 2);
        } else if (type === 'git') {
          // Git Branches
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-2, -3.5);
          ctx.lineTo(-2, 3.5);
          ctx.moveTo(-2, 0);
          ctx.lineTo(2, -2.5);
          ctx.stroke();
          ctx.fillStyle = sec;
          ctx.beginPath();
          ctx.arc(-2, -3.5, 1.1, 0, Math.PI * 2);
          ctx.arc(-2, 3.5, 1.1, 0, Math.PI * 2);
          ctx.arc(2, -2.5, 1.1, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'github') {
          // GitHub Silhouette with Ears
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(0, 0.8, 3.2, 0, Math.PI * 2);
          ctx.moveTo(-2.2, -1.2);
          ctx.lineTo(-1.2, -3.8);
          ctx.lineTo(-0.2, -1.8);
          ctx.moveTo(0.2, -1.8);
          ctx.lineTo(1.2, -3.8);
          ctx.lineTo(2.2, -1.2);
          ctx.fill();
        } else if (type === 'cicd') {
          // CI/CD Infinity Loop
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(-2, 0, 2, 1.5, 0, 0, Math.PI * 2);
          ctx.ellipse(2, 0, 2, 1.5, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (type === 'sql' || type === 'mysql' || type === 'postgres') {
          // Database Cylinders
          ctx.strokeStyle = col;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.ellipse(0, -2.5, 3.5, 1.2, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-3.5, -2.5);
          ctx.lineTo(-3.5, 2.5);
          ctx.ellipse(0, 2.5, 3.5, 1.2, 0, 0, Math.PI);
          ctx.lineTo(3.5, -2.5);
          ctx.stroke();
        } else if (type === 'mongodb') {
          // Mongo Leaf
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(0, -4.2);
          ctx.quadraticCurveTo(3, -1, 0, 4.2);
          ctx.quadraticCurveTo(-3, -1, 0, -4.2);
          ctx.fill();
        } else {
          // Fallback Clean Dot
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      isHit(mx, my) {
        const dx = mx - this.projX;
        const dy = my - this.projY;
        const hitR = Math.max(22, (this.badgeRadius + 12) * this.scale);
        return (dx * dx + dy * dy) < (hitR * hitR);
      }
    }

    /**
     * WANDERING ASTEROIDS WITH SPARK COLLISION DEFLECTION
     */
    class Asteroid {
      constructor(delayFrames) {
        this.delay = delayFrames;
        this.active = false;
        this.trail = [];
        this.cooldown = 0;
        this.reset();
      }

      reset() {
        const fromLeft = Math.random() > 0.5;
        this.x = fromLeft ? -width * 0.5 : width * 0.5;
        this.y = (Math.random() - 0.5) * height * 0.45;
        this.z = (Math.random() - 0.5) * 220;

        const targetX = (Math.random() - 0.5) * 140;
        const targetY = (Math.random() - 0.5) * 80;
        const targetZ = (Math.random() - 0.5) * 90;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dz = targetZ - this.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

        const speed = 0.55 + Math.random() * 0.35;
        this.vx = (dx / dist) * speed;
        this.vy = (dy / dist) * speed;
        this.vz = (dz / dist) * speed;

        this.radius = 2.8 + Math.random() * 1.8;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;
        this.trail = [];
        this.age = 0;
        this.maxAge = 800;
        this.cooldown = 0;
      }

      update() {
        if (this.delay > 0) {
          this.delay--;
          return;
        }

        this.active = true;
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.rot += this.rotSpeed;
        this.age++;
        if (this.cooldown > 0) this.cooldown--;

        // Tail buffer
        if (this.age % 2 === 0) {
          this.trail.push({ x: this.x, y: this.y, z: this.z, alpha: 1.0 });
          if (this.trail.length > 18) this.trail.shift();
        }
        this.trail.forEach((t) => (t.alpha *= 0.93));

        // Check for collision / near-miss with celestial bodies
        if (this.cooldown <= 0) {
          this.checkCollisions();
        }

        // Boundary reset
        if (this.age > this.maxAge || Math.abs(this.x) > width * 0.7 || Math.abs(this.y) > height * 0.7) {
          this.active = false;
          this.delay = Math.floor(120 + Math.random() * 240);
          this.reset();
        }
      }

      checkCollisions() {
        const fov = 750;
        const s = fov / (fov + this.z);
        const myPx = width / 2 + this.x * s;
        const myPy = height / 2 + this.y * s;

        // Check against celestial bodies
        for (let i = 0; i < celestialBodies.length; i++) {
          const body = celestialBodies[i];
          const bPx = body.projX;
          const bPy = body.projY;
          const dx = myPx - bPx;
          const dy = myPy - bPy;
          const distSq = dx * dx + dy * dy;
          const hitThreshold = body.isPlanet ? 28 : 18;

          if (distSq < hitThreshold * hitThreshold) {
            // Collision / deflection event!
            createSparkBurst((myPx + bPx) / 2, (myPy + bPy) / 2, body.data ? body.data.color : '#00E5FF', 14);
            // Deflect velocity
            this.vx = -this.vx * 0.85 + (Math.random() - 0.5) * 0.6;
            this.vy = -this.vy * 0.85 + (Math.random() - 0.5) * 0.6;
            this.cooldown = 45; // Prevent repeated triggers
            break;
          }
        }
      }

      draw() {
        if (!this.active) return;

        const fov = 750;
        const scale = fov / (fov + this.z);
        const px = width / 2 + this.x * scale;
        const py = height / 2 + this.y * scale;

        // Glowing Comet Trail
        if (this.trail.length > 1) {
          ctx.save();
          for (let i = 0; i < this.trail.length - 1; i++) {
            const t1 = this.trail[i];
            const t2 = this.trail[i + 1];
            const s1 = fov / (fov + t1.z);
            const s2 = fov / (fov + t2.z);
            const x1 = width / 2 + t1.x * s1;
            const y1 = height / 2 + t1.y * s1;
            const x2 = width / 2 + t2.x * s2;
            const y2 = height / 2 + t2.y * s2;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(0, 229, 255, ${t1.alpha * 0.45})`;
            ctx.lineWidth = (i / this.trail.length) * 2.5 * scale;
            ctx.stroke();
          }
          ctx.restore();
        }

        // Asteroid Rock Shape
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(scale, scale);
        ctx.rotate(this.rot);

        ctx.fillStyle = '#CBD5E1';
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.85)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const r = this.radius;
        ctx.moveTo(r, 0);
        ctx.lineTo(r * 0.7, r * 0.8);
        ctx.lineTo(-r * 0.6, r * 0.7);
        ctx.lineTo(-r, 0);
        ctx.lineTo(-r * 0.5, -r * 0.8);
        ctx.lineTo(r * 0.6, -r * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }
    }

    // 3D Orbital Path Point calculation
    function getOrbitPoint(orbitRadius, theta) {
      const r = orbitRadius * scaleFactor;
      const x3d = r * Math.cos(theta);
      const y3d = 0;
      const z3d = r * Math.sin(theta);
      return project3D(x3d, y3d, z3d);
    }

    // Draw the 8 Concentric Orbits (Clean, Sleek, No text labels)
    function draw8ConcentricOrbits() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      orbitsData.forEach((oData) => {
        const steps = 80;
        const pts = [];
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          pts.push(getOrbitPoint(oData.orbitRadius, theta));
        }

        // Draw segmented 3D elliptical orbit
        for (let i = 0; i < steps; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const midZ = (p1.z + p2.z) / 2;
          const isFront = midZ > 0;

          ctx.beginPath();
          ctx.moveTo(p1.projX, p1.projY);
          ctx.lineTo(p2.projX, p2.projY);

          if (isDark) {
            if (isFront) {
              // High contrast luminous cyan front arc
              ctx.strokeStyle = 'rgba(0, 229, 255, 0.75)';
              ctx.lineWidth = 1.6;
              ctx.stroke();

              ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.lineWidth = 0.8;
              ctx.stroke();
            } else {
              // Back arc subtle depth
              ctx.strokeStyle = 'rgba(0, 200, 230, 0.25)';
              ctx.lineWidth = 1.1;
              ctx.stroke();
            }
          } else {
            ctx.strokeStyle = isFront ? 'rgba(0, 130, 155, 0.75)' : 'rgba(0, 130, 155, 0.25)';
            ctx.lineWidth = isFront ? 1.6 : 1.0;
            ctx.stroke();
          }
        }
      });
    }

    // Central Radiant Sun
    function drawCentralSun() {
      ctx.save();
      ctx.translate(width / 2, height / 2);

      sunPulse += 0.032;
      const baseSunR = 26 * scaleFactor;
      const pulseR = baseSunR + Math.sin(sunPulse) * (2.8 * scaleFactor);

      // Rotating Solar Flares
      ctx.save();
      ctx.rotate(sunPulse * 0.1);
      const numFlares = 12;
      for (let i = 0; i < numFlares; i++) {
        const a = (i / numFlares) * Math.PI * 2;
        const flLen = pulseR * 1.7 + Math.sin(sunPulse * 2.5 + i) * 6;
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * pulseR * 0.7, Math.sin(a) * pulseR * 0.7);
        ctx.lineTo(Math.cos(a) * flLen, Math.sin(a) * flLen);
        ctx.stroke();
      }
      ctx.restore();

      // Ambient Corona Glow
      const coronaGrad = ctx.createRadialGradient(0, 0, baseSunR * 0.3, 0, 0, pulseR * 3.5);
      coronaGrad.addColorStop(0, 'rgba(0, 229, 255, 0.8)');
      coronaGrad.addColorStop(0.35, 'rgba(0, 229, 255, 0.35)');
      coronaGrad.addColorStop(0.7, 'rgba(0, 229, 255, 0.08)');
      coronaGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(0, 0, pulseR * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Radiant Core
      const coreGrad = ctx.createRadialGradient(-pulseR * 0.3, -pulseR * 0.3, 2, 0, 0, pulseR);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.35, '#A5F8FF');
      coreGrad.addColorStop(0.75, '#00E5FF');
      coreGrad.addColorStop(1, '#007A8A');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.font = '800 10.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#05080A';
      ctx.textAlign = 'center';
      ctx.fillText('SUN', 0, 3.5);

      ctx.restore();
    }

    // Interactive Hover HUD Tooltip (Reveals skill name on hover)
    function drawHoverHUD() {
      if (!hoveredObject) return;

      const px = hoveredObject.projX;
      const py = hoveredObject.projY;

      ctx.save();
      // Position tooltip safely above or below
      const offsetY = py > 70 ? -36 : 36;
      ctx.translate(px, py + offsetY);

      let title = '';
      let subtitle = '';

      if (hoveredObject.isSkill) {
        title = hoveredObject.skill.name;
        subtitle = `Orbit ${hoveredObject.orbitData.orbit} • ${hoveredObject.orbitData.planet.category}`;
      } else if (hoveredObject.isPlanet) {
        title = `${hoveredObject.data.symbol} ${hoveredObject.data.name}`;
        subtitle = `Orbit ${hoveredObject.orbitData.orbit} • ${hoveredObject.data.category}`;
      }

      ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
      const titleW = ctx.measureText(title).width;
      ctx.font = '600 9.5px "JetBrains Mono", monospace';
      const subW = ctx.measureText(subtitle).width;
      const boxW = Math.max(titleW, subW) + 28;
      const boxH = 40;

      // Tooltip Glassmorphic Box with Glowing Neon Cyan Border
      ctx.fillStyle = 'rgba(5, 9, 14, 0.96)';
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(0, 229, 255, 0.65)';
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      // Tooltip Pointer Arrow
      ctx.beginPath();
      if (offsetY < 0) {
        ctx.moveTo(-5, boxH / 2);
        ctx.lineTo(0, boxH / 2 + 6);
        ctx.lineTo(5, boxH / 2);
      } else {
        ctx.moveTo(-5, -boxH / 2);
        ctx.lineTo(0, -boxH / 2 - 6);
        ctx.lineTo(5, -boxH / 2);
      }
      ctx.fillStyle = '#00E5FF';
      ctx.fill();

      // Text Render
      ctx.shadowBlur = 0;
      ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(title, 0, -4);

      ctx.font = '600 9.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00E5FF';
      ctx.fillText(subtitle, 0, 11);

      ctx.restore();
    }

    // Dynamic Hover Hit-Test Function
    function checkHover() {
      if (isDragging) return;
      if (mousePos.x >= 0 && mousePos.x <= width && mousePos.y >= 0 && mousePos.y <= height) {
        let hit = null;
        for (let i = celestialBodies.length - 1; i >= 0; i--) {
          if (celestialBodies[i].isHit(mousePos.x, mousePos.y)) {
            hit = celestialBodies[i];
            break;
          }
        }
        hoveredObject = hit;
        container.style.cursor = hit ? 'pointer' : 'grab';
      } else {
        hoveredObject = null;
      }
    }

    // Initialize all celestial bodies (planet + separate skill logo badges)
    function initCelestialSystem() {
      celestialBodies = [];

      orbitsData.forEach((oData) => {
        const totalItems = 1 + oData.skills.length; // 1 planet + skills
        const angleStep = (Math.PI * 2) / totalItems;
        const baseAngle = 0.35 + oData.orbit * 0.82;

        // 1. Planet at offset 0
        celestialBodies.push(new PlanetBody(oData, baseAngle));

        // 2. Separate Skill Logo Badges distributed around the orbit
        oData.skills.forEach((skill, idx) => {
          const skillAngle = baseAngle + angleStep * (idx + 1);
          celestialBodies.push(new SkillBadgeBody(oData, skill, skillAngle));
        });
      });

      asteroids = [
        new Asteroid(40),
        new Asteroid(260),
        new Asteroid(580)
      ];
      sparks = [];
    }

    // Main Render Loop
    function render() {
      ctx.clearRect(0, 0, width, height);

      // Check hover every frame so moving celestial bodies under cursor trigger instantly
      checkHover();

      // Inertial Rotation when not dragging
      if (!isDragging) {
        rotY += velY;
        rotX += velX;
        velY *= 0.98;
        velX *= 0.98;
        if (Math.abs(velY) < 0.0014) velY = 0.0014;
        if (Math.abs(velX) < 0.0004) velX = 0.0004;
      }

      // 1. Draw 8 Concentric Orbit Paths
      draw8ConcentricOrbits();

      // 2. Collect & Update Renderables
      const renderables = [];

      // Central Sun
      renderables.push({ z: 0, draw: drawCentralSun });

      // Celestial Bodies (Planets + Separate Skills)
      celestialBodies.forEach((body) => {
        body.update();
        renderables.push({ z: body.z, draw: () => body.draw() });
      });

      // Wandering Asteroids
      asteroids.forEach((ast) => {
        ast.update();
        renderables.push({ z: ast.z, draw: () => ast.draw() });
      });

      // 3. Depth-sort back-to-front
      renderables.sort((a, b) => a.z - b.z);
      renderables.forEach((item) => item.draw());

      // 4. Update & Draw Sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        sparks[s].update();
        sparks[s].draw();
        if (sparks[s].life <= 0) sparks.splice(s, 1);
      }

      // 5. Draw Hover HUD Tooltip on top
      drawHoverHUD();

      requestAnimationFrame(render);
    }

    // Zoom Controls via Dedicated Buttons (ZERO Scroll Hijacking)
    const zoomInBtn = document.getElementById('sphere-zoom-in');
    const zoomOutBtn = document.getElementById('sphere-zoom-out');
    const zoomResetBtn = document.getElementById('sphere-zoom-reset');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userZoom = Math.min(2.2, userZoom + 0.18);
        scaleFactor = baseScale * userZoom;
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userZoom = Math.max(0.55, userZoom - 0.18);
        scaleFactor = baseScale * userZoom;
      });
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userZoom = 1.0;
        rotX = 0.52;
        rotY = 0.0;
        scaleFactor = baseScale * userZoom;
      });
    }

    // Interactive Drag / Touch Handlers
    container.addEventListener('mousedown', (e) => {
      // Don't drag if clicking zoom buttons
      if (e.target.closest('.sphere-zoom-controls')) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / (rect.width || 1);
      const scaleY = height / (rect.height || 1);
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      mousePos.x = mx;
      mousePos.y = my;

      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        velY = dx * 0.0004;
        velX = dy * 0.0004;
        rotY += velY;
        rotX = Math.max(0.12, Math.min(1.4, rotX + velX)); // Allow full up/down tilt
        startX = e.clientX;
        startY = e.clientY;
      } else {
        checkHover();
      }
    });

    container.addEventListener('mouseleave', () => {
      mousePos.x = -999;
      mousePos.y = -999;
      hoveredObject = null;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Support
    container.addEventListener('touchstart', (e) => {
      if (e.target.closest('.sphere-zoom-controls')) return;
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        velY = dx * 0.0004;
        velX = dy * 0.0004;
        rotY += velY;
        rotX = Math.max(0.12, Math.min(1.4, rotX + velX));
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('resize', resize);
    resize();
    initCelestialSystem();
    render();
  });
})();
