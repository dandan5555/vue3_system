import axios from 'axios'
import { AxiosInstance } from 'axios'

import { ddRequestConfig, ddRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus'

class ddRequest {
  instance: AxiosInstance
  interceptors?: ddRequestInterceptors
  // loading: ILoadingInstance

  constructor(config: ddRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

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
        // 添加loading画面
        ElLoading.service({
          // lock: true,
          // text: '正在请求数据...'
          // background: 'ragb(0,0,0,.8)'
        })
        console.log('all 请求拦截success')
        ElLoading.service()
        return config
      },
      (err) => {
        console.log('all 请求拦截default')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        console.log('all响应拦截success')
        // if (config.data.returnCode === '-1001') {
        //   console.log('请求失败')
        // } else {
        console.log(config)

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

  request(config: ddRequestConfig): void {
    // 判断单个请求是否有请求拦截
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      // 判断单个请求是否有响应拦截
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export { ddRequest }
