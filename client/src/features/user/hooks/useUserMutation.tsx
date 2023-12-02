import { CustomMessage } from '@/components';
import { useAddUser, useListUser, usePatchUser } from './useUser';

export function useUserMutation() {
  const { refetch } = useListUser({}, { enabled: false });

  const { mutate: addFn } = useAddUser({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });
  const { mutate: updateFn } = usePatchUser({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  return {
    addFn,
    updateFn,
  };
}
