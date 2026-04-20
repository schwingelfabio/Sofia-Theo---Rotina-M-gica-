import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { XR, VRButton } from '@react-three/xr';

interface HubLocation {
  id: string;
  name: string;
  position: [number, number, number];
}

const locations: HubLocation[] = [
  { id: 'home', name: 'Minha Casa', position: [0, 0, 5] },
  { id: 'school', name: 'Escola', position: [5, 0, 0] },
  { id: 'playground', name: 'Parquinho', position: [-5, 0, 0] },
  { id: 'clinic', name: 'Clínica Online', position: [0, 0, -5] },
];

export const MetaverseHub: React.FC = () => {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <PerspectiveCamera makeDefault position={[0, 2, 10]} />
          <OrbitControls />
          
          <ambientLight intensity={0.5} />
          <Environment preset="city" />

          {/* Renderização do HUB */}
          {locations.map((loc) => (
            <mesh key={loc.id} position={loc.position} onClick={() => console.log(`Indo para: ${loc.id}`)}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          ))}
          
        </XR>
      </Canvas>
    </>
  );
};
