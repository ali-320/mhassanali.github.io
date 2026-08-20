import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  progress: 0,
  currentSection: 'hero',
  projectsMode: 'normal', // 'normal' | 'realm' | 'detail'
  selectedProject: null,
  lenisRef: null,
  setProgress: (p) => set({ progress: p }),
  setCurrentSection: (s) => set({ currentSection: s }),
  setLenisRef: (ref) => set({ lenisRef: ref }),
  enterRealm: () => set({ projectsMode: 'realm', selectedProject: null }),
  exitRealm: () => set({ projectsMode: 'normal', selectedProject: null }),
  openProject: (project) => set({ projectsMode: 'detail', selectedProject: project }),
  closeProject: () => set({ projectsMode: 'realm', selectedProject: null }),
}))
