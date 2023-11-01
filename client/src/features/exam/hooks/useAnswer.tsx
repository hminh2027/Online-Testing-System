import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import type { AnswerCreateDTO, ResAnswerModify } from '../types';
import { AnswerService } from '../services/AnswerService';

export const { useDeleteItem: useDeleteAnswer } = initialCustomQuery<
  AnswerCreateDTO,
  null,
  null,
  ResAnswerModify
>(AnswerService);
