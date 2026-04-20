import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../state/AuthContext';

interface AvatarProps {
  userId: string;
  isLocal: boolean;
}

import { useJoystickStore } from '../state/useJoystickStore';

export const CartoonAvatar: React.FC<AvatarProps> = ({ userId, isLocal }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { moveVector } = useJoystickStore();
  const { user } = useAuth();

  // Sincronização em tempo real (Escuta Firestore)
  useEffect(() => {
    if (!isLocal) {
      const unsub = onSnapshot(doc(db, 'users', userId, 'position', 'current'), (snapshot) => {
        const data = snapshot.data();
        if (data && meshRef.current) {
          meshRef.current.position.set(data.x, data.y, data.z);
        }
      });
      return () => unsub();
    }
  }, [userId, isLocal]);

  // Loop de movimentação (Input Local)
  useFrame((state, delta) => {
    if (isLocal && meshRef.current) {
        const speed = 5;
        meshRef.current.position.x += moveVector.x * speed * delta;
        meshRef.current.position.z += moveVector.z * speed * delta;
        
        // Sincronizar posição no Firestore (opcional: otimizar para throttled save)
        if (user) {
            updateDoc(doc(db, 'users', user.uid, 'position', 'current'), {
                x: meshRef.current.position.x, y: meshRef.current.position.y, z: meshRef.current.position.z,
                timestamp: Date.now()
            });
        }
    }
  });

  return (
    <group ref={meshRef}>
      {/* Representação visual cartoon */}
      <mesh>
        <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      <Text position={[0, 1.5, 0]} fontSize={0.5} color="black">
        {userId.slice(0, 5)}
      </Text>
    </group>
  );
};
