import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { XR, VRButton, createXRStore } from '@react-three/xr';
import { useWorldStore } from '../state/useWorldStore';
import { Physics } from '@react-three/cannon';
import { CityEnvironment } from './World/CityEnvironment';
import { Swing } from './World/Swing';
import { DigitalWhiteboard } from './World/DigitalWhiteboard';

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
        <Physics>
          <XR store={store}>
            <PerspectiveCamera makeDefault position={[0, 10, 20]} />
            <OrbitControls />
            
            {/* Iluminação Soft-Realism */}
            <ambientLight intensity={0.8} />
            <directionalLight 
                position={[10, 15, 10]} 
                intensity={0.5} 
                castShadow 
                shadow-camera-left={-50}
                shadow-camera-right={50}
            />
            {/* Céu suave */}
            <Environment preset="sunset" />

            {/* O Mundo Aberto da Cidade */}
            <CityEnvironment />
            <Swing position={[0, 2, -20]} />

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
        </Physics>
      </Canvas>
    </>
  );
};
