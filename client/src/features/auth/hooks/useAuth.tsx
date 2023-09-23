import { useAuthStore } from '../stores';
import { endpoints } from '@/config';
import { axiosInstance } from '@/libs/axios';

export const useAuth = () => {
  const { setIsAuth } = useAuthStore();
  const login = async (email: string, password: string) => {
    // interact with api
    await axiosInstance({
      url: `${endpoints.apis.auth.path}/login`,
      method: 'POST',
      data: {
        email,
        password,
      },
    });
  };

  const logout = () => {};

  const refresh = () => {};

  const getMe = () => {};

  return {
    login,
    logout,
    refresh,
    getMe,
  };
};
