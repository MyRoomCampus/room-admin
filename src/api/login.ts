import baseRequest from '.'
interface ILoginParam {
  username: string
  password: string
}

interface ILoginToken {
  accessToken: string
  refreshToken: string
}

const LOGIN_URL = {
  register: '/auth/register',
  login: '/auth/login',
  refresh: '/auth/refresh'
}

class LoginApi {
  static async loginRequest(data: ILoginParam) {
    return await baseRequest.post<ILoginToken>(LOGIN_URL.login, data)
  }

  static async registerRequest(data: ILoginParam) {
    return await baseRequest.post<{ msg: string }>(LOGIN_URL.register, data)
  }

  static async refreshTokenRequest(refreshToken: string) {
    return await baseRequest.get<{ accessToken: string, refreshToken?: string }>(
      LOGIN_URL.refresh,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    )
  }
}

export default LoginApi
