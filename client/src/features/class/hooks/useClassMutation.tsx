import { useMutation } from '@tanstack/react-query';
import { CustomMessage } from '@/components';
import { useAddClass, useDeleteClass, useListClass, useUpdateClass } from './useClass';
import { useDrawer } from '@/hooks/useDrawer';
import { addItem } from '@/hooks/useCustomQuery';
import type { ClassCreateDTO, ResClassItem } from '../types';
import { endpoints } from '@/config';

export function useClassMutation() {
  const { resetDrawerState } = useDrawer();
  const { refetch } = useListClass({}, { enabled: false });

  const { mutate: addFn } = useAddClass({
    onSuccess: (res) => {
      resetDrawerState();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });
  const { mutate: updateFn } = useUpdateClass({
    onSuccess: (res) => {
      resetDrawerState();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: copyFn } = useMutation(
    (payload: Pick<ClassCreateDTO, 'id'>) =>
      addItem<object, ResClassItem>({
        payload: {},
        url: `${endpoints.apis.exam.path}/${payload.id}/copy`,
      }),
    {
      onSuccess: async (res) => {
        await refetch();
        resetDrawerState();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        CustomMessage.success(res.message);
      },
      onError: () => {},
    },
  );

  const { mutate: deleteFn } = useDeleteClass({
    onSuccess: (res) => {
      resetDrawerState();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  return {
    addFn,
    updateFn,
    deleteFn,
    copyFn,
  };
}
