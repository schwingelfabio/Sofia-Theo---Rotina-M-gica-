import * as THREE from 'three';
import React, { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, useAnimations } from '@react-three/drei';
import { NPCDefinition } from './npcRegistry';
import { useWorldStore } from '../../state/useWorldStore';

interface NPCProps {
  definition: NPCDefinition;
  position: [number, number, number];
  modelUrl: string;
}

const NPCModel: React.FC<{ modelUrl: string; groupRef: React.RefObject<THREE.Group | null> }> = ({ modelUrl, groupRef }) => {
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && actions['Idle']) {
      actions['Idle'].play();
    }
    // Fallback names for different models
    if (actions && actions['Dance']) actions['Dance'].play();
  }, [actions]);

  return <primitive object={scene} scale={1.5} />;
};

export const NPC: React.FC<NPCProps> = ({ definition, position, modelUrl }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { userProfile, avatarPosition, setSocialMode, startSocialInteraction, isSocialModeActive, isCooperating } = useWorldStore();

  useFrame((state) => {
    if (!groupRef.current) return;

    // 1. Proximidade Social (2 metros)
    const distance = groupRef.current.position.distanceTo(avatarPosition);
    if (!isSocialModeActive && !isCooperating && distance < 2) {
        setSocialMode(true);
        startSocialInteraction();
    }

    // 2. Cooperação: Siga o líder para o parquinho
    if (isCooperating) {
        const parkTarget = new THREE.Vector3(0, 0, -50);
        const moveDir = parkTarget.clone().sub(groupRef.current.position).normalize();
        
        if (groupRef.current.position.distanceTo(parkTarget) > 1) {
            groupRef.current.position.add(moveDir.multiplyScalar(0.1));
            groupRef.current.lookAt(parkTarget);
        }
    }
  });

  const trialStart = userProfile.trialStartDate ? new Date(userProfile.trialStartDate).getTime() : 0;
  const remainingTrialDays = Math.max(0, 3 - (Date.now() - trialStart) / (1000 * 60 * 60 * 24));

  return (
    <group ref={groupRef} position={position}>
        {(userProfile.isVip || remainingTrialDays > 0) && (
            <Text position={[0, 3, 0]} fontSize={0.5}>👑</Text>
        )}
      
      <Suspense fallback={
        <group>
          <mesh position={[0, 0.75, 0]}>
            <capsuleGeometry args={[0.4, 1.0, 4, 8]} />
            <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.25]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      }>
        <NPCModel modelUrl={modelUrl} groupRef={groupRef} />
      </Suspense>
      
      <Text position={[0, 2.2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {definition.name}
      </Text>
    </group>
  );
};
// Nota: Certifique-se de pré-carregar os modelos no App.tsx ou via Suspense para evitar stuttering.
