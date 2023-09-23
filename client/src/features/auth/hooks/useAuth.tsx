import { useAuthStore } from '../stores';
import { request } from '@/utils';
import { endpoints } from '@/config';

export const useAuth = () => {
  const { setIsAuth } = useAuthStore();
  const login = async (email: string, password: string) => {
    // interact with api
    await request({
      url: `${endpoints.apis.auth.path}/login`,
      options: {
        method: 'POST',
        data: {
          email,
          password,
        },
      },
    })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => setIsAuth(true));
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
