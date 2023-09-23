import { create } from 'zustand';

interface AuthStore {
  isAuthed: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthed: false,
  setIsAuth: (isAuth: boolean) => set(() => ({ isAuthed: isAuth })),
}));
