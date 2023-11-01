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
  useAddItem: useAddQuestion,
  useUpdateItem: useUpdateQuestion,
  useDeleteItem: useDeleteQuestion,
} = initialCustomQuery<QuestionCreateDTO, ResQuestionList, ResQuestionItem, ResQuestionModify>(
  QuestionService,
);
