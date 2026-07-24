import { useEffect, useRef } from 'react'
import { useScrollStore } from '../store/scrollStore'
import { ExternalLink, Github, X, Cpu, Radio } from 'lucide-react'

export default function GameMenu() {
  const activeProject = useScrollStore((s) => s.activeProject)
  const clearActiveProject = useScrollStore((s) => s.clearActiveProject)
  const overlayRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') clearActiveProject()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [clearActiveProject])

  if (!activeProject) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stoneBlack/92 p-4 scanlines backdrop-blur-sm"
      onClick={() => clearActiveProject()}
      role="dialog"
      aria-modal="true"
      aria-label={`Project ${activeProject.title}`}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-accentGold/50 bg-stoneBlack/95 p-6 shadow-[0_0_60px_rgba(184,134,11,0.15)] md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hud-corner absolute inset-0" />

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-accentGold" />
              <span className="font-hud text-xs tracking-[0.3em] text-steelBlue">
                {activeProject.category}
              </span>
            </div>
            <h2 className="mt-2 font-heading text-3xl font-bold text-stoneWhite md:text-5xl">
              {activeProject.title}
              <span className="animate-blink text-accentGold">_</span>
            </h2>
          </div>
          <button
            onClick={() => clearActiveProject()}
            className="border border-rockHighlight p-2 text-stoneWhite transition-colors hover:border-accentGold hover:text-accentGold"
            aria-label="Close project details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left — Icon / Visual */}
          <div className="flex flex-col gap-4">
            <div
              className="flex aspect-square items-center justify-center border border-rockHighlight bg-carvedRock/20 p-8"
              style={{ boxShadow: `0 0 40px ${activeProject.color}20` }}
            >
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-stoneWhite/20 font-hud text-4xl font-bold text-stoneWhite"
                style={{ backgroundColor: activeProject.color + '20', borderColor: activeProject.color }}
              >
                {activeProject.title.charAt(0)}
              </div>
            </div>
            <div className="font-mono text-xs text-stoneWhite/50">
              <p>&gt; initializing project_module...</p>
              <p>&gt; loading repo_index...</p>
              <p className="text-accentGold" style={{ color: activeProject.color }}>
                &gt; loaded {activeProject.id}.bundle
              </p>
            </div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-hud text-lg text-accentGold">Description</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 font-mono text-sm text-stoneWhite/80">
                {activeProject.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-hud text-lg text-accentGold">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-rockHighlight bg-carvedRock/30 px-3 py-1 font-mono text-xs text-stoneWhite/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 flex flex-col gap-4 border-t border-rockHighlight/50 pt-6 md:flex-row">
          <a
            href={activeProject.repo}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-1 items-center justify-center gap-2 border border-accentGold/50 bg-accentGold/10 py-3 font-hud uppercase tracking-wider text-accentGold transition-all hover:bg-accentGold hover:text-stoneBlack"
          >
            <Github className="h-4 w-4" />
            Repository
          </a>
          {activeProject.deployment ? (
            <a
              href={activeProject.deployment}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-1 items-center justify-center gap-2 border border-steelBlue/50 bg-steelBlue/10 py-3 font-hud uppercase tracking-wider text-steelBlue transition-all hover:bg-steelBlue hover:text-stoneBlack"
            >
              <Radio className="h-4 w-4" />
              Deployment
            </a>
          ) : (
            <button
              disabled
              className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 border border-rockHighlight/50 bg-carvedRock/20 py-3 font-hud uppercase tracking-wider text-stoneWhite/40"
            >
              <ExternalLink className="h-4 w-4" />
              No Live Deployment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
