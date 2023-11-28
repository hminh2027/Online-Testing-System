import { CustomMessage } from '@/components';
import {
  useAddQuestion,
  useAddQuestions,
  useDeleteQuestion,
  useUpdateQuestion,
} from './useQuestion';
import { useDeleteAnswer } from './useAnswer';
import { useExam } from './useExam';
import { axiosInstance } from '@/libs';
import { endpoints } from '@/config';

export function useQuestionMutation(examId: number) {
  const { refetch } = useExam(examId, {
    enabled: false,
  });
  const { mutate: addFn } = useAddQuestion({
    onSuccess: async (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
      await refetch();
    },
    onError: () => {},
  });

  const { mutate: addManyFn } = useAddQuestions({
    onSuccess: async (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
      await refetch();
    },
    onError: () => {},
  });

  const { mutate: updateFn } = useUpdateQuestion({
    onSuccess: async (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
      await refetch();
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteQuestion({
    onSuccess: async (res) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.success(res.message);
      await refetch();
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

  interface UpdateIndexPayload {
    indexArray: number[];
  }

  const updateIndex = async (payload: UpdateIndexPayload) => {
    await axiosInstance({
      url: `${endpoints.apis.question.path}/index`,
      method: 'POST',
      data: payload,
    });
  };

  return {
    addFn,
    addManyFn,
    updateFn,
    deleteFn,
    deleteAnsFn,
    updateIndex,
  };
}
