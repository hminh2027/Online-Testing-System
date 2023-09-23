import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores';
import { endpoints } from '@/config';
import { addItem } from '@/hooks/useCustomQuery';
import { CustomMessage } from '@/components/CustomMessage';
import type { LoginPayload } from '..';

export const useAuth = () => {
  const { setIsAuth } = useAuthStore();
  const navigator = useNavigate();

  const { mutate } = useMutation(
    (payload: LoginPayload) =>
      addItem({
        payload,
        url: `${endpoints.apis.auth.path}/login`,
      }),
    {
      onSuccess: handleOnSuccess,
      onError: handleOnError,
    },
  );

  function handleOnSuccess() {
    setIsAuth(true);
    navigator('/class');
  }

  function handleOnError(err: string) {
    return CustomMessage.error(err);
  }

  const logIn = (email: string, password: string) =>
    mutate({
      email,
      password,
    });

  const signUp = (email: string, password: string) =>
    mutate({
      email,
      password,
    });

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
