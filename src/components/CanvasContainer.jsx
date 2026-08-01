import { Canvas } from '@react-three/fiber'
import Scene3D from './Scene3D'

export default function CanvasContainer() {
  return (
    <div
      className="fixed inset-0 z-0 h-screen w-screen"
      style={{ touchAction: 'pan-y' }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]} resize={{ scroll: false, debounce: { scroll: 50, resize: 100 } }}
      >
        <color attach="background" args={['#0B0C0E']} />
        <fog attach="fog" args={['#0B0C0E', 8, 45]} />
        <ambientLight intensity={0.2} />
        <hemisphereLight color="#8A9CA6" groundColor="#0B0C0E" intensity={0.5} />
        <directionalLight
          position={[8, 12, 8]}
          intensity={1.2}
          color="#FFF8E7"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 5, -10]} color="#B8860B" intensity={0.6} />
        <Scene3D />
      </Canvas>
    </div>
  )
}
