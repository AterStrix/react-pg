import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BehaviorSubject } from 'rxjs'
import Bluebird from 'bluebird';
import { Response, ApiConfig, FullResponse } from '@nx-playground/axios-react-api';

const loadingRequests = new Set<AxiosRequestConfig>();
const errors$$ = new BehaviorSubject<Response<unknown>>(null);
const loading$$ = new BehaviorSubject<boolean>(false);

const responseState = <T>(data: T, config: AxiosRequestConfig, errorLifeTime: number): Response<T> => ({
  data,
  config,
  errorLifeTime,
  error: false,
  loading: true,
  success: false,
  headers: null,
  status: null,
  statusText: null,
  errorData: null,
  canceled: false,
});

const loadingRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (!loadingRequests.size) {
    loading$$.next(true);
  }
  loadingRequests.add(config);

  return config;
}

const loadingResponseInterceptor = (response: AxiosResponse): AxiosResponse => {
  loadingRequests.delete(response.config);
  if (!loadingRequests.size) {
    loading$$.next(false);
  }
  return response;
}

const setAxiosInterceptors = (instance: AxiosInstance, apiConfig: ApiConfig, extraConfig: ApiConfig) => {
  instance.interceptors.request.use(loadingRequestInterceptor, loadingRequestInterceptor);
  instance.interceptors.response.use(loadingResponseInterceptor, loadingResponseInterceptor);

  apiConfig.requestInterceptors?.forEach(([ onFulfilled, onRejected ]) => {
    instance.interceptors.request.use(onFulfilled, onRejected);
  });

  apiConfig.responseInterceptors?.forEach(([ onFulfilled, onRejected ]) => {
    instance.interceptors.response.use(onFulfilled, onRejected);
  });

  extraConfig.requestInterceptors?.forEach(([ onFulfilled, onRejected ]) => {
    instance.interceptors.request.use(onFulfilled, onRejected);
  });

  extraConfig.responseInterceptors?.forEach(([ onFulfilled, onRejected ]) => {
    instance.interceptors.response.use(onFulfilled, onRejected);
  });
}

const request = <T = unknown>(
  config: AxiosRequestConfig,
  initialData: T = null,
  silentError = false,
  extraConfig: Omit<ApiConfig, 'defaults'> = {},
): FullResponse<T> => {
  const ax = axios.create(Api.apiConfig().defaults);
  setAxiosInterceptors(ax, Api.apiConfig(), extraConfig);
  const cancel = axios.CancelToken.source();
  config.cancelToken = cancel.token;
  const initialState = responseState<T>(initialData, config, extraConfig.errorLifeTime ?? Api.apiConfig().errorLifeTime);
  return {
    initialState,
    promise: Bluebird
      .resolve(ax.request(config))
      .then<Response<T>>(data => ({ ...initialState, ...data, loading: false, success: true }))
      .catch<Response<T>>(errorData => {
        const resp: Response<T> = { ...initialState, errorData, loading: false };
        if (axios.isCancel(errorData)) {
          resp.canceled = true;
          return resp;
        } else {
          resp.error = true;
          if (!silentError) {
            errors$$.next(resp);
          }
        }
        console.log(resp);

        return resp;
      }),
    cancel,
  };
}

export class Api {
  static errors$ = errors$$.asObservable();
  static loading$ = loading$$.asObservable();

  private static config: ApiConfig = { defaults: axios.defaults };

  static apiConfig(apiConfig?: ApiConfig) {
    Api.config = apiConfig ? { ...Api.config, ...apiConfig } : Api.config;
    return Api.config;
  }

  static get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    initialData?: T,
    silentError?: boolean,
    extraConfig?: Omit<ApiConfig, 'defaults'>,
  ): FullResponse<T> {
    return request<T>({ url, method: 'GET', ...config }, initialData, silentError, extraConfig);
  }

  static post<T = unknown>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
    initialData?: T,
    silentError?: boolean,
    extraConfig?: Omit<ApiConfig, 'defaults'>,
  ): FullResponse<T> {
    return request<T>({ url, method: 'POST', data, ...config }, initialData, silentError, extraConfig);
  }

  static put<T = unknown>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
    initialData?: T,
    silentError?: boolean,
    extraConfig?: Omit<ApiConfig, 'defaults'>,
  ): FullResponse<T> {
    return request<T>({ url, method: 'PUT', data, ...config }, initialData, silentError, extraConfig);
  }

  static patch<T = unknown>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
    initialData?: T,
    silentError?: boolean,
    extraConfig?: Omit<ApiConfig, 'defaults'>,
  ): FullResponse<T> {
    return request<T>({ url, method: 'PATCH', data, ...config }, initialData, silentError, extraConfig);
  }

  static delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    initialData?: T,
    silentError?: boolean,
    extraConfig?: Omit<ApiConfig, 'defaults'>,
  ): FullResponse<T> {
    return request<T>({ url, method: 'DELETE', ...config }, initialData, silentError, extraConfig);
  }

  static request<T = unknown>(
    config: AxiosRequestConfig,
    initialData: T = null,
    silentError = false,
    extraConfig: Omit<ApiConfig, 'defaults'> = {},
  ): FullResponse<T> {
    return request<T>(config, initialData, silentError, extraConfig);
  }
}
