// 定义类型的文件

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ddRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 扩展AxiosRequestConfig接口
export interface ddRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ddRequestInterceptors<T>
  showLoading?: boolean
}
