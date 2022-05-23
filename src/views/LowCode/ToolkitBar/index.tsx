import React from 'react'
import styles from './index.module.less'
import { IconCode, IconSave, IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons'
import { Tooltip } from '@douyinfe/semi-ui'

type ToolType = {
  el: React.ReactNode
  tip: string
  onClick: () => void
}

const ToolkitBar: React.FC = () => {
  const size = 'extra-large'
  const onMinusClick = () => {
    console.log('onMinusClick')
  }
  const onPlusClick = () => {
    console.log('onPlusClick')
  }
  const onCodeClick = () => {
    console.log('onCodeClick')
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
      <Tooltip> </Tooltip>
    </div>
  )
}

export default ToolkitBar
