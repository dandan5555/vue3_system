import axios from 'axios'

// axios的配置选项(全局的)
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000 //超时时间

// get请求
axios
  .get('/get', {
    params: {
      name: 'dandan',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// post请求
axios
  .post('/post', {
    data: {
      name: 'adan',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// axios.all当两个请求都回来之后，调用then
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'dandan',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'adan',
        age: 18
      }
    })
  ])
  .then((res) => console.log(res))

// axios拦截器
// fn1:请求发送成功会执行的函数
// fn2:请求发送失败会执行的函数
// axios.interceptors.request.use(fn1,fn2)
// axios.interceptors.response.use(fn1,fn2)
axios.interceptors.request.use(
  (config) => {
    console.log('请求成功')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
//fn1:数据响应成功：服务器正常返回数据
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
