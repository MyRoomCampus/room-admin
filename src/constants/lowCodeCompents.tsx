import { IconBox, IconImage, IconTextRectangle, IconVideo, IconVolume2 } from '@douyinfe/semi-icons'
import { ILowCodeComp } from '../types/lowCodeComp.type'
const iconStyle = {
  fontSize: 32
}

const TextComponent: ILowCodeComp = {
  icon: <IconTextRectangle style={iconStyle} />,
  text: '文字'
}

const ImageComponent: ILowCodeComp = {
  icon: <IconImage style={iconStyle} />,
  text: '图片'
}
const VideoComponent: ILowCodeComp = {
  icon: <IconVideo style={iconStyle} />,
  text: '视频'
}
const AudioComponent: ILowCodeComp = {
  icon: <IconVolume2 style={iconStyle} />,
  text: '音频'
}
const BoxComponent: ILowCodeComp = {
  icon: <IconBox style={iconStyle} />,
  text: '容器'
}
const BASE_COMPS: ILowCodeComp[] = [TextComponent, ImageComponent, VideoComponent, AudioComponent]
const HIGHER_COMPS: ILowCodeComp[] = [BoxComponent]
export { BASE_COMPS, HIGHER_COMPS }
