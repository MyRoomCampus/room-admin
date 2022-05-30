import React, { CSSProperties } from 'react'
import { ComponentProps } from '@//types/component.type'

const ImageComponent: React.FC<ComponentProps> = ({ schema }) => {
  const { data, id, style } = schema
  return <img src={data} style={style as CSSProperties} key={id} />
}

export default ImageComponent
