import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance
  constructor(config: HYRequestConfig) {
    //创建Axios实例
    this.instance = axios.create(config)
    //保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors
    //使用拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //添加所有实例的拦截器
    //请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading...',
            spinner: '',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        console.log('所有实例都有的拦截器,请求成功')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器,请求失败')
        return err
      }
    )
    //响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器,响应成功')
        this.loading?.close()
        const data = res.data
        if (data.success === true) {
          return res.data
        } else {
          console.log('请求错误')
        }
      },
      (err) => {
        this.loading?.close()
        console.log('所有实例都有的拦截器,响应成功')
        switch (err.response.status) {
          case 400:
            console.log('404错误')
        }

        return err
      }
    )
  }

  request<T>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //根据需要选择是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          resolve(res)
          console.log(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          console.log(err)
        })
    })
  }

  get<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'get' })
  }
  post<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'post' })
  }
  delete<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'delete' })
  }
  put<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'put' })
  }
}

export default HYRequest
