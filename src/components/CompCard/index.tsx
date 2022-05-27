import React from 'react'
import styles from './index.module.less'

type CompCardProps = {
  icon: React.ReactNode
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: any
}

const CompCard: React.FC<CompCardProps> = (props) => {
  const { icon, text } = props
  return (
    <div className={styles['card-container']}>
      <div className={styles['card-container-icon']}>{icon}</div>
      <div className={styles['card-container-text']}>{text}</div>
    </div>
  )
}

export default CompCard
