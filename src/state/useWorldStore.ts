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
  avatarInput: { x: number; y: number }; // Novo estado
  userProfile: UserProfile;
  emergencyMode: boolean;
  setZone: (zone: 'city' | 'home' | 'school' | 'clinic' | 'park') => void;
  setAvatarPosition: (position: THREE.Vector3) => void;
  setAvatarInput: (input: { x: number; y: number }) => void; // Novo action
  upgradeToVip: () => void;
  setEmergencyMode: (active: boolean) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  currentZone: 'city',
  avatarPosition: new THREE.Vector3(0, 0, 0),
  avatarInput: { x: 0, y: 0 },
  userProfile: {
    isVip: false,
    vipExpiration: null,
    trialStartDate: new Date(), // Simulação do início do trial
  },
  emergencyMode: false,
  setZone: (zone) => set({ currentZone: zone }),
  setAvatarPosition: (position) => set({ avatarPosition: position }),
  setAvatarInput: (avatarInput) => set({ avatarInput }),
  upgradeToVip: () => set((state) => ({ userProfile: { ...state.userProfile, isVip: true } })),
  setEmergencyMode: (active) => set({ emergencyMode: active }),
}));
