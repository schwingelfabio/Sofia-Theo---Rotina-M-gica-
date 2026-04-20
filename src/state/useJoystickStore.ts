import { create } from 'zustand';

interface JoystickStore {
  moveVector: { x: number; z: number };
  setMoveVector: (vector: { x: number; z: number }) => void;
  action: string | null;
  setAction: (action: string | null) => void;
}

export const useJoystickStore = create<JoystickStore>((set) => ({
  moveVector: { x: 0, z: 0 },
  setMoveVector: (vector) => set({ moveVector: vector }),
  action: null,
  setAction: (action) => set({ action }),
}));
