import { create } from "zustand";

const useAuth = create((set) => ({
  isAuthed: () => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
    return !!token;
  },
  user: null,
  setUser: (user) => {
    set((state) => ({ ...state, user }));
  },
}));
export { useAuth };
