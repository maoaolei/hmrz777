// 对axios二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
const TimeOut = 3600
function IsCheckTimeOut() {
  const currentTime = +new Date() // 时间2 调用接口的时间
  const timeStamp = (currentTime - store.getters.hrsassTime) / 1000
  return timeStamp > TimeOut // 超时true 不超时为false
}
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 超时
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // 1.考虑把那些数据抛出去
  // 2.接口成功 并且业务成功
  // 3.  没有成功Promise.reject 抛出错误
  const { message, data, success } = response.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  console.log(error.response)
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token失效')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default service
