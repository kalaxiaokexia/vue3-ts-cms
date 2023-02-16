// service 统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败')
      return err
    },
    responseInterceptor: (config) => {
      console.log('响应成功')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败')
      return err
    }
  }
})

export default hyRequest
