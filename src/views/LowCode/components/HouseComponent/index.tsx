import { ComponentProps } from '@//types/component.type'
import React, { CSSProperties } from 'react'
import HouseCard from '@//components/HouseCard'

const HouseComponent: React.FC<ComponentProps> = ({ schema }) => {
  const { id, style } = schema
  return <HouseCard key={id} style={style as CSSProperties} />
}

export default HouseComponent
