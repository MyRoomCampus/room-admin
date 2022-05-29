import { BoxComponent, ComponentName, ComponentSchema } from '../types/lowCodeComp.type'
import { IStore, IAction } from '../types/store.types'
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
      let flag = 0
      for (const item of JSONSchema.data) {
        console.log(item)
        if (flag) {
          break
        }
        if (item.name === ComponentName.BoxComponent) {
          const s: BoxComponent[] = []
          s.push(item)
          while (s.length !== 0) {
            if (flag) break
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const boxComp = s.pop()!
            if (boxComp.id === curSelectLayerId) {
              boxComp.children.push(payload)
              flag = 1
              break
            } else {
              boxComp.children.forEach((ch) => {
                if (ch.name === ComponentName.BoxComponent) {
                  s.push(ch)
                }
              })
            }
          }
        }
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
  },

  updateComponent(store: IStore, payload: ComponentSchema): IStore {
    const lowCodeInfo = Object.assign({}, store.lowCodeInfo)
    const iterateSchema = (schemas: ComponentSchema[] | BoxComponent): ComponentSchema[] => {
      if (!Array.isArray(schemas)) {
        return iterateSchema(schemas.children)
      }
      return schemas.map((schema) => {
        if (schema.id === payload.id) {
          schema = payload
        }
        return schema
      })
    }
    lowCodeInfo.JSONSchema.data = iterateSchema(lowCodeInfo.JSONSchema.data)
    console.log(lowCodeInfo.JSONSchema.data)
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
    case ACTIONS.UPDATE_COMPONENT:
      return lowCodeReducer.updateComponent(state, payload)
    default:
      return state
  }
}

export default reducer
