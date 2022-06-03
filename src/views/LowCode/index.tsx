import React, { useContext } from 'react'
import styles from './index.module.less'
import ToolkitBar from './ToolkitBar'
import CompPanel from './CompPanel'
import MidCanvas from './MidCanvas'
import RightForm from './RightForm'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AppContext from '@//store'
const LowCodePlatform: React.FC = () => {
  // initialize schema data
  const { store } = useContext(AppContext)
  if (!store.lowCodeInfo?.JSONSchema) {
    return null
  }

  return (
    <div className={styles['low-platform-container']}>
      <ToolkitBar />
      <div className={styles['low-platform-body']}>
        <DndProvider backend={HTML5Backend}>
          <CompPanel />
          <MidCanvas />
          <RightForm />
        </DndProvider>
      </div>
    </div>
  )
}

export default LowCodePlatform
