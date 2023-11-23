import { CustomMessage } from '@/components';
import {
  useAddUserClass,
  useDeleteUserClass,
  useListUserClass,
  usePatchUserClass,
} from './useUserClass';

export function useUserClassMutation() {
  const { refetch } = useListUserClass({}, { enabled: false });
  const { mutate: addFn } = useAddUserClass({
    onSuccess: async (res) => {
      await refetch();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: patchFn } = usePatchUserClass({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteUserClass({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  return {
    addFn,
    patchFn,
    deleteFn,
  };
}
