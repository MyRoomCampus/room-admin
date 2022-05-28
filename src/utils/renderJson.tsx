import React, { CSSProperties } from 'react'
import { ComponentName, ComponentSchema } from '../types/lowCodeComp.type'

const renderJsonSchema = (schema: ComponentSchema): React.ReactNode => {
  const { name, data, style, id } = schema
  switch (name) {
    case ComponentName.AudioComponent:
      return <audio src={data} style={style as CSSProperties} key={id} />
    case ComponentName.ImageComponent:
      return <img src={data} style={style as CSSProperties} key={id} />
    case ComponentName.TextComponent:
      return (
        <div style={style as CSSProperties} key={id}>
          {data}
        </div>
      )
    case ComponentName.VideoComponent:
      return <video src={data} style={style as CSSProperties} key={id} />
    default:
      return <></>
  }
}

export default renderJsonSchema