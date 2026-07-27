import { useEffect, useState, useRef } from 'react'
import { useAudioStore } from '../store/audioStore'
import { analyzeAudio } from '../utils/audioAnalyzer'
import { audioManager } from '../utils/audioManager'

const MUSIC_URL = 'https://raw.githubusercontent.com/ali-320/resources-websites/main/Kari_Sigurdsson_-_Skyline__Epic_Modern_Heroic_Hybrid_(256k).mp3'

const MESSAGES = [
  'Loading the website',
  'Configuring the space',
  'Setting up the projects',
  'Enabling music',
]

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showEnter, setShowEnter] = useState(false)
  const setAudioData = useAudioStore((s) => s.setAudioData)
  const setLoading = useAudioStore((s) => s.setLoading)
  const setLoadError = useAudioStore((s) => s.setLoadError)
  const setMuted = useAudioStore((s) => s.setMuted)
  const analysisRef = useRef(null)

  // Fetch and analyze the audio offline during the loading screen
  useEffect(() => {
    let cancelled = false
    analyzeAudio(MUSIC_URL)
      .then((data) => {
        if (!cancelled) {
          analysisRef.current = data
          setAudioData(data)
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[LoadingScreen] Audio analysis failed:', err)
        if (!cancelled) {
          setLoadError('Could not analyze audio. Music will not play.')
        }
      })
    return () => {
      cancelled = true
    }
  }, [setAudioData, setLoadError])

  // Cycle through loading messages every 800ms
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((idx) => (idx + 1) % MESSAGES.length)
    }, 800)
    return () => clearInterval(messageInterval)
  }, [])

  // Progress bar: 3–5 seconds total
  useEffect(() => {
    const duration = 4000
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (duration / 50)
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        return next
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Show the enter button once progress is complete
  useEffect(() => {
    if (progress < 100) return

    const timer = setTimeout(() => {
      setShowEnter(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [progress])

  const handleEnter = () => {
    setVisible(false)
    setLoading(false)

    // Setup and start playback from a user gesture
    audioManager.setup(MUSIC_URL)
    audioManager
      .playUnmuted()
      .then(() => {
        setMuted(false)
      })
      .catch(() => {
        setMuted(true)
        setLoadError('Autoplay blocked. Click the mute button to enable music.')
      })

    onComplete?.()
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-stoneBlack text-stoneWhite">
      <div className="scanlines absolute inset-0 opacity-20" />
      <h1 className="font-heading text-4xl font-bold tracking-widest md:text-6xl">
        Muhammad Hassan Ali
      </h1>
      <p className="mt-4 font-hud text-sm uppercase tracking-[0.4em] text-steelBlue md:text-base">
        {MESSAGES[messageIndex]}
        <span className="animate-blink text-accentGold">_</span>
      </p>
      {showEnter ? (
        <button
          onClick={handleEnter}
          className="mt-8 border border-accentGold/50 bg-stoneBlack/80 px-8 py-3 font-hud text-sm uppercase tracking-widest text-accentGold backdrop-blur-sm transition-all hover:bg-accentGold hover:text-stoneBlack focus:outline-none focus:ring-2 focus:ring-accentGold/50"
          autoFocus
        >
          Click to Enter
        </button>
      ) : (
        <div className="mt-8 h-1 w-64 overflow-hidden border border-rockHighlight/50 bg-carvedRock/30 md:w-96">
          <div
            className="h-full bg-accentGold transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
