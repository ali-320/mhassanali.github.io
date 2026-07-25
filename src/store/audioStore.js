import { create } from 'zustand'

export const useAudioStore = create((set) => ({
  isMuted: false,
  isInitialized: false,
  loadError: null,
  audioData: null,
  isLoading: true,
  loadingStep: 0,
  toggleMute: () =>
    set((state) => {
      const nextMuted = !state.isMuted
      return { isMuted: nextMuted, isInitialized: true }
    }),
  setMuted: (muted) => set({ isMuted: muted, isInitialized: true }),
  setLoadError: (error) => set({ loadError: error }),
  clearLoadError: () => set({ loadError: null }),
  setAudioData: (data) => set({ audioData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingStep: (step) => set({ loadingStep: step }),
}))
