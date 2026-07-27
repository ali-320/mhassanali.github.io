import { useScrollStore } from '../store/scrollStore'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tools and Frameworks' },
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'honors', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function NavBar() {
  const currentSection = useScrollStore((s) => s.currentSection)
  const projectsMode = useScrollStore((s) => s.projectsMode)
  const lenisRef = useScrollStore((s) => s.lenisRef)
  const exitRealm = useScrollStore((s) => s.exitRealm)

  const handleClick = (sectionId) => (e) => {
    e.preventDefault()
    const wasInRealm = projectsMode !== 'normal'
    if (wasInRealm) {
      exitRealm()
    }

    const target = document.querySelector(`[data-section="${sectionId}"]`)
    if (!target) return

    const scroll = () => {
      if (lenisRef && lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: 0, duration: 1.5 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    if (wasInRealm) {
      requestAnimationFrame(scroll)
    } else {
      scroll()
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-auto fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ol className="flex flex-col items-end gap-5" role="list">
        {sections.map((section) => {
          const isActive = currentSection === section.id
          const labelClasses = isActive
            ? 'font-hud text-xs uppercase tracking-widest text-accentGold transition-colors duration-300'
            : 'font-hud text-xs uppercase tracking-widest text-stoneWhite/60 transition-colors duration-300 group-hover:text-stoneWhite'
          const dotClasses = isActive
            ? 'bg-accentGold'
            : 'bg-transparent'

          return (
            <li key={section.id} className="group relative flex items-center justify-end gap-4">
              <span className={labelClasses}>
                {section.label}
              </span>
              <button
                onClick={handleClick(section.id)}
                className="relative h-4 w-4 rounded-full border-2 border-rockHighlight/60 bg-stoneBlack/60 transition-all duration-300 hover:border-accentGold hover:bg-accentGold focus:outline-none focus-visible:ring-2 focus-visible:ring-accentGold/70"
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className={`absolute inset-0.5 rounded-full transition-all duration-300 ${dotClasses}`} />
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
