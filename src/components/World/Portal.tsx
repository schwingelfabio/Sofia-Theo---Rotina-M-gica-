import React from 'react';
import { useWorldStore } from '../../state/useWorldStore';

interface PortalProps {
  position: [number, number, number];
  targetZone: 'city' | 'home' | 'school' | 'clinic' | 'park';
  label: string;
}

export const Portal: React.FC<PortalProps> = ({ position, targetZone, label }) => {
  const setZone = useWorldStore((state) => state.setZone);

  return (
    <mesh position={position} onClick={() => setZone(targetZone)}>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#00A0A0" transparent opacity={0.6} />
    </mesh>
  );
};
