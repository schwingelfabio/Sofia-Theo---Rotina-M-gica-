import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { NPCDefinition } from './npcRegistry';

interface NPCProps {
  definition: NPCDefinition;
  position: [number, number, number];
}

export const NPC: React.FC<NPCProps> = ({ definition, position }) => {
  const meshRef = useRef<THREE.Group>(null);

  // Comportamento Idle Routines básico
  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <capsuleGeometry args={[0.4, 1.4, 4, 8]} />
        <meshStandardMaterial color={definition.role === 'teacher' ? '#20B2AA' : '#1E90FF'} />
      </mesh>
      <Text position={[0, 1.2, 0]} fontSize={0.3} color="white">
        {definition.name}
      </Text>
    </group>
  );
};
