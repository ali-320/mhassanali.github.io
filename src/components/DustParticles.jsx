import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAudioStore } from '../store/audioStore'
import { getAmplitudeAtTime } from '../utils/audioAnalyzer'
import { audioManager } from '../utils/audioManager'

export default function DustParticles({ count = 600 }) {
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
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005,
      })
    }
    return [pos, vel]
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const currentTime = audioManager.audio?.currentTime ?? 0
    const amplitude = isMuted ? 0 : getAmplitudeAtTime(audioData, currentTime)
    const amplifier = 1 + amplitude * 4
    const pos = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += (velocities[i].x + Math.sin(t * 0.2 + i) * 0.002) * amplifier
      pos[i * 3 + 1] += (velocities[i].y + Math.cos(t * 0.15 + i) * 0.002) * amplifier
      pos[i * 3 + 2] += velocities[i].z * amplifier
      if (pos[i * 3 + 1] > 25) pos[i * 3 + 1] = -20
      if (pos[i * 3 + 1] < -25) pos[i * 3 + 1] = 20
      if (pos[i * 3] > 30) pos[i * 3] = -30
      if (pos[i * 3] < -30) pos[i * 3] = 30
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true

    const material = meshRef.current.material
    if (material) {
      material.size = 0.08 + amplitude * 0.08
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
        size={0.08}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}
