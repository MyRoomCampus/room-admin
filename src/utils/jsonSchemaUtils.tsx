import { Button, Toast } from '@douyinfe/semi-ui'
import { BoxComponent, ComponentName, ComponentSchema } from '../types/lowCodeComp.type'

interface ITreeData {
  label: string | React.ReactNode
  value: string
  key: string
  children?: ITreeData[]
}

export const genTreeFromJson = (json: ComponentSchema[], deleteCompHandler: (id: string) => void): ITreeData[] => {
  return json.map((comp) => {
    let children: ITreeData[] | undefined
    if (comp.name === ComponentName.BoxComponent) {
      children = genTreeFromJson(comp.children, deleteCompHandler)
    } else {
      children = undefined
    }
    return {
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {`${comp.name.slice(0, comp.name.length - 9)}\t${comp.id}`}{' '}
          <Button
            size="small"
            type="danger"
            onClick={() => {
              deleteCompHandler(comp.id)
            }}
          >
            删除
          </Button>
        </div>
      ),
      value: comp.id,
      key: JSON.stringify({
        id: comp.id,
        name: comp.name
      }),
      children
    }
  })
}

export const findCompFromJson = (id: string, json: ComponentSchema[] | undefined): ComponentSchema | undefined => {
  if (!json) {
    return undefined
  }
  const s: ComponentSchema[] = []
  json.forEach((comp) => s.push(comp))
  while (s.length > 0) {
    const comp = s.shift()
    if (comp?.id === id) {
      return comp
    }
    if (comp?.name === ComponentName.BoxComponent) {
      comp.children.forEach((ch) => s.push(ch))
    }
  }
  return undefined
}

export const findSchemaById = (schemas?: ComponentSchema[], id?: string): ComponentSchema | undefined => {
  if (schemas == null || !id) {
    return
  }
  for (const schema of schemas) {
    if (schema.id === id) {
      return schema
    }
    if (schema.name === ComponentName.BoxComponent) {
      return findSchemaById(schema.children, id)
    }
  }
}

export const deleteCompFromJson = (id: string, json: ComponentSchema[] | undefined): ComponentSchema[] | undefined => {
  if (!json) {
    return undefined
  }
  let ret: ComponentSchema[]
  const comp = findCompFromJson(id, json)
  if (comp) {
    if (!comp.parentid) {
      ret = json.filter((item) => item.id !== comp.id)
      Toast.success('删除成功')
      return ret
    }

    const parentComp = findCompFromJson(comp.parentid, json) as BoxComponent
    if (parentComp) {
      parentComp.children = parentComp.children.filter((item) => item.id !== comp.id)
      Toast.success('删除成功')
      return json
    }
  }
  Toast.error('删除失败')

  return json
}
