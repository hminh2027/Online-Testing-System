import { create } from "zustand";

const useAuth = create((set) => ({
  token: localStorage.getItem(import.meta.env.TOKEN_KEY || "API_TOKEN"),
  setToken: (token) => set({ token }),
  isAuthed: () => {
    const token = localStorage.getItem(
      import.meta.env.TOKEN_KEY || "API_TOKEN"
    );
    return !!token;
  },
}));
export { useAuth };
