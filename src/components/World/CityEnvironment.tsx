import React from 'react';
import { Grid, Box, Cylinder } from '@react-three/drei';
import { InteractiveZone } from './InteractiveZone';

const HolographicBuilding: React.FC<{ position: [number, number, number], size: [number, number, number] }> = ({ position, size }) => (
  <group position={position}>
    <Box args={size}>
      <meshStandardMaterial 
        color="#0e7490" 
        transparent 
        opacity={0.15} 
        emissive="#22d3ee" 
        emissiveIntensity={0.2} 
      />
    </Box>
    {/* Wireframe Glow edges */}
    <Box args={size}>
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
    </Box>
  </group>
);

export const CityEnvironment: React.FC = () => {
  return (
    <>
      {/* Grid Floor AAA */}
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        fadeStrength={5} 
        cellSize={1} 
        sectionSize={5} 
        sectionColor="#22d3ee" 
        sectionThickness={1.5} 
        cellColor="#0e7490" 
        cellThickness={0.8}
      />
      
      {/* City Structures */}
      <HolographicBuilding position={[15, 10, -15]} size={[10, 20, 10]} />
      <HolographicBuilding position={[-20, 8, -10]} size={[8, 16, 8]} />
      <HolographicBuilding position={[25, 12, 20]} size={[12, 24, 12]} />
      <HolographicBuilding position={[-15, 5, 25]} size={[6, 10, 6]} />

      {/* Central Plaza Ornament */}
      <group position={[0, 0.5, 0]}>
        <Cylinder args={[5, 5, 0.2, 32]}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} />
        </Cylinder>
        <pointLight color="#22d3ee" intensity={10} distance={15} />
      </group>

      {/* Zonas Interativas Reformuladas (Portais Holográficos) */}
      <InteractiveZone position={[15, 2, -15]} targetZone="school" label="iniciar Protocolo Educativo" color="#f59e0b" />
      <InteractiveZone position={[-20, 2, -10]} externalUrl="https://www.conectateaia.com.br" label="sincronizar Telemedicina" color="#06b6d4" />
      <InteractiveZone position={[0, 2, 8]} targetZone="home" label="retornar à Safe Zone" color="#fbbf24" />
      <InteractiveZone position={[0, 0.5, -25]} targetZone="park" label="ativar Regulação Social" color="#10b981" size={[15, 1, 15]} />
    </>
  );
};
