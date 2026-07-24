import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  progress: 0,
  currentSection: 'hero',
  activeProject: null,
  setProgress: (p) => set({ progress: p }),
  setCurrentSection: (s) => set({ currentSection: s }),
  setActiveProject: (project) => set({ activeProject: project }),
  clearActiveProject: () => set({ activeProject: null }),
}))
