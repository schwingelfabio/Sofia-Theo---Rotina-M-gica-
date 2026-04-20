import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CalmBubble: React.FC<{ active: boolean }> = ({ active }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (active && meshRef.current) {
        meshRef.current.scale.setScalar(Math.sin(state.clock.elapsedTime * 2) * 0.2 + 2);
    }
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#88CCFF" transparent opacity={0.3} emissive="#88CCFF" emissiveIntensity={0.5} />
    </mesh>
  );
};
