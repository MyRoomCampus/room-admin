import { IStore, IAction } from '../types/store.types'
import ACTIONS from './actions'
const reducer = (state: IStore, action: IAction): IStore => {
  switch (action.type) {
    case ACTIONS.INITIAL_USER:
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        userInfo: action.payload || {}
      }
    default:
      return state
  }
}

export default reducer
