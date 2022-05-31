import React, { useContext } from 'react'
import styles from './index.module.less'
import ToolkitBar from './ToolkitBar'
import CompPanel from './CompPanel'
import MidCanvas from './MidCanvas'
import RightForm from './RightForm'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ACTIONS from '@//reducer/actions'
import AppContext from '@//store'
const LowCodePlatform: React.FC = () => {
  // initialize schema data
  const { store, dispatch } = useContext(AppContext)

  if (store.lowCodeInfo == null) {
    dispatch({
      type: ACTIONS.INITIAL_LOW_CODE,
      payload: {
        projectName: 'xxx',
        author: 'yyy',
        houseCardData: {
          image:
            'https://p1.haoduofangs.com/f100-image/SZvX8zYCKzbRod~tplv-u148heywkg-default-v3:0:424:0:0.jpeg?sig=YZTrZrfP-RZia8BOtbQnc5Ic_rA=',
          listingName: '2室1厅 田家园新村(四区)',
          cityName: '上海',
          neighborhoodName: '徐汇长桥',
          squaremeter: 123456,
          tags: ['南北通透', '绿化率高'],
          pricing: 1234567890
        }
      }
    })
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
