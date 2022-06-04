import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import router from './router'
import './assets/styles/common.less'
import 'reset-css'
import AppContext, { initialStore } from './store'
import { useEffect, useReducer } from 'react'
import reducer from './reducer'
import { JWT_ACCESS_TOKEN_KEY } from './utils/token'
const App = () => {
  const [store, dispatch] = useReducer(reducer, initialStore)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!location.pathname.match(/login | \//)) {
      (!localStorage.getItem(JWT_ACCESS_TOKEN_KEY) || !store.userInfo?.username) && navigate('/login')
    }
  }, [location.pathname])
  return <AppContext.Provider value={{ store, dispatch }}>{useRoutes(router)}</AppContext.Provider>
}

export default App
