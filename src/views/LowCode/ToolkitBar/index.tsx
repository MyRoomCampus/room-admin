import React, { useContext, useState } from 'react'
import styles from './index.module.less'
import { IconCode, IconSave, IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons'
import { Tooltip } from '@douyinfe/semi-ui'
import { Modal } from '@douyinfe/semi-ui'
import AppContext from '@//store'

type ToolType = {
  el: React.ReactNode
  tip: string
  onClick: () => void
}

const ToolkitBar: React.FC = () => {
  const { store } = useContext(AppContext)
  const [codeModalVisibel, setCodeModalVisibel] = useState(false)

  const size = 'extra-large'
  const onMinusClick = () => {
    console.log('onMinusClick')
  }
  const onPlusClick = () => {
    console.log('onPlusClick')
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
      <Modal
        title="页面源代码"
        visible={codeModalVisibel}
        footer={null}
        height={'80vh'}
        onCancel={() => setCodeModalVisibel(false)}
        maskClosable={false}
        bodyStyle={{
          height: '100%',
          overflow: 'auto'
        }}
      >
        {JSON.stringify(store.lowCodeInfo?.JSONSchema)}
      </Modal>
    </div>
  )
}

export default ToolkitBar
