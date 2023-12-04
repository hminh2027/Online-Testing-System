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
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

export function useQuestionMutation(examId: number) {
  const { refetch } = useExam(examId, {
    enabled: false,
  });
  const { notify } = useAntDNoti();
  const { mutate: addFn } = useAddQuestion({
    onSuccess: async (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
      await refetch();
    },
    onError: () => {},
  });

  const { mutate: addManyFn } = useAddQuestions({
    onSuccess: async (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
      await refetch();
    },
    onError: () => {},
  });

  const { mutate: updateFn } = useUpdateQuestion({
    onSuccess: async (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
      await refetch();
    },
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteQuestion({
    onSuccess: async (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
      await refetch();
    },
    onError: () => {},
  });

  const { mutate: deleteAnsFn } = useDeleteAnswer({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
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
