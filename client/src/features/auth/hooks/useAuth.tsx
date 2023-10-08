import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores';
import { endpoints } from '@/config';
import { addItem } from '@/hooks/useCustomQuery';
import { CustomMessage } from '@/components/CustomMessage';
import type { LoginPayload, ResAuthItem, SignUpPayload } from '..';
import { storage } from '@/utils';
import type { LoginUtcPayload } from '../components/LoginModal';

export const useAuth = () => {
  const { setIsAuth } = useAuthStore();
  const navigator = useNavigate();

  const { mutate: logInMutate } = useMutation(
    (payload: LoginPayload) =>
      addItem<LoginPayload, ResAuthItem>({
        payload,
        url: `${endpoints.apis.auth.path}/login`,
      }),
    {
      onSuccess: handleOnSuccess,
      onError: handleOnError,
    },
  );

  const { mutate: logInUtcMutate } = useMutation(
    (payload: LoginUtcPayload) =>
      addItem<LoginUtcPayload, ResAuthItem>({
        payload,
        url: 'http://localhost:5000/student',
      }),
    {
      onSuccess: (res) => res,
      onError: handleOnError,
    },
  );

  const { mutate: signUpMutate } = useMutation(
    (payload: SignUpPayload) =>
      addItem<SignUpPayload, ResAuthItem>({
        payload,
        url: `${endpoints.apis.auth.path}/signup`,
      }),
    {
      onSuccess: handleOnSuccess,
      onError: handleOnError,
    },
  );

  function handleOnSuccess(res: ResAuthItem) {
    setIsAuth(true);
    navigator('/class');
    storage.setToken(res.content.tokens.accessToken);

    return CustomMessage.success(res.message);
  }

  function handleOnError(err: string) {
    return CustomMessage.error(err);
  }

  const logIn = (loginPayload: LoginPayload) => logInMutate(loginPayload);
  const logInUtc = (loginPayload: LoginUtcPayload) => {
    const vkl = logInUtcMutate(loginPayload);

    console.log(vkl);
  };

  const signUp = (signUpPayload: SignUpPayload) => signUpMutate(signUpPayload);

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
