import { useMutation } from '@tanstack/react-query';
import { CustomMessage } from '@/components';
import { useAddExam, useDeleteExam, useListExam, useUpdateExam } from './useExam';
import { useDrawer } from '@/hooks/useDrawer';
import { addItem } from '@/hooks/useCustomQuery';
import type { ExamCreateDTO, ResExamItem } from '../types';
import { endpoints } from '@/config';

export function useExamMutation() {
  const { resetDrawerState } = useDrawer();
  const { refetch } = useListExam({}, { enabled: false });

  const { mutate: addFn } = useAddExam({
    onSuccess: (res) => {
      resetDrawerState();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });
  const { mutate: updateFn } = useUpdateExam({
    onSuccess: (res) => {
      resetDrawerState();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
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
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        CustomMessage.success(res.message);
      },
      onError: () => {},
    },
  );

  const { mutate: deleteFn } = useDeleteExam({
    onSuccess: async (res) => {
      resetDrawerState();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
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
