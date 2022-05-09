// 30天后过期
const TOKEN_EXPIRE_DAY = 30
const JWT_TOKEN_KEY = 'room_jwt'
export type Token = {
  value: string
  expire?: number
}

// 设置token
export const setToken = (value: string, expire: number | null = null) => {
  const time = new Date()
  // Token过期时间
  time.setDate(time.getDate() + (expire ?? TOKEN_EXPIRE_DAY))
  const token = {
    expire: time.getTime(),
    value: value
  }
  localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(token))
}

// 获取token
export const getToken = () => {
  const tokenStorage = localStorage.getItem(JWT_TOKEN_KEY)
  if (!tokenStorage) {
    return null
  }
  const token = JSON.parse(tokenStorage)
  if (token.expire < Date.now()) {
    return null
  }
  return token.value
}

// 移除token
export const clearToken = () => {
  localStorage.removeItem(JWT_TOKEN_KEY)
}
