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

function Boulder({ project, index, total }) {
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
  const setActiveProject = useScrollStore((s) => s.setActiveProject)
  const activeProject = useScrollStore((s) => s.activeProject)

  const angle = (index / (total - 1)) * Math.PI - Math.PI / 2
  const radius = 9
  const targetPos = useMemo(
    () => new THREE.Vector3(Math.sin(angle) * radius, -1, Math.cos(angle) * radius - 4),
    [angle]
  )

  useEffect(() => {
    if (!activeProject) {
      setBroken(false)
    }
  }, [activeProject])

  useFrame((state) => {
    if (!groupRef.current || !fragmentsRef.current) return
    const t = state.clock.getElapsedTime()

    if (!broken) {
      groupRef.current.visible = true
      fragmentsRef.current.visible = false
      groupRef.current.rotation.y += 0.003
      groupRef.current.position.y = targetPos.y + Math.sin(t * 1.5 + index) * 0.1
      groupRef.current.scale.setScalar(hovered ? 1.1 : 1 + Math.sin(t * 2 + index) * 0.015)

      fragmentsRef.current.children.forEach((mesh, i) => {
        const frag = fragmentState[i]
        if (!frag) return
        mesh.position.copy(frag.position)
        mesh.rotation.copy(frag.rotation)
      })
    } else {
      groupRef.current.visible = false
      fragmentsRef.current.visible = true
      fragmentsRef.current.children.forEach((mesh, i) => {
        const frag = fragmentState[i]
        if (!frag) return
        frag.velocity.multiplyScalar(0.95)
        mesh.position.add(frag.velocity.clone().multiplyScalar(0.02))
        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.015
      })
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    if (!broken) {
      fragmentState.forEach((frag) => {
        frag.position.set(0, 0, 0)
        frag.velocity.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3 + 1,
          (Math.random() - 0.5) * 3
        )
      })
      setBroken(true)
      setActiveProject(project)
    }
  }

  return (
    <group position={targetPos}>
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
            emissiveIntensity={hovered ? 0.25 : 0.08}
          />
        </mesh>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color="#B8860B" transparent opacity={hovered ? 0.6 : 0.3} />
        </lineSegments>
        {!broken && (
          <Html distanceFactor={15} position={[0, 1.8, 0]} center>
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
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function ProjectBoulders() {
  return (
    <>
      {projects.map((project, i) => (
        <Boulder key={project.id} project={project} index={i} total={projects.length} />
      ))}
    </>
  )
}
