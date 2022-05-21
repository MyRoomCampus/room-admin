import { useRoutes } from 'react-router-dom'
import router from './router'
import './assets/css/common.less'
import 'reset-css';
const App = () => useRoutes(router)

export default App
