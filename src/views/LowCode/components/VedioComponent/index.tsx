import React, { CSSProperties } from 'react'
import { ComponentProps } from '@//types/component.type'

const VideoComponent: React.FC<ComponentProps> = ({ schema }) => {
  const { data, id, style } = schema
  return <div style={style as CSSProperties}><video style={{height: '100%', width: '100%', objectFit: 'fill'}} src={data}  key={id} controls={true} /></div>
}

export default VideoComponent
