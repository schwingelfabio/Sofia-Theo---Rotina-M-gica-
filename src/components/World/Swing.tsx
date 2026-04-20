import React from 'react';
import { useBox, useSphere } from '@react-three/cannon';
import { Group } from 'three';

export const Swing: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const [ref] = useBox(() => ({ mass: 1, position }));
  
  return (
    <mesh ref={ref as any}>
      <boxGeometry args={[1, 0.2, 1]} />
      <meshStandardMaterial color="#FF8A65" />
    </mesh>
  );
};
