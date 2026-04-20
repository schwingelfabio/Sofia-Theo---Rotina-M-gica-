import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, PresentationControls, useAnimations } from '@react-three/drei';
import { NPCDefinition } from './npcRegistry';

interface NPCProps {
  definition: NPCDefinition;
  position: [number, number, number];
  modelUrl: string;
}

export const NPC: React.FC<NPCProps> = ({ definition, position, modelUrl }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Tenta disparar animação padrão se disponível
    if (actions && actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  return (
    <group ref={groupRef} position={position}>
          {/* Indicador VIP ou Trial */}
        {(userProfile.isVip || remainingTrialDays > 0) && (
            <Text position={[0, 3, 0]} fontSize={0.5}>👑</Text>
        )}
      
      <primitive object={scene} scale={1.5} />
      
      <Text position={[0, 2.2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {definition.name}
      </Text>
    </group>
  );
};
// Nota: Certifique-se de pré-carregar os modelos no App.tsx ou via Suspense para evitar stuttering.
