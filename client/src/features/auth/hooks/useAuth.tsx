import { useAuthStore } from '../stores';
import type { ResAuthItem } from '..';
import { storage } from '@/utils';
import useLogin from './useLogin';
import useSignup from './useSignup';
import { axiosInstance } from '@/libs';
import { endpoints } from '@/config';
import type { ResUserItem } from '@/features/user';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

export const useAuth = () => {
  const { setUser, user } = useAuthStore();
  const { notify } = useAntDNoti();

  const { logIn } = useLogin({
    handleOnError,
    handleOnSuccess,
  });

  const { signUp } = useSignup({
    handleOnError,
    handleOnSuccess,
  });

  function handleOnSuccess(res: ResAuthItem) {
    setUser(res.content.user);
    window.location.assign('class');
    storage.set('Token', res.content.tokens.accessToken);
    notify({
      type: 'success',
      description: res.message,
    });
  }

  function handleOnError(err: string) {
    notify({
      type: 'error',
      description: err,
    });
  }

  const logOut = () => {
    storage.clear('Token');
    setUser(null);
    window.location.assign(`${window.location.origin}/login`);
  };

  const refresh = () => {};

  const getMe = async () => {
    const token = storage.get('Token');

    if (!token) return null;

    const res = await axiosInstance<ResUserItem>({
      url: `${endpoints.apis.auth.path}/me`,
      method: 'GET',
      data: { token },
    });

    setUser(res.content);

    return res.content;
  };

  return {
    logIn,
    signUp,
    logOut,
    refresh,
    getMe,
    user,
    setUser,
  };
};
