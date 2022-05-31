import React, { useContext } from 'react'
// import './index.css'
import { AudioComponent, BoxComponent, ImageComponent, TextComponent, VideoComponent } from '@//types/lowCodeComp.type'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import _ from 'lodash'
import { Form, Row, Col, Input } from '@douyinfe/semi-ui'

interface TextProps {
  comp: BoxComponent | TextComponent | ImageComponent | VideoComponent | AudioComponent
}
export const BasicComponent: React.FC<TextProps> = (props) => {
  const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  const { Section, Label } = Form
  return (
    <Section text={'基本属性'}>
      <Label>位置</Label>
      <Row>
        <Col span={10}>
          <Input
            prefix="Left:"
            value={comp.style.left}
            onChange={(e) => {
              const newSchema = _.cloneDeep(comp)
              newSchema.style.left = `${e}`
              dispatch({
                type: ACTIONS.UPDATE_COMPONENT,
                payload: newSchema
              })
            }}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={10}>
          <Input
            prefix="Top:"
            value={comp.style.top}
            onChange={(e) => {
              const newSchema = _.cloneDeep(comp)
              newSchema.style.top = `${e}`
              dispatch({
                type: ACTIONS.UPDATE_COMPONENT,
                payload: newSchema
              })
            }}
          />
        </Col>
      </Row>
      <Label>尺寸</Label>
      <Row>
        <Col span={10}>
          <Input
            prefix="长度:"
            value={comp.style.width}
            onChange={(e) => {
              const newSchema = _.cloneDeep(comp)
              newSchema.style.width = `${e}`
              dispatch({
                type: ACTIONS.UPDATE_COMPONENT,
                payload: newSchema
              })
            }}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={10}>
          <Input
            prefix="宽度:"
            value={comp.style.height}
            onChange={(e) => {
              const newSchema = _.cloneDeep(comp)
              newSchema.style.height = `${e}`
              dispatch({
                type: ACTIONS.UPDATE_COMPONENT,
                payload: newSchema
              })
            }}
          />
        </Col>
      </Row>
      <Row>
        <Label>内边距:</Label>

        <Input
          style={{ width: '100%' }}
          value={comp.style.padding}
          onChange={(e) => {
            const newSchema = _.cloneDeep(comp)
            newSchema.style.padding = `${e}`
            dispatch({
              type: ACTIONS.UPDATE_COMPONENT,
              payload: newSchema
            })
          }}
        />
      </Row>
    </Section>
  )
}
