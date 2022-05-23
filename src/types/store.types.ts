import { IUserInfo } from './userInfo.types'

export interface IStore {
  userInfo: IUserInfo
}

export interface IAction<T = any> {
  type: string
  payload?: T
}
