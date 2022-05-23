import React, { Dispatch } from 'react'
import { IStore, IAction } from '../types/store.types'

interface IContext {
  store: IStore
  dispatch: Dispatch<IAction>
}

const initialStore: IStore = {
  userInfo: {
    uid: 0,
    account: '',
    nickname: ''
  }
}

const AppContext = React.createContext<IContext>({} as any)

export default AppContext
export { initialStore }
