import React, { CSSProperties, useContext } from 'react'
import { ComponentProps } from '@//types/component.type'
import styles from './index.module.less'
import AppContext from '@//store'
import actions from '@//reducer/actions'
import _ from 'lodash'
import { TextComponent as TextComponentType } from '@//types/lowCodeComp.type'
import { useBoolean } from 'ahooks'

const TextComponent: React.FC<ComponentProps> = ({ schema }) => {
  console.log(schema)
  const { data, id, style } = schema
  const { dispatch } = useContext(AppContext)
  const [canInput, { set }] = useBoolean(true)
  const handleTextInput = () => {
    const content = document.querySelector('#component-text')?.textContent
    const range = document.createRange()
    range.selectNodeContents(document.querySelector('#component-text') ?? document.createTextNode(''))
    range.collapse(false)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(range)
    }

    const newSchema = _.cloneDeep(schema) as TextComponentType
    console.log(content, newSchema)
    newSchema.data = content ?? newSchema?.data
    dispatch({
      type: actions.UPDATE_COMPONENT,
      payload: newSchema
    })
  }

  return (
    <div className={styles['component-text']} style={style as CSSProperties} key={id}>
      <span
        onCompositionStart={() => {
          set(false)
        }}
        onCompositionEnd={() => {
          console.log('compositionend')
          set(true)
          handleTextInput()
        }}
        onInput={() => {
          if (canInput) {
            handleTextInput()
          }
        }}
        id="component-text"
        contentEditable="true"
        style={{ outline: 'none' }}
      >
        {data}
      </span>
    </div>
  )
}

export default TextComponent
