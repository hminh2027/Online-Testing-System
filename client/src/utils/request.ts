import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { endpoints } from '@/config';

export interface Request<T> {
  data?: T | null;
  url?: string;
  options?: AxiosRequestConfig;
}

export const defaultOptions: AxiosRequestConfig = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  },
  baseURL: endpoints.baseUrl,
};

export type ResponstData<T> = AxiosResponse<T> | T | null;

export const request = async <T>({
  url = endpoints.apis.default,
  options = {},
}: Request<T>): Promise<T> => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const res: AxiosResponse<T> = await axios(url, mergedOptions);

  return res.data;
};
