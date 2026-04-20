import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { XR, VRButton, createXRStore } from '@react-three/xr';
import { useWorldStore } from '../state/useWorldStore';
import { Portal } from './World/Portal';

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

          {currentZone === 'city' && (
            <>
              <Portal position={[0, 0, 5]} targetZone="home" label="Casa" />
              <Portal position={[5, 0, 0]} targetZone="school" label="Escola" />
              <Portal position={[-5, 0, 0]} targetZone="park" label="Parque" />
              <Portal position={[0, 0, -5]} targetZone="clinic" label="Clínica" />
            </>
          )}

          {currentZone !== 'city' && (
            <Portal position={[0, 0, 0]} targetZone="city" label="Voltar" />
          )}
        </XR>
      </Canvas>
    </>
  );
};
