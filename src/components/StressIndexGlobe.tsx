import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface StressIndexGlobeProps {
  regulationIndex: number; // 0 a 100
}

export const StressIndexGlobe: React.FC<StressIndexGlobeProps> = ({ regulationIndex }) => {
  const meshRef = useRef<Mesh>(null!);
  
  // Mapeamento de cor: Vermelho (crise) -> Amarelo -> Verde (estável)
  const color = regulationIndex < 50 ? '#FF4747' : regulationIndex < 80 ? '#FFD700' : '#00A0A0';

  useFrame((state) => {
    // Rotação suave espacial
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    // Pulsação sutil se o stress estiver alto
    if (regulationIndex < 50) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
    </mesh>
  );
};
