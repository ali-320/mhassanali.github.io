import { useEffect, useRef } from 'react'
import { useScrollStore } from '../store/scrollStore'
import { ExternalLink, Github, Cpu, Radio, ArrowLeft } from 'lucide-react'

export default function GameMenu() {
  const selectedProject = useScrollStore((s) => s.selectedProject)
  const closeProject = useScrollStore((s) => s.closeProject)
  const overlayRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeProject()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeProject])

  // Stop wheel events from reaching Lenis so the menu can scroll
  useEffect(() => {
    const node = overlayRef.current
    if (!node) return
    const handleWheel = (e) => {
      e.stopPropagation()
    }
    node.addEventListener('wheel', handleWheel, { passive: true, capture: true })
    return () => node.removeEventListener('wheel', handleWheel, { capture: true })
  }, [selectedProject])

  if (!selectedProject) return null

  return (
    <div
      key={selectedProject.id}
      ref={overlayRef}
      className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-stoneBlack/92 p-2 scanlines backdrop-blur-sm sm:p-4"
      onClick={() => closeProject()}
      role="dialog"
      aria-modal="true"
      aria-label={`Project ${selectedProject.title}`}
    >
      <div
        className="relative z-10 max-h-[calc(100dvh-1rem)] w-full max-w-5xl min-w-0 overflow-y-auto overscroll-contain border border-accentGold/50 bg-stoneBlack/95 p-4 shadow-[0_0_60px_rgba(184,134,11,0.15)] sm:max-h-[90vh] sm:p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="hud-corner absolute inset-0" />

        <div className="mb-6 flex flex-col items-start gap-4 sm:mb-8 sm:flex-row sm:justify-between">
          <div>
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <Cpu className="h-5 w-5 text-accentGold" />
              <span className="font-hud text-xs tracking-[0.3em] text-steelBlue">
                {selectedProject.category}
              </span>
            </div>
            <h2 className="mt-2 break-words font-heading text-2xl font-bold text-stoneWhite sm:text-3xl md:text-5xl">
              {selectedProject.title}
              <span className="animate-blink text-accentGold">_</span>
            </h2>
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => closeProject()}
              className="relative z-20 flex min-h-11 items-center gap-2 border border-rockHighlight px-3 py-2 font-hud text-[11px] uppercase tracking-widest text-stoneWhite transition-colors hover:border-accentGold hover:text-accentGold sm:text-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Relics
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div
              className="flex aspect-square w-full items-center justify-center border border-rockHighlight bg-carvedRock/20 p-4 sm:p-8"
              style={{ boxShadow: `0 0 40px ${selectedProject.color}20` }}
            >
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-stoneWhite/20 font-hud text-3xl font-bold text-stoneWhite sm:h-32 sm:w-32 sm:text-4xl"
                style={{ backgroundColor: selectedProject.color + '20', borderColor: selectedProject.color }}
              >
                {selectedProject.title.charAt(0)}
              </div>
            </div>
            <div className="font-mono text-[11px] text-stoneWhite/50 sm:text-xs">
              <p>&gt; initializing project_module...</p>
              <p>&gt; loading repo_index...</p>
              <p className="text-accentGold" style={{ color: selectedProject.color }}>
                &gt; loaded {selectedProject.id}.bundle
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
            <div>
              <h3 className="font-hud text-lg text-accentGold">Description</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 font-mono text-xs leading-relaxed text-stoneWhite/80 sm:text-sm">
                {selectedProject.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-hud text-lg text-accentGold">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
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

        <div className="pointer-events-auto mt-8 flex flex-col gap-3 border-t border-rockHighlight/50 pt-5 sm:mt-10 sm:gap-4 sm:pt-6 md:flex-row">
          <a
            href={selectedProject.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto relative z-20 flex min-h-11 flex-1 items-center justify-center gap-2 border border-accentGold/50 bg-accentGold/10 py-3 font-hud text-xs uppercase tracking-wider text-accentGold transition-all hover:bg-accentGold hover:text-stoneBlack sm:text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-4 w-4" />
            Repository
          </a>
          {selectedProject.deployment ? (
            <a
              href={selectedProject.deployment}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto relative z-20 flex min-h-11 flex-1 items-center justify-center gap-2 border border-steelBlue/50 bg-steelBlue/10 py-3 font-hud text-xs uppercase tracking-wider text-steelBlue transition-all hover:bg-steelBlue hover:text-stoneBlack sm:text-sm"
              onClick={(e) => e.stopPropagation()}
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
