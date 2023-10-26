import { useAuthStore } from '../stores';
import { CustomMessage } from '@/components/CustomMessage';
import type { ResAuthItem } from '..';
import { storage } from '@/utils';
import useLogin from './useLogin';
import useSignup from './useSignup';
import useUtcLogin from './useUtcLogin';
import { axiosInstance } from '@/libs';
import { endpoints } from '@/config';
import type { ResUserItem } from '@/features/user';

export const useAuth = () => {
  const { setUser, user } = useAuthStore();

  const { logIn } = useLogin({
    handleOnError,
    handleOnSuccess,
  });

  const { signUp } = useSignup({
    handleOnError,
    handleOnSuccess,
  });

  const { logInUtc } = useUtcLogin({
    handleOnError,
    handleOnSuccess,
  });

  function handleOnSuccess(res: ResAuthItem) {
    setUser(res.content.user);
    window.location.assign('class');
    storage.setToken(res.content.tokens.accessToken);

    return CustomMessage.success(res.message);
  }

  function handleOnError(err: string) {
    return CustomMessage.error(err);
  }

  const logOut = () => {
    storage.clearToken();
    setUser(null);
    window.location.assign(window.location.origin as unknown as string);
  };

  const refresh = () => {};

  const getMe = async () => {
    const token = storage.getToken();

    const res = await axiosInstance<ResUserItem>({
      url: `${endpoints.apis.auth.path}/me`,
      method: 'GET',
      data: { token },
    });

    setUser(res.content);
  };

  return {
    logIn,
    logInUtc,
    signUp,
    logOut,
    refresh,
    getMe,
    user,
    setUser,
  };
};
