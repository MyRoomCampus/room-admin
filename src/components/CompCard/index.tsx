import React from 'react'
import styles from './index.module.less'
import { ILowCodeComp } from '@//types/lowCodeComp.type'
import { useDrag } from 'react-dnd'

const CompCard: React.FC<ILowCodeComp> = (props) => {
  const { icon, text, compKey } = props
  const [, drag] = useDrag(() => ({
    type: compKey,
    item: { compKey }
  }))

  return (
    <div className={styles['card-container']} ref={drag}>
      <div className={styles['card-container-icon']}>{icon}</div>
      <div className={styles['card-container-text']}>{text}</div>
    </div>
  )
}

export default CompCard
