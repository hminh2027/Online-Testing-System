import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores';
import { endpoints } from '@/config';
import { addItem } from '@/hooks/useCustomQuery';
import { CustomMessage } from '@/components/CustomMessage';
import type { LoginPayload, ResAuthItem, SignUpPayload } from '..';

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

    return CustomMessage.success(res.message);
  }

  function handleOnError(err: string) {
    return CustomMessage.error(err);
  }

  const logIn = (loginPayload: LoginPayload) => logInMutate(loginPayload);

  const signUp = (signUpPayload: SignUpPayload) => signUpMutate(signUpPayload);

  const logOut = () => {};

  const refresh = () => {};

  const getMe = () => {};

  return {
    logIn,
    signUp,
    logOut,
    refresh,
    getMe,
  };
};
