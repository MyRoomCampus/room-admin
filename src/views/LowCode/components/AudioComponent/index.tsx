import React, { CSSProperties } from 'react'
import { ComponentProps } from '@//types/component.type'

const AudioComponent: React.FC<ComponentProps> = ({ schema }) => {
  const { data, id, style } = schema
  return <audio src={data} style={style as CSSProperties} key={id} controls={true} />
}

export default AudioComponent
