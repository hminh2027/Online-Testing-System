import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import type { AttemptCreateDTO, ResAttemptItem, ResAttemptList, ResAttemptModify } from '../types';
import { AttemptService } from '../services/AttemptService';

export const {
  useItem: useAttempt,
  useList: useListAttempt,
  useAddItem: useAddAttempt,
  useUpdateItem: useUpdateAttempt,
  usePatchItem: usePatchAttempt,
  useDeleteItem: useDeleteAttempt,
} = initialCustomQuery<AttemptCreateDTO, ResAttemptList, ResAttemptItem, ResAttemptModify>(
  AttemptService,
);
