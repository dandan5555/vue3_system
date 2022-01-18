import { createApp } from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'
import { globalRegister } from './global'
// import '@/network/axios_demo'

// 全局引入element-plus插件
// import ElementPlus from "element-plus";

const app = createApp(App)
app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')

import ddRequest from './network'

ddRequest
  .request({
    url: '/home/multidata',
    method: 'GET'
    // showLoading: false
    // interceptors: {
    //   requestInterceptor(config) {
    //     console.log('单个请求拦截成功')
    //     return config
    //   },
    //   responseInterceptor(config) {
    //     console.log('单个响应拦截成功')
    //     return config
    //   }
    // }
  })
  .then((res) => console.log(res))
