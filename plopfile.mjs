import view from './plop-templates/view/prompt.mjs'
import component from './plop-templates/component/prompt.mjs'
// import store from './plop-templates/store/prompt.mjs'

export default function (plop) {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  plop.setGenerator('view', view)
  plop.setGenerator('component', component)
  // plop.setGenerator('store', store)
}
