import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import hyRequest from './service'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

console.log(process.env)

interface ReturnModel {
  id: number
  ishan: string
  success: boolean
}

// hyRequest.request<ReturnModel>({
//   url: 'love?type=json',
//   method: 'GET',
//   showLoading: true,
//   interceptors: {
//     requestInterceptor(config) {
//       const token = ''
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }
//       console.log('单独请求成功的拦截')
//       return config
//     },
//     requestInterceptorCatch(error) {
//       console.log('单独请求失败的拦截')
//       return error
//     },
//     responseInterceptor(config) {
//       console.log('单独响应成功的拦截')
//       return config
//     },
//     responseInterceptorCatch(error) {
//       console.log('单独响应失败的拦截')
//       return error
//     }
//   }
// })
//request请求
// hyRequest
//   .request<ReturnModel>({
//     url: 'love?type=json',
//     method: 'GET',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res.id)
//     console.log(res.ishan)
//     console.log(res.success)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//get请求
hyRequest
  .get<ReturnModel>({
    url: 'love?type=json',
    showLoading: true
  })
  .then((res) => {
    console.log(res.id)
    console.log(res.ishan)
    console.log(res.success)
  })
  .catch((err) => {
    console.log(err)
  })
