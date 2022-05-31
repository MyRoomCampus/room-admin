import baseRequest from '.'
interface IUserInfoParam {
  userName?: string
  password: string
}

const USERINFO_URL = {
  changeUserInfo: '/user/password'
}

class UserInfoApi {
  static async changeUserInfoRequest(data: IUserInfoParam) {
    return await baseRequest.put<IUserInfoParam>(USERINFO_URL.changeUserInfo, data)
  }
}

export default UserInfoApi
