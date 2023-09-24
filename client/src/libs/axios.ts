import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import Axios from 'axios';

import { endpoints } from '@/config';

export type ResponseData<T> = AxiosResponse<T> | T | null;

export const defaultOptions: AxiosRequestConfig = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  },
  baseURL: endpoints.baseUrl,
};

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = localStorage.getItem('TOKEN');

  if (token) config.headers.authorization = `${token}`;

  config.headers.Accept = 'application/json';

  return config;
}

const axios = Axios.create(defaultOptions);

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const errMessage = err.response.data.message as string;

    return Promise.reject(errMessage);
  },
);

export const axiosInstance = async <T>(config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await axios({
    ...defaultOptions,
    ...config,
  });

  return res.data;
};
