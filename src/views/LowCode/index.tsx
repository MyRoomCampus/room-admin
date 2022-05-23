import React from 'react'
import styles from './index.module.less'
import ToolkitBar from './ToolkitBar'
import CompPanel from './CompPanel'
const LowCodePlatform: React.FC = () => {
  return (
    <div className={styles['low-platform-container']}>
      <ToolkitBar />
      <div className={styles['low-platform-body']}>
        <CompPanel />
      </div>
    </div>
  )
}

export default LowCodePlatform
