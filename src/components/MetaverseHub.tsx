import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { XR, VRButton, createXRStore } from '@react-three/xr';
import { useWorldStore } from '../state/useWorldStore';
import { CityEnvironment } from './World/CityEnvironment';
import { NPC } from './NPCs/NPC';
import { npcRegistry } from './NPCs/npcRegistry';
import { CartoonAvatar } from './CartoonAvatar';
import { TransitionOverlay } from './UI/TransitionOverlay';

export const MetaverseHub: React.FC = () => {
  const store = useMemo(() => createXRStore(), []);
  const currentZone = useWorldStore((state) => state.currentZone);

  return (
    <>
      <TransitionOverlay />
      <div className="absolute top-4 left-4 z-10 text-white font-bold bg-slate-900 p-2 rounded pointer-events-none">
        Conecta-Verse v1.0 | Zona: {currentZone.toUpperCase()}
      </div>
      <VRButton />
      <Canvas shadows>
        <XR store={store}>
          <PerspectiveCamera makeDefault position={[0, 10, 20]} />
          <OrbitControls />
          
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Environment preset="city" />

          {/* O Mundo Aberto da Cidade */}
          <CityEnvironment />

          {/* Avatar Local */}
          <CartoonAvatar userId="me" isLocal />

          {/* Instanciação Dinâmica dos NPCs */}
          {currentZone === 'school' && (
            <>
              <NPC definition={npcRegistry.clara} position={[3, 0, 0]} modelUrl="/models/clara.glb" />
              <DigitalWhiteboard 
                position={[0, 4, -4]} 
                agentRole="teacher" 
              />
            </>
          )}

          {currentZone === 'clinic' && (
            <NPC definition={npcRegistry.aris} position={[-20, 0, 0]} modelUrl="/models/aris.glb" />
          )}
        </XR>
      </Canvas>
    </>
  );
};
