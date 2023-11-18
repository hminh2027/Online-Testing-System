import { create } from 'zustand';
import type { Attempt } from '../types';

interface AttemptStore {
  attempt: Attempt | null;
  setAttempt: (attempt: Attempt | null) => void;
}

export const useAttemptStore = create<AttemptStore>((set) => ({
  attempt: null,
  setAttempt: (attempt: Attempt | null) => set(() => ({ attempt })),
}));
