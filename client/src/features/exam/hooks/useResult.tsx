import { endpoints } from '@/config';
import type { Attempt, ResAttemptList } from '@/features/attempt/types';
import { axiosInstance } from '@/libs';

export function useResult() {
  const fetchResultByExamId = (id: string) =>
    axiosInstance<ResAttemptList>({
      url: `${endpoints.apis.attempt.path}/result?examId=${id}`,
      params: {},
    });

  const extractResult = (attempt: Attempt) => {
    console.log(attempt);

    let blank = 0;

    const fullres = attempt.Exam?.Question?.map((ques) => {
      const choice = attempt.Choice.find((c) => c.questionId === ques.id);

      if (!choice) blank++;

      return {
        questionContent: ques.content,
        answer: choice && choice.Answer.content,
      };
    });

    console.log(fullres);
  };

  return {
    fetchResultByExamId,
    extractResult,
  };
}
