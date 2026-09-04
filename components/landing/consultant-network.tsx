'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import * as THREE from 'three'

const nodes = [
  { position: [-1.65, 0.65, 0] as [number, number, number], color: '#d29a4a', label: 'Strategy' },
  { position: [1.6, 0.85, -0.1] as [number, number, number], color: '#84a6a0', label: 'Operations' },
  { position: [1.35, -0.95, 0.15] as [number, number, number], color: '#b8c5c2', label: 'Systems' },
  { position: [-1.35, -0.9, -0.1] as [number, number, number], color: '#6f8f8b', label: 'People' },
]

function Network() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.08
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.16) * 0.035
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
        <mesh>
          <icosahedronGeometry args={[0.72, 2]} />
          <meshStandardMaterial color="#f6f0e6" roughness={0.25} metalness={0.15} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial color="#d29a4a" emissive="#8f6229" emissiveIntensity={0.3} roughness={0.35} />
        </mesh>
      </Float>

      {nodes.map((node) => (
        <group key={node.label} position={node.position}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh>
              <sphereGeometry args={[0.13, 24, 24]} />
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.18} />
            </mesh>
          </Float>
        </group>
      ))}

      {nodes.map((node) => (
        <Line key={`line-${node.label}`} points={[[0, 0, 0], node.position]} color="#c5a26e" transparent opacity={0.55} lineWidth={1} />
      ))}
      <Line points={[nodes[0].position, nodes[1].position, nodes[2].position, nodes[3].position, nodes[0].position]} color="#7c9992" transparent opacity={0.35} lineWidth={1} />
    </group>
  )
}

export function ConsultantNetwork() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
      className="relative h-[360px] w-full overflow-hidden rounded-[2rem] border border-border bg-background shadow-xl shadow-foreground/5 md:h-[500px]"
      aria-label="Animated virtual consultant network"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(210,154,74,0.12),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.7),transparent_55%)]" />
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5.8]} fov={42} />
        <ambientLight intensity={1.7} />
        <pointLight position={[2, 3, 4]} intensity={18} color="#f5d6a1" />
        <pointLight position={[-3, -1, 2]} intensity={10} color="#89aaa3" />
        <Network />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
      </Canvas>
      <div className="absolute left-6 top-6 max-w-[190px] text-foreground md:left-8 md:top-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Myria intelligence layer</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">One virtual consulting team. Every angle of the problem, connected.</p>
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
        <span className="font-serif text-2xl text-foreground md:text-3xl">The virtual partner</span>
        <span className="rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Live system map</span>
      </div>
    </motion.div>
  )
}
