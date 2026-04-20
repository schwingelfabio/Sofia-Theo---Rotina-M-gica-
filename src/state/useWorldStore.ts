import { create } from 'zustand';
import * as THREE from 'three';

interface UserProfile {
  isVip: boolean;
  vipExpiration: Date | null;
  trialStartDate: Date | null;
}

interface WorldState {
  currentZone: 'city' | 'home' | 'school' | 'clinic' | 'park';
  avatarPosition: THREE.Vector3;
  userProfile: UserProfile;
  setZone: (zone: 'city' | 'home' | 'school' | 'clinic' | 'park') => void;
  setAvatarPosition: (position: THREE.Vector3) => void;
  upgradeToVip: () => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  currentZone: 'city',
  avatarPosition: new THREE.Vector3(0, 0, 0),
  userProfile: {
    isVip: false,
    vipExpiration: null,
    trialStartDate: new Date(), // Simulação do início do trial
  },
  setZone: (zone) => set({ currentZone: zone }),
  setAvatarPosition: (position) => set({ avatarPosition: position }),
  upgradeToVip: () => set((state) => ({ userProfile: { ...state.userProfile, isVip: true } })),
}));
