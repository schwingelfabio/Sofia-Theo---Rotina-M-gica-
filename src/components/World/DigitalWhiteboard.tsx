import React from 'react';
import { Plane, Text, Float } from '@react-three/drei';

interface DigitalWhiteboardProps {
  position: [number, number, number];
  content: string;
}

export const DigitalWhiteboard: React.FC<DigitalWhiteboardProps> = ({ position, content }) => {
  return (
    <group position={position}>
      {/* Moldura da Lousa */}
      <Plane args={[6, 4]} position={[0, 0, 0.1]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Plane>
      {/* Moldura de Aço escovado */}
      <mesh>
        <boxGeometry args={[6.4, 4.4, 0.2]} />
        <meshStandardMaterial color="#4A4A4A" />
      </mesh>
      
      {/* Conteúdo Dinâmico com IA */}
      <Float speed={0} floatIntensity={0}>
        <Text 
          position={[0, 0, 0.2]} 
          fontSize={0.3} 
          color="#333" 
          maxWidth={5.5}
          textAlign="center"
        >
          {content}
        </Text>
      </Float>
    </group>
  );
};
