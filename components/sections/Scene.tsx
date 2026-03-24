'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedCube = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * 0.5;
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(0.8, 0.8, 0.8)]} />
        <lineBasicMaterial attach="material" color="#8b5cf6" />
      </lineSegments>
    </mesh>
  );
};

export default function Scene() {
  const cubePositions = useMemo(() => (
    Array.from({ length: 20 }, () => ([
      (Math.random() - 0.5) * 30,
      0.5,
      (Math.random() - 0.5) * 30,
    ] as [number, number, number]))
  ), []);

  return (
    <Canvas camera={{ position: [10, 15, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      <gridHelper args={[60, 60, '#444', '#444']} />
      {cubePositions.map((pos, i) => (
        <AnimatedCube key={i} position={pos} />
      ))}
    </Canvas>
  );
}
