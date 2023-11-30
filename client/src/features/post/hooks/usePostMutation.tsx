import { CustomMessage } from '@/components';
import { useAddPost, useDeletePost, useListPost, useUpdatePost } from './usePost';

export function usePostMutation() {
  const { refetch } = useListPost({}, { enabled: false });

  const { mutate: addFn } = useAddPost({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });
  const { mutate: updateFn } = useUpdatePost({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeletePost({
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
