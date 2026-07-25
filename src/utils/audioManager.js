import { useAudioStore } from '../store/audioStore'

class AudioManager {
  constructor() {
    this.context = null
    this.audio = null
    this.analyser = null
    this.dataArray = null
    this.source = null
    this.url = null
  }

  setup(url) {
    if (this.context) return
    this.url = url
    this.audio = new Audio(url)
    this.audio.crossOrigin = 'anonymous'
    this.audio.loop = true
    this.audio.volume = 0.5

    this.audio.addEventListener('error', () => {
      // eslint-disable-next-line no-console
      console.error('[AudioManager] Failed to load audio:', url)
      useAudioStore.getState().setLoadError('Could not load audio. Try a direct .mp3 host.')
    })

    this.audio.addEventListener('canplaythrough', () => {
      useAudioStore.getState().clearLoadError()
    })

    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)()
      this.analyser = this.context.createAnalyser()
      this.analyser.fftSize = 64
      this.analyser.smoothingTimeConstant = 0.8
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)

      this.source = this.context.createMediaElementSource(this.audio)
      this.source.connect(this.analyser)
      this.analyser.connect(this.context.destination)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[AudioManager] Web Audio API setup failed:', err)
      useAudioStore.getState().setLoadError('Web Audio API setup failed.')
    }
  }

  async playUnmuted() {
    if (!this.context) return Promise.reject(new Error('Audio not set up'))
    if (this.context.state === 'suspended') {
      await this.context.resume()
    }
    this.audio.muted = false
    await this.audio.play()
  }

  play() {
    if (!this.context) return
    if (this.context.state === 'suspended') {
      this.context.resume()
    }
    this.audio?.play().catch(() => {})
  }

  pause() {
    this.audio?.pause()
  }

  setMuted(muted) {
    if (this.audio) {
      this.audio.muted = muted
    }
  }

  getAverageFrequency() {
    if (!this.analyser || !this.dataArray) return 0
    this.analyser.getByteFrequencyData(this.dataArray)
    let sum = 0
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i]
    }
    return sum / this.dataArray.length / 255
  }
}

export const audioManager = new AudioManager()
