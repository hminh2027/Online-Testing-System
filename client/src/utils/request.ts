import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '@/config';

export interface Request<T> {
  data?: T | null;
  url?: string;
  options?: AxiosRequestConfig;
}

export const defaultOptions: AxiosRequestConfig = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: config.baseUrl,
};

export type ResponstData<T> = AxiosResponse<T> | T | null;

export const request = async <T>({
  url = config.apis.default,
  options = {},
}: Request<T>): Promise<T> => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const res: AxiosResponse<T> = await axios(url, mergedOptions);

  return res.data;
};