const STORAGE_KEY = 'TOKEN';

export const storage = {
  getToken: () => localStorage.getItem(STORAGE_KEY),
  setToken: (token: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
  },
  clearToken: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
