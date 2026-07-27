import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '../store/scrollStore'
import { projects } from '../data/content'

const FRAGMENT_COUNT = 40

function createFragments() {
  const fragments = []
  for (let i = 0; i < FRAGMENT_COUNT; i++) {
    fragments.push({
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3 + 1,
        (Math.random() - 0.5) * 3
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: 0.15 + Math.random() * 0.2
    })
  }
  return fragments
}

function Boulder({ project, index, total, mode, ringRotation, selectedProject }) {
  const groupRef = useRef()
  const fragmentsRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [broken, setBroken] = useState(false)
  const fragmentStateRef = useRef(null)
  if (!fragmentStateRef.current) {
    fragmentStateRef.current = createFragments()
  }
  const fragmentState = fragmentStateRef.current
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(1.21, 0)), [])
  const openProject = useScrollStore((s) => s.openProject)
  const selected = selectedProject?.id === project.id

  const baseAngle = (index / total) * Math.PI * 2
  const radius = 6

  useEffect(() => {
    if (mode !== 'detail') {
      setBroken(false)
    }
  }, [mode])

  useEffect(() => {
    if (mode === 'detail' && selected) {
      setBroken(true)
    } else if (!selected) {
      setBroken(false)
    }
  }, [mode, selected])

  useFrame((state) => {
    if (!groupRef.current || !fragmentsRef.current) return
    const t = state.clock.getElapsedTime()

    let x = 0
    let z = 0
    let scale = 1
    let visible = true

    if (mode === 'normal') {
      const angle = (index / (total - 1)) * Math.PI - Math.PI / 2
      const r = 9
      x = Math.sin(angle) * r
      z = Math.cos(angle) * r - 4
    } else if (mode === 'realm') {
      const angle = baseAngle + ringRotation
      x = Math.sin(angle) * radius
      z = Math.cos(angle) * radius
      scale = 1.3
    } else if (mode === 'detail') {
      visible = selected
      if (selected) {
        x = 0
        z = 0
        scale = 2.5
      }
    }

    groupRef.current.visible = visible && !broken
    fragmentsRef.current.visible = visible && broken

    if (visible) {
      groupRef.current.position.x = x
      groupRef.current.position.z = z
      groupRef.current.position.y = Math.sin(t + index) * 0.05
      groupRef.current.rotation.y += 0.003
      groupRef.current.scale.setScalar(hovered && mode === 'realm' ? scale * 1.1 : scale)

      fragmentsRef.current.position.copy(groupRef.current.position)
      fragmentsRef.current.scale.setScalar(scale)
    }

    if (!broken) {
      fragmentsRef.current.children.forEach((mesh, i) => {
        const frag = fragmentState[i]
        if (!frag) return
        mesh.position.copy(frag.position)
        mesh.rotation.copy(frag.rotation)
      })
    } else {
      fragmentsRef.current.children.forEach((mesh, i) => {
        const frag = fragmentState[i]
        if (!frag) return
        frag.velocity.multiplyScalar(0.98)
        mesh.position.add(frag.velocity.clone().multiplyScalar(0.015))
        mesh.rotation.x += 0.015
        mesh.rotation.y += 0.01
      })
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    if (mode === 'realm' && !broken) {
      fragmentState.forEach((frag) => {
        frag.position.set(0, 0, 0)
        frag.velocity.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3 + 1,
          (Math.random() - 0.5) * 3
        )
      })
      setBroken(true)
      openProject(project)
    }
  }

  if (mode === 'detail' && !selected) {
    return <group visible={false} />
  }

  return (
    <group>
      <group
        ref={groupRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#3A3D42"
            roughness={0.95}
            metalness={0.05}
            emissive={project.color}
            emissiveIntensity={hovered && mode === 'realm' ? 0.4 : 0.15}
          />
        </mesh>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color="#B8860B" transparent opacity={hovered && mode === 'realm' ? 0.8 : 0.4} />
        </lineSegments>
        {mode === 'realm' && !broken && (
          <Html distanceFactor={12} position={[0, 1.6, 0]} center>
            <div className="pointer-events-none whitespace-nowrap rounded border border-accentGold/30 bg-stoneBlack/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-stoneWhite/90">
              {project.title}
            </div>
          </Html>
        )}
      </group>

      <group ref={fragmentsRef} visible={false}>
        {fragmentState.map((frag, i) => (
          <mesh key={i} position={frag.position} rotation={frag.rotation} scale={frag.scale}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#3A3D42"
              roughness={0.9}
              metalness={0.1}
              emissive={project.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function ProjectBoulders({ mode, rotation, selectedProject }) {
  return (
    <>
      {projects.map((project, i) => (
        <Boulder
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          mode={mode}
          ringRotation={rotation}
          selectedProject={selectedProject}
        />
      ))}
    </>
  )
}
