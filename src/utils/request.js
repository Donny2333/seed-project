import axios from 'axios'
import {
  getItem
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 120000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  if (getItem('token')) {
    config.headers['Token'] = getItem('token')
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// 添加相应拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log(error) // for debug
  return Promise.reject(error)
})

service.all = axios.all

export default service
