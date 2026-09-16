# Project Rules & Guidelines

## 1. Design Principles
1. **Premium Aesthetics First**:
   - **Dark Theme (Default)**: Deep obsidian/charcoal background (`#07070d` to `#0f0f1b`), rich violet/cyan neon glow accents, translucent dark glass cards.
   - **Light Theme**: Crisp off-white surfaces (`#f8fafc`), soft shadows, frosted glass with subtle borders, vibrant indigo/violet accents.
2. **Glassmorphism**:
   - Consistent use of `backdrop-filter: blur(12px - 20px)`.
   - Subtle 1px translucent borders (`border: 1px solid var(--border-color)`).
   - Multi-layered soft box shadows with ambient colored glows on hover.
3. **Typography & Hierarchy**:
   - Modern geometric sans-serif fonts (`Plus Jakarta Sans` or `Inter`).
   - High contrast headers with subtle gradient text highlights.
   - Secondary and muted text kept readable (`--text-secondary` with minimum 4.5:1 contrast).
4. **Micro-Interactions**:
   - Every interactive element (buttons, links, bento cards, skill badges) must have fluid hover states (`transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`).
   - Tactile feedback: slight scale (`1.02`), lifted elevation, border illumination.

## 2. Technical Standards
1. **Framework Ban**:
   - Strictly Vanilla HTML5, CSS3, and JavaScript.
   - No Tailwind CSS, Bootstrap, React, or Vue unless explicitly requested.
2. **CSS Organization**:
   - All theme tokens defined in `:root` and overridden in `[data-theme="light"]`.
   - Maintain clean modular stylesheets (`main.css`, `components.css`, `animations.css`).
   - Pure CSS for ticker animations and hover transitions.
3. **JavaScript Architecture**:
   - Modular, readable ES6+ functions.
   - Use `IntersectionObserver` for scroll-triggered animations and counter activation.
   - Lightweight event listeners with proper throttling/debouncing for mouse parallax.
4. **AI Chat Engine Requirements**:
   - Pre-loaded offline knowledge base in structured format.
   - Fast keyword/intent parsing with fallback graceful responses.
   - Support for interactive quick-reply question chips.

## 3. Accessibility & Performance
- Full keyboard navigability (focus rings, accessible ARIA attributes).
- Lightweight assets with zero external render-blocking scripts.
- Responsive across all screen sizes (320px mobile up to 2560px ultra-wide).
