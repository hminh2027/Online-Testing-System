import { useMutation } from '@tanstack/react-query';
import { useAddExam, useDeleteExam, useListExam, useUpdateExam } from './useExam';
import { useDrawer } from '@/hooks/useDrawer';
import { addItem } from '@/hooks/useCustomQuery';
import type { ExamCreateDTO, ResExamItem } from '../types';
import { endpoints } from '@/config';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

export function useExamMutation() {
  const { resetDrawerState } = useDrawer();
  const { refetch } = useListExam({}, { enabled: false });
  const { notify } = useAntDNoti();

  const { mutate: addFn } = useAddExam({
    onSuccess: (res) => {
      resetDrawerState();
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });
  const { mutate: updateFn } = useUpdateExam({
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
    (payload: Pick<ExamCreateDTO, 'id'>) =>
      addItem<object, ResExamItem>({
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

  const { mutate: deleteFn } = useDeleteExam({
    onSuccess: async (res) => {
      resetDrawerState();
      notify({
        type: 'success',
        description: res.message,
      });
      await refetch({ stale: true });
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
