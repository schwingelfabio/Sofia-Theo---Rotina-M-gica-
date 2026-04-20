import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, CameraControls } from '@react-three/drei';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../state/AuthContext';
import { logMovement } from '../services/analyticsService';
import { useWorldStore } from '../state/useWorldStore';

interface AvatarProps {
  userId: string;
  isLocal: boolean;
}

export const CartoonAvatar: React.FC<AvatarProps> = ({ userId, isLocal }) => {
  const meshRef = useRef<THREE.Group>(null);
  const cameraControlsRef = useRef<any>(null);
  const { user } = useAuth();
  
  const [mode, setMode] = useState<'walk' | 'skate' | 'scooter'>('walk');
  const [color, setColor] = useState<'pink' | 'blue'>('blue');
  // ... resto das definições
  
  // Estado para teclas
  const keys = useRef({ w: false, a: false, s: false, d: false });

  // Escuta de teclado
  useEffect(() => {
    if (!isLocal) return;
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase() as keyof typeof keys.current] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase() as keyof typeof keys.current] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isLocal]);

  useFrame((state, delta) => {
    if (isLocal && meshRef.current) {
        const speed = 5;
        const direction = new THREE.Vector3(
            (keys.current.d ? 1 : 0) - (keys.current.a ? 1 : 0),
            0,
            (keys.current.s ? 1 : 0) - (keys.current.w ? 1 : 0)
        );
        
        // Normalizar e mover
        direction.normalize().multiplyScalar(speed * delta);
        meshRef.current.position.add(direction);
        
        // Câmera segue o personagem
        cameraControlsRef.current?.setLookAt(
            meshRef.current.position.x, meshRef.current.position.y + 2, meshRef.current.position.z + 5,
            meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z,
            true
        );

import { logMovement } from '../services/analyticsService';

// ... dentro do useFrame do CartoonAvatar:
        // Atualiza Store de Mundo
        const pos = meshRef.current.position.clone();
        useWorldStore.getState().setAvatarPosition(pos);
        
        // Telemetria (sampling a cada 100 frames para performance AAA)
        if (state.frame % 100 === 0) {
            logMovement({ x: pos.x, y: pos.y, z: pos.z }, 'me');
        }
    }
  });

  return (
    <>
        <CameraControls ref={cameraControlsRef} />
        <group ref={meshRef}>
            {/* Renderiza o item escolhido se mode !== 'walk' */}
            {mode !== 'walk' && (
                <mesh position={[0, -0.5, 0]}>
                    <boxGeometry args={[0.5, 0.2, 0.5]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            )}
            <mesh>
                <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
                <meshStandardMaterial color="#FF69B4" />
            </mesh>
            <Text position={[0, 1.5, 0]} fontSize={0.5} color="black">
                {userId.slice(0, 5)}
            </Text>
        </group>
    </>
  );
};
