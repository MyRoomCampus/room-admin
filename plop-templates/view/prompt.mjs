import fs from 'fs'
import path from 'path'

function getFolder(path) {
  let components = []
  const files = fs.readdirSync(path)
  files.forEach(function (item) {
    let stat = fs.lstatSync(path + '/' + item)
    if (stat.isDirectory() === true && item != 'components') {
      components.push(path + '/' + item)
      components.push.apply(components, getFolder(path + '/' + item))
    }
  })
  return components
}

export default {
  description: '创建页面',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入文件名',
      validate: (v) => {
        if (!v || v.trim === '') {
          return '文件名不能为空'
        } else {
          return true
        }
      }
    }
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: 'src/views/{{name}}/index.tsx',
        templateFile: 'plop-templates/view/index.hbs'
      },
      {
        type: 'add',
        path: 'src/views/{{name}}/index.module.less'
      }
    ]
    return actions
  }
}
