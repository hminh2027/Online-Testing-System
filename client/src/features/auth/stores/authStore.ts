import { create } from 'zustand';
import { storage } from '@/utils';

interface AuthStore {
  isAuthed: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthed: !!storage.getToken(),
  setIsAuth: (isAuth: boolean) => set(() => ({ isAuthed: isAuth })),
}));
