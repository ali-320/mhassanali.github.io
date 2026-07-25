import { create } from 'zustand'

export const useAudioStore = create((set) => ({
  isMuted: true,
  isInitialized: false,
  loadError: null,
  toggleMute: () =>
    set((state) => {
      const nextMuted = !state.isMuted
      return { isMuted: nextMuted, isInitialized: true }
    }),
  setMuted: (muted) => set({ isMuted: muted, isInitialized: true }),
  setLoadError: (error) => set({ loadError: error }),
  clearLoadError: () => set({ loadError: null }),
}))
