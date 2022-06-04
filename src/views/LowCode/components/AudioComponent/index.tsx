import React, { CSSProperties } from 'react'
import { ComponentProps } from '@//types/component.type'

const AudioComponent: React.FC<ComponentProps> = ({ schema }) => {
  const { data, id, style } = schema
  return <div style={style as CSSProperties}><audio style={{height: '100%', width: '100%'}} src={data}  key={id} controls={true} /></div>
}

export default AudioComponent
