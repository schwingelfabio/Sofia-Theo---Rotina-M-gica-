import React from 'react';
import { Html } from '@react-three/drei';

interface InteractionUIProps {
  label: string;
  isVisible: boolean;
}

export const InteractionUI: React.FC<InteractionUIProps> = ({ label, isVisible }) => {
  if (!isVisible) return null;

  return (
    <Html center distanceFactor={10}>
      <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-bold border border-cyan-400">
        {label}
      </div>
    </Html>
  );
};
