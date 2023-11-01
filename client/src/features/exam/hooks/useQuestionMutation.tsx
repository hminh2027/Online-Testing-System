import { CustomMessage } from '@/components';
import { useDeleteQuestion, useUpdateQuestion } from './useQuestion';
import { useDeleteAnswer } from './useAnswer';

export function useQuestionMutation() {
  const { mutate: updateFn } = useUpdateQuestion({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteQuestion({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  const { mutate: deleteAnsFn } = useDeleteAnswer({
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
    },
    onError: () => {},
  });

  return {
    updateFn,
    deleteFn,
    deleteAnsFn,
  };
}
