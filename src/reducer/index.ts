import { BoxComponent, ComponentSchema } from '../types/lowCodeComp.type'
import { IStore, IAction } from '../types/store.types'
import { findCompFromJson } from '../utils/jsonSchemaUtils'
import ACTIONS from './actions'

const lowCodeReducer = {
  initializeInfo(store: IStore, payload: { projectName: string; author: string }): IStore {
    const { projectName, author } = payload
    const JSONSchema = {
      projectId: 'bytetance',
      projectName,
      author,
      data: []
    }
    return {
      ...store,
      lowCodeInfo: {
        JSONSchema,
        scale: 1,
        curTotalHeight: 0,
        curSelectCompId: '',
        curSelectLayerId: ''
      }
    }
  },

  updateSchema(store: IStore, payload: ComponentSchema): IStore {
    const lowCodeInfo = Object.assign({}, store.lowCodeInfo)
    const { curSelectLayerId, JSONSchema } = lowCodeInfo
    if (curSelectLayerId) {
      const parentComp = findCompFromJson(curSelectLayerId, JSONSchema.data) as BoxComponent
      if (parentComp) {
        payload.parentid = parentComp.id
        payload.style.top = parentComp.contentHeight + 'px'
        const contentHeight =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parseInt(parentComp.contentHeight) + parseInt(payload.style.height.match(/[0-9]+/g)![0])
        parentComp.contentHeight = contentHeight.toString()
        parentComp.children.push(payload)
      }
    } else {
      JSONSchema.data.push(payload)
      const elHeight = payload.style.height.match(/[0-9]+/g)
      if (elHeight?.length) {
        lowCodeInfo.curTotalHeight += parseInt(elHeight[0])
      }
    }
    return {
      ...store,
      lowCodeInfo
    }
  },

  updateScale(store: IStore, payload: number): IStore {
    const lowCodeInfo = Object.assign({}, store.lowCodeInfo)
    lowCodeInfo.scale = payload
    return {
      ...store,
      lowCodeInfo
    }
  },

  updateCurSelectedComp(store: IStore, payload: string): IStore {
    const lowCodeInfo = Object.assign({}, store.lowCodeInfo)
    lowCodeInfo.curSelectCompId = payload
    return {
      ...store,
      lowCodeInfo
    }
  },

  updateCurSelectedLayer(store: IStore, payload: string): IStore {
    const lowCodeInfo = Object.assign({}, store.lowCodeInfo)
    lowCodeInfo.curSelectLayerId = payload
    return {
      ...store,
      lowCodeInfo
    }
  }
}

const reducer = (state: IStore, action: IAction): IStore => {
  const { payload } = action
  switch (action.type) {
    case ACTIONS.INITIAL_USER:
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        userInfo: action.payload || {}
      }
    case ACTIONS.INITIAL_LOW_CODE:
      return lowCodeReducer.initializeInfo(state, payload)
    case ACTIONS.UPDATE_PREVIEW_SCALE:
      return lowCodeReducer.updateScale(state, payload)
    case ACTIONS.UPDATE_SCHEMA:
      return lowCodeReducer.updateSchema(state, payload)
    case ACTIONS.UPDATE_SELECTED_COMP:
      return lowCodeReducer.updateCurSelectedComp(state, payload)
    case ACTIONS.UPDATE_SELECTED_LAYWER:
      return lowCodeReducer.updateCurSelectedLayer(state, payload)
    default:
      return state
  }
}

export default reducer
