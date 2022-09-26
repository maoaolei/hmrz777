// 对axios二次封装
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
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
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
