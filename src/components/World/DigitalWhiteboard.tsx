import React, { useState, useEffect } from 'react';
import { Plane, Text, Float } from '@react-three/drei';
import { interactWithAgent } from '../../services/aiAgentService';

interface DigitalWhiteboardProps {
  position: [number, number, number];
  agentRole: 'teacher' | 'doctor';
}

export const DigitalWhiteboard: React.FC<DigitalWhiteboardProps> = ({ position, agentRole }) => {
  const [content, setContent] = useState('Carregando lição da Professora...');

  useEffect(() => {
    // Busca conteúdo educativo inicial da IA
    interactWithAgent(agentRole, 'Gere uma pequena frase motivacional ou lição sobre autismo para crianças.')
      .then((response) => setContent(response || 'Seja bem-vindo à nossa aula!'))
      .catch(() => setContent('Bem-vindo à sala de aula!'));
  }, [agentRole]);

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
      
      <Float speed={0} floatIntensity={0}>
        <Text 
          position={[0, 0, 0.2]} 
          fontSize={0.25} 
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
