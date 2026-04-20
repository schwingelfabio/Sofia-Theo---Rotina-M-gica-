import React from 'react';
import { Grid, Box, Cylinder, Sphere } from '@react-three/drei';
import { InteractiveZone } from './InteractiveZone';

const SoftBuilding: React.FC<{ position: [number, number, number], size: [number, number, number], color?: string }> = ({ position, size, color = "#e0f2f1" }) => (
  <group position={position}>
    <Box args={size}>
      <meshStandardMaterial 
        color={color}
        roughness={0.8}
        metalness={0.1}
        transparent 
        opacity={0.9}
      />
    </Box>
    {/* Subtle Glow edges */}
    <Box args={[size[0] + 0.05, size[1] + 0.05, size[2] + 0.05]}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
    </Box>
  </group>
);

export const CityEnvironment: React.FC = () => {
  return (
    <>
      {/* Soft Ground AAA */}
      <Grid 
        infiniteGrid 
        fadeDistance={60} 
        fadeStrength={3} 
        cellSize={2} 
        sectionSize={10} 
        sectionColor="#80deea" 
        sectionThickness={1} 
        cellColor="#e0f2f1" 
        cellThickness={0.5}
      />
      
      {/* City Structures in Soft-Realism */}
      <SoftBuilding position={[20, 15, -20]} size={[12, 30, 12]} color="#b2dfdb" />
      <SoftBuilding position={[-25, 10, -15]} size={[10, 20, 10]} color="#eceff1" />
      <SoftBuilding position={[30, 12, 25]} size={[15, 24, 15]} color="#cfd8dc" />
      <SoftBuilding position={[-18, 5, 30]} size={[8, 10, 8]} color="#b2ebf2" />

      {/* Central Plaza Therapeutic Float */}
      <group position={[0, 1.5, 0]}>
        <Sphere args={[4, 32, 32]}>
          <meshStandardMaterial 
            color="#80deea" 
            emissive="#80deea" 
            emissiveIntensity={0.5} 
            transparent 
            opacity={0.2}
          />
        </Sphere>
        <pointLight color="#80deea" intensity={5} distance={20} decay={2} />
      </group>

      {/* Portais Terapêuticos Integrados */}
      <InteractiveZone position={[20, 2, -20]} targetZone="school" label="Exploração Educativa" color="#80deea" />
      <InteractiveZone position={[-25, 2, -15]} externalUrl="https://www.conectateaia.com.br" label="Conexão Clínica" color="#b2dfdb" />
      <InteractiveZone position={[0, 2, 10]} targetZone="home" label="Espaço Seguro" color="#e0f2f1" />
      <InteractiveZone position={[0, 0.5, -30]} targetZone="park" label="Regulação Social" color="#b2ebf2" size={[20, 1, 20]} />
    </>
  );
};
