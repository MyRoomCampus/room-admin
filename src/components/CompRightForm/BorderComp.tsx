import React, { useContext, useState } from 'react'
import styles from './index.module.less'
import { BoxComponent, ImageComponent, TextComponent, VideoComponent } from '@//types/lowCodeComp.type'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import {  cloneDeep } from 'lodash-es'
import { Form, Row, Col, Slider } from '@douyinfe/semi-ui'

interface Props {
  comp: BoxComponent | TextComponent
}
interface extraProps {
  comp: ImageComponent | VideoComponent
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

export const BorderComponent: React.FC<Props> = (props) => {
  const { comp } = props
  const { dispatch } = useContext(AppContext)
  const arr = comp.style.border.split(' ')
  const redius = comp.style.borderRadius
  const [color, setColor] = useState(arr[arr.length - 1])
  console.log('arr:', arr)
  // const style = { width: '100%' }
  // console.log('comp:', comp)
  const { Section, Label } = Form
  return (
    <Section text="边框">
      <Label>边框颜色</Label>
      <Row>
        <Col span={4}>
          <span className={styles.span} style={{ backgroundColor: `${color}` }}></span>
        </Col>

        {borderColor.map((value, index) => {
          return (
            <Col key={index} span={2}>
              <div>
                <span
                  className={styles.span}
                  style={{ backgroundColor: value }}
                  onClick={() => {
                    setColor(value)
                    console.log('changed:', color)
                    arr[arr.length - 1] = value
                    console.log('arr:', arr)
                    const newSchema = cloneDeep(comp)
                    newSchema.style.border = arr.join(' ')
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
      <Label>边框角度</Label>
      <div style={{ width: 320, marginRight: 15 }}>
        <Slider
          step={1}
          value={parseInt(redius.substring(0, redius.length - 1))}
          onChange={(value) => {
            const newSchema = cloneDeep(comp)
            newSchema.style.borderRadius = `${value}px`
            console.log(value)
            dispatch({
              type: ACTIONS.UPDATE_COMPONENT,
              payload: newSchema
            })
          }}
        ></Slider>
      </div>
    </Section>
  )
}

export const ExtraBorderComponent: React.FC<extraProps> = (props) => {
  const { comp } = props
  const { dispatch } = useContext(AppContext)
  const arr = comp.style.border.split(' ')
  const [color, setColor] = useState(arr[arr.length - 1])
  console.log('arr:', arr)
  // const style = { width: '100%' }
  // console.log('comp:', comp)
  const { Section, Label } = Form
  return (
    <Section text="边框">
      <Label>边框颜色</Label>
      <Row>
        <Col span={4}>
          <span className={styles.span} style={{ backgroundColor: `${color}` }}></span>
        </Col>

        {borderColor.map((value, index) => {
          return (
            <Col key={index} span={2}>
              <div>
                <span
                  className={styles.span}
                  style={{ backgroundColor: value }}
                  onClick={() => {
                    setColor(value)
                    console.log('changed:', color)
                    arr[arr.length - 1] = value
                    console.log('arr:', arr)
                    const newSchema = cloneDeep(comp)
                    newSchema.style.border = arr.join(' ')
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
      {/* <Label>边框角度</Label>
        <div style={{ width: 320, marginRight: 15 }}>
          <Slider
            step={1}
            value={parseInt(redius.substring(0, redius.length - 1))}
            onChange={(value) => {
              const newSchema = cloneDeep(comp)
              newSchema.style.borderRadius = `${value}px`
              console.log(value)
              dispatch({
                type: ACTIONS.UPDATE_COMPONENT,
                payload: newSchema
              })
            }}
          ></Slider>
        </div> */}
    </Section>
  )
}
