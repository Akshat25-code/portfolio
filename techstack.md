# Tech Stack

## Core Technologies
- **HTML5**: Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) for accessibility, search engines, and clean DOM hierarchy.
- **CSS3 (Vanilla)**:
  - Custom CSS variables (`:root` and `[data-theme="light"]` / `[data-theme="dark"]`) for complete dual-theme support.
  - CSS Grid for the Bento Box layout and Skills Grid.
  - Flexbox for fluid alignment, pill navbars, and badge clusters.
  - Glassmorphism via `backdrop-filter: blur(16px)` and translucent RGBA borders/surfaces.
  - Pure CSS keyframe animations for infinite tickers and glowing borders.
- **JavaScript (Vanilla - ES6+)**:
  - Modular JS architecture (no bundler required, or optional Vite for local dev).
  - DOM manipulation and theme switching with `localStorage` persistence.
  - `IntersectionObserver` API for viewport-triggered fade-ins and number counter animations.

## Interactive & Visual Features
- **3D & Canvas Background**:
  - Lightweight Canvas API or minimal Three.js particle field with interactive mouse parallax and smooth glowing gradients.
- **Client-Side Functional AI Chat Engine**:
  - Pure client-side fuzzy keyword/intent-matching conversational agent.
  - Pre-loaded local structured knowledge base (JSON/JS) covering bio, skills, experience, projects, tech stack, and contact details.
  - Instantaneous typing effect, quick suggestion chips, and conversational responses without any paid API keys or latency.
- **Animated Number Counters**:
  - Easing-based count-up logic powered by `requestAnimationFrame` triggered when Section 7 enters the viewport.

## Tooling & Performance
- **Local Dev**: Zero-dependency static files (or lightweight `npx serve` / Vite).
- **Assets**: SVG icons (Lucide / Simple Icons), WebP compressed images, and modern Google Fonts (`Plus Jakarta Sans` / `Outfit` / `Inter`).
- **Optimization Target**: 95+ Google Lighthouse across Performance, Accessibility, Best Practices, and SEO.
