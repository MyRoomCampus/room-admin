import React, { useContext, useState } from 'react'
import styles from './index.module.less'
import { IconCode, IconSave, IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons'
import { Tooltip, Modal } from '@douyinfe/semi-ui'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import ReactJson from 'react-json-view'
import ModeSwitch from '@//components/ModeSwitch'

interface ToolType {
  el: React.ReactNode
  tip: string
  onClick: () => void
}

const ToolkitBar: React.FC = () => {
  const { store, dispatch } = useContext(AppContext)
  const [codeModalVisible, setCodeModalVisible] = useState(false)
  const gap = 0.1

  const size = 'large'
  const onMinusClick = () => {
    const curScale = store.lowCodeInfo?.scale
    if (curScale !== undefined && curScale >= 0.2) {
      dispatch({
        type: ACTIONS.UPDATE_PREVIEW_SCALE,
        payload: curScale - gap
      })
    }
  }
  const onPlusClick = () => {
    const curScale = store.lowCodeInfo?.scale
    if (curScale !== undefined && curScale < 2) {
      dispatch({
        type: ACTIONS.UPDATE_PREVIEW_SCALE,
        payload: curScale + gap
      })
    }
  }
  const onCodeClick = () => {
    !codeModalVisible && setCodeModalVisible(true)
  }

  const onSaveClick = () => {
    console.log('onSaveClick')
  }

  const tools: ToolType[] = [
    {
      el: <IconMinusCircle size={size} />,
      tip: '缩小',
      onClick: onMinusClick
    },
    {
      el: <IconPlusCircle size={size} />,
      tip: '放大',
      onClick: onPlusClick
    },
    {
      el: <IconCode size={size} />,
      tip: '查看源码',
      onClick: onCodeClick
    },
    {
      el: <IconSave size={size} />,
      tip: '保存',
      onClick: onSaveClick
    }
  ]

  return (
    <div className={styles['low-platform-header']}>
      {tools.map((item, i) => {
        return (
          <Tooltip content={item.tip} key={i}>
            <div className={styles['low-platform-header-icon']} onClick={item.onClick}>
              {item.el}
            </div>
          </Tooltip>
        )
      })}
      <ModeSwitch />
      <Modal
        title="页面源代码"
        visible={codeModalVisible}
        footer={null}
        width={'80vw'}
        height={'80vh'}
        onCancel={() => setCodeModalVisible(false)}
        maskClosable={false}
        bodyStyle={{
          height: '100%',
          overflow: 'auto',
          whiteSpace: 'pre'
        }}
      >
        <ReactJson theme="twilight" src={store.lowCodeInfo?.JSONSchema as object} />
      </Modal>
    </div>
  )
}

export default ToolkitBar
