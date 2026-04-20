import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { XR, VRButton, createXRStore } from '@react-three/xr';
import { useWorldStore } from '../state/useWorldStore';
import { Portal } from './World/Portal';
import { NPC } from './NPCs/NPC';
import { npcRegistry } from './NPCs/npcRegistry';
import { CartoonAvatar } from './CartoonAvatar';

export const MetaverseHub: React.FC = () => {
  const store = useMemo(() => createXRStore(), []);
  const currentZone = useWorldStore((state) => state.currentZone);

  return (
    <>
      <div className="absolute top-4 left-4 z-10 text-white font-bold bg-slate-900 p-2 rounded pointer-events-none">
        Zona Atual: {currentZone.toUpperCase()}
      </div>
      <VRButton />
      <Canvas>
        <XR store={store}>
          <PerspectiveCamera makeDefault position={[0, 2, 10]} />
          <OrbitControls />
          
          <ambientLight intensity={0.5} />
          <Environment preset="city" />

          {/* Avatar Local */}
          <CartoonAvatar userId="me" isLocal />

          {currentZone === 'city' && (
            <>
              <Portal position={[0, 0, 5]} targetZone="home" label="Minha Casa" />
              <Portal position={[5, 0, 0]} targetZone="school" label="Escola" />
              <Portal position={[-5, 0, 0]} targetZone="park" label="Parque" />
              <Portal position={[0, 0, -5]} targetZone="clinic" label="Clínica" />
            </>
          )}

          {currentZone === 'school' && (
            <NPC definition={npcRegistry.clara} position={[0, 0, 0]} />
          )}

          {currentZone === 'clinic' && (
            <NPC definition={npcRegistry.aris} position={[0, 0, 0]} />
          )}

          {currentZone !== 'city' && (
            <Portal position={[0, -1, 0]} targetZone="city" label="Voltar à Cidade" />
          )}
        </XR>
      </Canvas>
    </>
  );
};
