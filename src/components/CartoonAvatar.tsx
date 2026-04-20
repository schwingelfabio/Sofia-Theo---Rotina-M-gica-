import * as THREE from 'three';
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, CameraControls, Clone } from '@react-three/drei';
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
        const speed = 7; // GTA style speed
        const input = useWorldStore.getState().avatarInput;
        
        // Teclado (fallback) + Joystick
        const direction = new THREE.Vector3(
            input.x || (keys.current.d ? 1 : 0) - (keys.current.a ? 1 : 0),
            0,
            -input.y || (keys.current.s ? 1 : 0) - (keys.current.w ? 1 : 0)
        );
        
        if (direction.length() > 0.1) {
            direction.normalize().multiplyScalar(speed * delta);
            meshRef.current.position.add(direction);
            
            // Rotação suave baseada na direção
            const targetRotation = Math.atan2(direction.x, direction.z);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation, 0.2);
        }
        
        // Câmera segue o personagem de perto e de cima (Third Person)
        if (cameraControlsRef.current) {
            cameraControlsRef.current.setLookAt(
                meshRef.current.position.x, meshRef.current.position.y + 12, meshRef.current.position.z + 18,
                meshRef.current.position.x, meshRef.current.position.y + 1, meshRef.current.position.z,
                true
            );
        }

        // Atualiza Store de Mundo
        const pos = meshRef.current.position.clone();
        useWorldStore.getState().setAvatarPosition(pos);
        
        // Persistência em tempo real no Firestore
        // @ts-ignore - frame exists on clock
        if (user && state.clock.getElapsedTime() % 1 < 0.1) { 
            updateDoc(doc(db, 'users', user.uid), {
                position: { x: pos.x, y: pos.y, z: pos.z },
                lastUpdated: new Date()
            });
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
            <Suspense fallback={<mesh><capsuleGeometry args={[0.5, 1.5, 4, 8]} /><meshStandardMaterial color="#FF69B4" /></mesh>}>
                <Clone object={useGLTF('/models/theo.glb').scene} scale={1.5} />
            </Suspense>
            <Text position={[0, 1.5, 0]} fontSize={0.5} color="black">
                {userId.slice(0, 5)}
            </Text>
        </group>
    </>
  );
};
