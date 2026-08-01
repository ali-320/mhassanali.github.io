import { useAudioStore } from '../store/audioStore'
import { audioManager } from '../utils/audioManager'
import { Volume2, VolumeX, AlertCircle } from 'lucide-react'

const MUSIC_URL = 'https://raw.githubusercontent.com/ali-320/resources-websites/main/Kari_Sigurdsson_-_Skyline__Epic_Modern_Heroic_Hybrid_(256k).mp3'

export default function AudioToggle() {
  const { isMuted, isInitialized, loadError, toggleMute, clearLoadError } = useAudioStore()

  const handleClick = () => {
    if (!isInitialized) {
      audioManager.setup(MUSIC_URL)
    }

    const nextMuted = !isMuted
    audioManager.setMuted(nextMuted)
    if (nextMuted) {
      audioManager.pause()
    } else {
      audioManager.play()
    }
    toggleMute()
  }

  return (
    <div className="pointer-events-auto fixed right-4 top-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:right-6 sm:top-6">
      <button
        onClick={handleClick}
        className="flex min-h-11 items-center gap-2 border border-accentGold/50 bg-stoneBlack/80 px-3 py-2 font-hud text-[11px] uppercase tracking-widest text-accentGold backdrop-blur-sm transition-all hover:bg-accentGold hover:text-stoneBlack sm:px-4 sm:text-xs"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Mute'}</span>
      </button>
      {loadError && (
        <div
          className="flex max-w-[calc(100vw-2rem)] items-start gap-2 border border-danger/50 bg-stoneBlack/95 p-2 text-xs text-danger backdrop-blur-sm"
          onClick={() => clearLoadError()}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{loadError}</span>
        </div>
      )}
    </div>
  )
}
