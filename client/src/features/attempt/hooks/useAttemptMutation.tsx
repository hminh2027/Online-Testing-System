import { CustomMessage } from '@/components';
import { useAddAttempt, useDeleteAttempt, useUpdateAttempt } from './useAttempt';

export function useAttemptMutation() {
  const { mutate: addFn } = useAddAttempt({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: updateFn } = useUpdateAttempt({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteAttempt({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  return {
    addFn,
    updateFn,
    deleteFn,
  };
}
