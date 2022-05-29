import { DraggableItemKey, getComponentSchema } from '@//constants/lowCodeComp'
import ACTIONS from '@//reducer/actions'
import AppContext from '@//store'
import renderJsonSchema from '@//utils/renderJson'
import { useContext, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import styles from './index.module.less'
const MidCanvas: React.FC = () => {
  const { store, dispatch } = useContext(AppContext)

  // react drop
  const acceptableItems = useMemo(() => {
    const items = []
    for (const i in DraggableItemKey) {
      items.push(DraggableItemKey[i as keyof typeof DraggableItemKey])
    }
    return items
  }, [])

  const [, drop] = useDrop(
    () => ({
      accept: acceptableItems,
      drop: (item: { compKey: DraggableItemKey }) => {
        const schema = getComponentSchema(item.compKey)
        console.log(schema)

        if (schema) {
          schema.style.top = (store.lowCodeInfo?.curTotalHeight || '0') + 'px'
          dispatch({
            type: ACTIONS.UPDATE_SCHEMA,
            payload: schema
          })
        }
      }
    }),
    [store]
  )

  return (
    <div className={styles['canvas-container']}>
      <div className={styles['canvas-preview']} ref={drop} style={{ transform: `scale(${store.lowCodeInfo?.scale})` }}>
        {store.lowCodeInfo?.JSONSchema.data.map((s) => {
          return renderJsonSchema(s)
        })}
      </div>
    </div>
  )
}

export default MidCanvas
