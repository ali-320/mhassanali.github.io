import { useRef, useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '../store/scrollStore'
import Monolith from './Monolith'
import ProjectBoulders from './RockBoulder'
import DustParticles from './DustParticles'

function StonePillar({ position, height, color }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.05
  })
  return (
    <mesh ref={ref} position={position} castShadow receiveShadow raycast={null}>
      <cylinderGeometry args={[0.4, 0.5, height, 8]} />
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
    </mesh>
  )
}

function StoneFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow raycast={null}>
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial color="#0B0C0E" roughness={1} metalness={0} />
    </mesh>
  )
}

export default function Scene3D() {
  const { camera, gl } = useThree()
  const progress = useScrollStore((s) => s.progress)
  const currentSection = useScrollStore((s) => s.currentSection)
  const projectsMode = useScrollStore((s) => s.projectsMode)
  const selectedProject = useScrollStore((s) => s.selectedProject)
  const boulderRotation = useScrollStore((s) => s.boulderRotation)
  const rotateBoulders = useScrollStore((s) => s.rotateBoulders)
  const targetCamera = useRef(new THREE.Vector3(0, 0, 12))
  const currentCameraTarget = useRef(new THREE.Vector3(0, 0, 0))

  const pillars = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        position: [
          (Math.random() - 0.5) * 40,
          -3.5 + Math.random() * 1.5,
          (Math.random() - 0.5) * 30 - 10,
        ],
        height: 3 + Math.random() * 5,
        color: Math.random() > 0.5 ? '#2C2E33' : '#3A3D42',
      })),
    []
  )

  useEffect(() => {
    const section = currentSection
    switch (section) {
      case 'hero':
        targetCamera.current.set(0, 0, 12)
        currentCameraTarget.current.set(0, 0, 0)
        break
      case 'about':
        targetCamera.current.set(5, 0, 10)
        currentCameraTarget.current.set(0, 0, 0)
        break
      case 'skills':
        targetCamera.current.set(-5, 1, 9)
        currentCameraTarget.current.set(0, 0, 0)
        break
      case 'experience':
        targetCamera.current.set(4, 0, 10)
        currentCameraTarget.current.set(0, 0, 0)
        break
      case 'projects':
        targetCamera.current.set(0, 0, 14)
        currentCameraTarget.current.set(0, 0, 0)
        break
      case 'honors':
        targetCamera.current.set(-3, 0, 11)
        currentCameraTarget.current.set(0, 0, 0)
        break
      case 'contact':
        targetCamera.current.set(0, 0, 10)
        currentCameraTarget.current.set(0, 0, 0)
        break
      default:
        targetCamera.current.set(0, 0, 12)
        currentCameraTarget.current.set(0, 0, 0)
    }
  }, [currentSection])

  useEffect(() => {
    const canvas = gl.domElement
    const handleWheel = (e) => {
      if (projectsMode === 'realm') {
        e.preventDefault()
        rotateBoulders(e.deltaY * 0.001)
      }
    }
    canvas.addEventListener('wheel', handleWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', handleWheel)
  }, [gl.domElement, projectsMode, rotateBoulders])

  useFrame((state) => {
    let desired = targetCamera.current.clone()

    if (projectsMode === 'realm') {
      desired.set(0, 3, 18)
    } else if (projectsMode === 'detail' && selectedProject) {
      desired.set(0, 1, 10)
    }

    const horizontal = Math.sin(progress * Math.PI * 2) * 2
    const vertical = Math.cos(progress * Math.PI * 1.5) * 1
    desired.x += horizontal
    desired.y += vertical
    camera.position.lerp(desired, 0.03)
    camera.lookAt(currentCameraTarget.current)
  })

  return (
    <>
      <StoneFloor />
      <DustParticles count={500} />
      <Monolith />
      {pillars.map((p, i) => (
        <StonePillar key={i} position={p.position} height={p.height} color={p.color} />
      ))}
      <ProjectBoulders mode={projectsMode} rotation={boulderRotation} selectedProject={selectedProject} />
    </>
  )
}
