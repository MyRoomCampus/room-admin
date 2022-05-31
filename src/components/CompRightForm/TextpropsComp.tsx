import React, { useContext, useState } from 'react'
import styles from './index.module.less'
import { TextComponent } from '@//types/lowCodeComp.type'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import _ from 'lodash'
import { Form, Row, Col, Slider, RadioGroup, Radio } from '@douyinfe/semi-ui'

interface Props {
  comp: TextComponent
}
export const borderColor = [
  '#ffffff',
  '#e5e5e5',
  '#cdcdcd',
  '#707070',
  '#2c2c2c',
  '#d81e06',
  '#f4ea2a',
  '#1afa29',
  '#1296db',
  '#13227a'
]
export const TextPropsComponent: React.FC<Props> = (props) => {
  const { comp } = props
  const { dispatch } = useContext(AppContext)
  const arr = comp.style.border.split(' ')
  const textsize = comp.style.fontSize
  const textcolor = comp.style.color
  //   const textpos = comp.style.textAlign
  const [color, setColor] = useState(textcolor)
  console.log('arr:', arr)
  // const style = { width: '100%' }
  //console.log('comp:', comp)
  const { Section, Label } = Form
  return (
    <Section text="字体">
      <Label>字体颜色</Label>
      <Row>
        <Col span={4}>
          <span className={styles['span']} style={{ backgroundColor: `${color}` }}></span>
        </Col>

        {borderColor.map((value, index) => {
          return (
            <Col key={index} span={2}>
              <div>
                <span
                  className={styles['span']}
                  style={{ backgroundColor: value }}
                  onClick={() => {
                    setColor(value)

                    const newSchema = _.cloneDeep(comp)
                    newSchema.style.color = value
                    console.log(newSchema)
                    dispatch({
                      type: ACTIONS.UPDATE_COMPONENT,
                      payload: newSchema
                    })
                  }}
                ></span>
              </div>
            </Col>
          )
        })}
      </Row>
      <Row>
        <Label>字体大小</Label>
        <div style={{ width: 320, marginRight: 15 }}>
          <Slider
            step={1}
            value={parseInt(textsize.substring(0, textsize.length - 2))}
            onChange={(value) => {
              const newSchema = _.cloneDeep(comp)
              newSchema.style.fontSize = `${value}px`
              console.log(value)
              dispatch({
                type: ACTIONS.UPDATE_COMPONENT,
                payload: newSchema
              })
            }}
          ></Slider>
        </div>
      </Row>
      <Row>
        <Label>字体位置</Label>
        <RadioGroup
          type="button"
          buttonSize="middle"
          defaultValue={'center'}
          onChange={(e) => {
            const newSchema = _.cloneDeep(comp)
            newSchema.style.textAlign = `${e.target.value}`
            console.log('textAlign:', e)
            dispatch({
              type: ACTIONS.UPDATE_COMPONENT,
              payload: newSchema
            })
          }}
        >
          <Radio value={'left'}>居左</Radio>
          <Radio value={'center'}>居中</Radio>
          <Radio value={'right'}>居右</Radio>
        </RadioGroup>
      </Row>
    </Section>
  )
}
