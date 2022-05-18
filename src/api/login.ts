import baseRequest from '.'
import { type ILoginParam, type IUserInfo } from '../types/userInfo.types'
const LOGIN_URL = {
  register: '/register',
  login: '/login'
}

class LoginApi {
  static async loginRequest(data: ILoginParam) {
    return await baseRequest.post<{token: string}>(LOGIN_URL.login, data)
  }

  static async registerRequest(data: ILoginParam) {
    return await baseRequest.post<IUserInfo>(LOGIN_URL.register, data)
  }

  static async testGetBadRequest(data: Record<string, unknown> = {}) {
    return await baseRequest.get<IUserInfo>('/abcd', data)
  }

  static async testPostBadRequest(data: Record<string, unknown> = {}) {
    return await baseRequest.post<IUserInfo>('/fghi', data)
  }
}

export default LoginApi
