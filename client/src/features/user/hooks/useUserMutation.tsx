import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useAddUser, usePatchUser } from './useUser';

export function useUserMutation() {
  // const { refetch } = useListUser({}, { enabled: false });
  const { notify } = useAntDNoti();
  const { mutate: addFn } = useAddUser({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });
  const { mutate: updateFn } = usePatchUser({
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
  };
}
