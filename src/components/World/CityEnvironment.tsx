import React from 'react';
import { Plane } from '@react-three/drei';
import { InteractiveZone } from './InteractiveZone';

export const CityEnvironment: React.FC = () => {
  return (
    <>
      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <meshStandardMaterial color="#E8F5E9" />
      </Plane>
      
      {/* Zonas Interativas */}
      <InteractiveZone position={[20, 5, 0]} targetZone="school" label="entrar na Escola" color="#FFCC80" />
      <InteractiveZone position={[-20, 7.5, 0]} targetZone="clinic" label="entrar na Clínica" color="#80DEEA" />
      <InteractiveZone position={[0, 3, 20]} targetZone="home" label="entrar em Casa" color="#FFF59D" />
      <InteractiveZone position={[0, 0, -20]} targetZone="park" label="brincar no Parque" color="#66BB6A" size={[20, 2, 20]} />
    </>
  );
};
