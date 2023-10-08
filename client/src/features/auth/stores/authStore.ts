import { create } from 'zustand';
import { storage } from '@/utils';
import type { User } from '@/models/user';

interface AuthStore {
  isAuthed: boolean;
  user: User | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthed: !!storage.getToken(),
  user: null,
  setIsAuth: (isAuth: boolean) => set(() => ({ isAuthed: isAuth })),
  setUser: (user: User) => set(() => ({ user })),
}));
