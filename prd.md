# Product Requirements Document (PRD)
## Project Name: Hybrid Premium Portfolio

### 1. Overview
The goal is to build a premium, highly interactive personal portfolio website that combines the best elements of two references:
- **abhishekworks.com**: Immersive 3D background, bold typography, and a focused hero section.
- **pszostak.pl**: Sleek glassmorphic navigation, "bento-box" grid layout for content, interactive AI chat element, and scrolling tech stack tickers.

### 2. Target Audience
Recruiters, potential clients, and fellow developers. The site must communicate high technical competence and an exceptional eye for design.

### 3. Sections & Features

#### Section 1: Hero
- Full-screen dark radial gradient background with lightweight canvas particle animation.
- Bold, centered headline with gradient text effect.
- **Functional AI Chat Terminal**: A visually appealing "Ask me anything..." input box. Powered by a pre-loaded knowledge base (no external API). Responds to questions about skills, experience, projects, and contact info.
- "Scroll to explore" indicator at the bottom.

#### Section 2: Floating Glass Navigation
- Sticky, pill-shaped navbar with `backdrop-filter: blur()`.
- Links: Home, About, Projects, Skills, Contact.
- **"Book a Call" CTA** button on the right.
- **Light/Dark Mode Toggle** button on the left (moon/sun icon).
- Responsive: collapses to a hamburger menu on mobile.

#### Section 3: About (Bento Box Grid)
- A responsive CSS Grid of glassmorphic cards.
- Cards for: Name/Title, Portrait Photo (optional), Education, Current Role/Company, and a brief Bio.
- Hover effects: glowing borders, text reveal masks, and subtle scale transforms.

#### Section 4: Skills
- Categorized skill display: Frontend, Backend, Tools & DevOps, Other.
- Each skill shown as an interactive card/badge with icon, name, and proficiency indicator (e.g., glowing progress bar or dot-based level).
- Hover effect: card lifts up, glowing border appears, and a tooltip or expanded detail is revealed.
- Responsive grid layout that adapts from 4 columns (desktop) to 2 columns (tablet) to 1 column (mobile).

#### Section 5: Tech Stack Ticker
- An infinite-scrolling CSS marquee displaying technology icons and names.
- Technologies: React, Node.js, Python, TypeScript, Next.js, Docker, Git, etc.
- Pauses on hover.

#### Section 6: Projects Gallery
- Clean, glassmorphic project cards displayed in a responsive grid.
- Each card shows: Project thumbnail, Title, Brief description, Tech tags, and links (Live Demo / GitHub).
- Hover effect: image scales slightly, border glows.

#### Section 7: Animated Stats / Counters
- A horizontal row of large, animated numbers that count up when scrolled into view.
- Stats like: "X+ Years Experience", "X+ Projects Completed", "X+ Happy Clients", "X+ Technologies".
- Subtle glow effect behind each number. Smooth `requestAnimationFrame`-based counting animation.

#### Section 8: Contact / Footer
- Social media links (GitHub, LinkedIn, Twitter/X, Email).
- A clean "Let's Work Together" CTA or email link.
- Copyright notice.

### 4. Non-Functional Requirements
- **Performance**: Must score 90+ on Lighthouse. Vanilla HTML/CSS/JS only.
- **Responsiveness**: Mobile-first. The bento grid and skills grid must collapse gracefully.
- **Aesthetics**: Deep charcoal/violet backgrounds (dark mode) AND a clean light mode. Glassmorphism, neon accents, smooth transitions everywhere.
- **SEO**: Proper meta tags, Open Graph, semantic HTML.
- **Accessibility**: Proper ARIA labels, keyboard navigation, sufficient color contrast.
