import { DraggableItemKey, getComponentSchema } from '@//constants/lowCodeComp'
import ACTIONS from '@//reducer/actions'
import AppContext from '@//store'
import RenderJsonSchema from '@//utils/renderJson'
import React, { useContext, useMemo, useRef } from 'react'
import { useDrop } from 'react-dnd'
import styles from './index.module.less'
import { ComponentSchema } from '../../../types/lowCodeComp.type'
import iphoneImage from '@//assets/images/iPhone.svg'
import _ from 'lodash'
import { useScroll } from 'ahooks'

const MidCanvas: React.FC = () => {
  const { store, dispatch } = useContext(AppContext)
  // react drop
  const acceptableItems = useMemo(() => {
    const items = Object.values(DraggableItemKey)
    return items
  }, [])
  const scrollRef = useRef(null)
  const scroll = useScroll(scrollRef)
  const [, dropRef] = useDrop(
    () => ({
      accept: acceptableItems,
      drop: (item: { compKey: DraggableItemKey; schema: ComponentSchema }, monitor) => {
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
        if (item.schema) {
          const newSchema = _.cloneDeep(item.schema)
          newSchema.style.top = `${-initialY + y + parseInt(newSchema.style.top)}px`
          newSchema.style.left = `${-initialX + x + parseInt(newSchema.style.left)}px`
          dispatch({
            type: ACTIONS.UPDATE_COMPONENT,
            payload: newSchema
          })
          return
        }

        const schema = getComponentSchema(item.compKey)

        if (schema) {
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
        style={{ backgroundImage: `url(${iphoneImage})`, transform: `scale(${store.lowCodeInfo?.scale})` }}
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
