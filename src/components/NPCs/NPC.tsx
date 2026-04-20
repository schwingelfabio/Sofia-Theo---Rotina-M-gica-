import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, useAnimations } from '@react-three/drei';
import { NPCDefinition } from './npcRegistry';
import { useWorldStore } from '../../state/useWorldStore';

interface NPCProps {
  definition: NPCDefinition;
  position: [number, number, number];
  modelUrl: string;
}

export const NPC: React.FC<NPCProps> = ({ definition, position, modelUrl }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, groupRef);
  const { userProfile } = useWorldStore();

  const trialStart = userProfile.trialStartDate ? new Date(userProfile.trialStartDate).getTime() : 0;
  const remainingTrialDays = Math.max(0, 3 - (Date.now() - trialStart) / (1000 * 60 * 60 * 24));

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
