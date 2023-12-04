import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import {
  useAddUserClass,
  useAddUserClasses,
  useDeleteUserClass,
  useListUserClass,
  usePatchUserClass,
} from './useUserClass';

export function useUserClassMutation() {
  const { refetch } = useListUserClass({}, { enabled: false });
  const { notify } = useAntDNoti();

  const { mutate: addFn } = useAddUserClass({
    onSuccess: async (res) => {
      await refetch();
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });

  const { mutate: addManyFn } = useAddUserClasses({
    onSuccess: async (res) => {
      await refetch();
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });

  const { mutate: patchFn } = usePatchUserClass({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteUserClass({
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
    addManyFn,
    patchFn,
    deleteFn,
  };
}
