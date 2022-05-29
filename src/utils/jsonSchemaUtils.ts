import { ComponentName, ComponentSchema } from '../types/lowCodeComp.type'

interface ITreeData {
  label: string
  value: string
  key: string
  children?: ITreeData[]
}

export const genTreeFromJson = (json: ComponentSchema[]): ITreeData[] => {
  return json.map((comp) => {
    let children: ITreeData[] | undefined
    if (comp.name === ComponentName.BoxComponent) {
      children = genTreeFromJson(comp.children)
    } else {
      children = undefined
    }
    return {
      label: `${comp.name}\t${comp.id}`,
      value: comp.id,
      key: JSON.stringify({
        id: comp.id,
        name: comp.name
      }),
      children
    }
  })
}

export const findCompFromJson = (id: string, json: ComponentSchema[]): ComponentSchema | undefined => {
  const s: ComponentSchema[] = []
  json.forEach((comp) => s.push(comp))
  while (s.length) {
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
