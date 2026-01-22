# OpenCode Skills Pack — Frontend Design

Этот файл содержит готовые `SKILL.md` для OpenCode.  
Разложите их по папкам:

.opencode/skills/<skill-name>/SKILL.md

Пример:
.opencode/skills/frontend-design/SKILL.md

Соглашение об именах:
- lowercase + цифры + дефисы
- имя папки = `name` во frontmatter

---

## 1) frontend-design (anti “AI slop”, смелая эстетика)

**Path:** `.opencode/skills/frontend-design/SKILL.md`

```markdown
---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use for websites, landing pages, dashboards, React components, HTML/CSS layouts, or when beautifying any web UI. Avoid generic AI aesthetics.
license: Complete terms in LICENSE.txt
metadata:
  source: agentskills.in/@anthropics/frontend-design
  upstream: anthropics
---

# Frontend Design

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- Purpose: What problem does this interface solve? Who uses it?
- Tone: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- Constraints: Technical requirements (framework, performance, accessibility).
- Differentiation: What makes this UNFORGETTABLE? What's the one thing someone will remember?

CRITICAL: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- Spatial Composition: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- Backgrounds & Visual Details: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices across generations.

IMPORTANT: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

Remember: extraordinary creative work is possible. Commit fully to a distinctive vision.
---
name: design-principles
description: Enforce a precise, minimal design system inspired by Linear, Notion, and Stripe. Use for dashboards/admin/SaaS UI requiring pixel-level craft and consistency.
license: See upstream repository license
metadata:
  source: agentskills.in/@Dammyjay93/skill (design-principles)
  upstream: Dammyjay93
---

# Design Principles

This skill enforces precise, crafted design for enterprise software, SaaS dashboards, admin interfaces, and web applications. The philosophy is Jony Ive-level precision with intentional personality — every interface is polished, and each is designed for its specific context.

## Design Direction (REQUIRED)

Before writing any code, commit to a design direction. Don't default. Think about what this specific product needs to feel like.

### Think About Context
- What does this product do? A finance tool needs different energy than a creative tool.
- Who uses it? Power users want density. Occasional users want guidance.
- What's the emotional job? Trust? Efficiency? Delight? Focus?
- What would make this memorable? Every product has a chance to feel distinctive.

### Choose a Personality
Precision & Density — Tight spacing, monochrome, information-forward.  
Warmth & Approachability — Generous spacing, soft shadows, friendly colors.  
Sophistication & Trust — Cool tones, layered depth, financial gravitas.  
Boldness & Clarity — High contrast, dramatic negative space, confident typography.  
Utility & Function — Muted palette, functional density, clear hierarchy.  
Data & Analysis — Chart-optimized, technical but accessible, numbers-first.

Pick one (or blend two) — but commit.

### Choose a Color Foundation
Warm foundations (approachable) vs cool foundations (professional) vs pure neutrals (technical) vs tinted foundations (distinctive).  
Choose light vs dark intentionally. Pick ONE meaningful accent color.

### Choose a Layout Approach
Dense grids for scan/compare, generous spacing for focus, sidebar for many destinations, topnav for fewer, split panels for list-detail.

### Choose Typography
System fonts (utility), geometric sans (modern/technical), humanist sans (warmer), monospace influence (developer/data).

---

## Core Craft Principles

### The 4px Grid
All spacing uses a 4px base grid: 4, 8, 12, 16, 24, 32...

### Symmetrical Padding
Prefer symmetric padding; exceptions only for optical balance.

### Border Radius Consistency
Pick a radius system and stick to it (don’t mix).

### Depth & Elevation Strategy
Choose ONE: borders-only / subtle single shadows / layered shadows / surface color shifts. Don’t mix.

### Card Layouts Vary, Surface Treatment Stays Consistent
Different internal layouts are good; container “chrome” must be consistent.

### Isolated Controls
Avoid native `<select>` / `<input type="date">` when you need custom styling; build composed controls (trigger + menu/popover) with good layout constraints.

### Typography Hierarchy
Headlines 600, body 400-500, labels 500, scale: 11/12/13/14/16/18/24/32.

### Monospace for Data
Use tabular-nums + monospace for IDs, numbers, timestamps.

### Iconography
Icons clarify, not decorate. (If removing loses no meaning—remove.)

### Animation
150ms micro, 200–250ms larger; easing: cubic-bezier(0.25, 1, 0.5, 1). No bouncy springs.

### Contrast Hierarchy
Foreground → secondary → muted → faint. Reserve color for meaning.

---

## Dark Mode Considerations
Borders over shadows; adjust semantic colors; keep hierarchy, change values.

## Anti-Patterns
No dramatic shadows, no huge radius on small elements, no asymmetric padding “просто так”, no gradients ради декора, не плодить accent colors.

## The Standard
Everything should look like it’s made by a team that obsesses over 1px differences — crafted, context-driven, coherent.
---
name: frontend-accessibility-standards
description: Build accessible UIs with semantic HTML, correct ARIA, keyboard navigation, focus management, labels, and WCAG-aligned contrast.
license: See upstream repository license
metadata:
  source: agentskills.in/@maxritter/frontend-accessibility-standards
  upstream: maxritter
---

# Frontend Accessibility Standards

Core Rule: Build accessible interfaces that work for all users, including those using assistive technologies.

Use this skill:
- when creating/modifying components (React/Vue/Svelte/Web Components)
- when implementing forms + labels
- when building interactive elements + keyboard navigation
- when building dialogs/modals + focus management
- when ensuring contrast meets WCAG (4.5:1 for normal text)
- when adding ARIA to complex widgets
- when enforcing correct heading hierarchy

## Semantic HTML First

Prefer native elements:
- `<button>` for actions
- `<a>` for navigation
- landmarks: `<nav> <main> <header> <footer> <aside>`
- structure: `<article> <section>`

Avoid div/span clickables without roles/keyboard support.

Example:
```html
<nav><a href="/about">About</a></nav>
<button type="button">Submit</button>
<main><article>...</article></main>

<form>
  <label for="email">Email</label>
  <input id="email" type="email" />
</form>

---

## 4) frontend-responsive-design-standards (mobile-first, breakpoints, touch targets)

**Path:** `.opencode/skills/frontend-responsive-design-standards/SKILL.md`

```markdown
---
name: frontend-responsive-design-standards
description: Build responsive, mobile-first layouts using fluid containers, flexible units, media queries, and touch-friendly design across screen sizes.
license: See upstream repository license
metadata:
  source: agentskills.in/@maxritter/frontend-responsive-design-standards
  upstream: maxritter
---

# Frontend Responsive Design Standards

Rule: Mobile-first development with consistent breakpoints, fluid layouts, relative units, and touch-friendly targets.

Use this skill:
- responsive layouts (mobile/tablet/desktop)
- media queries + breakpoint styling
- flexible units (rem/em/%), not only px
- fluid flex/grid layouts
- touch targets minimum ~44x44px
- responsive images/assets
- typography scaling across devices
- testing across breakpoints

Core expectations:
- start from mobile constraints, then enhance
- avoid fixed widths; use max-width + fluid container patterns
- ensure nav patterns work on touch and keyboard
---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance (accessibility, performance, UX). Use when asked to review UI/UX or audit best practices.
license: See upstream repository license
metadata:
  source: agentskills.in/@ncdai/web-design-guidelines
  upstream: ncdai (author: vercel)
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works
1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or ask user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in terse `file:line` format

## Guidelines Source
Fetch fresh guidelines before each review:

https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage
If user provides a file/pattern:
1. Fetch guidelines
2. Read files
3. Apply rules
4. Output findings using the required format

If no files specified, ask which files to review.
---
name: wcag-audit-patterns
description: Conduct WCAG 2.2 accessibility audits with automated testing, manual verification, and remediation guidance.
license: See upstream repository license
metadata:
  source: agentskills.in/@wshobson/wcag-audit-patterns
  upstream: wshobson
---

# WCAG Audit Patterns

Comprehensive guide to auditing web content against WCAG 2.2 guidelines with actionable remediation strategies.

## When to Use This Skill
- Conducting accessibility audits
- Fixing WCAG violations
- Implementing accessible components
- Meeting ADA/Section 508 requirements
- Achieving VPAT compliance

## Core Concepts

### WCAG Conformance Levels
A (minimum), AA (standard), AAA (enhanced)

### POUR Principles
Perceivable / Operable / Understandable / Robust

### Common Violations by Impact
Critical: missing alt (functional), no keyboard access, missing labels, autoplay media  
Serious: low contrast, missing skip links, inaccessible widgets, missing titles  
Moderate: missing lang attr, unclear link text, missing landmarks, bad headings

## Audit Checklist
(Продолжайте по принципам WCAG — Perceivable/Operable/Understandable/Robust — и выдавайте конкретные фиксы.)

---

### Что именно я “нашёл” и откуда это взято (источники)
- Пути и правила discovery/формата `SKILL.md` в OpenCode: :contentReference[oaicite:1]{index=1}  
- Контент навыка **frontend-design** (Anthropic) — страница marketplace-агрегатора: :contentReference[oaicite:2]{index=2}  
- **design-principles** (Dammyjay93) — marketplace-страница с инструкциями: :contentReference[oaicite:3]{index=3}  
- **frontend-accessibility-standards**: :contentReference[oaicite:4]{index=4}  
- **frontend-responsive-design-standards**: :contentReference[oaicite:5]{index=5}  
- **web-design-guidelines**: :contentReference[oaicite:6]{index=6}  
- **wcag-audit-patterns**: :contentReference[oaicite:7]{index=7}  

