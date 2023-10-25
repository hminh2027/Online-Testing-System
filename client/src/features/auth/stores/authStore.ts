import { create } from 'zustand';
import type { User } from '@/features/user';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
}));
