import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedCube = ({ position, size }: { position: [number, number, number]; size: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * 0.5;
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#38bdf8" metalness={0.4} roughness={0.3} />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
        <lineBasicMaterial color="#0ea5e9" />
      </lineSegments>
    </mesh>
  );
};

export default function Scene() {
  const isMobile = useIsMobile();

  const config = useMemo(() => ({
    cubeCount: isMobile ? 8 : 20,
    spread: isMobile ? 8 : 30,
    cubeSize: isMobile ? 0.4 : 0.8,
    cameraPosition: (isMobile ? [4, 6, 8] : [10, 15, 20]) as [number, number, number],
    fov: isMobile ? 75 : 50,
  }), [isMobile]);

  const cubePositions = useMemo(() => (
    Array.from({ length: config.cubeCount }, () => ([
      (Math.random() - 0.5) * config.spread,
      0.5,
      (Math.random() - 0.5) * config.spread,
    ] as [number, number, number]))
  ), [config.cubeCount, config.spread]);

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        shadows
        camera={{ position: config.cameraPosition, fov: config.fov }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        <gridHelper args={[isMobile ? 12 : 40, isMobile ? 12 : 40, '#1e3a5f', '#0c1929']} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

        {cubePositions.map((pos, i) => (
          <AnimatedCube key={i} position={pos} size={config.cubeSize} />
        ))}
      </Canvas>
    </div>
  );
}
