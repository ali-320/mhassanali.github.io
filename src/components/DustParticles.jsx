import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAudioStore } from '../store/audioStore'
import { getAmplitudeAtTime } from '../utils/audioAnalyzer'
import { audioManager } from '../utils/audioManager'

export default function DustParticles({ count = 1500 }) {
  const meshRef = useRef()
  const isMuted = useAudioStore((s) => s.isMuted)
  const audioData = useAudioStore((s) => s.audioData)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = []
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
      vel.push({
        x: (Math.random() - 0.5) * 0.006,
        y: (Math.random() - 0.5) * 0.006,
        z: (Math.random() - 0.5) * 0.006,
      })
    }
    return [pos, vel]
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const currentTime = audioManager.audio?.currentTime ?? 0
    const amplitude = isMuted ? 0 : getAmplitudeAtTime(audioData, currentTime)
    const amplifier = 1 + amplitude * 9
    const vibrationBase = 0.025
    const pos = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const vibrateX = Math.sin(t * 1.2 + i * 0.5) * vibrationBase
      const vibrateY = Math.cos(t * 1.1 + i * 0.47) * vibrationBase
      const vibrateZ = Math.sin(t * 1.3 + i * 0.53) * vibrationBase
      pos[i * 3] += (velocities[i].x + vibrateX) * amplifier
      pos[i * 3 + 1] += (velocities[i].y + vibrateY) * amplifier
      pos[i * 3 + 2] += (velocities[i].z + vibrateZ) * amplifier
      if (pos[i * 3 + 1] > 25) pos[i * 3 + 1] = -20
      if (pos[i * 3 + 1] < -25) pos[i * 3 + 1] = 20
      if (pos[i * 3] > 30) pos[i * 3] = -30
      if (pos[i * 3] < -30) pos[i * 3] = 30
      if (pos[i * 3 + 2] > 30) pos[i * 3 + 2] = -30
      if (pos[i * 3 + 2] < -30) pos[i * 3 + 2] = 30
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true

    const material = meshRef.current.material
    if (material) {
      material.size = 0.18 + amplitude * 0.18
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4CFC7"
        size={0.18}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}
