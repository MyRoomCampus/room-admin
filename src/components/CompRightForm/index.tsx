import React from 'react'
// import './index.css'
import { ImageComponent, TextComponent } from '@//types/lowCodeComp.type'
// import ACTIONS from '@//reducer/actions'
// import _ from 'lodash'
import { Form } from '@douyinfe/semi-ui'
import { BorderComponent, ExtraBorderComponent } from './BorderComp'
import { BasicComponent } from './BasicComp'
import { BackgroundComponent } from './BackgroundComp'
import { TextPropsComponent } from './TextpropsComp'
import { ImageDataComponent, TextDataComponent } from './DataChangeComp'
interface TextProps {
  comp: TextComponent
}
interface ImageProps {
  comp: ImageComponent
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
export { TextFormComponent, ImageFormComponent }
