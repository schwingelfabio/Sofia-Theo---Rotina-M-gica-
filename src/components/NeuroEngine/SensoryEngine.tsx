import React, { useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Motor de Adaptação Sensorial
 * Controla: Saturação, Bloom, Temperatura de Cor, Ruído de fundo.
 */
interface SensoryEngineProps {
  stimulationLevel: number; // 0 (Calmo) a 1 (Sobrecarregado)
}

export const SensoryEngine: React.FC<SensoryEngineProps> = ({ stimulationLevel }) => {
  const { scene, gl } = useThree();

  useFrame(() => {
    // 1. Ajuste de saturação (Material-based)
    scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshStandardMaterial) {
            object.material.color.setHSL(0, 0, 1 - (stimulationLevel * 0.5)); // Dessaturação
        }
    });

    // 2. Ajuste de Iluminação (Luz ambiente reduzida em crise)
    scene.traverse((object) => {
        if (object instanceof THREE.AmbientLight) {
            object.intensity = THREE.MathUtils.lerp(1, 0.3, stimulationLevel);
        }
    });

    // 3. Ajuste de renderizador (Bloom/Filtros)
    gl.toneMappingExposure = THREE.MathUtils.lerp(1, 0.7, stimulationLevel);
  });

  return null;
};
