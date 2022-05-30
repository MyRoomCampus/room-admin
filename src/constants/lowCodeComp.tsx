import { IconBox, IconHome, IconImage, IconTextRectangle, IconVideo, IconVolume2 } from '@douyinfe/semi-icons'
import { ComponentName, ComponentSchema, ILowCodeComp } from '../types/lowCodeComp.type'
enum DraggableItemKey {
  BOX = 'container',
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  HOUSE = 'house'
}

const iconStyle = {
  fontSize: 32
}

export const getComponentSchema = (name: DraggableItemKey): ComponentSchema | null => {
  const id = Math.floor(Math.random() * 1000000000000).toString()
  switch (name) {
    case DraggableItemKey.AUDIO:
      return {
        id,
        name: ComponentName.AudioComponent,
        parentid: '',
        type: '',
        data: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '340px',
          height: '100px',
          padding: '0'
        }
      }
    case DraggableItemKey.BOX:
      return {
        id,
        name: ComponentName.BoxComponent,
        type: '',
        data: '',
        parentid: '',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '340px',
          height: '100px',

          border: '1px dashed #e5e5e5',
          borderRadius: '0',
          backgroundColor: '0',
          padding: '0'
        },
        children: []
      }
    case DraggableItemKey.IMAGE:
      return {
        id,
        name: ComponentName.ImageComponent,
        type: '',
        data: 'https://lf3-xfl.bytescm.com/obj/xfl-static/xfl_site/img/608b2b5.jpeg',
        parentid: '',

        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '340px',
          height: '50px',
          border: '1px dashed #e5e5e5',
          backgroundColor: '0',
          padding: '0'
        }
      }
    case DraggableItemKey.TEXT:
      return {
        id,
        name: ComponentName.TextComponent,
        type: '',
        data: '文字组件',
        parentid: '',

        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '340px',
          height: '20px',

          border: '1px dashed #e5e5e5',
          borderRadius: '0',
          backgroundColor: '0',
          padding: '0',
          color: '0',
          textAlign: '0',
          fontSize: '14'
        }
      }
    case DraggableItemKey.VIDEO:
      return {
        id,
        name: ComponentName.VideoComponent,
        parentid: '',

        type: '',
        data: 'https://p1.haoduofangs.com/obj/ttfe/fproject/website/out_1577182578172.mp4',

        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '340px',
          height: '100px',
          border: '1px dashed #e5e5e5',
          backgroundColor: '0',
          padding: '0'
        }
      }
    case DraggableItemKey.HOUSE:
      return {
        id,
        name: ComponentName.HouseComponent,
        type: '',
        data: '',
        parentid: '',
        style: {
          position: 'absolute',
          left: '0',
          top: '0'
        }
      }
    default:
      return null
  }
}
const TextComponent: ILowCodeComp = {
  icon: <IconTextRectangle style={iconStyle} />,
  text: '文字',
  compKey: DraggableItemKey.TEXT
}

const ImageComponent: ILowCodeComp = {
  icon: <IconImage style={iconStyle} />,
  text: '图片',
  compKey: DraggableItemKey.IMAGE
}
const VideoComponent: ILowCodeComp = {
  icon: <IconVideo style={iconStyle} />,
  text: '视频',
  compKey: DraggableItemKey.VIDEO
}
const AudioComponent: ILowCodeComp = {
  icon: <IconVolume2 style={iconStyle} />,
  text: '音频',
  compKey: DraggableItemKey.AUDIO
}
const HouseCardComponent: ILowCodeComp = {
  icon: <IconHome style={iconStyle} />,
  text: '房源卡片',
  compKey: DraggableItemKey.HOUSE
}
const BoxComponent: ILowCodeComp = {
  icon: <IconBox style={iconStyle} />,
  text: '容器',
  compKey: DraggableItemKey.BOX
}
const BASE_COMPS: ILowCodeComp[] = [TextComponent, ImageComponent, VideoComponent, AudioComponent, HouseCardComponent]
const HIGHER_COMPS: ILowCodeComp[] = [BoxComponent]
export { BASE_COMPS, HIGHER_COMPS, DraggableItemKey }
