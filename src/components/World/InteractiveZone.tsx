import React, { useEffect } from 'react';
import { Box } from '@react-three/drei';
import { useWorldStore } from '../../state/useWorldStore';
import { useProximity } from '../../hooks/useProximity';
import { InteractionUI } from './InteractionUI';

interface InteractiveZoneProps {
  position: [number, number, number];
  targetZone: 'city' | 'home' | 'school' | 'clinic' | 'park';
  label: string;
  size?: [number, number, number];
  color?: string;
}

export const InteractiveZone: React.FC<InteractiveZoneProps> = ({ position, targetZone, label, size = [8, 8, 8], color = '#80DEEA' }) => {
  const { avatarPosition, setZone } = useWorldStore();
  const isNear = useProximity(avatarPosition, new THREE.Vector3(...position), 10);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isNear && e.key.toLowerCase() === 'e') {
        setZone(targetZone);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isNear, targetZone, setZone]);

  return (
    <>
      <Box args={size} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </Box>
      <group position={[position[0], position[1] + 6, position[2]]}>
        <InteractionUI label={`Pressione E para ${label}`} isVisible={isNear} />
      </group>
    </>
  );
};
