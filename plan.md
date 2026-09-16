# Implementation Plan: Hybrid Premium Portfolio

## Phase 1: Directory Scaffolding & Design System
1. **Directory Structure**:
   ```
   portfolio website/
   ├── index.html
   ├── styles/
   │   ├── main.css          (Reset, CSS variables, typography, layout)
   │   ├── components.css    (Navbar, cards, buttons, chat UI, ticker)
   │   └── animations.css    (Keyframes, glowing borders, hover transitions)
   ├── js/
   │   ├── app.js            (Main initialization, smooth scroll, mobile menu)
   │   ├── theme.js          (Dark/Light mode toggle, localStorage persistence)
   │   ├── canvas.js         (Interactive particle field & glowing nebula)
   │   ├── chat.js           (Offline functional AI chat engine with KB)
   │   └── counters.js       (IntersectionObserver count-up animation)
   ├── assets/
   │   ├── icons/            (Clean SVGs for technologies and UI)
   │   └── images/           (Project thumbnails, avatar/placeholders)
   └── docs/ (or root markdown docs)
   ```
2. **Theme Tokens & Design System**:
   - Create CSS custom properties for dark mode (obsidian/deep purple/neon cyan) and light mode (frosted glass/slate/vibrant indigo).
   - Configure typography imports (`Plus Jakarta Sans` / `Outfit`).

## Phase 2: Floating Navigation & Global Theme Switcher
1. **Pill-shaped Sticky Navbar**:
   - Left: Light/Dark mode toggle button with smooth icon morph / rotation.
   - Center: Nav links (Home, About, Skills, Projects, Contact) with active pill indicators.
   - Right: "Book a Call" glass CTA button.
   - Mobile: Responsive backdrop-blur collapsible menu with animated hamburger icon.
2. **Theme Logic (`theme.js`)**:
   - Respect system preference (`prefers-color-scheme`), persist user choice in `localStorage`.

## Phase 3: Immersive Hero & Functional AI Chat Terminal
1. **Hero Visuals (`canvas.js`)**:
   - Fullscreen HTML5 canvas with mouse-reactive star/particle network and glowing radial gradients.
   - Catchy, high-contrast headline with dynamic gradient text.
2. **Functional AI Chat Terminal (`chat.js`)**:
   - Chat window container with header, message log, and input field.
   - Quick-action prompt chips ("Who are you?", "Skills?", "Show Projects", "How to contact?").
   - Instant reply generator with natural typing effect and pre-loaded knowledge base.

## Phase 4: About Section (Bento Box Grid)
1. **Responsive Bento Grid Layout**:
   - Bento Card 1: Identity / Bio with stylized initials or avatar.
   - Bento Card 2: Current Focus / Engineering Philosophy with gradient accent.
   - Bento Card 3: Experience & Education highlights with hover-reveal details.
   - Bento Card 4: Quick tech badge showcase with hover glow borders.

## Phase 5: Categorized Skills Grid & Tech Stack Ticker
1. **Categorized Skills Section**:
   - 4 Category Cards: Frontend, Backend, Tools & DevOps, Core Competencies.
   - Interactive skill badges with proficiency indicators and hover tooltips.
2. **Infinite Tech Stack Ticker**:
   - Seamless, infinite horizontal CSS marquee featuring tech logos.
   - Pause on hover interaction.

## Phase 6: Projects Gallery
1. **Glassmorphic Project Cards**:
   - Responsive grid of project showcases.
   - Project preview image with zoom-on-hover effect.
   - Tags for tech stack used.
   - Live Demo & GitHub repository links with custom hover states.

## Phase 7: Animated Stats & Counters
1. **Metrics Row (`counters.js`)**:
   - 4 Key Metrics (e.g. Years Experience, Projects Completed, Technologies Mastered, Happy Clients/Collaborations).
   - `IntersectionObserver` triggers smooth count-up animation when scrolled into view.

## Phase 8: Contact Section & Footer
1. **Contact Card**:
   - Direct email CTA button with copy-to-clipboard or mailto action.
   - Social links (GitHub, LinkedIn, Twitter/X, Discord).
   - "Available for freelance / full-time" status indicator dot.
2. **Footer**:
   - Copyright notice, back-to-top button, and subtle signature.

## Phase 9: Verification, Polish & Performance Audit
1. **Cross-Device Responsiveness**: Test from mobile (360px) to desktop (1920px+).
2. **Lighthouse Audit**: Verify 95+ score across Performance, Accessibility, Best Practices, and SEO.
3. **Smoothness Validation**: Ensure 60fps animations with zero layout thrashing.
