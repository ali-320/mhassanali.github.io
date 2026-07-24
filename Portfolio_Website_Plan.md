# Portfolio Website Plan — Muhammad Hassan Ali

## 1. Persona & Project Overview

**Subject:** Muhammad Hassan Ali  
**Role:** Software Engineering Student at NUST (SEECS)  
**Location:** Islamabad, Pakistan  
**Contact:** +92 322-9053561, mhali.bese23seecs@seecs.edu.pk, ha0407351@gmail.com  
**GitHub:** [ali-320](https://github.com/ali-320)  

**Purpose:** A single-page, immersive 3D portfolio website with heavy vertical scrolling, horizontal scroll-driven animations, and stoic visual philosophy. The site tells Muhammad's story through "carved stone" aesthetics — calm, enduring, and intentional. Projects are revealed through a rock-breaking interaction that transitions into a digital game-style menu.

**Source Material:** `Muhammad_Hassan_Ali_Resume_3.md` and `Relevant-Experiences.txt`

---

## 2. Design Philosophy: Stoic

### Core Emotion
- **Stillness, discipline, and quiet strength.**
- No flashy neon or chaotic motion. Everything should feel heavy, permanent, and deliberate — like ancient stone meeting modern code.

### Visual Identity
- **Materials:** Rough stone, carved marble, brushed metal, fog, dust particles, low-key caustics.
- **Shapes:** Blocky monoliths, pillars, floating geometric artifacts, broken rock debris, minimal UI panels with beveled edges.
- **Motion:** Slow, weighty animations. Objects settle into place. Movement obeys "gravity and inertia."
- **Metaphor:** The portfolio is an archaeological ruin of modern code — every project is a relic carved into stone.

### Color Palette
- **Background:** `#0B0C0E` (deep stone black)
- **Primary Stone:** `#2C2E33` / `#3A3D42` (carved rock)
- **Accent Light:** `#D4CFC7` (warm stone white)
- **Gold/Ochre Accent:** `#B8860B` (wisdom, stoic virtue)
- **Subtle Glow:** `#8A9CA6` (cold steel/quantum)
- **Danger/CTA:** `#9C2A2A` (only for destructive/exciting interactions)
- **Text:** `#E8E6E1` on dark; `#141414` on light.

### Typography
- **Headings:** `Cinzel` or `Playfair Display` (serif, stoic, monumental)
- **Body/Mono UI:** `JetBrains Mono` or `Space Mono` (developer, terminal, game menu)
- **HUD Labels:** `Rajdhani` or `Share Tech Mono` (game menu screens)

---

## 3. Technology Stack

- **Framework:** Next.js 14+ (App Router) or Vite + React
- **3D Engine:** Three.js + React Three Fiber (`@react-three/fiber`)
- **3D Helpers:** `@react-three/drei` (HTML overlays, useScroll, useGLTF, etc.)
- **Scroll Animation:** GSAP ScrollTrigger + Lenis (smooth scrolling)
- **State Management:** Zustand or React Context for active project/modal state
- **Styling:** Tailwind CSS + custom CSS
- **Assets:** Blender (`.glb` rock models) + procedural rock generation fallback
- **Icons:** Lucide React or custom SVG

---

## 4. Site Structure & Scroll Flow

The site is a single long scrollable page. Each "chapter" is a full-viewport section. Horizontal animations occur **within** sections as the user scrolls vertically (camera or content moves left/right on the Z/X axis).

### Sections
1. **Hero** — Name, role, stoic tagline.
2. **About** — Professional summary + education timeline.
3. **Skills** — Skills carved as glyphs on rotating stone pillars.
4. **Experience** — Work history as inscribed stone tablets.
5. **Projects** — Project relics inside breaking rocks.
6. **Research & Honors** — Stone steles rising from fog.
7. **Contact** — The final monument; send a message.

---

## 5. Global Systems

### Smooth Scrolling
- Use **Lenis** for buttery scroll interpolation.
- GSAP `ScrollTrigger` listens to Lenis's virtual scroll.
- Parallax factor: `0.08`–`0.2` for foreground rocks, `0.02` for distant fog.

### Persistent 3D Scene
- A single `<Canvas>` spans the entire page (fixed position).
- Sections are driven by `ScrollTrigger` progress, updating the camera position or scene elements.
- Fog (`THREE.FogExp2`) and floating dust particles are always present.

### Lighting (Stoic & Dramatic)
- **Hemisphere Light:** Cool blue-gray (`#8A9CA6`, intensity 0.3) from top.
- **Directional Key Light:** Warm white (`#FFF8E7`, intensity 1.2), casting long shadows.
- **Rim/Accent Light:** Gold (`#B8860B`, intensity 0.6) from behind the camera to silhouette rocks.
- **Volumetric God Rays (fake):** Shader planes or textured transparent cones to create light shafts.

### Camera Behavior
- Default: stationary within each section, subtle drift based on scroll.
- Transitions: slow dolly/zoom between sections (duration 1.2s, ease `power2.inOut`).
- Horizontal scroll effect: as user scrolls down, the camera glides horizontally across a ruined plaza of stone relics.

---

## 6. Section-by-Section Plan

### Section 1: Hero — "The Monolith"

**Content:**
- Name: **Muhammad Hassan Ali**
- Subtitle: Software Engineering Student · NUST (SEECS)
- Tagline: *"Built to endure. Engineered to matter."*
- CTA scroll hint: *Scroll to descend*

**3D Layout:**
- Center: a massive, slowly rotating monolith with the name chiseled into it.
- Ground: cracked stone floor with dust drifting.
- Background: distant fog and silhouetted pillars.

**Scroll Animation:**
- On load: monolith rises from below and settles with a heavy "thud" (slight camera shake).
- Scroll (0%→20%): camera pushes slowly toward the monolith; text fades in letter-by-letter.
- Horizontal drift: the monolith rotates 15° left then 15° right as scroll progresses.

**Effects:**
- Dust motes swirl in light beams.
- Chiseled letters emit faint gold dust when hovered.
- Clicking the monolith plays a subtle stone-impact sound.

---

### Section 2: About — "The Inscribed Path"

**Content (from resume):**
- Professional summary about ML, Deep Learning, Embedded Systems, Web Dev, Quantum Computing, Software Testing.
- Education timeline:
  - NUST — B.S. Software Engineering (2023–2027), CGPA 3.02, 6th Semester completed
  - Punjab College — FSc Pre-Engineering (2021–2023), 987/1100
  - PASC Farooqabad — Matriculation (Science) (2019–2021), 1100/1100

**3D Layout:**
- A long stone pathway floating in mist.
- On each side: stone steles (vertical slabs) bearing education entries.
- The path curves slightly in 3D space; the camera follows it as the user scrolls.

**Scroll Animation:**
- As section enters, the camera descends along the path (vertical scroll controls forward movement).
- Steles slide up from below the path and lock into place with a stone-grinding sound.
- Horizontal effect: path bends left/right; the camera banks gently.

**Effects:**
- Inscriptions glow when near the center of the viewport.
- Floating particles of stone dust fall when a stele locks in.
- Summary text types out like an old terminal as the camera stops at a "resting" stele.

---

### Section 3: Skills — "Pillars of Discipline"

**Content (grouped):**
- Programming: Python, Java, C++, JavaScript, TypeScript, Linux
- Specializations: Machine Learning, Deep Learning, Quantum ML, Game Development, Embedded Systems, Formal Methods, Software Testing
- Tools & Frameworks: PennyLane, k6, Locust, PyTest, Selenium, Postman, Figma, NuSMV, HOL4, Proteus, Cisco Packet Tracer, AutoCAD, Wireshark, Docker, ELK Stack, Supabase, Unity
- Soft Skills: Problem Solving, Leadership, Critical Thinking, Communication

**3D Layout:**
- A circular courtyard of stone pillars.
- Each pillar represents a skill category; individual skills are carved as glowing glyphs spiraling up the pillar.

**Scroll Animation:**
- Camera orbits the courtyard as the user scrolls (horizontal circular motion).
- Pillars rise from the ground one by one.
- As each pillar rises, the glyphs light up sequentially from bottom to top.

**Effects:**
- Hovering a pillar causes glyphs to pulse and emit sparks.
- Connecting lines (like constellation lines) briefly appear between related skills (e.g., PyTest → Selenium → k6).
- A central obelisk shows the active skill category label.

---

### Section 4: Experience — "Tablets of Trial"

**Content:**
- **AI-SOAR Developer Intern**
  - Built DL trio engine (FCNN, CNN, LSTM) for cybersecurity data.
  - Docker, ELK Stack, CTI reports.
  - Repo: https://github.com/ali-320/AI_SOAR_1
- **M-labs Game Development Intern**
  - Game logic and mechanics for 2D stickman story game in Unity.

**3D Layout:**
- Two large horizontal stone tablets floating in fog.
- Each tablet is tilted slightly, with runic text and a glowing sigil.

**Scroll Animation:**
- Tablets rotate in from opposite horizontal sides (left/right) and meet in the center.
- When they lock, the text etches itself in (glowing from left to right).
- Horizontal scroll: camera moves between the two tablets, revealing details.

**Effects:**
- Hovering a tablet tilts it toward the user.
- Repo link appears as a hovering artifact above the tablet.
- Subtle energy pulse for the AI-SOAR tablet (cybersecurity theme).

---

### Section 5: Projects — "The Relic Gallery"

**Content (7 projects):**
1. **Quantum Machine Learning** — VQC with PennyLane; noise as amplifier in NISQ hardware.
2. **Tax Lens** — Tax-slip collection estimator; government project transparency; Supabase; deployed at https://tax-lens-gamma.vercel.app/
3. **Remote ECG Monitor** — Real-time ESP32-based ECG monitoring.
4. **SearchWright** — Terminal search engine for 190,000+ articles with lexicon, forward/inverted index.
5. **Patient Management System** — Doctor portal with 3 ML models for medical anomaly detection.
6. **Software Testing — OSPOS** — Testing with k6, Locust, PyTest, Selenium, Postman.
7. **Frontend Prototyping** — Figma/Stitch low/high-fidelity prototypes; Maze usability testing.

**3D Layout:**
- A dark ruin hall with 7 ancient rock pedestals arranged in an arc.
- On each pedestal sits a rough stone boulder.
- Hidden inside each boulder is a glowing project icon/relic.

**Scroll Animation:**
- Camera glides horizontally along the arc of pedestals.
- Each boulder comes to center stage as it enters the viewport.
- The active boulder slightly levitates and rotates.

**Core Interaction — Rock Breaking/Reforming:**
- **Idle:** Boulder spins slowly, cracks faintly glow.
- **Hover:** Boulder shakes slightly; cracks widen; a faint icon silhouette appears inside.
- **Click:**
  1. Boulder **shatters** into dozens of rock fragments (physics explosion away from center).
  2. Fragments slow, then **reform** into the project icon/relic (a stylized 3D glyph).
  3. A digital game menu overlay **glitches** onto screen (scanlines, chromatic aberration, green terminal text).
- **Close (click outside/X or ESC):**
  1. Menu glitches away.
  2. Icon breaks back into fragments.
  3. Fragments reform the original boulder.

**Game Menu Screen Details:**
- Full-screen overlay with a dark HUD theme.
- Left: large project icon + animated title.
- Right: project description bullets.
- Bottom: two action buttons styled like game menu options:
  - `[REPOSITORY]` — links to GitHub repo
  - `[DEPLOYMENT]` — links to live site (where applicable)
- Decorative: fake FPS counter, terminal logs, scanline shader, border glitch, audio equalizer bars.

**Effects:**
- Rock fragments use low-poly geometry with rough textures.
- Shatter uses a voronoi-like fracture pattern (can be pre-fractured GLB).
- Reform uses inverse animation (fragments lerp back to icon shape).
- Sound: stone crack, debris settle, digital menu open SFX.

---

### Section 6: Research & Honors — "Stele of Virtue"

**Content:**
- Dark Energy research for Breakthrough Junior Challenge.
- Theoretical physics (4th dimension).
- Computer Lab Manager — leadership.
- Languages: English, Urdu, Punjabi.

**3D Layout:**
- Three tall stone steles rising from a pool of reflective black water.
- Each stele has a different height, representing Research, Leadership, Languages.

**Scroll Animation:**
- Steles rise slowly from below the viewport.
- Water ripples outward as each stele locks into place.
- Horizontal parallax: steles move slightly left/right relative to each other.

**Effects:**
- Reflections in the water (using a mirror/shader plane).
- Faint aurora-like light shifts between blue and gold.
- Hovering a stele causes the water beneath it to ripple.

---

### Section 7: Contact — "The Final Monument"

**Content:**
- Heading: "Forge a Connection"
- Email: mhali.bese23seecs@seecs.edu.pk, ha0407351@gmail.com
- Phone: +92 322-9053561
- GitHub: https://github.com/ali-320

**3D Layout:**
- A central stone altar/forge.
- Floating above it: a glowing message form (holographic but stone-framed).
- Sparks and embers float upward.

**Scroll Animation:**
- Camera rises to face the altar.
- The form assembles piece by piece (stone frame first, then input fields).
- Horizontal camera orbit: the altar rotates slowly as the user scrolls.

**Effects:**
- Typing in a field causes sparks to fly from the input.
- Submit button is a stone slab that presses down with impact on click.
- On submit: the form compresses, a golden pulse travels up a central spire, and a "Message Sent" rune appears.
- Links (email/GitHub) appear as floating runes around the altar.
- Hovering a rune causes it to rotate and emit a tone.

---

## 7. The Project Artifact: Rock Breaking Technical Plan

### Geometry & Animation
- Each project boulder is a pre-fractured GLB model.
- GLB contains:
  - `boulder_whole`: the intact rock (visible initially)
  - `fragments`: an array of rock shards
  - `icon_mesh`: the target project icon geometry
- Use **morph targets** or pre-baked keyframes for shatter and reform.
- Alternative: procedural shatter with `THREE.InstancedMesh` for performance.

### Interaction Flow
1. **Idle:** whole boulder rotates, emissive crack lines pulse.
2. **Hover (0.3s):** scale + slight wobble; crack glow intensifies.
3. **Click (open):**
   - Trigger GSAP timeline:
     - 0.0s: hide whole boulder; show fragments at boulder origin.
     - 0.0–0.4s: explode fragments outward using per-fragment velocity vectors.
     - 0.4–1.0s: lerp fragment positions toward `icon_mesh` vertex positions.
     - 0.8–1.2s: fade in icon material + game menu overlay.
4. **Close (reverse):**
   - Fade out menu.
   - Reverse fragment lerp from icon back to exploded positions.
   - Implode fragments to reform boulder; show whole boulder.

### Sound Design
- **Hover:** low stone scrape.
- **Break:** crack + debris scatter.
- **Reform:** reverse debris + digital chime.
- **Menu open:** retro UI boot sound.

---

## 8. Game Menu Modal Specification

### Visual Style
- **Cyberpunk-stoic hybrid:** dark HUD with thin gold borders, mono fonts, scanlines.
- Background: translucent black (`rgba(10,10,10,0.92)`).
- Layout inspired by RPG pause menus / Fallout Pip-Boy / Cyberpunk 2077 inventory.

### Components
- **Header:** Project name in `Rajdhani` uppercase with a blinking cursor.
- **Left Panel:** 3D icon preview (rotating relic) + category tag (e.g., `[QUANTUM]`).
- **Right Panel:**
  - Description paragraphs
  - Tech stack chips
  - Key achievements as bullet list
- **Bottom Bar:**
  - `[REPOSITORY]` button (links to GitHub)
  - `[DEPLOYMENT]` button (links to live site)
  - Close button `[X]`
- **Decorative:**
  - Fake terminal scrolling log lines (e.g., `> loading repo...`)
  - Animated audio waveform
  - Corner brackets that twitch

### Animations
- Open: 0.3s chromatic aberration + scanline wipe from top.
- Content: staggered fade-in (0.05s per element).
- Hover buttons: border glow + slight translateX.
- Close: reverse open.

---

## 9. Assets Required

### 3D Models (recommended GLB format)
- `monolith_hero.glb`
- `stone_path_tiles.glb`
- `education_stele.glb`
- `skill_pillar.glb`
- `experience_tablet.glb`
- `project_boulders/` (7 fractured boulder sets + 7 icon meshes)
- `honor_stele.glb`
- `contact_altar.glb`

### Textures
- `rough_stone_diffuse.jpg`
- `cracked_stone_normal.jpg`
- `marble_chipped.jpg`
- `dust_particle.png`
- `scanline_overlay.png`
- `water_normal.jpg`

### Fonts
- Cinzel / Playfair Display (headings)
- JetBrains Mono (body/HUD)
- Rajdhani (game menu)

### Audio
- Subtle ambient drone.
- UI/rock SFX (can be procedural with Web Audio API).

---

## 10. Implementation Guidance for AI Agent

### Component Structure (React + R3F)
```
src/
  App.jsx
  components/
    CanvasContainer.jsx
    sections/
      HeroSection.jsx
      AboutSection.jsx
      SkillsSection.jsx
      ExperienceSection.jsx
      ProjectsSection.jsx
      HonorsSection.jsx
      ContactSection.jsx
    effects/
      FogAndDust.jsx
      GodRays.jsx
      Scanlines.jsx
    three/
      Monolith.jsx
      Boulder.jsx
      GameMenu.jsx
      StonePillar.jsx
      ...
  hooks/
    useScrollProgress.js
    useLenis.js
  store/
    projectStore.js
```

### Key Libraries to Install
```bash
npm install three @react-three/fiber @react-three/drei gsap @gsap/react lenis zustand
```

### Scroll Integration
- Wrap page in `<Lenis />`.
- Use GSAP `ScrollTrigger` with `scrub: 1` for smooth animation tied to scroll.
- Each section is a `100vh` div with an ID; the 3D Canvas is fixed and reacts to scroll progress.
- Use `useScroll` from R3F only if the entire scene lives inside the Canvas.

### Performance Rules
- Use `InstancedMesh` for repeated rocks/dust.
- Keep polygon counts low; use baked normal maps for detail.
- Lazy-load the game menu overlay.
- Use `drei` `<Html>` for overlays to avoid full-screen canvas text rendering.
- Cap particle counts at 3,000–5,000.
- Use `framer-motion` or GSAP for DOM transitions; keep R3F for 3D only.

### Accessibility
- Provide a "Skip Animations" button.
- Ensure all interactive 3D elements have DOM equivalents for keyboard/screen reader users.
- Use `aria-label` and keyboard event handlers.
- Respect `prefers-reduced-motion`: disable parallax, slow down transitions.

---

## 11. Responsive Considerations

- **Desktop:** Full 3D experience.
- **Tablet:** Simplified 3D, larger touch targets, single-column project carousel.
- **Mobile:**
  - Optional fallback to 2D CSS versions of sections if WebGL performance is poor.
  - Rock-breaking interaction becomes a tap-to-reveal card stack.
  - Reduce particle counts by 70%.
  - Use native touch scrolling.

---

## 12. Content Mapping Quick Reference

| Section | Resume Source |
|---|---|
| Hero | Name, role, NUST |
| About | Professional Summary + Education |
| Skills | Skills section |
| Experience | Experience section |
| Projects | Technical Projects section |
| Honors | Honors & Activities section |
| Contact | Phone, emails, GitHub |

---

## 13. Success Criteria

- [ ] Smooth vertical scroll with section-aware camera transitions.
- [ ] Horizontal camera/content motion triggered by vertical scroll.
- [ ] Stoic visual identity applied consistently (colors, fonts, stone materials).
- [ ] Rock-breaking/reforming project interaction works and feels weighty.
- [ ] Game menu overlay opens with project details, repo link, and deployment link.
- [ ] Distinct animations for About, Skills, Experience, Projects, Honors, and Contact sections.
- [ ] Performance stays above 55 FPS on mid-range devices.
- [ ] Accessible fallback and reduced-motion support included.

---

*End of plan. This document is intended to be handed to an AI coding agent for implementation.*
