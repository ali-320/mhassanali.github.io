# Muhammad Hassan Ali — Stoic 3D Portfolio

An immersive single-page portfolio built with React, Three.js, and GSAP. The design follows a stoic, stone-carved aesthetic with scroll-driven 3D animations and a rock-breaking project reveal that opens a digital game-style menu.

## Frameworks & Libraries

- **Vite** — build tool and dev server
- **React 18** — UI library
- **Three.js + @react-three/fiber + @react-three/drei** — 3D graphics
- **GSAP + ScrollTrigger** — scroll-driven animations
- **Lenis** — smooth scrolling
- **Zustand** — state management
- **Tailwind CSS** — styling
- **Lucide React** — icons

## Prerequisites

- Node.js 18+ and npm installed
- A modern browser with WebGL support

## Installation

From the `Portfolio website` folder:

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

Open the URL shown (default: `http://localhost:5173`).

## Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

## Project Structure

```
Portfolio website/
├── public/              # Static assets
├── src/
│   ├── components/      # 3D scene, rock boulders, game menu
│   ├── data/            # Resume content and project data
│   ├── store/           # Zustand store
│   ├── App.jsx          # Scrollable page + 3D canvas
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Interaction

- Scroll vertically to move through sections.
- The 3D camera drifts horizontally as you scroll.
- In the **Relic Gallery**, click a rock to break it and reveal the project.
- Click **Repository** or **Deployment** in the game menu to open links.
- Press **Escape** or click outside the menu to close it.

## Customization

- Edit `src/data/content.js` to change project details, skills, or contact info.
- Adjust colors in `tailwind.config.js`.
- Modify `src/components/Scene3D.jsx` to change 3D layout and camera behavior.
