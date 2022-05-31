import React, { CSSProperties } from 'react'
import { ComponentProps } from '@//types/component.type'

const VideoComponent: React.FC<ComponentProps> = ({ schema }) => {
  const { data, id, style } = schema
  return <video src={data} style={style as CSSProperties} key={id} controls={true} />
}

export default VideoComponent
