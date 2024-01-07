import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';

import dayjs from 'dayjs';
import { endpoints } from '@/config';
import type { Attempt, ResAttemptList } from '@/features/attempt/types';
import { axiosInstance } from '@/libs';
import { formatISOToVi } from '@/utils';

export interface ResultList {
  index: number;
  questionContent: string;
  userAnswers: string[];
  correctAnswers: string[];
  point: number;
  explanation?: string;
  isPointPerCorrection: boolean;
}

interface ResultMeta {
  correct: number;
  inCorrect: number;
  blank: number;
  totalPoint: number;
  examTotalPoint: number;
  startedAt: string;
  endedAt: string;
  timeSpent: number;
  isShowAnswer: boolean;
  numberOfMouseLeave: number;
}

export interface Result {
  meta: ResultMeta;
  list: ResultList[];
}

export function useResult() {
  const fetchResultByExamId = (id: string) =>
    axiosInstance<ResAttemptList>({
      url: `${endpoints.apis.attempt.path}/result?examId=${id}`,
      params: {},
    });

  const extractResult = (attempt: Attempt): Result => {
    const examTotalPoint = attempt.Exam.Question?.reduce((acc, cur) => acc + cur.point, 0);

    const meta = {
      correct: 0,
      inCorrect: 0,
      blank: 0,
      totalPoint: 0,
      examTotalPoint,
      startedAt: formatISOToVi(attempt.startedAt),
      endedAt: formatISOToVi(attempt.endedAt),
      timeSpent: dayjs(attempt.endedAt).diff(attempt.startedAt, 'minutes'),
      isShowAnswer: attempt.Exam.isShowAnswer,
      numberOfMouseLeave: attempt.numberOfMouseLeave as number,
    };

    const list = attempt.Exam.Question?.map((ques) => {
      const choices = attempt.Choice.filter((c) => c.questionId === ques.id);

      if (isEmpty(choices)) meta.blank += 1;

      const userAnswers = !isEmpty(choices) ? choices.map((c) => c.Answer.content) : [];
      const correctAnswers = ques.Answer.filter((q) => q.isCorrect).map((a) => a.content);

      let point = 0;

      if (isEqual(userAnswers, correctAnswers) && !ques.isPointPerCorrection) {
        meta.correct += 1;
        meta.totalPoint += ques.point;
        point = ques.point;
      } else if (ques.isPointPerCorrection) {
        const diff = difference(userAnswers, correctAnswers);

        const correctNumber = userAnswers.length - diff.length;

        meta.correct += 1;
        point = (ques.point / correctAnswers.length) * correctNumber;
        meta.totalPoint += point;
      } else {
        meta.inCorrect += 1;
      }

      return {
        index: ques.index,
        questionContent: ques.content,
        userAnswers,
        correctAnswers,
        point,
        explanation: ques.explanation,
        isPointPerCorrection: ques.isPointPerCorrection,
      };
    });

    return {
      list,
      meta,
    };
  };

  return {
    fetchResultByExamId,
    extractResult,
  };
}
