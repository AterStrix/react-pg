import Bluebird from 'bluebird';
import { AxiosRequestConfig, AxiosInterceptorManager, AxiosResponse, CancelTokenSource } from 'axios';

export interface Response<T> extends AxiosResponse<T> {
  loading: boolean;
  success: boolean;
  error: boolean;
  errorData: unknown;
  canceled: boolean;
  errorLifeTime: number;
}

export interface FullResponse<T> {
  initialState: Response<T>;
  promise: Bluebird<Response<T>>;
  cancel: CancelTokenSource;
}

export type requestInterceptor = Parameters<AxiosInterceptorManager<AxiosRequestConfig>["use"]>;
export type responseInterceptor = Parameters<AxiosInterceptorManager<AxiosResponse<unknown>>["use"]>;

export interface ApiConfig {
  defaults?: AxiosRequestConfig;
  requestInterceptors?: requestInterceptor[];
  responseInterceptors?: responseInterceptor[];
  errorLifeTime?: number;
}
