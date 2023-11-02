import { CustomMessage } from '@/components';
import { useAddExam, useUpdateExam } from './useExam';
import { useDrawer } from '@/hooks/useDrawer';

export function useExamMutation() {
  const { resetDrawerState } = useDrawer();

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
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  return {
    addFn,
    updateFn,
  };
}
