// Ref-based store for high-frequency boulder rotation updates
// This avoids React re-renders on every wheel event

let targetRotation = 0
let currentRotation = 0
const listeners = new Set()

export const boulderStore = {
  getRotation: () => currentRotation,
  getTargetRotation: () => targetRotation,
  
  setTargetRotation: (value) => {
    targetRotation = value
    listeners.forEach((fn) => fn())
  },
  
  addRotation: (delta) => {
    targetRotation += delta
    listeners.forEach((fn) => fn())
  },
  
  // Called in useFrame to smoothly interpolate
  update: (lerpFactor = 0.08) => {
    const diff = targetRotation - currentRotation
    if (Math.abs(diff) > 0.0001) {
      currentRotation += diff * lerpFactor
      return true // still animating
    }
    currentRotation = targetRotation
    return false // settled
  },
  
  reset: () => {
    targetRotation = 0
    currentRotation = 0
  },
  
  subscribe: (fn) => {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}
