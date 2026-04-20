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
import { SocialInteractionUI } from './UI/SocialInteractionUI';
import { MissionUI } from './UI/MissionUI';
import { useAuth } from '../state/AuthContext';

const store = createXRStore();

export const MetaverseHub: React.FC = () => {
    const { user } = useAuth();
    const { currentZone, emergencyMode, setEmergencyMode, magicHearts, currentMissionStep } = useWorldStore();

    const handleAvatarMove = (input: { x: number; y: number }) => {
        useWorldStore.getState().setAvatarInput(input);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <TransitionOverlay />
            
            {/* O MetaverseHub agora é estritamente 3D. 
                Toda a UI (Missões, Reports, Stats) deve ser projetada como hologramas 3D. */}
            
            <VirtualControls 
                onMove={handleAvatarMove} 
                onAction={() => console.log("Ação pressionada!")} 
            />

            <Canvas shadows gl={{ antialias: true, stencil: true }}>
                <Physics>
                    <XR store={store}>
                        {/* Soft-Realism Ambient Lighting */}
                        <ambientLight intensity={emergencyMode ? 0.4 : 1.0} />
                        <directionalLight 
                            position={[5, 10, 5]} 
                            intensity={currentMissionStep === 'wake_up' ? 1.5 : 0.6} 
                            castShadow 
                            shadow-mapSize={[2048, 2048]}
                        />
                        
                        <Environment preset="apartment" />
                        
                        {(currentZone === 'city' || currentZone === 'bedroom' || currentZone === 'bathroom') && <CityEnvironment />}
                        
                        <CartoonAvatar userId="Theo" isLocal user={user} />
                        <CalmBubble active={emergencyMode} />

                        {currentZone === 'city' && (
                            <NPC 
                                definition={npcRegistry.sofia} 
                                position={[2, 0, 0]} 
                                modelUrl="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb" 
                            />
                        )}

                        {/* UI Espacial Holográfica Integrada */}
                        <group position={[0, 3, -2]}>
                            <MissionUI />
                        </group>

                        <group position={[2, 2.5, 0]}>
                            <SocialInteractionUI user={user} />
                        </group>

                        <SpatialHUD />
                    </XR>
                </Physics>
            </Canvas>
        </div>
    );
};
