import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addItem,
  deleteItem,
  fetchItem,
  fetchList,
  patchItem,
  updateItem,
} from '@/hooks/useCustomQuery/fetchQuery';
import type { Resource, ResponseItem } from '@/types/common';
import type { Service } from '@/types/service';

type ResponseList = ResponseItem<Resource[]> | null;
type ResponseDetail = ResponseItem<Resource> | null;
type ResponseModify = ResponseItem<Resource> | null;

export type UseCustomQueryOptions<T> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn' | 'initialData'
> & { initialData?: () => undefined };

export interface MutationParams<T> {
  onError?: (error: string) => Promise<void> | void;
  onSuccess: (data: T) => Promise<void> | void;
}

export interface UpdateParams<T> {
  id: number | string;
  payload: Partial<T>;
}

export interface DeleteParams {
  id: number;
}

export function handleSuccess<T>(onSuccess: (data: T) => Promise<void> | void) {
  return async (response: T) => {
    await onSuccess(response);
  };
}

export const initialCustomQuery = <
  X extends Resource,
  Y extends ResponseList,
  Z extends ResponseDetail,
  W extends ResponseModify,
>(
  service: Service,
) => {
  const useItem = (
    id: number | string,
    options?: UseCustomQueryOptions<Z>,
  ): UseQueryResult<Z, unknown> =>
    useQuery<Z>(
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

  const useList = (params: unknown, options?: UseCustomQueryOptions<Y>) =>
    useQuery<Y>(
      [service.path, params],
      () =>
        fetchList<Y>({
          params,
          url: service.path,
        }),
      {
        refetchOnWindowFocus: false,
        ...options,
      },
    );

  const useAddItem = ({ onError, onSuccess }: MutationParams<W>) => {
    const queryClient = useQueryClient();

    return useMutation(
      (payload: X) =>
        addItem<X, W>({
          payload,
          url: service.path,
        }),
      {
        onError,
        onSuccess: handleSuccess(onSuccess),
        onSettled: async () => {
          await queryClient.invalidateQueries([service.path]);
        },
      },
    );
  };

  const useUpdateItem = ({ onError, onSuccess }: MutationParams<W>) => {
    const queryClient = useQueryClient();

    return useMutation(
      ({ id, payload }: UpdateParams<X>) =>
        updateItem<Partial<X>, W>({
          id,
          payload,
          url: service.path,
        }),
      {
        onError,
        onSuccess: handleSuccess(onSuccess),
        onSettled: async () => {
          await queryClient.invalidateQueries([service.path]);
        },
      },
    );
  };

  const usePatchItem = ({ onError, onSuccess }: MutationParams<W>) => {
    const queryClient = useQueryClient();

    return useMutation(
      ({ id, payload }: UpdateParams<X>) =>
        patchItem<Partial<X>, W>({
          id,
          payload,
          url: service.path,
        }),
      {
        onError,
        onSuccess: handleSuccess(onSuccess),
        onSettled: async () => {
          await queryClient.invalidateQueries([service.path]);
        },
      },
    );
  };

  const useDeleteItem = ({ onError, onSuccess }: MutationParams<W>) => {
    const queryClient = useQueryClient();

    return useMutation(
      ({ id }: DeleteParams) =>
        deleteItem<W>({
          id,
          url: service.path,
        }),
      {
        onSettled: async () => {
          await queryClient.invalidateQueries([service.path]);
        },
        onError,
        onSuccess: handleSuccess(onSuccess),
      },
    );
  };

  return {
    useItem,
    useList,
    useAddItem,
    useUpdateItem,
    usePatchItem,
    useDeleteItem,
  };
};
