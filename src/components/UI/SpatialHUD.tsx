import React from 'react';
import { Html } from '@react-three/drei';
import { useWorldStore } from '../../state/useWorldStore';

export const SpatialHUD: React.FC = () => {
  const triggerSOS = () => {
    // Efeito visual de bolha de calma
    console.log("Ativando Bolha de Calma...");
  };

  return (
    <group>
      {/* Ícone SOS Flutuante */}
      <Html position={[10, 5, 0]} center>
         <button 
            onClick={triggerSOS}
            className="w-16 h-16 rounded-full bg-blue-500/80 border-4 border-white shadow-xl flex items-center justify-center text-white font-bold hover:scale-110 transition-transform"
         >
            SOS
         </button>
      </Html>
    </group>
  );
};
