import { create } from 'zustand';
import * as THREE from 'three';

interface UserProfile {
  isVip: boolean;
  vipExpiration: Date | null;
  trialStartDate: Date | null;
}

interface WorldState {
  currentZone: 'city' | 'home' | 'school' | 'clinic' | 'park' | 'bedroom' | 'bathroom';
  avatarPosition: THREE.Vector3;
  avatarInput: { x: number; y: number };
  userProfile: UserProfile;
  emergencyMode: boolean;
  magicHearts: number;
  isSocialModeActive: boolean;
  socialInteractionStartTime: number | null;
  isCooperating: boolean;
  
  // Missão: Manhã de Herói
  currentMissionStep: 'none' | 'wake_up' | 'get_dressed' | 'brush_teeth' | 'completed';
  isAlarmPlaying: boolean;
  clothesChoice: 'cotton' | 'wool' | 'mesh' | null;
  teethCleanedCount: number;

  setZone: (zone: 'city' | 'home' | 'school' | 'clinic' | 'park' | 'bedroom' | 'bathroom') => void;
  setAvatarPosition: (position: THREE.Vector3) => void;
  setAvatarInput: (input: { x: number; y: number }) => void;
  upgradeToVip: () => void;
  setEmergencyMode: (active: boolean) => void;
  addMagicHearts: (amount: number) => void;
  setSocialMode: (active: boolean) => void;
  startSocialInteraction: () => void;
  setCooperating: (active: boolean) => void;
  setMissionStep: (step: 'none' | 'wake_up' | 'get_dressed' | 'brush_teeth' | 'completed') => void;
  toggleAlarm: (active: boolean) => void;
  setClothesChoice: (choice: 'cotton' | 'wool' | 'mesh') => void;
  cleanTooth: () => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  currentZone: 'bedroom', // Inicia no quarto para a missão
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
  currentMissionStep: 'wake_up',
  isAlarmPlaying: true,
  clothesChoice: null,
  teethCleanedCount: 0,
  setZone: (zone) => set({ currentZone: zone }),
  setAvatarPosition: (position) => set({ avatarPosition: position }),
  setAvatarInput: (avatarInput) => set({ avatarInput }),
  upgradeToVip: () => set((state) => ({ userProfile: { ...state.userProfile, isVip: true } })),
  setEmergencyMode: (active) => set({ emergencyMode: active }),
  addMagicHearts: (amount) => set((state) => ({ magicHearts: state.magicHearts + amount })),
  setSocialMode: (active) => set({ isSocialModeActive: active }),
  startSocialInteraction: () => set({ socialInteractionStartTime: Date.now() }),
  setCooperating: (active) => set({ isCooperating: active }),
  setMissionStep: (step) => set({ currentMissionStep: step }),
  toggleAlarm: (active) => set({ isAlarmPlaying: active }),
  setClothesChoice: (choice) => set({ clothesChoice: choice }),
  cleanTooth: () => set((state) => ({ teethCleanedCount: state.teethCleanedCount + 1 })),
}));
