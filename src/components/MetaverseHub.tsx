import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { XR, VRButton, createXRStore } from '@react-three/xr';
import { useWorldStore } from '../state/useWorldStore';
import { Physics } from '@react-three/cannon';
import { CityEnvironment } from './World/CityEnvironment';
import { Swing } from './World/Swing';
import { DigitalWhiteboard } from './World/DigitalWhiteboard';
import { CartoonAvatar } from './CartoonAvatar';
import { NPC } from './NPCs/NPC';
import { npcRegistry } from './NPCs/npcRegistry';
import { SpatialHUD } from './UI/SpatialHUD';
import { TransitionOverlay } from './UI/TransitionOverlay';
import { VirtualControls } from './UI/VirtualControls';
import { CalmBubble } from './World/CalmBubble';

export const MetaverseHub: React.FC = () => {
    const store = useMemo(() => createXRStore(), []);
    const { currentZone, emergencyMode, setEmergencyMode } = useWorldStore();

    const handleAvatarMove = (input: { x: number; y: number }) => {
        // Envia input para o avatar via store ou ref (implementaremos no avatar)
        useWorldStore.getState().setAvatarInput(input);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <TransitionOverlay />
            
            {/* Modo de Emergência: Overlay Darken */}
            {emergencyMode && (
                <div 
                    className="absolute inset-0 z-40 bg-blue-900/40 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-auto"
                    onClick={() => setEmergencyMode(false)}
                >
                    <h1 className="text-white text-4xl font-bold animate-pulse mb-8">Respira fundo... 💙</h1>
                    <button className="px-8 py-4 bg-white/20 text-white rounded-full border border-white">
                        Sair do modo de calma
                    </button>
                </div>
            )}

            <VirtualControls 
                onMove={handleAvatarMove} 
                onAction={() => console.log("Ação pressionada!")} 
            />

            <Canvas shadows>
                <Physics>
                    <XR store={store}>
                        {/* Mundo */}
                        <ambientLight intensity={emergencyMode ? 0.2 : 0.8} />
                        <directionalLight position={[10, 15, 10]} intensity={emergencyMode ? 0.1 : 0.5} castShadow />
                        
                        <Environment preset={emergencyMode ? "night" : "sunset"} />
                        
                        <CityEnvironment />
                        
                        {/* Protagonistas */}
                        <CartoonAvatar userId="Theo" isLocal />
                        <CalmBubble active={emergencyMode} />

                        {currentZone === 'city' && (
                            <NPC 
                                definition={{ 
                                    id: "sofia_guide", 
                                    name: "Sofia", 
                                    description: "Guia",
                                    role: "Guia",
                                    aiPrompt: "Você é a Sofia, guia do Conecta-Verse."
                                }} 
                                position={[2, 0, 0]} 
                                modelUrl="/models/sofia.glb" 
                            />
                        )}

                        <SpatialHUD />
                    </XR>
                </Physics>
            </Canvas>
        </div>
    );
};
