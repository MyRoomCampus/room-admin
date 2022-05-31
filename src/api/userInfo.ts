import baseRequest from '.'
interface IUserInfoParam {
  username: string
  password: string
}

const USERINFO_URL = {
  update: '/auth/validate-info'
}

class UserInfoApi {
  static async loginRequest(data: IUserInfoParam) {
    return await baseRequest.post<IUserInfoParam>(USERINFO_URL.update, data)
  }
}

export default UserInfoApi
