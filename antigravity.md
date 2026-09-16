# Antigravity AI Instructions

## Context
You are modifying a high-end, responsive personal portfolio website. The project combines:
1. **abhishekworks.com inspiration**: Immersive, deep space canvas background, bold headline typography, and high-impact hero.
2. **pszostak.pl inspiration**: Floating glass pill navigation, bento box grid for the About section, interactive terminal chat, and infinite tech stack ticker.
3. **Custom Additions**: Full Light/Dark theme toggle, categorized interactive Skills Grid, and scroll-activated Animated Stats Counters.

## Core Rules for AI Assistants
1. **No External CSS Frameworks**: Absolutely no Tailwind CSS, Bootstrap, or heavy component libraries. Use Vanilla CSS with CSS custom properties (`var(--...)`).
2. **Strict Dual-Theme Compatibility**: Every new UI element or style MUST support both dark and light modes via CSS variables (e.g. `var(--bg-card)`, `var(--text-primary)`, `var(--border-color)`). Never hardcode pure `#fff` or `#000` text/backgrounds in component styles.
3. **Preserve Section Structure**:
   - Section 1: Hero (Particle Canvas + Gradient Headline + Functional AI Chat Terminal)
   - Section 2: Floating Glass Navigation (Theme Toggle + Links + Book a Call CTA)
   - Section 3: About (Responsive Bento Box Grid with hover reveal masks)
   - Section 4: Skills (Categorized Grid with proficiency bars and hover tooltips)
   - Section 5: Tech Stack Ticker (Infinite CSS marquee)
   - Section 6: Projects Gallery (Glass cards with live links and tag badges)
   - Section 7: Animated Stats / Counters (Auto-counting numbers with IntersectionObserver)
   - Section 8: Contact & Footer (Social links + email CTA + copyright)
4. **Performance & Smoothness**: Use CSS `transform` and `opacity` for animations. Keep JavaScript asynchronous and non-blocking.
