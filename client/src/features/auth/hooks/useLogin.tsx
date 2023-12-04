import { useMutation } from '@tanstack/react-query';
import type { LoginPayload, ResAuthItem } from '..';
import { addItem } from '@/hooks/useCustomQuery';
import { endpoints } from '@/config';

interface useLoginProps {
  handleOnSuccess: (res: ResAuthItem) => void;
  handleOnError: (err: string) => void;
}
export default function useLogin({ handleOnSuccess, handleOnError }: useLoginProps) {
  const { mutate } = useMutation(
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

  return { logIn: mutate };
}
