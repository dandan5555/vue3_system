// 定义类型的文件

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ddRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

// 扩展AxiosRequestConfig接口
export interface ddRequestConfig extends AxiosRequestConfig {
  interceptors?: ddRequestInterceptors
}

// export { ddRequestConfig, ddRequestInterceptors }
