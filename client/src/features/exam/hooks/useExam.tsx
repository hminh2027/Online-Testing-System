import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import type { ExamCreateDTO, ResExamItem, ResExamList, ResExamModify } from '../types';
import { ExamService } from '../services/ExamService';

export const {
  useItem: useExam,
  useList: useListExam,
  useAddItem: useAddExam,
  useUpdateItem: useUpdateExam,
  usePatchItem: usePatchExam,
  useDeleteItem: useDeleteExam,
} = initialCustomQuery<ExamCreateDTO, ResExamList, ResExamItem, ResExamModify>(ExamService);
