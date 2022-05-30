import React, { useContext, useState } from 'react'
import styles from './index.module.less'
import { IconCode, IconSave, IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons'
import { Tooltip, Button } from '@douyinfe/semi-ui'
import { Modal } from '@douyinfe/semi-ui'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'

type ToolType = {
  el: React.ReactNode
  tip: string
  onClick: () => void
}

const ToolkitBar: React.FC = () => {
  const { store, dispatch } = useContext(AppContext)
  const [codeModalVisibel, setCodeModalVisibel] = useState(false)
  const gap = 0.1

  const size = 'large'
  const onMinusClick = () => {
    const curScale = store.lowCodeInfo?.scale
    if (curScale && curScale >= 0.2) {
      dispatch({
        type: ACTIONS.UPDATE_PREVIEW_SCALE,
        payload: curScale - gap
      })
    }
  }
  const onPlusClick = () => {
    const curScale = store.lowCodeInfo?.scale
    if (curScale && curScale < 2) {
      dispatch({
        type: ACTIONS.UPDATE_PREVIEW_SCALE,
        payload: curScale + gap
      })
    }
  }
  const onCodeClick = () => {
    !codeModalVisibel && setCodeModalVisibel(true)
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

  const switchMode = () => {
    const body = document.body
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
    } else {
      body.setAttribute('theme-mode', 'dark')
    }
  }
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
      <Button onClick={switchMode} style={{ position: 'fixed', right: 20 }}>
        Switch Mode
      </Button>
      <Modal
        title="页面源代码"
        visible={codeModalVisibel}
        footer={null}
        height={'80vh'}
        onCancel={() => setCodeModalVisibel(false)}
        maskClosable={false}
        bodyStyle={{
          height: '100%',
          overflow: 'auto',
          whiteSpace: 'pre'
        }}
      >
        {JSON.stringify(store.lowCodeInfo?.JSONSchema, null, 2)}
      </Modal>
    </div>
  )
}

export default ToolkitBar
