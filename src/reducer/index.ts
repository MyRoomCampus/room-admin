import { BoxComponent, ComponentName, ComponentSchema, IHouseCardData } from '../types/lowCodeComp.type'
import { IStore, IAction } from '../types/store.types'
import { IUserInfo } from '../types/userInfo.types'
import { findCompFromJson } from '../utils/jsonSchemaUtils'
import ACTIONS from './actions'

export type InitLowCodeInfo = { projectName: string; author: string; houseCardData: IHouseCardData }

export type ActionPayLoad = InitLowCodeInfo | ComponentSchema | number | string | IUserInfo
const lowCodeReducer = {
  initializeInfo(store: IStore, payload: InitLowCodeInfo): IStore {
    const { projectName, author, houseCardData } = payload
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
        curSelectLayerId: '',
        houseCardData
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
        parentComp.children.push(payload)
      }
    } else {
      JSONSchema.data.push(payload)
    }
    lowCodeInfo && (lowCodeInfo.curSelectCompId = payload.id)
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
  },

  updateComponent(store: IStore, payload: ComponentSchema): IStore {
    const lowCodeInfo = Object.assign({}, store.lowCodeInfo)
    const iterateSchema = (schemas: ComponentSchema[]): ComponentSchema[] => {
      return schemas.map((schema) => {
        if (schema.id === payload.id) {
          return payload
        }
        if (schema.name === ComponentName.BoxComponent) {
          schema.children = iterateSchema(schema.children)
          return schema
        }
        return schema
      })
    }
    lowCodeInfo.JSONSchema.data = iterateSchema(lowCodeInfo.JSONSchema.data)
    console.log(lowCodeInfo)
    return {
      ...store,
      lowCodeInfo
    }
  }
}

const reducer = (state: IStore, action: IAction<ActionPayLoad>): IStore => {
  const { payload } = action
  switch (action.type) {
    case ACTIONS.INITIAL_USER:
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        userInfo: action.payload as IUserInfo
      }
    case ACTIONS.INITIAL_LOW_CODE:
      return lowCodeReducer.initializeInfo(state, payload as InitLowCodeInfo)
    case ACTIONS.UPDATE_PREVIEW_SCALE:
      return lowCodeReducer.updateScale(state, payload as number)
    case ACTIONS.UPDATE_SCHEMA:
      return lowCodeReducer.updateSchema(state, payload as ComponentSchema)
    case ACTIONS.UPDATE_SELECTED_COMP:
      return lowCodeReducer.updateCurSelectedComp(state, payload as string)
    case ACTIONS.UPDATE_SELECTED_LAYWER:
      return lowCodeReducer.updateCurSelectedLayer(state, payload as string)
    case ACTIONS.UPDATE_COMPONENT:
      return lowCodeReducer.updateComponent(state, payload as ComponentSchema)
    default:
      return state
  }
}

export default reducer
