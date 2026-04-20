import { create } from 'zustand';

interface WorldState {
  currentZone: 'city' | 'home' | 'school' | 'clinic' | 'park';
  setZone: (zone: 'city' | 'home' | 'school' | 'clinic' | 'park') => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  currentZone: 'city',
  setZone: (zone) => set({ currentZone: zone }),
}));
