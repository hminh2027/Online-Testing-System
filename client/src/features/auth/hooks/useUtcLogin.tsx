import { useMutation } from '@tanstack/react-query';
import { addItem } from '@/hooks/useCustomQuery';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useAuth } from '.';
import type { LoginUtcPayload, UTCResponse } from '..';

export default function useUtcLogin() {
  const { notify } = useAntDNoti();
  const { signUp } = useAuth();
  const { mutate } = useMutation(
    (payload: LoginUtcPayload) =>
      addItem<LoginUtcPayload, UTCResponse>({
        payload,
        url: 'http://localhost:5000/student',
      }),
    {
      onSuccess: ({ data: { email, firstName, lastName, studentId, tel }, error }) => {
        if (!error) {
          signUp({
            email,
            fullname: `${lastName} ${firstName}`,
            isTeacher: false,
            password: '123123',
            phone: tel,
            school: 'Trường đại học Giao Thông Vận Tải (UTC)',
            studentId,
          });
        }
      },
      onError: (err: string) => {
        console.log(err);
        notify({
          type: 'error',
          description: err,
        });
      },
    },
  );

  return { logInUtc: mutate };
}
