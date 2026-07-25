import { useAudioStore } from '../store/audioStore'
import { audioManager } from '../utils/audioManager'
import { Volume2, VolumeX, AlertCircle } from 'lucide-react'

// Google Drive shared file link converted to a direct-ish download endpoint.
// Note: Google Drive may still block cross-origin streaming (CORS). If playback fails,
// host the .mp3 on a service that serves files directly (Google Cloud Storage, GitHub raw, etc.).
const MUSIC_URL = 'https://drive.google.com/uc?id=1f0CXFtgBJ2K5EpIjVhcLj_ZpCCjoeduZ&export=download'

export default function AudioToggle() {
  const { isMuted, isInitialized, loadError, toggleMute, clearLoadError } = useAudioStore()

  const handleClick = () => {
    if (!isInitialized) {
      audioManager.setup(MUSIC_URL)
    }

    const nextMuted = !isMuted
    if (nextMuted) {
      audioManager.pause()
    } else {
      audioManager.play()
    }
    toggleMute()
  }

  return (
    <div className="pointer-events-auto fixed right-6 top-6 z-50 flex flex-col items-end gap-2">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 border border-accentGold/50 bg-stoneBlack/80 px-4 py-2 font-hud text-xs uppercase tracking-widest text-accentGold backdrop-blur-sm transition-all hover:bg-accentGold hover:text-stoneBlack"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Mute'}</span>
      </button>
      {loadError && (
        <div
          className="flex max-w-xs items-start gap-2 border border-danger/50 bg-stoneBlack/95 p-2 text-xs text-danger backdrop-blur-sm"
          onClick={() => clearLoadError()}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{loadError}</span>
        </div>
      )}
    </div>
  )
}
