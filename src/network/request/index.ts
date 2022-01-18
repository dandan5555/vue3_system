import axios from 'axios'
import { AxiosInstance } from 'axios'

import { ddRequestConfig, ddRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const SHOW_LOADING = true

class ddRequest {
  instance: AxiosInstance
  interceptors?: ddRequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: ddRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? SHOW_LOADING

    // 从config中取出的拦截器是对应的实例才有的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 如果isloading为true时，就添加loading动画
        if (this.showLoading) {
          // 添加loading画面
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'ragb(0,0,0,.8)'
          })
        }
        console.log('all 请求拦截success')
        return config
      },
      (err) => {
        console.log('all 请求拦截default')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        // 将loading移除
        this.loading?.close()

        console.log('all响应拦截success')
        // if (config.data.returnCode === '-1001') {
        //   console.log('请求失败')
        // } else {
        // console.log(config)

        return config.data
        // }
      },
      (err) => {
        // 比如：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === '404') {
          console.log('404错误')
        }
        console.log('all响应拦截default')
        return err
      }
    )
  }

  request<T>(config: ddRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = false
      }

      // 判断单个请求是否有请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 判断单个请求是否有响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          resolve(res)

          // 将showLoading设置为true，这样不会影响下一次请求
          this.showLoading = SHOW_LOADING
        })
        .catch((err) => {
          // 将showLoading设置为true，这样不会影响下一次请求
          this.showLoading = SHOW_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: ddRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: ddRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: ddRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: ddRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export { ddRequest }
