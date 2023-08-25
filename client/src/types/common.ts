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

export interface QueryParams {
  page: number;
  size: number;
  sort: string;
}
