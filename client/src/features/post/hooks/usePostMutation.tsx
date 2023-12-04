import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useAddPost, useDeletePost, useUpdatePost } from './usePost';

export function usePostMutation() {
  // const { refetch } = useListPost({}, { enabled: false });
  const { notify } = useAntDNoti();
  const { mutate: addFn } = useAddPost({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });
  const { mutate: updateFn } = useUpdatePost({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeletePost({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });

  return {
    addFn,
    updateFn,
    deleteFn,
  };
}
