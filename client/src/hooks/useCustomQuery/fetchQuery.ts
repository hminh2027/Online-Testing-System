import { request } from '@/utils/request';

type ParamsData = {
  url?: string;
};

type ItemData = ParamsData & { id: string | number };
type ListData<T> = ParamsData & { params: T };
type AddData<T> = ParamsData & { payload: T };
type UpdateData<T> = ItemData & AddData<T>;

export function fetchItem<Y>({ id, url = '' }: ItemData): Promise<Y> {
  return request<Y>({ url: `${url}/${id}` });
}

export function fetchList<X, Y>({ params, url }: ListData<X>) {
  return request<Y>({
    url,
    options: { params },
  });
}

export function addItem<X, Y>({ payload, url = '' }: AddData<X>): Promise<Y> {
  return request<Y>({
    url,
    options: {
      method: 'POST',
      data: payload,
    },
  });
}

export function patchItem<X, Y>({
  id,
  payload,
  url = '',
}: UpdateData<X>): Promise<Y> {
  return request<Y>({
    url: `${url}/${id}`,
    options: {
      method: 'PATCH',
      data: payload,
    },
  });
}

export function updateItem<X, Y>({
  id,
  payload,
  url = '',
}: UpdateData<X>): Promise<Y> {
  return request<Y>({
    url: `${url}/${id}`,
    options: {
      method: 'PUT',
      data: payload,
    },
  });
}

export function deleteItem<Y>({ id, url = '' }: ItemData): Promise<Y> {
  return request<Y>({
    url: `${url}/${id}`,
    options: {
      method: 'DELETE',
    },
  });
}
