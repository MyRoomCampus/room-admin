/* eslint-disable @typescript-eslint/return-await */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from '@douyinfe/semi-ui'
import { getAccessToken } from '../utils/token'

const baseURL = import.meta.env.VITE_BASE_URL as string
console.log('base_url', baseURL)
const timeout = 5000

const request = axios.create({
  baseURL,
  timeout,
  withCredentials: true
})

/** 请求拦截器 */
// eslint-disable-next-line
async function requestSuccessInterceptors(config: any) {
  // 携带上token
  if (!config.headers.Authorization) {
    const token = await getAccessToken()
    token && (config.headers.Authorization = `Bearer ${token}`)
  }
  return config
}
// eslint-disable-next-line
function requestFailInterceptors(error: any) {
  return Promise.reject(error)
}
request.interceptors.request.use(
  // request success
  requestSuccessInterceptors,
  // request fail
  requestFailInterceptors
)

/** 响应拦截器 */
async function responseSuccessInterceptors<T>(response: AxiosResponse<T>) {
  // 响应成功的拦截器
  return response.data
}
async function responseFailInterceptors(error: AxiosError) {
  const response = error.response
  const status = response?.status
  switch (status) {
    case 401:
      Toast.error('Ooops, 未登录')
      break
    case 404:
      Toast.error('Ooops, 404 Not Found')
      break
    case 500:
      Toast.error('Ooops, 服务器出错啦')
      break
    default:
      Toast.error('Ooops, something went wrong...')
      break
  }
  console.error(`http请求错误，请求路径: ${error.config.url ?? ''}`)
  return undefined
}
request.interceptors.response.use(responseSuccessInterceptors, responseFailInterceptors)

const baseRequest = {
  // eslint-disable-next-line 
  get<T>(url: string, params?: Record<string, any>, config: AxiosRequestConfig = {}) {
    return request.get<T, T>(url, {
      params,
      ...config
    })
  },

  // eslint-disable-next-line
  post<T>(url: string, data?: Record<string, any>, config: AxiosRequestConfig = {}) {
    return request.post<T, T>(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...config
    })
  },
  // eslint-disable-next-line
  postJson<T>(url: string, data?: Record<string, any>, config: AxiosRequestConfig = {}) {
    return request.post<T, T>(url, data, {
      headers: { 'Content-Type': 'application/json' },
      ...config
    })
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put<T>(url: string, data?: Record<string, any>, config: AxiosRequestConfig = {}) {
    return request.put<T, T>(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...config
    })
  },

  // eslint-disable-next-line
  del<T>(url: string, data?: Record<string, any>, config: AxiosRequestConfig = {}) {
    return request.delete<T, T>(url, {
      ...config
    })
  }
}
export default baseRequest
