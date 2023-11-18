export interface Resource {
  id?: number | string;
  createdAt?: Date;
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

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

// Either is needed to have a real mutually exclusive union type
export type Either<T, U> = T extends object
  ? U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : U
  : T;
