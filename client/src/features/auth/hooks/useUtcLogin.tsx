import { useMutation } from '@tanstack/react-query';
import type { LoginPayload, ResAuthItem } from '..';
import { addItem } from '@/hooks/useCustomQuery';

interface useUtcLoginProps {
  handleOnSuccess: (res: ResAuthItem) => void;
  handleOnError: (err: string) => void;
}
export default function useUtcLogin({ handleOnSuccess, handleOnError }: useUtcLoginProps) {
  const { mutate } = useMutation(
    (payload: LoginPayload) =>
      addItem<LoginPayload, ResAuthItem>({
        payload,
        url: 'http://localhost:5000/student',
      }),
    {
      onSuccess: handleOnSuccess,
      onError: handleOnError,
    },
  );

  return { logInUtc: mutate };
}
