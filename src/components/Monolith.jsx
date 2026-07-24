import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollStore } from '../store/scrollStore'
import * as THREE from 'three'

export default function Monolith() {
  const ref = useRef()
  const progress = useScrollStore((s) => s.progress)

  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(2.5, 6, 1.2, 4, 8, 4)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      pos.setX(i, x + (Math.random() - 0.5) * 0.12)
      pos.setY(i, y + (Math.random() - 0.5) * 0.12)
      pos.setZ(i, z + (Math.random() - 0.5) * 0.12)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = Math.sin(t * 0.15) * 0.08 + progress * Math.PI * 0.35
    ref.current.rotation.z = Math.sin(t * 0.1) * 0.015
    ref.current.position.y = Math.sin(t * 0.25) * 0.1 - 1
  })

  return (
    <mesh ref={ref} geometry={geometry} position={[0, -1, 0]} castShadow receiveShadow>
      <meshStandardMaterial
        color="#2C2E33"
        roughness={0.9}
        metalness={0.1}
        emissive="#0B0C0E"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}
