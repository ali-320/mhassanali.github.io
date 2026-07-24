import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasContainer from './components/CanvasContainer'
import GameMenu from './components/GameMenu'
import { useScrollStore } from './store/scrollStore'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const scrollRef = useRef({ progress: 0, current: 0 })
  const lenisRef = useRef(null)
  const setProgress = useScrollStore((s) => s.setProgress)
  const setCurrentSection = useScrollStore((s) => s.setCurrentSection)
  const projectsMode = useScrollStore((s) => s.projectsMode)
  const enterRealm = useScrollStore((s) => s.enterRealm)
  const exitRealm = useScrollStore((s) => s.exitRealm)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    lenis.on('scroll', (e) => {
      scrollRef.current = { progress: e.progress, current: e.scroll }
      setProgress(e.progress)
      ScrollTrigger.update()
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const sections = document.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.dataset.section)
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => observer.observe(s))

    return () => {
      lenis.destroy()
      observer.disconnect()
    }
  }, [setProgress, setCurrentSection])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (projectsMode === 'realm' || projectsMode === 'detail') {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [projectsMode])

  const isRealm = projectsMode === 'realm'
  const isDetail = projectsMode === 'detail'

  return (
    <div className="relative min-h-screen w-full bg-stoneBlack">
      <CanvasContainer />

      {/* Fixed back button for realm/detail views */}
      {(isRealm || isDetail) && (
        <button
          onClick={exitRealm}
          className="pointer-events-auto fixed left-6 top-6 z-50 flex items-center gap-2 border border-steelBlue/50 bg-stoneBlack/80 px-4 py-2 font-hud uppercase tracking-widest text-steelBlue backdrop-blur-sm transition-all hover:bg-steelBlue hover:text-stoneBlack"
        >
          <span className="text-lg">←</span> Back to Gallery
        </button>
      )}

      <main className="relative z-10 w-full pointer-events-none">
        <section
          data-section="hero"
          className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="font-heading text-5xl font-bold tracking-wider text-stoneWhite md:text-7xl lg:text-8xl">
            Muhammad Hassan Ali
          </h1>
          <p className="mt-4 font-hud text-lg tracking-[0.3em] text-steelBlue md:text-2xl">
            SOFTWARE ENGINEERING STUDENT · NUST
          </p>
          <p className="mt-6 max-w-2xl font-mono text-sm text-stoneWhite/70 md:text-base">
            "Built to endure. Engineered to matter."
          </p>
          <div className="mt-12 flex animate-pulse-slow flex-col items-center gap-2 text-stoneWhite/50">
            <span className="text-xs uppercase tracking-widest">Scroll to descend</span>
            <div className="h-10 w-6 rounded-full border border-stoneWhite/30 p-1">
              <div className="h-2 w-full rounded-full bg-accentGold/60" />
            </div>
          </div>
        </section>

        <section
          data-section="about"
          className="relative flex h-screen w-full flex-col justify-center px-6 md:px-20"
        >
          <div className="ml-auto max-w-2xl text-right">
            <h2 className="font-heading text-4xl font-bold text-stoneWhite md:text-6xl">The Inscribed Path</h2>
            <p className="mt-6 font-mono text-sm leading-relaxed text-stoneWhite/80 md:text-base">
              Software Engineering student at NUST with hands-on experience in Machine Learning, Deep Learning,
              Embedded Systems, Web Development, Quantum Computing, and Software Testing. Skilled in building
              data-driven platforms, AI-based systems, and scalable software solutions.
            </p>
            <div className="mt-10 space-y-4 font-mono text-xs text-stoneWhite/60 md:text-sm">
              <p>NUST — B.S. Software Engineering (2023–2027) · CGPA 3.02</p>
              <p>Punjab College — FSc Pre-Engineering (2021–2023) · 987/1100</p>
              <p>PASC Farooqabad — Matriculation (Science) (2019–2021) · 1100/1100</p>
            </div>
          </div>
        </section>

        <section
          data-section="skills"
          className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="font-heading text-4xl font-bold text-stoneWhite md:text-6xl">Pillars of Discipline</h2>
          <p className="mt-4 max-w-3xl font-mono text-sm text-stoneWhite/70 md:text-base">
            Core competencies and tools carved in stone.
          </p>
          <div className="mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-rockHighlight/50 bg-carvedRock/30 p-6 backdrop-blur-sm">
              <h3 className="font-hud text-lg text-accentGold">Programming</h3>
              <p className="mt-2 font-mono text-sm text-stoneWhite/80">Python, Java, C++, JavaScript, TypeScript, Linux</p>
            </div>
            <div className="border border-rockHighlight/50 bg-carvedRock/30 p-6 backdrop-blur-sm">
              <h3 className="font-hud text-lg text-accentGold">Specializations</h3>
              <p className="mt-2 font-mono text-sm text-stoneWhite/80">ML, Deep Learning, Quantum ML, Game Dev, Embedded Systems, Formal Methods, QA</p>
            </div>
            <div className="border border-rockHighlight/50 bg-carvedRock/30 p-6 backdrop-blur-sm md:col-span-2">
              <h3 className="font-hud text-lg text-accentGold">Tools & Frameworks</h3>
              <p className="mt-2 font-mono text-sm text-stoneWhite/80">
                PennyLane, k6, Locust, PyTest, Selenium, Postman, Figma, NuSMV, HOL4, Proteus, Cisco Packet Tracer,
                AutoCAD, Wireshark, Docker, ELK Stack, Supabase, Unity
              </p>
            </div>
          </div>
        </section>

        <section
          data-section="experience"
          className="relative flex h-screen w-full flex-col justify-center px-6 md:px-20"
        >
          <h2 className="font-heading text-4xl font-bold text-stoneWhite md:text-6xl">Tablets of Trial</h2>
          <div className="mt-10 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border-l-4 border-accentGold bg-carvedRock/20 p-8 backdrop-blur-sm">
              <h3 className="font-hud text-xl text-stoneWhite">AI-SOAR Developer Intern</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 font-mono text-sm text-stoneWhite/80">
                <li>Built a DL trio engine (FCNN, CNN, LSTM) for cybersecurity data.</li>
                <li>Worked with Docker, ELK Stack, and CTI reports.</li>
                <li>Repo: github.com/ali-320/AI_SOAR_1</li>
              </ul>
            </div>
            <div className="border-l-4 border-steelBlue bg-carvedRock/20 p-8 backdrop-blur-sm">
              <h3 className="font-hud text-xl text-stoneWhite">M-labs Game Development Intern</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 font-mono text-sm text-stoneWhite/80">
                <li>Implemented game logic and mechanics.</li>
                <li>Developed an independent 2D stickman story game in Unity.</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          data-section="projects"
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center"
        >
          <div
            className={`transition-all duration-700 ${
              isRealm || isDetail ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
            }`}
          >
            <h2 className="font-heading text-4xl font-bold text-stoneWhite md:text-6xl">The Relic Gallery</h2>
            <p className="mt-4 max-w-2xl font-mono text-sm text-stoneWhite/70 md:text-base">
              Step into the realm where each artifact holds a project.
            </p>
            <button
              onClick={enterRealm}
              className="pointer-events-auto mt-8 border border-accentGold/50 bg-accentGold/10 px-8 py-3 font-hud uppercase tracking-widest text-accentGold transition-all hover:bg-accentGold hover:text-stoneBlack"
            >
              Enter the Project Realm
            </button>
          </div>

          <div
            className={`pointer-events-none mt-8 text-xs text-stoneWhite/40 transition-opacity duration-700 ${
              isRealm || isDetail ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Use the 3D scene behind this overlay
          </div>
        </section>

        <section
          data-section="honors"
          className="relative flex h-screen w-full flex-col justify-center px-6 md:px-20"
        >
          <h2 className="font-heading text-4xl font-bold text-stoneWhite md:text-6xl">Stele of Virtue</h2>
          <div className="mt-10 max-w-4xl space-y-6">
            <div className="border-b border-rockHighlight/50 py-4">
              <h3 className="font-hud text-xl text-accentGold">Research</h3>
              <p className="mt-2 font-mono text-sm text-stoneWhite/80">
                Dark Energy research for the Breakthrough Junior Challenge; theoretical physics (4th dimension).
              </p>
            </div>
            <div className="border-b border-rockHighlight/50 py-4">
              <h3 className="font-hud text-xl text-accentGold">Leadership</h3>
              <p className="mt-2 font-mono text-sm text-stoneWhite/80">Computer Lab Manager — appointed for technical expertise.</p>
            </div>
            <div className="border-b border-rockHighlight/50 py-4">
              <h3 className="font-hud text-xl text-accentGold">Languages</h3>
              <p className="mt-2 font-mono text-sm text-stoneWhite/80">English, Urdu, Punjabi</p>
            </div>
          </div>
        </section>

        <section
          data-section="contact"
          className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="font-heading text-4xl font-bold text-stoneWhite md:text-6xl">Forge a Connection</h2>
          <div className="mt-10 flex flex-col items-center gap-4 font-mono text-sm text-stoneWhite/80">
            <a href="mailto:mhali.bese23seecs@seecs.edu.pk" className="pointer-events-auto hover:text-accentGold transition-colors">
              mhali.bese23seecs@seecs.edu.pk
            </a>
            <a href="mailto:ha0407351@gmail.com" className="pointer-events-auto hover:text-accentGold transition-colors">
              ha0407351@gmail.com
            </a>
            <a href="tel:+923229053561" className="pointer-events-auto hover:text-accentGold transition-colors">
              +92 322-9053561
            </a>
            <a href="https://github.com/ali-320" target="_blank" rel="noreferrer" className="pointer-events-auto hover:text-accentGold transition-colors">
              github.com/ali-320
            </a>
          </div>
        </section>
      </main>
      <GameMenu />
    </div>
  )
}

export default App
