# Design System & Creative Direction
*Engineered by UI Designer & Whimsy Injector Agents (from Agency Agents)*

---

## 1. Aesthetic Vision: "Cosmic Glass & Precision Tech"
A synthesis of **Abhishek's** cinematic, glowing space aesthetics and **Paweł's** ultra-clean, information-dense bento grid architecture. The interface feels alive, tactile, and responsive to every cursor movement, while maintaining pristine legibility and 60fps performance.

---

## 2. Color System & Design Tokens

### Dark Mode (Default Theme)
Designed for deep visual depth, reminiscent of a sleek IDE mixed with high-end sci-fi interfaces:
- **Background Deep**: `#07070e` (Obsidian space)
- **Background Card / Surface**: `rgba(18, 18, 30, 0.65)` (Frosted obsidian glass)
- **Background Hover**: `rgba(28, 28, 48, 0.85)`
- **Border Subtle**: `rgba(255, 255, 255, 0.08)` (Ultra-thin 1px border)
- **Border Glow / Active**: `rgba(168, 85, 247, 0.45)` (Electric violet)
- **Primary Accent**: `#a855f7` (Neon Purple / Violet)
- **Secondary Accent**: `#06b6d4` (Electric Cyan)
- **Accent Gradient**: `linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)`
- **Text Primary**: `#f8fafc` (Slate 50 - high contrast)
- **Text Secondary / Muted**: `#94a3b8` (Slate 400 - clean readability)
- **Text Subtle**: `#64748b` (Slate 500)
- **Ambient Glow 1**: `radial-gradient(ellipse at 50% 15%, rgba(120, 40, 200, 0.22) 0%, transparent 70%)`
- **Ambient Glow 2**: `radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)`

### Light Mode
Crisp, architectural, editorial frosted glass:
- **Background Deep**: `#f8fafc` (Ultra-clean slate white)
- **Background Card / Surface**: `rgba(255, 255, 255, 0.75)` (Frosted snow glass)
- **Background Hover**: `rgba(255, 255, 255, 0.95)`
- **Border Subtle**: `rgba(15, 23, 42, 0.08)`
- **Border Glow / Active**: `rgba(124, 58, 237, 0.4)` (Royal violet)
- **Primary Accent**: `#7c3aed` (Deep violet)
- **Secondary Accent**: `#0891b2` (Vibrant cyan)
- **Accent Gradient**: `linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #0891b2 100%)`
- **Text Primary**: `#0f172a` (Slate 900)
- **Text Secondary / Muted**: `#475569` (Slate 600)
- **Text Subtle**: `#64748b` (Slate 500)
- **Box Shadow**: `0 20px 40px -15px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)`

---

## 3. Typography Scale & Hierarchy

- **Primary Font**: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
  - High-end geometric sans with open apertures, built for tech interfaces.
- **Display / Monospace Accent**: `'JetBrains Mono', monospace`
  - For badges, system logs, code snippets, timestamps, and AI terminal prompts.

### Scale:
- **Hero Title**: `clamp(2.5rem, 6vw, 4.25rem)` | Weight: `800` | Line-height: `1.1` | Tracking: `-0.03em`
- **H2 Section Headers**: `clamp(1.75rem, 3.5vw, 2.5rem)` | Weight: `700` | Tracking: `-0.02em`
- **H3 Card Titles**: `1.25rem` (20px) | Weight: `600`
- **Body Regular**: `1rem` (16px) | Weight: `400` | Line-height: `1.65`
- **Body Small / Captions**: `0.875rem` (14px) | Weight: `500`
- **Overline / Micro Badges**: `0.6875rem` (11px) | Weight: `700` | Uppercase | Tracking: `0.15em`

---

## 4. Glassmorphism & Elevation Engine

- **Glass Surface Base**:
  ```css
  background: var(--bg-card);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px -10px var(--shadow-ambient);
  ```
- **Interactive Cursor Spotlight Glow (Bento Cards)**:
  - Each card tracks the mouse coordinates `(--mouse-x, --mouse-y)` in JS.
  - A subtle radial gradient follows the pointer over the card:
    `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.12), transparent 40%)`

---

## 5. Animation & Motion Choreography

### Physics Curves (Cubic-Beziers)
- **Snappy Tactile (Buttons, badges)**: `cubic-bezier(0.16, 1, 0.3, 1)` (Swift acceleration, soft landing)
- **Smooth Atmospheric (Scroll reveals, modals)**: `cubic-bezier(0.23, 1, 0.32, 1)`
- **Duration Scale**:
  - Micro-taps / Hovers: `200ms - 280ms`
  - Transitions / State changes: `350ms - 450ms`
  - Entrance animations: `600ms - 800ms`

### Scrolling Animations & Micro-Interactions
1. **Interactive Hero Canvas**:
   - 120+ smooth floating constellation particles connected by proximity lines.
   - Mouse repulsion physics: moving the cursor gently disperses nearby particles.
2. **Scroll-Triggered Stagger Reveals**:
   - `IntersectionObserver` adds `.in-view` classes to sections and cards.
   - Staggered child reveals (`animation-delay: 0.1s * n`) with `translateY(24px)` to `translateY(0)` + opacity fade.
3. **Interactive Terminal AI Chat (Whimsy & Delight)**:
   - Floating glass terminal with terminal controls (red/yellow/green dots).
   - Quick-action suggestion pills that auto-fill questions.
   - Real-time simulated typing effect with blinking cursor.
   - Easter eggs: typing "hire me", "matrix", or "whoami" triggers playful custom animations and confetti!
4. **Infinite Marquee Tech Ticker**:
   - Smooth continuous horizontal drift (`linear infinite 25s`).
   - Dual-sided gradient fade mask (`mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)`).
   - Pauses on mouse enter.
5. **Stats Count-Up Animation**:
   - Smooth numerical interpolation with easing (`1 - Math.pow(1 - progress, 3)`), counting from 0 to target value when scrolled into view.
6. **Bento Card Text-Mask Hover Reveal**:
   - Like Paweł's site: cards show concise headlines initially, and on hover, a smooth gradient mask slides down revealing in-depth narrative text.

---

## 6. Accessibility & Performance Guarantees
- **Prefers-Reduced-Motion**: All animations gracefully collapse into instant transitions for users with motion sensitivity.
- **Contrast**: WCAG AAA for all essential text; WCAG AA for secondary labels.
- **Zero Heavy Bundles**: No React, no Tailwind, no bulky libraries. Pure native CSS & modular ES6 JavaScript.
