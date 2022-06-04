import React, { CSSProperties, useContext } from 'react'
import { useDrag } from 'react-dnd'
import { ComponentName, ComponentSchema } from '../types/lowCodeComp.type'
import AppContext from '@//store'
import actions from '@//reducer/actions'
import components from '@//views/LowCode/components'

const RenderJsonSchema: React.FC<{ schema: ComponentSchema }> = ({ schema }) => {
  const { name, style, id } = schema
  const { dispatch } = useContext(AppContext)
  const [, drag] = useDrag(
    () => ({
      type: name === ComponentName.BoxComponent ? 'container' : name.toLowerCase().slice(0, name.length - 9),
      item: { schema }
    }),
    [schema]
  )

  // 点击容器组件，更新层级id和curSelectedId
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBoxClick = (id: string) => {
    console.log(id)

    dispatch({
      type: actions.UPDATE_SELECTED_COMP,
      payload: id
    })
    dispatch({
      type: actions.UPDATE_SELECTED_LAYWER,
      payload: id
    })
  }
  // 点击普通组件，切换curSelectedId
  const handleComponentClick = (id: string) => {
    dispatch({
      type: actions.UPDATE_SELECTED_COMP,
      payload: id
    })
  }
  if (name === ComponentName.BoxComponent) {
    return (
      <div
        onMouseDown={(e) => {
          e.stopPropagation()
          handleComponentClick(id)
        }}
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Delete' || e.key === 'Backspace') {
            console.log('delete')
            dispatch({
              type: actions.DELETE_COMPONENT,
              payload: id
            })
          }
        }}
        ref={drag}
        style={style as CSSProperties}
        key={id}
      >
        {schema.children?.map((ch) => {
          return <RenderJsonSchema schema={ch} key={ch.id} />
        })}
      </div>
    )
  }

  const RenderComponent = components[name]
  return (
    <div
      ref={drag}
      tabIndex={-1}
      onMouseDown={(e) => {
        e.stopPropagation()
        handleComponentClick(id)
      }}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Delete' || e.key === 'Backspace') {
          console.log('delete')
          dispatch({
            type: actions.DELETE_COMPONENT,
            payload: id
          })
        }
      }}
    >
      <RenderComponent schema={schema} />
    </div>
  )
}

export default RenderJsonSchema
