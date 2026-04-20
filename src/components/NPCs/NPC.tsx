import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, PresentationControls } from '@react-three/drei';
import { NPCDefinition } from './npcRegistry';

interface NPCProps {
  definition: NPCDefinition;
  position: [number, number, number];
  modelUrl: string; // URL do asset 3D gerado/importado
}

export const NPC: React.FC<NPCProps> = ({ definition, position, modelUrl }) => {
  const groupRef = useRef<THREE.Group>(null);
  // O hook useGLTF carrega o asset do modelo 3D
  const { scene } = useGLTF(modelUrl);

  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <PresentationControls polar={[-Math.PI / 4, Math.PI / 4]}>
        <primitive object={scene} scale={1.5} />
      </PresentationControls>
      
      <Text position={[0, 2.2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {definition.name}
      </Text>
    </group>
  );
};
// Nota: Certifique-se de pré-carregar os modelos no App.tsx ou via Suspense para evitar stuttering.
