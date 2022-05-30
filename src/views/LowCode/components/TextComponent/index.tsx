import React, { CSSProperties, useContext } from 'react'
import { ComponentProps } from '@//types/component.type'
import styles from './index.module.less'
import AppContext from '@//store'
import actions from '@//reducer/actions'
import _ from 'lodash'
import { TextComponent as TextComponentType } from '@//types/lowCodeComp.type'

const TextComponent: React.FC<ComponentProps> = ({ schema }) => {
  console.log(schema)
  const { data, id, style } = schema
  const { dispatch } = useContext(AppContext)
  const handleTextInput = () => {
    // const content = document.querySelector('[contenteditable]')?.textContent

    const newSchema = _.cloneDeep(schema) as TextComponentType
    // console.log(content, newSchema)
    // newSchema.data = content ?? newSchema?.data
    dispatch({
      type: actions.UPDATE_COMPONENT,
      payload: newSchema
    })
  }

  return (
    <div className={styles['component-text']} style={style as CSSProperties} key={id}>
      <span onInput={handleTextInput} contentEditable="true" style={{ outline: 'none' }}>
        {data}
      </span>
    </div>
  )
}

export default TextComponent
