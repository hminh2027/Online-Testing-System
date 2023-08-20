import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchItem, fetchList } from '@/hooks/useCustomQuery/fetchQuery';
import type { Resource, ResponseItem } from '@/models/common';
import type { Service } from '@/types/service';

type ResponseList = ResponseItem<Resource[]>;
type ResponseDetail = ResponseItem<Resource[]>;
type ResponseModify = ResponseItem<Resource>;
type RequestQuery = QueryParams | undefined | null;
export type UseCustomQueryOptions<T> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn' | 'initialData'
> & { initialData?: () => undefined };

export const initialCustomQuery = <
  X extends Resource,
  Y extends ResponseList,
  Z extends ResponseDetail,
  W extends ResponseModify,
  T extends RequestQuery,
>(
  service: Service,
) => {
  const useItem = (
    id: number,
    options?: UseCustomQueryOptions<Z>,
  ): UseQueryResult<Z, unknown> =>
    useQuery(
      [service.path, id],
      () =>
        fetchItem<Z>({
          id,
          url: service.path,
        }),
      {
        refetchOnWindowFocus: false,
        enabled: !!id,
        ...options,
      },
    );

  const useList = (params: T, options?: UseCustomQueryOptions<Y>) =>
    useQuery<Y>(
      [service.path, params],
      () =>
        fetchList<T, Y>({
          params,
          url: service.path,
        }),
      {
        refetchOnWindowFocus: false,
        ...options,
      },
    );
};
