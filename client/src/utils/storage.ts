const STORAGE_KEY = 'TOKEN';

export const storage = {
  getToken: () => localStorage.getItem(STORAGE_KEY),
  setToken: (token: string) => {
    localStorage.setItem(STORAGE_KEY, token);
  },
  clearToken: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
