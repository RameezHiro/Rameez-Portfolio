# RAMEEZ: THE DEVELOPER'S ARC — DESIGN SYSTEM

> An interactive manga about becoming a software engineer.

## 1. Identity

**Title:** RAMEEZ: THE DEVELOPER'S ARC  
**Tagline:** An interactive manga about becoming a software engineer.

Manga is the delivery mechanism, not the product. The portfolio must prioritize:

1. Engineering ability
2. Projects and proof
3. Growth and ambition
4. Personality
5. Manga aesthetic

**Character:** quiet strategist  
**Goal:** become a strong software engineer with deep AI knowledge  
**Focus:** Backend, AI/ML, Personality, Hackathons, Problem Solving, Full-stack Development

The desired visitor impression is: **ambitious, actual manga, going places.**

---

## 2. Visual Direction

### Art style
- Manga + Modern Manhwa + slice-of-life/soft anime hybrid
- Clean, sharp manga ink linework
- Detailed modern manhwa facial/compositional treatment
- Cinematic grayscale
- Controlled halftone/screentone
- Strong blacks and deliberate negative space
- Sakura pink only for meaningful moments
- No childish/chibi treatment
- No excessive anime exaggeration
- No fantasy “AI god” aesthetic

### Color tokens

```text
Paper       #F7F4EF
Primary Ink #111111
Manga Gray  #5C5C5C
Sakura      #D96C8A
Deep Ink    #18151A
```

Default experience is approximately 95% monochrome. Sakura becomes gradually more present through the story. Real project screenshots retain their authentic colors.

### Typography
Use a hybrid system:
- Manga/manhwa display typography for chapter titles and cinematic statements
- Clean modern sans-serif for body and professional information
- Monospace for code, terminals, technical metadata, HUD and system UI

Typography should feel like **manga storytelling + modern developer interface**.

---

## 3. Layout and Panels

Use balanced density:
- ~70% cinematic storytelling / breathing room
- ~30% technical UI

Whitespace is intentional.

Use normal browser vertical scrolling. Never hijack scroll. Visuals may react through sticky sections, Intersection Observer, Framer Motion, CSS transforms, SVG animation and scroll progress.

### Panel system
**Story panels:** traditional manga borders  
**Cinematic panels:** borderless/full-bleed scenes  
**Technical panels:** structured developer-interface cards  
**Project evidence:** authentic screenshots framed inside manga compositions

Never turn real project evidence into fake UI.

---

## 4. Protagonist

The protagonist represents the real Rameez.

Evolution:

```text
Student → Learner → Builder → Engineer → Current Rameez
```

Show growth through environment, equipment, posture and technical context.

Equipment progression:

```text
Laptop
→ Code + notebooks
→ Development tools
→ Architecture
→ AI/ML + backend infrastructure
→ Real-world systems
```

Do not portray the protagonist as supernatural or omniscient. The final character is experienced, composed, professional and still learning.

### Real photography
- Mountain/environment photograph: cinematic environmental asset
- Clear portrait: real identity/profile asset and character reference
- Opening may briefly transform real portrait → ink → manga/manhwa protagonist
- Chapter 01 may use the real portrait once in a clean profile card
- After Chapter 01, the protagonist carries the narrative
- Do not repeatedly display the real photo

---

## 5. Sakura System

Sakura represents growth.

Early chapters: small branch and few blossoms.  
Middle chapters: more branches and petals.  
Later chapters: Sakura increasingly enters environments and transitions.  
Final: mature Sakura tree in an open space.

Petals may be used for transitions and motion, but Sakura must remain meaningful rather than decorative clutter.

---

## 6. Animation

Use three levels.

### Level 1: Micro interactions
Hover reveals, subtle panel movement, text reveal, small petal movement and cursor states.

### Level 2: Section transitions
Environment morphs, camera movement, parallax and panel transitions.

### Level 3: Major cinematic moments
Rarely use for the prologue, major chapter transitions, flagship project reveal and final Sakura scene.

**Animation communicates meaning. Do not animate everything.**

### Opening
First visit: full cinematic. Returning visitors: skip automatically. Reduced-motion: bypass cinematic. Provide `SKIP INTRO ↗` and Escape-to-skip.

Approximate sequence:

```text
0–2s  monochrome environment + Sakura branch + petal
2–4s  camera moves toward Rameez + laptop glow
4–6s  laptop becomes manga panel

$ whoami
rameez

$ focus
software-engineering
ai-ml
backend

$ status
building...

6–8s  terminal dissolves into ink
8–10s ink resolves into cover
```

Cover:

```text
RAMEEZ
THE DEVELOPER'S ARC
AI × SOFTWARE × BUILDING
B.Tech CSE · AI/ML
BEGIN READING ↓
```

---

## 7. Navigation

### Desktop

```text
RAMEEZ     CHAPTER 04 · THE BATTLE ARC     MENU
01 02 03 ●04 05 06 07 08
```

Menu includes chapters, GitHub, LinkedIn, Resume, Contact and Journal.

### Mobile

```text
RAMEEZ     ☰
CH.04 · BATTLE
```

Hide desktop chapter rail. Use normal vertical scrolling.

### Contextual cursor, desktop only

```text
Default       small ink dot
Links         ↗ OPEN
Panels        + EXPLORE
Projects      ◇ VIEW
Architecture  ⊙ INSPECT
External      ↗ OPEN
```

No custom cursor on mobile.

---

## 8. Chapter Transitions

```text
01 → 02   environment morph
02 → 03   environment morph
03 → 04   ink
04 → 05   page turn
05 → 06   environment morph
06 → 07   ink
07 → 08   environment expands
08 → Final major Sakura
```

Transition intensity must correspond to story importance.

---

## 9. Chapter Environments

```text
01 Origin      small personal workspace
02 Training    study environment
03 Arsenal     developer workspace
04 Battles     hackathon war room
05 Projects    engineering command center
06 Evolution   city/train/window/path
07 Current     quiet established workspace
08 Next        open future-oriented environment
Final          open space + mature Sakura tree
```

The world gets larger as Rameez grows.

---

# 10. Story Content

## Prologue — The Story Begins

Core idea:

> Every engineer starts somewhere.

> This is where my story starts.

Introduce Rameez, current direction, Sakura, terminal and title.

## Chapter 01 — The Origin

Opening:

> Before the code, there was curiosity.

Narrative:

```text
I didn't start with a roadmap.
I started with curiosity.

I wanted to understand what happened behind the screen.

How applications worked.
How websites were built.
How ideas became software.

At first, I wanted to understand the technology behind the things I used.
Then I wanted to build them myself.

And somewhere along the way,
curiosity turned into ambition.
```

Goal:

```text
The goal is simple:
become a strong software engineer with deep AI knowledge.
```

Profile:

```text
RAMEEZ SHAIKH
B.Tech CSE · AI/ML

FOCUS:
Software Engineering
Artificial Intelligence
Backend Development

CURRENT ARC:
Learning · Building · Experimenting
```

Terminal:

```text
$ why
curiosity
ambition
building
learning

$ direction
software-engineering
+
artificial-intelligence

$ status
still building...
```

## Chapter 02 — Training

> Every skill was another weapon.

```text
Programming: Python → Problem Solving → DSA
Data: NumPy → Pandas → Visualization
ML: Regression → Classification → Pipelines → Projects
Backend: SQL → APIs → FastAPI → Databases
Development: Git → GitHub → Deployment → Collaboration
```

Skill tree:

```text
RAMEEZ
├── ENGINEERING
└── INTELLIGENCE
      └── BUILDING
```

Skill cards explain ROLE, USED IN, CONNECTED TO and EVIDENCE. Never use fake proficiency percentages.

Progression:

```text
Learn → Build → Break → Fix → Understand → Build again
```

## Chapter 03 — Arsenal

> Tools don't make the engineer. Knowing when to use them does.

Categories:

**Intelligence:** ML, Scikit-learn, NumPy, Pandas, Statistics, Data Analysis  
**Engineering:** Python, FastAPI, SQL/MySQL, REST APIs, Git/GitHub, Backend Architecture  
**Frontend:** HTML, CSS, JavaScript, React, Vite, Tailwind  
**Tools:** only genuinely used tools such as Claude Code, Antigravity, VS Code, Firebase, Docker

End with:

```text
TOOLS ARE READY.
```

## Chapter 04 — Battle Arc

> The fastest way to learn is to build under pressure.

Every hackathon:

```text
Problem → Idea → Build → Result → Lesson
```

Show event, time, team, result and lesson.

UAi Hawk-A-Thon Judges' Choice receives special cinematic treatment.

Failures/unfinished builds may appear as `LOST BATTLES`, focused on lessons rather than embarrassment.

## Chapter 05 — Project Arc

> Ideas become real when someone builds them.

Every project:

```text
Problem → Idea → Architecture → Build → What broke → Result → What I learned
```

### AAROH flagship

Value chain:

```text
Weather + Terrain + Incidents
        ↓
AI Risk Prediction
        ↓
Risk Assessment
        ↓
Route Recommendation
        ↓
Vehicle Impact Analysis
        ↓
Alert Generation
        ↓
Dashboard Visualization
```

ML:

```text
Random Forest Classifier
disruption_probability: 0.0–1.0
risk_level: Low / Medium / High
```

Relevant features include rainfall, terrain slope, historical landslide count and drainage capacity.

MVP:
- GIS-enabled accessibility dashboard
- real-time logistics monitoring
- disruption risk evaluation

Technology:
- FastAPI
- Python 3.11+
- scikit-learn Random Forest
- NetworkX
- SQLite
- PostgreSQL-ready architecture

API modules:

```text
/api/roads
/api/weather
/api/vehicles
/api/predictions
/api/incidents
/api/alerts
/api/dashboard
```

Alerts:

```text
Blocked Roads       CRITICAL
High-Risk Corridors HIGH
Delayed Deliveries  MEDIUM
```

AAROH receives the deepest treatment with authentic screenshots, architecture, APIs, ML, routing, alerts, GitHub and demo evidence.

Other projects receive progressively lighter treatment, including PhishGuard Lite, Smart Resource Allocation / Volunteer Matcher, California Housing Prices and Task Manager.

## Chapter 06 — Evolution

> The projects changed. So did I.

```text
Programming → Data → AI/ML → Projects → Backend → Systems
```

Sakura continues growing.

## Chapter 07 — Current

> This is where the story currently stands.

```text
STILL BUILDING

FOCUS:
Software Engineering
AI/ML
Backend & Systems
Problem Solving

MODE:
LEARNING · BUILDING · EXPERIMENTING
```

No unsupported expertise claims.

## Chapter 08 — Next

> The destination isn't finished.

```text
01 STRONGER ENGINEERING
Systems · Architecture · Backend

02 DEEPER AI
ML · AI Engineering · Intelligent Systems

03 HARDER PROBLEMS
DSA · Algorithms · Problem Solving

04 BIGGER BUILDS
Real-world software · AI systems
```

Destination:

> Become a strong software engineer with deep AI knowledge.

> The next chapter is still unwritten.

---

# 11. Projects and Interaction

Project entry is concise. Clicking opens a cinematic case study in the same narrative.

Structure:

```text
Story → Problem → Solution → Architecture → Implementation
→ Evidence → Result → Lessons
```

Technical deep dive is expandable.

Architecture:
- desktop hover = quick context
- desktop click = deep inspection
- mobile tap = inspect

Real screenshots stay authentic. Demo videos should be short, roughly 5–15 seconds.

---

# 12. Skills, Education, Achievements

### Skills
Hybrid Skill Tree + expandable evidence cards.

Each card can show:

```text
ROLE
USED IN
CONNECTED TO
EVIDENCE
```

No fake percentages.

### Education
Manga training scene + clean academic timeline.

### Achievements
Major milestones receive cinematic presentation. Smaller achievements use compact professional cards.

---

# 13. About, Resume, Contact

### About
Hybrid narrative + professional facts. Avoid generic corporate biography.

### Resume
Hybrid quick preview:

```text
VIEW PDF
DOWNLOAD PDF
```

The actual PDF remains professional and conventional.

### Contact
Compact form + direct links.

Success:

```text
TRANSMISSION SENT ✓
```

---

# 14. Developer's Journal

Journal is **not** a manga chapter.

Structure:

```text
RAMEEZ
├── THE ARC
│   └── Chapters
└── DEVELOPER'S JOURNAL
    ├── Articles
    ├── Notes
    └── Experiments
```

Future routes:

```text
/journal
/journal/article-slug
```

Future content may use Markdown, MDX, CMS or static data. Do not build a full CMS now.

Example:

```text
DEVELOPER'S JOURNAL
FIELD NOTES #07
Things I learned building AAROH's backend
08 SEP 2026
BACKEND · FASTAPI · SYSTEMS
[ READ ARTICLE → ]
```

Article readability takes priority over decoration.

---

# 15. Final Chapter

Environment: mature Sakura tree, open space, protagonist beneath it, slow petals.

```text
Every chapter changed something.

This one isn't finished.
```

Closing:

```text
RAMEEZ
THE DEVELOPER'S ARC

CURRENT STATUS

STILL LEARNING.
STILL BUILDING.
STILL MOVING FORWARD.

END OF CURRENT ARC

CHAPTER 02 IS ALREADY BEING WRITTEN...
```

Links: GitHub, LinkedIn, Resume, Contact.

Reserved quote:

> If you don't sacrifice for what you want, the thing you want becomes a sacrifice.

Use subtly. End with one Sakura petal and a fade to paper.

---

# 16. Responsive Design

### Desktop
Cinematic panels, chapter rail, top navigation, side-by-side technical interfaces, contextual cursor.

### Mobile
Full-width vertical panels, stacked technical cards, horizontal inner scrolling for wide architecture diagrams, lighter animation, no custom cursor.

Never merely shrink the desktop layout.

---

# 17. Theme

Default: light manga paper.

Optional dark mode uses the same visual identity and hierarchy.

Theme transition: approximately 300ms. First switch may have subtle ink spread; later switches are fast.

---

# 18. Accessibility

Required:
- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- sufficient contrast
- reduced-motion support
- no hover-only functionality
- screen-reader-friendly controls
- proper form labels/errors
- animations never block content

---

# 19. Performance

Prioritize:
1. Fast initial content
2. Lazy-loaded heavy images
3. Lazy-loaded non-critical sections
4. Optimized images
5. Limited animation work
6. Reduced-motion support
7. Intersection Observer/CSS instead of unnecessary scroll listeners
8. No unnecessary dependencies

Cinematic effects must not damage usability or performance.

---

# 20. SEO and Analytics

SEO:
- title
- description
- Open Graph metadata
- canonical URL
- semantic headings
- sitemap
- robots configuration

Analytics should be privacy-friendly and may track useful events such as project views, resume interactions, contact submission, journal views and external-link clicks. Do not collect unnecessary personal data.

---

# 21. Errors and 404

Error language may remain inside the visual world:

```text
CHAPTER FAILED TO LOAD
RETURN TO CURRENT ARC
```

404:

```text
CHAPTER NOT FOUND
Looks like this chapter hasn't been written yet.
```

Always provide a clear way back.

---

# 22. Recruiter Escape Hatch

The manga experience is primary, but professional information must always be accessible:

```text
Quick Profile
Projects
Skills
Resume
Contact
```

Do not create a separate recruiter mode.

---

# 23. External Links

Internal navigation may use smooth manga transitions.

External links should clearly indicate external navigation and may open in a new tab.

---

# 24. Easter Eggs

Use small developer/manga references:
- terminal messages
- tiny error jokes
- contextual cursor labels
- hidden chapter details

Easter eggs must never be required to understand the portfolio.

---

# 25. Technical Stack

Preferred:

```text
React
Vite
TypeScript / existing project language
Tailwind CSS
Framer Motion
Lucide React
```

Only add Lenis, GSAP or other libraries when a concrete requirement justifies them.

Suggested architecture:

```text
src/
├── components/
│   ├── navigation/
│   ├── manga/
│   ├── character/
│   ├── chapters/
│   ├── projects/
│   ├── architecture/
│   ├── skills/
│   ├── achievements/
│   ├── contact/
│   └── ui/
├── chapters/
├── data/
├── animations/
├── assets/
├── pages/
├── hooks/
└── lib/
```

Keep content separate from presentation. Prefer reusable, data-driven components.

---

# 26. AI Coding Agent Rules

1. Inspect the existing project before modifying it.
2. Treat this DESIGN.md as the visual source of truth.
3. Implement small vertical slices.
4. Do not redesign unrelated working sections.
5. Never invent projects, metrics, achievements, technologies or expertise.
6. Avoid generic SaaS-dashboard, neon-AI and template-looking designs.
7. Preserve authentic project evidence.
8. Avoid unnecessary dependencies.
9. For browser/MCP exploration, spend only 2–5 minutes on focused inspection.
10. Do not repeatedly test the same thing.
11. Stop once enough evidence is available.
12. For implementation, make the smallest coherent change and run the relevant build/test once.
13. Fix actual errors, then stop.
14. Do not add animation merely because it is possible.

---

# 27. Locked Decisions

```text
Visual universe       Manga + Modern Manhwa
Tone                   Ambitious quiet strategist
Palette                Monochrome + Sakura
Typography             Manga + Developer Hybrid
Navigation             Hybrid Top Bar + Chapter Rail + Menu
Scroll                 Natural browser scroll
Animation              Cinematic + Hierarchical
Cursor                 Contextual desktop cursor
Prologue               Cinematic + Skip + Smart Replay
Sakura                 Environmental + Character Journey
Panels                 Hybrid
Mobile                 Adaptive Manga Experience
Projects               Hybrid narrative case studies
Evidence               Hybrid evidence system
Skills                 Skill Tree + evidence cards
Education              Hybrid journey
Achievements           Hybrid milestones
Resume                 Hybrid
Contact                Hybrid
About                  Hybrid
Journal                Separate Developer's Journal
Theme                  Adaptive Hybrid
Recruiter access       Persistent professional escape hatch
```

---

# 28. Definition of Done

A section is complete only when:

- it follows this DESIGN.md
- hierarchy is clear
- visual composition is intentional
- interactions are understandable
- mobile works
- reduced motion works
- keyboard navigation works
- no console errors are introduced
- relevant build/test passes
- performance remains reasonable
- evidence is authentic
- unsupported claims are absent

## Final principle

**Build a portfolio that feels like an engineer's story told through manga, not a manga website that happens to contain a résumé.**

---

# 29. VISUAL GRAMMAR V1 — CHAPTER 01 REFERENCE

Chapter 01 (THE ORIGIN) is the reference implementation. Future chapters
inherit this grammar; they do not invent a new one.

## 1. Grid / container
- Content lives in the shared `Chapter` wrapper: `max-w-6xl`, `px-6 md:px-12`.
- One alignment anchor: left. Display statements cap at `max-w-3xl`,
  body copy at `max-w-2xl`.
- Section rhythm is uniform: `mt-16 md:mt-24` between beats, larger
  (`mt-20 md:mt-32`) before the closing. Whitespace is never compressed
  to shorten the page.

## 2. Typography hierarchy
- Kicker: `font-body`, xs, uppercase, `tracking-[0.3em]`, manga-gray.
- Title: `font-display`, bold, tight, ink — always the strongest element.
- Body: `font-body`, manga-gray, relaxed leading, `max-w-2xl`.
- Technical/metadata: monospace (`font-tech`), xs–sm, uppercase with
  tracking for labels.

## 3. Story panel
- Ruled editorial rows: `border-t-2 border-ink` container,
  `border-b border-ink/15` rows, `font-display` statements.
- No cards, no background fills, no rounded corners around narrative.

## 4. Technical panel
- `border-2 border-ink` frame with a metadata strip (status dots +
  lowercase label), deep-ink body, monospace content, square geometry.
- Preceded by a `FIELD NOTE` annotation so the story→code transition
  reads as a scene, not a widget.

## 5. Identity frame
- `border-2 border-ink` editorial frame; name in large display type,
  facts in `dl`/`dt`/`dd` with uppercase gray labels.
- No resume-card styling, no percentages, no ratings, no icons.

## 6. Editorial annotation
- Kicker labels (`The change`, `The protagonist`) in kicker type.
- Margin-note form: thin sakura left rule, mono `Note —` prefix,
  italic gray observation. Allowed labels: OBSERVATION, FIELD NOTE,
  EVIDENCE. Never decorative; never competing with the story.

## 7. Sakura semantics
- INK = structure. PAPER = space. GRAY = supporting information.
- SAKURA = meaning only: the origin word ("curiosity"), sequence
  numerals at transition points (final stage only), the terminal dot,
  the identity mark, the active-chapter state.
- Never on every heading, border, button, or icon.

## 8. Negative-space rhythm
- STORY → quiet space → STORY → technical moment → larger quiet
  space → identity → closing. Quiet zones are intentional; empty
  areas are not filled.

## 9. Motion hierarchy (Level 1 only)
- Opacity + ≤16px vertical reveal, ≤0.5s, once per section.
- Everything renders fully with animation disabled
  (`useReducedMotion` gate). No parallax, no scroll hijacking,
  no continuous motion. The Prologue owns all cinematic motion.

## 10. Responsive composition
- Single column at every width; ruled rows stack, never squeeze.
- Terminal scrolls internally (`overflow-x-auto`); type scales down,
  never clips. Fixed ChapterRail clearance spacer (`h-24 md:h-32`)
  at chapter end so rail never covers content or CTA.

## 11. Chapter closing
- `border-t-2 border-ink`, large display statement, supporting line,
  CTA right-aligned on desktop as a plain editorial link with arrow
  (`scrollToChapter`), visible focus ring. Feels like a page turn,
  not a button.

## 12. Accessibility requirements
- Semantic sections/headings (`h1` chapter title from the wrapper;
  `h2` section labels inside content); decorative marks `aria-hidden`;
  keyboard-accessible CTA with focus ring; contrast from ink/paper;
  no color-only meaning (active states pair sakura with rules/weight).

---

# 30. SAKURA GROWTH SYSTEM

The Sakura is the portfolio's metaphor for growth — never decoration.
Implemented once in `src/components/shared/SakuraGrowth.jsx` as a
parametric ink SVG (`<SakuraGrowth stage={n} />`, stages 0–9); only
Chapter 01 currently renders it (Stage 1).

## 1. Sakura meaning
- GROWTH, TRANSITION, DIRECTION, MEANINGFUL CHANGE. Never
  "interactive", "important UI", or ornament.

## 2. Stage progression
- 0 Prologue: stem + first blossom · 1 Ch01: single branch, few
  blossoms · 2 Ch02: second branch, more blossoms · 3 Ch03: short
  trunk, stronger branching · 4 Ch04: young tree, first petals ·
  5 Ch05: trunk + canopy linework, sakura enters composition ·
  6 Ch06: maturing tree, integrated canopy · 7 Ch07: mature, calm ·
  8 Ch08: large, open composition · 9 Final: full tree, falling
  petals, cinematic treatment.
- Stages differ structurally (trunk, branch count, blossoms, canopy,
  petals) — never mere color/size changes. Growth is gradual:
  seedling → sapling → young → growing → established → mature →
  expansive → realized.

## 3. Visual rules
- Ink linework on paper; sakura blossoms, manga-gray buds/twigs;
  no gradients, glow, 3D, chibi, or fantasy rendering. Asymmetric
  organic branches; crisp at any size (SVG, no image assets).
- One restrained placement per chapter (margin branch, near a
  transition) — never a full-page backdrop. Chapter 01 stays
  ~monochrome; the tree must not be the first thing noticed.

## 4. Placement rules
- Enter from a margin or beside a narrative beat (Ch01: right
  margin at the arc→terminal transition). Never behind body copy;
  never disrupting the Phase 3B.1 grid.

## 5. Color rules
- Existing UI is never recolored to match the tree. Sakura appears
  only on blossoms/petals and the growth it marks.

## 6. Motion rules
- Level 1 only: branch draw (≤0.6s, staggered), blossom fade-in.
  No scroll-driven growth, no parallax, no floating particles,
  no camera moves. Structure anticipates future branch/blossom/petal
  transitions without building them.

## 7. Accessibility / reduced motion
- `role="img"` with a stage label; decorative sub-parts
  `aria-hidden`. Under reduced motion the complete static stage
  renders immediately (no animation gates content).
