import React, { CSSProperties, useContext } from 'react'
import { ComponentProps } from '@//types/component.type'
import styles from './index.module.less'
import AppContext from '@//store'
import actions from '@//reducer/actions'
import {  cloneDeep } from 'lodash-es'
import { ComponentSchema } from '@//types/lowCodeComp.type'
import { useBoolean } from 'ahooks'

const TextComponent: React.FC<ComponentProps> = ({ schema }) => {
  console.log('textschema', schema)
  const { data, id, style } = schema
  const { dispatch } = useContext(AppContext)
  const [canInput, { set }] = useBoolean(true)
  const handleTextInput = (content: string) => {
    const newSchema: ComponentSchema = cloneDeep(schema)
    newSchema.data = content ?? newSchema?.data
    console.log('newSchema', newSchema)
    console.log('onChange', content)
    dispatch({
      type: actions.UPDATE_COMPONENT,
      payload: newSchema
    })
  }

  return (
    <textarea
      className={styles['component-text']}
      value={data}
      style={style as CSSProperties}
      key={id}
      onCompositionStart={() => {
        set(false)
      }}
      onCompositionEnd={(e) => {
        console.log('compositionend')
        console.log(e)
        set(true)
        const target = e.target as HTMLTextAreaElement
        handleTextInput(target.value ?? '')
      }}
      onChange={(e) => {
        console.log(e, canInput)
        if (canInput) {
          handleTextInput(e.target.value)
        }
      }}
    ></textarea>
  )
}

export default TextComponent
