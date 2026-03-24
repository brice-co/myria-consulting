'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
        <lineBasicMaterial color="#8b5cf6" />
      </lineSegments>
    </mesh>
  );
};

export default function Scene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const config = {
    cubeCount: isMobile ? 8 : 20,
    spread: isMobile ? 10 : 30,
    cubeSize: isMobile ? 0.5 : 0.8,
    cameraPosition: isMobile ? [5, 8, 10] : [10, 15, 20],
    fov: isMobile ? 70 : 50,
  };

  const cubePositions = useMemo(() => (
    Array.from({ length: config.cubeCount }, () => ([
      (Math.random() - 0.5) * config.spread,
      0.5,
      (Math.random() - 0.5) * config.spread,
    ] as [number, number, number]))
  ), [config.cubeCount, config.spread]);

  return (
    <Canvas camera={{ position: config.cameraPosition as [number, number, number], fov: config.fov }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={1} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={isMobile ? 0.3 : 0.5}
      />

      <gridHelper args={[config.spread * 2, 20, '#444', '#444']} />

      {cubePositions.map((pos, i) => (
        <AnimatedCube key={i} position={pos} size={config.cubeSize} />
      ))}
    </Canvas>
  );
}