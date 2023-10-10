import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { CustomMessage } from '@/components/CustomMessage';
import type { ResAuthItem } from '..';
import { storage } from '@/utils';
import useLogin from './useLogin';
import useSignup from './useSignup';
import useUtcLogin from './useUtcLogin';

export const useAuth = () => {
  const { setIsAuth } = useAuthStore();
  const navigator = useNavigate();

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
    setIsAuth(true);
    navigator('/class');
    storage.setToken(res.content.tokens.accessToken);

    return CustomMessage.success(res.message);
  }

  function handleOnError(err: string) {
    return CustomMessage.error(err);
  }

  const logOut = () => {
    storage.clearToken();
    setIsAuth(false);
    navigator('/login');
  };

  const refresh = () => {};

  const getMe = () => {};

  return {
    logIn,
    logInUtc,
    signUp,
    logOut,
    refresh,
    getMe,
  };
};
