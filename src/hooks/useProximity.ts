import { useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Hook para detectar proximidade e disparar prompts de interação
 */
export const useProximity = (playerPosition: THREE.Vector3, targetPosition: THREE.Vector3, threshold: number = 2) => {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const distance = playerPosition.distanceTo(targetPosition);
    setIsNear(distance < threshold);
  }, [playerPosition, targetPosition, threshold]);

  return isNear;
};
