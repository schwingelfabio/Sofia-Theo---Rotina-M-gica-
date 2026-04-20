import React from 'react';
import { Html, Text } from '@react-three/drei';
import { useWorldStore } from '../../state/useWorldStore';

export const SpatialHUD: React.FC = () => {
    const { userProfile, avatarPosition } = useWorldStore();
    
    const triggerSOS = () => {
        useWorldStore.getState().setEmergencyMode(true);
        console.log("Ativando Bolha de Calma...");
    };

    return (
        <group>
            {/* HUD Centralizado no Theo (Holográfico) */}
            <group position={[avatarPosition.x, avatarPosition.y + 4, avatarPosition.z]}>
                <Text position={[0, 0.5, 0]} fontSize={0.2} color="white" anchorX="center">
                    {`Vida: ❤️❤️ | Energia: ⚡ 80%`}
                </Text>
                <mesh position={[0, 0.3, 0]}>
                    <planeGeometry args={[1.5, 0.1]} />
                    <meshStandardMaterial color="#66BB6A" transparent opacity={0.5} />
                </mesh>
            </group>

            {/* Ícone SOS Espacial - Posição fixa no canto da visão */}
            <Html position={[-8, 4, 0]} center sprite>
                <button 
                    onClick={triggerSOS}
                    className="w-16 h-16 rounded-full bg-red-500/80 border-4 border-white shadow-xl flex items-center justify-center text-white font-bold hover:scale-110 active:scale-95 transition-all animate-pulse"
                >
                    SOS
                </button>
            </Html>
        </group>
    );
};
