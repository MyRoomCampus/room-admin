import { useRoutes } from 'react-router-dom'
import router from './router'
import './assets/styles/common.less'
import 'reset-css'
import AppContext, { initialStore } from './store'
import { useReducer } from 'react'
import reducer from './reducer'
const App = () => {
  const [store, dispatch] = useReducer(reducer, initialStore)

  return <AppContext.Provider value={{ store, dispatch }}>{useRoutes(router)}</AppContext.Provider>
}

export default App
