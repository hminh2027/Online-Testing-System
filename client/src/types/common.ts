import type { defaultParams } from '@/types/query-params';

export interface Resource {
  id?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  size: number;
}

export interface ResponseItem<T> {
  message: string;
  content: T;
}

export type QueryParams = typeof defaultParams;
