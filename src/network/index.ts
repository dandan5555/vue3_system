// 网络请求统一出口
import { ddRequest } from './request'

import { BASE_URL, TIME_OUT } from './request/config'

export default new ddRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      console.log('实例请求拦截成功')
      return config
    },
    requestInterceptorCatch(err) {
      console.log('实例请求拦截失败')
      return err
    },
    responseInterceptor(config) {
      console.log('实例响应拦截成功')
      return config
    },
    responseInterceptorCatch(err) {
      console.log('实例响应拦截失败')
      // console.log(err.response)
      return err
    }
  }
})
