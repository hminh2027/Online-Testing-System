import { useMutation } from '@tanstack/react-query';
import { useAddClass, useDeleteClass, useListClass, useUpdateClass } from './useClass';
import { useDrawer } from '@/hooks/useDrawer';
import { addItem } from '@/hooks/useCustomQuery';
import type { ClassCreateDTO, ResClassItem } from '../types';
import { endpoints } from '@/config';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

export function useClassMutation() {
  const { resetDrawerState } = useDrawer();
  const { refetch } = useListClass({}, { enabled: false });
  const { notify } = useAntDNoti();
  const { mutate: addFn } = useAddClass({
    onSuccess: (res) => {
      resetDrawerState();
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });
  const { mutate: updateFn } = useUpdateClass({
    onSuccess: (res) => {
      resetDrawerState();
      notify({
        type: 'success',
        description: res.message,
      });
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
        notify({
          type: 'success',
          description: res.message,
        });
      },
      onError: () => {},
    },
  );

  const { mutate: deleteFn } = useDeleteClass({
    onSuccess: (res) => {
      resetDrawerState();
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
    copyFn,
  };
}
