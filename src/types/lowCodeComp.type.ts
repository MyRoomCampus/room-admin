export type ComponentName = 'BoxComponent' | 'TextComponent' | 'ImageComponent' | 'VideoComponent'

//容器组件属性，高级组件？
export interface BoxComponent {
  id: string
  name: 'BoxComponent'
  type: string
  //data: string
  parentid: string
  style: {
    left: string
    top: string
    width: string
    height: string

    border: string
    backgroundColor: string
    padding: string
  }
}

//文本组件属性
export interface TextComponent {
  id: string
  name: 'TextComponent'
  type: string
  data: string
  parentid: string

  style: {
    left: string
    top: string
    width: string
    height: string

    border: string
    backgroundColor: string
    padding: string
    color: string
    textAlign: string
    fontSize: string
  }
}

//图片组件属性
export interface ImageComponent {
  id: string
  name: 'ImageComponent'
  type: string
  data: string
  parentid: string
  style: {
    left: string
    top: string
    width: string
    height: string
    border: string
    backgroundColor: string
    padding: string
    // color: string
    textAlign: string //图片位置，居中等等
  }
}

//视频组件属性
export interface VideoComponent {
  id: string
  name: 'VideoComponent'
  type: string
  data: string

  style: {
    left: string
    top: string
    width: string
    height: string

    border: string
    backgroundColor: string
    padding: string
    // color: string
    textAlign: string
  }
}

//音频组件属性
export interface AudioComponent {
  id: string
  name: 'AudioComponent'
  type: string
  data: string

  style: {
    left: string
    top: string
    width: string
    height: string
    // backgroundColor: string
    padding: string
    // color: string
    // textAlign: string
  }
}

type ComponentSchema = BoxComponent | TextComponent | ImageComponent | VideoComponent | AudioComponent

export interface ILowCodeComp {
  icon: React.ReactNode
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: ComponentSchema
}
