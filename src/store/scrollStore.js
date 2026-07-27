import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  progress: 0,
  currentSection: 'hero',
  projectsMode: 'normal', // 'normal' | 'realm' | 'detail'
  selectedProject: null,
  boulderRotation: 0,
  lenisRef: null,
  setProgress: (p) => set({ progress: p }),
  setCurrentSection: (s) => set({ currentSection: s }),
  setLenisRef: (ref) => set({ lenisRef: ref }),
  enterRealm: () => set({ projectsMode: 'realm', selectedProject: null }),
  exitRealm: () => set({ projectsMode: 'normal', selectedProject: null, boulderRotation: 0 }),
  openProject: (project) => set({ projectsMode: 'detail', selectedProject: project }),
  closeProject: () => set({ projectsMode: 'realm', selectedProject: null }),
  rotateBoulders: (delta) =>
    set((state) => ({ boulderRotation: state.boulderRotation + delta })),
  setBoulderRotation: (value) => set({ boulderRotation: value }),
}))
