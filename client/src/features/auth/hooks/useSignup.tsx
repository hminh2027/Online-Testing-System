import { useMutation } from '@tanstack/react-query';
import type { MessageType } from 'antd/es/message/interface';
import type { ResAuthItem, SignUpPayload } from '..';
import { endpoints } from '@/config';
import { addItem } from '@/hooks/useCustomQuery';

interface useSignupProps {
  handleOnSuccess: (res: ResAuthItem) => MessageType;
  handleOnError: (err: string) => MessageType;
}
export default function useSignup({ handleOnSuccess, handleOnError }: useSignupProps) {
  const { mutate } = useMutation(
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

  return { signUp: mutate };
}
