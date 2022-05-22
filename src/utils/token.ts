import LoginApi from '../api/login'

const JWT_ACCESS_TOKEN_KEY = 'room_jwt_access'
const JWT_REFRESH_TOKEN_KEY = 'room_jwt_refresh'

export type Token = {
  value: string
  expire?: number
}

type TokenType = 'access' | 'refresh'

interface IPayLoad {
  exp: number
  [key: string]: any
}

// 设置token
export const setToken = (value: string, type: TokenType) => {
  // 根据type判断token种类
  const itemKey =
    type === 'access' ? JWT_ACCESS_TOKEN_KEY : JWT_REFRESH_TOKEN_KEY
  const token = {
    expire: (JSON.parse(atob(value.split('.')[1])) as IPayLoad).exp,
    value: value
  }
  localStorage.setItem(itemKey, JSON.stringify(token))
}

// 获取token
export const getToken = async (type: TokenType = 'access') => {
  const itemKey =
    type === 'access' ? JWT_ACCESS_TOKEN_KEY : JWT_REFRESH_TOKEN_KEY
  const tokenStorage = localStorage.getItem(itemKey)
  if (!tokenStorage) {
    return null
  }
  const token = JSON.parse(tokenStorage)

  // accessToken 过期判断
  if (type === 'access' && token.expire < Date.now() / 1000) {
    const res = await LoginApi.refreshTokenRequest(await getToken('refresh'));
    setToken(res.accessToken, 'access');
  }
  return token.value
}

// 移除token
export const clearToken = () => {
  localStorage.removeItem(JWT_ACCESS_TOKEN_KEY)
}