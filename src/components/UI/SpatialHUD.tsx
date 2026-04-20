import React from 'react';
import { Html, Text } from '@react-three/drei';
import { useWorldStore } from '../../state/useWorldStore';

export const SpatialHUD: React.FC = () => {
    const { userProfile, avatarPosition, magicHearts } = useWorldStore();
    
    const triggerSOS = () => {
        useWorldStore.getState().setEmergencyMode(true);
    };

    return (
        <group>
            {/* HUD Centralizado no Theo (Holográfico Clinical Interface) */}
            <group position={[avatarPosition.x, avatarPosition.y + 4.5, avatarPosition.z]}>
                <Text 
                    position={[0, 0.8, 0]} 
                    fontSize={0.25} 
                    color="#22d3ee" 
                    anchorX="center" 
                    font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t6nu2ptq_4A_7h6v5X4W.woff"
                >
                    {`BIOMETRIA: ESTÁVEL | NÚCLEO: ${magicHearts}`}
                </Text>
                
                {/* Estabilidade Sensorial Bar */}
                <mesh position={[0, 0.5, 0]}>
                    <planeGeometry args={[2, 0.05]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                </mesh>
                <mesh position={[-0.2, 0.5, 0.01]}>
                    <planeGeometry args={[1.6, 0.05]} />
                    <meshBasicMaterial color="#22d3ee" />
                </mesh>

                <Text 
                    position={[0, 0.3, 0]} 
                    fontSize={0.12} 
                    color="white" 
                    fillOpacity={0.6}
                    anchorX="center"
                >
                    SINCRONIZAÇÃO NEURONAL EM CURSO...
                </Text>
            </group>

            {/* Ícone SOS Espacial Holográfico */}
            <Html position={[-8, 4.5, 0]} center sprite>
                <button 
                    onClick={triggerSOS}
                    className="group relative w-20 h-20 flex items-center justify-center pointer-events-auto"
                >
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/40 transition-all"></div>
                    <div className="relative w-full h-full rounded-full border-2 border-red-500/50 flex items-center justify-center bg-black/60 backdrop-blur-md text-red-500 font-black text-xs tracking-tighter hover:scale-110 active:scale-95 transition-all">
                        PROTOCOLO<br/>SOS
                    </div>
                </button>
            </Html>
        </group>
    );
};
