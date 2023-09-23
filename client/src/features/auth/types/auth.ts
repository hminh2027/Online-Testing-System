import type { User } from '@/features/user/types';
import type { ResponseItem } from '@/types/common';

export interface Auth extends User {}

export type ResAuthItem = ResponseItem<Auth>;
export type ResAuthModify = ResponseItem<Auth>;
