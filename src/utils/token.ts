import LoginApi from '../api/login'

export const JWT_ACCESS_TOKEN_KEY = 'room_jwt_access'
export const JWT_REFRESH_TOKEN_KEY = 'room_jwt_refresh'

export interface Token {
  value: string
  expire: number
}

type TokenType = 'access' | 'refresh'

interface IPayLoad {
  exp: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// 设置token
export const setToken = (value: string, type: TokenType) => {
  // 根据type判断token种类
  const itemKey = type === 'access' ? JWT_ACCESS_TOKEN_KEY : JWT_REFRESH_TOKEN_KEY
  const token = {
    expire: (JSON.parse(atob(value.split('.')[1])) as IPayLoad).exp,
    value: value
  }
  localStorage.setItem(itemKey, JSON.stringify(token))
}

// 获取token
export const getRefreshToken = (): Token | null => {
  const tokenStorage = localStorage.getItem(JWT_REFRESH_TOKEN_KEY)
  if (!tokenStorage) {
    return null
  }
  const token = JSON.parse(tokenStorage) as Token
  return token
}

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken()
  if (refreshToken && refreshToken.expire > Date.now() / 1000) {
    const res = await LoginApi.refreshTokenRequest(refreshToken.value)
    if (res) {
      setToken(res.accessToken, 'access')
      res.refreshToken && setToken(res.refreshToken, 'refresh')
      return res.accessToken
    } else {
      clearToken()
      return null
    }
  } else {
    clearToken()
    return null
  }
}

export const getAccessToken = async (): Promise<string | null> => {
  const tokenStorage = localStorage.getItem(JWT_ACCESS_TOKEN_KEY)
  if (tokenStorage) {
    const token = JSON.parse(tokenStorage) as Token
    if (token.expire > Date.now() / 1000) {
      return token.value
    }

    // access token expired, refresh access token by refresh token
    return await refreshAccessToken()
  } else {
    return await refreshAccessToken()
  }
}

// 移除token
export const clearToken = () => {
  localStorage.removeItem(JWT_ACCESS_TOKEN_KEY)
  localStorage.removeItem(JWT_REFRESH_TOKEN_KEY)
}
