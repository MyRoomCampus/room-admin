import { DraggableItemKey, getComponentSchema } from '@//constants/lowCodeComp'
import ACTIONS from '@//reducer/actions'
import AppContext from '@//store'
import RenderJsonSchema from '@//utils/renderJson'
import React, { useContext, useRef } from 'react'
import { useDrop } from 'react-dnd'
import styles from './index.module.less'
import { ComponentSchema } from '../../../types/lowCodeComp.type'
import iphoneImage from '@//assets/images/iPhone.svg'
import {  cloneDeep } from 'lodash-es'
import { useScroll } from 'ahooks'

const MidCanvas: React.FC = () => {
  const { store, dispatch } = useContext(AppContext)
  // react scroll
  const scrollRef = useRef(null)
  const scroll = useScroll(scrollRef)
  // react drop
  const acceptableItems = Object.values(DraggableItemKey)
  const [, dropRef] = useDrop(
    () => ({
      accept: acceptableItems,
      drop: (item: { compKey: DraggableItemKey; schema?: ComponentSchema }, monitor) => {
        console.log('drop')
        const clientOffset = monitor.getClientOffset()
        const initialClientOffset = monitor.getInitialClientOffset()
        // 移动后的距离
        const x = clientOffset?.x ?? 0
        const y = clientOffset?.y ?? 152
        // 移动前的距离
        const initialX = initialClientOffset?.x ?? 0
        const initialY = initialClientOffset?.y ?? 0
        // 从左边移动到中间和中间的移动分开处理
        if (item.schema != null) {
          const newSchema = cloneDeep(item.schema)
          newSchema.style.top = `${-initialY + y + parseInt(newSchema.style.top)}px`
          newSchema.style.left = `${-initialX + x + parseInt(newSchema.style.left)}px`
          dispatch({
            type: ACTIONS.UPDATE_COMPONENT,
            payload: newSchema
          })
          return
        }

        const schema = getComponentSchema(item.compKey)

        if (schema != null) {
          schema.style.top = `${y - 152 + (scroll?.top ?? 0)}px`
          dispatch({
            type: ACTIONS.UPDATE_SCHEMA,
            payload: schema
          })
        }
      }
    }),
    [store, scroll]
  )
  return (
    <div className={styles['canvas-container']}>
      <div
        className={styles['canvas-image']}
        style={{
          backgroundImage: `url(${iphoneImage})`,
          transform: `scale(${store.lowCodeInfo?.scale ?? 1}) translateY(${
            ((store.lowCodeInfo?.scale ?? 1) - 0.9) * 400
          }px)`
        }}
      >
        <div className={styles['canvas-preview']} ref={scrollRef}>
          <div id="canvas-scroll" className={styles['canvas-scroll']} ref={dropRef}>
            {store.lowCodeInfo?.JSONSchema.data.map((s) => {
              return <RenderJsonSchema schema={s} key={s.id} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidCanvas
