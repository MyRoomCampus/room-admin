import React, { CSSProperties } from 'react'
import { ComponentName, ComponentSchema } from '../types/lowCodeComp.type'

/**
 * TODO: 将组件封装一下，使得可以在画布中实现拖拽
 * @param schema
 * @returns
 */
const renderJsonSchema = (schema: ComponentSchema): React.ReactNode => {
  const { name, data, style, id } = schema
  switch (name) {
    case ComponentName.AudioComponent:
      return <audio src={data} style={style as CSSProperties} key={id} controls={true} />
    case ComponentName.ImageComponent:
      return <img src={data} style={style as CSSProperties} key={id} />
    case ComponentName.TextComponent:
      return (
        <div style={style as CSSProperties} key={id}>
          {data}
        </div>
      )
    case ComponentName.VideoComponent:
      return <video src={data} style={style as CSSProperties} key={id} controls={true} />
    case ComponentName.BoxComponent:
      return (
        <div style={style as CSSProperties} key={id}>
          {schema.children.map((ch) => {
            return renderJsonSchema(ch)
          })}
        </div>
      )
    default:
      return <></>
  }
}

export default renderJsonSchema
