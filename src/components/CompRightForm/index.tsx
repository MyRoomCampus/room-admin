import React, { useContext } from 'react'
// import './index.css'
import {
  AudioComponent,
  BoxComponent,
  HouseComponent,
  ImageComponent,
  TextComponent,
  VideoComponent
} from '@//types/lowCodeComp.type'
// import ACTIONS from '@//reducer/actions'
// import {  cloneDeep } from 'lodash'
import { Form, Input, Row } from '@douyinfe/semi-ui'
import { BorderComponent, ExtraBorderComponent } from './BorderComp'
import { BasicComponent } from './BasicComp'
import { BackgroundComponent } from './BackgroundComp'
import { TextPropsComponent } from './TextpropsComp'
import { AudioDataComponent, ImageDataComponent, TextDataComponent, VideoDataComponent } from './DataChangeComp'
import ACTIONS from '@//reducer/actions'
import {  cloneDeep } from 'lodash-es'
import AppContext from '@//store'
interface TextProps {
  comp: TextComponent
}
interface ImageProps {
  comp: ImageComponent
}
interface VideoProps {
  comp: VideoComponent
}
interface AudioProps {
  comp: AudioComponent
}
interface BoxProps {
  comp: BoxComponent
}
interface HouseProps {
  comp: HouseComponent
}
const TextFormComponent: React.FC<TextProps> = (props) => {
  // const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  // const { Section, Label } = Form
  return (
    <div>
      <Form style={{ padding: 20, width: '100%' }}>
        <BasicComponent comp={comp} />
        <BorderComponent comp={comp} />
        <BackgroundComponent comp={comp} />
        <TextPropsComponent comp={comp} />
        <TextDataComponent comp={comp} />
      </Form>
    </div>
  )
}
const ImageFormComponent: React.FC<ImageProps> = (props) => {
  // const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  // const { Section, Label } = Form
  return (
    <div>
      <Form style={{ padding: 20, width: '100%' }}>
        <BasicComponent comp={comp} />
        <ExtraBorderComponent comp={comp} />
        <BackgroundComponent comp={comp} />
        <ImageDataComponent comp={comp} />
      </Form>
    </div>
  )
}
const VideoFormComponent: React.FC<VideoProps> = (props) => {
  // const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  // const { Section, Label } = Form
  return (
    <div>
      <Form style={{ padding: 20, width: '100%' }}>
        <BasicComponent comp={comp} />
        <ExtraBorderComponent comp={comp} />
        <BackgroundComponent comp={comp} />
        <VideoDataComponent comp={comp} />
      </Form>
    </div>
  )
}
const AudioFormComponent: React.FC<AudioProps> = (props) => {
  // const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  // const { Section, Label } = Form
  return (
    <div>
      <Form style={{ padding: 20, width: '100%' }}>
        <BasicComponent comp={comp} />

        <AudioDataComponent comp={comp} />
      </Form>
    </div>
  )
}
const BoxFormComponent: React.FC<BoxProps> = (props) => {
  // const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  // const { Section, Label } = Form
  return (
    <div>
      <Form style={{ padding: 20, width: '100%' }}>
        <BasicComponent comp={comp} />
        <BorderComponent comp={comp} />
        <BackgroundComponent comp={comp} />
      </Form>
    </div>
  )
}
const HouseFormComponent: React.FC<HouseProps> = (props) => {
  const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  const { Section } = Form
  return (
    <div>
      <Form style={{ padding: 20, width: '100%' }}>
        <Section text={'位置'}>
          <Row>
            <Input
              prefix="Left:"
              value={comp.style.left}
              onChange={(e) => {
                const newSchema = cloneDeep(comp)
                newSchema.style.left = `${e}`
                dispatch({
                  type: ACTIONS.UPDATE_COMPONENT,
                  payload: newSchema
                })
              }}
            />
          </Row>
          <Row>
            <Form.Label></Form.Label>
          </Row>
          <Row>
            <Input
              prefix="Top:"
              value={comp.style.top}
              onChange={(e) => {
                const newSchema = cloneDeep(comp)
                newSchema.style.top = `${e}`
                dispatch({
                  type: ACTIONS.UPDATE_COMPONENT,
                  payload: newSchema
                })
              }}
            />
          </Row>
        </Section>
      </Form>
    </div>
  )
}
const UnSelectIdComponent: React.FC = () => {
  const { Section } = Form
  return (
    <div>
      <Form style={{ padding: 20, width: '100%' }}>
        <Section text={'未选中元素'}></Section>
      </Form>
    </div>
  )
}
export {
  TextFormComponent,
  ImageFormComponent,
  VideoFormComponent,
  AudioFormComponent,
  BoxFormComponent,
  HouseFormComponent,
  UnSelectIdComponent
}
