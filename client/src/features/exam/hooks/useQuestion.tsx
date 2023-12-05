import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import type {
  QuestionCreateDTO,
  ResQuestionItem,
  ResQuestionList,
  ResQuestionModify,
} from '../types';
import { QuestionService } from '../services/QuestionService';

export const {
  useItem: useQuestion,
  useList: useListQuestion,
  useAddItem: useAddQuestion,
  useAddItems: useAddQuestions,
  useUpdateItem: useUpdateQuestion,
  useDeleteItem: useDeleteQuestion,
} = initialCustomQuery<QuestionCreateDTO, ResQuestionList, ResQuestionItem, ResQuestionModify>(
  QuestionService,
);
