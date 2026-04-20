import { create } from 'zustand';
import * as THREE from 'three';

interface WorldState {
  currentZone: 'city' | 'home' | 'school' | 'clinic' | 'park';
  avatarPosition: THREE.Vector3;
  setZone: (zone: 'city' | 'home' | 'school' | 'clinic' | 'park') => void;
  setAvatarPosition: (position: THREE.Vector3) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  currentZone: 'city',
  avatarPosition: new THREE.Vector3(0, 0, 0),
  setZone: (zone) => set({ currentZone: zone }),
  setAvatarPosition: (position) => set({ avatarPosition: position }),
}));
