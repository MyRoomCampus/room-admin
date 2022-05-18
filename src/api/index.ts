import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from '@douyinfe/semi-ui'
interface IBaseReqStruct<T = any> {
  code: number
  errorCode: string
  data: T
}

const port = 3333
const prefix = '/'
const baseURL = `http://localhost:${port}${prefix}`
const timeout = 5000

const request = axios.create({
  baseURL,
  timeout,
  withCredentials: false
})

/** 请求拦截器 */
function resquestSuccessInterceptors(config: any) {
  // 携带上token
  const token = localStorage.getItem('room_jwt')
  token && (config.headers.Authorization = `Bearer ${token}`)
  return config
}
function requestFailInterceports(error: any) {
  return Promise.reject(error)
}
request.interceptors.request.use(
  // request success
  resquestSuccessInterceptors,
  // request fail
  requestFailInterceports
)

/** 响应拦截器 */
function responseSuccessInterceptors<T>(
  response: AxiosResponse<IBaseReqStruct<T>>
) {
  // 响应成功的拦截器
  return Promise.resolve(response.data)
}
function responseFailInterceptors(error: AxiosError) {
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
  return Promise.reject(
    `${error.config.baseURL ?? baseURL}${error.config.url ?? ''}`
  )
}
request.interceptors.response.use(
  responseSuccessInterceptors,
  responseFailInterceptors
)

const baseRequest = {
  get<T>(
    url: string,
    params?: Record<string, any>,
    config: AxiosRequestConfig = {}
  ) {
    return request.get<T, IBaseReqStruct<T>>(url, {
      params,
      ...config
    })
  },

  post<T>(
    url: string,
    data?: Record<string, any>,
    config: AxiosRequestConfig = {}
  ) {
    return request.post<T, IBaseReqStruct<T>>(url, data, {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      ...config
    })
  }
}
export default baseRequest
