import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useAddNotification, useDeleteNotification, usePatchNotification } from './useNotification';

export function useNotificationMutation() {
  const { notify } = useAntDNoti();
  const { mutate: addFn } = useAddNotification({
    onSuccess: () => {},
    onError: () => {},
  });
  const { mutate: patchFn } = usePatchNotification({
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteNotification({
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
    patchFn,
    deleteFn,
  };
}
