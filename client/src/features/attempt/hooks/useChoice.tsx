import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import type { ChoiceCreateDTO, ResChoiceItem, ResChoiceList } from '../types/choice';
import { ChoiceService } from '../services/ChoiceService';

export const { useAddItem: useAddChoice, useAddItems: useAddChoices } = initialCustomQuery<
  ChoiceCreateDTO,
  ResChoiceList,
  ResChoiceItem,
  null
>(ChoiceService);
