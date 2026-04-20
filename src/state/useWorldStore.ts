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
  avatarInput: { x: number; y: number };
  userProfile: UserProfile;
  emergencyMode: boolean;
  magicHearts: number; // Novo: Recompensas sociais
  isSocialModeActive: boolean; // Novo: Interação ativa
  socialInteractionStartTime: number | null; // Novo: Para telemetria
  isCooperating: boolean; // Novo: Modo siga o líder/cooperação
  setZone: (zone: 'city' | 'home' | 'school' | 'clinic' | 'park') => void;
  setAvatarPosition: (position: THREE.Vector3) => void;
  setAvatarInput: (input: { x: number; y: number }) => void;
  upgradeToVip: () => void;
  setEmergencyMode: (active: boolean) => void;
  addMagicHearts: (amount: number) => void;
  setSocialMode: (active: boolean) => void;
  startSocialInteraction: () => void;
  setCooperating: (active: boolean) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  currentZone: 'city',
  avatarPosition: new THREE.Vector3(0, 0, 0),
  avatarInput: { x: 0, y: 0 },
  userProfile: {
    isVip: false,
    vipExpiration: null,
    trialStartDate: new Date(),
  },
  emergencyMode: false,
  magicHearts: 0,
  isSocialModeActive: false,
  socialInteractionStartTime: null,
  isCooperating: false,
  setZone: (zone) => set({ currentZone: zone }),
  setAvatarPosition: (position) => set({ avatarPosition: position }),
  setAvatarInput: (avatarInput) => set({ avatarInput }),
  upgradeToVip: () => set((state) => ({ userProfile: { ...state.userProfile, isVip: true } })),
  setEmergencyMode: (active) => set({ emergencyMode: active }),
  addMagicHearts: (amount) => set((state) => ({ magicHearts: state.magicHearts + amount })),
  setSocialMode: (active) => set({ isSocialModeActive: active }),
  startSocialInteraction: () => set({ socialInteractionStartTime: Date.now() }),
  setCooperating: (active) => set({ isCooperating: active }),
}));
